import CandidatesTable from "./CandidatesTable";
import Pagination from "@/components/common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "@/components/common/filterComponent";
import { candidatesFilters } from "./utils";
import useCandidatesStore from "./zustand";

const CandidatesTab = () => {
  const {
    filters,
    currentPage,
    setFormData,
    clearAllFilters,
    setCurrentPage,
    handleDeleteCandidate,
    getPaginatedCandidates,
    getTotalPages,
    getFilteredCount,
  } = useCandidatesStore();

  // Get computed data
  const paginatedCandidates = getPaginatedCandidates();
  const totalPages = getTotalPages();
  const filteredCount = getFilteredCount();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Candidates</h1>

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
                formControls={candidatesFilters}
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

          {/* Candidates Table Container with horizontal scroll */}
          <div className="min-w-0 overflow-x-auto">
            <CandidatesTable
              paginatedCandidates={paginatedCandidates}
              handleDeleteCandidate={handleDeleteCandidate}
            />
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

export default CandidatesTab;
