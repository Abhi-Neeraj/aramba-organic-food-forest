import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, LogIn, Bell, Heart, ChevronDown } from 'lucide-react';
import { MiniCart } from '@/wix-verticals/react-pages/react-router/routes/root';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { useNotificationStore } from '@/stores/notificationStore';
import NotificationCenter from '@/components/NotificationCenter';
import MobileMenu from '@/components/MobileMenu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const { userRole, clearAuth, isAuthenticated } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleLogout = () => {
    clearAuth();
  };
  
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'm interested in your organic products. Can you help me?");
    window.open(`https://wa.me/918879543210?text=${message}`, '_blank');
  };



  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/10">
      <div className="max-w-[120rem] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-heading font-bold text-primary">
              ARAMBA
            </div>
            <div className="text-sm font-paragraph text-secondary hidden sm:inline">
              • Organic Food Forest
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link 
              to="/" 
              className="text-primary hover:text-secondary transition-colors font-paragraph"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-primary hover:text-secondary transition-colors font-paragraph"
            >
              About
            </Link>

            {/* Shop by Category Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-primary hover:text-secondary transition-colors font-paragraph flex items-center gap-1">
                  Shop <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/store" className="cursor-pointer">
                    All Products
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/fresh-fruits-vegetables" className="cursor-pointer">
                    Fresh Fruits & Vegetables
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/grocery-staples" className="cursor-pointer">
                    Grocery & Staples
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dairy-bakery" className="cursor-pointer">
                    Dairy & Bakery
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/beverages" className="cursor-pointer">
                    Beverages
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/snacks-branded-foods" className="cursor-pointer">
                    Snacks & Branded Foods
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/personal-care" className="cursor-pointer">
                    Personal Care
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/home-care" className="cursor-pointer">
                    Home Care
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/baby-care" className="cursor-pointer">
                    Baby Care
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link 
              to="/csa" 
              className="text-primary hover:text-secondary transition-colors font-paragraph"
            >
              CSA
            </Link>
            <Link 
              to="/sustainability" 
              className="text-primary hover:text-secondary transition-colors font-paragraph"
            >
              Sustainability
            </Link>
            <Link 
              to="/impact" 
              className="text-primary hover:text-secondary transition-colors font-paragraph"
            >
              Impact
            </Link>
            <Link 
              to="/blog" 
              className="text-primary hover:text-secondary transition-colors font-paragraph"
            >
              Blog
            </Link>

            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-primary hover:text-secondary transition-colors font-paragraph flex items-center gap-1">
                  More <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/testimonials" className="cursor-pointer">
                    Reviews
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/contact" className="cursor-pointer">
                    Contact
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/recipes" className="cursor-pointer">
                    Recipes
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/nutrition" className="cursor-pointer">
                    Nutrition Info
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/education" className="cursor-pointer">
                    Educational Hub
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/farmers" className="cursor-pointer">
                    Farmer Stories
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/certifications" className="cursor-pointer">
                    Certifications
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/community" className="cursor-pointer">
                    Community Forum
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/loyalty" className="cursor-pointer">
                    Loyalty Program
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/subscriptions" className="cursor-pointer">
                    Subscriptions
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
            {/* WhatsApp CTA */}
            <Button 
              onClick={handleWhatsAppClick}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              size="sm"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              <span className="hidden lg:inline">Chat</span>

            </Button>

            {/* Wishlist */}
            {isAuthenticated && (
              <Button asChild variant="ghost" size="sm" className="relative">
                <Link to="/wishlist">
                  <Heart className="h-5 w-5 text-secondary" />
                </Link>
              </Button>
            )}

            {/* Notifications */}
            {isAuthenticated && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="relative"
              >
                <Bell className="h-5 w-5 text-primary" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Button>
            )}

            {/* Auth Buttons */}
            {userRole ? (
              <div className="hidden sm:flex items-center space-x-2">
                <Button asChild variant="outline" size="sm" className="border-primary/20">
                  <Link to={`/dashboard/${userRole}`}>
                    Dashboard
                  </Link>
                </Button>
                <Button 
                  onClick={handleLogout}
                  variant="ghost" 
                  size="sm"
                  className="text-primary hover:bg-primary/5"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button asChild size="sm" className="hidden sm:flex bg-primary hover:bg-primary/90">
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}

            {/* Mini Cart */}
            <MiniCart />

            {/* Mobile Menu */}
            <MobileMenu 
              isAuthenticated={isAuthenticated}
              userRole={userRole}
              onLogout={handleLogout}
            />
          </div>

          {/* Notification Center */}
          <NotificationCenter isOpen={notificationOpen} onClose={() => setNotificationOpen(false)} />
        </div>


      </div>
    </header>
  );
}