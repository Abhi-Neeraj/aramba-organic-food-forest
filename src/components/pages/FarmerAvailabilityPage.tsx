import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BaseCrudService } from '@/integrations';
import { Products } from '@/entities';
import { Plus, Edit2, Trash2, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { formatINR } from '@/lib/currency';
import { useMember } from '@/integrations';

interface ProductAvailability {
  _id: string;
  farmerId: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  harvestDate: Date | string;
  expiryDate: Date | string;
  status: 'available' | 'low_stock' | 'out_of_stock';
  notes?: string;
  createdDate: Date | string;
}

export default function FarmerAvailabilityPage() {
  const { member } = useMember();
  const [products, setProducts] = useState<Products[]>([]);
  const [availabilities, setAvailabilities] = useState<ProductAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingAvailability, setEditingAvailability] = useState<ProductAvailability | null>(null);
  const [formData, setFormData] = useState({
    productId: '',
    quantity: 0,
    price: 0,
    harvestDate: '',
    expiryDate: '',
    notes: '',
  });

  useEffect(() => {
    fetchData();
  }, [member?.loginEmail]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const productsData = await BaseCrudService.getAll<Products>('products');
      setProducts(productsData.items);

      // Load availabilities from localStorage
      const savedAvailabilities = localStorage.getItem(`farmer-availability-${member?.loginEmail}`);
      if (savedAvailabilities) {
        setAvailabilities(JSON.parse(savedAvailabilities));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAvailability = async () => {
    if (!formData.productId || !formData.quantity || !formData.harvestDate || !formData.expiryDate) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const selectedProduct = products.find(p => p._id === formData.productId);
      if (!selectedProduct) {
        alert('Product not found');
        return;
      }

      const newAvailability: ProductAvailability = {
        _id: crypto.randomUUID(),
        farmerId: member?.loginEmail || 'unknown',
        productId: formData.productId,
        productName: selectedProduct.name || '',
        quantity: formData.quantity,
        price: formData.price || selectedProduct.price || 0,
        harvestDate: formData.harvestDate,
        expiryDate: formData.expiryDate,
        status: formData.quantity > 10 ? 'available' : formData.quantity > 0 ? 'low_stock' : 'out_of_stock',
        notes: formData.notes,
        createdDate: new Date(),
      };

      const updatedAvailabilities = [...availabilities, newAvailability];
      setAvailabilities(updatedAvailabilities);
      localStorage.setItem(`farmer-availability-${member?.loginEmail}`, JSON.stringify(updatedAvailabilities));

      resetForm();
      alert('Availability added successfully!');
    } catch (error) {
      console.error('Error adding availability:', error);
      alert('Failed to add availability');
    }
  };

  const handleUpdateAvailability = async () => {
    if (!editingAvailability) return;

    try {
      const updatedAvailabilities = availabilities.map(a =>
        a._id === editingAvailability._id ? editingAvailability : a
      );
      setAvailabilities(updatedAvailabilities);
      localStorage.setItem(`farmer-availability-${member?.loginEmail}`, JSON.stringify(updatedAvailabilities));

      setEditingAvailability(null);
      resetForm();
      alert('Availability updated successfully!');
    } catch (error) {
      console.error('Error updating availability:', error);
      alert('Failed to update availability');
    }
  };

  const handleDeleteAvailability = (id: string) => {
    try {
      const updatedAvailabilities = availabilities.filter(a => a._id !== id);
      setAvailabilities(updatedAvailabilities);
      localStorage.setItem(`farmer-availability-${member?.loginEmail}`, JSON.stringify(updatedAvailabilities));
      alert('Availability deleted successfully!');
    } catch (error) {
      console.error('Error deleting availability:', error);
      alert('Failed to delete availability');
    }
  };

  const resetForm = () => {
    setFormData({
      productId: '',
      quantity: 0,
      price: 0,
      harvestDate: '',
      expiryDate: '',
      notes: '',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-5 w-5 text-secondary" />;
      case 'low_stock':
        return <AlertCircle className="h-5 w-5 text-terracotta" />;
      case 'out_of_stock':
        return <Clock className="h-5 w-5 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-secondary text-white">Available</Badge>;
      case 'low_stock':
        return <Badge className="bg-terracotta text-white">Low Stock</Badge>;
      case 'out_of_stock':
        return <Badge className="bg-destructive text-white">Out of Stock</Badge>;
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

  const availableCount = availabilities.filter(a => a.status === 'available').length;
  const lowStockCount = availabilities.filter(a => a.status === 'low_stock').length;
  const outOfStockCount = availabilities.filter(a => a.status === 'out_of_stock').length;

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
            <h1 className="text-4xl font-heading font-bold text-primary mb-2">Product Availability</h1>
            <p className="text-primary/70 font-paragraph">Manage your product inventory and availability</p>
          </div>
        </div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-secondary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-paragraph text-secondary/70">Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{availableCount}</div>
            </CardContent>
          </Card>

          <Card className="border-terracotta/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-paragraph text-terracotta/70">Low Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-terracotta">{lowStockCount}</div>
            </CardContent>
          </Card>

          <Card className="border-destructive/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-paragraph text-destructive/70">Out of Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">{outOfStockCount}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Add Availability Dialog */}
        <motion.div variants={itemVariants} className="mb-8">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Add Availability
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-heading text-primary">
                  {editingAvailability ? 'Edit Availability' : 'Add Product Availability'}
                </DialogTitle>
                <DialogDescription className="font-paragraph">
                  {editingAvailability ? 'Update product availability details' : 'List your product availability for customers'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-paragraph text-primary">Product *</label>
                  <Select
                    value={editingAvailability ? editingAvailability.productId : formData.productId}
                    onValueChange={(value) => editingAvailability
                      ? setEditingAvailability({...editingAvailability, productId: value})
                      : setFormData({...formData, productId: value})
                    }
                  >
                    <SelectTrigger className="border-primary/20">
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map(product => (
                        <SelectItem key={product._id} value={product._id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-paragraph text-primary">Quantity (units) *</label>
                    <Input
                      type="number"
                      value={editingAvailability ? editingAvailability.quantity : formData.quantity}
                      onChange={(e) => editingAvailability
                        ? setEditingAvailability({...editingAvailability, quantity: parseInt(e.target.value) || 0})
                        : setFormData({...formData, quantity: parseInt(e.target.value) || 0})
                      }
                      placeholder="0"
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-paragraph text-primary">Price (₹)</label>
                    <Input
                      type="number"
                      value={editingAvailability ? editingAvailability.price : formData.price}
                      onChange={(e) => editingAvailability
                        ? setEditingAvailability({...editingAvailability, price: parseFloat(e.target.value) || 0})
                        : setFormData({...formData, price: parseFloat(e.target.value) || 0})
                      }
                      placeholder="0"
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-paragraph text-primary">Harvest Date *</label>
                    <Input
                      type="date"
                      value={editingAvailability ? String(editingAvailability.harvestDate) : formData.harvestDate}
                      onChange={(e) => editingAvailability
                        ? setEditingAvailability({...editingAvailability, harvestDate: e.target.value})
                        : setFormData({...formData, harvestDate: e.target.value})
                      }
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-paragraph text-primary">Expiry Date *</label>
                    <Input
                      type="date"
                      value={editingAvailability ? String(editingAvailability.expiryDate) : formData.expiryDate}
                      onChange={(e) => editingAvailability
                        ? setEditingAvailability({...editingAvailability, expiryDate: e.target.value})
                        : setFormData({...formData, expiryDate: e.target.value})
                      }
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-paragraph text-primary">Notes</label>
                  <Input
                    value={editingAvailability ? editingAvailability.notes || '' : formData.notes}
                    onChange={(e) => editingAvailability
                      ? setEditingAvailability({...editingAvailability, notes: e.target.value})
                      : setFormData({...formData, notes: e.target.value})
                    }
                    placeholder="e.g., Organic certified, pesticide-free"
                    className="border-primary/20 focus:border-primary"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-4">
                  <Button variant="outline" className="border-primary/20" onClick={() => {
                    setEditingAvailability(null);
                    resetForm();
                  }}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={editingAvailability ? handleUpdateAvailability : handleAddAvailability}
                  >
                    {editingAvailability ? 'Update' : 'Add'} Availability
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Availabilities List */}
        {availabilities.length === 0 ? (
          <motion.div variants={itemVariants}>
            <Card className="border-primary/20">
              <CardContent className="py-12 text-center">
                <AlertCircle className="h-12 w-12 text-primary/30 mx-auto mb-4" />
                <p className="text-primary/60 font-paragraph mb-4">No product availability listed yet</p>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <a href="#add-availability">Add Your First Product</a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {availabilities.map((availability) => (
              <motion.div key={availability._id} variants={itemVariants}>
                <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-heading font-semibold text-primary">
                            {availability.productName}
                          </h3>
                          {getStatusBadge(availability.status)}
                        </div>
                        <p className="text-sm text-primary/60 font-paragraph">
                          Added on {new Date(availability.createdDate).toLocaleDateString()}
                        </p>
                      </div>
                      {getStatusIcon(availability.status)}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-primary/60 font-paragraph uppercase">Quantity</p>
                        <p className="text-sm font-paragraph text-primary">{availability.quantity} units</p>
                      </div>
                      <div>
                        <p className="text-xs text-primary/60 font-paragraph uppercase">Price</p>
                        <p className="text-sm font-paragraph text-primary">{formatINR(availability.price)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-primary/60 font-paragraph uppercase">Harvest Date</p>
                        <p className="text-sm font-paragraph text-primary">
                          {new Date(availability.harvestDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-primary/60 font-paragraph uppercase">Expiry Date</p>
                        <p className="text-sm font-paragraph text-primary">
                          {new Date(availability.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {availability.notes && (
                      <div className="mb-4 p-3 bg-primary/5 rounded-lg">
                        <p className="text-xs text-primary/60 font-paragraph uppercase mb-1">Notes</p>
                        <p className="text-sm text-primary/80 font-paragraph">{availability.notes}</p>
                      </div>
                    )}

                    <div className="flex gap-2 justify-end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-primary/20"
                            onClick={() => setEditingAvailability(availability)}
                          >
                            <Edit2 className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="font-heading text-primary">Edit Availability</DialogTitle>
                            <DialogDescription className="font-paragraph">
                              Update product availability details
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-paragraph text-primary">Quantity (units) *</label>
                              <Input
                                type="number"
                                value={editingAvailability?.quantity || 0}
                                onChange={(e) => setEditingAvailability({...editingAvailability!, quantity: parseInt(e.target.value) || 0})}
                                placeholder="0"
                                className="border-primary/20 focus:border-primary"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-paragraph text-primary">Price (₹)</label>
                              <Input
                                type="number"
                                value={editingAvailability?.price || 0}
                                onChange={(e) => setEditingAvailability({...editingAvailability!, price: parseFloat(e.target.value) || 0})}
                                placeholder="0"
                                className="border-primary/20 focus:border-primary"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-paragraph text-primary">Harvest Date *</label>
                                <Input
                                  type="date"
                                  value={String(editingAvailability?.harvestDate || '')}
                                  onChange={(e) => setEditingAvailability({...editingAvailability!, harvestDate: e.target.value})}
                                  className="border-primary/20 focus:border-primary"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-paragraph text-primary">Expiry Date *</label>
                                <Input
                                  type="date"
                                  value={String(editingAvailability?.expiryDate || '')}
                                  onChange={(e) => setEditingAvailability({...editingAvailability!, expiryDate: e.target.value})}
                                  className="border-primary/20 focus:border-primary"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-paragraph text-primary">Notes</label>
                              <Input
                                value={editingAvailability?.notes || ''}
                                onChange={(e) => setEditingAvailability({...editingAvailability!, notes: e.target.value})}
                                placeholder="e.g., Organic certified, pesticide-free"
                                className="border-primary/20 focus:border-primary"
                              />
                            </div>
                            <div className="flex gap-2 justify-end pt-4">
                              <Button variant="outline" className="border-primary/20" onClick={() => setEditingAvailability(null)}>
                                Cancel
                              </Button>
                              <Button
                                className="bg-primary hover:bg-primary/90"
                                onClick={handleUpdateAvailability}
                              >
                                Update Availability
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-destructive/20 text-destructive hover:bg-destructive/5"
                        onClick={() => handleDeleteAvailability(availability._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
