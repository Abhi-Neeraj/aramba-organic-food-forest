import { useEffect } from 'react';
import { useNotificationStore } from '@/stores/notificationStore';
import { useAuthStore } from '@/stores/authStore';
import { Bell, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, loadNotifications } =
    useNotificationStore();
  const { memberId } = useAuthStore();

  useEffect(() => {
    if (memberId && isOpen) {
      loadNotifications(memberId);
    }
  }, [memberId, isOpen, loadNotifications]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-lg z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary/10">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-heading font-semibold text-primary">Notifications</h2>
                {unreadCount > 0 && (
                  <span className="bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Actions */}
            {unreadCount > 0 && (
              <div className="px-6 py-3 bg-primary/5 border-b border-primary/10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-secondary hover:bg-secondary/10"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Mark all as read
                </Button>
              </div>
            )}

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-secondary font-paragraph">No notifications</p>
                </div>
              ) : (
                <div className="space-y-2 p-4">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Card
                        className={`p-4 cursor-pointer transition-colors ${
                          !notification.readStatus
                            ? 'bg-primary/5 border-primary/20'
                            : 'bg-white border-primary/10'
                        }`}
                        onClick={() => markAsRead(notification._id!)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h3 className="font-heading font-semibold text-primary text-sm">
                              {notification.title}
                            </h3>
                            <p className="text-xs text-secondary font-paragraph mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-secondary/60 font-paragraph mt-2">
                              {notification.creationDate
                                ? new Date(notification.creationDate).toLocaleDateString()
                                : 'Just now'}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification._id!);
                            }}
                            className="h-6 w-6 p-0 text-secondary hover:bg-secondary/10"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
