import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useAuthStore, type UserRole } from '@/stores/authStore';
import { BaseCrudService } from '@/integrations';
import { UserRoles } from '@/entities';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const { role: paramRole } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const { setUserRole } = useAuthStore();

  const role = (paramRole as UserRole) || 'customer';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    farmName: '',
    farmLocation: '',
    specialty: '',
    bio: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      // Create user role entry
      const memberId = 'member-' + Date.now();
      const userRoleData: UserRoles = {
        _id: crypto.randomUUID(),
        roleType: role,
        memberId,
        isActive: true,
        assignmentDate: new Date().toISOString().split('T')[0],
        permissionsSummary: `${role.charAt(0).toUpperCase() + role.slice(1)} permissions`,
      };

      await BaseCrudService.create('userroles', userRoleData);

      setUserRole(role, memberId, userRoleData);
      setSuccess(true);

      // Redirect after success
      setTimeout(() => {
        navigate(`/dashboard/${role}`);
      }, 1500);
    } catch (err) {
      setError('Signup failed. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
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

  const roleConfig = {
    customer: {
      title: 'Customer Sign Up',
      description: 'Create your account to shop organic products',
      fields: ['firstName', 'lastName', 'email', 'password', 'confirmPassword'],
    },
    farmer: {
      title: 'Farmer Sign Up',
      description: 'Register your farm and start selling organic products',
      fields: ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'farmName', 'farmLocation', 'specialty', 'bio'],
    },
    admin: {
      title: 'Admin Registration',
      description: 'Admin accounts are created by invitation only',
      fields: [],
    },
  };

  const config = roleConfig[role];

  if (role === 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <motion.div
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-heading text-primary">Admin Registration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-secondary/10 border border-secondary/20 rounded-lg">
                <p className="text-sm text-primary font-paragraph">
                  Admin accounts are created by invitation only. Please contact the site administrator for access.
                </p>
              </div>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link to="/login">Back to Login</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold text-primary mb-2">ARAMBA</h1>
          <p className="text-secondary font-paragraph">Organic Food Forest</p>
        </div>

        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-heading text-primary">{config.title}</CardTitle>
            <CardDescription className="font-paragraph">{config.description}</CardDescription>
          </CardHeader>

          <CardContent>
            {success && (
              <motion.div
                className="flex items-center gap-2 p-3 bg-secondary/10 border border-secondary/30 rounded-lg mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle className="h-4 w-4 text-secondary" />
                <p className="text-sm text-secondary font-paragraph">Account created successfully!</p>
              </motion.div>
            )}

            {error && (
              <motion.div
                className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="h-4 w-4 text-destructive" />
                <p className="text-sm text-destructive font-paragraph">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-paragraph text-primary">First Name</label>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-paragraph text-primary">Last Name</label>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-paragraph text-primary">Email</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-primary/20 focus:border-primary"
                />
              </div>

              {role === 'farmer' && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-paragraph text-primary">Farm Name</label>
                    <Input
                      type="text"
                      name="farmName"
                      placeholder="Your Farm Name"
                      value={formData.farmName}
                      onChange={handleChange}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-paragraph text-primary">Farm Location</label>
                    <Input
                      type="text"
                      name="farmLocation"
                      placeholder="City, State"
                      value={formData.farmLocation}
                      onChange={handleChange}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-paragraph text-primary">Specialty</label>
                    <Input
                      type="text"
                      name="specialty"
                      placeholder="e.g., Vegetables, Fruits, Dairy"
                      value={formData.specialty}
                      onChange={handleChange}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-paragraph text-primary">About Your Farm</label>
                    <Textarea
                      name="bio"
                      placeholder="Tell us about your farm..."
                      value={formData.bio}
                      onChange={handleChange}
                      className="border-primary/20 focus:border-primary resize-none"
                      rows={3}
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <label className="text-sm font-paragraph text-primary">Password</label>
                <Input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="border-primary/20 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-paragraph text-primary">Confirm Password</label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="border-primary/20 focus:border-primary"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <p className="text-center text-sm text-primary/60 font-paragraph mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-secondary hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
