# Multi-Role Portal System - Implementation Guide

## Overview
This document outlines the complete multi-role portal system implementation for ARAMBA Organic Food Forest, including Product Management, Farmer Product Requests, and Order Management workflows.

## System Architecture

### Three Core Roles
1. **Admin** - Platform management and approval workflows
2. **Farmer** - Product listing and order fulfillment
3. **Customer** - Shopping and order tracking

---

## 1. PRODUCT MANAGEMENT (Admin Feature)

### Location
- **Page**: `/src/components/pages/AdminProductManagementPage.tsx`
- **Route**: `/admin/products`

### Features Implemented

#### 1.1 Product Management
- **Add Products**: Create new products with:
  - Product name
  - Price (₹)
  - Category selection
  - Description
  - Image URL
  - Seasonal flag
  
- **Edit Products**: Update existing product details
- **Delete Products**: Remove products from catalog
- **Search & Filter**: Find products by name or category

#### 1.2 Category Management
- **Add Categories**: Create new product categories
- **View Categories**: See all categories with product counts
- **Category Details**: Name, slug, and associated products

### Data Structure
```typescript
interface Products {
  _id: string;
  name?: string;
  mainImage?: string;
  price?: number;
  category?: string;
  description?: string;
  isSeasonal?: boolean;
}

interface ProductCategories {
  _id: string;
  name?: string;
  slug?: string;
  categoryImage?: string;
  shortDescription?: string;
  displayOrder?: number;
}
```

### Usage
1. Navigate to `/admin/products`
2. Use "Products" tab to manage inventory
3. Use "Categories" tab to manage categories
4. Add/Edit/Delete products as needed

---

## 2. FARMER PRODUCT REQUEST WORKFLOW

### Location
- **Farmer Page**: `/src/components/pages/FarmerProductRequestPage.tsx`
- **Admin Page**: `/src/components/pages/AdminProductRequestsPage.tsx`
- **Routes**: 
  - `/farmer/product-requests` (Farmer view)
  - `/admin/product-requests` (Admin view)

### Features Implemented

#### 2.1 Farmer Side
- **Submit Product Request**:
  - Product name
  - Category selection
  - Quantity (units)
  - Price per unit
  - Description
  - Automatic total calculation
  
- **Track Requests**:
  - View all submitted requests
  - See request status (Pending, Approved, Rejected)
  - View admin notes/feedback
  - Filter by status

- **Request Status Flow**:
  - **Pending**: Awaiting admin review
  - **Approved**: Ready to list on platform
  - **Rejected**: Includes admin feedback

#### 2.2 Admin Side
- **Review Requests**:
  - View all pending product requests
  - See farmer details and request information
  - Approve or reject with notes
  
- **Manage Requests**:
  - Approve requests → Product becomes available
  - Reject requests → Provide feedback to farmer
  - View approved and rejected history

### Data Structure
```typescript
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
```

### Storage
- Uses localStorage with key: `farmer-requests-{farmerId}`
- Admin aggregates all farmer requests from localStorage

### Workflow
**Farmer**:
1. Navigate to `/farmer/product-requests`
2. Click "New Request" tab
3. Fill in product details
4. Submit request
5. Track status in "My Requests" tab

**Admin**:
1. Navigate to `/admin/product-requests`
2. Review pending requests
3. Approve or reject with notes
4. Farmer receives notification (future enhancement)

---

## 3. ORDER MANAGEMENT

### Location
- **Customer Page**: `/src/components/pages/CustomerOrdersPage.tsx`
- **Route**: `/customer/orders`

### Features Implemented

#### 3.1 Customer Order Tracking
- **View All Orders**: Complete order history
- **Filter by Status**:
  - Pending (awaiting confirmation)
  - In Transit (confirmed + shipped)
  - Delivered
  - Cancelled
  
- **Order Details**:
  - Order ID
  - Items with quantities and prices
  - Total amount
  - Order status with icon
  - Estimated delivery date
  - Order date

#### 3.2 Order Status Flow
- **Pending**: Order placed, awaiting farmer confirmation
- **Confirmed**: Farmer confirmed the order
- **Shipped**: Order in transit
- **Delivered**: Order received by customer
- **Cancelled**: Order cancelled

### Data Structure
```typescript
interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  farmerId: string;
}

interface Order {
  _id: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdDate: Date | string;
  estimatedDelivery?: Date | string;
  notes?: string;
}
```

### Storage
- Uses localStorage with key: `customer-orders-{customerId}`

### Usage
1. Navigate to `/customer/orders`
2. View order statistics at top
3. Use tabs to filter orders by status
4. Click "View Details" for more information

---

## 4. DASHBOARD INTEGRATION

### Admin Dashboard (`/dashboard/admin`)
- Quick links to:
  - `/admin/products` - Product Management
  - `/admin/product-requests` - Review farmer requests
  
### Farmer Dashboard (`/dashboard/farmer`)
- Quick link to:
  - `/farmer/product-requests` - Submit and track requests

### Customer Dashboard (`/dashboard/customer`)
- Quick link to:
  - `/customer/orders` - View and track orders

---

## 5. ROUTING STRUCTURE

All routes are defined in `/src/components/Router.tsx`:

