import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Certifications } from '@/entities';
import { Image } from '@/components/ui/image';
import { ExternalLink } from 'lucide-react';

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certifications[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Certifications>('certifications');
        setCertifications(items || []);
      } catch (error) {
        console.error('Error fetching certifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-organic-green-lighter to-white py-12 sm:py-16">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-dark-gray mb-4">
              Our Certifications
            </h1>
            <p className="text-lg text-dark-gray opacity-90">
              Trusted by industry leaders. Certified for quality and sustainability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-dark-gray">Loading certifications...</p>
          </div>
        ) : certifications.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-dark-gray">No certifications available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-border-gray rounded-lg p-8 hover:shadow-lg transition-shadow group"
              >
                {/* Logo */}
                {cert.logo && (
                  <div className="mb-6 flex items-center justify-center h-32 bg-light-gray rounded-lg">
                    <Image
                      src={cert.logo}
                      alt={cert.name || 'Certification'}
                      width={200}
                      height={128}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                )}

                {/* Content */}
                <h3 className="font-heading text-xl font-bold text-dark-gray mb-2">
                  {cert.name}
                </h3>

                {cert.issuingBody && (
                  <p className="text-sm text-dark-gray opacity-60 mb-3">
                    Issued by: {cert.issuingBody}
                  </p>
                )}

                {cert.description && (
                  <p className="text-dark-gray opacity-75 mb-4 line-clamp-3">
                    {cert.description}
                  </p>
                )}

                {/* Date Issued */}
                {cert.dateIssued && (
                  <p className="text-sm text-dark-gray opacity-60 mb-4">
                    Issued: {new Date(cert.dateIssued).toLocaleDateString()}
                  </p>
                )}

                {/* Link */}
                {cert.certificationUrl && (
                  <a
                    href={cert.certificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-medium hover:text-organic-green-light transition-colors"
                  >
                    View Certificate
                    <ExternalLink size={16} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Trust Section */}
      <section className="bg-light-gray py-16">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-heading text-3xl font-bold text-dark-gray mb-4">
              Why Our Certifications Matter
            </h2>
            <p className="text-dark-gray opacity-75 mb-8">
              Our certifications ensure that every product meets the highest standards for quality, safety, and sustainability. We're committed to transparency and accountability in everything we do.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <p className="text-sm text-dark-gray opacity-75">Organic Certified</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <p className="text-sm text-dark-gray opacity-75">Industry Certifications</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                <p className="text-sm text-dark-gray opacity-75">Happy Customers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
