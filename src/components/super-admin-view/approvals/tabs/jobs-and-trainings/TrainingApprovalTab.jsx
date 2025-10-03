import { useEffect, useState } from "react";
import TrainingsApprovalTable from "./TrainingsApprovalTable";
import Pagination from "@/components/common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "@/components/common/filterComponent";
import { getApprovalFilters } from "../../utils";
import useTrainingsApprovalStore from "./useTrainingsApprovalStore";
import StatusTabs from "../../common/StatusTabs";

const TrainingApprovalTab = () => {
  const {
    filters,
    currentPage,
    loading,
    error,
    setFormData,
    clearAllFilters,
    setCurrentPage,
    handleDeleteTraining,
    getPaginatedTrainings,
    getTotalPages,
    getFilteredCount,
    fetchTrainings,
  } = useTrainingsApprovalStore();

  const [activeStatus, setActiveStatus] = useState("pending");

  // Handle status change
  const handleStatusChange = (status) => {
    setActiveStatus(status);
    setFormData({ status });
    setCurrentPage(1);
  };

  // Fetch trainings on component mount and when status changes
  useEffect(() => {
    fetchTrainings();
  }, [fetchTrainings, activeStatus]);

  // Get computed data
  const paginatedTrainings = getPaginatedTrainings();
  const totalPages = getTotalPages();
  const filteredCount = getFilteredCount();

  return (
    <div className="w-full grid grid-rows-[auto_auto_1fr] gap-6 min-h-0">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Training Approvals</h1>
        <StatusTabs
          activeStatus={activeStatus}
          onStatusChange={handleStatusChange}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-800 font-medium">
            Error loading trainings
          </div>
          <div className="text-red-600 text-sm">{error}</div>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[256px_1fr] gap-6 min-h-0">
        {/* Filters Section */}
        <div className="bg-white rounded-lg border p-4 min-h-[400px]">
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
              formControls={getApprovalFilters("trainings")}
              formData={filters}
              setFormData={setFormData}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-rows-[auto_auto_1fr_auto] gap-6 min-h-0">
          {/* Header Actions */}
          <div className="flex justify-between items-center min-w-0">
            <div className="max-w-sm w-full">
              <SearchComponent
                value={filters.search}
                onChange={(e) => setFormData({ search: e.target.value })}
              />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-8 min-h-[400px]">
              <div className="text-gray-500">Loading trainings...</div>
            </div>
          )}

          {/* Trainings Table Container with horizontal scroll */}
          {!loading && (
            <div className="w-full overflow-x-auto min-h-[300px]">
              <div className="min-w-[1200px]">
                <TrainingsApprovalTable
                  paginatedTrainings={paginatedTrainings}
                  handleDeleteTraining={handleDeleteTraining}
                  onRevalidate={fetchTrainings}
                />
              </div>
            </div>
          )}

          {/* Pagination */}
          {!loading && filteredCount > 0 && (
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

export default TrainingApprovalTab;