```
/admin/products                    → AdminProductManagementPage
/admin/product-requests            → AdminProductRequestsPage
/farmer/product-requests           → FarmerProductRequestPage
/customer/orders                   → CustomerOrdersPage
/dashboard/admin                   → AdminDashboardPage
/dashboard/farmer                  → FarmerDashboardPage
/dashboard/customer                → CustomerDashboardPage
```

---

## 6. DATA PERSISTENCE

### Current Implementation
- **Products & Categories**: Stored in CMS collections via `BaseCrudService`
- **Product Requests**: Stored in localStorage (farmer-specific)
- **Orders**: Stored in localStorage (customer-specific)

### Future Enhancement
- Migrate localStorage to dedicated CMS collections:
  - `productRequests` collection
  - `orders` collection
  - `orderItems` collection

---

## 7. KEY FEATURES BY ROLE

### Admin Capabilities
✅ Add/Edit/Delete products
✅ Manage product categories
✅ Review farmer product requests
✅ Approve/Reject requests with feedback
✅ View all orders (future)
✅ Track revenue and analytics (future)

### Farmer Capabilities
✅ Submit product requests
✅ Track request status
✅ View approval/rejection feedback
✅ Manage farm information
✅ View orders for their products (future)
✅ Fulfill orders (future)

### Customer Capabilities
✅ Browse products by category
✅ View seasonal highlights
✅ Place orders (via cart)
✅ Track order status
✅ View order history
✅ Filter orders by status

---

## 8. AUTHENTICATION & AUTHORIZATION

### Current Implementation
- Uses Wix Members SDK for authentication
- Role stored in `useAuthStore` (Zustand)
- Role-based route protection via dashboard paths

### Future Enhancement
- Implement `MemberProtectedRoute` wrapper for all protected pages
- Add role-based access control middleware

---

## 9. STYLING & UX

### Design System
- **Colors**: Primary (#1F5A3A), Secondary (#4B8B3A), Terracotta (#B45A35)
- **Typography**: Playfair Display for headings and paragraphs
- **Animations**: Framer Motion for smooth transitions
- **Components**: shadcn/ui components with Tailwind CSS

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly buttons and inputs

---

## 10. NEXT STEPS & ENHANCEMENTS

### Phase 2 (Order Management)
- [ ] Create `orders` CMS collection
- [ ] Implement order creation from cart
- [ ] Add farmer order fulfillment workflow
- [ ] Implement order status updates
- [ ] Add order notifications

### Phase 3 (Analytics & Reporting)
- [ ] Dashboard analytics for admin
- [ ] Sales reports for farmers
- [ ] Revenue tracking
- [ ] Customer insights

### Phase 4 (Advanced Features)
- [ ] Inventory management
- [ ] Discount/coupon system
- [ ] Product reviews and ratings
- [ ] Farmer certifications display
- [ ] Payment integration

---

## 11. TESTING CHECKLIST

### Admin Product Management
- [ ] Add product with all fields
- [ ] Edit existing product
- [ ] Delete product with confirmation
- [ ] Search products by name
- [ ] Filter products by category
- [ ] Add new category
- [ ] View category product count

### Farmer Product Requests
- [ ] Submit product request
- [ ] View pending requests
- [ ] View approved requests
- [ ] View rejected requests with notes
- [ ] Calculate total value correctly
- [ ] Filter requests by status

### Admin Product Requests
- [ ] View pending requests
- [ ] Approve request with notes
- [ ] Reject request with feedback
- [ ] View approved/rejected history
- [ ] Farmer receives updated status

### Customer Orders
- [ ] View all orders
- [ ] Filter by status (pending, in transit, delivered, cancelled)
- [ ] View order details
- [ ] See order total and items
- [ ] View estimated delivery date

---

## 12. TROUBLESHOOTING

### Products Not Showing
- Check if products are created in CMS collection
- Verify category is assigned correctly
- Clear browser cache and reload

### Requests Not Saving
- Check browser localStorage is enabled
- Verify farmer email is being captured
- Check browser console for errors

### Orders Not Displaying
- Ensure customer is logged in
- Check localStorage for order data
- Verify customer email matches

---

## 13. FILE STRUCTURE

```
/src/components/pages/
├── AdminProductManagementPage.tsx    # Product & Category management
├── AdminProductRequestsPage.tsx      # Review farmer requests
├── FarmerProductRequestPage.tsx      # Submit product requests
├── CustomerOrdersPage.tsx            # View and track orders
├── AdminDashboardPage.tsx            # Admin dashboard (updated)
├── FarmerDashboardPage.tsx           # Farmer dashboard (updated)
└── CustomerDashboardPage.tsx         # Customer dashboard (updated)

/src/components/
└── Router.tsx                        # Route definitions (updated)
```

---

## 14. API INTEGRATION POINTS

### CMS Collections Used
- `products` - Product catalog
- `productcategories` - Product categories
- `userroles` - User role assignments

### Future Collections Needed
- `productRequests` - Farmer product requests
- `orders` - Customer orders
- `orderItems` - Order line items

---

## Support & Questions

For questions or issues, refer to:
1. This documentation
2. Component inline comments
3. AUTHENTICATION_GUIDE.md for auth-related questions
4. Wix API documentation

---

**Last Updated**: November 2024
**Status**: Phase 1 Complete - Product Management & Farmer Requests
