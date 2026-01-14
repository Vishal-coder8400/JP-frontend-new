import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import { useEffect } from "react";

const CheckAuth = ({
  allowedRoles = [],
  fetchProfileHook,
  lockedPages = {},
  userRole,
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
      const profileData =
        userRole === "trainer" ? profile.data.data.trainer : profile.data.data;

      setUser({
        ...profileData,
        role: userRole,
      });

      setIsAuthenticated(true);
    }
  }, [profile?.status, profile?.data?.data]);

  const isLoading = profile?.isLoading;

  // 🧠 Routes where logged-in users should NOT be allowed
  const isLoginOrRegisterRoute = [
    "/recruiter/log-in",
    "/corporate/log-in",
    "/job-seeker/log-in",
    "/trainer/log-in",
    "/recruiter/profile-setup/basic-details",
    "/trainer/profile-setup/basic-details",
    // "/trainer/dashboard",
    "/trainer/profile-setup/additional-details",
    "/corporate/profile-setup/basic-details",
    "/job-seeker/profile-setup/basic-details",
  ].includes(location.pathname);

  // 🔒 Page lock (like skipping profile setup steps)
  const lockedKey = lockedPages[location.pathname];
  const isPageLocked = lockedKey && user?.profileCompletion?.[lockedKey];
  // ⏳ Wait for token to be initialized from storage
  if (!tokenInitialized || isLoading || (isAuthenticated && !user)) {
    return <div>Loading...</div>;
  }

  // 🚫 Authenticated users should not access login or register
  if (isAuthenticated && isLoginOrRegisterRoute) {
    return <Navigate to={`/${userRole}/dashboard`} replace />;
  }

  // 🏠 Redirect from root

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
