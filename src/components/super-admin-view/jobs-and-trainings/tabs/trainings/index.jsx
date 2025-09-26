import TrainingsTable from "./TrainingsTable";
import Pagination from "../../../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../../../common/filterComponent";
import { jobsAndTrainingsFilters } from "../../utils";
import { useGetTrainingsApplications } from "../../../../../hooks/superAdmin/useTraining";
import { useState, useMemo } from "react";

const TrainingsTab = () => {
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

  // Fetch trainings applications data
  const {
    data: trainingsData,
    isLoading,
    error,
  } = useGetTrainingsApplications({
    page: currentPage,
    limit: itemsPerPage,
    ...filters,
  });

  // Filter trainings based on current filters
  const filteredTrainings = useMemo(() => {
    if (!trainingsData?.data?.applications) return [];

    return trainingsData.data.applications.filter((training) => {
      // Search filter
      if (
        filters.search &&
        !training.name?.toLowerCase().includes(filters.search.toLowerCase()) &&
        !training.company?.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Status filter
      if (
        filters.status.length > 0 &&
        !filters.status.includes(training.status)
      ) {
        return false;
      }

      // Location filter
      if (
        filters.location.length > 0 &&
        !filters.location.some((loc) =>
          training.location?.toLowerCase().includes(loc.toLowerCase())
        )
      ) {
        return false;
      }

      // Company filter
      if (
        filters.company.length > 0 &&
        !filters.company.some((comp) =>
          training.company?.toLowerCase().includes(comp.toLowerCase())
        )
      ) {
        return false;
      }

      // Industry filter
      if (
        filters.industry.length > 0 &&
        !filters.industry.includes(training.industry)
      ) {
        return false;
      }

      // Posted date filter
      if (filters.postedDate) {
        const trainingDate = new Date(training.postedDate);
        const filterDate = new Date(filters.postedDate);
        if (trainingDate.toDateString() !== filterDate.toDateString()) {
          return false;
        }
      }

      return true;
    });
  }, [trainingsData?.data?.applications, filters]);

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
  const paginatedTrainings = filteredTrainings;
  const totalPages = trainingsData?.data?.pagination?.totalPages || 0;
  const filteredCount = trainingsData?.data?.pagination?.totalApplications || 0;

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6 min-w-0">
        <h1 className="text-2xl font-bold">Trainings</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">Loading trainings...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6 min-w-0">
        <h1 className="text-2xl font-bold">Trainings</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-500">
            Error loading trainings: {error.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 min-w-0">
      <h1 className="text-2xl font-bold">Trainings</h1>

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

          {/* Trainings Table */}
          <div className="min-w-0">
            <TrainingsTable paginatedTrainings={paginatedTrainings} />
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

export default TrainingsTab;
