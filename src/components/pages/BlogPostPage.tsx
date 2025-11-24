import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';
import { format } from 'date-fns';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [blogPost, setBlogPost] = useState<BlogPosts | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
        const post = items.find(item => item.slug === slug);
        
        if (post) {
          setBlogPost(post);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blogPost?.title,
        text: blogPost?.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-32 mb-8"></div>
            <div className="h-64 bg-gray-300 rounded-xl mb-8"></div>
            <div className="h-12 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !blogPost) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-gray-600 font-paragraph mb-8">
            The blog post you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-8">
          <Link to="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>

        {/* Featured Image */}
        {blogPost.featuredImage && (
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
            <Image
              src={blogPost.featuredImage}
              alt={blogPost.title || 'Blog post'}
              className="w-full h-full object-cover"
              width={800}
            />
          </div>
        )}

        {/* Article Header */}
        <article className="bg-white rounded-xl p-8 shadow-md">
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            {blogPost.publishDate && (
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(blogPost.publishDate.$date), 'MMMM dd, yyyy')}</span>
              </div>
            )}
            {blogPost.author && (
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>By {blogPost.author}</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="ml-auto"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
            {blogPost.title}
          </h1>

          {/* Excerpt */}
          {blogPost.excerpt && (
            <div className="text-lg text-gray-600 font-paragraph mb-8 p-4 bg-gray-50 rounded-lg border-l-4 border-secondary">
              {blogPost.excerpt}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none font-paragraph">
            {blogPost.content ? (
              <div
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
                className="text-gray-700 leading-relaxed"
              />
            ) : (
              <div className="text-gray-600 space-y-4">
                <p>
                  This is where the full blog post content would appear. The content management system 
                  will provide rich text content that covers topics related to organic farming, 
                  sustainable living, and our food forest journey.
                </p>
                <p>
                  Our blog posts typically include detailed information about seasonal produce, 
                  farming techniques, recipes using our organic ingredients, and stories from 
                  our farmers and community.
                </p>
                <p>
                  Stay tuned for more engaging content that will help you on your journey 
                  toward a more sustainable and healthy lifestyle.
                </p>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-secondary/5 rounded-lg p-6 text-center">
              <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                Ready to Experience Organic Living?
              </h3>
              <p className="text-gray-600 font-paragraph mb-6">
                Discover our fresh, organic produce and start your journey toward healthier living today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link to="/store">Shop Now</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/blog">Read More Articles</Link>
                </Button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}