import { useEffect, useState } from 'react';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useAuthStore } from '@/stores/authStore';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { Wishlist } from '@/entities';

interface WishlistButtonProps {
  productId: string;
  className?: string;
}

export default function WishlistButton({ productId, className = '' }: WishlistButtonProps) {
  const { items, addItem, removeItem, isInWishlist, loadWishlist } = useWishlistStore();
  const { memberId, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (memberId && isAuthenticated) {
      loadWishlist(memberId);
    }
  }, [memberId, isAuthenticated, loadWishlist]);

  const inWishlist = isInWishlist(productId);

  const handleToggleWishlist = async () => {
    if (!isAuthenticated || !memberId) {
      alert('Please sign in to add items to wishlist');
      return;
    }

    setLoading(true);
    try {
      if (inWishlist) {
        // Remove from wishlist
        const item = items.find(i => i.productId === productId);
        if (item?._id) {
          await BaseCrudService.delete('wishlist', item._id);
          removeItem(item._id);
        }
      } else {
        // Add to wishlist
        const newItem: Wishlist = {
          _id: crypto.randomUUID(),
          userId: memberId,
          productId,
          dateAdded: new Date(),
          quantity: 1,
        };
        await BaseCrudService.create('wishlist', newItem);
        addItem(newItem);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggleWishlist}
      disabled={loading}
      className={`h-10 w-10 p-0 ${className}`}
    >
      <Heart
        className={`h-5 w-5 transition-colors ${
          inWishlist ? 'fill-secondary text-secondary' : 'text-secondary'
        }`}
      />
    </Button>
  );
}
