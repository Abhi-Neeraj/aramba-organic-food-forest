import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { DeliveryTracking } from '@/entities';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Thermometer, Clock, Search } from 'lucide-react';

export default function DeliveryTrackerPage() {
  const [deliveries, setDeliveries] = useState<DeliveryTracking[]>([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState<DeliveryTracking[]>([]);
  const [searchOrderId, setSearchOrderId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const { items } = await BaseCrudService.getAll<DeliveryTracking>('deliverytracking');
        setDeliveries(items);
        setFilteredDeliveries(items);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  useEffect(() => {
    if (searchOrderId.trim()) {
      const filtered = deliveries.filter((delivery) =>
        delivery.orderId?.toLowerCase().includes(searchOrderId.toLowerCase())
      );
      setFilteredDeliveries(filtered);
    } else {
      setFilteredDeliveries(deliveries);
    }
  }, [searchOrderId, deliveries]);

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in transit':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return '✓';
      case 'in transit':
        return '→';
      case 'pending':
        return '⏱';
      default:
        return '?';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-secondary to-primary py-16 px-6">
        <div className="max-w-[100rem] mx-auto">
          <h1 className="text-5xl font-heading font-bold text-primary-foreground mb-4">
            Track Your Delivery
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            Real-time tracking of your organic food delivery. Know exactly when your fresh produce will arrive.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="max-w-[100rem] mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">Find Your Order</h2>
          <div className="flex gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Enter your order ID..."
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value)}
                className="pl-12 py-3 text-base"
              />
            </div>
            <Button
              onClick={() => setSearchOrderId('')}
              variant="outline"
              className="px-6"
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Deliveries List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredDeliveries.length > 0 ? (
          <div className="space-y-6">
            {filteredDeliveries.map((delivery) => (
              <Card key={delivery._id} className="p-8 hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-heading font-bold text-primary">
                        Order #{delivery.orderId}
                      </h3>
                      <Badge className={`${getStatusColor(delivery.status)} text-sm font-semibold`}>
                        <span className="mr-2">{getStatusIcon(delivery.status)}</span>
                        {delivery.status}
                      </Badge>
                    </div>

                    {/* Status Timeline */}
                    <div className="space-y-4 mb-6">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-4 h-4 rounded-full bg-secondary"></div>
                          <div className="w-0.5 h-12 bg-gray-300"></div>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Order Confirmed</p>
                          <p className="text-sm text-gray-600">Your order has been received</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-4 h-4 rounded-full bg-secondary"></div>
                          <div className="w-0.5 h-12 bg-gray-300"></div>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Processing</p>
                          <p className="text-sm text-gray-600">Preparing your items</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-4 h-4 rounded-full ${
                              delivery.status?.toLowerCase() === 'in transit' ||
                              delivery.status?.toLowerCase() === 'delivered'
                                ? 'bg-secondary'
                                : 'bg-gray-300'
                            }`}
                          ></div>
                          <div className="w-0.5 h-12 bg-gray-300"></div>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">In Transit</p>
                          <p className="text-sm text-gray-600">On the way to you</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-4 h-4 rounded-full ${
                              delivery.status?.toLowerCase() === 'delivered'
                                ? 'bg-secondary'
                                : 'bg-gray-300'
                            }`}
                          ></div>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Delivered</p>
                          <p className="text-sm text-gray-600">At your doorstep</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Location */}
                    {delivery.currentLocation && (
                      <div className="flex gap-4">
                        <MapPin className="w-6 h-6 text-secondary flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-600">Current Location</p>
                          <p className="font-semibold text-gray-900">{delivery.currentLocation}</p>
                        </div>
                      </div>
                    )}

                    {/* Estimated Delivery */}
                    {delivery.estimatedDelivery && (
                      <div className="flex gap-4">
                        <Clock className="w-6 h-6 text-secondary flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-600">Estimated Delivery</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(delivery.estimatedDelivery).toLocaleDateString()} at{' '}
                            {new Date(delivery.estimatedDelivery).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Driver Info */}
                    {delivery.driverName && (
                      <div className="flex gap-4">
                        <div className="w-6 h-6 text-secondary flex-shrink-0 flex items-center justify-center">
                          👤
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Driver</p>
                          <p className="font-semibold text-gray-900">{delivery.driverName}</p>
                          {delivery.driverPhone && (
                            <a
                              href={`tel:${delivery.driverPhone}`}
                              className="text-secondary hover:text-secondary/80 text-sm flex items-center gap-2 mt-1"
                            >
                              <Phone className="w-4 h-4" />
                              {delivery.driverPhone}
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Temperature */}
                    {delivery.temperature !== undefined && (
                      <div className="flex gap-4">
                        <Thermometer className="w-6 h-6 text-secondary flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-600">Temperature</p>
                          <p className="font-semibold text-gray-900">{delivery.temperature}°C</p>
                        </div>
                      </div>
                    )}

                    {/* Last Update */}
                    {delivery.lastUpdate && (
                      <p className="text-xs text-gray-500 pt-4 border-t border-gray-200">
                        Last updated: {new Date(delivery.lastUpdate).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {searchOrderId ? 'No deliveries found for that order ID.' : 'No active deliveries.'}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
