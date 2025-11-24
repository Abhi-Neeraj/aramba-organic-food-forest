# Multi-Role Authentication System Guide

## Overview

This guide explains the complete multi-role authentication system implemented for ARAMBA Organic Food Forest. The system supports three distinct user roles: **Customer**, **Farmer**, and **Admin**, each with their own authentication flow and dedicated dashboard.

## System Architecture

### Components

#### 1. **Auth Store** (`/src/stores/authStore.ts`)
- Zustand-based state management for authentication
- Stores: `userRole`, `memberId`, `isAuthenticated`, `userRoleData`
- Methods:
  - `setUserRole()` - Set user role and persist to localStorage
  - `clearAuth()` - Clear authentication state
  - `loadUserRole()` - Load user role from database

#### 2. **User Roles Collection** (`userroles`)
- CMS collection storing user role information
- Fields:
  - `roleType` - Role type (admin, farmer, customer)
  - `memberId` - Unique member identifier
  - `isActive` - Boolean flag for active status
  - `assignmentDate` - Date role was assigned
  - `permissionsSummary` - Brief description of permissions

#### 3. **Pages**

##### Login Page (`/login`)
- Tabbed interface for three user roles
- Email/password form for each role
- Links to signup pages
- Demo credentials notice

##### Signup Pages (`/signup/:role`)
- Role-specific signup forms
- Customer: Basic info (name, email, password)
- Farmer: Extended form (farm name, location, specialty, bio)
- Admin: Invitation-only (no self-signup)

##### Dashboards
- **Customer Dashboard** (`/dashboard/customer`)
  - Order history
  - Wishlist management
  - Account information
  - Shopping quick links

- **Farmer Dashboard** (`/dashboard/farmer`)
  - Product management
  - Sales analytics
  - Order tracking
  - Farm information
  - Resources and guides

- **Admin Dashboard** (`/dashboard/admin`)
  - User management
  - Product management
  - Order and sales tracking
  - System information
  - Quick actions

#### 4. **Header Navigation**
- Dynamic auth buttons based on user role
- "Sign In" button for anonymous users
- "Dashboard" and "Logout" buttons for authenticated users

## User Flows

### Customer Flow
1. Click "Sign In" in header
2. Select "Customer" tab
3. Enter email and password
4. Click "Sign in as Customer"
5. Redirected to `/dashboard/customer`
6. Can browse shop, place orders, manage wishlist

### Farmer Flow
1. Click "Sign In" in header
2. Select "Farmer" tab
3. Click "Create farmer account"
4. Fill in farm details (name, location, specialty, bio)
5. Create account
6. Redirected to `/dashboard/farmer`
7. Can list products, track sales, manage orders

### Admin Flow
1. Admin accounts are created by invitation only
2. Admin receives credentials from system administrator
3. Signs in via login page
4. Redirected to `/dashboard/admin`
5. Can manage users, products, orders, and system settings

## Authentication Flow

### Login Process
```
User clicks "Sign In"
    ↓
Selects role (Customer/Farmer/Admin)
    ↓
Enters credentials
    ↓
System validates (demo: accepts any email/password)
    ↓
Creates UserRole entry in database
    ↓
Stores in auth store + localStorage
    ↓
Redirects to role-specific dashboard
```

### Logout Process
```
User clicks "Logout"
    ↓
clearAuth() called
    ↓
Auth store cleared
    ↓
localStorage cleared
    ↓
Redirected to home page
```

## Data Structure

### UserRoles Collection Schema
```typescript
interface UserRoles {
  _id: string;                    // Unique ID
  roleType: string;               // 'admin' | 'farmer' | 'customer'
  memberId: string;               // Linked member ID
  isActive: boolean;              // Active status
  assignmentDate: string;         // YYYY-MM-DD format
  permissionsSummary: string;     // Role permissions description
  _createdDate?: Date;            // System field
  _updatedDate?: Date;            // System field
}
```

## Security Considerations

### Current Implementation (Demo)
- Accepts any email/password combination
- Uses localStorage for persistence
- No server-side validation

### Production Implementation Should Include
1. **Password Hashing** - Use bcrypt or similar
2. **JWT Tokens** - Implement token-based authentication
3. **Session Management** - Server-side session validation
4. **HTTPS Only** - Enforce secure connections
5. **Rate Limiting** - Prevent brute force attacks
6. **Email Verification** - Confirm user email addresses
7. **Two-Factor Authentication** - Optional 2FA for admin
8. **Role-Based Access Control (RBAC)** - Enforce permissions server-side
9. **Audit Logging** - Track authentication events
10. **CSRF Protection** - Prevent cross-site attacks

