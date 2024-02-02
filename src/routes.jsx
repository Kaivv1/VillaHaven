import { createBrowserRouter } from "react-router-dom";
import {
  HomePage,
  ErrorPage,
  ContactsPage,
  AboutPage,
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
import UserLayout from "./ui/UserLayout";
import UserProfile from "./pages/UserProfile";
import UserReservations from "./pages/UserReservations";

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

      {
        element: (
          <ProtectedRoute>
            <UserLayout />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/user/profile",
            element: <UserProfile />,
          },
          {
            path: "/user/bookings",
            element: <UserReservations />,
          },
        ],
      },
    ],
  },
]);

export { router };
