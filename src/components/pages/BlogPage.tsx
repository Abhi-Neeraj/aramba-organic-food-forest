import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';
import { format } from 'date-fns';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
} as const;

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPosts[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await BaseCrudService.getAll<BlogPosts>('blogposts');
        setPosts(data.items.sort((a, b) => {
          const dateA = new Date(a.publishDate || 0).getTime();
          const dateB = new Date(b.publishDate || 0).getTime();
          return dateB - dateA;
        }));
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section 
        className="py-16 bg-gradient-to-br from-green-50 to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-heading font-bold text-green-900 mb-4"
              variants={itemVariants}
            >
              ARAMBA Blog
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 font-paragraph max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Stories, tips, and insights about organic farming, sustainable living, and healthy eating
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Blog Posts Grid */}
      <motion.section 
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 font-paragraph">Loading blog posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 font-paragraph text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {posts.map((post) => (
                <motion.div
                  key={post._id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/blog/${post.slug}`}>
                    <Card className="h-full overflow-hidden border border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <CardContent className="p-0">
                        {/* Featured Image */}
                        <div className="relative h-48 overflow-hidden bg-gray-100">
                          <Image
                            src={post.featuredImage || 'https://via.placeholder.com/400x300?text=Blog'}
                            alt={post.title || 'Blog post'}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            width={400}
                          />
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          {/* Meta Info */}
                          <div className="flex items-center gap-4 text-sm text-gray-500 font-paragraph mb-3">
                            {post.publishDate && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {format(new Date(post.publishDate), 'MMM dd, yyyy')}
                              </div>
                            )}
                            {post.author && (
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {post.author}
                              </div>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-heading font-semibold text-green-900 mb-3 line-clamp-2 hover:text-green-700 transition-colors">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-gray-600 font-paragraph text-sm line-clamp-3 mb-4">
                            {post.excerpt}
                          </p>

                          {/* Read More Button */}
                          <Button 
                            variant="outline" 
                            className="border-green-700 text-green-700 hover:bg-green-50 w-full"
                          >
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 bg-gradient-to-br from-green-900 to-green-800 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2 
            className="text-4xl font-heading font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Shop Organic?
          </motion.h2>
          <motion.p 
            className="text-lg text-green-100 mb-8 font-paragraph max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Explore our fresh, chemical-free produce and support sustainable farming
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              asChild 
              className="bg-white text-green-900 hover:bg-gray-100 text-lg font-heading px-8 py-6"
            >
              <Link to="/store">Shop Now</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
