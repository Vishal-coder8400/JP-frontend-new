import { useEffect, useState } from "react";
import CandidatesTable from "./CandidatesTable";
import Pagination from "@/components/common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "@/components/common/filterComponent";
import { candidatesFilters } from "./utils";
import { useGetDatabaseCandidates } from "../../../../../hooks/super-admin/useDatabase";
import useDatabaseUIStore from "../../../../../stores/useDatabaseUIStore";
import { useDebounce } from "@/hooks/common/useDebounce";
import ErrorDisplay from "@/components/common/ErrorDisplay";

const CandidatesTab = () => {
  // Use UI store for filters and pagination
  const databaseUIStore = useDatabaseUIStore();
  const {
    filters,
    currentPage,
    setFilters: setFormData,
    setCurrentPage,
    clearFilters: clearAllFilters,
  } = databaseUIStore.candidates;

  // Local search state for debouncing
  const [searchText, setSearchText] = useState(filters.search || "");

  // Debounce search text
  const debouncedSearch = useDebounce(searchText, 500);

  // Helper function to safely join array filters
  const safeJoin = (value) => {
    return Array.isArray(value) ? value.join(",") : value;
  };

  // Sync debounced search to filters
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      setFormData({ search: debouncedSearch });
    }
  }, [debouncedSearch, filters.search, setFormData]);

  // Sync filters.search to searchText on mount and when filters change externally
  useEffect(() => {
    if (filters.search !== searchText) {
      setSearchText(filters.search);
    }
  }, [filters.search]);

  // Use React Query for API calls
  const {
    data: candidatesData,
    isLoading,
    error,
  } = useGetDatabaseCandidates({
    page: currentPage,
    limit: 10,
    search: filters.search,
    status: safeJoin(filters.status),
    industry: safeJoin(filters.industry),
    location: safeJoin(filters.location),
    experience: safeJoin(filters.experience),
    education: safeJoin(filters.education),
    skills: safeJoin(filters.skills),
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  });

  // Get computed data from React Query
  const paginatedCandidates = candidatesData?.data?.data?.candidates || [];
  const totalPages = candidatesData?.data?.pagination?.totalPages || 0;
  const filteredCount = candidatesData?.data?.pagination?.total || 0;

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Candidates</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading candidates...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Candidates</h1>
        <ErrorDisplay error={error} title="Error loading candidates" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Candidates</h1>

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

          {/* Candidates Table */}
          <CandidatesTable
            paginatedCandidates={paginatedCandidates}
            handleDeleteCandidate={null} // No delete functionality
          />

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

export default CandidatesTab;