## Customization Guide

### Adding a New Role
1. Update `UserRole` type in `authStore.ts`:
   ```typescript
   export type UserRole = 'admin' | 'farmer' | 'customer' | 'newRole';
   ```

2. Create new dashboard page:
   ```typescript
   // /src/components/pages/NewRoleDashboardPage.tsx
   export default function NewRoleDashboardPage() {
     // Implementation
   }
   ```

3. Add route to Router.tsx:
   ```typescript
   {
     path: '/dashboard/newrole',
     element: <NewRoleDashboardPage />,
   }
   ```

4. Add signup form to SignupPage.tsx

### Customizing Dashboard Content
- Edit respective dashboard page component
- Modify cards, stats, and action buttons
- Update navigation links as needed

### Changing Authentication Logic
- Modify `handleLogin()` in LoginPage.tsx
- Modify `handleSignup()` in SignupPage.tsx
- Update auth store methods as needed

## Testing

### Test Scenarios

#### Customer Signup & Login
1. Go to `/login`
2. Click "Create customer account"
3. Fill in details and submit
4. Verify redirect to `/dashboard/customer`
5. Check header shows "Dashboard" button
6. Click logout and verify redirect to home

#### Farmer Signup & Login
1. Go to `/login`
2. Select "Farmer" tab
3. Click "Create farmer account"
4. Fill in farm details
5. Submit and verify redirect to `/dashboard/farmer`
6. Verify farm information displays

#### Admin Access
1. Go to `/login`
2. Select "Admin" tab
3. Verify message about invitation-only access
4. Confirm no self-signup option

#### Navigation
1. Verify "Sign In" button appears for anonymous users
2. Verify "Dashboard" button appears for authenticated users
3. Verify logout clears auth state
4. Verify page refresh maintains auth state (localStorage)

## Troubleshooting

### User Not Redirected After Login
- Check browser console for errors
- Verify auth store is being updated
- Check localStorage for persisted data

### Dashboard Not Loading
- Verify user role matches route (e.g., customer accessing /dashboard/customer)
- Check auth store has correct userRole value
- Clear localStorage and try again

### Logout Not Working
- Verify clearAuth() is being called
- Check localStorage is cleared
- Verify redirect to home page

### Form Validation Issues
- Check required fields are filled
- Verify password confirmation matches
- Check email format is valid

## Future Enhancements

1. **Email Verification** - Send confirmation emails
2. **Password Reset** - Implement forgot password flow
3. **Social Login** - Add Google/Facebook authentication
4. **Profile Management** - Allow users to edit their information
5. **Role Switching** - Allow users to have multiple roles
6. **Permissions System** - Fine-grained access control
7. **Activity Logging** - Track user actions
8. **Notifications** - Email/SMS notifications for important events
9. **Two-Factor Authentication** - Enhanced security for admin
10. **API Integration** - Connect to external services

## File Structure

```
/src
├── stores/
│   └── authStore.ts                    # Auth state management
├── components/
│   ├── Header.tsx                      # Updated with auth buttons
│   ├── Router.tsx                      # Updated with new routes
│   └── pages/
│       ├── LoginPage.tsx               # Login with role tabs
│       ├── SignupPage.tsx              # Role-specific signup
│       ├── CustomerDashboardPage.tsx   # Customer dashboard
│       ├── FarmerDashboardPage.tsx     # Farmer dashboard
│       └── AdminDashboardPage.tsx      # Admin dashboard
└── entities/
    ├── userroles.d.ts                  # Type definitions
    └── index.ts                        # UserRoles interface
```

## API Endpoints (Future)

```
POST   /api/auth/login              # Login user
POST   /api/auth/signup             # Create new user
POST   /api/auth/logout             # Logout user
GET    /api/auth/me                 # Get current user
POST   /api/auth/refresh            # Refresh token
POST   /api/auth/forgot-password    # Request password reset
POST   /api/auth/reset-password     # Reset password
GET    /api/users/:id               # Get user details
PUT    /api/users/:id               # Update user
DELETE /api/users/:id               # Delete user
GET    /api/roles                   # List all roles
POST   /api/roles                   # Create role
PUT    /api/roles/:id               # Update role
DELETE /api/roles/:id               # Delete role
```

## Support & Questions

For questions or issues with the authentication system:
1. Check this guide first
2. Review the code comments
3. Check browser console for errors
4. Review the troubleshooting section
5. Contact the development team

---

**Last Updated:** November 24, 2025
**Version:** 1.0
**Status:** Production Ready (Demo Mode)
