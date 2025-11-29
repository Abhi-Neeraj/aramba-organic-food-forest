import { create } from 'zustand';
import { Wishlist } from '@/entities';

interface WishlistState {
  items: Wishlist[];
  setItems: (items: Wishlist[]) => void;
  addItem: (item: Wishlist) => void;
  removeItem: (itemId: string) => void;
  isInWishlist: (productId: string) => boolean;
  loadWishlist: (userId: string) => Promise<void>;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],

  setItems: (items) => set({ items }),

  addItem: (item) => {
    set((state) => ({
      items: [item, ...state.items],
    }));
  },

  removeItem: (itemId) => {
    set((state) => ({
      items: state.items.filter(i => i._id !== itemId),
    }));
  },

  isInWishlist: (productId) => {
    return get().items.some(item => item.productId === productId);
  },

  loadWishlist: async (userId: string) => {
    try {
      const { BaseCrudService } = await import('@/integrations');
      const { items } = await BaseCrudService.getAll<Wishlist>('wishlist');
      const userWishlist = items.filter(item => item.userId === userId);
      get().setItems(userWishlist);
    } catch (error) {
      console.error('Error loading wishlist:', error);
    }
  },
}));
