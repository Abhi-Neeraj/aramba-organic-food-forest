import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';
import { useMember } from '@/integrations';
import { Leaf, TrendingUp, Package, Users, LogOut, Plus } from 'lucide-react';

export default function FarmerDashboardPage() {
  const navigate = useNavigate();
  const { userRole, memberId, clearAuth } = useAuthStore();
  const { member, actions } = useMember();

  useEffect(() => {
    if (userRole !== 'farmer') {
      navigate('/login');
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
            <h1 className="text-4xl font-heading font-bold text-primary mb-2">Farmer Dashboard</h1>
            <p className="text-primary/70 font-paragraph">
              Welcome, {member?.profile?.nickname || 'Farmer'}!
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div variants={itemVariants}>
            <Card className="border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-paragraph text-primary/70">Products Listed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">0</div>
                <p className="text-xs text-primary/60 mt-1">Active listings</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-secondary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-paragraph text-secondary/70">Total Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">₹0</div>
                <p className="text-xs text-secondary/60 mt-1">This month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-terracotta/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-paragraph text-terracotta/70">Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-terracotta">0</div>
                <p className="text-xs text-terracotta/60 mt-1">Pending fulfillment</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-paragraph text-primary/70">Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">—</div>
                <p className="text-xs text-primary/60 mt-1">No reviews yet</p>
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
                  <CardTitle className="font-heading text-primary">Request New Product</CardTitle>
                  <CardDescription className="font-paragraph">
                    Request to list your organic products for sale
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <Link to="/farmer/product-requests">
                      <Plus className="h-4 w-4 mr-2" />
                      Submit Product Request
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">Your Products</CardTitle>
                  <CardDescription className="font-paragraph">
                    Manage your listings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-primary/30 mx-auto mb-3" />
                    <p className="text-primary/60 font-paragraph mb-4">No products listed yet</p>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Product
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">Recent Orders</CardTitle>
                  <CardDescription className="font-paragraph">
                    Orders from customers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-primary/30 mx-auto mb-3" />
                    <p className="text-primary/60 font-paragraph">No orders yet</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Profile & Resources */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card className="border-primary/20 sticky top-20">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">Farm Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs text-primary/60 font-paragraph uppercase">Farm Name</p>
                    <p className="text-sm text-primary font-paragraph">Not set</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary/60 font-paragraph uppercase">Location</p>
                    <p className="text-sm text-primary font-paragraph">Not set</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary/60 font-paragraph uppercase">Specialty</p>
                    <p className="text-sm text-primary font-paragraph">Not set</p>
                  </div>
                  <div className="pt-4 border-t border-primary/10">
                    <Button asChild variant="outline" className="w-full border-primary/20">
                      <Link to="/profile">Edit Profile</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-secondary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-secondary flex items-center gap-2">
                    <Leaf className="h-5 w-5" />
                    Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-primary hover:bg-primary/5">
                    <Users className="h-4 w-4 mr-2" />
                    Farmer Community
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-primary hover:bg-primary/5">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Sales Tips
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-primary hover:bg-primary/5">
                    <Package className="h-4 w-4 mr-2" />
                    Shipping Guide
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
