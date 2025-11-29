import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { BaseCrudService } from '@/integrations';
import { DeliveryAgents } from '@/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Package, DollarSign, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function DeliveryAgentDashboardPage() {
  const { memberId } = useAuthStore();
  const [agent, setAgent] = useState<DeliveryAgents | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAgent = async () => {
      try {
        const { items } = await BaseCrudService.getAll<DeliveryAgents>('deliveryagents');
        // In a real app, you'd match by memberId
        const agentData = items[0];
        setAgent(agentData);
      } catch (error) {
        console.error('Error loading agent:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAgent();
  }, [memberId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-[120rem] mx-auto px-6 py-12">
          <h1 className="text-3xl font-heading font-semibold text-primary mb-6">Delivery Agent Dashboard</h1>
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <p className="text-primary">No agent profile found.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const statusColor = agent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[120rem] mx-auto px-6 py-12">
        <h1 className="text-3xl font-heading font-semibold text-primary mb-8">Delivery Agent Dashboard</h1>

        {/* Agent Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  {agent.profilePicture && (
                    <Image src={agent.profilePicture} alt={agent.name} className="w-16 h-16 rounded-full object-cover" />
                  )}
                  <div>
                    <CardTitle className="text-2xl text-primary">{agent.name}</CardTitle>
                    <p className="text-secondary font-paragraph">{agent.email}</p>
                  </div>
                </div>
                <Badge className={statusColor}>
                  {agent.status?.toUpperCase() || 'OFFLINE'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-secondary font-paragraph">Vehicle</p>
                    <p className="font-heading text-primary">{agent.vehicleType}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <Clock className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-secondary font-paragraph">Assigned Orders</p>
                    <p className="font-heading text-primary">{agent.assignedOrdersCount || 0}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-terracotta/10 p-3 rounded-lg">
                    <DollarSign className="h-5 w-5 text-terracotta" />
                  </div>
                  <div>
                    <p className="text-sm text-secondary font-paragraph">Total Earnings</p>
                    <p className="font-heading text-primary">₹{agent.earnings?.toFixed(2) || '0.00'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-primary">
                <MapPin className="h-5 w-5" />
                <span>Assigned Orders</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-secondary font-paragraph mb-4">View and manage your assigned deliveries</p>
              <Button className="w-full bg-primary hover:bg-primary/90">
                View Orders
              </Button>
            </CardContent>
          </Card>

          <Card className="border-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-secondary">
                <DollarSign className="h-5 w-5" />
                <span>Earnings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-secondary font-paragraph mb-4">Track your earnings and payouts</p>
              <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary/5">
                View Earnings
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Agent Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Agent Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-secondary font-paragraph">Phone</p>
                  <p className="font-heading text-primary">{agent.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary font-paragraph">Vehicle Plate</p>
                  <p className="font-heading text-primary">{agent.vehiclePlateNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
