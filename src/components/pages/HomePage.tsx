import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Zap, 
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
const heroLineVariants = {
  hidden: { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    clipPath: 'inset(0 0 0 0)',
    transition: {
      delay: 0.15 * i,
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
} as const;

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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

const productCardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

const iconVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
  },
} as const;

const imageRevealVariants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0 0 0)',
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
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
    <div className="min-h-screen bg-black">
      {/* ===== 1. HERO SECTION ===== */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black grain-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Image with Cinematic Parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        >
          <Image
            src="https://res.cloudinary.com/dicfqwlfq/image/upload/v1763968767/360_F_708626395_P7O5qLX5ZyUBirtGRJzZDiuzM1AHEbJK_rpzjt3.jpg"
            alt="ARAMBA farm - raw earth, real farming"
            className="w-full h-full object-cover"
            width={1920}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Main Headline - Line by Line */}
          <motion.div className="mb-8 overflow-hidden">
            <motion.h1 
              className="text-7xl md:text-8xl lg:text-9xl font-heading font-bold text-cream leading-none"
              custom={0}
              variants={heroLineVariants}
              initial="hidden"
              animate="visible"
            >
              REAL FARMING
            </motion.h1>
          </motion.div>

          <motion.div className="mb-12 overflow-hidden">
            <motion.h1 
              className="text-7xl md:text-8xl lg:text-9xl font-heading font-bold text-rust leading-none"
              custom={1}
              variants={heroLineVariants}
              initial="hidden"
              animate="visible"
            >
              REAL RESULTS
            </motion.h1>
          </motion.div>

          {/* Subheading */}
          <motion.p 
            className="text-lg md:text-xl text-cream/80 mb-16 font-light max-w-3xl mx-auto leading-relaxed tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            100% organic. Zero chemicals. Direct from our soil to your table. No compromises. No marketing fluff. Just pure, powerful produce.
          </motion.p>

          {/* CTA Buttons - Delayed Arrival with Authority */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
          >
            {/* Primary CTA */}
            <motion.div
              whileHover={{ scale: 1.08, y: -6 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-rust hover:bg-rust-light text-cream shadow-heavy hover:shadow-heavy-lg transition-all duration-300 group uppercase tracking-widest font-bold text-base px-10 py-7"
              >
                <Link to="/store" className="flex items-center gap-3">
                  SHOP NOW
                  <ChevronRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            {/* Secondary CTA with Glow */}
            <motion.div
              whileHover={{ scale: 1.08, y: -6 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 bg-rust/20 rounded-lg blur-xl"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <Button 
                onClick={handleWhatsAppClick}
                size="lg" 
                className="relative bg-charcoal-light hover:bg-charcoal-light/80 text-cream border-2 border-rust shadow-heavy hover:shadow-heavy-lg transition-all duration-300 group uppercase tracking-widest font-bold text-base px-10 py-7"
              >
                <MessageCircle className="h-6 w-6 mr-3 group-hover:scale-125 transition-transform" />
                WHATSAPP US
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== 2. SHOP SECTION ===== */}
      <motion.section 
        className="py-32 bg-black"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div 
            className="mb-24"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2 
              className="text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-cream mb-6"
              variants={itemVariants}
            >
              SHOP CATEGORIES
            </motion.h2>
            <motion.p 
              className="text-xl text-cream/70 font-light max-w-2xl"
              variants={itemVariants}
            >
              Powerful produce. Uncompromising quality.
            </motion.p>
          </motion.div>

          {/* Categories Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {categories.slice(0, 4).map((category, index) => (
              <motion.div
                key={category._id}
                variants={productCardVariants}
                custom={index}
                whileHover={{ y: -16, boxShadow: '0 40px 80px rgba(212, 102, 58, 0.3)' }}
                transition={{ duration: 0.4 }}
              >
                <Link to="/store">
                  <Card className="overflow-hidden h-full cursor-pointer border-0 bg-charcoal-light hover:bg-charcoal-light/80 transition-all duration-300 shadow-heavy hover:shadow-heavy-lg">
                    <CardContent className="p-0">
                      <motion.div 
                        className="relative h-48 overflow-hidden bg-charcoal"
                        whileHover={{ scale: 1.12 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Image
                          src={category.categoryImage || 'https://via.placeholder.com/300x200?text=Category'}
                          alt={category.name || 'Product category'}
                          className="w-full h-full object-cover"
                          width={300}
                        />
                      </motion.div>
                      <div className="p-8">
                        <h3 className="text-2xl font-heading font-bold text-cream mb-3 uppercase">
                          {category.name}
                        </h3>
                        <p className="text-sm text-cream/60 font-light mb-6">
                          {category.shortDescription}
                        </p>
                        <Button 
                          asChild 
                          variant="outline" 
                          className="w-full border-2 border-rust text-rust hover:bg-rust hover:text-cream uppercase tracking-widest font-bold"
                        >
                          <Link to="/store">BROWSE</Link>
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
              className="text-6xl md:text-7xl font-heading font-bold text-cream mb-16 uppercase"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              FEATURED
            </motion.h3>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  variants={productCardVariants}
                  custom={index}
                  whileHover={{ y: -16, boxShadow: '0 40px 80px rgba(212, 102, 58, 0.3)' }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="overflow-hidden h-full border-0 bg-charcoal-light hover:bg-charcoal-light/80 transition-all duration-300 shadow-heavy hover:shadow-heavy-lg">
                    <CardContent className="p-0">
                      <Link to={`/products/${product._id}`}>
                        <motion.div 
                          className="relative h-56 overflow-hidden bg-charcoal cursor-pointer"
                          whileHover={{ scale: 1.12 }}
                          transition={{ duration: 0.5 }}
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
                              <Badge className="absolute top-4 left-4 bg-rust text-cream uppercase tracking-widest font-bold text-xs">
                                SEASONAL
                              </Badge>
                            </motion.div>
                          )}
                        </motion.div>
                      </Link>

                      <div className="p-8">
                        <Link to={`/products/${product._id}`}>
                          <h3 className="text-xl font-heading font-bold text-cream mb-3 hover:text-rust transition-colors uppercase">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <p className="text-sm text-cream/60 font-light mb-6 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between mb-6">
                          <span className="text-3xl font-heading font-bold text-rust">
                            {formatINR(product.price)}
                          </span>
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          <Button 
                            className="w-full bg-rust hover:bg-rust-light text-cream uppercase tracking-widest font-bold shadow-heavy hover:shadow-heavy-lg transition-all duration-300"
                          >
                            ADD TO CART
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
        className="py-32 bg-charcoal grain-overlay"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="mb-24"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2 
              className="text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-cream mb-6 uppercase"
              variants={itemVariants}
            >
              WHY ARAMBA
            </motion.h2>
            <motion.p 
              className="text-xl text-cream/70 font-light max-w-2xl"
              variants={itemVariants}
            >
              Authority. Integrity. Power.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              {
                icon: Zap,
                title: 'ZERO CHEMICALS',
                description: 'No synthetic pesticides. No fertilizers. No GMOs. Pure earth.'
              },
              {
                icon: Truck,
                title: 'DIRECT FROM SOIL',
                description: 'Farmers get paid fairly. You get it fresh. No middlemen.'
              },
              {
                icon: Award,
                title: 'CERTIFIED ORGANIC',
                description: 'NPOP certified. Rigorous standards. Verified quality.'
              },
              {
                icon: Shield,
                title: 'GUARANTEED FRESH',
                description: 'Harvested at peak. Delivered within 24 hours. Period.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <motion.div 
                    className="w-20 h-20 bg-rust/20 rounded-lg flex items-center justify-center mb-8"
                    variants={iconVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.2, rotate: 12 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                  >
                    <item.icon className="h-10 w-10 text-rust" />
                  </motion.div>
                  <h3 className="text-2xl font-heading font-bold text-cream mb-3 uppercase">
                    {item.title}
                  </h3>
                  <p className="text-cream/70 font-light leading-relaxed">
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
        className="py-32 bg-black"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.h2 
                className="text-6xl md:text-7xl font-heading font-bold text-cream mb-12 uppercase"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                ABOUT ARAMBA
              </motion.h2>

              <motion.div 
                className="space-y-8 mb-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
              >
                <motion.p
                  className="text-lg text-cream/80 font-light leading-relaxed"
                  variants={itemVariants}
                >
                  ARAMBA is not a startup. We're a movement. We grow what matters. We don't compromise on quality. We don't play games with your health.
                </motion.p>
                <motion.p
                  className="text-lg text-cream/80 font-light leading-relaxed"
                  variants={itemVariants}
                >
                  Every product we deliver is backed by real farming, real effort, and real results. We've built something powerful—a direct connection between the soil and your table.
                </motion.p>
                <motion.p
                  className="text-lg text-cream/80 font-light leading-relaxed"
                  variants={itemVariants}
                >
                  Our mission is simple: deliver certified organic produce that tastes like food should taste. Support farmers who deserve respect. Build a food system that actually works.
                </motion.p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  asChild 
                  className="bg-rust hover:bg-rust-light text-cream uppercase tracking-widest font-bold shadow-heavy hover:shadow-heavy-lg px-10 py-7"
                >
                  <Link to="/contact">GET IN TOUCH</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.div
                variants={imageRevealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
              >
                <div className="rounded-lg overflow-hidden shadow-heavy-lg">
                  <Image
                    src="https://res.cloudinary.com/dicfqwlfq/image/upload/v1763968767/360_F_708626395_P7O5qLX5ZyUBirtGRJzZDiuzM1AHEbJK_rpzjt3.jpg"
                    alt="ARAMBA organic farm - real farming"
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
        className="py-32 bg-charcoal grain-overlay"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="mb-24"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2 
              className="text-6xl md:text-7xl font-heading font-bold text-cream mb-6 uppercase"
              variants={itemVariants}
            >
              CERTIFIED & VERIFIED
            </motion.h2>
            <motion.p 
              className="text-xl text-cream/70 font-light max-w-2xl"
              variants={itemVariants}
            >
              Proof. Not promises.
            </motion.p>
          </motion.div>

          {certifications.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert._id}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ y: -12, boxShadow: '0 40px 80px rgba(212, 102, 58, 0.3)' }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full border-0 bg-black shadow-heavy hover:shadow-heavy-lg transition-all duration-300">
                    <CardContent className="p-10 text-center">
                      {cert.logo && (
                        <motion.div 
                          className="mb-8 flex justify-center"
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Image
                            src={cert.logo}
                            alt={cert.name || 'Certification'}
                            className="h-20 w-auto object-contain"
                            width={100}
                          />
                        </motion.div>
                      )}
                      <h3 className="text-2xl font-heading font-bold text-cream mb-3 uppercase">
                        {cert.name}
                      </h3>
                      <p className="text-sm text-cream/60 font-light">
                        {cert.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : null}

          <motion.div 
            className="text-center mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button 
              asChild 
              variant="outline" 
              className="border-2 border-rust text-rust hover:bg-rust hover:text-cream uppercase tracking-widest font-bold"
            >
              <Link to="/certifications">VIEW ALL CERTIFICATIONS</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== 6. LOGIN SECTION ===== */}
      <motion.section 
        className="py-32 bg-black"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="mb-24"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2 
              className="text-6xl md:text-7xl font-heading font-bold text-cream mb-6 uppercase"
              variants={itemVariants}
            >
              JOIN ARAMBA
            </motion.h2>
            <motion.p 
              className="text-xl text-cream/70 font-light max-w-2xl"
              variants={itemVariants}
            >
              Sign in. Take control.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              { role: 'customer', label: 'CUSTOMER LOGIN', icon: LogIn },
              { role: 'farmer', label: 'FARMER LOGIN', icon: Zap },
              { role: 'admin', label: 'ADMIN LOGIN', icon: Shield }
            ].map((item) => (
              <motion.div
                key={item.role}
                variants={itemVariants}
                whileHover={{ scale: 1.08, y: -12 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <Button 
                  asChild 
                  className="w-full h-48 bg-rust hover:bg-rust-light text-cream flex flex-col items-center justify-center gap-4 text-lg font-heading uppercase tracking-widest shadow-heavy hover:shadow-heavy-lg transition-all duration-300"
                >
                  <Link to="/login">
                    <item.icon className="h-10 w-10" />
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
        className="py-32 bg-charcoal grain-overlay"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <h2 className="text-6xl font-heading font-bold text-cream mb-16 uppercase">GET IN TOUCH</h2>
              
              <div className="space-y-12 mb-16">
                <motion.div 
                  className="flex items-start gap-6"
                  whileHover={{ x: 12 }}
                  transition={{ duration: 0.3 }}
                >
                  <Phone className="h-8 w-8 mt-1 flex-shrink-0 text-rust" />
                  <div>
                    <p className="font-heading font-bold mb-2 uppercase text-cream tracking-widest">PHONE</p>
                    <a href="tel:+919666277729" className="text-cream/70 hover:text-rust transition-colors text-lg">
                      +91 96662 77729
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-6"
                  whileHover={{ x: 12 }}
                  transition={{ duration: 0.3 }}
                >
                  <Mail className="h-8 w-8 mt-1 flex-shrink-0 text-rust" />
                  <div>
                    <p className="font-heading font-bold mb-2 uppercase text-cream tracking-widest">EMAIL</p>
                    <a href="mailto:hello@aramba.com" className="text-cream/70 hover:text-rust transition-colors text-lg">
                      hello@aramba.com
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-6"
                  whileHover={{ x: 12 }}
                  transition={{ duration: 0.3 }}
                >
                  <MapPin className="h-8 w-8 mt-1 flex-shrink-0 text-rust" />
                  <div>
                    <p className="font-heading font-bold mb-2 uppercase text-cream tracking-widest">ADDRESS</p>
                    <p className="text-cream/70 text-lg">
                      ARAMBA Organic Farm<br />
                      Sustainable Agriculture Zone<br />
                      India
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* WhatsApp Button - Impossible to Miss */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 bg-rust/30 rounded-lg blur-2xl"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <Button 
                  onClick={handleWhatsAppClick}
                  className="relative w-full bg-rust hover:bg-rust-light text-cream text-xl font-heading py-8 uppercase tracking-widest shadow-heavy-lg hover:shadow-heavy-lg transition-all duration-300 glow-rust-intense"
                >
                  <MessageCircle className="h-8 w-8 mr-4" />
                  WHATSAPP US NOW
                </Button>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <h3 className="text-4xl font-heading font-bold text-cream mb-12 uppercase tracking-widest">SEND A MESSAGE</h3>
              
              <form className="space-y-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-sm font-heading font-bold mb-3 uppercase tracking-widest text-cream">NAME</label>
                  <input 
                    type="text" 
                    className="w-full px-6 py-4 rounded-lg bg-black border-2 border-rust/50 text-cream placeholder-cream/30 focus:outline-none focus:border-rust focus:bg-charcoal-light transition-all duration-300 font-light"
                    placeholder="Your name"
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-sm font-heading font-bold mb-3 uppercase tracking-widest text-cream">EMAIL</label>
                  <input 
                    type="email" 
                    className="w-full px-6 py-4 rounded-lg bg-black border-2 border-rust/50 text-cream placeholder-cream/30 focus:outline-none focus:border-rust focus:bg-charcoal-light transition-all duration-300 font-light"
                    placeholder="your@email.com"
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-sm font-heading font-bold mb-3 uppercase tracking-widest text-cream">MESSAGE</label>
                  <textarea 
                    rows={5}
                    className="w-full px-6 py-4 rounded-lg bg-black border-2 border-rust/50 text-cream placeholder-cream/30 focus:outline-none focus:border-rust focus:bg-charcoal-light transition-all duration-300 resize-none font-light"
                    placeholder="Your message..."
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button 
                    type="submit"
                    className="w-full bg-rust hover:bg-rust-light text-cream font-heading uppercase tracking-widest shadow-heavy hover:shadow-heavy-lg transition-all duration-300 py-4"
                  >
                    SEND MESSAGE
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
