import JobsTable from "../../../common/JobsTable";
import Pagination from "../../../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../../../common/filterComponent";
import { jobsAndTrainingsFilters } from "../../utils";
import { useGetAllJobs } from "../../../../../hooks/super-admin/useJob";
import { useState } from "react";
import ErrorDisplay from "@/components/common/ErrorDisplay";

const JobsTab = () => {
  const [filters, setFilters] = useState({
    search: "",
    status: ["active"], // Only fetch active jobs in database context
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

  // Prepare API parameters - send arrays as comma-separated strings or single values
  const apiParams = {
    page: currentPage,
    limit: itemsPerPage,
    search: filters.search,
    // Convert arrays to comma-separated strings or single values
    jobType: Array.isArray(filters.jobType)
      ? filters.jobType.join(",")
      : filters.jobType,
    experienceLevel: Array.isArray(filters.experienceLevel)
      ? filters.experienceLevel.join(",")
      : filters.experienceLevel,
    city: Array.isArray(filters.city) ? filters.city.join(",") : filters.city,
    state: Array.isArray(filters.state)
      ? filters.state.join(",")
      : filters.state,
    modeOfWork: Array.isArray(filters.modeOfWork)
      ? filters.modeOfWork.join(",")
      : filters.modeOfWork,
    genderPreference: Array.isArray(filters.genderPreference)
      ? filters.genderPreference.join(",")
      : filters.genderPreference,
    isWalkInInterview: Array.isArray(filters.isWalkInInterview)
      ? filters.isWalkInInterview.join(",")
      : filters.isWalkInInterview,
    // Send status as a simple string
    status: "active",
  };

  // Fetch jobs data
  const { data: jobsData, isLoading, error } = useGetAllJobs(apiParams);

  // Jobs are already filtered from backend
  const jobs = jobsData?.data?.data?.jobs || [];

  const setFormData = (newFilters) => {
    setFilters((prev) => {
      // Handle both function updates (from MultiSelectFilter) and object updates (from other components)
      const updatedFilters =
        typeof newFilters === "function"
          ? newFilters(prev)
          : { ...prev, ...newFilters };

      // Ensure status always includes "active" for database context
      if (updatedFilters.status !== undefined) {
        const statusArray = Array.isArray(updatedFilters.status)
          ? updatedFilters.status
          : [updatedFilters.status];

        // If status filter is being modified, ensure "active" is always included
        if (statusArray.length > 0 && !statusArray.includes("active")) {
          updatedFilters.status = ["active"];
        }
      }

      return updatedFilters;
    });
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearAllFilters = () => {
    setFilters({
      search: "",
      status: ["active"], // Always keep active status when clearing filters
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
        <ErrorDisplay error={error} title="Error loading jobs" />
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
            <JobsTable paginatedJobs={jobs} context="database" />
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
