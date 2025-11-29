import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  address: string;
  items: string;
  status: 'pending' | 'in-transit' | 'delivered';
  estimatedTime: string;
}

export default function DeliveryAgentOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customerName: 'Rajesh Kumar',
      customerPhone: '+91 98765 43210',
      address: '123 Main Street, Bangalore',
      items: 'Organic Vegetables (5kg)',
      status: 'pending',
      estimatedTime: '2:30 PM',
    },
    {
      id: 'ORD-002',
      customerName: 'Priya Singh',
      customerPhone: '+91 87654 32109',
      address: '456 Park Avenue, Bangalore',
      items: 'Fresh Fruits (3kg)',
      status: 'in-transit',
      estimatedTime: '3:15 PM',
    },
    {
      id: 'ORD-003',
      customerName: 'Amit Patel',
      customerPhone: '+91 76543 21098',
      address: '789 Oak Lane, Bangalore',
      items: 'Dairy Products',
      status: 'delivered',
      estimatedTime: 'Completed',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartDelivery = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'in-transit' } : order
    ));
  };

  const handleCompleteDelivery = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'delivered' } : order
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[120rem] mx-auto px-6 py-12">
        <h1 className="text-3xl font-heading font-semibold text-primary mb-8">Assigned Orders</h1>

        <div className="space-y-4">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-heading text-primary font-semibold">{order.id}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-heading text-primary font-semibold">{order.customerName}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => window.open(`tel:${order.customerPhone}`)}
                          >
                            <Phone className="h-4 w-4 text-secondary" />
                          </Button>
                        </div>

                        <div className="flex items-start space-x-2 text-secondary">
                          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span className="font-paragraph">{order.address}</span>
                        </div>

                        <p className="text-secondary font-paragraph">{order.items}</p>

                        <div className="flex items-center space-x-2 text-secondary">
                          <Clock className="h-4 w-4" />
                          <span className="font-paragraph">Est. {order.estimatedTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {order.status === 'pending' && (
                        <Button
                          onClick={() => handleStartDelivery(order.id)}
                          className="bg-secondary hover:bg-secondary/90"
                        >
                          Start Delivery
                        </Button>
                      )}
                      {order.status === 'in-transit' && (
                        <Button
                          onClick={() => handleCompleteDelivery(order.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Mark Delivered
                        </Button>
                      )}
                      {order.status === 'delivered' && (
                        <Button variant="outline" disabled>
                          Completed
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {orders.length === 0 && (
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <p className="text-center text-secondary font-paragraph">No orders assigned yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
