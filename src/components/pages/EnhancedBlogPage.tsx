import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const isValidDate = (dateObj: any): boolean => {
  if (!dateObj || !dateObj.$date) return false;
  const date = new Date(dateObj.$date);
  return !isNaN(date.getTime());
};

const formatDate = (dateObj: any, formatStr: string): string | null => {
  if (!isValidDate(dateObj)) return null;
  try {
    return format(new Date(dateObj.$date), formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return null;
  }
};

export default function EnhancedBlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPosts[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPosts[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'nutrition', label: 'Nutrition & Health', color: 'bg-green-100 text-green-800' },
    { id: 'recipes', label: 'Recipes', color: 'bg-orange-100 text-orange-800' },
    { id: 'sustainability', label: 'Sustainability', color: 'bg-blue-100 text-blue-800' },
    { id: 'farming', label: 'Organic Farming', color: 'bg-amber-100 text-amber-800' },
    { id: 'lifestyle', label: 'Lifestyle', color: 'bg-pink-100 text-pink-800' },
    { id: 'community', label: 'Community', color: 'bg-purple-100 text-purple-800' }
  ];

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
        const sorted = items.sort((a, b) => {
          const dateA = a.publishDate && isValidDate(a.publishDate) ? new Date((a.publishDate as any).$date) : new Date(0);
          const dateB = b.publishDate && isValidDate(b.publishDate) ? new Date((b.publishDate as any).$date) : new Date(0);
          return dateB.getTime() - dateA.getTime();
        });
        setBlogPosts(sorted);
        setFilteredPosts(sorted);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  useEffect(() => {
    let filtered = blogPosts;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter (using title as category indicator)
    if (selectedCategory) {
      filtered = filtered.filter(post => {
        const category = determineCategoryFromTitle(post.title || '');
        return category === selectedCategory;
      });
    }

    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory, blogPosts]);

  const determineCategoryFromTitle = (title: string): string => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('recipe') || lowerTitle.includes('cook')) return 'recipes';
    if (lowerTitle.includes('health') || lowerTitle.includes('nutrition')) return 'nutrition';
    if (lowerTitle.includes('sustain') || lowerTitle.includes('environment')) return 'sustainability';
    if (lowerTitle.includes('farm') || lowerTitle.includes('organic')) return 'farming';
    if (lowerTitle.includes('life') || lowerTitle.includes('wellness')) return 'lifestyle';
    if (lowerTitle.includes('community') || lowerTitle.includes('story')) return 'community';
    return 'lifestyle';
  };

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        className="relative h-64 flex items-center justify-center overflow-hidden bg-gradient-to-r from-primary to-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
      >
        <div className="relative z-10 text-center px-6">
          <motion.h1
            className="text-5xl md:text-6xl font-heading font-bold text-white mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.2 } }}
          >
            Blog & Resources
          </motion.h1>
          <motion.p
            className="text-xl text-white font-paragraph"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.4 } }}
          >
            Discover insights on organic farming, nutrition, recipes, and sustainable living
          </motion.p>
        </div>
      </motion.section>

      <div className="max-w-[120rem] mx-auto px-6 py-12">
        {/* Search & Filter */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full font-paragraph font-semibold transition-all ${
                selectedCategory === null
                  ? 'bg-secondary text-white'
                  : 'bg-white border-2 border-secondary text-secondary hover:bg-secondary/10'
              }`}
            >
              All Articles
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-paragraph font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-secondary text-white'
                    : 'bg-white border-2 border-secondary text-secondary hover:bg-secondary/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 font-paragraph">Loading articles...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 font-paragraph mb-4">No articles found matching your search.</p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <Card className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredPost.featuredImage && (
                      <Image
                        src={featuredPost.featuredImage}
                        alt={featuredPost.title || 'Featured'}
                        className="w-full h-64 md:h-full object-cover rounded-l-xl"
                        width={500}
                      />
                    )}
                    <CardContent className="p-8 flex flex-col justify-center">
                      <Badge className="w-fit mb-4 bg-secondary text-white">
                        Featured
                      </Badge>
                      <h2 className="text-3xl font-heading font-bold text-primary mb-3">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-600 font-paragraph mb-4 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                        {featuredPost.author && (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{featuredPost.author}</span>
                          </div>
                        )}
                        {featuredPost.publishDate && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(featuredPost.publishDate, 'MMM d, yyyy')}</span>
                          </div>
                        )}
                      </div>
                      <Button asChild className="w-fit bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                        <Link to={`/blog/${featuredPost.slug}`}>
                          Read Article <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPosts.map((post, index) => {
                const category = determineCategoryFromTitle(post.title || '');
                const categoryInfo = categories.find(c => c.id === category);

                return (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
                    viewport={{ once: true, margin: '-100px' }}
                  >
                    <Card className="bg-white rounded-xl overflow-hidden h-full hover:shadow-lg transition-shadow">
                      {post.featuredImage && (
                        <Image
                          src={post.featuredImage}
                          alt={post.title || 'Article'}
                          className="w-full h-40 object-cover"
                          width={400}
                        />
                      )}
                      <CardContent className="p-6 flex flex-col h-full">
                        {categoryInfo && (
                          <Badge className={`w-fit mb-3 ${categoryInfo.color}`}>
                            {categoryInfo.label}
                          </Badge>
                        )}
                        <h3 className="text-lg font-heading font-semibold text-primary mb-2 line-clamp-2 flex-grow">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 font-paragraph text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                          {post.author && (
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{post.author}</span>
                            </div>
                          )}
                          {post.publishDate && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(post.publishDate, 'MMM d, yyyy')}</span>
                            </div>
                          )}
                        </div>
                        <Button asChild variant="ghost" className="w-fit text-secondary hover:text-secondary/80 p-0">
                          <Link to={`/blog/${post.slug}`}>
                            Read More <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
