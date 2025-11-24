import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';

// Import route components and loaders
import { rootRouteLoader, WixServicesProvider } from '@/wix-verticals/react-pages/react-router/routes/root';
import {
  ProductDetailsRoute,
  productRouteLoader,
} from '@/wix-verticals/react-pages/react-router/routes/product-details';
import {
  StoreCollectionRoute,
  storeCollectionRouteLoader,
} from '@/wix-verticals/react-pages/react-router/routes/store-collection';
import { defaultStoreCollectionRouteRedirectLoader } from '@/wix-verticals/react-pages/react-router/routes/store-redirect';
import { Cart } from '@/wix-verticals/react-pages/react-router/routes/cart';

// Import page components
import HomePage from '@/components/pages/HomePage';
import BlogPage from '@/components/pages/BlogPage';
import BlogPostPage from '@/components/pages/BlogPostPage';
import OurTeamPage from '@/components/pages/OurTeamPage';
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
        path: '/products/:slug',
        element: (
          <div className="min-h-screen bg-background">
            <div className="max-w-[120rem] mx-auto px-6 py-8">
              <h1 className="text-3xl font-heading font-semibold text-primary mb-6">Product Details</h1>
              <ProductDetailsRoute />
            </div>
          </div>
        ),
        loader: productRouteLoader,
      },
      {
        path: '/store',
        element: <></>,
        loader: defaultStoreCollectionRouteRedirectLoader,
        index: true,
      },
      {
        path: '/store/:categorySlug',
        element: (
          <div className="min-h-screen bg-background">
            <div className="max-w-[120rem] mx-auto px-6 py-8">
              <h1 className="text-3xl font-heading font-semibold text-primary mb-6">Shop by Category</h1>
              <StoreCollectionRoute productPageRoute="/products" />
            </div>
          </div>
        ),
        loader: storeCollectionRouteLoader,
      },
      {
        path: '/cart',
        element: (
          <div className="min-h-screen bg-background">
            <div className="max-w-[120rem] mx-auto px-6 py-8">
              <h1 className="text-3xl font-heading font-semibold text-primary mb-6">Shopping Cart</h1>
              <Cart />
            </div>
          </div>
        ),
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
        path: '/our-team',
        element: <OurTeamPage />,
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
