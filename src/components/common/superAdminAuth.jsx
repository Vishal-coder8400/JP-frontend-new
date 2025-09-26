import { Navigate, useLocation } from "react-router-dom";

const SuperAdminAuth = ({ children }) => {
  const location = useLocation();

  // Check for token and userRole in localStorage
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  console.log("SuperAdminAuth - Current location:", location.pathname);
  console.log("SuperAdminAuth - Token:", token);
  console.log("SuperAdminAuth - UserRole:", userRole);

  // If no token or wrong role, redirect to login
  if (!token || userRole !== "super-admin") {
    console.log("SuperAdminAuth - No valid auth, redirecting to login");
    return <Navigate to="/super-admin/log-in" replace />;
  }

  console.log("SuperAdminAuth - Auth valid, rendering children");
  // If authenticated, render children
  return <>{children}</>;
};

export default SuperAdminAuth;
