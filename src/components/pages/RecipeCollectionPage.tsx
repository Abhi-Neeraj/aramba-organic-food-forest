import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Recipes } from '@/entities';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { Search, Clock, Users, ChefHat } from 'lucide-react';

export default function RecipeCollectionPage() {
  const [recipes, setRecipes] = useState<Recipes[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipes[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Recipes>('recipes');
        setRecipes(items);
        setFilteredRecipes(items);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    let filtered = recipes;

    if (searchTerm) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.tags?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDifficulty) {
      filtered = filtered.filter((recipe) => recipe.difficulty === selectedDifficulty);
    }

    setFilteredRecipes(filtered);
  }, [searchTerm, selectedDifficulty, recipes]);

  const difficulties = ['Easy', 'Medium', 'Hard'];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-primary to-secondary py-16 px-6">
        <div className="max-w-[100rem] mx-auto">
          <h1 className="text-5xl font-heading font-bold text-primary-foreground mb-4">
            Organic Recipe Collection
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            Discover delicious recipes featuring our fresh, organic products. From simple weeknight dinners to impressive entertaining dishes.
          </p>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="max-w-[100rem] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search recipes by name, ingredient, or tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-3 text-base"
              />
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <select
              value={selectedDifficulty || ''}
              onChange={(e) => setSelectedDifficulty(e.target.value || null)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Difficulty Levels</option>
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-8">
          Showing {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
        </p>

        {/* Recipes Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <Card key={recipe._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* Recipe Image */}
                {recipe.image && (
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <Image
                      src={recipe.image}
                      alt={recipe.name || 'Recipe'}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Recipe Content */}
                <div className="p-6">
                  <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                    {recipe.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {recipe.description}
                  </p>

                  {/* Recipe Meta */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Clock className="w-4 h-4 text-secondary" />
                      <span>{recipe.prepTime} mins prep time</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Users className="w-4 h-4 text-secondary" />
                      <span>Serves {recipe.servings}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <ChefHat className="w-4 h-4 text-secondary" />
                      <span className="capitalize">{recipe.difficulty} difficulty</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {recipe.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {recipe.tags.split(',').map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* View Recipe Button */}
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    View Recipe
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No recipes found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedDifficulty(null);
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
