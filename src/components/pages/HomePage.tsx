import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Filter, X } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Products } from '@/entities';
import { Image } from '@/components/ui/image';

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<string>('featured');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'fruits', name: 'Organic Fruits' },
    { id: 'vegetables', name: 'Organic Vegetables' },
    { id: 'grains', name: 'Grains & Pulses' },
    { id: 'dairy', name: 'Dairy Products' },
    { id: 'staples', name: 'Grocery Staples' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Products>('products');
        setProducts(items || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category?.toLowerCase() === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(p => (p.price || 0) >= priceRange[0] && (p.price || 0) <= priceRange[1]);

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, priceRange, sortBy]);

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-organic-green-lighter to-white py-16 sm:py-24">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-dark-gray mb-4">
              Fresh Organic Food Delivered Direct From Farms
            </h1>
            <p className="text-lg text-dark-gray mb-8 opacity-90">
              Trusted. Certified. Chemical-Free.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-block px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-organic-green-light transition-colors"
            >
              Shop Organic Food
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-6">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-20 bg-light-gray p-6 rounded-lg">
              <h2 className="font-heading font-semibold text-lg text-dark-gray mb-6">Filters</h2>

              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-dark-gray mb-4 text-sm">Category</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={cat.id}
                        checked={selectedCategory === cat.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-sm text-dark-gray">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-dark-gray mb-4 text-sm">Price Range</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-sm text-dark-gray">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="font-semibold text-dark-gray mb-4 text-sm">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-border-gray rounded text-sm text-dark-gray focus:outline-none focus:border-primary"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-6 w-full">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-border-gray rounded-lg text-dark-gray hover:bg-light-gray transition-colors"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>

            {/* Mobile Filter Panel */}
            {mobileFilterOpen && (
              <div className="fixed inset-0 z-40 bg-black/50 lg:hidden">
                <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="absolute top-4 right-4 p-2 text-dark-gray hover:bg-light-gray rounded"
                  >
                    <X size={20} />
                  </button>

                  <h2 className="font-heading font-semibold text-lg text-dark-gray mb-6 mt-4">Filters</h2>

                  {/* Category Filter */}
                  <div className="mb-8">
                    <h3 className="font-semibold text-dark-gray mb-4 text-sm">Category</h3>
                    <div className="space-y-2">
                      {categories.map(cat => (
                        <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="category"
                            value={cat.id}
                            checked={selectedCategory === cat.id}
                            onChange={(e) => {
                              setSelectedCategory(e.target.value);
                              setMobileFilterOpen(false);
                            }}
                            className="w-4 h-4 accent-primary"
                          />
                          <span className="text-sm text-dark-gray">{cat.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="mb-8">
                    <h3 className="font-semibold text-dark-gray mb-4 text-sm">Price Range</h3>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full accent-primary"
                      />
                      <div className="flex justify-between text-sm text-dark-gray">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sort */}
                  <div>
                    <h3 className="font-semibold text-dark-gray mb-4 text-sm">Sort By</h3>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-border-gray rounded text-sm text-dark-gray focus:outline-none focus:border-primary"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name">Name: A to Z</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-dark-gray">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-dark-gray">No products found. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: (index % 5) * 0.05 }}
                    viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                    onClick={() => handleProductClick(product._id)}
                    className="bg-white border border-border-gray rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                  >
                    {/* Product Image */}
                    <div className="relative overflow-hidden bg-light-gray aspect-square">
                      {product.mainImage ? (
                        <Image
                          src={product.mainImage}
                          alt={product.name || 'Product'}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-border-gray">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-dark-gray text-sm line-clamp-2 mb-2">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-xs">★</span>
                          ))}
                        </div>
                        <span className="text-xs text-dark-gray opacity-60">(24)</span>
                      </div>

                      {/* Price */}
                      <p className="font-heading font-bold text-lg text-primary mb-3">
                        ${product.price?.toFixed(2) || '0.00'}
                      </p>

                      {/* Add to Cart Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add to cart logic here
                        }}
                        className="w-full px-3 py-2 bg-primary text-white text-sm font-medium rounded hover:bg-organic-green-light transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
