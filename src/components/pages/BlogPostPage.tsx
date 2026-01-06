import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';
import { Image } from '@/components/ui/image';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPosts | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
        const foundPost = items?.find(p => p.slug === slug);
        setPost(foundPost || null);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-dark-gray">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-dark-gray mb-4">Blog post not found.</p>
        <Link to="/blog" className="text-primary hover:text-organic-green-light transition-colors">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-organic-green-lighter to-white py-8 sm:py-12">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-organic-green-light transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            Back to Blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-dark-gray mb-4">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-dark-gray opacity-75">
              {post.author && <span>{post.author}</span>}
              {post.publishDate && (
                <span>{format(new Date(post.publishDate), 'MMMM dd, yyyy')}</span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage && (
        <section className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-lg overflow-hidden"
          >
            <Image
              src={post.featuredImage}
              alt={post.title || 'Blog post'}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </section>
      )}

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="prose prose-lg max-w-none"
        >
          <div className="text-dark-gray leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
