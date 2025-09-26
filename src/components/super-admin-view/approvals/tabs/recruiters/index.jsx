import { useEffect } from "react";
import RecruiterDetails from "./RecruiterDetails";

import RecruitersTable from "./RecruitersTable";
import Pagination from "../../../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../../../common/filterComponent";
import { recruitersFilters } from "./utils";
import useRecruitersStore from "./zustand";

const RecruitersTab = () => {
  const {
    filters,
    currentPage,
    loading,
    error,
    setFormData,
    clearAllFilters,
    setCurrentPage,
    handleDeleteRecruiter,
    getPaginatedRecruiters,
    getTotalPages,
    getFilteredCount,
    fetchRecruiters,
  } = useRecruitersStore();

  // Fetch recruiters on component mount
  useEffect(() => {
    fetchRecruiters();
  }, [fetchRecruiters]);

  // Get computed data
  const paginatedRecruiters = getPaginatedRecruiters();
  const totalPages = getTotalPages();
  const filteredCount = getFilteredCount();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Recruiters</h1>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-800 font-medium">
            Error loading recruiters
          </div>
          <div className="text-red-600 text-sm">{error}</div>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-6 min-h-0">
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
                formControls={recruitersFilters}
                formData={filters}
                setFormData={setFormData}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-6">
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
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500">Loading recruiters...</div>
            </div>
          )}

          {/* Recruiters Table Container with horizontal scroll */}
          {!loading && (
            <div className="min-w-0 overflow-x-auto">
              <RecruitersTable
                paginatedRecruiters={paginatedRecruiters}
                handleDeleteRecruiter={handleDeleteRecruiter}
              />
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

export default RecruitersTab;
