import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Truck, Settings } from 'lucide-react';
import { useMember } from '@/integrations';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';

function CustomerDashboardContent() {
  const { member } = useMember();

  const stats = [
    {
      icon: ShoppingBag,
      label: 'Total Orders',
      value: '12',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: Heart,
      label: 'Wishlist Items',
      value: '8',
      color: 'bg-red-50 text-red-600',
    },
    {
      icon: Truck,
      label: 'In Transit',
      value: '2',
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: Settings,
      label: 'Account',
      value: 'Active',
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-organic-green-lighter to-white py-12 sm:py-16">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-dark-gray mb-2">
              Welcome, {member?.profile?.nickname || 'Customer'}!
            </h1>
            <p className="text-lg text-dark-gray opacity-90">
              Manage your orders, wishlist, and account settings
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-border-gray rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon size={24} />
                </div>
                <p className="text-sm text-dark-gray opacity-75 mb-1">{stat.label}</p>
                <p className="font-heading text-3xl font-bold text-dark-gray">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Recent Orders */}
      <section className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-2xl font-bold text-dark-gray mb-6">Recent Orders</h2>

          <div className="bg-white border border-border-gray rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-light-gray border-b border-border-gray">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-dark-gray">Order ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-dark-gray">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-dark-gray">Total</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-dark-gray">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: '#ORD-001', date: 'Jan 15, 2024', total: '$45.99', status: 'Delivered' },
                    { id: '#ORD-002', date: 'Jan 10, 2024', total: '$32.50', status: 'In Transit' },
                    { id: '#ORD-003', date: 'Jan 05, 2024', total: '$28.75', status: 'Delivered' },
                  ].map((order, index) => (
                    <tr key={index} className="border-b border-border-gray hover:bg-light-gray transition-colors">
                      <td className="px-6 py-4 text-sm text-dark-gray font-medium">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-dark-gray">{order.date}</td>
                      <td className="px-6 py-4 text-sm text-dark-gray font-semibold">{order.total}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Quick Actions */}
      <section className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-2xl font-bold text-dark-gray mb-6">Quick Actions</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-organic-green-light transition-colors">
              Continue Shopping
            </button>
            <button className="px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-organic-green-lighter transition-colors">
              View Wishlist
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default function CustomerDashboardPage() {
  return (
    <MemberProtectedRoute messageToSignIn="Sign in to access your customer dashboard">
      <CustomerDashboardContent />
    </MemberProtectedRoute>
  );
}
