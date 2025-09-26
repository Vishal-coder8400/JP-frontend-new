import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import { useEffect } from "react";
import { calculateProfileCompletion } from "../../utils/profileCompletion/calculate";

const CheckAuth = ({
  allowedRoles = [],
  fetchProfileHook,
  lockedPages = {},
  children,
}) => {
  const location = useLocation();

  const {
    tokenInitialized,
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
  } = useAuthStore();
  const profile = fetchProfileHook ? fetchProfileHook() : null;

  useEffect(() => {
    if (profile?.status === "success" && !profile.isLoading) {
      const profileData = profile.data.data;
      const role = profileData?.role;

      const completion = calculateProfileCompletion(profileData, role);

      setUser({
        ...profileData,
        profileCompletion: completion,
      });

      setIsAuthenticated(true);
    }
  }, [profile?.status, profile?.data?.data?._id]);

  const isLoading = profile?.isLoading || (!user && isAuthenticated);
  const userRole = user?.role;

  // 🧠 Routes where logged-in users should NOT be allowed
  const isLoginOrRegisterRoute = [
    "/recruiter/log-in",
    "/corporate/log-in",
    "/job-seeker/log-in",
    "/trainer/log-in",
    "/recruiter/profile-setup/basic-details",
    "/trainer/profile-setup/basic-details",
    "/trainer/profile-setup/education-details",
    "/trainer/profile-setup/working-details",
    "/trainer/profile-setup/certificate-details",
    "/corporate/profile-setup/basic-details",
    "/job-seeker/profile-setup/basic-details",
  ].includes(location.pathname);

  // 🔒 Page lock (like skipping profile setup steps)
  const lockedKey = lockedPages[location.pathname];
  const isPageLocked = lockedKey && user?.profileCompletion?.[lockedKey];

  // ⏳ Wait for token to be initialized from storage
  if (!tokenInitialized || isLoading || (isAuthenticated && !userRole)) {
    return <div>Loading...</div>;
  }

  // 🚫 Authenticated users should not access login or register
  if (isAuthenticated && isLoginOrRegisterRoute && userRole) {
    return <Navigate to={`/${userRole}/dashboard`} replace />;
  }

  // 🏠 Redirect from root
  if (location.pathname === "/") {
    return isAuthenticated && userRole ? (
      <Navigate to={`/${userRole}/dashboard`} replace />
    ) : (
      <Navigate to={`/${allowedRoles[0]}/log-in`} replace />
    );
  }

  // 🔐 Not authenticated and trying to access protected routes
  if (!isAuthenticated && !isLoginOrRegisterRoute) {
    return (
      <Navigate
        to={`/${allowedRoles[0]}/log-in`}
        replace
        state={{ from: location }}
      />
    );
  }

  // ❌ Authenticated but wrong role
  if (
    isAuthenticated &&
    allowedRoles.length &&
    !allowedRoles.includes(userRole)
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 🚷 Block access to completed pages
  if (isAuthenticated && isPageLocked) {
    return <Navigate to={`/${userRole}/dashboard`} replace />;
  }

  return <>{children}</>;
};

export default CheckAuth;
