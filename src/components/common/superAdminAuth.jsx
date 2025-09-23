import { Navigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";

const SuperAdminAuth = ({ children }) => {
  const { token, isAuthenticated } = useAuthStore();

  // Simple check: if token exists and user is authenticated, allow access
  if (token && isAuthenticated) {
    return <>{children}</>;
  }

  // If no token or not authenticated, redirect to login
  return <Navigate to="/super-admin/log-in" replace />;
};

export default SuperAdminAuth;
