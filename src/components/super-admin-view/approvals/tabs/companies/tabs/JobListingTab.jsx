import {
  Briefcase,
  Calendar,
  MapPin,
  DollarSign,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const JobListingTab = ({ company }) => {
  // Mock job data - replace with actual API call using company.id
  // Ensure jobs is always an array
  const jobs = Array.isArray(company?.jobs)
    ? company.jobs
    : [
        {
          id: 1,
          title: "Senior Frontend Developer",
          department: "Engineering",
          location: "San Francisco, CA",
          type: "Full-time",
          salary: "$120,000 - $150,000",
          postedDate: "2024-01-15",
          applicants: 45,
          status: "Active",
        },
        {
          id: 2,
          title: "Marketing Manager",
          department: "Marketing",
          location: "Remote",
          type: "Full-time",
          salary: "$80,000 - $100,000",
          postedDate: "2024-01-10",
          applicants: 32,
          status: "Active",
        },
        {
          id: 3,
          title: "Product Designer",
          department: "Design",
          location: "New York, NY",
          type: "Contract",
          salary: "$90,000 - $110,000",
          postedDate: "2024-01-05",
          applicants: 28,
          status: "Closed",
        },
      ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Closed":
        return "bg-red-100 text-red-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Total Jobs</p>
              <p className="text-2xl font-bold">{jobs.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Active Jobs</p>
              <p className="text-2xl font-bold">
                {jobs.filter((job) => job.status === "Active").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-orange-500" />
            <div>
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Total Applicants</p>
              <p className="text-2xl font-bold">
                {jobs.reduce((sum, job) => sum + job.applicants, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-lg">Job Listings</h4>
            <Button variant="purple" size="sm">
              <Briefcase className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Job Title
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Department
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Salary
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Posted Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Applicants
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{job.title}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {job.department}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {job.type}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {job.salary}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(job.postedDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {job.applicants}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {jobs.length === 0 && (
          <div className="p-8 text-center">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No jobs posted yet</p>
            <Button variant="purple" className="mt-4">
              Post Your First Job
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListingTab;
