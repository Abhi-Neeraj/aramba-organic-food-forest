import { create } from 'zustand';
import { UserRoles } from '@/entities';

export type UserRole = 'admin' | 'farmer' | 'customer' | 'delivery-agent';

interface AuthState {
  userRole: UserRole | null;
  memberId: string | null;
  isAuthenticated: boolean;
  userRoleData: UserRoles | null;
  setUserRole: (role: UserRole, memberId: string, data: UserRoles) => void;
  clearAuth: () => void;
  loadUserRole: (memberId: string) => Promise<void>;
  initializeFromStorage: () => void;
}

// Helper function to get initial state from localStorage
const getInitialState = () => {
  if (typeof window === 'undefined') {
    return { userRole: null, memberId: null, isAuthenticated: false, userRoleData: null };
  }
  
  const userRole = localStorage.getItem('userRole') as UserRole | null;
  const memberId = localStorage.getItem('memberId');
  
  return {
    userRole,
    memberId,
    isAuthenticated: !!userRole && !!memberId,
    userRoleData: null,
  };
};

export const useAuthStore = create<AuthState>((set) => {
  const initialState = getInitialState();
  
  return {
    ...initialState,
    
    setUserRole: (role: UserRole, memberId: string, data: UserRoles) => {
      set({
        userRole: role,
        memberId,
        isAuthenticated: true,
        userRoleData: data,
      });
      // Persist to localStorage
      localStorage.setItem('userRole', role);
      localStorage.setItem('memberId', memberId);
    },
    
    clearAuth: () => {
      set({
        userRole: null,
        memberId: null,
        isAuthenticated: false,
        userRoleData: null,
      });
      localStorage.removeItem('userRole');
      localStorage.removeItem('memberId');
    },
    
    loadUserRole: async (memberId: string) => {
      try {
        const { BaseCrudService } = await import('@/integrations');
        const { items } = await BaseCrudService.getAll<UserRoles>('userroles');
        const userRole = items.find(role => role.memberId === memberId && role.isActive);
        
        if (userRole && userRole.roleType) {
          set({
            userRole: userRole.roleType as UserRole,
            memberId,
            isAuthenticated: true,
            userRoleData: userRole,
          });
        }
      } catch (error) {
        console.error('Error loading user role:', error);
      }
    },
    
    initializeFromStorage: () => {
      const state = getInitialState();
      set(state);
    },
  };
});