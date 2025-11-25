import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Package, Truck, CheckCircle, AlertCircle, Clock } from 'lucide-react';
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

interface FarmerOrder {
  _id: string;
  orderId: string;
  farmerId: string;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'packed' | 'shipped' | 'delivered';
  createdDate: Date | string;
  confirmedDate?: Date | string;
  shippedDate?: Date | string;
  deliveredDate?: Date | string;
  notes?: string;
}

export default function FarmerOrderFulfillmentPage() {
  const { member } = useMember();
  const [farmerOrders, setFarmerOrders] = useState<FarmerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<FarmerOrder | null>(null);
  const [actionNotes, setActionNotes] = useState('');
  const [actionType, setActionType] = useState<'confirm' | 'pack' | 'ship' | null>(null);

  useEffect(() => {
    fetchOrders();
  }, [member?.loginEmail]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Load farmer orders from localStorage
      const savedOrders = localStorage.getItem(`farmer-orders-${member?.loginEmail}`);
      if (savedOrders) {
        setFarmerOrders(JSON.parse(savedOrders));
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOrder = () => {
    if (!selectedOrder) return;

    const updatedOrder: FarmerOrder = {
      ...selectedOrder,
      status: 'confirmed',
      confirmedDate: new Date(),
      notes: actionNotes,
    };

    updateOrder(updatedOrder);
  };

  const handlePackOrder = () => {
    if (!selectedOrder) return;

    const updatedOrder: FarmerOrder = {
      ...selectedOrder,
      status: 'packed',
      notes: actionNotes,
    };

    updateOrder(updatedOrder);
  };

  const handleShipOrder = () => {
    if (!selectedOrder) return;

    const updatedOrder: FarmerOrder = {
      ...selectedOrder,
      status: 'shipped',
      shippedDate: new Date(),
      notes: actionNotes,
    };

    updateOrder(updatedOrder);
  };

  const updateOrder = (updatedOrder: FarmerOrder) => {
    const updatedOrders = farmerOrders.map(o => o._id === updatedOrder._id ? updatedOrder : o);
    setFarmerOrders(updatedOrders);
    localStorage.setItem(`farmer-orders-${member?.loginEmail}`, JSON.stringify(updatedOrders));

    setSelectedOrder(null);
    setActionNotes('');
    setActionType(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-terracotta" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-primary" />;
      case 'packed':
        return <Package className="h-5 w-5 text-secondary" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-secondary" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-secondary" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-terracotta text-white">Pending Confirmation</Badge>;
      case 'confirmed':
        return <Badge className="bg-primary text-white">Confirmed</Badge>;
      case 'packed':
        return <Badge className="bg-secondary text-white">Packed</Badge>;
      case 'shipped':
        return <Badge className="bg-secondary text-white">Shipped</Badge>;
      case 'delivered':
        return <Badge className="bg-secondary text-white">Delivered</Badge>;
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

  const pendingOrders = farmerOrders.filter(o => o.status === 'pending');
  const confirmedOrders = farmerOrders.filter(o => o.status === 'confirmed');
  const packedOrders = farmerOrders.filter(o => o.status === 'packed');
  const shippedOrders = farmerOrders.filter(o => o.status === 'shipped');
  const deliveredOrders = farmerOrders.filter(o => o.status === 'delivered');

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
          <h1 className="text-4xl font-heading font-bold text-primary mb-2">Order Fulfillment</h1>
          <p className="text-primary/70 font-paragraph">Manage and fulfill customer orders</p>
        </div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="border-terracotta/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-paragraph text-terracotta/70">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-terracotta">{pendingOrders.length}</div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-paragraph text-primary/70">Confirmed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{confirmedOrders.length}</div>
            </CardContent>
          </Card>

          <Card className="border-secondary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-paragraph text-secondary/70">Packed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{packedOrders.length}</div>
            </CardContent>
          </Card>

          <Card className="border-secondary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-paragraph text-secondary/70">Shipped</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{shippedOrders.length}</div>
            </CardContent>
          </Card>

          <Card className="border-secondary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-paragraph text-secondary/70">Delivered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{deliveredOrders.length}</div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="pending" className="font-paragraph text-xs sm:text-sm">
              Pending ({pendingOrders.length})
            </TabsTrigger>
            <TabsTrigger value="confirmed" className="font-paragraph text-xs sm:text-sm">
              Confirmed ({confirmedOrders.length})
            </TabsTrigger>
            <TabsTrigger value="packed" className="font-paragraph text-xs sm:text-sm">
              Packed ({packedOrders.length})
            </TabsTrigger>
            <TabsTrigger value="shipped" className="font-paragraph text-xs sm:text-sm">
              Shipped ({shippedOrders.length})
            </TabsTrigger>
            <TabsTrigger value="delivered" className="font-paragraph text-xs sm:text-sm">
              Delivered ({deliveredOrders.length})
            </TabsTrigger>
          </TabsList>

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
                    <Card className="border-terracotta/20 hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-heading font-semibold text-primary">
                                Order #{order.orderId.slice(0, 8).toUpperCase()}
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
                            <p className="text-xs text-primary/60 font-paragraph uppercase">Total</p>
                            <p className="text-2xl font-bold text-secondary">
                              {formatINR(order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0))}
                            </p>
                          </div>
                          <Dialog open={actionType === 'confirm' && selectedOrder?._id === order._id} onOpenChange={(open) => {
                            if (!open) {
                              setActionType(null);
                              setActionNotes('');
                              setSelectedOrder(null);
                            }
                          }}>
                            <Button
                              className="bg-primary hover:bg-primary/90"
                              onClick={() => {
                                setSelectedOrder(order);
                                setActionType('confirm');
                              }}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Confirm Order
                            </Button>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="font-heading text-primary">Confirm Order</DialogTitle>
                                <DialogDescription className="font-paragraph">
                                  Confirm that you can fulfill this order
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-paragraph text-primary">Notes (Optional)</label>
                                  <Textarea
                                    value={actionNotes}
                                    onChange={(e) => setActionNotes(e.target.value)}
                                    placeholder="Add any notes for the customer..."
                                    className="border-primary/20 focus:border-primary"
                                    rows={4}
                                  />
                                </div>
                                <div className="flex gap-2 justify-end">
                                  <Button
                                    variant="outline"
                                    className="border-primary/20"
                                    onClick={() => {
                                      setActionType(null);
                                      setActionNotes('');
                                      setSelectedOrder(null);
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    className="bg-primary hover:bg-primary/90"
                                    onClick={handleConfirmOrder}
                                  >
                                    Confirm Order
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Confirmed Orders */}
          <TabsContent value="confirmed" className="space-y-4">
            {confirmedOrders.length === 0 ? (
              <motion.div variants={itemVariants}>
                <Card className="border-primary/20">
                  <CardContent className="py-12 text-center">
                    <AlertCircle className="h-12 w-12 text-primary/30 mx-auto mb-4" />
                    <p className="text-primary/60 font-paragraph">No confirmed orders</p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {confirmedOrders.map((order) => (
                  <motion.div key={order._id} variants={itemVariants}>
                    <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-heading font-semibold text-primary">
                                Order #{order.orderId.slice(0, 8).toUpperCase()}
                              </h3>
                              {getStatusBadge(order.status)}
                            </div>
                            <p className="text-sm text-primary/60 font-paragraph">
                              Confirmed on {order.confirmedDate ? new Date(order.confirmedDate).toLocaleDateString() : 'N/A'}
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
                            <p className="text-xs text-primary/60 font-paragraph uppercase">Total</p>
                            <p className="text-2xl font-bold text-secondary">
                              {formatINR(order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0))}
                            </p>
                          </div>
                          <Dialog open={actionType === 'pack' && selectedOrder?._id === order._id} onOpenChange={(open) => {
                            if (!open) {
                              setActionType(null);
                              setActionNotes('');
                              setSelectedOrder(null);
                            }
                          }}>
                            <Button
                              className="bg-secondary hover:bg-secondary/90"
                              onClick={() => {
                                setSelectedOrder(order);
                                setActionType('pack');
                              }}
                            >
                              <Package className="h-4 w-4 mr-2" />
                              Mark as Packed
                            </Button>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="font-heading text-secondary">Mark as Packed</DialogTitle>
                                <DialogDescription className="font-paragraph">
                                  Confirm that the order has been packed
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-paragraph text-primary">Notes (Optional)</label>
                                  <Textarea
                                    value={actionNotes}
                                    onChange={(e) => setActionNotes(e.target.value)}
                                    placeholder="Add any notes..."
                                    className="border-primary/20 focus:border-primary"
                                    rows={4}
                                  />
                                </div>
                                <div className="flex gap-2 justify-end">
                                  <Button
                                    variant="outline"
                                    className="border-primary/20"
                                    onClick={() => {
                                      setActionType(null);
                                      setActionNotes('');
                                      setSelectedOrder(null);
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    className="bg-secondary hover:bg-secondary/90"
                                    onClick={handlePackOrder}
                                  >
                                    Mark as Packed
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Packed Orders */}
          <TabsContent value="packed" className="space-y-4">
            {packedOrders.length === 0 ? (
              <motion.div variants={itemVariants}>
                <Card className="border-primary/20">
                  <CardContent className="py-12 text-center">
                    <AlertCircle className="h-12 w-12 text-primary/30 mx-auto mb-4" />
                    <p className="text-primary/60 font-paragraph">No packed orders</p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {packedOrders.map((order) => (
                  <motion.div key={order._id} variants={itemVariants}>
                    <Card className="border-secondary/20 hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-heading font-semibold text-primary">
                                Order #{order.orderId.slice(0, 8).toUpperCase()}
                              </h3>
                              {getStatusBadge(order.status)}
                            </div>
                            <p className="text-sm text-primary/60 font-paragraph">
                              Ready to ship
                            </p>
                          </div>
                          {getStatusIcon(order.status)}
                        </div>

                        <div className="border-t border-primary/10 pt-4 flex justify-between items-center">
                          <div>
                            <p className="text-xs text-primary/60 font-paragraph uppercase">Total</p>
                            <p className="text-2xl font-bold text-secondary">
                              {formatINR(order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0))}
                            </p>
                          </div>
                          <Dialog open={actionType === 'ship' && selectedOrder?._id === order._id} onOpenChange={(open) => {
                            if (!open) {
                              setActionType(null);
                              setActionNotes('');
                              setSelectedOrder(null);
                            }
                          }}>
                            <Button
                              className="bg-secondary hover:bg-secondary/90"
                              onClick={() => {
                                setSelectedOrder(order);
                                setActionType('ship');
                              }}
                            >
                              <Truck className="h-4 w-4 mr-2" />
                              Mark as Shipped
                            </Button>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="font-heading text-secondary">Mark as Shipped</DialogTitle>
                                <DialogDescription className="font-paragraph">
                                  Confirm that the order has been shipped
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-paragraph text-primary">Tracking Number (Optional)</label>
                                  <input
                                    type="text"
                                    value={actionNotes}
                                    onChange={(e) => setActionNotes(e.target.value)}
                                    placeholder="Enter tracking number..."
                                    className="w-full px-3 py-2 border border-primary/20 rounded-md focus:border-primary focus:outline-none"
                                  />
                                </div>
                                <div className="flex gap-2 justify-end">
                                  <Button
                                    variant="outline"
                                    className="border-primary/20"
                                    onClick={() => {
                                      setActionType(null);
                                      setActionNotes('');
                                      setSelectedOrder(null);
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    className="bg-secondary hover:bg-secondary/90"
                                    onClick={handleShipOrder}
                                  >
                                    Mark as Shipped
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Shipped Orders */}
          <TabsContent value="shipped" className="space-y-4">
            {shippedOrders.length === 0 ? (
              <motion.div variants={itemVariants}>
                <Card className="border-primary/20">
                  <CardContent className="py-12 text-center">
                    <AlertCircle className="h-12 w-12 text-primary/30 mx-auto mb-4" />
                    <p className="text-primary/60 font-paragraph">No shipped orders</p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {shippedOrders.map((order) => (
                  <motion.div key={order._id} variants={itemVariants}>
                    <Card className="border-secondary/20">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-heading font-semibold text-primary">
                              Order #{order.orderId.slice(0, 8).toUpperCase()}
                            </h3>
                            <p className="text-sm text-primary/60 font-paragraph">
                              Shipped on {order.shippedDate ? new Date(order.shippedDate).toLocaleDateString() : 'N/A'}
                            </p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-2xl font-bold text-secondary">
                          {formatINR(order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0))}
                        </p>
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
                              Order #{order.orderId.slice(0, 8).toUpperCase()}
                            </h3>
                            <p className="text-sm text-primary/60 font-paragraph">
                              Delivered on {order.deliveredDate ? new Date(order.deliveredDate).toLocaleDateString() : 'N/A'}
                            </p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-2xl font-bold text-secondary">
                          {formatINR(order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0))}
                        </p>
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
