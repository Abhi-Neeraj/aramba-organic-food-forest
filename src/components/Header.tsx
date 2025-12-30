import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, LogIn, Menu, X } from 'lucide-react';
import { MiniCart } from '@/wix-verticals/react-pages/react-router/routes/root';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { isAuthenticated, userRole } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'm interested in ARAMBA organic products. Can you help me?");
    window.open(`https://wa.me/919666277729?text=${message}`, '_blank');
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/#about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Certifications', href: '/certifications' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-brown/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-3xl font-heading font-bold text-charcoal">
                ARAMBA
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-charcoal hover:text-copper transition-colors font-light text-sm uppercase tracking-wider"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* WhatsApp Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                onClick={handleWhatsAppClick}
                className="hidden sm:flex bg-copper hover:bg-copper-light text-white gap-2 uppercase tracking-wider font-bold shadow-md hover:shadow-lg"
                size="sm"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="hidden md:inline">WhatsApp</span>
              </Button>
            </motion.div>

            {/* Login Button */}
            {!isAuthenticated && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  asChild
                  className="hidden sm:flex bg-copper hover:bg-copper-light text-white gap-2 uppercase tracking-wider font-bold shadow-md hover:shadow-lg"
                  size="sm"
                >
                  <Link to="/login">
                    <LogIn className="h-4 w-4" />
                    <span className="hidden md:inline">Login</span>
                  </Link>
                </Button>
              </motion.div>
            )}

            {/* Dashboard Link */}
            {isAuthenticated && userRole && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  asChild
                  variant="outline"
                  className="hidden sm:flex border-2 border-copper text-copper hover:bg-copper hover:text-white uppercase tracking-wider font-bold"
                  size="sm"
                >
                  <Link to={`/dashboard/${userRole}`}>Dashboard</Link>
                </Button>
              </motion.div>
            )}

            {/* Mini Cart */}
            <MiniCart />

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-charcoal hover:text-copper transition-colors"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t-2 border-brown/10 bg-white"
            >
              <nav className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-charcoal hover:bg-sand hover:text-copper transition-colors font-light uppercase tracking-wider"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div className="border-t-2 border-brown/10 pt-2 mt-2 space-y-2">
                  <motion.button
                    onClick={() => {
                      handleWhatsAppClick();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-copper hover:bg-sand transition-colors font-light uppercase tracking-wider flex items-center gap-2"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </motion.button>
                  {!isAuthenticated && (
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-copper hover:bg-sand transition-colors font-light uppercase tracking-wider"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
