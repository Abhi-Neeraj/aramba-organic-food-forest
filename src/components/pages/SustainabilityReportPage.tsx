import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Products, FarmerProfiles } from '@/entities';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Leaf, Droplet, Wind, Zap } from 'lucide-react';

export default function SustainabilityReportPage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [farmers, setFarmers] = useState<FarmerProfiles[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, farmersRes] = await Promise.all([
          BaseCrudService.getAll<Products>('products'),
          BaseCrudService.getAll<FarmerProfiles>('farmerprofiles'),
        ]);
        setProducts(productsRes.items);
        setFarmers(farmersRes.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate metrics
  const seasonalProducts = products.filter((p) => p.isSeasonal).length;
  const totalProducts = products.length;
  const totalFarmers = farmers.length;

  // Sample data for charts
  const monthlyData = [
    { month: 'Jan', organic: 85, conventional: 15 },
    { month: 'Feb', organic: 87, conventional: 13 },
    { month: 'Mar', organic: 89, conventional: 11 },
    { month: 'Apr', organic: 91, conventional: 9 },
    { month: 'May', organic: 93, conventional: 7 },
    { month: 'Jun', organic: 95, conventional: 5 },
  ];

  const impactData = [
    { name: 'Carbon Offset (tons)', value: 2450 },
    { name: 'Water Saved (gallons)', value: 125000 },
    { name: 'Pesticides Avoided (lbs)', value: 890 },
    { name: 'Soil Health Improved (%)', value: 78 },
  ];

  const certificationData = [
    { name: 'Organic Certified', value: 100 },
    { name: 'Fair Trade', value: 85 },
    { name: 'Regenerative', value: 60 },
  ];

  const COLORS = ['#1F5A3A', '#4B8B3A', '#B45A35'];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-primary to-secondary py-16 px-6">
        <div className="max-w-[100rem] mx-auto">
          <h1 className="text-5xl font-heading font-bold text-primary-foreground mb-4">
            Sustainability Report
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            Our commitment to environmental stewardship and sustainable farming practices. Real impact, real numbers.
          </p>
        </div>
      </section>

      <section className="max-w-[100rem] mx-auto px-6 py-16">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold text-primary">Organic Products</h3>
                  <Leaf className="w-8 h-8 text-secondary" />
                </div>
                <p className="text-4xl font-bold text-primary mb-2">{totalProducts}</p>
                <p className="text-sm text-gray-600">100% certified organic</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold text-primary">Farming Partners</h3>
                  <Droplet className="w-8 h-8 text-secondary" />
                </div>
                <p className="text-4xl font-bold text-primary mb-2">{totalFarmers}+</p>
                <p className="text-sm text-gray-600">Sustainable farms</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold text-primary">Seasonal Focus</h3>
                  <Wind className="w-8 h-8 text-secondary" />
                </div>
                <p className="text-4xl font-bold text-primary mb-2">
                  {Math.round((seasonalProducts / totalProducts) * 100)}%
                </p>
                <p className="text-sm text-gray-600">Seasonal products</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold text-primary">Carbon Neutral</h3>
                  <Zap className="w-8 h-8 text-secondary" />
                </div>
                <p className="text-4xl font-bold text-primary mb-2">2,450</p>
                <p className="text-sm text-gray-600">Tons offset annually</p>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Organic Growth Chart */}
              <Card className="p-6">
                <h3 className="text-xl font-heading font-bold text-primary mb-6">
                  Organic Adoption Growth
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="organic"
                      stroke="#1F5A3A"
                      strokeWidth={2}
                      name="Organic (%)"
                    />
                    <Line
                      type="monotone"
                      dataKey="conventional"
                      stroke="#B45A35"
                      strokeWidth={2}
                      name="Conventional (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Certification Distribution */}
              <Card className="p-6">
                <h3 className="text-xl font-heading font-bold text-primary mb-6">
                  Certification Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={certificationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {certificationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Environmental Impact */}
            <Card className="p-8">
              <h3 className="text-2xl font-heading font-bold text-primary mb-8">
                Environmental Impact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {impactData.map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-lg">
                    <p className="text-gray-700 text-sm font-semibold mb-2">{item.name}</p>
                    <p className="text-3xl font-bold text-primary">{item.value.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Commitments */}
            <Card className="p-8 bg-primary/5 border-2 border-primary">
              <h3 className="text-2xl font-heading font-bold text-primary mb-6">
                Our Sustainability Commitments
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-secondary text-white">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">100% Organic Certified</h4>
                    <p className="text-gray-700 text-sm">
                      All products meet strict organic certification standards with zero synthetic pesticides.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-secondary text-white">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Carbon Neutral Operations</h4>
                    <p className="text-gray-700 text-sm">
                      We offset 100% of our carbon emissions through renewable energy and reforestation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-secondary text-white">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Fair Trade Practices</h4>
                    <p className="text-gray-700 text-sm">
                      Farmers receive fair compensation and support for sustainable farming methods.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-secondary text-white">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Water Conservation</h4>
                    <p className="text-gray-700 text-sm">
                      Advanced irrigation systems reduce water usage by 40% compared to conventional farming.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </section>
    </div>
  );
}
