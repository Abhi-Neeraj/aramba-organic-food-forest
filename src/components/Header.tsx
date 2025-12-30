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
    { label: 'HOME', href: '/' },
    { label: 'ABOUT US', href: '/#about' },
    { label: 'BLOG', href: '/blog' },
    { label: 'CERTIFICATIONS', href: '/certifications' },
    { label: 'CONTACT', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black border-b-2 border-rust/30 shadow-heavy grain-overlay">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-4xl font-heading font-bold text-cream uppercase tracking-widest">
                ARAMBA
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-cream hover:text-rust transition-colors font-bold text-sm uppercase tracking-widest"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* WhatsApp Button */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="hidden sm:block relative"
            >
              <motion.div
                className="absolute inset-0 bg-rust/20 rounded-lg blur-lg"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <Button
                onClick={handleWhatsAppClick}
                className="relative bg-rust hover:bg-rust-light text-cream gap-2 uppercase tracking-widest font-bold shadow-heavy hover:shadow-heavy-lg"
                size="sm"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="hidden md:inline">WHATSAPP</span>
              </Button>
            </motion.div>

            {/* Login Button */}
            {!isAuthenticated && (
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  asChild
                  className="hidden sm:flex bg-rust hover:bg-rust-light text-cream gap-2 uppercase tracking-widest font-bold shadow-heavy hover:shadow-heavy-lg"
                  size="sm"
                >
                  <Link to="/login">
                    <LogIn className="h-4 w-4" />
                    <span className="hidden md:inline">LOGIN</span>
                  </Link>
                </Button>
              </motion.div>
            )}

            {/* Dashboard Link */}
            {isAuthenticated && userRole && (
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  asChild
                  variant="outline"
                  className="hidden sm:flex border-2 border-rust text-rust hover:bg-rust hover:text-cream uppercase tracking-widest font-bold"
                  size="sm"
                >
                  <Link to={`/dashboard/${userRole}`}>DASHBOARD</Link>
                </Button>
              </motion.div>
            )}

            {/* Mini Cart */}
            <MiniCart />

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-cream hover:text-rust transition-colors"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
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
              className="lg:hidden border-t-2 border-rust/30 bg-charcoal"
            >
              <nav className="py-6 space-y-3">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-6 py-3 text-cream hover:bg-rust/20 hover:text-rust transition-colors font-bold uppercase tracking-widest"
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div className="border-t-2 border-rust/30 pt-3 mt-3 space-y-3">
                  <motion.button
                    onClick={() => {
                      handleWhatsAppClick();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-6 py-3 text-rust hover:bg-rust/20 transition-colors font-bold uppercase tracking-widest flex items-center gap-3"
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MessageCircle className="h-5 w-5" />
                    WHATSAPP
                  </motion.button>
                  {!isAuthenticated && (
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-6 py-3 text-rust hover:bg-rust/20 transition-colors font-bold uppercase tracking-widest"
                    >
                      LOGIN
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
