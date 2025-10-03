import { useEffect, useState } from "react";
import CandidatesTable from "./CandidatesTable";
import Pagination from "@/components/common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "@/components/common/filterComponent";
import { candidatesFilters } from "./utils";
import useCandidatesStore from "./zustand";
import { useDebounce } from "@/hooks/common/useDebounce";

const CandidatesTab = () => {
  const {
    filters,
    currentPage,
    loading,
    error,
    setFormData,
    setSearchData,
    clearAllFilters,
    setCurrentPage,
    handleDeleteCandidate,
    getPaginatedCandidates,
    getTotalPages,
    getFilteredCount,
    fetchCandidates,
  } = useCandidatesStore();

  // Local search state for debouncing
  const [searchText, setSearchText] = useState(filters.search || "");

  // Debounce search text
  const debouncedSearch = useDebounce(searchText, 500);

  // Sync debounced search to filters
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      setSearchData({ search: debouncedSearch });
    }
  }, [debouncedSearch, filters.search, setSearchData]);

  // Sync filters.search to searchText on mount and when filters change externally
  useEffect(() => {
    if (filters.search !== searchText) {
      setSearchText(filters.search);
    }
  }, [filters.search]);

  // Fetch candidates on component mount
  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  // Get computed data
  const paginatedCandidates = getPaginatedCandidates();
  const totalPages = getTotalPages();
  const filteredCount = getFilteredCount();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Candidates</h1>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-800 font-medium">
            Error loading candidates
          </div>
          <div className="text-red-600 text-sm">{error}</div>
        </div>
      )}

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
                formControls={candidatesFilters}
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
            <SearchComponent value={searchText} handleSearch={setSearchText} />
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500">Loading candidates...</div>
            </div>
          )}

          {/* Candidates Table */}
          {!loading && (
            <CandidatesTable
              paginatedCandidates={paginatedCandidates}
              handleDeleteCandidate={handleDeleteCandidate}
            />
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

export default CandidatesTab;
