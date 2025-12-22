import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { SubscriptionPlans } from '@/entities';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { Check } from 'lucide-react';

export default function SubscriptionDashboardPage() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionPlans[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const { items } = await BaseCrudService.getAll<SubscriptionPlans>('subscriptions');
        setSubscriptions(items.filter((sub) => sub.isActive));
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const frequencyOrder = { weekly: 0, biweekly: 1, monthly: 2 };
  const sortedSubscriptions = [...subscriptions].sort(
    (a, b) =>
      (frequencyOrder[a.frequency?.toLowerCase() as keyof typeof frequencyOrder] ?? 999) -
      (frequencyOrder[b.frequency?.toLowerCase() as keyof typeof frequencyOrder] ?? 999)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-secondary to-primary py-16 px-6">
        <div className="max-w-[100rem] mx-auto">
          <h1 className="text-5xl font-heading font-bold text-primary-foreground mb-4">
            Subscription Plans
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            Choose the perfect plan for your organic food needs. Fresh, seasonal produce delivered to your door.
          </p>
        </div>
      </section>

      {/* Subscriptions Grid */}
      <section className="max-w-[100rem] mx-auto px-6 py-16">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedSubscriptions.map((subscription) => (
              <Card
                key={subscription._id}
                className="overflow-hidden flex flex-col hover:shadow-xl transition-shadow border-2 border-gray-200"
              >
                {/* Plan Image */}
                {subscription.image && (
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <Image
                      src={subscription.image}
                      alt={subscription.name || 'Plan'}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Plan Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-heading font-bold text-primary mb-2">
                    {subscription.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-6 flex-grow">
                    {subscription.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-primary">${subscription.price}</span>
                      <span className="text-gray-600 capitalize">
                        per {subscription.frequency}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  {subscription.items && (
                    <div className="mb-6 pb-6 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Includes:</p>
                      <p className="text-sm text-gray-600">{subscription.items}</p>
                    </div>
                  )}

                  {/* Benefits */}
                  {subscription.benefits && (
                    <div className="mb-6 space-y-2">
                      {subscription.benefits.split(',').map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{benefit.trim()}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-auto">
                    Subscribe Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 bg-secondary/10 rounded-lg p-8">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">Why Subscribe?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-primary mb-2">Fresh & Seasonal</h3>
              <p className="text-gray-700">
                Get the freshest organic produce picked at peak ripeness and delivered within 24 hours.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">Support Local Farmers</h3>
              <p className="text-gray-700">
                Your subscription directly supports our network of sustainable organic farmers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">Flexible & Convenient</h3>
              <p className="text-gray-700">
                Skip weeks, pause, or modify your subscription anytime. No long-term commitment required.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
