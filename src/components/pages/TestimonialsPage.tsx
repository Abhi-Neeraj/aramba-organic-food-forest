import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';

export default function TestimonialsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Health Enthusiast',
      category: 'customer',
      rating: 5,
      text: 'The quality of produce from ARAMBA is exceptional. My family has noticed a significant improvement in our health since switching to their organic products. The taste is incomparable!',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      role: 'Restaurant Owner',
      category: 'business',
      rating: 5,
      text: 'As a chef, I demand the finest ingredients. ARAMBA delivers consistently fresh, flavorful produce that elevates every dish. My customers can taste the difference.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh'
    },
    {
      id: 3,
      name: 'Anjali Patel',
      role: 'Nutritionist',
      category: 'professional',
      rating: 5,
      text: 'I recommend ARAMBA products to all my clients. The nutritional density and absence of harmful chemicals make them ideal for health-conscious individuals.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali'
    },
    {
      id: 4,
      name: 'Vikram Singh',
      role: 'Sustainability Advocate',
      category: 'environmental',
      rating: 5,
      text: 'ARAMBA is doing real work in regenerative agriculture. Their commitment to the environment is genuine, and I\'m proud to support their mission.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram'
    },
    {
      id: 5,
      name: 'Meera Desai',
      role: 'Home Chef',
      category: 'customer',
      rating: 5,
      text: 'Cooking with ARAMBA produce is a joy. The freshness, flavor, and quality are unmatched. I\'ve become a loyal customer and recommend them to everyone.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meera'
    },
    {
      id: 6,
      name: 'Arjun Nair',
      role: 'Farmer & Educator',
      category: 'professional',
      rating: 5,
      text: 'ARAMBA\'s permaculture approach is inspiring. They\'ve shown that sustainable farming can be both profitable and environmentally responsible.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun'
    },
    {
      id: 7,
      name: 'Divya Menon',
      role: 'CSA Member',
      category: 'customer',
      rating: 5,
      text: 'The weekly CSA box is the highlight of my week! The variety, quality, and freshness are incredible. It\'s like having a farmers market delivered to my door.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Divya'
    },
    {
      id: 8,
      name: 'Sanjay Iyer',
      role: 'Environmental Scientist',
      category: 'environmental',
      rating: 5,
      text: 'From a scientific perspective, ARAMBA\'s regenerative practices are exemplary. They\'re making a measurable positive impact on soil health and biodiversity.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sanjay'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Reviews' },
    { id: 'customer', label: 'Customers' },
    { id: 'business', label: 'Businesses' },
    { id: 'professional', label: 'Professionals' },
    { id: 'environmental', label: 'Environmental' }
  ];

  const filteredTestimonials = selectedCategory === 'all'
    ? testimonials
    : testimonials.filter(t => t.category === selectedCategory);

  const stats = [
    { number: '5000+', label: 'Happy Customers' },
    { number: '4.9/5', label: 'Average Rating' },
    { number: '98%', label: 'Satisfaction Rate' },
    { number: '2000+', label: 'Reviews' }
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
            Customer Stories
          </motion.h1>
          <motion.p
            className="text-xl text-white font-paragraph"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.4 } }}
          >
            Hear from our community about their experience with ARAMBA
          </motion.p>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-12 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-2"
                  whileInView={{ scale: 1.1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  {stat.number}
                </motion.div>
                <p className="text-gray-600 font-paragraph text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Category Filter */}
      <motion.section
        className="py-8 bg-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-full font-paragraph font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-secondary text-white'
                    : 'bg-white text-primary border-2 border-secondary hover:border-primary'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Grid */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <Card className="bg-background rounded-xl overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    {/* Quote Icon */}
                    <motion.div
                      className="mb-4"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Quote className="h-8 w-8 text-secondary opacity-50" />
                    </motion.div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Star className="h-5 w-5 fill-secondary text-secondary" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-600 font-paragraph mb-6 italic">
                      "{testimonial.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-heading font-semibold text-primary">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600 font-paragraph">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-16 bg-primary text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-[120rem] mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl font-heading font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            Join Thousands of Satisfied Customers
          </motion.h2>
          <motion.p
            className="text-xl font-paragraph mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            Experience the ARAMBA difference and become part of our growing community of health-conscious, environmentally aware customers.
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
}
