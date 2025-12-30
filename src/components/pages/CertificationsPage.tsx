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
      staggerChildren: 0.12,
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

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.7, rotate: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
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
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <motion.section 
        className="py-24 bg-charcoal grain-overlay border-b-2 border-rust/30"
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
              className="text-7xl md:text-8xl lg:text-9xl font-heading font-bold text-cream mb-8 uppercase"
              variants={itemVariants}
            >
              CERTIFIED & VERIFIED
            </motion.h1>
            <motion.p 
              className="text-2xl text-cream/80 font-light max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Proof. Not promises. Our certifications represent rigorous standards and verified quality.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Certifications Grid */}
      <motion.section 
        className="py-32 bg-black"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-cream/70 font-light text-lg">Loading certifications...</p>
            </div>
          ) : certifications.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-cream/70 font-light text-lg">No certifications available yet.</p>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
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
                  whileHover={{ y: -16, boxShadow: '0 40px 80px rgba(212, 102, 58, 0.3)' }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="h-full border-0 bg-charcoal-light shadow-heavy hover:shadow-heavy-lg transition-all duration-300">
                    <CardContent className="p-12">
                      {/* Logo */}
                      {cert.logo && (
                        <motion.div 
                          className="mb-10 flex justify-center"
                          whileHover={{ scale: 1.2 }}
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
                      <h3 className="text-2xl font-heading font-bold text-cream mb-4 text-center uppercase tracking-widest">
                        {cert.name}
                      </h3>

                      {/* Issuing Body */}
                      {cert.issuingBody && (
                        <p className="text-sm text-cream/70 font-light text-center mb-6">
                          <span className="font-bold text-rust">ISSUED BY:</span> {cert.issuingBody}
                        </p>
                      )}

                      {/* Description */}
                      <p className="text-cream/80 font-light leading-relaxed mb-8 text-center">
                        {cert.description}
                      </p>

                      {/* Date Issued */}
                      {cert.dateIssued && (
                        <p className="text-xs text-cream/60 font-light text-center mb-8 uppercase tracking-widest">
                          Date Issued: {new Date(cert.dateIssued).toLocaleDateString()}
                        </p>
                      )}

                      {/* Link */}
                      {cert.certificationUrl && (
                        <motion.div
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Button 
                            asChild
                            className="w-full bg-rust hover:bg-rust-light text-cream uppercase tracking-widest font-bold shadow-heavy hover:shadow-heavy-lg"
                          >
                            <a href={cert.certificationUrl} target="_blank" rel="noopener noreferrer">
                              VIEW CERTIFICATE
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
              className="text-6xl md:text-7xl font-heading font-bold text-cream mb-8 uppercase"
              variants={itemVariants}
            >
              WHY CERTIFICATIONS MATTER
            </motion.h2>
            <motion.p 
              className="text-xl text-cream/70 font-light max-w-2xl"
              variants={itemVariants}
            >
              Authority. Verification. Trust.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              {
                icon: CheckCircle,
                title: 'QUALITY ASSURANCE',
                description: 'Every certification represents rigorous testing and compliance with international standards for food safety and organic farming practices.'
              },
              {
                icon: Award,
                title: 'INDUSTRY RECOGNITION',
                description: 'Our certifications are recognized by leading agricultural and environmental organizations, ensuring credibility and trust.'
              },
              {
                icon: Shield,
                title: 'CONSUMER PROTECTION',
                description: 'These certifications protect you by guaranteeing that our products meet strict requirements for purity, safety, and sustainability.'
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
                    whileHover={{ scale: 1.2, rotate: 12 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                  >
                    <item.icon className="h-10 w-10 text-rust" />
                  </motion.div>
                  <h3 className="text-2xl font-heading font-bold text-cream mb-4 uppercase tracking-widest">
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

      {/* Our Commitment */}
      <motion.section 
        className="py-32 bg-black"
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
              className="text-6xl md:text-7xl font-heading font-bold text-cream mb-12 uppercase"
              variants={itemVariants}
            >
              OUR COMMITMENT
            </motion.h2>

            <motion.div 
              className="space-y-8 mb-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.p
                className="text-xl text-cream/80 font-light leading-relaxed"
                variants={itemVariants}
              >
                At ARAMBA, we believe that transparency and accountability are fundamental to building trust. Our certifications are not just badges—they represent our unwavering commitment to delivering the highest quality organic produce while maintaining the highest standards of environmental stewardship.
              </motion.p>

              <motion.p
                className="text-xl text-cream/80 font-light leading-relaxed"
                variants={itemVariants}
              >
                We continuously invest in improving our farming practices, implementing cutting-edge sustainable techniques, and maintaining rigorous quality control measures. Every certification we hold is a testament to our dedication to your health and the health of our planet.
              </motion.p>

              <motion.p
                className="text-xl text-cream/80 font-light leading-relaxed"
                variants={itemVariants}
              >
                When you choose ARAMBA, you're choosing products backed by verified certifications, transparent practices, and a genuine commitment to excellence. We're not just growing food—we're building a movement toward real, sustainable agriculture.
              </motion.p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                asChild 
                className="bg-rust hover:bg-rust-light text-cream uppercase tracking-widest font-bold shadow-heavy hover:shadow-heavy-lg px-12 py-7"
              >
                <Link to="/">SHOP OUR PRODUCTS</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-24 bg-charcoal grain-overlay border-t-2 border-rust/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2 
            className="text-5xl md:text-6xl font-heading font-bold text-cream mb-8 uppercase"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            READY FOR CERTIFIED QUALITY?
          </motion.h2>
          <motion.p 
            className="text-xl text-cream/80 mb-12 font-light max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Explore our full range of certified organic products and join thousands of families choosing quality and sustainability.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              asChild 
              className="bg-rust hover:bg-rust-light text-cream text-lg font-heading py-7 uppercase tracking-widest shadow-heavy hover:shadow-heavy-lg"
            >
              <Link to="/store">SHOP NOW</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
