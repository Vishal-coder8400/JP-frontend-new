import { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const candidates = [
    {
      name: "Heeral Nant",
      role: "Lead Product Designer",
      status: "Shortlisted",
    },
    { name: "Nithya Menon", role: "UI Designer", status: "Rejected" },
    { name: "Nithya Menon", role: "UI Designer", status: "Shortlisted" },
    { name: "Meera Gonzalez", role: "Product Designer", status: "Shortlisted" },
  ];

  const jobPostings = [
    {
      title: "Sr. Product Designer",
      applications: 42,
      status: "Open",
      posted: "10 Mar, 2025",
    },
    {
      title: "Sr. UI/UX Designer",
      applications: 34,
      status: "Open",
      posted: "10 Mar, 2025",
    },
    {
      title: "UX Researcher",
      applications: 34,
      status: "Open",
      posted: "10 Mar, 2025",
    },
    {
      title: "UX Researcher",
      applications: 34,
      status: "Draft",
      posted: "10 Mar, 2025",
    },
    {
      title: "UX Researcher",
      applications: 34,
      status: "Expired",
      posted: "10 Mar, 2025",
    },
  ];
  return (
    <div className="w-full flex flex-col gap-12  min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Main Dashboard</h1>
          <div className="flex gap-6">
            <button className="px-6 py-3 bg-gray-900 text-white rounded-lg flex items-center gap-2 font-semibold hover:bg-gray-800">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Post a New Job
            </button>
            <button className="px-6 py-3 bg-gray-900 text-white rounded-lg flex items-center gap-2 font-semibold hover:bg-gray-800">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Post a New Training
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Enter job title, company, location"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 rounded-full border border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600 text-sm"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Profile Completion */}
        <div className="p-10 bg-white rounded-2xl shadow-sm border border-gray-200 flex gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="text-6xl font-semibold text-gray-900">50%</h2>
            <p className="text-xs font-semibold text-gray-900 opacity-70">
              Of your profile is complete
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Complete your profile to post jobs!
            </h3>
            <div className="flex gap-2">
              <div className="flex-1 h-2 bg-lime-600 rounded-full"></div>
              <div className="flex-1 h-2 bg-lime-600 rounded-full"></div>
              <div className="flex-1 h-2 bg-lime-600 rounded-full"></div>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-2 bg-gray-300 rounded-full"
                ></div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <p className="flex-1 text-xs text-gray-900 opacity-70">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <Link to={"/corporate/profile-setup/final-setup"} className="px-4 py-3 bg-gray-800 text-white rounded-md font-semibold text-xs hover:bg-gray-700">
                Proceed to Complete
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-5 gap-7">
        {[
          { title: "Active Job Listings", value: "15" },
          { title: "Total Applications Received", value: "120" },
          { title: "Shortlisted by Employers", value: "53" },
          { title: "Interviews Scheduled", value: "120" },
          { title: "Hired Candidates", value: "120" },
        ].map((stat, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col gap-4"
          >
            <h4 className="text-sm font-semibold text-gray-900">
              {stat.title}
            </h4>
            <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex gap-12 flex-wrap">
        {/* Left Column - Application Trends & Candidate Pipeline */}
        <div className="flex-1 flex flex-col gap-9 min-w-[400px]">
          {/* Application Trends */}

          {/* Candidate Pipeline */}
          <div className="flex flex-col gap-7">
            <h3 className="text-xl font-semibold text-gray-900">
              Candidate Pipeline Overview
            </h3>
            <div className="grid grid-cols-2 gap-0 border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex flex-col">
                <div className="p-4 bg-gray-50 flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-xs font-semibold text-gray-900">
                    Candidates
                  </span>
                </div>
                {candidates.map((candidate, index) => (
                  <div
                    key={index}
                    className="p-4 flex items-center gap-2 hover:bg-gray-50"
                  >
                    <input type="checkbox" className="w-4 h-4" />
                    <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-800">
                        {candidate.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {candidate.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="p-4 bg-gray-50">
                  <span className="text-xs font-semibold text-gray-900">
                    Status
                  </span>
                </div>
                {candidates.map((candidate, index) => (
                  <div key={index} className="p-4 flex items-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        candidate.status === "Shortlisted"
                          ? "bg-lime-100 text-lime-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {candidate.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Hiring Pipeline & Job Postings */}
        <div className="w-[571px] flex flex-col gap-9">
          {/* Hiring Pipeline */}
          <div className="p-6 bg-white rounded-lg border border-gray-200 flex flex-col gap-4">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                Hiring Pipeline
              </h3>
              <span className="text-xs font-medium text-gray-500 cursor-pointer hover:underline">
                View All
              </span>
            </div>
            <hr className="border-gray-200" />
            <div className="grid grid-cols-6 gap-3 text-xs font-medium text-gray-500">
              <span>Jobs</span>
              <span>Applied</span>
              <span>Screening</span>
              <span>Interview</span>
              <span>Task</span>
              <span>Hired</span>
            </div>
            <div className="flex flex-col gap-4">
              {[
                {
                  title: "Sr. Product Designer",
                  stats: [34, 80, 0, 0, 0],
                  applied: 122,
                },
                {
                  title: "Sr. UI/UX Designer",
                  stats: [34, 80, 80, 0, 0],
                  applied: 92,
                },
                {
                  title: "UX Researcher",
                  stats: [34, 34, 80, 0, 0],
                  applied: 192,
                },
              ].map((job, index) => (
                <div key={index} className="flex items-center gap-8">
                  <div className="w-40 flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-gray-900">
                      {job.title}
                    </span>
                    <span className="px-1.5 py-0.5 bg-violet-100 text-violet-500 text-xs font-medium rounded">
                      {job.applied} applied
                    </span>
                  </div>
                  <div className="flex gap-3">
                    {job.stats.map((stat, i) => (
                      <div
                        key={i}
                        className={`w-14 h-10 flex items-center justify-center rounded-md text-xs font-medium ${
                          stat > 0
                            ? "bg-indigo-50 text-indigo-700"
                            : "bg-gray-50"
                        }`}
                      >
                        {stat > 0 ? stat : ""}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Job Postings Management */}
          <div className="p-6 bg-white rounded-lg border border-gray-200 flex flex-col gap-4">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                Job Postings Management
              </h3>
              <span className="text-xs font-medium text-gray-500 cursor-pointer hover:underline">
                View All
              </span>
            </div>
            <hr className="border-gray-200" />
            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col gap-6">
                <span className="text-xs font-medium text-gray-500">Jobs</span>
                {jobPostings.map((job, index) => (
                  <span
                    key={index}
                    className="text-sm font-medium text-gray-900"
                  >
                    {job.title}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-5">
                <span className="text-xs font-medium text-gray-500">
                  Applications
                </span>
                {jobPostings.map((job, index) => (
                  <div
                    key={index}
                    className="w-14 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600 text-center"
                  >
                    {job.applications}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-5">
                <span className="text-xs font-medium text-gray-500">
                  Status
                </span>
                {jobPostings.map((job, index) => (
                  <div
                    key={index}
                    className={`w-14 py-1 rounded text-xs font-medium text-center ${
                      job.status === "Open"
                        ? "bg-green-100 text-green-600"
                        : job.status === "Draft"
                        ? "bg-yellow-50 text-orange-400"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {job.status}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-5">
                <span className="text-xs font-medium text-gray-500">
                  Posted On
                </span>
                {jobPostings.map((job, index) => (
                  <div
                    key={index}
                    className="w-full py-1 bg-gray-100 rounded text-xs font-medium text-gray-600 text-center"
                  >
                    {job.posted}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
