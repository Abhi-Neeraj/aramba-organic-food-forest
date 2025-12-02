import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MessageCircle, LogIn, Bell, Heart } from 'lucide-react';
import { MiniCart } from '@/wix-verticals/react-pages/react-router/routes/root';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { useNotificationStore } from '@/stores/notificationStore';
import NotificationCenter from '@/components/NotificationCenter';

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
            <div className="text-sm font-paragraph text-secondary">
              • Organic Food Forest
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-primary hover:text-secondary transition-colors font-paragraph"
            >
              Home
            </Link>
            <Link 
              to="/store" 
              className="text-primary hover:text-secondary transition-colors font-paragraph"
            >
              Shop
            </Link>
            <Link 
              to="/blog" 
              className="text-primary hover:text-secondary transition-colors font-paragraph"
            >
              Blog
            </Link>
            <Link 
              to="/our-team" 
              className="text-primary hover:text-secondary transition-colors font-paragraph"
            >
              Our Team
            </Link>
            <Link 
              to="/policy" 
              className="text-primary hover:text-secondary transition-colors font-paragraph"
            >
              Policy
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Search className="h-5 w-5 text-primary" />
            </Button>

            {/* WhatsApp CTA */}
            <Button 
              onClick={handleWhatsAppClick}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              size="sm"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Chat</span>
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
              <div className="flex items-center space-x-2">
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
              <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}

            {/* Mini Cart */}
            <MiniCart />
          </div>

          {/* Notification Center */}
          <NotificationCenter isOpen={notificationOpen} onClose={() => setNotificationOpen(false)} />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <nav className="flex items-center justify-center space-x-6">
            <Link 
              to="/" 
              className="text-primary hover:text-secondary transition-colors font-paragraph text-sm"
            >
              Home
            </Link>
            <Link 
              to="/store" 
              className="text-primary hover:text-secondary transition-colors font-paragraph text-sm"
            >
              Shop
            </Link>
            <Link 
              to="/blog" 
              className="text-primary hover:text-secondary transition-colors font-paragraph text-sm"
            >
              Blog
            </Link>
            <Link 
              to="/our-team" 
              className="text-primary hover:text-secondary transition-colors font-paragraph text-sm"
            >
              Our Team
            </Link>
            <Link 
              to="/policy" 
              className="text-primary hover:text-secondary transition-colors font-paragraph text-sm"
            >
              Policy
            </Link>
            {!userRole && (
              <Link 
                to="/login" 
                className="text-primary hover:text-secondary transition-colors font-paragraph text-sm"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}