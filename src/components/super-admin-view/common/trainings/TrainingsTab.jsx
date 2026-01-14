import TrainingsTable from "./TrainingsTable";
import Pagination from "../../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../../common/filterComponent";
import { createApprovalFilters } from "@/config/super-admin/filters";
import { useGetAllTrainings } from "../../../../hooks/super-admin/useTraining";
import { useGetApprovalsTrainings } from "../../../../hooks/super-admin/useApprovals";
import { useState, useEffect, useMemo } from "react";
import ErrorDisplay from "@/components/common/ErrorDisplay";
import { useDebounce } from "@/hooks/common/useDebounce";
import { STATUS_OPTIONS, APPLICATION_STAGES } from "@/constants/super-admin";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusTabs from "../../approvals/common/StatusTabs";

const TrainingsTab = ({ context = "database" }) => {
  const [activeStatus, setActiveStatus] = useState("pending");
  const [filters, setFilters] = useState(() => {
    if (context === "approvals") {
      return {
        search: "",
        status: "pending",
        dateRange: { from: null, to: null },
        sortBy: "submittedAt",
        sortOrder: "desc",
      };
    }
    return {
      search: "",
      status: "active",
      stage: "",
      dateRange: { from: null, to: null },
    };
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Local search state for debouncing
  const [searchText, setSearchText] = useState(filters.search || "");

  // Debounce search text
  const debouncedSearch = useDebounce(searchText, 500);

  // Sync debounced search to filters
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      setFilters((prev) => ({ ...prev, search: debouncedSearch }));
      setCurrentPage(1);
    }
  }, [debouncedSearch, filters.search]);

  // Sync filters.search to searchText on mount and when filters change externally
  useEffect(() => {
    if (filters.search !== searchText) {
      setSearchText(filters.search);
    }
  }, [filters.search]);

  // Fetch trainings data - use different hooks based on context
  const apiParams = {
    page: currentPage,
    limit: itemsPerPage,
    search: filters.search,
    status: filters.status,
    stage: context === "database" ? filters.stage : undefined,
    dateFrom: filters.dateRange?.from || undefined,
    dateTo: filters.dateRange?.to || undefined,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  };

  const databaseQuery = useGetAllTrainings(apiParams);
  const approvalsQuery = useGetApprovalsTrainings({
    ...apiParams,
    enabled: context === "approvals",
  });

  const {
    data: trainingsData,
    isLoading,
    error,
    refetch,
  } = context === "approvals" ? approvalsQuery : databaseQuery;

  const handleStatusChange = (status) => {
    setActiveStatus(status);
    setFormData({ status });
  };

  const setFormData = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchText("");
    if (context === "approvals") {
      setFilters({
        search: "",
        status: "pending",
        dateRange: { from: null, to: null },
        sortBy: "submittedAt",
        sortOrder: "desc",
      });
    } else {
      setFilters({
        search: "",
        status: "active",
        stage: "",
        dateRange: { from: null, to: null },
      });
    }
    setCurrentPage(1);
  };

  const getFilterConfig = () => {
    if (context === "approvals") {
      return createApprovalFilters("trainings");
    }
    return null;
  };

  // Process trainings data based on context
  const paginatedTrainings = useMemo(() => {
    if (context === "approvals") {
      const approvals = trainingsData?.data?.approvals || [];
      return approvals.map((approval) => {
        const training = approval.data || {};
        return {
          ...training,
          _id: approval._id,
          trainingId: training._id,
          title: training.title || "N/A",
          trainer: training.trainer?.name || "N/A",
          category: training.category || "N/A",
          duration: training.duration || "N/A",
          company:
            training.postedBy?.companyName || training.postedBy?.name || "N/A",
          createdAt: approval.createdAt,
          approvalStatus: approval.status,
        };
      });
    }
    return trainingsData?.data?.trainings || [];
  }, [trainingsData, context]);

  // Use server-side pagination data from API
  const totalPages =
    context === "approvals"
      ? trainingsData?.data?.pagination?.totalPages || 0
      : trainingsData?.data?.pagination?.totalPages || 0;
  const filteredCount =
    context === "approvals"
      ? trainingsData?.data?.pagination?.totalApprovals || 0
      : trainingsData?.data?.pagination?.totalTrainings || 0;

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6 min-w-0">
        <h1 className="text-2xl font-bold">Trainings</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">Loading trainings...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6 min-w-0">
        <h1 className="text-2xl font-bold">Trainings</h1>
        <ErrorDisplay error={error} title="Error loading trainings" />
      </div>
    );
  }

  return (
    <div className="h-full space-y-6">
      {/* Header - auto height */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Trainings</h1>
        {context === "approvals" && (
          <StatusTabs
            activeStatus={activeStatus}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      {/* Content - filters + table using flex layout */}
      <div className="flex gap-6 min-h-0 min-w-0">
        {/* Filters - left sidebar */}
        <div className="w-64 flex-shrink-0">
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

              {context === "approvals" ? (
                <FilterComponent
                  formControls={getFilterConfig()}
                  formData={filters}
                  setFormData={setFormData}
                />
              ) : (
                <div className="flex flex-col gap-[23px]">
                  {/* Status Filter */}
                  <div className="flex flex-col gap-[10px]">
                    <Label className="text-base text-[#A0AEC0] font-medium">
                      Status
                    </Label>
                    <Select
                      value={filters.status}
                      onValueChange={(value) => setFormData({ status: value })}
                    >
                      <SelectTrigger className="focus-visible:ring-0 data-[placeholder]:text-sm w-full rounded-[4px] data-[placeholder]:text-[#655F5F] px-[10px] py-[6px] text-sm cursor-pointer">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {STATUS_OPTIONS.general.map((status) => (
                          <SelectItem
                            key={status.id}
                            value={status.id}
                            className="cursor-pointer"
                          >
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Stage Filter */}
                  <div className="flex flex-col gap-[10px]">
                    <Label className="text-base text-[#A0AEC0] font-medium">
                      Stage
                    </Label>
                    <Select
                      value={filters.stage}
                      onValueChange={(value) => setFormData({ stage: value })}
                    >
                      <SelectTrigger className="focus-visible:ring-0 data-[placeholder]:text-sm w-full rounded-[4px] data-[placeholder]:text-[#655F5F] px-[10px] py-[6px] text-sm cursor-pointer">
                        <SelectValue placeholder="Select Stage" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {APPLICATION_STAGES.map((stage) => (
                          <SelectItem
                            key={stage.id}
                            value={stage.id}
                            className="cursor-pointer"
                          >
                            {stage.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main content - right area */}
        <div className="flex-1 min-w-0 flex flex-col gap-6 min-h-0 w-full">
          <div className="w-full">
            <SearchComponent
              value={searchText}
              handleSearch={setSearchText}
              placeholder={
                context === "database"
                  ? "Search by training title, trainer, category"
                  : "Search by company, name, email, title"
              }
            />
          </div>
          <div className="flex-1 min-w-0 overflow-x-auto w-full">
            <TrainingsTable
              paginatedTrainings={paginatedTrainings}
              context={context}
              onRevalidate={refetch}
            />
          </div>
          <div className="flex justify-center">
            {filteredCount > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingsTab;
