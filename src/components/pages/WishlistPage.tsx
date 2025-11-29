import { useEffect, useState } from 'react';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useAuthStore } from '@/stores/authStore';
import { BaseCrudService } from '@/integrations';
import { Wishlist, Products } from '@/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function WishlistPage() {
  const { items, loadWishlist, removeItem } = useWishlistStore();
  const { memberId, isAuthenticated } = useAuthStore();
  const [products, setProducts] = useState<Map<string, Products>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!isAuthenticated || !memberId) {
        setLoading(false);
        return;
      }

      try {
        await loadWishlist(memberId);
        const { items: allProducts } = await BaseCrudService.getAll<Products>('products');
        const productMap = new Map(allProducts.map(p => [p._id, p]));
        setProducts(productMap);
      } catch (error) {
        console.error('Error loading wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [memberId, isAuthenticated, loadWishlist]);

  const handleRemove = async (wishlistId: string) => {
    try {
      await BaseCrudService.delete('wishlist', wishlistId);
      removeItem(wishlistId);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-[120rem] mx-auto px-6 py-12">
          <h1 className="text-3xl font-heading font-semibold text-primary mb-6">My Wishlist</h1>
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <p className="text-center text-secondary font-paragraph mb-4">Please sign in to view your wishlist</p>
              <div className="flex justify-center">
                <Button className="bg-primary hover:bg-primary/90">Sign In</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[120rem] mx-auto px-6 py-12">
        <h1 className="text-3xl font-heading font-semibold text-primary mb-8">My Wishlist</h1>

        {items.length === 0 ? (
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Heart className="h-12 w-12 text-secondary/30 mx-auto mb-4" />
                <p className="text-secondary font-paragraph mb-4">Your wishlist is empty</p>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <a href="/store">Continue Shopping</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((wishlistItem, index) => {
              const product = products.get(wishlistItem.productId || '');

              return (
                <motion.div
                  key={wishlistItem._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="border-primary/20 h-full flex flex-col hover:shadow-lg transition-shadow">
                    {product?.mainImage && (
                      <div className="relative h-48 overflow-hidden rounded-t-lg bg-primary/5">
                        <Image
                          src={product.mainImage}
                          alt={product.name || 'Product'}
                          className="w-full h-full object-cover"
                          width={300}
                        />
                      </div>
                    )}

                    <CardContent className="flex-1 pt-4">
                      <h3 className="font-heading font-semibold text-primary mb-2">
                        {product?.name || 'Product'}
                      </h3>
                      <p className="text-secondary font-paragraph text-sm mb-4">
                        {product?.description || 'No description available'}
                      </p>

                      {product?.price && (
                        <p className="text-lg font-heading font-bold text-primary mb-4">
                          ₹{product.price.toFixed(2)}
                        </p>
                      )}

                      <div className="flex gap-2">
                        <Button className="flex-1 bg-secondary hover:bg-secondary/90">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemove(wishlistItem._id!)}
                          className="border-secondary text-secondary hover:bg-secondary/5"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
