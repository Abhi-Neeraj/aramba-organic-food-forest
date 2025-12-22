import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { NutritionInfo, Products } from '@/entities';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, AlertCircle } from 'lucide-react';

export default function NutritionInfoPage() {
  const [nutritionData, setNutritionData] = useState<NutritionInfo[]>([]);
  const [products, setProducts] = useState<Record<string, Products>>({});
  const [filteredData, setFilteredData] = useState<NutritionInfo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nutritionRes, productsRes] = await Promise.all([
          BaseCrudService.getAll<NutritionInfo>('nutritioninfo'),
          BaseCrudService.getAll<Products>('products'),
        ]);

        setNutritionData(nutritionRes.items);

        // Create a map of products by ID
        const productMap: Record<string, Products> = {};
        productsRes.items.forEach((product) => {
          productMap[product._id] = product;
        });
        setProducts(productMap);
        setFilteredData(nutritionRes.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = nutritionData.filter((item) => {
        const productName = products[item.productId || '']?.name || '';
        return (
          productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.productId?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(nutritionData);
    }
  }, [searchTerm, nutritionData, products]);

  const getNutritionScore = (nutrition: NutritionInfo) => {
    let score = 0;
    if ((nutrition.fiber || 0) > 3) score += 2;
    if ((nutrition.protein || 0) > 5) score += 2;
    if ((nutrition.vitamins?.length || 0) > 0) score += 1;
    if ((nutrition.minerals?.length || 0) > 0) score += 1;
    if (!nutrition.allergens || nutrition.allergens.length === 0) score += 1;
    return Math.min(5, score);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-secondary to-primary py-16 px-6">
        <div className="max-w-[100rem] mx-auto">
          <h1 className="text-5xl font-heading font-bold text-primary-foreground mb-4">
            Nutrition Information
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            Detailed nutritional data for all our organic products. Make informed choices about your food.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="max-w-[100rem] mx-auto px-6 py-12">
        <div className="relative mb-8">
          <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 py-3 text-base"
          />
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredData.length > 0 ? (
          <div className="space-y-6">
            {filteredData.map((nutrition) => {
              const product = products[nutrition.productId || ''];
              const score = getNutritionScore(nutrition);

              return (
                <Card key={nutrition._id} className="p-8 hover:shadow-lg transition-shadow">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-primary mb-1">
                        {product?.name || nutrition.productId}
                      </h3>
                      {product?.category && (
                        <p className="text-gray-600 text-sm">{product.category}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Nutrition Score</p>
                      <div className="flex gap-1 justify-end">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={i < score ? 'text-secondary text-xl' : 'text-gray-300 text-xl'}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Macronutrients */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 pb-8 border-b border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Calories</p>
                      <p className="text-2xl font-bold text-primary">
                        {nutrition.calories || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-500">per serving</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Protein</p>
                      <p className="text-2xl font-bold text-secondary">
                        {nutrition.protein || 'N/A'}g
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Carbs</p>
                      <p className="text-2xl font-bold text-secondary">
                        {nutrition.carbs || 'N/A'}g
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Fat</p>
                      <p className="text-2xl font-bold text-secondary">
                        {nutrition.fat || 'N/A'}g
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Fiber</p>
                      <p className="text-2xl font-bold text-secondary">
                        {nutrition.fiber || 'N/A'}g
                      </p>
                    </div>
                  </div>

                  {/* Micronutrients */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Vitamins */}
                    {nutrition.vitamins && (
                      <div>
                        <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                          Vitamins
                        </h4>
                        <p className="text-gray-700 text-sm">{nutrition.vitamins}</p>
                      </div>
                    )}

                    {/* Minerals */}
                    {nutrition.minerals && (
                      <div>
                        <h4 className="font-semibold text-primary mb-3">Minerals</h4>
                        <p className="text-gray-700 text-sm">{nutrition.minerals}</p>
                      </div>
                    )}
                  </div>

                  {/* Allergens */}
                  {nutrition.allergens && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-start gap-3 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-yellow-900 mb-1">Allergens</p>
                          <p className="text-sm text-yellow-800">{nutrition.allergens}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {searchTerm ? 'No products found matching your search.' : 'No nutrition data available.'}
            </p>
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="bg-primary/10 py-12 px-6 mt-12">
        <div className="max-w-[100rem] mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">
            Understanding Nutrition Labels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-primary mb-2">Macronutrients</h3>
              <p className="text-gray-700 text-sm">
                Proteins, carbohydrates, and fats are the main nutrients your body needs for energy and growth.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">Micronutrients</h3>
              <p className="text-gray-700 text-sm">
                Vitamins and minerals support various bodily functions and are essential for optimal health.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">Allergens</h3>
              <p className="text-gray-700 text-sm">
                Always check for allergens if you have food sensitivities or allergies. Our products are clearly labeled.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
