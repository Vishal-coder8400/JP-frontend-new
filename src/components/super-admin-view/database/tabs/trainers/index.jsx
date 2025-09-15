import TrainersTable from "./TrainersTable";
import Pagination from "../../../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../../../common/filterComponent";
import { trainersFilters } from "./utils";
import useTrainersStore from "./zustand";

const TrainersTab = () => {
  const {
    filters,
    currentPage,
    setFormData,
    clearAllFilters,
    setCurrentPage,
    handleDeleteTrainer,
    getPaginatedTrainers,
    getTotalPages,
    getFilteredCount,
  } = useTrainersStore();

  // Get computed data
  const paginatedTrainers = getPaginatedTrainers();
  const totalPages = getTotalPages();
  const filteredCount = getFilteredCount();

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
          <TrainersTable
            paginatedTrainers={paginatedTrainers}
            handleDeleteTrainer={handleDeleteTrainer}
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

export default TrainersTab;
