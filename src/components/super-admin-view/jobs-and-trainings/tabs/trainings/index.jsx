import TrainingsTable from "./TrainingsTable";
import Pagination from "../../../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../../../common/filterComponent";
import { jobsAndTrainingsFilters } from "../../utils";
import useTrainingsStore from "./zustand";

const TrainingsTab = () => {
  const {
    filters,
    currentPage,
    setFormData,
    clearAllFilters,
    setCurrentPage,
    getPaginatedTrainings,
    getTotalPages,
    getFilteredCount,
  } = useTrainingsStore();

  // Get computed data
  const paginatedTrainings = getPaginatedTrainings();
  const totalPages = getTotalPages();
  const filteredCount = getFilteredCount();

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
