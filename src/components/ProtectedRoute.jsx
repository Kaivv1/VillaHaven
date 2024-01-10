import Cookies from "js-cookie";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("access_token");

  if (!token) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
