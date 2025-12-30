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
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
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
    <div className="min-h-screen bg-sand-lighter">
      {/* Hero Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-charcoal via-charcoal-dark to-brown-dark text-sand grain-overlay"
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
              className="text-6xl md:text-7xl font-heading font-bold text-sand mb-6"
              variants={itemVariants}
            >
              ARAMBA Blog
            </motion.h1>
            <motion.p 
              className="text-xl text-sand/80 font-light max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Stories, tips, and insights about organic farming, sustainable living, and healthy eating
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Blog Posts Grid */}
      <motion.section 
        className="py-24 bg-sand-lighter"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-charcoal font-light">Loading blog posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-charcoal font-light text-lg">No blog posts yet. Check back soon!</p>
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
                  variants={cardVariants}
                  whileHover={{ y: -12, boxShadow: '0 20px 40px rgba(193, 122, 74, 0.15)' }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/blog/${post.slug}`}>
                    <Card className="h-full overflow-hidden border-2 border-brown/20 hover:border-copper transition-all duration-300 cursor-pointer bg-white">
                      <CardContent className="p-0">
                        {/* Featured Image */}
                        <motion.div 
                          className="relative h-48 overflow-hidden bg-brown/5"
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.4 }}
                        >
                          <Image
                            src={post.featuredImage || 'https://via.placeholder.com/400x300?text=Blog'}
                            alt={post.title || 'Blog post'}
                            className="w-full h-full object-cover"
                            width={400}
                          />
                        </motion.div>

                        {/* Content */}
                        <div className="p-6">
                          {/* Meta Info */}
                          <div className="flex items-center gap-4 text-xs text-brown/70 font-light mb-4 uppercase tracking-wider">
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
                          <h3 className="text-xl font-heading font-bold text-charcoal mb-3 line-clamp-2 hover:text-copper transition-colors">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-charcoal font-light text-sm line-clamp-3 mb-6">
                            {post.excerpt}
                          </p>

                          {/* Read More Button */}
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Button 
                              variant="outline" 
                              className="border-2 border-copper text-copper hover:bg-copper hover:text-white w-full uppercase tracking-wider font-bold"
                            >
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </motion.div>
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
        className="py-20 bg-gradient-to-br from-charcoal via-charcoal-dark to-brown-dark text-sand grain-overlay"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-heading font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Shop Organic?
          </motion.h2>
          <motion.p 
            className="text-lg text-sand/80 mb-10 font-light max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Explore our fresh, chemical-free produce and support sustainable farming
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              asChild 
              className="bg-copper hover:bg-copper-light text-white text-lg font-heading py-6 uppercase tracking-wider shadow-lg hover:shadow-xl"
            >
              <Link to="/store">Shop Now</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
