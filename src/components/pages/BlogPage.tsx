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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
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
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <motion.section 
        className="py-24 bg-charcoal grain-overlay border-b-2 border-rust/30"
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
              className="text-7xl md:text-8xl lg:text-9xl font-heading font-bold text-cream mb-8 uppercase"
              variants={itemVariants}
            >
              ARAMBA BLOG
            </motion.h1>
            <motion.p 
              className="text-2xl text-cream/80 font-light max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Stories, insights, and knowledge about organic farming, sustainable living, and real food.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Blog Posts Grid */}
      <motion.section 
        className="py-32 bg-black"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-cream/70 font-light text-lg">Loading blog posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-cream/70 font-light text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {posts.map((post) => (
                <motion.div
                  key={post._id}
                  variants={cardVariants}
                  whileHover={{ y: -16, boxShadow: '0 40px 80px rgba(212, 102, 58, 0.3)' }}
                  transition={{ duration: 0.4 }}
                >
                  <Link to={`/blog/${post.slug}`}>
                    <Card className="h-full overflow-hidden border-0 bg-charcoal-light hover:bg-charcoal-light/80 transition-all duration-300 cursor-pointer shadow-heavy hover:shadow-heavy-lg">
                      <CardContent className="p-0">
                        {/* Featured Image */}
                        <motion.div 
                          className="relative h-56 overflow-hidden bg-charcoal"
                          whileHover={{ scale: 1.12 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Image
                            src={post.featuredImage || 'https://via.placeholder.com/400x300?text=Blog'}
                            alt={post.title || 'Blog post'}
                            className="w-full h-full object-cover"
                            width={400}
                          />
                        </motion.div>

                        {/* Content */}
                        <div className="p-8">
                          {/* Meta Info */}
                          <div className="flex items-center gap-6 text-xs text-cream/60 font-light mb-6 uppercase tracking-widest">
                            {post.publishDate && (
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {format(new Date(post.publishDate), 'MMM dd, yyyy')}
                              </div>
                            )}
                            {post.author && (
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                {post.author}
                              </div>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-2xl font-heading font-bold text-cream mb-4 line-clamp-2 hover:text-rust transition-colors uppercase">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-cream/70 font-light text-sm line-clamp-3 mb-8">
                            {post.excerpt}
                          </p>

                          {/* Read More Button */}
                          <motion.div
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Button 
                              variant="outline" 
                              className="border-2 border-rust text-rust hover:bg-rust hover:text-cream w-full uppercase tracking-widest font-bold"
                            >
                              READ MORE
                              <ArrowRight className="ml-3 h-4 w-4" />
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
        className="py-24 bg-charcoal grain-overlay border-t-2 border-rust/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2 
            className="text-5xl md:text-6xl font-heading font-bold text-cream mb-8 uppercase"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            READY TO SHOP ORGANIC?
          </motion.h2>
          <motion.p 
            className="text-xl text-cream/80 mb-12 font-light max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Explore our fresh, chemical-free produce and support sustainable farming.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              asChild 
              className="bg-rust hover:bg-rust-light text-cream text-lg font-heading py-7 uppercase tracking-widest shadow-heavy hover:shadow-heavy-lg"
            >
              <Link to="/store">SHOP NOW</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
