import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { BookOpen, Calendar, User } from 'lucide-react';

export default function EducationalHubPage() {
  const [articles, setArticles] = useState<BlogPosts[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
        setArticles(items.sort((a, b) => {
          const dateA = new Date(a.publishDate || 0).getTime();
          const dateB = new Date(b.publishDate || 0).getTime();
          return dateB - dateA;
        }));
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-primary to-secondary py-16 px-6">
        <div className="max-w-[100rem] mx-auto">
          <h1 className="text-5xl font-heading font-bold text-primary-foreground mb-4">
            Educational Hub
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            Learn about organic farming, nutrition, sustainability, and healthy living. Expert insights and practical guides.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {articles.length > 0 && (
        <section className="max-w-[100rem] mx-auto px-6 py-12">
          <h2 className="text-3xl font-heading font-bold text-primary mb-8">Featured Article</h2>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {articles[0].featuredImage && (
                <div className="h-64 md:h-auto overflow-hidden bg-gray-200">
                  <Image
                    src={articles[0].featuredImage}
                    alt={articles[0].title || 'Article'}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-3xl font-heading font-bold text-primary mb-4">
                  {articles[0].title}
                </h3>
                <p className="text-gray-700 mb-6 line-clamp-3">{articles[0].excerpt}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                  {articles[0].author && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{articles[0].author}</span>
                    </div>
                  )}
                  {articles[0].publishDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(articles[0].publishDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                <button className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-semibold w-fit">
                  Read Article
                </button>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* All Articles */}
      <section className="max-w-[100rem] mx-auto px-6 py-12">
        <h2 className="text-3xl font-heading font-bold text-primary mb-8">All Articles</h2>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : articles.length > 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(1).map((article) => (
              <Card key={article._id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                {article.featuredImage && (
                  <div className="h-48 overflow-hidden bg-gray-200">
                    <Image
                      src={article.featuredImage}
                      alt={article.title || 'Article'}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-heading font-bold text-primary mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">
                    {article.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-4">
                    {article.author && (
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{article.author}</span>
                      </div>
                    )}
                    {article.publishDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-semibold text-sm">
                    Read More
                  </button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No articles available yet.</p>
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="bg-secondary/10 py-12 px-6 mt-12">
        <div className="max-w-[100rem] mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">
            Explore Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Organic Farming', icon: '🌱' },
              { title: 'Nutrition & Health', icon: '🥗' },
              { title: 'Sustainability', icon: '🌍' },
              { title: 'Recipes & Cooking', icon: '👨‍🍳' },
            ].map((category, idx) => (
              <Card key={idx} className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-heading font-semibold text-primary">{category.title}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
