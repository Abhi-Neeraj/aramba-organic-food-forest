import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { BaseCrudService } from '@/integrations';
import { Products, ProductCategories } from '@/entities';
import { Plus, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { formatINR } from '@/lib/currency';
import { useMember } from '@/integrations';

interface ProductRequest {
  _id: string;
  farmerId: string;
  productName: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdDate: Date | string;
  notes?: string;
}

export default function FarmerProductRequestPage() {
  const { member } = useMember();
  const [requests, setRequests] = useState<ProductRequest[]>([]);
  const [categories, setCategories] = useState<ProductCategories[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    quantity: 0,
    price: 0,
    description: '',
  });

  useEffect(() => {
    fetchData();
  }, [member?.loginEmail]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const categoriesData = await BaseCrudService.getAll<ProductCategories>('productcategories');
      setCategories(categoriesData.items);
      
      // In a real app, fetch requests from a database collection
      // For now, load from localStorage
      const savedRequests = localStorage.getItem(`farmer-requests-${member?.loginEmail}`);
      if (savedRequests) {
        setRequests(JSON.parse(savedRequests));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitRequest = async () => {
    if (!formData.productName || !formData.category || !formData.quantity || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const newRequest: ProductRequest = {
        _id: crypto.randomUUID(),
        farmerId: member?.loginEmail || 'unknown',
        productName: formData.productName,
        category: formData.category,
        quantity: formData.quantity,
        price: formData.price,
        description: formData.description,
        status: 'pending',
        createdDate: new Date(),
      };

      const updatedRequests = [...requests, newRequest];
      setRequests(updatedRequests);
      
      // Save to localStorage
      localStorage.setItem(`farmer-requests-${member?.loginEmail}`, JSON.stringify(updatedRequests));
      
      setFormData({
        productName: '',
        category: '',
        quantity: 0,
        price: 0,
        description: '',
      });

      alert('Product request submitted successfully!');
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-secondary" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-destructive" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-terracotta" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-secondary text-white">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-destructive text-white">Rejected</Badge>;
      case 'pending':
        return <Badge className="bg-terracotta text-white">Pending Review</Badge>;
      default:
        return null;
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

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-primary font-paragraph">Loading...</p>
        </div>
      </div>
    );
  }

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const approvedRequests = requests.filter(r => r.status === 'approved');
  const rejectedRequests = requests.filter(r => r.status === 'rejected');

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-heading font-bold text-primary mb-2">Product Requests</h1>
            <p className="text-primary/70 font-paragraph">Request new products to list on the platform</p>
          </div>
        </div>

        <Tabs defaultValue="requests" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="requests" className="font-paragraph">
              My Requests ({requests.length})
            </TabsTrigger>
            <TabsTrigger value="new" className="font-paragraph">
              New Request
            </TabsTrigger>
          </TabsList>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-paragraph text-primary/70 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Pending
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-terracotta">{pendingRequests.length}</div>
                </CardContent>
              </Card>

              <Card className="border-secondary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-paragraph text-secondary/70 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Approved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-secondary">{approvedRequests.length}</div>
                </CardContent>
              </Card>

              <Card className="border-destructive/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-paragraph text-destructive/70 flex items-center gap-2">
                    <XCircle className="h-4 w-4" />
                    Rejected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-destructive">{rejectedRequests.length}</div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Requests List */}
            {requests.length === 0 ? (
              <motion.div variants={itemVariants}>
                <Card className="border-primary/20">
                  <CardContent className="py-12 text-center">
                    <AlertCircle className="h-12 w-12 text-primary/30 mx-auto mb-4" />
                    <p className="text-primary/60 font-paragraph mb-4">No product requests yet</p>
                    <Button asChild className="bg-primary hover:bg-primary/90">
                      <a href="#new-request">Submit Your First Request</a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {requests.map((request, index) => (
                  <motion.div key={request._id} variants={itemVariants}>
                    <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-heading font-semibold text-primary">
                                {request.productName}
                              </h3>
                              {getStatusBadge(request.status)}
                            </div>
                            <p className="text-sm text-primary/60 font-paragraph">
                              Requested on {new Date(request.createdDate).toLocaleDateString()}
                            </p>
                          </div>
                          {getStatusIcon(request.status)}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-primary/60 font-paragraph uppercase">Category</p>
                            <p className="text-sm font-paragraph text-primary">
                              {categories.find(c => c._id === request.category)?.name || 'Unknown'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-primary/60 font-paragraph uppercase">Quantity</p>
                            <p className="text-sm font-paragraph text-primary">{request.quantity} units</p>
                          </div>
                          <div>
                            <p className="text-xs text-primary/60 font-paragraph uppercase">Price</p>
                            <p className="text-sm font-paragraph text-primary">{formatINR(request.price)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-primary/60 font-paragraph uppercase">Total Value</p>
                            <p className="text-sm font-paragraph text-primary font-semibold">
                              {formatINR(request.price * request.quantity)}
                            </p>
                          </div>
                        </div>

                        {request.description && (
                          <div className="mb-4 p-3 bg-primary/5 rounded-lg">
                            <p className="text-xs text-primary/60 font-paragraph uppercase mb-1">Description</p>
                            <p className="text-sm text-primary/80 font-paragraph">{request.description}</p>
                          </div>
                        )}

                        {request.notes && request.status !== 'pending' && (
                          <div className="p-3 bg-primary/5 rounded-lg">
                            <p className="text-xs text-primary/60 font-paragraph uppercase mb-1">Admin Notes</p>
                            <p className="text-sm text-primary/80 font-paragraph">{request.notes}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* New Request Tab */}
          <TabsContent value="new" id="new-request" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">Submit New Product Request</CardTitle>
                  <CardDescription className="font-paragraph">
                    Request to list a new product on the platform. Our admin team will review and approve your request.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-paragraph text-primary">Product Name *</label>
                    <Input
                      value={formData.productName}
                      onChange={(e) => setFormData({...formData, productName: e.target.value})}
                      placeholder="e.g., Organic Tomatoes"
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-paragraph text-primary">Category *</label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                        <SelectTrigger className="border-primary/20">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat._id} value={cat._id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-paragraph text-primary">Quantity (units) *</label>
                      <Input
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 0})}
                        placeholder="0"
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-paragraph text-primary">Price per Unit (₹) *</label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                      placeholder="0"
                      className="border-primary/20 focus:border-primary"
                    />
                    {formData.price > 0 && formData.quantity > 0 && (
                      <p className="text-sm text-secondary font-paragraph mt-2">
                        Total Value: {formatINR(formData.price * formData.quantity)}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-paragraph text-primary">Description</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Describe your product, farming methods, certifications, etc."
                      className="border-primary/20 focus:border-primary"
                      rows={4}
                    />
                  </div>

                  <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                    <p className="text-sm text-primary/70 font-paragraph">
                      <strong>Note:</strong> Your request will be reviewed by our admin team within 24-48 hours. You'll receive a notification once it's approved or if we need more information.
                    </p>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button 
                      variant="outline" 
                      className="border-primary/20"
                      onClick={() => setFormData({
                        productName: '',
                        category: '',
                        quantity: 0,
                        price: 0,
                        description: '',
                      })}
                    >
                      Clear
                    </Button>
                    <Button 
                      className="bg-primary hover:bg-primary/90"
                      onClick={handleSubmitRequest}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Submit Request
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
