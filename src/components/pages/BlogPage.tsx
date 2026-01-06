import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';
import { Image } from '@/components/ui/image';
import { format } from 'date-fns';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPosts[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
        setPosts(items || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-organic-green-lighter to-white py-12 sm:py-16">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-dark-gray mb-4">
              Organic Living Blog
            </h1>
            <p className="text-lg text-dark-gray opacity-90">
              Tips, recipes, and insights about organic farming and healthy living.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-dark-gray">Loading blog posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-dark-gray">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-border-gray rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {/* Featured Image */}
                {post.featuredImage && (
                  <div className="relative overflow-hidden bg-light-gray aspect-video">
                    <Image
                      src={post.featuredImage}
                      alt={post.title || 'Blog post'}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-3 text-sm text-dark-gray opacity-60">
                    {post.author && <span>{post.author}</span>}
                    {post.publishDate && (
                      <span>{format(new Date(post.publishDate), 'MMM dd, yyyy')}</span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="font-heading text-xl font-bold text-dark-gray mb-3 line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-dark-gray opacity-75 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-block text-primary font-medium hover:text-organic-green-light transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
