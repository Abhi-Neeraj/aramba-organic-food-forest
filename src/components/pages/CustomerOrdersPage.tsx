import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { formatINR } from '@/lib/currency';
import { useMember } from '@/integrations';

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  farmerId: string;
}

interface Order {
  _id: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdDate: Date | string;
  estimatedDelivery?: Date | string;
  notes?: string;
}

export default function CustomerOrdersPage() {
  const { member } = useMember();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [member?.loginEmail]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Load orders from localStorage
      const savedOrders = localStorage.getItem(`customer-orders-${member?.loginEmail}`);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-terracotta" />;
      case 'confirmed':
        return <Package className="h-5 w-5 text-primary" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-secondary" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-secondary" />;
      case 'cancelled':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-terracotta text-white">Pending</Badge>;
      case 'confirmed':
        return <Badge className="bg-primary text-white">Confirmed</Badge>;
      case 'shipped':
        return <Badge className="bg-secondary text-white">Shipped</Badge>;
      case 'delivered':
        return <Badge className="bg-secondary text-white">Delivered</Badge>;
      case 'cancelled':
        return <Badge className="bg-destructive text-white">Cancelled</Badge>;
      default:
        return null;
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-primary font-paragraph">Loading orders...</p>
        </div>
      </div>
    );
  }

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const activeOrders = orders.filter(o => ['confirmed', 'shipped'].includes(o.status));
  const deliveredOrders = orders.filter(o => o.status === 'delivered');
  const cancelledOrders = orders.filter(o => o.status === 'cancelled');

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-primary mb-2">My Orders</h1>
          <p className="text-primary/70 font-paragraph">Track and manage your orders</p>
        </div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-paragraph text-primary/70">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{orders.length}</div>
            </CardContent>
          </Card>

          <Card className="border-terracotta/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-paragraph text-terracotta/70">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-terracotta">{pendingOrders.length}</div>
            </CardContent>
          </Card>

          <Card className="border-secondary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-paragraph text-secondary/70">In Transit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{activeOrders.length}</div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-paragraph text-primary/70">Delivered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{deliveredOrders.length}</div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="all" className="font-paragraph text-xs sm:text-sm">
              All ({orders.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="font-paragraph text-xs sm:text-sm">
              Pending ({pendingOrders.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="font-paragraph text-xs sm:text-sm">
              In Transit ({activeOrders.length})
            </TabsTrigger>
            <TabsTrigger value="delivered" className="font-paragraph text-xs sm:text-sm">
              Delivered ({deliveredOrders.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="font-paragraph text-xs sm:text-sm">
              Cancelled ({cancelledOrders.length})
            </TabsTrigger>
          </TabsList>

          {/* All Orders */}
          <TabsContent value="all" className="space-y-4">
            {orders.length === 0 ? (
              <motion.div variants={itemVariants}>
                <Card className="border-primary/20">
                  <CardContent className="py-12 text-center">
                    <Package className="h-12 w-12 text-primary/30 mx-auto mb-4" />
                    <p className="text-primary/60 font-paragraph mb-4">No orders yet</p>
                    <Button asChild className="bg-primary hover:bg-primary/90">
                      <a href="/store">Start Shopping</a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <motion.div key={order._id} variants={itemVariants}>
                    <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-heading font-semibold text-primary">
                                Order #{order._id.slice(0, 8).toUpperCase()}
                              </h3>
                              {getStatusBadge(order.status)}
                            </div>
                            <p className="text-sm text-primary/60 font-paragraph">
                              Ordered on {new Date(order.createdDate).toLocaleDateString()}
                            </p>
                          </div>
                          {getStatusIcon(order.status)}
                        </div>

                        <div className="mb-4 space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span className="text-primary/70 font-paragraph">
                                {item.productName} x {item.quantity}
                              </span>
                              <span className="text-primary font-paragraph">
                                {formatINR(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-primary/10 pt-4 flex justify-between items-center">
                          <div>
                            <p className="text-xs text-primary/60 font-paragraph uppercase">Total Amount</p>
                            <p className="text-2xl font-bold text-secondary">{formatINR(order.totalAmount)}</p>
                          </div>
                          <Button variant="outline" className="border-primary/20">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Pending Orders */}
          <TabsContent value="pending" className="space-y-4">
            {pendingOrders.length === 0 ? (
              <motion.div variants={itemVariants}>
                <Card className="border-primary/20">
                  <CardContent className="py-12 text-center">
                    <AlertCircle className="h-12 w-12 text-primary/30 mx-auto mb-4" />
                    <p className="text-primary/60 font-paragraph">No pending orders</p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {pendingOrders.map((order) => (
                  <motion.div key={order._id} variants={itemVariants}>
                    <Card className="border-terracotta/20">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-heading font-semibold text-primary">
                              Order #{order._id.slice(0, 8).toUpperCase()}
                            </h3>
                            <p className="text-sm text-primary/60 font-paragraph">
                              Awaiting confirmation
                            </p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-2xl font-bold text-secondary">{formatINR(order.totalAmount)}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Active Orders */}
          <TabsContent value="active" className="space-y-4">
            {activeOrders.length === 0 ? (
              <motion.div variants={itemVariants}>
                <Card className="border-primary/20">
                  <CardContent className="py-12 text-center">
                    <AlertCircle className="h-12 w-12 text-primary/30 mx-auto mb-4" />
                    <p className="text-primary/60 font-paragraph">No orders in transit</p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {activeOrders.map((order) => (
                  <motion.div key={order._id} variants={itemVariants}>
                    <Card className="border-secondary/20">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-heading font-semibold text-primary">
                              Order #{order._id.slice(0, 8).toUpperCase()}
                            </h3>
                            {order.estimatedDelivery && (
                              <p className="text-sm text-primary/60 font-paragraph">
                                Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-2xl font-bold text-secondary">{formatINR(order.totalAmount)}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Delivered Orders */}
          <TabsContent value="delivered" className="space-y-4">
            {deliveredOrders.length === 0 ? (
              <motion.div variants={itemVariants}>
                <Card className="border-primary/20">
                  <CardContent className="py-12 text-center">
                    <AlertCircle className="h-12 w-12 text-primary/30 mx-auto mb-4" />
                    <p className="text-primary/60 font-paragraph">No delivered orders</p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {deliveredOrders.map((order) => (
                  <motion.div key={order._id} variants={itemVariants}>
                    <Card className="border-secondary/20">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-heading font-semibold text-primary">
                              Order #{order._id.slice(0, 8).toUpperCase()}
                            </h3>
                            <p className="text-sm text-primary/60 font-paragraph">
                              Delivered on {new Date(order.createdDate).toLocaleDateString()}
                            </p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-2xl font-bold text-secondary">{formatINR(order.totalAmount)}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Cancelled Orders */}
          <TabsContent value="cancelled" className="space-y-4">
            {cancelledOrders.length === 0 ? (
              <motion.div variants={itemVariants}>
                <Card className="border-primary/20">
                  <CardContent className="py-12 text-center">
                    <AlertCircle className="h-12 w-12 text-primary/30 mx-auto mb-4" />
                    <p className="text-primary/60 font-paragraph">No cancelled orders</p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {cancelledOrders.map((order) => (
                  <motion.div key={order._id} variants={itemVariants}>
                    <Card className="border-destructive/20">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-heading font-semibold text-primary">
                              Order #{order._id.slice(0, 8).toUpperCase()}
                            </h3>
                            <p className="text-sm text-primary/60 font-paragraph">
                              Cancelled on {new Date(order.createdDate).toLocaleDateString()}
                            </p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-2xl font-bold text-secondary">{formatINR(order.totalAmount)}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
