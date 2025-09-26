import JobsTable from "./JobsTable";
import Pagination from "../../../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../../../common/filterComponent";
import { jobsAndTrainingsFilters } from "../../utils";
import { useGetJobsApplications } from "../../../../../hooks/superAdmin/useJob";
import { useState, useMemo } from "react";

const JobsTab = () => {
  const [filters, setFilters] = useState({
    search: "",
    status: [],
    postedDate: null,
    location: [],
    company: [],
    industry: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch jobs applications data
  const {
    data: jobsData,
    isLoading,
    error,
  } = useGetJobsApplications({
    page: currentPage,
    limit: itemsPerPage,
    ...filters,
  });

  // Filter jobs based on current filters
  const filteredJobs = useMemo(() => {
    if (!jobsData?.data?.applications) return [];

    return jobsData.data.applications.filter((job) => {
      // Search filter
      if (
        filters.search &&
        !job.name?.toLowerCase().includes(filters.search.toLowerCase()) &&
        !job.company?.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(job.status)) {
        return false;
      }

      // Location filter
      if (
        filters.location.length > 0 &&
        !filters.location.some((loc) =>
          job.location?.toLowerCase().includes(loc.toLowerCase())
        )
      ) {
        return false;
      }

      // Company filter
      if (
        filters.company.length > 0 &&
        !filters.company.some((comp) =>
          job.company?.toLowerCase().includes(comp.toLowerCase())
        )
      ) {
        return false;
      }

      // Industry filter
      if (
        filters.industry.length > 0 &&
        !filters.industry.includes(job.industry)
      ) {
        return false;
      }

      // Posted date filter
      if (filters.postedDate) {
        const jobDate = new Date(job.postedDate);
        const filterDate = new Date(filters.postedDate);
        if (jobDate.toDateString() !== filterDate.toDateString()) {
          return false;
        }
      }

      return true;
    });
  }, [jobsData?.data?.applications, filters]);

  const setFormData = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearAllFilters = () => {
    setFilters({
      search: "",
      status: [],
      postedDate: null,
      location: [],
      company: [],
      industry: [],
    });
    setCurrentPage(1);
  };

  // Use server-side pagination data from API
  const paginatedJobs = filteredJobs;
  const totalPages = jobsData?.data?.pagination?.totalPages || 0;
  const filteredCount = jobsData?.data?.pagination?.totalApplications || 0;

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6 min-w-0">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">Loading jobs...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6 min-w-0">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-500">
            Error loading jobs: {error.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 min-w-0">
      <h1 className="text-2xl font-bold">Jobs</h1>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-6 min-w-0">
        {/* Filters Section */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg border p-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="text-lg text-[#171923] font-semibold">
                  Filters
                </div>
                <div
                  onClick={clearAllFilters}
                  className="text-[#3F93FF] text-sm font-medium cursor-pointer hover:underline"
                >
                  Clear All
                </div>
              </div>
              <FilterComponent
                formControls={jobsAndTrainingsFilters}
                formData={filters}
                setFormData={setFormData}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6 min-w-0">
          {/* Header Actions */}
          <div className="flex justify-between items-center">
            <SearchComponent
              value={filters.search}
              onChange={(e) => setFormData({ search: e.target.value })}
            />
          </div>

          {/* Jobs Table */}
          <div className="min-w-0">
            <JobsTable paginatedJobs={paginatedJobs} />
          </div>

          {/* Pagination */}
          {filteredCount > 0 && (
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsTab;
