import { Navigate } from "react-router-dom";

const SuperAdminAuth = ({ children }) => {
  // Check for token and userRole in localStorage
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  // If no token or wrong role, redirect to login
  if (!token || userRole !== "super-admin") {
    return <Navigate to="/super-admin/log-in" replace />;
  }

  // If authenticated, render children
  return <>{children}</>;
};

export default SuperAdminAuth;
