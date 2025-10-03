import JobsTable from "./JobsTable";
import Pagination from "../../../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../../../common/filterComponent";
import { jobsAndTrainingsFilters } from "../../utils";
import { useGetAllJobs } from "../../../../../hooks/super-admin/useJob";
import { useState } from "react";

const JobsTab = () => {
  const [filters, setFilters] = useState({
    search: "",
    status: [],
    jobType: [],
    experienceLevel: [],
    city: [],
    state: [],
    modeOfWork: [],
    genderPreference: [],
    isWalkInInterview: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch jobs data
  const {
    data: jobsData,
    isLoading,
    error,
  } = useGetAllJobs({
    page: currentPage,
    limit: itemsPerPage,
    ...filters,
  });

  // Jobs are already filtered from backend
  const jobs = jobsData?.data?.data?.jobs || [];

  const setFormData = (newFilters) => {
    setFilters((prev) => {
      // Handle both function updates (from MultiSelectFilter) and object updates (from other components)
      return typeof newFilters === "function"
        ? newFilters(prev)
        : { ...prev, ...newFilters };
    });
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearAllFilters = () => {
    setFilters({
      search: "",
      status: [],
      jobType: [],
      experienceLevel: [],
      city: [],
      state: [],
      modeOfWork: [],
      genderPreference: [],
      isWalkInInterview: [],
    });
    setCurrentPage(1);
  };

  // Use server-side pagination data from API
  const totalPages = jobsData?.data?.pagination?.totalPages || 0;
  const filteredCount = jobsData?.data?.pagination?.totalJobs || 0;

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
            <JobsTable paginatedJobs={jobs} />
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
