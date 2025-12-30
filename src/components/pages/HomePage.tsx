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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
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
    <div className="min-h-screen bg-white">
      {/* ===== 1. HERO SECTION ===== */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 to-amber-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <Image
            src="https://res.cloudinary.com/dicfqwlfq/image/upload/v1763968767/360_F_708626395_P7O5qLX5ZyUBirtGRJzZDiuzM1AHEbJK_rpzjt3.jpg"
            alt="Fresh organic produce from ARAMBA farm"
            className="w-full h-full object-cover"
            width={1920}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From Our Farm To Your Table
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-white/90 mb-10 font-paragraph max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            100% organic, chemical-free produce delivered fresh to your doorstep. Supporting farmers, nourishing families.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-green-700 hover:bg-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Link to="/store" className="flex items-center gap-2">
                Shop Now
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button 
              onClick={handleWhatsAppClick}
              size="lg" 
              className="bg-white text-green-700 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Chat on WhatsApp
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== 2. SHOP SECTION ===== */}
      <motion.section 
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-heading font-bold text-green-900 mb-4"
              variants={itemVariants}
            >
              Shop Our Categories
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 font-paragraph max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Carefully curated organic produce, fresh from our sustainable farm
            </motion.p>
          </motion.div>

          {/* Categories Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {categories.slice(0, 4).map((category, index) => (
              <motion.div
                key={category._id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Link to="/store">
                  <Card className="overflow-hidden h-full cursor-pointer border border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative h-40 overflow-hidden bg-gray-100">
                        <Image
                          src={category.categoryImage || 'https://via.placeholder.com/300x200?text=Category'}
                          alt={category.name || 'Product category'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          width={300}
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-heading font-semibold text-green-900 mb-2">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600 font-paragraph mb-4">
                          {category.shortDescription}
                        </p>
                        <Button 
                          asChild 
                          variant="outline" 
                          className="w-full border-green-700 text-green-700 hover:bg-green-50"
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
              className="text-3xl font-heading font-bold text-green-900 mb-8"
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
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden h-full border border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0">
                      <Link to={`/products/${product._id}`}>
                        <div className="relative h-48 overflow-hidden bg-gray-100 cursor-pointer">
                          <Image
                            src={product.mainImage || 'https://via.placeholder.com/300x200?text=Product'}
                            alt={product.name || 'Product'}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            width={300}
                          />
                          {product.isSeasonal && (
                            <Badge className="absolute top-3 left-3 bg-amber-600 text-white">
                              Seasonal
                            </Badge>
                          )}
                        </div>
                      </Link>

                      <div className="p-6">
                        <Link to={`/products/${product._id}`}>
                          <h3 className="text-lg font-heading font-semibold text-green-900 mb-2 hover:text-green-700 transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <p className="text-sm text-gray-600 font-paragraph mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-bold text-green-700">
                            {formatINR(product.price)}
                          </span>
                        </div>

                        <Button 
                          className="w-full bg-green-700 hover:bg-green-800 text-white transition-all duration-300"
                        >
                          Add to Cart
                        </Button>
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
        className="py-20 bg-gradient-to-br from-green-50 to-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-heading font-bold text-green-900 mb-4"
              variants={itemVariants}
            >
              Why Choose ARAMBA?
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 font-paragraph max-w-2xl mx-auto"
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
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                  >
                    <item.icon className="h-10 w-10 text-green-700" />
                  </motion.div>
                  <h3 className="text-xl font-heading font-semibold text-green-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 font-paragraph leading-relaxed">
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
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.h2 
                className="text-4xl md:text-5xl font-heading font-bold text-green-900 mb-6"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                About ARAMBA
              </motion.h2>

              <motion.div 
                className="space-y-4 mb-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
              >
                <motion.p
                  className="text-lg text-gray-700 font-paragraph leading-relaxed"
                  variants={itemVariants}
                >
                  ARAMBA is a farmer-first organic produce platform dedicated to connecting you with the freshest, chemical-free fruits and vegetables directly from sustainable farms.
                </motion.p>
                <motion.p
                  className="text-lg text-gray-700 font-paragraph leading-relaxed"
                  variants={itemVariants}
                >
                  We believe in fair trade, environmental stewardship, and the simple truth that good food shouldn't be complicated. Every product we deliver is a promise: grown with care, delivered with integrity.
                </motion.p>
                <motion.p
                  className="text-lg text-gray-700 font-paragraph leading-relaxed"
                  variants={itemVariants}
                >
                  Our mission is to make organic, healthy eating accessible to every family while ensuring farmers receive fair compensation for their work.
                </motion.p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  asChild 
                  className="bg-green-700 hover:bg-green-800 text-white"
                >
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="rounded-lg overflow-hidden shadow-lg">
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
        className="py-20 bg-gradient-to-br from-amber-50 to-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-heading font-bold text-green-900 mb-4"
              variants={itemVariants}
            >
              Certified & Trusted
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 font-paragraph max-w-2xl mx-auto"
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
              {certifications.map((cert) => (
                <motion.div
                  key={cert._id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full border border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-8 text-center">
                      {cert.logo && (
                        <div className="mb-6 flex justify-center">
                          <Image
                            src={cert.logo}
                            alt={cert.name || 'Certification'}
                            className="h-16 w-auto object-contain"
                            width={100}
                          />
                        </div>
                      )}
                      <h3 className="text-lg font-heading font-semibold text-green-900 mb-2">
                        {cert.name}
                      </h3>
                      <p className="text-sm text-gray-600 font-paragraph">
                        {cert.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : null}

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button 
              asChild 
              variant="outline" 
              className="border-green-700 text-green-700 hover:bg-green-50"
            >
              <Link to="/certifications">View All Certifications</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== 6. LOGIN SECTION ===== */}
      <motion.section 
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-heading font-bold text-green-900 mb-4"
              variants={itemVariants}
            >
              Join ARAMBA
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 font-paragraph max-w-2xl mx-auto"
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
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Button 
                  asChild 
                  className="w-full h-32 bg-green-700 hover:bg-green-800 text-white flex flex-col items-center justify-center gap-3 text-lg font-heading"
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
        className="py-20 bg-gradient-to-br from-green-900 to-green-800 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-heading font-bold mb-8">Get in Touch</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-heading font-semibold mb-1">Phone</p>
                    <a href="tel:+919666277729" className="text-green-100 hover:text-white transition-colors">
                      +91 96662 77729
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-heading font-semibold mb-1">Email</p>
                    <a href="mailto:hello@aramba.com" className="text-green-100 hover:text-white transition-colors">
                      hello@aramba.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-heading font-semibold mb-1">Address</p>
                    <p className="text-green-100">
                      ARAMBA Organic Farm<br />
                      Sustainable Agriculture Zone<br />
                      India
                    </p>
                  </div>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  onClick={handleWhatsAppClick}
                  className="w-full bg-white text-green-900 hover:bg-gray-100 text-lg font-heading py-6"
                >
                  <MessageCircle className="h-6 w-6 mr-3" />
                  Chat on WhatsApp
                </Button>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-heading font-bold mb-6">Send us a Message</h3>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-heading mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-heading mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-heading mb-2">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-white text-green-900 hover:bg-gray-100 font-heading"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== 8. FOOTER ===== */}
      <motion.footer 
        className="bg-gray-900 text-white py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-2xl font-heading font-bold text-green-400 mb-2">ARAMBA</h3>
              <p className="text-gray-400 font-paragraph">
                Organic produce, directly from farmers to your table.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 font-paragraph">
                <li><Link to="/" className="hover:text-green-400 transition-colors">Home</Link></li>
                <li><Link to="/blog" className="hover:text-green-400 transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-green-400 transition-colors">Contact</Link></li>
                <li><Link to="/certifications" className="hover:text-green-400 transition-colors">Certifications</Link></li>
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h4 className="font-heading font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 font-paragraph">
                <li><a href="#" className="hover:text-green-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </motion.div>

            {/* Social */}
            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h4 className="font-heading font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z" /></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" /></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-7.007 3.748 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </a>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 font-paragraph">
            <p>&copy; 2024 ARAMBA Organic. All rights reserved. | Organic produce, directly from farmers.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
