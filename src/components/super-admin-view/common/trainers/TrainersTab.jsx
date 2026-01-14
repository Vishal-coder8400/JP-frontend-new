import { TrainersTable } from "./index";
import Pagination from "../../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../../common/filterComponent";
import { useState, useEffect, useMemo } from "react";
import { useGetAllTrainers } from "@/hooks/super-admin/useTrainers";
import { useGetApprovalsTrainers } from "@/hooks/super-admin/useApprovals";
import useApprovalsUIStore from "../../../../stores/useApprovalsUIStore";
import {
  createApprovalFilters,
  createDatabaseFilters,
} from "@/config/super-admin/filters";
import StatusTabs from "../../approvals/common/StatusTabs";
import ErrorDisplay from "@/components/common/ErrorDisplay";
import { useDebounce } from "@/hooks/common/useDebounce";
import dayjs from "dayjs";

const TrainersTab = ({
  context = "database", // "database" or "approvals"
  showStatusColumn = false,
  areApprovalBtnsVisible = false,
}) => {
  // Use UI store for approvals context
  const approvalsUIStore = useApprovalsUIStore();
  const approvalsStore =
    context === "approvals" ? approvalsUIStore.trainers : null;

  // Local state for database context
  const [localFilters, setLocalFilters] = useState({
    search: "",
    status: "active",
    verification: "verified",
    specialization: [],
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const [localPage, setLocalPage] = useState(1);

  // Use store values for approvals context, local state for database
  const filters =
    context === "approvals" ? approvalsStore?.filters : localFilters;
  const currentPage =
    context === "approvals" ? approvalsStore?.currentPage : localPage;
  const setCurrentPage =
    context === "approvals" ? approvalsStore?.setCurrentPage : setLocalPage;

  const [activeStatus, setActiveStatus] = useState(
    context === "approvals" ? "pending" : "active"
  );
  const itemsPerPage = 10;

  // Handle filter updates
  const setFormData = (newFormData) => {
    if (context === "approvals" && approvalsStore) {
      approvalsStore.setFilters(newFormData);
    } else {
      setLocalFilters((prevFilters) => ({
        ...prevFilters,
        ...(typeof newFormData === "function"
          ? newFormData(prevFilters)
          : newFormData),
      }));
      setLocalPage(1);
    }
  };

  // Local search state for debouncing
  const [searchText, setSearchText] = useState(filters.search || "");

  // Debounce search text
  const debouncedSearch = useDebounce(searchText, 500);

  // Sync debounced search to filters
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      setFormData({ search: debouncedSearch });
    }
  }, [debouncedSearch, filters.search]);

  // Sync filters.search to searchText when filters change externally
  useEffect(() => {
    if (filters.search !== searchText) {
      setSearchText(filters.search);
    }
  }, [filters.search]);

  // Helper function to safely join array filters
  const safeJoin = (value) => {
    return Array.isArray(value) ? value.join(",") : value;
  };

  // Database context: use hook for direct API call
  const {
    data: databaseData,
    isLoading: databaseLoading,
    error: databaseError,
    refetch,
  } = useGetAllTrainers(
    {
      page: currentPage,
      limit: itemsPerPage,
      search: filters.search,
      status: filters.status,
      ...(filters.verification && {
        isVerified: filters.verification === "verified",
      }),
      specialization: safeJoin(filters.specialization),
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
    },
    context === "database"
  );

  // Approvals context: use React Query hook
  const {
    data: approvalsData,
    isLoading: approvalsLoading,
    error: approvalsError,
  } = useGetApprovalsTrainers({
    page: currentPage,
    limit: itemsPerPage,
    search: filters.search,
    status: filters.status,
    dateFrom: filters.dateRange?.from,
    dateTo: filters.dateRange?.to,
    sortBy: filters.sortBy || "submittedAt",
    sortOrder: filters.sortOrder || "desc",
    enabled: context === "approvals",
  });

  // Get data based on context
  const data = context === "approvals" ? approvalsData : databaseData;

  // Process the data based on context
  const paginatedTrainers = useMemo(() => {
    return context === "approvals"
      ? data?.data?.approvals?.map((approval) => {
          return {
            id: approval?.data?._id,
            approvalId: approval?._id,
            name: approval?.data?.name || "-",
            email: approval?.data?.email || "-",
            contact: approval?.data?.phoneNumber || "-",
            phone: approval?.data?.phoneNumber,
            expertiseAreas:
              approval?.data?.expertiseAreas
                ?.map((item) => item?.skillName)
                .join(", ") || "-",
            totalYearOfExperience: approval?.data?.totalYearsExperience || "-",
            status: approval.status || "-",
            approvalStatus: approval.status || "-",
            createdAt: approval.createdAt,
            updatedAt: approval.updatedAt,
            submittedAt: approval.submittedAt,
            profileImage: approval?.data?.profileImage,
          };
        }) || []
      : data?.data?.trainers?.map((trainer) => ({
          id: trainer?._id,
          name: trainer?.name || "-",
          email: trainer.email || "-",
          contact: trainer.phoneNumber || trainer.contact || "-",
          phone: trainer?.phoneNumber || trainer?.phone,
          expertiseAreas:
            trainer?.expertiseAreas
              ?.map((item) => item?.skillName)
              .join(", ") || "-",
          totalYearOfExperience:
            trainer?.totalYearsExperience ||
            trainer.totalYearOfExperience ||
            "-",
          updatedAt: trainer.updatedAt,
          profileImage: trainer.profileImage,
        })) || [];
  }, [context, data]);

  const totalTrainers =
    context === "approvals"
      ? data?.data?.pagination?.totalApprovals || paginatedTrainers.length
      : data?.data?.pagination?.totalTrainers || 0;

  const isLoading = context === "database" ? databaseLoading : approvalsLoading;
  const error = context === "database" ? databaseError : approvalsError;

  // Clear all filters
  const clearAllFilters = () => {
    setSearchText("");
    if (context === "approvals" && approvalsStore) {
      approvalsStore.clearFilters();
    } else {
      setLocalFilters({
        search: "",
        status: "active",
        verification: "verified",
        specialization: [],
        sortBy: "createdAt",
        sortOrder: "desc",
      });
      setLocalPage(1);
    }
  };

  // Handle status tab change (approvals context only)
  const handleStatusChange = (status) => {
    if (context === "approvals") {
      setActiveStatus(status);
      if (approvalsStore) {
        approvalsStore.setFilters({ status });
      }
    }
  };

  const getFilterConfig = () => {
    if (context === "approvals") {
      return createApprovalFilters("trainers");
    }
    return createDatabaseFilters("trainers");
  };

  // Calculate pagination
  const totalPages =
    context === "approvals"
      ? data?.data?.pagination?.totalPages ||
        Math.ceil(totalTrainers / itemsPerPage)
      : data?.data?.pagination?.totalPages || 0;

  return (
    <div className="h-full grid grid-rows-[auto,1fr] gap-6">
      {/* Header - auto height */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Trainers</h1>
        {context === "approvals" && (
          <StatusTabs
            activeStatus={activeStatus}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
      {error && <ErrorDisplay error={error} title="Error loading trainers" />}

      {/* Content - filters + table using flex layout */}
      {!error && (
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
                <FilterComponent
                  formControls={getFilterConfig()}
                  formData={filters}
                  setFormData={setFormData}
                />
              </div>
            </div>
          </div>

          {/* Main content - right area */}
          <div className="flex-1 min-w-0 flex flex-col gap-6 min-h-0">
            <div className="w-full">
              <SearchComponent
                placeholder={
                  context === "database"
                    ? "Search by name or email"
                    : "Search by company, name, email, title"
                }
                value={searchText}
                handleSearch={setSearchText}
              />
            </div>
            <div className="flex-1 min-w-0 overflow-x-auto">
              {isLoading && (
                <div className="flex justify-center items-center py-8">
                  <div className="text-gray-500">Loading trainers...</div>
                </div>
              )}
              {!isLoading && (
                <TrainersTable
                  onRevalidate={refetch}
                  paginatedTrainers={paginatedTrainers}
                  showStatusColumn={showStatusColumn || context === "approvals"}
                  areApprovalBtnsVisible={
                    areApprovalBtnsVisible || context === "approvals"
                  }
                  context={context}
                />
              )}
            </div>
            <div className="flex justify-center">
              {!isLoading && totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainersTab;
