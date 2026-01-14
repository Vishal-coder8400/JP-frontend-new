import { useGetSuperAdminProfile } from "../../hooks/super-admin/useProfile";

const SuperAdminDashboard = () => {
  const { data: profileData, isLoading: profileLoading } =
    useGetSuperAdminProfile();

  // Get profile information from API response
  const profile = profileData?.data?.data || {};

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Super Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome back,{" "}
            {profile?.firstName
              ? `${profile.firstName} ${profile.lastName}`
              : profile?.name || "Administrator"}
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Profile Information */}
      {profileLoading ? (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ) : profile && Object.keys(profile).length > 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Profile Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="text-sm font-medium text-gray-900">
                {profile?.firstName && profile?.lastName
                  ? `${profile.firstName} ${profile.lastName}`
                  : profile?.name || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-sm font-medium text-gray-900">
                {profile?.email || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Role</p>
              <p className="text-sm font-medium text-gray-900">
                {profile?.role || "Super Admin"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="text-sm font-medium text-gray-900">
                {profile?.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuperAdminDashboard;
