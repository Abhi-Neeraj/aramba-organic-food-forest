import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMember } from '@/integrations';
import { useAuthStore } from '@/stores/authStore';
import { AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { actions } = useMember();
  const { setUserRole } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'customer' | 'farmer' | 'admin'>('customer');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create a unique member ID for this login session
      const mockMemberId = 'member-' + Date.now();
      
      // Set the user role BEFORE navigating
      // This ensures the auth state is available when the dashboard loads
      setUserRole(activeTab, mockMemberId, {
        _id: mockMemberId,
        roleType: activeTab,
        memberId: mockMemberId,
        isActive: true,
        assignmentDate: new Date().toISOString().split('T')[0],
        permissionsSummary: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} permissions`,
      });

      // Small delay to ensure state is updated before navigation
      await new Promise(resolve => setTimeout(resolve, 100));

      // Redirect to appropriate dashboard
      navigate(`/dashboard/${activeTab}`, { replace: true });
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
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
            <CardTitle className="text-2xl font-heading text-primary">Sign In</CardTitle>
            <CardDescription className="font-paragraph">
              Choose your role and sign in to your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="customer" className="font-paragraph">
                  Customer
                </TabsTrigger>
                <TabsTrigger value="farmer" className="font-paragraph">
                  Farmer
                </TabsTrigger>
                <TabsTrigger value="admin" className="font-paragraph">
                  Admin
                </TabsTrigger>
              </TabsList>

              {(['customer', 'farmer', 'admin'] as const).map((role) => (
                <TabsContent key={role} value={role} className="space-y-4">
                  {error && (
                    <motion.div
                      className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="h-4 w-4 text-destructive" />
                      <p className="text-sm text-destructive font-paragraph">{error}</p>
                    </motion.div>
                  )}

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-paragraph text-primary">Email</label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-paragraph text-primary">Password</label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph"
                    >
                      {loading ? 'Signing in...' : `Sign in as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
                    </Button>
                  </form>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-primary/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-background text-primary/60 font-paragraph">or</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-primary/20 text-primary hover:bg-primary/5 font-paragraph"
                    onClick={() => navigate(`/signup/${role}`)}
                  >
                    Create {role} account
                  </Button>

                  <p className="text-center text-sm text-primary/60 font-paragraph">
                    <Link to="/" className="text-secondary hover:underline">
                      Back to home
                    </Link>
                  </p>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-8 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
          <p className="text-xs text-primary/70 font-paragraph text-center">
            <strong>Demo Credentials:</strong> Use any email and password to test the login flow.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
