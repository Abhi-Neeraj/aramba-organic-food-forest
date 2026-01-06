import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMember } from '@/integrations';
import { User, Sprout, BarChart3 } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { actions } = useMember();
  const [selectedRole, setSelectedRole] = useState<'customer' | 'farmer' | 'admin' | null>(null);

  const handleLogin = async (role: 'customer' | 'farmer' | 'admin') => {
    setSelectedRole(role);
    // Redirect to appropriate dashboard after login
    actions.login();
    // Note: In a real app, you'd store the role and redirect after successful login
    setTimeout(() => {
      navigate(`/dashboard/${role}`);
    }, 500);
  };

  const roles = [
    {
      id: 'customer',
      name: 'Customer',
      description: 'Shop organic products and manage your orders',
      icon: User,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
    },
    {
      id: 'farmer',
      name: 'Farmer',
      description: 'Manage your farm and sell directly to customers',
      icon: Sprout,
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
    },
    {
      id: 'admin',
      name: 'Admin',
      description: 'Manage the platform and monitor operations',
      icon: BarChart3,
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="bg-white min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-dark-gray mb-4">
            Welcome to ARAMBA
          </h1>
          <p className="text-lg text-dark-gray opacity-90">
            Choose your role to get started
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <motion.button
                key={role.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLogin(role.id as 'customer' | 'farmer' | 'admin')}
                disabled={selectedRole !== null && selectedRole !== role.id}
                className={`p-6 rounded-lg border-2 transition-all ${
                  selectedRole === role.id
                    ? `${role.color} border-current`
                    : `${role.color} hover:shadow-lg`
                } ${selectedRole !== null && selectedRole !== role.id ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className={`p-3 rounded-lg ${role.color}`}>
                    <Icon className={`${role.iconColor} w-8 h-8`} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-dark-gray">
                      {role.name}
                    </h3>
                    <p className="text-sm text-dark-gray opacity-75 mt-1">
                      {role.description}
                    </p>
                  </div>
                  <div className="text-primary font-medium text-sm mt-2">
                    {selectedRole === role.id ? 'Logging in...' : 'Select'}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-light-gray p-6 rounded-lg text-center"
        >
          <p className="text-dark-gray opacity-75">
            Don't have an account? You'll be able to create one after selecting your role.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
