import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-organic-green-lighter to-white py-12 sm:py-16">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-dark-gray mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-dark-gray opacity-90">
              We'd love to hear from you. Reach out with any questions or feedback.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-2xl font-bold text-dark-gray mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-dark-gray mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border-gray rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-gray mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border-gray rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-gray mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border-gray rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-gray mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-border-gray rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                  placeholder="Your message..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-organic-green-light transition-colors flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-heading text-2xl font-bold text-dark-gray mb-6">Contact Information</h2>
            </div>

            {/* Address */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-organic-green-lighter">
                  <MapPin className="text-primary" size={24} />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-dark-gray mb-1">Address</h3>
                <p className="text-dark-gray opacity-75">
                  123 Farm Road<br />
                  Agricultural Valley<br />
                  Country 12345
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-organic-green-lighter">
                  <Phone className="text-primary" size={24} />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-dark-gray mb-1">Phone</h3>
                <a href="tel:+1234567890" className="text-primary hover:text-organic-green-light transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-organic-green-lighter">
                  <Mail className="text-primary" size={24} />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-dark-gray mb-1">Email</h3>
                <a href="mailto:info@aramba.com" className="text-primary hover:text-organic-green-light transition-colors">
                  info@aramba.com
                </a>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="pt-4">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-organic-green-light transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* Business Hours */}
            <div className="bg-light-gray p-6 rounded-lg">
              <h3 className="font-semibold text-dark-gray mb-4">Business Hours</h3>
              <div className="space-y-2 text-sm text-dark-gray opacity-75">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
