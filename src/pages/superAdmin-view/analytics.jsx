import React, { useState } from "react";
import { useGetAllJobs } from "../../hooks/superAdmin/useJob";
import { useGetAllApplicants } from "../../hooks/superAdmin/useApplicant";
import { useGetAllTrainings } from "../../hooks/superAdmin/useTraining";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Users,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Calendar,
  Download,
  Filter,
  Activity,
  BarChart3,
  PieChart,
} from "lucide-react";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");

  const { data: jobsData } = useGetAllJobs({ page: 1, limit: 100 });
  const { data: usersData } = useGetAllApplicants({ page: 1, limit: 100 });
  const { data: trainingsData } = useGetAllTrainings({ page: 1, limit: 100 });

  const stats = [
    {
      title: "Total Users",
      value: usersData?.data?.totalUsers || "2,459",
      change: "+12.5%",
      changeType: "positive",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Active Jobs",
      value: jobsData?.data?.totalJobs || "1,247",
      change: "+8.1%",
      changeType: "positive",
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      title: "Training Programs",
      value: trainingsData?.data?.totalTrainings || "89",
      change: "+23.4%",
      changeType: "positive",
      icon: <GraduationCap className="h-4 w-4" />,
    },
    {
      title: "Success Rate",
      value: "87.2%",
      change: "+2.3%",
      changeType: "positive",
      icon: <TrendingUp className="h-4 w-4" />,
    },
  ];

  const timeRangeOptions = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 3 months" },
    { value: "1y", label: "Last year" },
  ];

  const mockChartData = [
    { period: "Jan", users: 400, jobs: 240 },
    { period: "Feb", users: 450, jobs: 280 },
    { period: "Mar", users: 520, jobs: 320 },
    { period: "Apr", users: 580, jobs: 360 },
    { period: "May", users: 640, jobs: 420 },
    { period: "Jun", users: 720, jobs: 480 },
  ];

  const SimpleBarChart = ({ data }) => {
    const maxValue = Math.max(...data.map((d) => Math.max(d.users, d.jobs)));

    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-8 text-sm text-gray-600">{item.period}</div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-20 text-sm">Users</div>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-[#6945ED] h-3 rounded-full"
                    style={{ width: `${(item.users / maxValue) * 100}%` }}
                  ></div>
                </div>
                <div className="w-12 text-sm text-gray-600">{item.users}</div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-20 text-sm">Jobs</div>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-[#10B981] h-3 rounded-full"
                    style={{ width: `${(item.jobs / maxValue) * 100}%` }}
                  ></div>
                </div>
                <div className="w-12 text-sm text-gray-600">{item.jobs}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const SimplePieChart = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm">{item.name}</span>
            </div>
            <div className="text-sm font-medium">
              {item.value}% ({Math.round((item.value / 100) * total)})
            </div>
          </div>
        ))}
      </div>
    );
  };

  const roleDistributionData = [
    { name: "Job Seekers", value: 45, color: "#6945ED" },
    { name: "Recruiters", value: 30, color: "#10B981" },
    { name: "Corporate", value: 20, color: "#F59E0B" },
    { name: "Trainers", value: 5, color: "#EF4444" },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Track system performance and user engagement
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#6945ED]"
          >
            {timeRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-[#6945ED] hover:bg-[#5A3BC7]">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>User Growth Trends</span>
            </CardTitle>
            <CardDescription>
              Monthly growth across users and jobs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleBarChart data={mockChartData} />
          </CardContent>
        </Card>

        {/* Role Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5" />
              <span>User Role Distribution</span>
            </CardTitle>
            <CardDescription>Breakdown of users by their roles</CardDescription>
          </CardHeader>
          <CardContent>
            <SimplePieChart data={roleDistributionData} />
          </CardContent>
        </Card>
      </div>

      {/* System Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Today's Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">New Registrations</span>
                <span className="font-semibold">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Jobs Posted</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Applications Submitted
                </span>
                <span className="font-semibold">89</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Training Enrollments
                </span>
                <span className="font-semibold">7</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Response Time</span>
                <span className="font-semibold text-green-600">234ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Uptime</span>
                <span className="font-semibold text-green-600">99.9%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Sessions</span>
                <span className="font-semibold">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Error Rate</span>
                <span className="font-semibold text-green-600">0.1%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Maintenance
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                User Audit
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                Performance Review
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Application Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Application Metrics Overview</CardTitle>
          <CardDescription>
            Current status of all job applications in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">1,200</div>
              <div className="text-sm text-gray-600">Active Applications</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">800</div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">400</div>
              <div className="text-sm text-gray-600">Rejected</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">300</div>
              <div className="text-sm text-gray-600">Successfully Hired</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
