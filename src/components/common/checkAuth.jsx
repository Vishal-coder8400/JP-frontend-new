import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import { useEffect } from "react";

const CheckAuth = ({ allowedRoles = [], fetchProfileHook, children }) => {
  const location = useLocation();
  const {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    refetchProfile,
    setRefetchProfile,
    token,
  } = useAuthStore();
  const userRole = user?.role;
  // console.log(isAuthenticated, user, token, userRole, refetchProfile);
  const shouldFetchProfile = isAuthenticated && (refetchProfile || !user);
  const profile = fetchProfileHook
    ? fetchProfileHook({
        enabled: shouldFetchProfile,
      })
    : null;
  useEffect(() => {
    if (profile?.status === "success" && !profile.isLoading) {
      // console.log(profile.data?.data);
      setUser(profile.data.data);
      setIsAuthenticated(true);
      if (refetchProfile) setRefetchProfile(false);
    }
    // console.log("useEffect");
  }, [profile?.status, profile?.data?.data]);
  // console.log(user, "late");
  const isLoading = profile?.isLoading || (!user && isAuthenticated);
  const isLoginOrRegisterRoute = ["/log-in", "/basic-details"].some((path) =>
    location.pathname.includes(path)
  );

  if (isLoading || (isAuthenticated && !userRole)) {
    return <div>Loading...</div>;
  }

  if (location.pathname === "/") {
    return isAuthenticated && userRole ? (
      <Navigate to={`/${userRole}/dashboard`} replace />
    ) : (
      <Navigate to={`/${allowedRoles[0]}/log-in`} replace />
    );
  }

  if (isAuthenticated && isLoginOrRegisterRoute && userRole) {
    console.log("first");
    return <Navigate to={`/${userRole}/dashboard`} replace />;
  }

  if (!isAuthenticated && !isLoginOrRegisterRoute) {
    console.log("second");
    return (
      <Navigate
        to={`/${allowedRoles[0]}/log-in`}
        replace
        state={{ from: location }}
      />
    );
  }

  if (
    isAuthenticated &&
    allowedRoles.length &&
    !allowedRoles.includes(userRole)
  ) {
    console.log("third");
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default CheckAuth;
