import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Products } from '@/entities';
import { Image } from '@/components/ui/image';
import { ArrowLeft, ShoppingCart, Heart } from 'lucide-react';

export default function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Products | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (productId) {
          const item = await BaseCrudService.getById<Products>('products', productId);
          setProduct(item);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} of ${product?.name} to cart`);
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-dark-gray">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-dark-gray mb-4">Product not found.</p>
        <Link to="/" className="text-primary hover:text-organic-green-light transition-colors">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-primary hover:text-organic-green-light transition-colors"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      {/* Product Details */}
      <section className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
          >
            <div className="w-full aspect-square bg-light-gray rounded-lg overflow-hidden">
              {product.mainImage ? (
                <Image
                  src={product.mainImage}
                  alt={product.name || 'Product'}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-border-gray">
                  No Image Available
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            {/* Category Badge */}
            {product.category && (
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-organic-green-lighter text-primary text-xs font-semibold rounded-full">
                  {product.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-dark-gray mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <span className="text-dark-gray opacity-60">(128 reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="font-heading text-5xl font-bold text-primary">
                ${product.price?.toFixed(2) || '0.00'}
              </p>
              <p className="text-dark-gray opacity-60 text-sm mt-2">
                {product.isSeasonal ? '✓ Seasonal Product' : '✓ Year-round Available'}
              </p>
            </div>

            {/* Description */}
            {product.description && (
              <div className="mb-8">
                <h3 className="font-semibold text-dark-gray mb-3">Description</h3>
                <p className="text-dark-gray opacity-75 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-dark-gray mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-border-gray rounded-lg flex items-center justify-center hover:bg-light-gray transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-10 border border-border-gray rounded-lg text-center focus:outline-none focus:border-primary"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-border-gray rounded-lg flex items-center justify-center hover:bg-light-gray transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 px-6 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-organic-green-light transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleToggleWishlist}
                className={`px-6 py-4 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  isWishlisted
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : 'border border-border-gray text-dark-gray hover:bg-light-gray'
                }`}
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                {isWishlisted ? 'Saved' : 'Save'}
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="border-t border-border-gray pt-8">
              <h3 className="font-semibold text-dark-gray mb-4">Why Choose Us?</h3>
              <ul className="space-y-3 text-sm text-dark-gray opacity-75">
                <li className="flex items-center gap-3">
                  <span className="text-primary font-bold">✓</span>
                  100% Organic & Chemical-Free
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary font-bold">✓</span>
                  Direct from Certified Farms
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary font-bold">✓</span>
                  Fresh Delivery Guaranteed
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary font-bold">✓</span>
                  30-Day Money Back Guarantee
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="bg-light-gray py-16">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-dark-gray mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="bg-white border border-border-gray rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="relative overflow-hidden bg-light-gray aspect-square">
                  <div className="w-full h-full flex items-center justify-center text-border-gray">
                    Product {i + 1}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-dark-gray text-sm line-clamp-2 mb-2">
                    Related Product {i + 1}
                  </h3>
                  <p className="font-heading font-bold text-lg text-primary">
                    ${(Math.random() * 40 + 5).toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
