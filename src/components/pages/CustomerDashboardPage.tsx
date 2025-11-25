import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';
import { useMember } from '@/integrations';
import { ShoppingBag, Heart, Package, LogOut } from 'lucide-react';

export default function CustomerDashboardPage() {
  const navigate = useNavigate();
  const { userRole, memberId, clearAuth } = useAuthStore();
  const { member, actions } = useMember();

  useEffect(() => {
    // Check if user is authenticated and has customer role
    if (userRole === null) {
      // User not authenticated, redirect to login
      navigate('/login', { replace: true });
    } else if (userRole !== 'customer') {
      // User authenticated but wrong role, redirect to their dashboard
      navigate(`/dashboard/${userRole}`, { replace: true });
    }
  }, [userRole, navigate]);

  const handleLogout = async () => {
    clearAuth();
    await actions.logout();
    navigate('/');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-heading font-bold text-primary mb-2">Customer Dashboard</h1>
            <p className="text-primary/70 font-paragraph">
              Welcome, {member?.profile?.nickname || 'Customer'}!
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-primary/20 text-primary hover:bg-primary/5"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div variants={itemVariants}>
            <Card className="border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-paragraph text-primary/70">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">0</div>
                <p className="text-xs text-primary/60 mt-1">No orders yet</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-secondary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-paragraph text-secondary/70">Wishlist Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">0</div>
                <p className="text-xs text-secondary/60 mt-1">Save items for later</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-terracotta/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-paragraph text-terracotta/70">Account Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-terracotta">Active</div>
                <p className="text-xs text-terracotta/60 mt-1">Member ID: {memberId?.slice(0, 8)}...</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Actions */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div variants={itemVariants}>
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">Start Shopping</CardTitle>
                  <CardDescription className="font-paragraph">
                    Browse our organic products
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <Link to="/store">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Browse Products
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">Your Orders</CardTitle>
                  <CardDescription className="font-paragraph">
                    Track and manage your purchases
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <Link to="/customer/orders">
                      <Package className="h-4 w-4 mr-2" />
                      View All Orders
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">Wishlist</CardTitle>
                  <CardDescription className="font-paragraph">
                    Your saved items
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-primary/30 mx-auto mb-3" />
                    <p className="text-primary/60 font-paragraph mb-4">No items in wishlist</p>
                    <Button asChild variant="outline" className="border-primary/20">
                      <Link to="/store">Explore Products</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Profile */}
          <motion.div variants={itemVariants}>
            <Card className="border-primary/20 sticky top-20">
              <CardHeader>
                <CardTitle className="font-heading text-primary">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-primary/60 font-paragraph uppercase">Email</p>
                  <p className="text-sm text-primary font-paragraph">{member?.loginEmail || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-xs text-primary/60 font-paragraph uppercase">Name</p>
                  <p className="text-sm text-primary font-paragraph">
                    {member?.contact?.firstName || 'Not set'} {member?.contact?.lastName || ''}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-primary/60 font-paragraph uppercase">Member Since</p>
                  <p className="text-sm text-primary font-paragraph">
                    {member?._createdDate
                      ? new Date(member._createdDate).toLocaleDateString()
                      : 'Just now'}
                  </p>
                </div>
                <div className="pt-4 border-t border-primary/10">
                  <Button asChild variant="outline" className="w-full border-primary/20">
                    <Link to="/profile">Edit Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
