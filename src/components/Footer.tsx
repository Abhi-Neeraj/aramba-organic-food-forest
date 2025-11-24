import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
    // You can add actual newsletter subscription logic here
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-[120rem] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Contact */}
          <div className="space-y-4">
            <div className="text-2xl font-heading font-bold">
              ARAMBA
            </div>
            <p className="text-sm font-paragraph opacity-90">
              Organic Food Forest bringing you the freshest, most sustainable produce straight from nature.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4" />
                <span>+91 887 954 3210</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>hello@aramba.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Organic Food Forest, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-sm hover:text-terracotta transition-colors">
                Home
              </Link>
              <Link to="/store" className="block text-sm hover:text-terracotta transition-colors">
                Shop
              </Link>
              <Link to="/blog" className="block text-sm hover:text-terracotta transition-colors">
                Blog
              </Link>
              <Link to="/our-team" className="block text-sm hover:text-terracotta transition-colors">
                Our Team
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Categories</h3>
            <div className="space-y-2">
              <Link to="/store" className="block text-sm hover:text-terracotta transition-colors">
                Vegetables
              </Link>
              <Link to="/store" className="block text-sm hover:text-terracotta transition-colors">
                Fruits
              </Link>
              <Link to="/store" className="block text-sm hover:text-terracotta transition-colors">
                Oils
              </Link>
              <Link to="/store" className="block text-sm hover:text-terracotta transition-colors">
                Millets
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Stay Updated</h3>
            <p className="text-sm opacity-90">
              Subscribe to our newsletter for the latest updates on seasonal produce and organic living tips.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary-foreground text-primary"
                required
              />
              <Button 
                type="submit" 
                className="w-full bg-terracotta hover:bg-terracotta/90 text-white"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                className="text-primary-foreground hover:text-terracotta transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-primary-foreground hover:text-terracotta transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-primary-foreground hover:text-terracotta transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <div className="text-sm opacity-90">
              © 2024 ARAMBA • Organic Food Forest. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}