import { motion } from 'framer-motion';
import { Leaf, Droplet, Sun, Zap, TreePine, Bug } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';

export default function SustainabilityPage() {
  const practices = [
    {
      icon: TreePine,
      title: 'Permaculture Design',
      description: 'We design our food forest using permaculture principles, creating self-sustaining ecosystems that mimic natural forests.',
      details: [
        'Multi-layered crop systems',
        'Reduced water requirements',
        'Enhanced biodiversity',
        'Long-term soil health'
      ]
    },
    {
      icon: Droplet,
      title: 'Water Conservation',
      description: 'Advanced irrigation systems and rainwater harvesting reduce water consumption by 60% compared to conventional farming.',
      details: [
        'Drip irrigation systems',
        'Rainwater collection ponds',
        'Mulching techniques',
        'Soil moisture monitoring'
      ]
    },
    {
      icon: Sun,
      title: 'Renewable Energy',
      description: 'Solar panels power our operations, reducing our carbon footprint and energy costs significantly.',
      details: [
        'Solar-powered equipment',
        'Renewable energy infrastructure',
        'Energy-efficient storage',
        'Carbon-neutral operations'
      ]
    },
    {
      icon: Bug,
      title: 'Biodiversity Protection',
      description: 'We maintain natural habitats and encourage beneficial insects, creating a balanced ecosystem.',
      details: [
        'Native plant corridors',
        'Pollinator sanctuaries',
        'Pest management without chemicals',
        'Wildlife habitat preservation'
      ]
    },
    {
      icon: Leaf,
      title: 'Soil Regeneration',
      description: 'Our composting and crop rotation practices continuously improve soil health and carbon sequestration.',
      details: [
        'Organic matter enrichment',
        'Crop rotation cycles',
        'Compost production',
        'Carbon sequestration'
      ]
    },
    {
      icon: Zap,
      title: 'Waste Reduction',
      description: 'We minimize waste through composting, recycling, and sustainable packaging practices.',
      details: [
        'Zero-waste composting',
        'Recyclable packaging',
        'Waste reduction programs',
        'Circular economy practices'
      ]
    }
  ];

  const impacts = [
    {
      metric: '500+',
      label: 'Tons of CO2 Offset Annually',
      icon: '🌍'
    },
    {
      metric: '10M+',
      label: 'Gallons of Water Saved Yearly',
      icon: '💧'
    },
    {
      metric: '50+',
      label: 'Native Species Protected',
      icon: '🦋'
    },
    {
      metric: '100%',
      label: 'Organic & Chemical-Free',
      icon: '🌿'
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
          alt="Sustainable farming practices"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-heading font-bold text-white mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.2 } }}
          >
            Sustainability
          </motion.h1>
          <motion.p
            className="text-xl text-white font-paragraph"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.4 } }}
          >
            Growing food that heals the earth
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
              Our Commitment to the Planet
            </h2>
            <p className="text-lg text-gray-600 font-paragraph mb-4">
              At ARAMBA, sustainability isn't just a practice—it's our purpose. We believe that farming should regenerate the earth, not deplete it. Every decision we make, from crop selection to packaging, is guided by our commitment to environmental stewardship.
            </p>
            <p className="text-lg text-gray-600 font-paragraph">
              Our food forest model demonstrates that agriculture can be both productive and restorative, creating abundance while healing the soil and protecting biodiversity.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Sustainable Practices */}
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
              Our Sustainable Practices
            </h2>
            <p className="text-lg text-gray-600 font-paragraph max-w-2xl mx-auto">
              Innovative approaches that balance productivity with environmental responsibility.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practices.map((practice, index) => (
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
                      <practice.icon className="h-8 w-8 text-secondary" />
                    </motion.div>
                    <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                      {practice.title}
                    </h3>
                    <p className="text-gray-600 font-paragraph text-sm mb-4">
                      {practice.description}
                    </p>
                    <ul className="space-y-2">
                      {practice.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-secondary font-bold mt-1">•</span>
                          <span className="text-sm text-gray-600 font-paragraph">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Impact Metrics */}
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
              Our Environmental Impact
            </h2>
            <p className="text-lg text-gray-600 font-paragraph max-w-2xl mx-auto">
              Measurable results from our commitment to sustainability.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impacts.map((impact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <Card className="bg-background rounded-xl overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{impact.icon}</div>
                    <motion.div
                      className="text-3xl font-heading font-bold text-secondary mb-2"
                      whileInView={{ scale: 1.1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      viewport={{ once: true, margin: '-100px' }}
                    >
                      {impact.metric}
                    </motion.div>
                    <p className="text-gray-600 font-paragraph text-sm">
                      {impact.label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Certification & Standards */}
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
              Certifications & Standards
            </h2>
            <p className="text-lg text-gray-600 font-paragraph max-w-2xl mx-auto">
              Our practices are verified by leading environmental and agricultural organizations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'NPOP Certified',
                description: 'National Programme for Organic Production certification ensures our farming meets the highest organic standards.'
              },
              {
                title: 'Carbon Neutral',
                description: 'Our operations offset 100% of carbon emissions through renewable energy and regenerative practices.'
              },
              {
                title: 'Water Steward',
                description: 'Recognized for water conservation practices that reduce consumption and protect local water resources.'
              }
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <Card className="bg-white rounded-xl overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                      {cert.title}
                    </h3>
                    <p className="text-gray-600 font-paragraph">
                      {cert.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
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
            Be Part of the Solution
          </motion.h2>
          <motion.p
            className="text-xl font-paragraph mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            Every purchase supports sustainable farming practices that heal the earth and nourish communities.
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
}
