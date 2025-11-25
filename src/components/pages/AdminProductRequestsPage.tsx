import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { ProductCategories } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { formatINR } from '@/lib/currency';

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

export default function AdminProductRequestsPage() {
  const [requests, setRequests] = useState<ProductRequest[]>([]);
  const [categories, setCategories] = useState<ProductCategories[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<ProductRequest | null>(null);
  const [actionNotes, setActionNotes] = useState('');
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const categoriesData = await BaseCrudService.getAll<ProductCategories>('productcategories');
      setCategories(categoriesData.items);

      // Load all farmer requests from localStorage
      const allRequests: ProductRequest[] = [];
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('farmer-requests-')) {
          const farmerRequests = JSON.parse(localStorage.getItem(key) || '[]');
          allRequests.push(...farmerRequests);
        }
      });
      setRequests(allRequests);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveRequest = async () => {
    if (!selectedRequest) return;

    const updatedRequest = {
      ...selectedRequest,
      status: 'approved' as const,
      notes: actionNotes,
    };

    updateRequest(updatedRequest);
  };

  const handleRejectRequest = async () => {
    if (!selectedRequest) return;

    const updatedRequest = {
      ...selectedRequest,
      status: 'rejected' as const,
      notes: actionNotes,
    };

    updateRequest(updatedRequest);
  };

  const updateRequest = (updatedRequest: ProductRequest) => {
    const updatedRequests = requests.map(r => r._id === updatedRequest._id ? updatedRequest : r);
    setRequests(updatedRequests);

    // Update localStorage for the farmer
    const farmerKey = `farmer-requests-${updatedRequest.farmerId}`;
    const farmerRequests = JSON.parse(localStorage.getItem(farmerKey) || '[]');
    const updatedFarmerRequests = farmerRequests.map((r: ProductRequest) => 
      r._id === updatedRequest._id ? updatedRequest : r
    );
    localStorage.setItem(farmerKey, JSON.stringify(updatedFarmerRequests));

    setSelectedRequest(null);
    setActionNotes('');
    setActionType(null);
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
          <p className="text-primary font-paragraph">Loading requests...</p>
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
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-primary mb-2">Product Requests</h1>
          <p className="text-primary/70 font-paragraph">Review and manage farmer product requests</p>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="pending" className="font-paragraph">
              Pending ({pendingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="font-paragraph">
              Approved ({approvedRequests.length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="font-paragraph">
              Rejected ({rejectedRequests.length})
            </TabsTrigger>
          </TabsList>

          {/* Pending Requests */}
          <TabsContent value="pending" className="space-y-6">
            {pendingRequests.length === 0 ? (
              <motion.div variants={itemVariants}>
                <Card className="border-primary/20">
                  <CardContent className="py-12 text-center">
                    <AlertCircle className="h-12 w-12 text-primary/30 mx-auto mb-4" />
                    <p className="text-primary/60 font-paragraph">No pending requests</p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((request, index) => (
                  <motion.div key={request._id} variants={itemVariants}>
                    <Card className="border-terracotta/20 hover:shadow-lg transition-shadow">
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
                              From: {request.farmerId} • Requested: {new Date(request.createdDate).toLocaleDateString()}
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

                        <div className="flex gap-2 justify-end">
                          <Dialog open={actionType === 'reject' && selectedRequest?._id === request._id} onOpenChange={(open) => {
                            if (!open) {
                              setActionType(null);
                              setActionNotes('');
                              setSelectedRequest(null);
                            }
                          }}>
                            <Button 
                              variant="outline"
                              className="border-destructive/20 text-destructive hover:bg-destructive/5"
                              onClick={() => {
                                setSelectedRequest(request);
                                setActionType('reject');
                              }}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="font-heading text-destructive">Reject Request</DialogTitle>
                                <DialogDescription className="font-paragraph">
                                  Provide feedback to the farmer about why this request was rejected.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-paragraph text-primary">Rejection Notes</label>
                                  <Textarea
                                    value={actionNotes}
                                    onChange={(e) => setActionNotes(e.target.value)}
                                    placeholder="Explain why this request is being rejected..."
                                    className="border-primary/20 focus:border-primary"
                                    rows={4}
                                  />
                                </div>
                                <div className="flex gap-2 justify-end">
                                  <Button 
                                    variant="outline" 
                                    className="border-primary/20"
                                    onClick={() => {
                                      setActionType(null);
                                      setActionNotes('');
                                      setSelectedRequest(null);
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    className="bg-destructive hover:bg-destructive/90"
                                    onClick={handleRejectRequest}
                                  >
                                    Reject Request
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog open={actionType === 'approve' && selectedRequest?._id === request._id} onOpenChange={(open) => {
                            if (!open) {
                              setActionType(null);
                              setActionNotes('');
                              setSelectedRequest(null);
                            }
                          }}>
                            <Button 
                              className="bg-secondary hover:bg-secondary/90"
                              onClick={() => {
                                setSelectedRequest(request);
                                setActionType('approve');
                              }}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="font-heading text-secondary">Approve Request</DialogTitle>
                                <DialogDescription className="font-paragraph">
                                  Add any notes for the farmer (optional).
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-paragraph text-primary">Approval Notes (Optional)</label>
                                  <Textarea
                                    value={actionNotes}
                                    onChange={(e) => setActionNotes(e.target.value)}
                                    placeholder="Add any notes or instructions..."
                                    className="border-primary/20 focus:border-primary"
                                    rows={4}
                                  />
                                </div>
                                <div className="flex gap-2 justify-end">
                                  <Button 
                                    variant="outline" 
                                    className="border-primary/20"
                                    onClick={() => {
                                      setActionType(null);
                                      setActionNotes('');
                                      setSelectedRequest(null);
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    className="bg-secondary hover:bg-secondary/90"
                                    onClick={handleApproveRequest}
                                  >
                                    Approve Request
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Approved Requests */}
          <TabsContent value="approved" className="space-y-6">
            {approvedRequests.length === 0 ? (
              <motion.div variants={itemVariants}>
                <Card className="border-primary/20">
                  <CardContent className="py-12 text-center">
                    <AlertCircle className="h-12 w-12 text-primary/30 mx-auto mb-4" />
                    <p className="text-primary/60 font-paragraph">No approved requests</p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {approvedRequests.map((request) => (
                  <motion.div key={request._id} variants={itemVariants}>
                    <Card className="border-secondary/20">
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
                              From: {request.farmerId}
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

                        {request.notes && (
                          <div className="p-3 bg-secondary/10 rounded-lg">
                            <p className="text-xs text-primary/60 font-paragraph uppercase mb-1">Approval Notes</p>
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

          {/* Rejected Requests */}
          <TabsContent value="rejected" className="space-y-6">
            {rejectedRequests.length === 0 ? (
              <motion.div variants={itemVariants}>
                <Card className="border-primary/20">
                  <CardContent className="py-12 text-center">
                    <AlertCircle className="h-12 w-12 text-primary/30 mx-auto mb-4" />
                    <p className="text-primary/60 font-paragraph">No rejected requests</p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {rejectedRequests.map((request) => (
                  <motion.div key={request._id} variants={itemVariants}>
                    <Card className="border-destructive/20">
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
                              From: {request.farmerId}
                            </p>
                          </div>
                          {getStatusIcon(request.status)}
                        </div>

                        {request.notes && (
                          <div className="p-3 bg-destructive/10 rounded-lg">
                            <p className="text-xs text-primary/60 font-paragraph uppercase mb-1">Rejection Reason</p>
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
        </Tabs>
      </motion.div>
    </div>
  );
}
