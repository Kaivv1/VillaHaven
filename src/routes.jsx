import { createBrowserRouter } from "react-router-dom";
import {
  HomePage,
  ErrorPage,
  ContactsPage,
  AboutPage,
  FAQPage,
  OurStaffPage,
  PricingPage,
  VillaDetailsPage,
  VillasPage,
  LoginPage,
  RegisterPage,
  SendOTPPage,
  OTPVerificationPage,
  ResetPasswordPage,
  FavouriteVillasPage,
} from "./pages/exports";
import Layout from "./Layout";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/about",
        element: (
          <ProtectedRoute>
            <AboutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/villas",
        element: (
          <ProtectedRoute>
            <VillasPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/villas/:villaID",
        element: (
          <ProtectedRoute>
            <VillaDetailsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/pricing",
        element: (
          <ProtectedRoute>
            <PricingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/staff",
        element: (
          <ProtectedRoute>
            <OurStaffPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/faq",
        element: (
          <ProtectedRoute>
            <FAQPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contact",
        element: (
          <ProtectedRoute>
            <ContactsPage />
          </ProtectedRoute>
        ),
      },
      { path: "/login", element: <LoginPage /> },

      { path: "/register", element: <RegisterPage /> },

      { path: "/password/send-email", element: <SendOTPPage /> },

      { path: "/password/verify-email", element: <OTPVerificationPage /> },

      { path: "/password/reset-password", element: <ResetPasswordPage /> },
      {
        path: "/favorites",
        element: (
          <ProtectedRoute>
            <FavouriteVillasPage />
          </ProtectedRoute>
        ),
      },

      { path: "/error", element: <ErrorPage /> },
    ],
  },
]);

export { router };
