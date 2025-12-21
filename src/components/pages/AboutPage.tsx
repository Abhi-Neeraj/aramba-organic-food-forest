import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Heart, Globe, Users, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Certifications } from '@/entities';

export default function AboutPage() {
  const [certifications, setCertifications] = useState<Certifications[]>([]);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Certifications>('certifications');
        setCertifications(items);
      } catch (error) {
        console.error('Error fetching certifications:', error);
      }
    };

    fetchCertifications();
  }, []);

  const timelineEvents = [
    {
      year: '2015',
      title: 'The Beginning',
      description: 'Started with a small plot of land and a vision to create sustainable organic farming.'
    },
    {
      year: '2017',
      title: 'Food Forest Established',
      description: 'Transformed 50 acres into a thriving permaculture food forest with diverse crops.'
    },
    {
      year: '2019',
      title: 'Organic Certification',
      description: 'Achieved official organic certification from NPOP, validating our sustainable practices.'
    },
    {
      year: '2021',
      title: 'Community Expansion',
      description: 'Launched CSA program and direct-to-consumer delivery across multiple regions.'
    },
    {
      year: '2023',
      title: 'Impact Recognition',
      description: 'Recognized as a leader in sustainable agriculture with multiple environmental awards.'
    },
    {
      year: '2024',
      title: 'Global Vision',
      description: 'Expanding operations and inspiring other farmers to adopt regenerative practices.'
    }
  ];

  const values = [
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'We prioritize environmental health and regenerative farming practices that heal the soil.'
    },
    {
      icon: Heart,
      title: 'Quality',
      description: 'Every product is grown with care, ensuring the highest nutritional value and taste.'
    },
    {
      icon: Globe,
      title: 'Community',
      description: 'We believe in building strong connections with our customers and local communities.'
    },
    {
      icon: Users,
      title: 'Transparency',
      description: 'We openly share our farming practices and invite customers to visit our food forest.'
    }
  ];

  const stats = [
    { number: '50+', label: 'Acres of Organic Farmland' },
    { number: '200+', label: 'Product Varieties' },
    { number: '5000+', label: 'Happy Customers' },
    { number: '100%', label: 'Organic Certified' }
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
          alt="Aramba organic farm landscape"
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
            Our Story
          </motion.h1>
          <motion.p
            className="text-xl text-white font-paragraph"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.4 } }}
          >
            From passion to purpose, building a sustainable future
          </motion.p>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 font-paragraph mb-4">
                To cultivate the finest organic produce while regenerating the earth and nourishing our communities. We believe that sustainable agriculture is not just about growing food—it's about growing a better future for generations to come.
              </p>
              <p className="text-lg text-gray-600 font-paragraph">
                Every harvest is a testament to our commitment to environmental stewardship, quality, and the belief that good food should be accessible to all.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 font-paragraph mb-4">
                To become a beacon of sustainable agriculture, inspiring farmers worldwide to adopt regenerative practices that heal the soil, protect biodiversity, and create thriving ecosystems.
              </p>
              <p className="text-lg text-gray-600 font-paragraph">
                We envision a world where organic farming is the norm, where communities are connected to their food sources, and where the earth is healthier for our children.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Core Values */}
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
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 font-paragraph max-w-2xl mx-auto">
              These principles guide every decision we make and every product we grow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
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
                      <value.icon className="h-8 w-8 text-secondary" />
                    </motion.div>
                    <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 font-paragraph text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Timeline */}
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
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 font-paragraph max-w-2xl mx-auto">
              A decade of growth, learning, and commitment to sustainable agriculture.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-secondary to-primary"></div>

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
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
                              {event.year}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                              {event.title}
                            </h3>
                            <p className="text-gray-600 font-paragraph">
                              {event.description}
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
        </div>
      </motion.section>

      {/* Impact Stats */}
      <motion.section
        className="py-16 bg-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                  className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-2"
                  whileInView={{ scale: 1.1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  {stat.number}
                </motion.div>
                <p className="text-gray-600 font-paragraph">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Certifications */}
      {certifications.length > 0 && (
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
                Our Certifications
              </h2>
              <p className="text-lg text-gray-600 font-paragraph max-w-2xl mx-auto">
                Recognized and certified by leading organizations for our commitment to quality and sustainability.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  <Card className="bg-white rounded-xl overflow-hidden h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      {cert.logo && (
                        <div className="mb-4 h-32 flex items-center justify-center bg-background rounded-lg">
                          <Image
                            src={cert.logo}
                            alt={cert.name || 'Certification'}
                            className="max-h-24 object-contain"
                            width={200}
                          />
                        </div>
                      )}
                      <h3 className="text-lg font-heading font-semibold text-primary mb-2">
                        {cert.name}
                      </h3>
                      <p className="text-gray-600 font-paragraph text-sm mb-3">
                        {cert.description}
                      </p>
                      {cert.issuingBody && (
                        <p className="text-sm text-secondary font-semibold">
                          Issued by: {cert.issuingBody}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

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
            Join Our Community
          </motion.h2>
          <motion.p
            className="text-xl font-paragraph mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            Experience the difference that truly organic, sustainably grown produce makes in your life.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <Link to="/store">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/our-team">Meet Our Farmers</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
