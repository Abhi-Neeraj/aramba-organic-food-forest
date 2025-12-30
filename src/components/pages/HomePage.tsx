import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  Truck, 
  Shield, 
  Award, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin,
  ChevronRight,
  LogIn
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Products, ProductCategories, Certifications } from '@/entities';
import { formatINR } from '@/lib/currency';

// ===== ANIMATION VARIANTS =====
const heroTextVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.8,
      ease: 'easeOut' as const,
    },
  }),
} as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
} as const;

const productCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
} as const;

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
} as const;

const imageRevealVariants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0 0 0)',
    transition: { duration: 1, ease: 'easeOut' as const },
  },
} as const;

const certBadgeVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
} as const;

export default function HomePage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [categories, setCategories] = useState<ProductCategories[]>([]);
  const [certifications, setCertifications] = useState<Certifications[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData, certificationsData] = await Promise.all([
          BaseCrudService.getAll<Products>('products'),
          BaseCrudService.getAll<ProductCategories>('productcategories'),
          BaseCrudService.getAll<Certifications>('certifications')
        ]);
        
        setProducts(productsData.items);
        setCategories(categoriesData.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
        setCertifications(certificationsData.items.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'm interested in ARAMBA organic products. Can you help me?");
    window.open(`https://wa.me/919666277729?text=${message}`, '_blank');
  };

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-sand-lighter">
      {/* ===== 1. HERO SECTION ===== */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-charcoal via-charcoal-dark to-brown-dark grain-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Image with Cinematic Parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        >
          <Image
            src="https://res.cloudinary.com/dicfqwlfq/image/upload/v1763968767/360_F_708626395_P7O5qLX5ZyUBirtGRJzZDiuzM1AHEbJK_rpzjt3.jpg"
            alt="Fresh organic produce from ARAMBA farm"
            className="w-full h-full object-cover"
            width={1920}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/50 to-charcoal/70"></div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Main Headline - Line by Line */}
          <motion.div className="mb-6 overflow-hidden">
            <motion.h1 
              className="text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-sand leading-tight"
              custom={0}
              variants={heroTextVariants}
              initial="hidden"
              animate="visible"
            >
              From Our Farm
            </motion.h1>
          </motion.div>

          <motion.div className="mb-8 overflow-hidden">
            <motion.h1 
              className="text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-copper leading-tight"
              custom={1}
              variants={heroTextVariants}
              initial="hidden"
              animate="visible"
            >
              To Your Table
            </motion.h1>
          </motion.div>

          {/* Subheading */}
          <motion.p 
            className="text-lg md:text-xl text-sand/90 mb-12 font-light max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            100% organic, chemical-free produce delivered fresh to your doorstep. Supporting farmers, nourishing families.
          </motion.p>

          {/* CTA Buttons - Delayed Appearance */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-copper hover:bg-copper-light text-white shadow-xl hover:shadow-2xl transition-all duration-300 group uppercase tracking-wider"
              >
                <Link to="/store" className="flex items-center gap-2">
                  Shop Now
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={handleWhatsAppClick}
                size="lg" 
                className="bg-sand text-charcoal hover:bg-sand-light shadow-xl hover:shadow-2xl transition-all duration-300 group uppercase tracking-wider"
              >
                <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Chat on WhatsApp
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== 2. SHOP SECTION ===== */}
      <motion.section 
        className="py-24 bg-sand-lighter"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-heading font-bold text-charcoal mb-4"
              variants={itemVariants}
            >
              Shop Our Categories
            </motion.h2>
            <motion.p 
              className="text-lg text-brown font-light max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Carefully curated organic produce, fresh from our sustainable farm
            </motion.p>
          </motion.div>

          {/* Categories Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {categories.slice(0, 4).map((category, index) => (
              <motion.div
                key={category._id}
                variants={productCardVariants}
                whileHover={{ y: -12, boxShadow: '0 20px 40px rgba(193, 122, 74, 0.15)' }}
                transition={{ duration: 0.3 }}
              >
                <Link to="/store">
                  <Card className="overflow-hidden h-full cursor-pointer border-2 border-brown/20 hover:border-copper transition-all duration-300 bg-white">
                    <CardContent className="p-0">
                      <motion.div 
                        className="relative h-40 overflow-hidden bg-brown/5"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Image
                          src={category.categoryImage || 'https://via.placeholder.com/300x200?text=Category'}
                          alt={category.name || 'Product category'}
                          className="w-full h-full object-cover"
                          width={300}
                        />
                      </motion.div>
                      <div className="p-6">
                        <h3 className="text-xl font-heading font-bold text-charcoal mb-2">
                          {category.name}
                        </h3>
                        <p className="text-sm text-brown font-light mb-4">
                          {category.shortDescription}
                        </p>
                        <Button 
                          asChild 
                          variant="outline" 
                          className="w-full border-2 border-copper text-copper hover:bg-copper hover:text-white uppercase tracking-wider font-semibold"
                        >
                          <Link to="/store">Browse</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Featured Products */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h3 
              className="text-4xl font-heading font-bold text-charcoal mb-12"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Featured Products
            </motion.h3>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {featuredProducts.map((product) => (
                <motion.div
                  key={product._id}
                  variants={productCardVariants}
                  whileHover={{ y: -12, boxShadow: '0 20px 40px rgba(193, 122, 74, 0.15)' }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden h-full border-2 border-brown/20 hover:border-copper transition-all duration-300 bg-white">
                    <CardContent className="p-0">
                      <Link to={`/products/${product._id}`}>
                        <motion.div 
                          className="relative h-48 overflow-hidden bg-brown/5 cursor-pointer"
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.4 }}
                        >
                          <Image
                            src={product.mainImage || 'https://via.placeholder.com/300x200?text=Product'}
                            alt={product.name || 'Product'}
                            className="w-full h-full object-cover"
                            width={300}
                          />
                          {product.isSeasonal && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.4 }}
                              viewport={{ once: true }}
                            >
                              <Badge className="absolute top-3 left-3 bg-burnt-orange text-white uppercase tracking-wider font-bold">
                                Seasonal
                              </Badge>
                            </motion.div>
                          )}
                        </motion.div>
                      </Link>

                      <div className="p-6">
                        <Link to={`/products/${product._id}`}>
                          <h3 className="text-lg font-heading font-bold text-charcoal mb-2 hover:text-copper transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <p className="text-sm text-brown font-light mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-heading font-bold text-copper">
                            {formatINR(product.price)}
                          </span>
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            className="w-full bg-copper hover:bg-copper-light text-white uppercase tracking-wider font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            Add to Cart
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== 3. WHY ARAMBA SECTION ===== */}
      <motion.section 
        className="py-24 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-heading font-bold text-charcoal mb-4"
              variants={itemVariants}
            >
              Why Choose ARAMBA?
            </motion.h2>
            <motion.p 
              className="text-lg text-brown font-light max-w-2xl mx-auto"
              variants={itemVariants}
            >
              We're committed to your health and the planet's wellbeing
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              {
                icon: Leaf,
                title: 'Chemical-Free',
                description: 'No synthetic pesticides, fertilizers, or GMOs. Pure organic farming.'
              },
              {
                icon: Truck,
                title: 'Direct From Farmers',
                description: 'Fair prices for farmers, fresh produce for you. No middlemen.'
              },
              {
                icon: Award,
                title: 'Fresh Delivery',
                description: 'Harvested at peak ripeness, delivered within 24 hours.'
              },
              {
                icon: Shield,
                title: 'Safe & Certified',
                description: 'NPOP certified organic. Rigorous quality and food safety standards.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <motion.div 
                    className="w-24 h-24 bg-gradient-to-br from-copper/20 to-burnt-orange/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    variants={iconVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                  >
                    <item.icon className="h-12 w-12 text-copper" />
                  </motion.div>
                  <h3 className="text-2xl font-heading font-bold text-charcoal mb-3">
                    {item.title}
                  </h3>
                  <p className="text-brown font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ===== 4. ABOUT US SECTION ===== */}
      <motion.section 
        className="py-24 bg-sand-lighter"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.h2 
                className="text-5xl md:text-6xl font-heading font-bold text-charcoal mb-8"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                About ARAMBA
              </motion.h2>

              <motion.div 
                className="space-y-6 mb-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
              >
                <motion.p
                  className="text-lg text-charcoal font-light leading-relaxed"
                  variants={itemVariants}
                >
                  ARAMBA is a farmer-first organic produce platform dedicated to connecting you with the freshest, chemical-free fruits and vegetables directly from sustainable farms.
                </motion.p>
                <motion.p
                  className="text-lg text-charcoal font-light leading-relaxed"
                  variants={itemVariants}
                >
                  We believe in fair trade, environmental stewardship, and the simple truth that good food shouldn't be complicated. Every product we deliver is a promise: grown with care, delivered with integrity.
                </motion.p>
                <motion.p
                  className="text-lg text-charcoal font-light leading-relaxed"
                  variants={itemVariants}
                >
                  Our mission is to make organic, healthy eating accessible to every family while ensuring farmers receive fair compensation for their work.
                </motion.p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  asChild 
                  className="bg-copper hover:bg-copper-light text-white uppercase tracking-wider font-bold shadow-lg hover:shadow-xl"
                >
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.div
                variants={imageRevealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
              >
                <div className="rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src="https://res.cloudinary.com/dicfqwlfq/image/upload/v1763968767/360_F_708626395_P7O5qLX5ZyUBirtGRJzZDiuzM1AHEbJK_rpzjt3.jpg"
                    alt="ARAMBA organic farm"
                    className="w-full h-96 object-cover"
                    width={500}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ===== 5. CERTIFICATIONS SECTION ===== */}
      <motion.section 
        className="py-24 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-heading font-bold text-charcoal mb-4"
              variants={itemVariants}
            >
              Certified & Trusted
            </motion.h2>
            <motion.p 
              className="text-lg text-brown font-light max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Our commitment to quality is backed by recognized certifications
            </motion.p>
          </motion.div>

          {certifications.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert._id}
                  variants={certBadgeVariants}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(193, 122, 74, 0.15)' }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full border-2 border-brown/20 hover:border-copper transition-all duration-300 bg-sand-lighter">
                    <CardContent className="p-8 text-center">
                      {cert.logo && (
                        <motion.div 
                          className="mb-6 flex justify-center"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Image
                            src={cert.logo}
                            alt={cert.name || 'Certification'}
                            className="h-16 w-auto object-contain"
                            width={100}
                          />
                        </motion.div>
                      )}
                      <h3 className="text-xl font-heading font-bold text-charcoal mb-2">
                        {cert.name}
                      </h3>
                      <p className="text-sm text-brown font-light">
                        {cert.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : null}

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button 
              asChild 
              variant="outline" 
              className="border-2 border-copper text-copper hover:bg-copper hover:text-white uppercase tracking-wider font-bold"
            >
              <Link to="/certifications">View All Certifications</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== 6. LOGIN SECTION ===== */}
      <motion.section 
        className="py-24 bg-sand-lighter"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-heading font-bold text-charcoal mb-4"
              variants={itemVariants}
            >
              Join ARAMBA
            </motion.h2>
            <motion.p 
              className="text-lg text-brown font-light max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Sign in to your account or create a new one
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              { role: 'customer', label: 'Customer Login', icon: LogIn },
              { role: 'farmer', label: 'Farmer Login', icon: Leaf },
              { role: 'admin', label: 'Admin Login', icon: Shield }
            ].map((item) => (
              <motion.div
                key={item.role}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <Button 
                  asChild 
                  className="w-full h-40 bg-copper hover:bg-copper-light text-white flex flex-col items-center justify-center gap-3 text-lg font-heading uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link to="/login">
                    <item.icon className="h-8 w-8" />
                    {item.label}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ===== 7. CONTACT + WHATSAPP SECTION ===== */}
      <motion.section 
        className="py-24 bg-gradient-to-br from-charcoal via-charcoal-dark to-brown-dark text-sand grain-overlay"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <h2 className="text-5xl font-heading font-bold mb-12">Get in Touch</h2>
              
              <div className="space-y-8 mb-12">
                <motion.div 
                  className="flex items-start gap-4"
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Phone className="h-6 w-6 mt-1 flex-shrink-0 text-copper" />
                  <div>
                    <p className="font-heading font-bold mb-1 uppercase tracking-wider">Phone</p>
                    <a href="tel:+919666277729" className="text-sand/80 hover:text-copper transition-colors">
                      +91 96662 77729
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4"
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Mail className="h-6 w-6 mt-1 flex-shrink-0 text-copper" />
                  <div>
                    <p className="font-heading font-bold mb-1 uppercase tracking-wider">Email</p>
                    <a href="mailto:hello@aramba.com" className="text-sand/80 hover:text-copper transition-colors">
                      hello@aramba.com
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4"
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  <MapPin className="h-6 w-6 mt-1 flex-shrink-0 text-copper" />
                  <div>
                    <p className="font-heading font-bold mb-1 uppercase tracking-wider">Address</p>
                    <p className="text-sand/80">
                      ARAMBA Organic Farm<br />
                      Sustainable Agriculture Zone<br />
                      India
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  onClick={handleWhatsAppClick}
                  className="w-full bg-copper hover:bg-copper-light text-white text-lg font-heading py-6 uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <MessageCircle className="h-6 w-6 mr-3" />
                  Chat on WhatsApp
                </Button>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl font-heading font-bold mb-8 uppercase tracking-wider">Send us a Message</h3>
              
              <form className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-sm font-heading font-bold mb-2 uppercase tracking-wider">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-sand/30 text-sand placeholder-sand/50 focus:outline-none focus:border-copper focus:bg-white/20 transition-all duration-300"
                    placeholder="Your name"
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-sm font-heading font-bold mb-2 uppercase tracking-wider">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-sand/30 text-sand placeholder-sand/50 focus:outline-none focus:border-copper focus:bg-white/20 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-sm font-heading font-bold mb-2 uppercase tracking-wider">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-sand/30 text-sand placeholder-sand/50 focus:outline-none focus:border-copper focus:bg-white/20 transition-all duration-300 resize-none"
                    placeholder="Your message..."
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button 
                    type="submit"
                    className="w-full bg-copper hover:bg-copper-light text-white font-heading uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
