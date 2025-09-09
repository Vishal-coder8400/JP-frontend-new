import React from "react";
import { useGetUserProfile } from "../../hooks/superAdmin/useProfile";
import { useGetAllApplicants } from "../../hooks/superAdmin/useApplicant";
import { useGetAllJobs } from "../../hooks/superAdmin/useJob";
import { useGetAllTrainings } from "../../hooks/superAdmin/useTraining";

const SuperAdminDashboard = () => {
  const { data: userProfile } = useGetUserProfile();
  const { data: applicants } = useGetAllApplicants({ page: 1, limit: 5 });
  const { data: jobs } = useGetAllJobs({ page: 1, limit: 5 });
  const { data: trainings } = useGetAllTrainings({ page: 1, limit: 5 });

  const stats = [
    {
      title: "Total Users",
      value: applicants?.data?.totalUsers || 0,
      color: "bg-blue-500",
      icon: "👥",
    },
    {
      title: "Active Jobs",
      value: jobs?.data?.totalJobs || 0,
      color: "bg-green-500",
      icon: "💼",
    },
    {
      title: "Training Programs",
      value: trainings?.data?.totalTrainings || 0,
      color: "bg-purple-500",
      icon: "📚",
    },
    {
      title: "System Status",
      value: "Online",
      color: "bg-emerald-500",
      icon: "✅",
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Super Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {userProfile?.data?.name || "Administrator"}
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div
                className={`p-3 rounded-full ${stat.color} text-white text-xl`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-600">New user registered</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Job posting approved</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Training program created</p>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            System Health
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Database</span>
              <span className="text-green-500 text-sm font-medium">
                Healthy
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">API Status</span>
              <span className="text-green-500 text-sm font-medium">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Storage</span>
              <span className="text-yellow-500 text-sm font-medium">
                75% Used
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Management Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href="/superAdmin/users"
          className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
        >
          <div className="text-center">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="text-lg font-semibold text-gray-900">
              User Management
            </h3>
            <p className="text-sm text-gray-600">Manage all system users</p>
          </div>
        </a>
        <a
          href="/superAdmin/job-openings"
          className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
        >
          <div className="text-center">
            <div className="text-3xl mb-2">💼</div>
            <h3 className="text-lg font-semibold text-gray-900">
              Job Management
            </h3>
            <p className="text-sm text-gray-600">Oversee all job postings</p>
          </div>
        </a>
        <a
          href="/superAdmin/settings"
          className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
        >
          <div className="text-center">
            <div className="text-3xl mb-2">⚙️</div>
            <h3 className="text-lg font-semibold text-gray-900">
              System Settings
            </h3>
            <p className="text-sm text-gray-600">Configure system parameters</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
