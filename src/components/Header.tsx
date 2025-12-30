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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-heading font-bold text-green-900">
              ARAMBA
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-700 hover:text-green-700 transition-colors font-paragraph text-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* WhatsApp Button */}
            <Button
              onClick={handleWhatsAppClick}
              className="hidden sm:flex bg-green-700 hover:bg-green-800 text-white gap-2"
              size="sm"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden md:inline">WhatsApp</span>
            </Button>

            {/* Login Button */}
            {!isAuthenticated && (
              <Button
                asChild
                className="hidden sm:flex bg-green-700 hover:bg-green-800 text-white gap-2"
                size="sm"
              >
                <Link to="/login">
                  <LogIn className="h-4 w-4" />
                  <span className="hidden md:inline">Login</span>
                </Link>
              </Button>
            )}

            {/* Dashboard Link */}
            {isAuthenticated && userRole && (
              <Button
                asChild
                variant="outline"
                className="hidden sm:flex border-green-700 text-green-700 hover:bg-green-50"
                size="sm"
              >
                <Link to={`/dashboard/${userRole}`}>Dashboard</Link>
              </Button>
            )}

            {/* Mini Cart */}
            <MiniCart />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-green-700 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
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
              className="lg:hidden border-t border-gray-200 bg-white"
            >
              <nav className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors font-paragraph"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="border-t border-gray-200 pt-2 mt-2 space-y-2">
                  <button
                    onClick={() => {
                      handleWhatsAppClick();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-green-700 hover:bg-green-50 transition-colors font-paragraph flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </button>
                  {!isAuthenticated && (
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-green-700 hover:bg-green-50 transition-colors font-paragraph"
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
