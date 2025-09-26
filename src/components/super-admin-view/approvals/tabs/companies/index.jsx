import { useEffect } from "react";
import CompaniesTable from "./CompaniesTable";
import Pagination from "../../../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../../../common/filterComponent";
import { companiesFilters } from "./utils";
import useCompaniesStore from "./zustand";

const CompaniesTab = () => {
  const {
    filters,
    currentPage,
    loading,
    error,
    setFormData,
    clearAllFilters,
    setCurrentPage,
    handleDeleteCompany,
    getPaginatedCompanies,
    getTotalPages,
    getFilteredCount,
    fetchCompanies,
  } = useCompaniesStore();

  // Fetch companies on component mount
  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // Get computed data
  const paginatedCompanies = getPaginatedCompanies();
  const totalPages = getTotalPages();
  const filteredCount = getFilteredCount();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Companies</h1>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-800 font-medium">
            Error loading companies
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
                formControls={companiesFilters}
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
              <div className="text-gray-500">Loading companies...</div>
            </div>
          )}

          {/* Companies Table Container with horizontal scroll */}
          {!loading && (
            <div className="min-w-0 overflow-x-auto">
              <CompaniesTable
                paginatedCompanies={paginatedCompanies}
                handleDeleteCompany={handleDeleteCompany}
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

export default CompaniesTab;
