import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Image as ImageComponent } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Products, ProductCategories } from '@/entities';
import { Plus, Edit2, Trash2, Search, AlertCircle } from 'lucide-react'
import { formatINR } from '@/lib/currency';

export default function AdminProductManagementPage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [categories, setCategories] = useState<ProductCategories[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingProduct, setEditingProduct] = useState<Products | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategorySlug, setNewCategorySlug] = useState('');
  const [formData, setFormData] = useState<Partial<Products>>({
    name: '',
    price: 0,
    category: '',
    description: '',
    mainImage: '',
    isSeasonal: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        BaseCrudService.getAll<Products>('products'),
        BaseCrudService.getAll<ProductCategories>('productcategories'),
      ]);
      setProducts(productsData.items);
      setCategories(categoriesData.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    if (!formData.name || !formData.price || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const newProduct: Products = {
        _id: crypto.randomUUID(),
        name: formData.name,
        price: formData.price,
        category: formData.category,
        description: formData.description || '',
        mainImage: formData.mainImage || '',
        isSeasonal: formData.isSeasonal || false,
      };

      await BaseCrudService.create('products', newProduct);
      setProducts([...products, newProduct]);
      resetForm();
      setEditingProduct(null);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct || !editingProduct._id) return;

    try {
      await BaseCrudService.update('products', {
        _id: editingProduct._id,
        name: editingProduct.name,
        price: editingProduct.price,
        category: editingProduct.category,
        description: editingProduct.description,
        mainImage: editingProduct.mainImage,
        isSeasonal: editingProduct.isSeasonal,
      });

      setProducts(products.map(p => p._id === editingProduct._id ? editingProduct : p));
      resetForm();
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await BaseCrudService.delete('products', id);
      setProducts(products.filter(p => p._id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName || !newCategorySlug) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const newCategory: ProductCategories = {
        _id: crypto.randomUUID(),
        name: newCategoryName,
        slug: newCategorySlug,
        categoryImage: '',
        shortDescription: '',
        displayOrder: categories.length,
      };

      await BaseCrudService.create('productcategories', newCategory);
      setCategories([...categories, newCategory]);
      setNewCategoryName('');
      setNewCategorySlug('');
      setIsAddingCategory(false);
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: 750,
      category: '',
      description: '',
      mainImage: '',
      isSeasonal: false,
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
          <p className="text-primary font-paragraph">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-heading font-bold text-primary mb-2">Product Management</h1>
            <p className="text-primary/70 font-paragraph">Manage your product catalog</p>
          </div>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="products" className="font-paragraph">Products</TabsTrigger>
            <TabsTrigger value="categories" className="font-paragraph">Categories</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            {/* Search and Add Product */}
            <motion.div variants={itemVariants} className="flex gap-4 flex-col sm:flex-row">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/50" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-primary/20 focus:border-primary"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48 border-primary/20">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="font-heading text-primary">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </DialogTitle>
                    <DialogDescription className="font-paragraph">
                      {editingProduct ? 'Update product details' : 'Create a new product listing'}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-paragraph text-primary">Product Name *</label>
                      <Input
                        value={editingProduct ? editingProduct.name || '' : formData.name || ''}
                        onChange={(e) => editingProduct 
                          ? setEditingProduct({...editingProduct, name: e.target.value})
                          : setFormData({...formData, name: e.target.value})
                        }
                        placeholder="Enter product name"
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-paragraph text-primary">Price (₹) *</label>
                        <Input
                          type="number"
                          value={editingProduct ? editingProduct.price || 0 : formData.price || 0}
                          onChange={(e) => editingProduct
                            ? setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})
                            : setFormData({...formData, price: parseFloat(e.target.value)})
                          }
                          placeholder="0"
                          className="border-primary/20 focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-paragraph text-primary">Category *</label>
                        <Select 
                          value={editingProduct ? editingProduct.category || '' : formData.category || ''}
                          onValueChange={(value) => editingProduct
                            ? setEditingProduct({...editingProduct, category: value})
                            : setFormData({...formData, category: value})
                          }
                        >
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
                    </div>
                    <div>
                      <label className="text-sm font-paragraph text-primary">Description</label>
                      <Textarea
                        value={editingProduct ? editingProduct.description || '' : formData.description || ''}
                        onChange={(e) => editingProduct
                          ? setEditingProduct({...editingProduct, description: e.target.value})
                          : setFormData({...formData, description: e.target.value})
                        }
                        placeholder="Enter product description"
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-paragraph text-primary">Image URL</label>
                      <Input
                        value={editingProduct ? editingProduct.mainImage || '' : formData.mainImage || ''}
                        onChange={(e) => editingProduct
                          ? setEditingProduct({...editingProduct, mainImage: e.target.value})
                          : setFormData({...formData, mainImage: e.target.value})
                        }
                        placeholder="https://..."
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="seasonal"
                        checked={editingProduct ? editingProduct.isSeasonal || false : formData.isSeasonal || false}
                        onChange={(e) => editingProduct
                          ? setEditingProduct({...editingProduct, isSeasonal: e.target.checked})
                          : setFormData({...formData, isSeasonal: e.target.checked})
                        }
                        className="rounded border-primary/20"
                      />
                      <label htmlFor="seasonal" className="text-sm font-paragraph text-primary">
                        Mark as seasonal product
                      </label>
                    </div>
                    <div className="flex gap-2 justify-end pt-4">
                      <Button variant="outline" className="border-primary/20" onClick={() => {
                        setEditingProduct(null);
                        resetForm();
                      }}>
                        Cancel
                      </Button>
                      <Button 
                        className="bg-primary hover:bg-primary/90"
                        onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                      >
                        {editingProduct ? 'Update Product' : 'Add Product'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <motion.div variants={itemVariants}>
                <Card className="border-primary/20">
                  <CardContent className="py-12 text-center">
                    <AlertCircle className="h-12 w-12 text-primary/30 mx-auto mb-4" />
                    <p className="text-primary/60 font-paragraph">No products found</p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div key={product._id} variants={itemVariants}>
                    <Card className="border-primary/20 overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        {product.mainImage && (
                          <ImageComponent
                            src={product.mainImage}
                            alt={product.name || 'Product'}
                            className="w-full h-48 object-cover"
                            width={300}
                          />
                        )}
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-heading font-semibold text-primary flex-1">{product.name}</h3>
                            {product.isSeasonal && (
                              <Badge className="bg-terracotta text-white text-xs">Seasonal</Badge>
                            )}
                          </div>
                          <p className="text-2xl font-bold text-secondary mb-2">{formatINR(product.price)}</p>
                          <p className="text-sm text-primary/60 font-paragraph mb-4 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="flex-1 border-primary/20"
                                  onClick={() => setEditingProduct(product)}
                                >
                                  <Edit2 className="h-4 w-4 mr-2" />
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle className="font-heading text-primary">Edit Product</DialogTitle>
                                  <DialogDescription className="font-paragraph">
                                    Update product details
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <label className="text-sm font-paragraph text-primary">Product Name *</label>
                                    <Input
                                      value={editingProduct?.name || ''}
                                      onChange={(e) => setEditingProduct({...editingProduct!, name: e.target.value})}
                                      placeholder="Enter product name"
                                      className="border-primary/20 focus:border-primary"
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-paragraph text-primary">Price (₹) *</label>
                                      <Input
                                        type="number"
                                        value={editingProduct?.price || 0}
                                        onChange={(e) => setEditingProduct({...editingProduct!, price: parseFloat(e.target.value)})}
                                        placeholder="0"
                                        className="border-primary/20 focus:border-primary"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-sm font-paragraph text-primary">Category *</label>
                                      <Select 
                                        value={editingProduct?.category || ''}
                                        onValueChange={(value) => setEditingProduct({...editingProduct!, category: value})}
                                      >
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
                                  </div>
                                  <div>
                                    <label className="text-sm font-paragraph text-primary">Description</label>
                                    <Textarea
                                      value={editingProduct?.description || ''}
                                      onChange={(e) => setEditingProduct({...editingProduct!, description: e.target.value})}
                                      placeholder="Enter product description"
                                      className="border-primary/20 focus:border-primary"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-sm font-paragraph text-primary">Image URL</label>
                                    <Input
                                      value={editingProduct?.mainImage || ''}
                                      onChange={(e) => setEditingProduct({...editingProduct!, mainImage: e.target.value})}
                                      placeholder="https://..."
                                      className="border-primary/20 focus:border-primary"
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      id="seasonal-edit"
                                      checked={editingProduct?.isSeasonal || false}
                                      onChange={(e) => setEditingProduct({...editingProduct!, isSeasonal: e.target.checked})}
                                      className="rounded border-primary/20"
                                    />
                                    <label htmlFor="seasonal-edit" className="text-sm font-paragraph text-primary">
                                      Mark as seasonal product
                                    </label>
                                  </div>
                                  <div className="flex gap-2 justify-end pt-4">
                                    <Button variant="outline" className="border-primary/20" onClick={() => setEditingProduct(null)}>
                                      Cancel
                                    </Button>
                                    <Button 
                                      className="bg-primary hover:bg-primary/90"
                                      onClick={handleUpdateProduct}
                                    >
                                      Update Product
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <AlertDialog open={deleteConfirm === product._id}>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="font-heading">Delete Product</AlertDialogTitle>
                                  <AlertDialogDescription className="font-paragraph">
                                    Are you sure you want to delete "{product.name}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="flex gap-2 justify-end">
                                  <AlertDialogCancel className="border-primary/20" onClick={() => setDeleteConfirm(null)}>
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction 
                                    className="bg-destructive hover:bg-destructive/90"
                                    onClick={() => handleDeleteProduct(product._id)}
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </div>
                              </AlertDialogContent>
                            </AlertDialog>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-destructive/20 text-destructive hover:bg-destructive/5"
                              onClick={() => setDeleteConfirm(product._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <motion.div variants={itemVariants}>
              <div className="flex gap-4">
                <div className="flex-1" />
                <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Category
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="font-heading text-primary">Add New Category</DialogTitle>
                      <DialogDescription className="font-paragraph">
                        Create a new product category
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-paragraph text-primary">Category Name *</label>
                        <Input
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          placeholder="e.g., Vegetables"
                          className="border-primary/20 focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-paragraph text-primary">URL Slug *</label>
                        <Input
                          value={newCategorySlug}
                          onChange={(e) => setNewCategorySlug(e.target.value)}
                          placeholder="e.g., vegetables"
                          className="border-primary/20 focus:border-primary"
                        />
                      </div>
                      <div className="flex gap-2 justify-end pt-4">
                        <Button variant="outline" className="border-primary/20" onClick={() => {
                          setIsAddingCategory(false);
                          setNewCategoryName('');
                          setNewCategorySlug('');
                        }}>
                          Cancel
                        </Button>
                        <Button className="bg-primary hover:bg-primary/90" onClick={handleAddCategory}>
                          Add Category
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>

            {categories.length === 0 ? (
              <motion.div variants={itemVariants}>
                <Card className="border-primary/20">
                  <CardContent className="py-12 text-center">
                    <AlertCircle className="h-12 w-12 text-primary/30 mx-auto mb-4" />
                    <p className="text-primary/60 font-paragraph">No categories yet</p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((category, index) => (
                  <motion.div key={category._id} variants={itemVariants}>
                    <Card className="border-primary/20">
                      <CardHeader>
                        <CardTitle className="font-heading text-primary">{category.name}</CardTitle>
                        <CardDescription className="font-paragraph">
                          Slug: {category.slug}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-primary/60 font-paragraph mb-4">
                          {products.filter(p => p.category === category._id).length} products
                        </p>
                        <p className="text-sm text-primary/60 font-paragraph">
                          {category.shortDescription}
                        </p>
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
