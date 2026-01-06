import { motion } from 'framer-motion';
import { TrendingUp, Package, Users, DollarSign } from 'lucide-react';
import { useMember } from '@/integrations';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';

function FarmerDashboardContent() {
  const { member } = useMember();

  const stats = [
    {
      icon: TrendingUp,
      label: 'Total Sales',
      value: '$2,450',
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: Package,
      label: 'Products Listed',
      value: '24',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: Users,
      label: 'Active Customers',
      value: '156',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      icon: DollarSign,
      label: 'This Month',
      value: '$890',
      color: 'bg-yellow-50 text-yellow-600',
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
              Welcome, {member?.profile?.nickname || 'Farmer'}!
            </h1>
            <p className="text-lg text-dark-gray opacity-90">
              Manage your farm, products, and sales
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
                    <th className="px-6 py-3 text-left text-sm font-semibold text-dark-gray">Customer</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-dark-gray">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-dark-gray">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: '#ORD-101', customer: 'John Doe', amount: '$125.50', status: 'Pending' },
                    { id: '#ORD-102', customer: 'Jane Smith', amount: '$89.99', status: 'Shipped' },
                    { id: '#ORD-103', customer: 'Bob Johnson', amount: '$156.75', status: 'Delivered' },
                  ].map((order, index) => (
                    <tr key={index} className="border-b border-border-gray hover:bg-light-gray transition-colors">
                      <td className="px-6 py-4 text-sm text-dark-gray font-medium">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-dark-gray">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-dark-gray font-semibold">{order.amount}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'Shipped'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
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
              Add New Product
            </button>
            <button className="px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-organic-green-lighter transition-colors">
              View Analytics
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default function FarmerDashboardPage() {
  return (
    <MemberProtectedRoute messageToSignIn="Sign in to access your farmer dashboard">
      <FarmerDashboardContent />
    </MemberProtectedRoute>
  );
}
