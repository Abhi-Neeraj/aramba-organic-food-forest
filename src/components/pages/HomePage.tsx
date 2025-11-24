import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Truck, Leaf, Award, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Products, ProductCategories } from '@/entities';

export default function HomePage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [categories, setCategories] = useState<ProductCategories[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          BaseCrudService.getAll<Products>('products'),
          BaseCrudService.getAll<ProductCategories>('productcategories')
        ]);
        
        setProducts(productsData.items);
        setCategories(categoriesData.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const seasonalProducts = products.filter(product => product.isSeasonal).slice(0, 6);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, seasonalProducts.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, seasonalProducts.length - 2)) % Math.max(1, seasonalProducts.length - 2));
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'm interested in your organic products. Can you help me?");
    window.open(`https://wa.me/918879543210?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
      >
        <Image
          src="https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg"
          alt="Basket of fresh organic produce"
          className="absolute inset-0 w-full h-full object-cover object-center"
          width={1920}
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center p-8 max-w-4xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.5 } }}
          >
            Fresh From Our Forest To Your Table
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-white mb-8 font-paragraph"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.7 } }}
          >
            Experience the taste of truly organic produce grown with love and care in our sustainable food forest
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.9 } }}
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/store">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/our-team">Meet Our Farmers</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Trust Bar */}
      <section className="py-12 bg-white">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-heading font-semibold text-primary mb-2">100% Organic</h3>
              <p className="text-sm text-gray-600 font-paragraph">Certified organic produce</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-heading font-semibold text-primary mb-2">Fresh Delivery</h3>
              <p className="text-sm text-gray-600 font-paragraph">Farm to table in 24 hours</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-heading font-semibold text-primary mb-2">Quality Assured</h3>
              <p className="text-sm text-gray-600 font-paragraph">Rigorous quality checks</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-heading font-semibold text-primary mb-2">Award Winning</h3>
              <p className="text-sm text-gray-600 font-paragraph">Recognized excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 bg-background">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600 font-paragraph max-w-2xl mx-auto">
              Discover our carefully curated selection of organic produce, each category offering the finest quality from our sustainable food forest.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Card key={category._id} className="group hover:shadow-lg transition-all duration-300 bg-white rounded-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.categoryImage || 'https://static.wixstatic.com/media/966ae5_aa030488e937473b95b98b49ed163b2b~mv2.png?originWidth=256&originHeight=192'}
                      alt={`${category.name} category`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      width={300}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-semibold text-primary mb-2">{category.name}</h3>
                    <p className="text-gray-600 font-paragraph text-sm mb-4">{category.shortDescription}</p>
                    <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                      <Link to="/store">Explore {category.name}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Highlights */}
      {seasonalProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-[120rem] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-primary mb-4">Seasonal Highlights</h2>
              <p className="text-lg text-gray-600 font-paragraph max-w-2xl mx-auto">
                Fresh picks of the season, harvested at peak ripeness for maximum flavor and nutrition.
              </p>
            </div>
            
            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
                >
                  {seasonalProducts.map((product) => (
                    <div key={product._id} className="w-1/3 flex-shrink-0 px-3">
                      <Card className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-0">
                          <div className="relative">
                            <Image
                              src={product.mainImage || 'https://static.wixstatic.com/media/966ae5_83814715d74745de862f03bde6326ac8~mv2.png?originWidth=256&originHeight=192'}
                              alt={product.name || 'Product'}
                              className="w-full h-48 object-cover"
                              width={300}
                            />
                            <Badge className="absolute top-3 left-3 bg-terracotta text-white">
                              Seasonal
                            </Badge>
                          </div>
                          <div className="p-4">
                            <h3 className="font-heading font-semibold text-primary mb-2">{product.name}</h3>
                            <p className="text-2xl font-bold text-secondary mb-4">₹{product.price}</p>
                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                                Add to Cart
                              </Button>
                              <Button asChild variant="outline" size="sm">
                                <Link to="/store">View</Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
              
              {seasonalProducts.length > 3 && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg"
                    onClick={prevSlide}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg"
                    onClick={nextSlide}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Our Story & Certification */}
      <section className="py-16 bg-background">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Our Story Card */}
            <Card className="bg-white rounded-xl shadow-md overflow-hidden">
              <CardContent className="p-8">
                <h2 className="text-3xl font-heading font-bold text-primary mb-6">Our Story</h2>
                <div className="space-y-4 font-paragraph text-gray-600">
                  <p>
                    ARAMBA • Organic Food Forest was born from a simple belief: that the earth provides everything we need when we work in harmony with nature. Our journey began with a small plot of land and a big dream to create a sustainable food system that nourishes both people and planet.
                  </p>
                  <p>
                    Today, our food forest spans acres of biodiverse farmland where fruits, vegetables, herbs, and grains grow together in natural symbiosis. We use permaculture principles, avoiding synthetic chemicals and embracing traditional farming wisdom passed down through generations.
                  </p>
                  <p>
                    Every product that reaches your table is a testament to our commitment to organic excellence, environmental stewardship, and the belief that good food should be accessible to all.
                  </p>
                </div>
                <Button asChild className="mt-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  <Link to="/our-team">Meet Our Team</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Certification Card */}
            <Card className="bg-white rounded-xl shadow-md overflow-hidden">
              <CardContent className="p-8">
                <h2 className="text-3xl font-heading font-bold text-primary mb-6">Our Certifications</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-8 w-8 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-primary mb-2">Organic India Certified</h3>
                      <p className="text-gray-600 font-paragraph text-sm">
                        Certified by the National Programme for Organic Production (NPOP), ensuring our products meet the highest organic standards.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Leaf className="h-8 w-8 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-primary mb-2">Sustainable Agriculture</h3>
                      <p className="text-gray-600 font-paragraph text-sm">
                        Recognized for our commitment to sustainable farming practices and biodiversity conservation.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="h-8 w-8 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-primary mb-2">Food Safety Standards</h3>
                      <p className="text-gray-600 font-paragraph text-sm">
                        Compliant with FSSAI regulations and international food safety standards for your peace of mind.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sticky WhatsApp CTA for Mobile */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button
          onClick={handleWhatsAppClick}
          className="w-14 h-14 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}