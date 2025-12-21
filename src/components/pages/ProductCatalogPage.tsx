import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Products, ProductCategories } from '@/entities';
import { formatINR } from '@/lib/currency';
import { Link } from 'react-router-dom';

export default function ProductCatalogPage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [categories, setCategories] = useState<ProductCategories[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          BaseCrudService.getAll<Products>('products'),
          BaseCrudService.getAll<ProductCategories>('productcategories')
        ]);
        
        setProducts(productsData.items);
        setCategories(categoriesData.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
        setFilteredProducts(productsData.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(p => (p.price || 0) >= priceRange[0] && (p.price || 0) <= priceRange[1]);

    // Sorting
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, priceRange, sortBy, products]);

  const filterOptions = [
    { label: 'Organic Certified', value: 'organic' },
    { label: 'Seasonal', value: 'seasonal' },
    { label: 'Local Sourced', value: 'local' },
    { label: 'Fair Trade', value: 'fairtrade' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        className="relative h-64 flex items-center justify-center overflow-hidden bg-gradient-to-r from-primary to-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
      >
        <div className="relative z-10 text-center px-6">
          <motion.h1
            className="text-5xl md:text-6xl font-heading font-bold text-white mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.2 } }}
          >
            Our Products
          </motion.h1>
          <motion.p
            className="text-xl text-white font-paragraph"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.4 } }}
          >
            Discover our complete range of organic, sustainably grown produce
          </motion.p>
        </div>
      </motion.section>

      <div className="max-w-[120rem] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-white rounded-xl overflow-hidden sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6 lg:hidden">
                  <h3 className="text-lg font-heading font-semibold text-primary">Filters</h3>
                  <button onClick={() => setShowFilters(false)} className="text-gray-500">✕</button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-primary mb-2">Search</label>
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-primary mb-3">Categories</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === null
                          ? 'bg-secondary text-white'
                          : 'hover:bg-background text-gray-600'
                      }`}
                    >
                      All Products
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat._id}
                        onClick={() => setSelectedCategory(cat.name || '')}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                          selectedCategory === cat.name
                            ? 'bg-secondary text-white'
                            : 'hover:bg-background text-gray-600'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-primary mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="text-sm text-gray-600">
                      ₹{priceRange[0]} - ₹{priceRange[1]}
                    </div>
                  </div>
                </div>

                {/* Filter Options */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-primary mb-3">Features</h4>
                  <div className="space-y-2">
                    {filterOptions.map(option => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="text-sm text-gray-600">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-3">Sort By</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary">
                  {selectedCategory ? `${selectedCategory}` : 'All Products'}
                </h2>
                <p className="text-gray-600 font-paragraph text-sm">
                  Showing {filteredProducts.length} products
                </p>
              </div>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
                    viewport={{ once: true, margin: '-100px' }}
                  >
                    <Card className="bg-white rounded-xl overflow-hidden h-full hover:shadow-lg transition-shadow">
                      <div className="relative">
                        {product.mainImage && (
                          <Image
                            src={product.mainImage}
                            alt={product.name || 'Product'}
                            className="w-full h-48 object-cover"
                            width={300}
                          />
                        )}
                        {product.isSeasonal && (
                          <Badge className="absolute top-3 right-3 bg-secondary text-white">
                            Seasonal
                          </Badge>
                        )}
                        <button className="absolute top-3 left-3 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors">
                          <Heart className="h-5 w-5 text-secondary" />
                        </button>
                      </div>

                      <CardContent className="p-4">
                        <h3 className="text-lg font-heading font-semibold text-primary mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 font-paragraph text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-secondary text-secondary"
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">(24 reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="mb-4">
                          <span className="text-2xl font-heading font-bold text-secondary">
                            {formatINR(product.price || 0)}
                          </span>
                        </div>

                        {/* Button */}
                        <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                          <Link to={`/products/${product._id}`}>
                            View Details
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 font-paragraph mb-4">No products found matching your filters.</p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
