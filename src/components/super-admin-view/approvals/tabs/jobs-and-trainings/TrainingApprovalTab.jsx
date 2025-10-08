import { useEffect, useState } from "react";
import TrainingsApprovalTable from "./TrainingsApprovalTable";
import Pagination from "@/components/common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "@/components/common/filterComponent";
import { getApprovalFilters } from "../../utils";
import { useGetApprovalsTrainings } from "../../../../../hooks/super-admin/useApprovals";
import StatusTabs from "../../common/StatusTabs";
import ErrorDisplay from "../../../../common/ErrorDisplay";

const TrainingApprovalTab = ({ onError }) => {
  const [activeStatus, setActiveStatus] = useState("pending");

  // Filter state
  const [filters, setFilters] = useState({
    search: "",
    status: "pending",
    dateFrom: null,
    dateTo: null,
    sortBy: "submittedAt",
    sortOrder: "desc",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Query parameters
  const queryParams = {
    page: currentPage,
    limit: itemsPerPage,
    search: filters.search,
    status: filters.status,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
    ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
    ...(filters.dateTo && { dateTo: filters.dateTo }),
  };

  // Use query hook for data fetching
  const { data, isLoading, error, refetch } =
    useGetApprovalsTrainings(queryParams);

  // Process the data
  const trainings =
    data?.data?.data?.approvals?.map((approval) => {
      const training = approval.data || {};
      return {
        id: approval._id,
        trainingId: training._id,
        title: training.title || "N/A",
        trainer: training.trainer || "N/A",
        category: training.category || "N/A",
        duration: training.duration || "N/A",
        level: training.level || "N/A",
        postedDate: training.postedDate || approval.createdAt,
        approvalStatus: approval.status || "pending",
        // Additional API fields
        _id: approval._id,
        createdAt: approval.createdAt,
        updatedAt: approval.updatedAt,
        // Approval specific fields
        applicantId: approval.applicantId,
        applicantType: approval.applicantType,
        submittedAt: approval.submittedAt,
        data: training,
      };
    }) || [];

  const totalCount = data?.data?.pagination?.total || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Notify parent about error state
  useEffect(() => {
    onError?.(!!error);
  }, [error, onError]);

  // Handle status change
  const handleStatusChange = (status) => {
    setActiveStatus(status);
    setFilters((prev) => ({ ...prev, status }));
    setCurrentPage(1);
  };

  // Handle form data updates
  const setFormData = (newFormData) => {
    setFilters((prev) => {
      const updatedFilters =
        typeof newFormData === "function"
          ? newFormData(prev)
          : { ...prev, ...newFormData };
      return updatedFilters;
    });
    setCurrentPage(1);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      search: "",
      status: "pending",
      dateFrom: null,
      dateTo: null,
      sortBy: "submittedAt",
      sortOrder: "desc",
    });
    setCurrentPage(1);
  };

  // Handle delete training
  const handleDeleteTraining = async (trainingId) => {
    // Implementation for deleting a training
    // Add actual delete logic here
  };

  // Computed values
  const filteredCount = totalCount;

  return (
    <div className="w-full grid grid-rows-[auto_auto_1fr] gap-6 min-h-0">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Training Approvals</h1>
        {!error && (
          <StatusTabs
            activeStatus={activeStatus}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      {/* Error Message */}
      {error && <ErrorDisplay error={error} title="Error loading trainings" />}

      {/* Show content only when there's no error */}
      {!error && (
        <>
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
              {isLoading && (
                <div className="flex justify-center items-center py-8 min-h-[400px]">
                  <div className="text-gray-500">Loading trainings...</div>
                </div>
              )}

              {/* Trainings Table Container with horizontal scroll */}
              {!isLoading && (
                <div className="w-full overflow-x-auto min-h-[300px]">
                  <div className="min-w-[1200px]">
                    <TrainingsApprovalTable
                      paginatedTrainings={trainings}
                      handleDeleteTraining={handleDeleteTraining}
                      onRevalidate={refetch}
                    />
                  </div>
                </div>
              )}

              {/* Pagination */}
              {!isLoading && filteredCount > 0 && (
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
        </>
      )}
    </div>
  );
};

export default TrainingApprovalTab;
