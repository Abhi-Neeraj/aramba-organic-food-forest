import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Certifications, TrustBadges } from '@/entities';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { ExternalLink, Award } from 'lucide-react';

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certifications[]>([]);
  const [badges, setBadges] = useState<TrustBadges[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [certRes, badgeRes] = await Promise.all([
          BaseCrudService.getAll<Certifications>('certifications'),
          BaseCrudService.getAll<TrustBadges>('trustbadges'),
        ]);
        setCertifications(certRes.items);
        setBadges(badgeRes.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-primary to-secondary py-16 px-6">
        <div className="max-w-[100rem] mx-auto">
          <h1 className="text-5xl font-heading font-bold text-primary-foreground mb-4">
            Certifications & Trust
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            ARAMBA is committed to transparency and quality. All our certifications and partnerships demonstrate our dedication to organic farming and sustainability.
          </p>
        </div>
      </section>

      {/* Trust Badges Section */}
      {badges.length > 0 && (
        <section className="max-w-[100rem] mx-auto px-6 py-16">
          <h2 className="text-3xl font-heading font-bold text-primary mb-12 text-center">
            Why Trust ARAMBA?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {badges.map((badge) => (
              <div key={badge._id} className="text-center">
                {badge.icon && (
                  <div className="mb-4 flex justify-center">
                    <Image
                      src={badge.icon}
                      alt={badge.title || 'Badge'}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                )}
                <h3 className="font-heading font-semibold text-primary mb-2">{badge.title}</h3>
                <p className="text-sm text-gray-600">{badge.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {certifications.length > 0 && (
        <section className="max-w-[100rem] mx-auto px-6 py-16">
          <h2 className="text-3xl font-heading font-bold text-primary mb-12 text-center">
            Official Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert) => (
              <Card key={cert._id} className="p-8 hover:shadow-lg transition-shadow">
                <div className="flex gap-6">
                  {/* Logo */}
                  {cert.logo && (
                    <div className="flex-shrink-0">
                      <Image
                        src={cert.logo}
                        alt={cert.name || 'Certification'}
                        width={120}
                        height={120}
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-heading font-bold text-primary">
                        {cert.name}
                      </h3>
                      {cert.certificationUrl && (
                        <a
                          href={cert.certificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary hover:text-secondary/80"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>

                    {cert.issuingBody && (
                      <p className="text-sm text-gray-600 mb-2">
                        Issued by: <span className="font-semibold">{cert.issuingBody}</span>
                      </p>
                    )}

                    {cert.dateIssued && (
                      <p className="text-sm text-gray-600 mb-3">
                        Date Issued: {new Date(cert.dateIssued).toLocaleDateString()}
                      </p>
                    )}

                    {cert.description && (
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {cert.description}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Commitment Section */}
      <section className="bg-primary/10 py-16 px-6 mt-12">
        <div className="max-w-[100rem] mx-auto">
          <div className="flex items-start gap-4 mb-8">
            <Award className="w-8 h-8 text-secondary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                Our Commitment to Quality
              </h3>
              <p className="text-gray-700 mb-4">
                Every product in the ARAMBA ecosystem is held to the highest standards of organic certification and sustainability. We believe in complete transparency with our customers about where their food comes from and how it's grown.
              </p>
              <p className="text-gray-700">
                Our certifications aren't just badges—they represent our unwavering commitment to organic farming practices, fair trade principles, and environmental stewardship.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
