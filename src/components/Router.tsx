import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';

// Import route components and loaders
import { rootRouteLoader, WixServicesProvider } from '@/wix-verticals/react-pages/react-router/routes/root';

// Import page components
import HomePage from '@/components/pages/HomePage';
import ContactPage from '@/components/pages/ContactPage';
import BlogPage from '@/components/pages/BlogPage';
import BlogPostPage from '@/components/pages/BlogPostPage';
import CertificationsPage from '@/components/pages/CertificationsPage';
import LoginPage from '@/components/pages/LoginPage';
import CustomerDashboardPage from '@/components/pages/CustomerDashboardPage';
import FarmerDashboardPage from '@/components/pages/FarmerDashboardPage';
import AdminDashboardPage from '@/components/pages/AdminDashboardPage';
import ProductDetailsPage from '@/components/pages/ProductDetailsPage';
import Layout from '@/components/Layout';

// Main layout component that includes the scroll to top component and the layout component
function MainLayout() {
  return (
    <WixServicesProvider>
      <ScrollToTop />
      <Layout />
    </WixServicesProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    loader: rootRouteLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/contact',
        element: <ContactPage />,
      },
      {
        path: '/products/:productId',
        element: <ProductDetailsPage />,
      },
      {
        path: '/blog',
        element: <BlogPage />,
      },
      {
        path: '/blog/:slug',
        element: <BlogPostPage />,
      },
      {
        path: '/certifications',
        element: <CertificationsPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/dashboard/customer',
        element: <CustomerDashboardPage />,
      },
      {
        path: '/dashboard/farmer',
        element: <FarmerDashboardPage />,
      },
      {
        path: '/dashboard/admin',
        element: <AdminDashboardPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
