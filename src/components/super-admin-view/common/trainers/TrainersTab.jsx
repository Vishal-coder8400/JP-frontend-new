import { TrainersTable } from "./index";
import Pagination from "../../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../../common/filterComponent";
import { useState, useEffect } from "react";
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

  // Process approvals data
  const processApprovalsData = (data) => {
    if (!data?.data?.approvals) return { trainers: [], pagination: {} };

    const approvals = data.data.approvals;
    const pagination = data.data.pagination || {};

    const trainers = approvals.map((approval) => {
      const trainer = approval.data || {};
      return {
        id: approval._id,
        trainerId: trainer._id,
        name:
          trainer.firstName && trainer.lastName
            ? `${trainer.firstName} ${trainer.lastName}`
            : trainer.name || "N/A",
        email: trainer.email || "N/A",
        contact: trainer.phoneNumber || "N/A",
        skills: trainer.skills?.length > 0 ? trainer.skills.join(", ") : "N/A",
        industry: trainer.industry || "N/A",
        industryExperience: trainer.industryExperience || "N/A",
        expertiseAreas: trainer.expertiseAreas || "N/A",
        totalYearOfExperience:
          trainer.totalYearsExperience || trainer.totalYearOfExperience,
        experience: trainer.experience || "N/A",
        location: trainer.location || "N/A",
        status: approval.status || "pending",
        rating: trainer.rating || 0,
        totalStudents: trainer.totalStudents || 0,
        coursesCompleted: trainer.coursesCompleted || 0,
        joinedDate: approval.createdAt
          ? new Date(approval.createdAt).toISOString().split("T")[0]
          : "N/A",
        lastUpdated: approval.updatedAt
          ? new Date(approval.updatedAt).toISOString().split("T")[0]
          : "N/A",
        _id: approval._id,
        phone: trainer.phoneNumber,
        createdAt: approval.createdAt,
        updatedAt: approval.updatedAt,
        approvalStatus: approval.status,
        applicantId: approval.applicantId,
        applicantType: approval.applicantType,
        submittedAt: approval.submittedAt,
        version: approval.version,
        isActive: approval.isActive,
        firstName: trainer.firstName,
        lastName: trainer.lastName,
        profileImage: trainer.profileImage,
      };
    });

    return { trainers, pagination };
  };

  // Get data based on context
  const { trainers: approvalsTrainers, pagination: approvalsPagination } =
    context === "approvals"
      ? processApprovalsData(approvalsData)
      : { trainers: [], pagination: {} };

  const trainersData =
    context === "database"
      ? databaseData?.data?.trainers || []
      : approvalsTrainers;

  const totalTrainers =
    context === "database"
      ? databaseData?.data?.pagination?.totalTrainers || 0
      : approvalsPagination?.totalApprovals || 0;

  const isLoading = context === "database" ? databaseLoading : approvalsLoading;
  const apiError = context === "database" ? databaseError : approvalsError;

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
  const totalPages = Math.ceil(totalTrainers / itemsPerPage);

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Trainers</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading trainers...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (apiError) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Trainers</h1>
        <ErrorDisplay error={apiError} title="Error loading trainers" />
      </div>
    );
  }

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
            <TrainersTable
              onRevalidate={refetch}
              paginatedTrainers={trainersData}
              showStatusColumn={showStatusColumn || context === "approvals"}
              areApprovalBtnsVisible={
                areApprovalBtnsVisible || context === "approvals"
              }
              context={context}
            />
          </div>
          <div className="flex justify-center">
            {totalPages > 1 && (
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

export default TrainersTab;
