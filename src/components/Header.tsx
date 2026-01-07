import { useState, useMemo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useMember } from '@/integrations';

// Memoized Navigation Link Component
const NavLink = ({ to, children, isActive, onClick }: { to: string; children: string; isActive: boolean; onClick?: () => void }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'border-b-2 border-primary text-primary'
        : 'text-dark-gray hover:text-primary'
    }`}
  >
    {children}
  </Link>
);

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, actions } = useMember();

  // Memoize active path check
  const activePathMemo = useMemo(() => location.pathname, [location.pathname]);

  // Memoize navigation links
  const navLinks = useMemo(
    () => [
      { path: '/', label: 'Home' },
      { path: '/blog', label: 'Blog' },
      { path: '/certifications', label: 'Certifications' },
      { path: '/contact', label: 'Contact' },
    ],
    []
  );

  // Callback for closing mobile menu
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  // Callback for handling login
  const handleLogin = useCallback(() => {
    actions.login();
    closeMobileMenu();
  }, [actions, closeMobileMenu]);

  // Callback for handling logout
  const handleLogout = useCallback(() => {
    actions.logout();
    closeMobileMenu();
  }, [actions, closeMobileMenu]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border-gray shadow-sm">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-16 py-3 sm:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg leading-none">A</span>
            </div>
            <span className="font-heading font-bold text-base sm:text-lg text-dark-gray hidden sm:inline whitespace-nowrap">
              ARAMBA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                isActive={activePathMemo === link.path}
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:text-organic-green-light transition-colors duration-200"
            >
              WhatsApp
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            {!isAuthenticated ? (
              <button
                onClick={actions.login}
                className="hidden sm:inline-block text-sm font-medium text-primary hover:text-organic-green-light transition-colors duration-200 whitespace-nowrap"
              >
                Login
              </button>
            ) : (
              <button
                onClick={actions.logout}
                className="hidden sm:inline-block text-sm font-medium text-primary hover:text-organic-green-light transition-colors duration-200 whitespace-nowrap"
              >
                Logout
              </button>
            )}

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-dark-gray hover:text-primary transition-colors duration-200 flex-shrink-0"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={20} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center font-semibold">
                0
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-dark-gray hover:text-primary transition-colors duration-200 flex-shrink-0"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-border-gray animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-3 pt-4">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    activePathMemo === link.path
                      ? 'text-primary font-semibold'
                      : 'text-dark-gray hover:text-primary'
                  }`}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:text-organic-green-light transition-colors duration-200"
              >
                WhatsApp
              </a>
              <div className="border-t border-border-gray pt-3 mt-3">
                {!isAuthenticated ? (
                  <button
                    onClick={handleLogin}
                    className="w-full text-left text-sm font-medium text-primary hover:text-organic-green-light transition-colors duration-200"
                  >
                    Login
                  </button>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-sm font-medium text-primary hover:text-organic-green-light transition-colors duration-200"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
