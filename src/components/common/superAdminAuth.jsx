import { Navigate } from "react-router-dom";

const SuperAdminAuth = ({ children }) => {
  // Check for token and userRole in sessionStorage
  const token = sessionStorage.getItem("token");
  const userRole = sessionStorage.getItem("userRole");

  // If no token or wrong role, redirect to login
  if (!token || userRole !== "super-admin") {
    return <Navigate to="/super-admin/log-in" replace />;
  }

  // If authenticated, render children
  return <>{children}</>;
};

export default SuperAdminAuth;
