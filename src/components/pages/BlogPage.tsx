import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';
import { format } from 'date-fns';

// Helper function to validate and parse date
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

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPosts[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
        setBlogPosts(items.sort((a, b) => {
          const dateA = a.publishDate && isValidDate(a.publishDate) ? new Date(a.publishDate.$date) : new Date(0);
          const dateB = b.publishDate && isValidDate(b.publishDate) ? new Date(b.publishDate.$date) : new Date(0);
          return dateB.getTime() - dateA.getTime();
        }));
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
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
            Our Blog
          </h1>
          <p className="text-lg text-gray-600 font-paragraph max-w-2xl mx-auto">
            Discover insights about organic farming, sustainable living, and the journey from our food forest to your table.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post._id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow group">
                <CardContent className="p-0">
                  {/* Featured Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.featuredImage || 'https://static.wixstatic.com/media/966ae5_05efd0ffd9184741a3a17143917016fd~mv2.png?originWidth=384&originHeight=256'}
                      alt={post.title || 'Blog post'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      width={400}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta Information */}
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      {post.publishDate && isValidDate(post.publishDate) && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.publishDate, 'MMM dd, yyyy')}</span>
                        </div>
                      )}
                      {post.author && (
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-heading font-semibold text-primary mb-3 line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-gray-600 font-paragraph text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Read More Button */}
                    <Button asChild variant="outline" className="group/btn">
                      <Link to={`/blog/${post.slug}`}>
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-12 w-12 text-secondary" />
            </div>
            <h3 className="text-2xl font-heading font-semibold text-primary mb-4">
              No Blog Posts Yet
            </h3>
            <p className="text-gray-600 font-paragraph max-w-md mx-auto">
              We're working on bringing you amazing content about organic farming and sustainable living. Check back soon!
            </p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-white rounded-xl p-8 text-center shadow-md">
          <h3 className="text-2xl font-heading font-bold text-primary mb-4">
            Stay Updated
          </h3>
          <p className="text-gray-600 font-paragraph mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to get the latest updates on organic farming tips, seasonal produce guides, and sustainable living insights delivered to your inbox.
          </p>
          <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            Subscribe to Newsletter
          </Button>
        </div>
      </div>
    </div>
  );
}