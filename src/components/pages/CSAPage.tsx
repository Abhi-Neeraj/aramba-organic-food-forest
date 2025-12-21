import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Leaf, Gift, Users, TrendingUp, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';

export default function CSAPage() {
  const plans = [
    {
      name: 'Starter Box',
      price: '₹1,500',
      frequency: 'Weekly',
      description: 'Perfect for individuals or small households',
      items: [
        '5-6 seasonal vegetables',
        '2-3 seasonal fruits',
        'Fresh herbs',
        'Organic certification guarantee',
        'Flexible pause options'
      ],
      color: 'border-secondary'
    },
    {
      name: 'Family Box',
      price: '₹2,500',
      frequency: 'Weekly',
      description: 'Ideal for families of 4-5 people',
      items: [
        '8-10 seasonal vegetables',
        '4-5 seasonal fruits',
        'Fresh herbs & greens',
        'Specialty items (rotating)',
        'Flexible pause options',
        'Priority customer support'
      ],
      color: 'border-primary',
      featured: true
    },
    {
      name: 'Premium Box',
      price: '₹3,500',
      frequency: 'Weekly',
      description: 'For the serious organic enthusiast',
      items: [
        '12-15 seasonal vegetables',
        '6-8 seasonal fruits',
        'Fresh herbs & greens',
        'Premium specialty items',
        'Organic dairy products',
        'Priority support & farm access'
      ],
      color: 'border-terracotta'
    }
  ];

  const benefits = [
    {
      icon: Leaf,
      title: 'Freshest Produce',
      description: 'Harvested at peak ripeness and delivered within 24 hours'
    },
    {
      icon: TrendingUp,
      title: 'Cost Savings',
      description: 'Save up to 20% compared to retail prices'
    },
    {
      icon: Users,
      title: 'Community Connection',
      description: 'Join a community of health-conscious, environmentally aware people'
    },
    {
      icon: Heart,
      title: 'Support Local',
      description: 'Direct support for sustainable farming practices'
    },
    {
      icon: Gift,
      title: 'Variety & Surprise',
      description: 'Discover new seasonal produce every week'
    },
    {
      icon: Check,
      title: 'Flexibility',
      description: 'Pause, skip, or modify your box anytime'
    }
  ];

  const features = [
    {
      title: 'Seasonal Selection',
      description: 'Each week brings a carefully curated selection of what\'s in season, ensuring maximum freshness and flavor.'
    },
    {
      title: 'Flexible Scheduling',
      description: 'Pause, skip, or modify your box through our easy-to-use app or website. No long-term commitments.'
    },
    {
      title: 'Farm Visits',
      description: 'CSA members get exclusive access to farm tours and educational workshops about organic farming.'
    },
    {
      title: 'Recipe Support',
      description: 'Receive weekly recipes and cooking tips tailored to the produce in your box.'
    },
    {
      title: 'Delivery Options',
      description: 'Choose between home delivery or convenient pickup points across the city.'
    },
    {
      title: 'Direct Feedback',
      description: 'Your preferences directly influence what we grow. Shape our farm\'s future!'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative h-96 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
      >
        <Image
          src="https://res.cloudinary.com/dicfqwlfq/image/upload/v1763968767/360_F_708626395_P7O5qLX5ZyUBirtGRJzZDiuzM1AHEbJK_rpzjt3.jpg"
          alt="CSA subscription boxes"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center px-6">
          <motion.h1
            className="text-5xl md:text-6xl font-heading font-bold text-white mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.2 } }}
          >
            CSA Subscription
          </motion.h1>
          <motion.p
            className="text-xl text-white font-paragraph"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.4 } }}
          >
            Fresh organic produce delivered to your door every week
          </motion.p>
        </div>
      </motion.section>

      {/* Introduction */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-4xl font-heading font-bold text-primary mb-6">
              What is CSA?
            </h2>
            <p className="text-lg text-gray-600 font-paragraph mb-4">
              Community Supported Agriculture (CSA) is a direct relationship between farmers and consumers. By subscribing to our CSA program, you become a member of the ARAMBA community and receive a weekly box of fresh, seasonal, organic produce.
            </p>
            <p className="text-lg text-gray-600 font-paragraph">
              It's a win-win: you get the freshest produce at great prices, and we get the support to continue our sustainable farming practices.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits Grid */}
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
              Why Choose ARAMBA CSA?
            </h2>
            <p className="text-lg text-gray-600 font-paragraph max-w-2xl mx-auto">
              More than just fresh produce—it's a lifestyle choice that benefits you and the planet.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <Card className="bg-white rounded-xl overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <motion.div
                      className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                    >
                      <benefit.icon className="h-8 w-8 text-secondary" />
                    </motion.div>
                    <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 font-paragraph text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pricing Plans */}
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
              Choose Your Plan
            </h2>
            <p className="text-lg text-gray-600 font-paragraph max-w-2xl mx-auto">
              Select the box size that fits your needs. All plans include free delivery!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                className={plan.featured ? 'md:scale-105' : ''}
              >
                <Card className={`bg-white rounded-xl overflow-hidden h-full border-2 ${plan.color} hover:shadow-lg transition-shadow`}>
                  <CardContent className="p-6">
                    {plan.featured && (
                      <div className="bg-secondary text-white text-center py-2 px-4 rounded-lg mb-4 font-semibold text-sm">
                        Most Popular
                      </div>
                    )}

                    <h3 className="text-2xl font-heading font-bold text-primary mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 font-paragraph text-sm mb-4">
                      {plan.description}
                    </p>

                    <div className="mb-6">
                      <div className="text-4xl font-heading font-bold text-secondary mb-1">
                        {plan.price}
                      </div>
                      <p className="text-gray-600 font-paragraph text-sm">
                        {plan.frequency}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 font-paragraph text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        asChild
                        className={`w-full font-semibold ${
                          plan.featured
                            ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                            : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                        }`}
                      >
                        <Link to="/store">Subscribe Now</Link>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features */}
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
              CSA Features
            </h2>
            <p className="text-lg text-gray-600 font-paragraph max-w-2xl mx-auto">
              Everything you need to make the most of your subscription.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <Card className="bg-white rounded-xl overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-heading font-semibold text-primary mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 font-paragraph text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
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
              How It Works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Choose Your Plan', desc: 'Select the box size that works for you' },
              { step: '2', title: 'Subscribe', desc: 'Sign up and set your delivery schedule' },
              { step: '3', title: 'Receive Weekly', desc: 'Fresh produce delivered to your door' },
              { step: '4', title: 'Enjoy & Share', desc: 'Cook, enjoy, and share with friends' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <Card className="bg-background rounded-xl overflow-hidden h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center text-3xl font-heading font-bold mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 font-paragraph text-sm">
                      {item.desc}
                    </p>
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
            Ready to Join Our Community?
          </motion.h2>
          <motion.p
            className="text-xl font-paragraph mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            Start your CSA subscription today and experience the freshest organic produce delivered to your door.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <Link to="/store">Subscribe Now</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
