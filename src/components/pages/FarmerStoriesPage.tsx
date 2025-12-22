import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { FarmerProfiles } from '@/entities';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { MapPin, Leaf } from 'lucide-react';

export default function FarmerStoriesPage() {
  const [farmers, setFarmers] = useState<FarmerProfiles[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const { items } = await BaseCrudService.getAll<FarmerProfiles>('farmerprofiles');
        setFarmers(items);
      } catch (error) {
        console.error('Error fetching farmers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-primary to-secondary py-16 px-6">
        <div className="max-w-[100rem] mx-auto">
          <h1 className="text-5xl font-heading font-bold text-primary-foreground mb-4">
            Meet Our Farmers
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            Discover the passionate farmers behind ARAMBA. Learn their stories, farming practices, and commitment to organic agriculture.
          </p>
        </div>
      </section>

      {/* Farmers Grid */}
      <section className="max-w-[100rem] mx-auto px-6 py-16">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : farmers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {farmers.map((farmer) => (
              <Card
                key={farmer._id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Farmer Photo */}
                {farmer.photo && (
                  <div className="relative h-64 overflow-hidden bg-gray-200">
                    <Image
                      src={farmer.photo}
                      alt={farmer.name || 'Farmer'}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Farmer Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-heading font-bold text-primary mb-1">
                    {farmer.name}
                  </h3>

                  {farmer.farmName && (
                    <p className="text-secondary font-semibold mb-4">{farmer.farmName}</p>
                  )}

                  {farmer.specialty && (
                    <div className="flex items-center gap-2 mb-4">
                      <Leaf className="w-5 h-5 text-secondary" />
                      <Badge variant="secondary">{farmer.specialty}</Badge>
                    </div>
                  )}

                  {farmer.location && (
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{farmer.location}</span>
                    </div>
                  )}

                  {farmer.biography && (
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {farmer.biography}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No farmers found.</p>
          </div>
        )}
      </section>

      {/* Impact Section */}
      <section className="bg-secondary/10 py-16 px-6 mt-12">
        <div className="max-w-[100rem] mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">
            Supporting Sustainable Farming
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">100%</div>
              <p className="text-gray-700">Organic Certified Farms</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">50+</div>
              <p className="text-gray-700">Local Farming Partners</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">Fair</div>
              <p className="text-gray-700">Trade Pricing Guaranteed</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
