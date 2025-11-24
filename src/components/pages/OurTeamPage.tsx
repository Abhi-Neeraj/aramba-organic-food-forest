import { useState, useEffect } from 'react';
import { MapPin, Sprout, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { FarmerProfiles } from '@/entities';

export default function OurTeamPage() {
  const [farmers, setFarmers] = useState<FarmerProfiles[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const { items } = await BaseCrudService.getAll<FarmerProfiles>('farmerprofiles');
        setFarmers(items);
      } catch (error) {
        console.error('Error fetching farmer profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-xl p-6">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-[120rem] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            Meet Our Team
          </h1>
          <p className="text-lg text-gray-600 font-paragraph max-w-2xl mx-auto">
            The passionate farmers and experts behind ARAMBA • Organic Food Forest, dedicated to bringing you the finest organic produce through sustainable farming practices.
          </p>
        </div>

        {/* Team Grid */}
        {farmers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {farmers.map((farmer) => (
              <Card key={farmer._id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  {/* Profile Photo */}
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src={farmer.photo || 'https://static.wixstatic.com/media/966ae5_184f8b56bcea47edb0786aacc9f7dea9~mv2.png?originWidth=128&originHeight=128'}
                      alt={farmer.name || 'Farmer'}
                      className="w-full h-full object-cover rounded-full"
                      width={96}
                    />
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                    {farmer.name}
                  </h3>

                  {/* Farm Name */}
                  {farmer.farmName && (
                    <div className="flex items-center justify-center space-x-1 text-secondary mb-3">
                      <Sprout className="h-4 w-4" />
                      <span className="font-paragraph text-sm">{farmer.farmName}</span>
                    </div>
                  )}

                  {/* Specialty Badge */}
                  {farmer.specialty && (
                    <Badge variant="secondary" className="mb-4 bg-secondary/10 text-secondary">
                      {farmer.specialty}
                    </Badge>
                  )}

                  {/* Location */}
                  {farmer.location && (
                    <div className="flex items-center justify-center space-x-1 text-gray-500 mb-4">
                      <MapPin className="h-4 w-4" />
                      <span className="font-paragraph text-sm">{farmer.location}</span>
                    </div>
                  )}

                  {/* Biography */}
                  {farmer.biography && (
                    <p className="text-gray-600 font-paragraph text-sm leading-relaxed">
                      {farmer.biography}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sprout className="h-12 w-12 text-secondary" />
            </div>
            <h3 className="text-2xl font-heading font-semibold text-primary mb-4">
              Our Team is Growing
            </h3>
            <p className="text-gray-600 font-paragraph max-w-md mx-auto">
              We're building an amazing team of passionate farmers and experts. Check back soon to meet the people behind your organic produce!
            </p>
          </div>
        )}

        {/* Values Section */}
        <div className="mt-16 bg-white rounded-xl p-8 shadow-md">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-heading font-semibold text-primary mb-3">Sustainability</h3>
              <p className="text-gray-600 font-paragraph text-sm">
                We believe in farming practices that nurture the earth for future generations, using permaculture principles and natural methods.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-heading font-semibold text-primary mb-3">Quality</h3>
              <p className="text-gray-600 font-paragraph text-sm">
                Every product that leaves our farm meets the highest standards of organic certification and freshness.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-heading font-semibold text-primary mb-3">Community</h3>
              <p className="text-gray-600 font-paragraph text-sm">
                We're committed to supporting local communities and building connections between farmers and families.
              </p>
            </div>
          </div>
        </div>

        {/* Join Our Team CTA */}
        <div className="mt-12 bg-secondary/5 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-heading font-bold text-primary mb-4">
            Want to Join Our Mission?
          </h3>
          <p className="text-gray-600 font-paragraph mb-6 max-w-2xl mx-auto">
            We're always looking for passionate individuals who share our commitment to organic farming and sustainable living. Get in touch to learn about opportunities to be part of our growing family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:careers@aramba.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-paragraph transition-colors"
            >
              Contact Us
            </a>
            <a
              href="https://wa.me/918879543210?text=Hi! I'm interested in joining the ARAMBA team."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg font-paragraph transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}