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
  ReservationPage,
  UserProfile,
  UserReservations,
  ReservationSuccess,
  ReservationFailed,
} from "./pages/exports";
import Layout from "./Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import UserLayout from "./ui/UserLayout";

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
        path: "/reservation/:villaID",
        element: (
          <ProtectedRoute>
            <ReservationPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/reservation/:reservationID/success",
        element: (
          <ProtectedRoute>
            <ReservationSuccess />
          </ProtectedRoute>
        ),
      },
      {
        path: "/reservation/failed",
        element: (
          <ProtectedRoute>
            <ReservationFailed />
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
            path: "/user/reservations",
            element: <UserReservations />,
          },
        ],
      },
    ],
  },
]);

export { router };
