import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Products } from '@/entities';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { ShoppingCart, Package } from 'lucide-react';

export default function GroceryStaplesPage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Products>('products');
        const filtered = items.filter(
          (p) =>
            p.category?.toLowerCase().includes('grocery') ||
            p.category?.toLowerCase().includes('staple') ||
            p.category?.toLowerCase().includes('grain') ||
            p.category?.toLowerCase().includes('rice')
        );
        setProducts(filtered);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-amber-600 to-amber-700 py-16 px-6">
        <div className="max-w-[100rem] mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Package className="w-12 h-12 text-amber-100" />
            <h1 className="text-5xl font-heading font-bold text-white">
              Grocery & Staples
            </h1>
          </div>
          <p className="text-lg text-amber-50 max-w-2xl">
            Essential pantry items and organic staples for your everyday cooking needs.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-[100rem] mx-auto px-6 py-16">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                {product.mainImage && (
                  <div className="h-48 overflow-hidden bg-gray-200">
                    <Image
                      src={product.mainImage}
                      alt={product.name || 'Product'}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-heading font-bold text-primary mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 flex-grow line-clamp-2">
                    {product.description}
                  </p>

                  {product.isSeasonal && (
                    <Badge className="bg-amber-100 text-amber-800 mb-3 w-fit">
                      Seasonal
                    </Badge>
                  )}

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-primary">
                      ${product.price?.toFixed(2)}
                    </span>
                    <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products available in this category.</p>
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="bg-amber-50 py-12 px-6">
        <div className="max-w-[100rem] mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">Quality Staples for Your Kitchen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-primary mb-2">✓ Certified Organic</h3>
              <p className="text-gray-700 text-sm">
                All staples are certified organic with no artificial additives.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">✓ Long Shelf Life</h3>
              <p className="text-gray-700 text-sm">
                Properly stored for maximum freshness and nutritional value.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">✓ Best Value</h3>
              <p className="text-gray-700 text-sm">
                Competitive pricing on bulk items and family-size packages.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
