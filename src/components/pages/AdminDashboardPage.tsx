import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';
import { useMember } from '@/integrations';
import { BarChart3, Users, Package, TrendingUp, LogOut, Settings } from 'lucide-react';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { userRole, memberId, clearAuth } = useAuthStore();
  const { member, actions } = useMember();

  useEffect(() => {
    // Check if user is authenticated and has admin role
    if (userRole === null) {
      // User not authenticated, redirect to login
      navigate('/login', { replace: true });
    } else if (userRole !== 'admin') {
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
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-heading font-bold text-primary mb-2">Admin Dashboard</h1>
            <p className="text-primary/70 font-paragraph">
              Welcome, {member?.profile?.nickname || 'Administrator'}!
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-primary/20 text-primary hover:bg-primary/5"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div variants={itemVariants}>
            <Card className="border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-paragraph text-primary/70">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">0</div>
                <p className="text-xs text-primary/60 mt-1">Registered members</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-secondary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-paragraph text-secondary/70">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">₹0</div>
                <p className="text-xs text-secondary/60 mt-1">All time</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-terracotta/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-paragraph text-terracotta/70">Active Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-terracotta">0</div>
                <p className="text-xs text-terracotta/60 mt-1">Listed for sale</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-paragraph text-primary/70">Farmers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">0</div>
                <p className="text-xs text-primary/60 mt-1">Active sellers</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Management */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div variants={itemVariants}>
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-primary flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Management
                  </CardTitle>
                  <CardDescription className="font-paragraph">
                    Manage users and their roles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start border-primary/20 text-primary hover:bg-primary/5">
                    View All Users
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-primary/20 text-primary hover:bg-primary/5">
                    Manage Farmers
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-primary/20 text-primary hover:bg-primary/5">
                    Manage Customers
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-primary flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Product Management
                  </CardTitle>
                  <CardDescription className="font-paragraph">
                    Manage all products and categories
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild variant="outline" className="w-full justify-start border-primary/20 text-primary hover:bg-primary/5">
                    <Link to="/admin/products">View All Products</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start border-primary/20 text-primary hover:bg-primary/5">
                    <Link to="/admin/products">Manage Categories</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start border-primary/20 text-primary hover:bg-primary/5">
                    <Link to="/admin/product-requests">Review Submissions</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-primary flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Analytics & Reports
                  </CardTitle>
                  <CardDescription className="font-paragraph">
                    View platform analytics and insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild variant="outline" className="w-full justify-start border-primary/20 text-primary hover:bg-primary/5">
                    <Link to="/admin/analytics">View Analytics</Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-primary/20 text-primary hover:bg-primary/5">
                    Sales Reports
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-primary/20 text-primary hover:bg-primary/5">
                    Revenue Analytics
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - System */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card className="border-primary/20 sticky top-20">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">System Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs text-primary/60 font-paragraph uppercase">Admin ID</p>
                    <p className="text-sm text-primary font-paragraph">{memberId?.slice(0, 12)}...</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary/60 font-paragraph uppercase">Email</p>
                    <p className="text-sm text-primary font-paragraph">{member?.loginEmail || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary/60 font-paragraph uppercase">Status</p>
                    <p className="text-sm text-secondary font-paragraph">Active</p>
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
                    <BarChart3 className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-primary hover:bg-primary/5">
                    System Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-primary hover:bg-primary/5">
                    Backup Data
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-primary hover:bg-primary/5">
                    View Logs
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-primary hover:bg-primary/5">
                    Support
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
