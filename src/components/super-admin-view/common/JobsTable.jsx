import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Mock data for jobs
const mockJobsData = [
  {
    id: "JOB001",
    jobTitle: "Senior Frontend Developer",
    appliedAt: "2024-09-10",
    company: "Tech Solutions Inc.",
    location: "San Francisco, CA",
    status: "pending",
  },
  {
    id: "JOB002",
    jobTitle: "Product Manager",
    appliedAt: "2024-09-08",
    company: "InnovateCorp",
    location: "New York, NY",
    status: "approved",
  },
  {
    id: "JOB003",
    jobTitle: "Full Stack Engineer",
    appliedAt: "2024-09-05",
    company: "StartupXYZ",
    location: "Remote",
    status: "rejected",
  },
  {
    id: "JOB004",
    jobTitle: "UX Designer",
    appliedAt: "2024-09-07",
    company: "Design Studio Pro",
    location: "Los Angeles, CA",
    status: "pending",
  },
  {
    id: "JOB005",
    jobTitle: "Data Scientist",
    appliedAt: "2024-09-09",
    company: "DataTech Analytics",
    location: "Chicago, IL",
    status: "approved",
  },
  {
    id: "JOB006",
    jobTitle: "Backend Developer",
    appliedAt: "2024-09-06",
    company: "CloudTech Systems",
    location: "Seattle, WA",
    status: "rejected",
  },
  {
    id: "JOB007",
    jobTitle: "DevOps Engineer",
    appliedAt: "2024-09-04",
    company: "Infrastructure Co.",
    location: "Austin, TX",
    status: "pending",
  },
  {
    id: "JOB008",
    jobTitle: "Mobile App Developer",
    appliedAt: "2024-09-03",
    company: "MobileFirst Solutions",
    location: "Miami, FL",
    status: "approved",
  },
];

const JobsTable = ({ filters = {} }) => {
  const [selectedJobId, setSelectedJobId] = useState("");

  // Filter the jobs based on the provided filters
  const filteredJobs = useMemo(() => {
    return mockJobsData.filter((job) => {
      // Search filter - check job title and company
      const searchTerm = filters.search?.toLowerCase() || "";
      const matchesSearch =
        job.jobTitle.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.id.toLowerCase().includes(searchTerm);

      // Status filter
      const statusFilter = filters.status || "all";
      const matchesStatus =
        statusFilter === "all" || job.status === statusFilter;

      // Location filter
      const locationFilter = filters.location?.toLowerCase() || "";
      const matchesLocation =
        !locationFilter || job.location.toLowerCase().includes(locationFilter);

      // Date filter
      const dateFilter = filters.appliedDate;
      const matchesDate =
        !dateFilter ||
        new Date(job.appliedAt).toDateString() ===
          new Date(dateFilter).toDateString();

      return matchesSearch && matchesStatus && matchesLocation && matchesDate;
    });
  }, [filters]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleRowSelect = (jobId) => {
    setSelectedJobId(jobId);
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {filteredJobs.length} of {mockJobsData.length} jobs
        </div>
        {filteredJobs.length !== mockJobsData.length && (
          <div className="text-sm text-blue-600">Filters applied</div>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Select</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Applied At</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <input
                      type="radio"
                      name="selectCompany"
                      checked={selectedJobId === job.id}
                      onChange={() => handleRowSelect(job.id)}
                      aria-label={`Select company ${job.company}`}
                      className="w-4 h-4 text-primary-purple border-2 border-gray-300 focus:ring-2 focus:ring-primary-purple/50 focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:bg-primary-purple checked:border-primary-purple relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-white before:rounded-full before:opacity-0 checked:before:opacity-100"
                    />
                  </TableCell>
                  <TableCell className="font-mono text-sm">{job.id}</TableCell>
                  <TableCell className="font-medium">{job.jobTitle}</TableCell>
                  <TableCell>{formatDate(job.appliedAt)}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        job.status === "pending"
                          ? "bg-warning2 text-warning1"
                          : job.status === "approved"
                          ? "bg-success2 text-success1"
                          : job.status === "rejected"
                          ? "bg-danger2 text-danger1"
                          : "bg-gray2 text-gray1"
                      } text-sm
                      `}
                    >
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  No jobs found matching your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JobsTable;
