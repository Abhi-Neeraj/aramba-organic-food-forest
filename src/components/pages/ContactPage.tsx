import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const locations = [
    {
      name: 'Main Farm',
      address: 'ARAMBA Food Forest, Rural Area, State',
      phone: '+91 9666277729',
      hours: 'Mon - Fri: 9:00 AM - 6:00 PM',
      type: 'Farm & Headquarters'
    },
    {
      name: 'Urban Distribution Center',
      address: 'City Center, Main Street, City',
      phone: '+91 9666277729',
      hours: 'Mon - Sun: 8:00 AM - 8:00 PM',
      type: 'Distribution & Pickup'
    },
    {
      name: 'Customer Service',
      address: 'Online Support Available',
      phone: '+91 9666277729',
      hours: '24/7 Support',
      type: 'Online & Phone'
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak with our team',
      contact: '+91 9666277729'
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us a message',
      contact: 'hello@aramba.com'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Quick chat support',
      contact: '+91 9666277729'
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
            Get In Touch
          </motion.h1>
          <motion.p
            className="text-xl text-white font-paragraph"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.4 } }}
          >
            We'd love to hear from you. Reach out anytime!
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Methods */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <Card className="bg-background rounded-xl overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                    >
                      <method.icon className="h-8 w-8 text-secondary" />
                    </motion.div>
                    <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                      {method.title}
                    </h3>
                    <p className="text-gray-600 font-paragraph text-sm mb-3">
                      {method.description}
                    </p>
                    <a
                      href={method.title === 'Call Us' || method.title === 'WhatsApp' ? `tel:${method.contact}` : `mailto:${method.contact}`}
                      className="text-secondary font-semibold hover:text-secondary/80 transition-colors"
                    >
                      {method.contact}
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Form & Locations */}
      <motion.section
        className="py-16 bg-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <Card className="bg-white rounded-xl overflow-hidden">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-heading font-bold text-primary mb-6">
                    Send us a Message
                  </h2>

                  {submitted ? (
                    <motion.div
                      className="bg-secondary/10 border-2 border-secondary rounded-lg p-6 text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-secondary font-semibold mb-2">Thank you!</p>
                      <p className="text-gray-600 font-paragraph">
                        We've received your message and will get back to you soon.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-primary mb-2">
                            Name
                          </label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-primary mb-2">
                            Email
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            required
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">
                          Phone
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 XXXXXXXXXX"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">
                          Subject
                        </label>
                        <Input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="How can we help?"
                          required
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">
                          Message
                        </label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us more..."
                          required
                          rows={5}
                          className="w-full"
                        />
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button
                          type="submit"
                          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
                        >
                          Send Message
                        </Button>
                      </motion.div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Locations */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <h2 className="text-3xl font-heading font-bold text-primary mb-6">
                Our Locations
              </h2>

              <div className="space-y-6">
                {locations.map((location, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: '-100px' }}
                  >
                    <Card className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-heading font-semibold text-primary mb-1">
                          {location.name}
                        </h3>
                        <p className="text-sm text-secondary font-semibold mb-4">
                          {location.type}
                        </p>

                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                            <p className="text-gray-600 font-paragraph text-sm">
                              {location.address}
                            </p>
                          </div>

                          <div className="flex items-start gap-3">
                            <Phone className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                            <a
                              href={`tel:${location.phone}`}
                              className="text-gray-600 font-paragraph text-sm hover:text-secondary transition-colors"
                            >
                              {location.phone}
                            </a>
                          </div>

                          <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                            <p className="text-gray-600 font-paragraph text-sm">
                              {location.hours}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
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
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 font-paragraph max-w-2xl mx-auto">
              Find answers to common questions about our products and services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                q: 'How do I place an order?',
                a: 'You can order through our website, call us, or visit our distribution center. We offer delivery and pickup options.'
              },
              {
                q: 'What is your delivery area?',
                a: 'We deliver to most urban areas within 50km. Check our website or call for specific location availability.'
              },
              {
                q: 'Are your products certified organic?',
                a: 'Yes, all our products are NPOP certified organic. We maintain the highest standards of organic farming.'
              },
              {
                q: 'Can I visit the farm?',
                a: 'Absolutely! We welcome farm visits. Please call ahead to schedule a tour with our team.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <Card className="bg-background rounded-xl overflow-hidden h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-heading font-semibold text-primary mb-3">
                      {faq.q}
                    </h3>
                    <p className="text-gray-600 font-paragraph text-sm">
                      {faq.a}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
