import { motion } from 'framer-motion';
import { TrendingUp, Leaf, Droplet, Users, Award, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';

export default function ImpactDashboardPage() {
  const [animatedStats, setAnimatedStats] = useState({
    co2Offset: 0,
    waterSaved: 0,
    farmersSupported: 0,
    customersServed: 0,
    wasteDiverted: 0,
    landRegeneratedAcres: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats(prev => ({
        co2Offset: Math.min(prev.co2Offset + 50, 5000),
        waterSaved: Math.min(prev.waterSaved + 100000, 10000000),
        farmersSupported: Math.min(prev.farmersSupported + 1, 150),
        customersServed: Math.min(prev.customersServed + 10, 5000),
        wasteDiverted: Math.min(prev.wasteDiverted + 50, 5000),
        landRegeneratedAcres: Math.min(prev.landRegeneratedAcres + 0.5, 500)
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const impactMetrics = [
    {
      icon: Leaf,
      title: 'CO2 Offset',
      value: '5,000+',
      unit: 'Tons',
      description: 'Carbon emissions offset through regenerative practices',
      color: 'bg-green-100 text-green-800'
    },
    {
      icon: Droplet,
      title: 'Water Conserved',
      value: '10M+',
      unit: 'Gallons',
      description: 'Water saved through efficient irrigation systems',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      icon: Users,
      title: 'Farmers Supported',
      value: '150+',
      unit: 'Farmers',
      description: 'Local farmers in our sustainable network',
      color: 'bg-amber-100 text-amber-800'
    },
    {
      icon: Award,
      title: 'Customers Served',
      value: '5,000+',
      unit: 'Happy Customers',
      description: 'Families enjoying organic produce',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      icon: TrendingUp,
      title: 'Waste Diverted',
      value: '5,000+',
      unit: 'Tons',
      description: 'Organic waste composted and recycled',
      color: 'bg-orange-100 text-orange-800'
    },
    {
      icon: Leaf,
      title: 'Land Regenerated',
      value: '500+',
      unit: 'Acres',
      description: 'Acres restored to ecological health',
      color: 'bg-emerald-100 text-emerald-800'
    }
  ];

  const timeline = [
    {
      year: '2015',
      title: 'Foundation',
      description: 'Started with sustainable farming principles',
      impact: '10 acres'
    },
    {
      year: '2017',
      title: 'Expansion',
      description: 'Grew to 50 acres of organic farmland',
      impact: '50 acres'
    },
    {
      year: '2019',
      title: 'Certification',
      description: 'Achieved NPOP organic certification',
      impact: '100% Certified'
    },
    {
      year: '2021',
      title: 'Community',
      description: 'Launched CSA program and direct delivery',
      impact: '1,000+ customers'
    },
    {
      year: '2023',
      title: 'Recognition',
      description: 'Awarded for environmental leadership',
      impact: '5 Awards'
    },
    {
      year: '2024',
      title: 'Global Vision',
      description: 'Expanding regenerative agriculture model',
      impact: '500+ acres'
    }
  ];

  const certifications = [
    {
      name: 'NPOP Certified',
      description: 'National Programme for Organic Production',
      icon: '🌿'
    },
    {
      name: 'Carbon Neutral',
      description: '100% offset emissions',
      icon: '♻️'
    },
    {
      name: 'Fair Trade',
      description: 'Supporting farmer livelihoods',
      icon: '🤝'
    },
    {
      name: 'Water Steward',
      description: 'Sustainable water management',
      icon: '💧'
    },
    {
      name: 'Biodiversity Champion',
      description: 'Protecting native species',
      icon: '🦋'
    },
    {
      name: 'Community Partner',
      description: 'Supporting local communities',
      icon: '👥'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        className="relative h-80 flex items-center justify-center overflow-hidden bg-gradient-to-r from-primary via-secondary to-emerald-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.h1
            className="text-5xl md:text-6xl font-heading font-bold text-white mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.2 } }}
          >
            Our Impact
          </motion.h1>
          <motion.p
            className="text-xl text-white font-paragraph"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.4 } }}
          >
            Measurable change for people and planet
          </motion.p>
        </div>
      </motion.section>

      <div className="max-w-[120rem] mx-auto px-6 py-16">
        {/* Impact Metrics */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">
              Our Environmental Impact
            </h2>
            <p className="text-lg text-gray-600 font-paragraph max-w-2xl mx-auto">
              Real numbers showing our commitment to regenerative agriculture and community wellbeing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactMetrics.map((metric, index) => (
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
                      className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 ${metric.color}`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                    >
                      <metric.icon className="h-8 w-8" />
                    </motion.div>
                    <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                      {metric.title}
                    </h3>
                    <motion.div
                      className="text-3xl font-heading font-bold text-secondary mb-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      viewport={{ once: true, margin: '-100px' }}
                    >
                      {metric.value}
                    </motion.div>
                    <p className="text-sm text-gray-600 font-paragraph mb-3">
                      {metric.unit}
                    </p>
                    <p className="text-sm text-gray-600 font-paragraph">
                      {metric.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">
              Our Growth Journey
            </h2>
            <p className="text-lg text-gray-600 font-paragraph max-w-2xl mx-auto">
              From humble beginnings to a regenerative agriculture leader
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-secondary to-primary"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  <div className="w-full lg:w-1/2 lg:px-8">
                    <Card className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-20 h-20 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl font-heading font-bold text-secondary">
                              {item.year}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 font-paragraph mb-2">
                              {item.description}
                            </p>
                            <p className="text-sm font-semibold text-secondary">
                              Impact: {item.impact}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden lg:flex w-0 justify-center">
                    <motion.div
                      className="w-6 h-6 bg-secondary rounded-full border-4 border-white shadow-lg"
                      whileHover={{ scale: 1.3 }}
                      transition={{ duration: 0.2 }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Certifications */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">
              Certifications & Recognition
            </h2>
            <p className="text-lg text-gray-600 font-paragraph max-w-2xl mx-auto">
              Verified by leading organizations for our commitment to sustainability
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <Card className="bg-white rounded-xl overflow-hidden h-full hover:shadow-lg transition-shadow text-center">
                  <CardContent className="p-8">
                    <div className="text-5xl mb-4">{cert.icon}</div>
                    <h3 className="text-lg font-heading font-semibold text-primary mb-2">
                      {cert.name}
                    </h3>
                    <p className="text-gray-600 font-paragraph text-sm">
                      {cert.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="bg-gradient-to-r from-primary to-secondary rounded-xl p-12 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            className="text-4xl font-heading font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            Be Part of the Impact
          </motion.h2>
          <motion.p
            className="text-xl font-paragraph mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            Every purchase supports regenerative agriculture and creates positive change for our planet and communities.
          </motion.p>
        </motion.section>
      </div>
    </div>
  );
}
