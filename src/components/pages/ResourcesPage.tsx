import { motion } from 'framer-motion';
import { BookOpen, Video, Download, Lightbulb, Users, Leaf } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function ResourcesPage() {
  const resources = [
    {
      icon: BookOpen,
      title: 'Organic Farming Guide',
      description: 'Learn the fundamentals of organic farming and sustainable agriculture practices.',
      type: 'Guide',
      action: 'Read More'
    },
    {
      icon: Video,
      title: 'Farm Tour Videos',
      description: 'Take a virtual tour of our food forest and see how we grow your food.',
      type: 'Video Series',
      action: 'Watch Now'
    },
    {
      icon: Download,
      title: 'Seasonal Produce Guide',
      description: 'Download our guide to seasonal produce and learn what\'s in season each month.',
      type: 'PDF Guide',
      action: 'Download'
    },
    {
      icon: Lightbulb,
      title: 'Cooking Tips & Recipes',
      description: 'Discover delicious recipes and cooking techniques for our organic produce.',
      type: 'Recipes',
      action: 'Explore'
    },
    {
      icon: Users,
      title: 'Community Stories',
      description: 'Read inspiring stories from our community members and their organic journey.',
      type: 'Stories',
      action: 'Read'
    },
    {
      icon: Leaf,
      title: 'Sustainability Tips',
      description: 'Learn how to live more sustainably and reduce your environmental impact.',
      type: 'Tips',
      action: 'Learn'
    }
  ];

  const articles = [
    {
      title: 'The Benefits of Eating Seasonal Produce',
      excerpt: 'Discover why eating seasonally is better for your health, wallet, and the environment.',
      date: 'Dec 15, 2024',
      category: 'Nutrition'
    },
    {
      title: 'Understanding Organic Certification',
      excerpt: 'What does organic certification really mean? Learn about the standards and requirements.',
      date: 'Dec 10, 2024',
      category: 'Education'
    },
    {
      title: 'Permaculture: Growing Food the Natural Way',
      excerpt: 'Explore the principles of permaculture and how they create sustainable ecosystems.',
      date: 'Dec 5, 2024',
      category: 'Farming'
    },
    {
      title: 'Reducing Food Waste at Home',
      excerpt: 'Practical tips for using every part of your produce and reducing household waste.',
      date: 'Nov 30, 2024',
      category: 'Sustainability'
    },
    {
      title: 'The Soil Health Revolution',
      excerpt: 'Why healthy soil is the foundation of sustainable agriculture and food security.',
      date: 'Nov 25, 2024',
      category: 'Science'
    },
    {
      title: 'Supporting Local Agriculture',
      excerpt: 'How buying local organic produce supports farmers and strengthens communities.',
      date: 'Nov 20, 2024',
      category: 'Community'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative h-96 flex items-center justify-center overflow-hidden bg-gradient-to-r from-primary to-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
      >
        <div className="relative z-10 text-center px-6">
          <motion.h1
            className="text-5xl md:text-6xl font-heading font-bold text-white mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.2 } }}
          >
            Resources & Learning
          </motion.h1>
          <motion.p
            className="text-xl text-white font-paragraph"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.4 } }}
          >
            Educate yourself about organic farming, nutrition, and sustainability
          </motion.p>
        </div>
      </motion.section>

      {/* Resource Categories */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">
              Learning Resources
            </h2>
            <p className="text-lg text-gray-600 font-paragraph max-w-2xl mx-auto">
              Explore our collection of guides, videos, and articles to deepen your knowledge.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <Card className="bg-background rounded-xl overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex flex-col h-full">
                    <motion.div
                      className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                    >
                      <resource.icon className="h-8 w-8 text-secondary" />
                    </motion.div>
                    <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 font-paragraph text-sm mb-4 flex-grow">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                        {resource.type}
                      </span>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary/80">
                          {resource.action} →
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Articles */}
      <motion.section
        className="py-16 bg-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">
              Latest Articles
            </h2>
            <p className="text-lg text-gray-600 font-paragraph max-w-2xl mx-auto">
              Stay informed with our latest insights on organic farming and sustainable living.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <Card className="bg-white rounded-xl overflow-hidden h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-500 font-paragraph">
                        {article.date}
                      </span>
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-primary mb-3">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 font-paragraph text-sm flex-grow">
                      {article.excerpt}
                    </p>
                    <motion.div
                      className="mt-4"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary/80 p-0">
                        Read Article →
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Newsletter Signup */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <Card className="bg-gradient-to-r from-primary to-secondary rounded-xl overflow-hidden">
            <CardContent className="p-8 text-white text-center">
              <motion.h2
                className="text-3xl font-heading font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                Stay Updated
              </motion.h2>
              <motion.p
                className="font-paragraph mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                Subscribe to our newsletter for weekly recipes, farming tips, and sustainability insights.
              </motion.p>
              <motion.div
                className="flex gap-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-primary focus:outline-none"
                />
                <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  Subscribe
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-16 bg-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-[120rem] mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl font-heading font-bold text-primary mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            Ready to Learn More?
          </motion.h2>
          <motion.p
            className="text-xl font-paragraph text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            Explore our resources and join the organic farming revolution.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/store">Shop Organic</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
              <Link to="/csa">Join CSA</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
