import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Package, DollarSign, ShoppingCart, AlertCircle } from 'lucide-react';
import { formatINR } from '@/lib/currency';

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalFarmers: number;
  totalProducts: number;
  averageOrderValue: number;
  conversionRate: number;
  topProducts: Array<{ name: string; sales: number; revenue: number }>;
  revenueByMonth: Array<{ month: string; revenue: number }>;
  orderStatus: Array<{ status: string; count: number }>;
  farmerPerformance: Array<{ name: string; orders: number; revenue: number }>;
}

export default function AdminAnalyticsDashboardPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalFarmers: 0,
    totalProducts: 0,
    averageOrderValue: 0,
    conversionRate: 0,
    topProducts: [],
    revenueByMonth: [],
    orderStatus: [],
    farmerPerformance: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // Simulate fetching analytics data
      // In a real app, this would come from your backend
      const mockData: AnalyticsData = {
        totalRevenue: 125000,
        totalOrders: 342,
        totalCustomers: 156,
        totalFarmers: 12,
        totalProducts: 48,
        averageOrderValue: 365,
        conversionRate: 3.2,
        topProducts: [
          { name: 'Organic Tomatoes', sales: 145, revenue: 21750 },
          { name: 'Fresh Spinach', sales: 128, revenue: 19200 },
          { name: 'Carrots', sales: 112, revenue: 16800 },
          { name: 'Bell Peppers', sales: 98, revenue: 14700 },
          { name: 'Lettuce', sales: 87, revenue: 13050 },
        ],
        revenueByMonth: [
          { month: 'Jan', revenue: 15000 },
          { month: 'Feb', revenue: 18000 },
          { month: 'Mar', revenue: 22000 },
          { month: 'Apr', revenue: 19000 },
          { month: 'May', revenue: 25000 },
          { month: 'Jun', revenue: 26000 },
        ],
        orderStatus: [
          { status: 'Delivered', count: 285 },
          { status: 'Shipped', count: 38 },
          { status: 'Confirmed', count: 15 },
          { status: 'Pending', count: 4 },
        ],
        farmerPerformance: [
          { name: 'Green Valley Farm', orders: 45, revenue: 18500 },
          { name: 'Organic Harvest', orders: 38, revenue: 15200 },
          { name: 'Fresh Fields', orders: 32, revenue: 12800 },
          { name: 'Sustainable Crops', orders: 28, revenue: 11200 },
          { name: 'Nature\'s Best', orders: 24, revenue: 9600 },
        ],
      };

      setAnalytics(mockData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
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

  const COLORS = ['#4B8B3A', '#B45A35', '#1F5A3A', '#F3EAD8'];

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-primary font-paragraph">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-primary mb-2">Analytics Dashboard</h1>
          <p className="text-primary/70 font-paragraph">Platform performance and insights</p>
        </div>

        {/* Key Metrics */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-paragraph text-primary/70 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{formatINR(analytics.totalRevenue)}</div>
              <p className="text-xs text-primary/60 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-paragraph text-secondary/70 flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{analytics.totalOrders}</div>
              <p className="text-xs text-secondary/60 mt-1">Completed orders</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-paragraph text-primary/70 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{analytics.totalCustomers}</div>
              <p className="text-xs text-primary/60 mt-1">Active users</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-paragraph text-secondary/70 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Farmers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{analytics.totalFarmers}</div>
              <p className="text-xs text-secondary/60 mt-1">Sellers</p>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="font-paragraph">Overview</TabsTrigger>
            <TabsTrigger value="products" className="font-paragraph">Products</TabsTrigger>
            <TabsTrigger value="farmers" className="font-paragraph">Farmers</TabsTrigger>
            <TabsTrigger value="orders" className="font-paragraph">Orders</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">Revenue Trend</CardTitle>
                  <CardDescription className="font-paragraph">Monthly revenue over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analytics.revenueByMonth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1F5A3A20" />
                      <XAxis dataKey="month" stroke="#1F5A3A" />
                      <YAxis stroke="#1F5A3A" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#F3EAD8',
                          border: '1px solid #1F5A3A',
                          borderRadius: '8px',
                        }}
                        formatter={(value) => formatINR(value as number)}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#4B8B3A"
                        strokeWidth={2}
                        dot={{ fill: '#4B8B3A', r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">Order Status Distribution</CardTitle>
                  <CardDescription className="font-paragraph">Current order statuses</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analytics.orderStatus}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, count }) => `${name}: ${count}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {analytics.orderStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} orders`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">Top Selling Products</CardTitle>
                  <CardDescription className="font-paragraph">Best performing products</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.topProducts}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1F5A3A20" />
                      <XAxis dataKey="name" stroke="#1F5A3A" angle={-45} textAnchor="end" height={80} />
                      <YAxis stroke="#1F5A3A" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#F3EAD8',
                          border: '1px solid #1F5A3A',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                      <Bar dataKey="sales" fill="#4B8B3A" name="Units Sold" />
                      <Bar dataKey="revenue" fill="#B45A35" name="Revenue (₹)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">Total Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-primary mb-2">{analytics.totalProducts}</div>
                  <p className="text-sm text-primary/60 font-paragraph">Active listings</p>
                </CardContent>
              </Card>

              <Card className="border-secondary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-secondary">Average Order Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-secondary mb-2">{formatINR(analytics.averageOrderValue)}</div>
                  <p className="text-sm text-secondary/60 font-paragraph">Per transaction</p>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Farmers Tab */}
          <TabsContent value="farmers" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">Top Performing Farmers</CardTitle>
                  <CardDescription className="font-paragraph">Farmers by revenue and orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.farmerPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1F5A3A20" />
                      <XAxis dataKey="name" stroke="#1F5A3A" angle={-45} textAnchor="end" height={80} />
                      <YAxis stroke="#1F5A3A" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#F3EAD8',
                          border: '1px solid #1F5A3A',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                      <Bar dataKey="orders" fill="#4B8B3A" name="Orders" />
                      <Bar dataKey="revenue" fill="#B45A35" name="Revenue (₹)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">Farmer Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.farmerPerformance.map((farmer, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                        <div>
                          <p className="font-heading font-semibold text-primary">{farmer.name}</p>
                          <p className="text-sm text-primary/60 font-paragraph">{farmer.orders} orders</p>
                        </div>
                        <div className="text-right">
                          <p className="font-heading font-semibold text-secondary">{formatINR(farmer.revenue)}</p>
                          <Badge className="bg-secondary text-white mt-1">Active</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-primary mb-2">{analytics.conversionRate}%</div>
                  <p className="text-sm text-primary/60 font-paragraph">Visitors to customers</p>
                </CardContent>
              </Card>

              <Card className="border-secondary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-secondary">Avg Order Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-secondary mb-2">{formatINR(analytics.averageOrderValue)}</div>
                  <p className="text-sm text-secondary/60 font-paragraph">Per transaction</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">Order Status Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.orderStatus.map((status, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                          ></div>
                          <span className="font-paragraph text-primary">{status.status}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-heading font-semibold text-primary">{status.count}</p>
                          <p className="text-xs text-primary/60 font-paragraph">
                            {((status.count / analytics.totalOrders) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
