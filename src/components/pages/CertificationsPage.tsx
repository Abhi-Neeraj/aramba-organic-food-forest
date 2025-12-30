import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Award, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Certifications } from '@/entities';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
} as const;

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certifications[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const data = await BaseCrudService.getAll<Certifications>('certifications');
        setCertifications(data.items);
      } catch (error) {
        console.error('Error fetching certifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  return (
    <div className="min-h-screen bg-sand-lighter">
      {/* Hero Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-charcoal via-charcoal-dark to-brown-dark text-sand grain-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-6xl md:text-7xl font-heading font-bold text-sand mb-6"
              variants={itemVariants}
            >
              Certified & Trusted
            </motion.h1>
            <motion.p 
              className="text-xl text-sand/80 font-light max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Our commitment to quality and sustainability is backed by recognized certifications and rigorous standards
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Certifications Grid */}
      <motion.section 
        className="py-24 bg-sand-lighter"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-charcoal font-light">Loading certifications...</p>
            </div>
          ) : certifications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-charcoal font-light text-lg">No certifications available yet.</p>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert._id}
                  variants={badgeVariants}
                  custom={index}
                  whileHover={{ y: -12, boxShadow: '0 20px 40px rgba(193, 122, 74, 0.15)' }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full border-2 border-brown/20 hover:border-copper transition-all duration-300 bg-white overflow-hidden">
                    <CardContent className="p-8">
                      {/* Logo */}
                      {cert.logo && (
                        <motion.div 
                          className="mb-8 flex justify-center"
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Image
                            src={cert.logo}
                            alt={cert.name || 'Certification'}
                            className="h-24 w-auto object-contain"
                            width={150}
                          />
                        </motion.div>
                      )}

                      {/* Title */}
                      <h3 className="text-2xl font-heading font-bold text-charcoal mb-4 text-center">
                        {cert.name}
                      </h3>

                      {/* Issuing Body */}
                      {cert.issuingBody && (
                        <p className="text-sm text-brown font-light text-center mb-4">
                          <span className="font-bold">Issued by:</span> {cert.issuingBody}
                        </p>
                      )}

                      {/* Description */}
                      <p className="text-charcoal font-light leading-relaxed mb-6 text-center">
                        {cert.description}
                      </p>

                      {/* Date Issued */}
                      {cert.dateIssued && (
                        <p className="text-sm text-brown/70 font-light text-center mb-6">
                          Date Issued: {new Date(cert.dateIssued).toLocaleDateString()}
                        </p>
                      )}

                      {/* Link */}
                      {cert.certificationUrl && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Button 
                            asChild
                            className="w-full bg-copper hover:bg-copper-light text-white uppercase tracking-wider font-bold"
                          >
                            <a href={cert.certificationUrl} target="_blank" rel="noopener noreferrer">
                              View Certificate
                            </a>
                          </Button>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Why Certifications Matter */}
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
              Why Certifications Matter
            </motion.h2>
            <motion.p 
              className="text-lg text-brown font-light max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Our certifications ensure transparency, quality, and commitment to sustainable practices
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              {
                icon: CheckCircle,
                title: 'Quality Assurance',
                description: 'Every certification represents rigorous testing and compliance with international standards for food safety and organic farming practices.'
              },
              {
                icon: Award,
                title: 'Industry Recognition',
                description: 'Our certifications are recognized by leading agricultural and environmental organizations, ensuring credibility and trust.'
              },
              {
                icon: Shield,
                title: 'Consumer Protection',
                description: 'These certifications protect you by guaranteeing that our products meet strict requirements for purity, safety, and sustainability.'
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
                    className="w-20 h-20 bg-gradient-to-br from-copper/20 to-burnt-orange/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                  >
                    <item.icon className="h-10 w-10 text-copper" />
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

      {/* Our Commitment */}
      <motion.section 
        className="py-24 bg-sand-lighter"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-heading font-bold text-charcoal mb-8"
              variants={itemVariants}
            >
              Our Commitment to Excellence
            </motion.h2>

            <motion.div 
              className="space-y-6 mb-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.p
                className="text-lg text-charcoal font-light leading-relaxed"
                variants={itemVariants}
              >
                At ARAMBA, we believe that transparency and accountability are fundamental to building trust with our customers. Our certifications are not just badges—they represent our unwavering commitment to delivering the highest quality organic produce while maintaining the highest standards of environmental stewardship.
              </motion.p>

              <motion.p
                className="text-lg text-charcoal font-light leading-relaxed"
                variants={itemVariants}
              >
                We continuously invest in improving our farming practices, implementing cutting-edge sustainable techniques, and maintaining rigorous quality control measures. Every certification we hold is a testament to our dedication to your health and the health of our planet.
              </motion.p>

              <motion.p
                className="text-lg text-charcoal font-light leading-relaxed"
                variants={itemVariants}
              >
                When you choose ARAMBA, you're choosing products backed by verified certifications, transparent practices, and a genuine commitment to excellence. We're proud to be a trusted partner in your journey toward healthier, more sustainable living.
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
                <Link to="/">Shop Our Products</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-charcoal via-charcoal-dark to-brown-dark text-sand grain-overlay"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-heading font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Experience Certified Quality?
          </motion.h2>
          <motion.p 
            className="text-lg text-sand/80 mb-10 font-light max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Explore our full range of certified organic products and join thousands of families choosing quality and sustainability
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              asChild 
              className="bg-copper hover:bg-copper-light text-white text-lg font-heading py-6 uppercase tracking-wider shadow-lg hover:shadow-xl"
            >
              <Link to="/store">Shop Now</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
