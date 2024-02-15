/*eslint-disable react/prop-types */
import { Navigate } from "react-router";
import { getToken } from "../helpers/userHelperFunctions";

const ProtectedRoute = ({ children }) => {
  const token = getToken();

  if (!token) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
