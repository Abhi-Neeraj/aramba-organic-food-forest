import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useMember } from '@/integrations';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, actions } = useMember();

  const isActive = (path: string) => {
    return location.pathname === path ? 'border-b-2 border-primary text-primary' : 'text-dark-gray hover:text-primary';
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border-gray shadow-sm">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-heading font-bold text-lg text-dark-gray hidden sm:inline">ARAMBA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/')}`}>
              Home
            </Link>
            <Link to="/blog" className={`text-sm font-medium transition-colors ${isActive('/blog')}`}>
              Blog
            </Link>
            <Link to="/certifications" className={`text-sm font-medium transition-colors ${isActive('/certifications')}`}>
              Certifications
            </Link>
            <Link to="/contact" className={`text-sm font-medium transition-colors ${isActive('/contact')}`}>
              Contact
            </Link>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:text-organic-green-light transition-colors"
            >
              WhatsApp
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <button
                onClick={actions.login}
                className="hidden sm:inline-block text-sm font-medium text-primary hover:text-organic-green-light transition-colors"
              >
                Login
              </button>
            ) : (
              <button
                onClick={actions.logout}
                className="hidden sm:inline-block text-sm font-medium text-primary hover:text-organic-green-light transition-colors"
              >
                Logout
              </button>
            )}

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-dark-gray hover:text-primary transition-colors"
            >
              <ShoppingCart size={20} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-dark-gray hover:text-primary transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-border-gray">
            <div className="flex flex-col gap-3 pt-4">
              <Link
                to="/"
                className="text-sm font-medium text-dark-gray hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/blog"
                className="text-sm font-medium text-dark-gray hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/certifications"
                className="text-sm font-medium text-dark-gray hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Certifications
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium text-dark-gray hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:text-organic-green-light transition-colors"
              >
                WhatsApp
              </a>
              {!isAuthenticated ? (
                <button
                  onClick={() => {
                    actions.login();
                    setMobileMenuOpen(false);
                  }}
                  className="text-sm font-medium text-primary hover:text-organic-green-light transition-colors text-left"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={() => {
                    actions.logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-sm font-medium text-primary hover:text-organic-green-light transition-colors text-left"
                >
                  Logout
                </button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
