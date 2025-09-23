import { TrainersTable } from "../../../common/trainers";
import Pagination from "../../../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../../../common/filterComponent";
import { trainersFilters } from "./utils";
import { useState } from "react";
import { useGetAllTrainers } from "@/hooks/superAdmin/useTrainers";

const TrainersTab = () => {
  // Local state for filters and pagination
  const [filters, setFilters] = useState({
    search: "",
    skills: [],
    industry: [],
    experience: [],
    location: [],
    status: "active",
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch trainers data directly from API
  const { data, isLoading, error } = useGetAllTrainers();

  // Get trainers and pagination data from API response
  const trainers = data?.data?.data?.trainers || [];
  const totalCount = data?.data?.data?.pagination?.totalTrainers || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Handle filter updates
  const setFormData = (newFormData) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...(typeof newFormData === "function"
        ? newFormData(prevFilters)
        : newFormData),
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      search: "",
      skills: [],
      industry: [],
      experience: [],
      location: [],
      status: "active",
      sortBy: "createdAt",
      sortOrder: "desc",
    });
    setCurrentPage(1);
  };

  // Handle delete trainer (placeholder - implement actual delete logic)
  const handleDeleteTrainer = (trainer) => {
    // TODO: Implement actual delete logic here
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Trainers</h1>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
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
                formControls={trainersFilters}
                formData={filters}
                setFormData={setFormData}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Header Actions */}
          <div className="flex justify-between items-center">
            <SearchComponent
              value={filters.search}
              onChange={(e) => setFormData({ search: e.target.value })}
            />
          </div>

          {/* Trainers Table */}
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500">Loading trainers...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-red-500">
                Error loading trainers: {error.message}
              </div>
            </div>
          ) : (
            <TrainersTable
              paginatedTrainers={trainers}
              showStatusColumn={false}
              areApprovalBtnsVisible={false}
            />
          )}

          {/* Pagination */}
          {totalCount > 0 && (
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

export default TrainersTab;
