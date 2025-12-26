import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface MobileMenuProps {
  isAuthenticated: boolean;
  userRole?: string;
  onLogout: () => void;
}

export default function MobileMenu({ isAuthenticated, userRole, onLogout }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setExpandedMenu(null);
  };

  const handleMenuItemClick = () => {
    closeMenu();
  };

  const handleLogoutClick = () => {
    onLogout();
    closeMenu();
  };

  const menuVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      x: '-100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  } as const;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMenu}
        className="lg:hidden text-primary hover:bg-primary/5"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeMenu}
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed left-0 top-0 h-screen w-80 max-w-[90vw] bg-background border-r border-primary/10 z-50 overflow-y-auto shadow-lg"
          >
            {/* Menu Header */}
            <div className="sticky top-0 bg-background border-b border-primary/10 p-6 flex items-center justify-between">
              <div>
                <div className="text-xl font-heading font-bold text-primary">ARAMBA</div>
                <div className="text-xs font-paragraph text-secondary">Organic Food Forest</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeMenu}
                className="text-primary hover:bg-primary/5"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Menu Content */}
            <nav className="p-6 space-y-2">
              {/* Main Navigation */}
              <Link
                to="/"
                onClick={handleMenuItemClick}
                className="block px-4 py-3 text-primary hover:bg-primary/5 rounded-lg transition-colors font-paragraph"
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={handleMenuItemClick}
                className="block px-4 py-3 text-primary hover:bg-primary/5 rounded-lg transition-colors font-paragraph"
              >
                About
              </Link>

              {/* Shop Submenu */}
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <button className="w-full flex items-center justify-between px-4 py-3 text-primary hover:bg-primary/5 rounded-lg transition-colors font-paragraph">
                    <span>Shop</span>
                    <ChevronDown className="h-4 w-4 transition-transform" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pl-4 mt-1">
                  <Link
                    to="/store"
                    onClick={handleMenuItemClick}
                    className="block px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    All Products
                  </Link>
                  <div className="border-t border-primary/10 my-2" />
                  <Link
                    to="/fresh-fruits-vegetables"
                    onClick={handleMenuItemClick}
                    className="block px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    Fresh Fruits & Vegetables
                  </Link>
                  <Link
                    to="/grocery-staples"
                    onClick={handleMenuItemClick}
                    className="block px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    Grocery & Staples
                  </Link>
                  <Link
                    to="/dairy-bakery"
                    onClick={handleMenuItemClick}
                    className="block px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    Dairy & Bakery
                  </Link>
                  <Link
                    to="/beverages"
                    onClick={handleMenuItemClick}
                    className="block px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    Beverages
                  </Link>
                  <Link
                    to="/snacks-branded-foods"
                    onClick={handleMenuItemClick}
                    className="block px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    Snacks & Branded Foods
                  </Link>
                  <div className="border-t border-primary/10 my-2" />
                  <Link
                    to="/personal-care"
                    onClick={handleMenuItemClick}
                    className="block px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    Personal Care
                  </Link>
                  <Link
                    to="/home-care"
                    onClick={handleMenuItemClick}
                    className="block px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    Home Care
                  </Link>
                  <Link
                    to="/baby-care"
                    onClick={handleMenuItemClick}
                    className="block px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    Baby Care
                  </Link>
                </CollapsibleContent>
              </Collapsible>

              <Link
                to="/csa"
                onClick={handleMenuItemClick}
                className="block px-4 py-3 text-primary hover:bg-primary/5 rounded-lg transition-colors font-paragraph"
              >
                CSA
              </Link>

              <Link
                to="/sustainability"
                onClick={handleMenuItemClick}
                className="block px-4 py-3 text-primary hover:bg-primary/5 rounded-lg transition-colors font-paragraph"
              >
                Sustainability
              </Link>

              <Link
                to="/impact"
                onClick={handleMenuItemClick}
                className="block px-4 py-3 text-primary hover:bg-primary/5 rounded-lg transition-colors font-paragraph"
              >
                Impact
              </Link>

              <Link
                to="/blog"
                onClick={handleMenuItemClick}
                className="block px-4 py-3 text-primary hover:bg-primary/5 rounded-lg transition-colors font-paragraph"
              >
                Blog
              </Link>

              {/* More Submenu */}
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <button className="w-full flex items-center justify-between px-4 py-3 text-primary hover:bg-primary/5 rounded-lg transition-colors font-paragraph">
                    <span>More</span>
                    <ChevronDown className="h-4 w-4 transition-transform" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pl-4 mt-1">
                  <Link
                    to="/testimonials"
                    onClick={handleMenuItemClick}
                    className="block px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    Reviews
                  </Link>
                  <Link
                    to="/contact"
                    onClick={handleMenuItemClick}
                    className="block px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    Contact
                  </Link>
                  <div className="border-t border-primary/10 my-2" />
                  <Link
                    to="/recipes"
                    onClick={handleMenuItemClick}
                    className="block px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    Recipes
                  </Link>
                  <Link
                    to="/nutrition"
                    onClick={handleMenuItemClick}
                    className="block px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    Nutrition Info
                  </Link>
                  <Link
                    to="/education"
                    onClick={handleMenuItemClick}
                    className="block px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    Educational Hub
                  </Link>
                  <div className="border-t border-primary/10 my-2" />
                  <Link
                    to="/farmers"
                    onClick={handleMenuItemClick}
                    className="block px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    Farmer Stories
                  </Link>
                  <Link
                    to="/certifications"
                    onClick={handleMenuItemClick}
                    className="block px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    Certifications
                  </Link>
                  <Link
                    to="/community"
                    onClick={handleMenuItemClick}
                    className="block px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    Community Forum
                  </Link>
                  <Link
                    to="/loyalty"
                    onClick={handleMenuItemClick}
                    className="block px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    Loyalty Program
                  </Link>
                  <Link
                    to="/subscriptions"
                    onClick={handleMenuItemClick}
                    className="block px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    Subscriptions
                  </Link>
                </CollapsibleContent>
              </Collapsible>

              {/* Divider */}
              <div className="border-t border-primary/10 my-4" />

              {/* Auth Section */}
              {isAuthenticated && userRole ? (
                <div className="space-y-2">
                  <Link
                    to={`/dashboard/${userRole}`}
                    onClick={handleMenuItemClick}
                    className="block px-4 py-3 text-primary hover:bg-primary/5 rounded-lg transition-colors font-paragraph border border-primary/20"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogoutClick}
                    className="w-full px-4 py-3 text-primary hover:bg-primary/5 rounded-lg transition-colors font-paragraph text-left"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={handleMenuItemClick}
                  className="block px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-paragraph text-center"
                >
                  Sign In
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
