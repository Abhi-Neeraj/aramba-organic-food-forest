import { useState, useEffect } from 'react';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { LoyaltyProgram } from '@/entities';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gift, Star, TrendingUp, Zap } from 'lucide-react';

export default function LoyaltyProgramPage() {
  const { member, isAuthenticated } = useMember();
  const [memberLoyalty, setMemberLoyalty] = useState<LoyaltyProgram | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoyaltyData = async () => {
      try {
        if (isAuthenticated && member?.loginEmail) {
          const { items } = await BaseCrudService.getAll<LoyaltyProgram>('loyaltyprogram');
          const userLoyalty = items.find((lp) => lp.memberId === member.loginEmail);
          setMemberLoyalty(userLoyalty || null);
        }
      } catch (error) {
        console.error('Error fetching loyalty data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoyaltyData();
  }, [member, isAuthenticated]);

  const getTierColor = (tier?: string) => {
    switch (tier?.toLowerCase()) {
      case 'platinum':
        return 'from-purple-400 to-purple-600';
      case 'gold':
        return 'from-yellow-400 to-yellow-600';
      case 'silver':
        return 'from-gray-400 to-gray-600';
      case 'bronze':
        return 'from-orange-400 to-orange-600';
      default:
        return 'from-gray-300 to-gray-500';
    }
  };

  const getTierBenefits = (tier?: string) => {
    const benefits: Record<string, string[]> = {
      bronze: ['5% discount on all purchases', 'Free shipping on orders over $50', 'Early access to new products'],
      silver: ['10% discount on all purchases', 'Free shipping on all orders', 'Exclusive member events', 'Birthday bonus points'],
      gold: ['15% discount on all purchases', 'Free express shipping', 'Priority customer support', 'Double points on purchases', 'Exclusive product previews'],
      platinum: ['20% discount on all purchases', 'Free express shipping', 'VIP customer support', 'Triple points on purchases', 'Exclusive events & tastings', 'Personal shopping assistant'],
    };
    return benefits[tier?.toLowerCase() || 'bronze'] || benefits.bronze;
  };

  const tierThresholds = {
    bronze: 0,
    silver: 500,
    gold: 1500,
    platinum: 3000,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-primary to-secondary py-16 px-6">
        <div className="max-w-[100rem] mx-auto">
          <h1 className="text-5xl font-heading font-bold text-primary-foreground mb-4">
            ARAMBA Loyalty Program
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            Earn points on every purchase and unlock exclusive rewards, discounts, and member benefits.
          </p>
        </div>
      </section>

      <section className="max-w-[100rem] mx-auto px-6 py-16">
        {!isAuthenticated ? (
          // Not Logged In State
          <div className="text-center py-12">
            <Gift className="w-16 h-16 text-secondary mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              Sign In to Access Your Loyalty Account
            </h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              Join our loyalty program and start earning points on every purchase. Unlock exclusive rewards and member benefits.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
              Sign In to Your Account
            </Button>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : memberLoyalty ? (
          // Member Logged In with Loyalty Data
          <div className="space-y-8">
            {/* Current Tier Card */}
            <Card className={`bg-gradient-to-r ${getTierColor(memberLoyalty.tier)} text-white p-8`}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-sm opacity-90 mb-2">Current Tier</p>
                  <h2 className="text-4xl font-heading font-bold capitalize">
                    {memberLoyalty.tier || 'Bronze'}
                  </h2>
                </div>
                <Star className="w-12 h-12 opacity-80" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm opacity-90">Points Balance</p>
                  <p className="text-3xl font-bold">{memberLoyalty.pointsBalance || 0}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Total Spent</p>
                  <p className="text-3xl font-bold">${memberLoyalty.totalSpent || 0}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Member Since</p>
                  <p className="text-lg font-semibold">
                    {memberLoyalty.joinDate
                      ? new Date(memberLoyalty.joinDate).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Points Progress */}
            <Card className="p-8">
              <h3 className="text-2xl font-heading font-bold text-primary mb-6">Points Progress</h3>
              <div className="space-y-4">
                {Object.entries(tierThresholds).map(([tier, threshold]) => {
                  const isCurrentTier = memberLoyalty.tier?.toLowerCase() === tier.toLowerCase();
                  const nextTierThreshold = Object.entries(tierThresholds).find(
                    ([t]) => tierThresholds[t as keyof typeof tierThresholds] > threshold
                  )?.[1];
                  const progress = nextTierThreshold
                    ? Math.min(
                        100,
                        ((memberLoyalty.totalSpent || 0) / nextTierThreshold) * 100
                      )
                    : 100;

                  return (
                    <div key={tier}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold capitalize text-gray-900">
                          {tier} {isCurrentTier && '(Current)'}
                        </span>
                        <span className="text-sm text-gray-600">${threshold}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-secondary h-2 rounded-full transition-all"
                          style={{ width: `${isCurrentTier ? progress : 100}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Tier Benefits */}
            <Card className="p-8">
              <h3 className="text-2xl font-heading font-bold text-primary mb-6">
                {memberLoyalty.tier || 'Bronze'} Tier Benefits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getTierBenefits(memberLoyalty.tier).map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Last Redeem */}
            {memberLoyalty.lastRedeemDate && (
              <Card className="p-6 bg-blue-50 border border-blue-200">
                <p className="text-sm text-gray-600">
                  Last Redemption:{' '}
                  <span className="font-semibold">
                    {new Date(memberLoyalty.lastRedeemDate).toLocaleDateString()}
                  </span>
                </p>
              </Card>
            )}
          </div>
        ) : (
          // Member Logged In but No Loyalty Data
          <div className="text-center py-12">
            <Gift className="w-16 h-16 text-secondary mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              Welcome to the Loyalty Program!
            </h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              Your loyalty account is being set up. Make your first purchase to start earning points and unlock exclusive rewards.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
              Start Shopping
            </Button>
          </div>
        )}
      </section>

      {/* How It Works Section */}
      <section className="bg-secondary/10 py-16 px-6">
        <div className="max-w-[100rem] mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary mb-12 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-secondary text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-heading font-semibold text-primary mb-2">Shop</h3>
              <p className="text-gray-700 text-sm">
                Make purchases and earn 1 point per dollar spent
              </p>
            </div>
            <div className="text-center">
              <div className="bg-secondary text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-heading font-semibold text-primary mb-2">Earn</h3>
              <p className="text-gray-700 text-sm">
                Accumulate points and climb the tier ladder
              </p>
            </div>
            <div className="text-center">
              <div className="bg-secondary text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-heading font-semibold text-primary mb-2">Unlock</h3>
              <p className="text-gray-700 text-sm">
                Reach new tiers and unlock exclusive benefits
              </p>
            </div>
            <div className="text-center">
              <div className="bg-secondary text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-heading font-semibold text-primary mb-2">Redeem</h3>
              <p className="text-gray-700 text-sm">
                Use points for discounts and exclusive rewards
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
