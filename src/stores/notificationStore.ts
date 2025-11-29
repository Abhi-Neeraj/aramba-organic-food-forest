import { create } from 'zustand';
import { Notifications } from '@/entities';

interface NotificationState {
  notifications: Notifications[];
  unreadCount: number;
  setNotifications: (notifications: Notifications[]) => void;
  addNotification: (notification: Notifications) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (notificationId: string) => void;
  loadNotifications: (userId: string) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,

  setNotifications: (notifications) => {
    const unreadCount = notifications.filter(n => !n.readStatus).length;
    set({ notifications, unreadCount });
  },

  addNotification: (notification) => {
    set((state) => {
      const updated = [notification, ...state.notifications];
      const unreadCount = updated.filter(n => !n.readStatus).length;
      return { notifications: updated, unreadCount };
    });
  },

  markAsRead: (notificationId) => {
    set((state) => {
      const updated = state.notifications.map(n =>
        n._id === notificationId ? { ...n, readStatus: true } : n
      );
      const unreadCount = updated.filter(n => !n.readStatus).length;
      return { notifications: updated, unreadCount };
    });
  },

  markAllAsRead: () => {
    set((state) => {
      const updated = state.notifications.map(n => ({ ...n, readStatus: true }));
      return { notifications: updated, unreadCount: 0 };
    });
  },

  deleteNotification: (notificationId) => {
    set((state) => {
      const updated = state.notifications.filter(n => n._id !== notificationId);
      const unreadCount = updated.filter(n => !n.readStatus).length;
      return { notifications: updated, unreadCount };
    });
  },

  loadNotifications: async (userId: string) => {
    try {
      const { BaseCrudService } = await import('@/integrations');
      const { items } = await BaseCrudService.getAll<Notifications>('notifications');
      const userNotifications = items.filter(n => !n.userId || n.userId === userId);
      get().setNotifications(userNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  },
}));
