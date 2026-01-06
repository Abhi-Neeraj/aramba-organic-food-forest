import { motion } from 'framer-motion';
import { BarChart3, Users, Package, AlertCircle } from 'lucide-react';
import { useMember } from '@/integrations';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';

function AdminDashboardContent() {
  const { member } = useMember();

  const stats = [
    {
      icon: Users,
      label: 'Total Users',
      value: '1,234',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: Package,
      label: 'Total Products',
      value: '456',
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: BarChart3,
      label: 'Total Revenue',
      value: '$45,678',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      icon: AlertCircle,
      label: 'Pending Issues',
      value: '12',
      color: 'bg-red-50 text-red-600',
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
              Admin Dashboard
            </h1>
            <p className="text-lg text-dark-gray opacity-90">
              Platform overview and management
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

      {/* Recent Activity */}
      <section className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-2xl font-bold text-dark-gray mb-6">Recent Activity</h2>

          <div className="bg-white border border-border-gray rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-light-gray border-b border-border-gray">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-dark-gray">User</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-dark-gray">Action</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-dark-gray">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-dark-gray">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { user: 'John Doe', action: 'New Product Added', date: 'Jan 15, 2024', status: 'Success' },
                    { user: 'Jane Smith', action: 'Order Placed', date: 'Jan 14, 2024', status: 'Success' },
                    { user: 'Bob Johnson', action: 'Account Created', date: 'Jan 13, 2024', status: 'Success' },
                  ].map((activity, index) => (
                    <tr key={index} className="border-b border-border-gray hover:bg-light-gray transition-colors">
                      <td className="px-6 py-4 text-sm text-dark-gray font-medium">{activity.user}</td>
                      <td className="px-6 py-4 text-sm text-dark-gray">{activity.action}</td>
                      <td className="px-6 py-4 text-sm text-dark-gray">{activity.date}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          {activity.status}
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

      {/* Management Actions */}
      <section className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-2xl font-bold text-dark-gray mb-6">Management</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-organic-green-light transition-colors">
              Manage Users
            </button>
            <button className="px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-organic-green-lighter transition-colors">
              View Reports
            </button>
            <button className="px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-organic-green-lighter transition-colors">
              Manage Products
            </button>
            <button className="px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-organic-green-lighter transition-colors">
              System Settings
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <MemberProtectedRoute messageToSignIn="Sign in to access the admin dashboard">
      <AdminDashboardContent />
    </MemberProtectedRoute>
  );
}
