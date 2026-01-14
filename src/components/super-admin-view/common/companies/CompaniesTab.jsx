import { useEffect, useState } from "react";
import CompaniesTable from "./CompaniesTable";
import Pagination from "../../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../../common/filterComponent";
import {
  createApprovalFilters,
  createDatabaseFilters,
} from "@/config/super-admin/filters";
import { useGetApprovalsCompanies } from "../../../../hooks/super-admin/useApprovals";
import { useGetDatabaseCompanies } from "../../../../hooks/super-admin/useDatabase";
import useApprovalsUIStore from "../../../../stores/useApprovalsUIStore";
import useDatabaseUIStore from "../../../../stores/useDatabaseUIStore";
import { useDebounce } from "@/hooks/common/useDebounce";
import StatusTabs from "../../approvals/common/StatusTabs";
import ErrorDisplay from "../../../common/ErrorDisplay";

const CompaniesTab = ({ context = "database" }) => {
  const isApprovalsContext = context === "approvals";

  // Helper function to safely join array filters
  const safeJoin = (value) => {
    return Array.isArray(value) ? value.join(",") : value;
  };

  // Use different UI stores based on context
  const approvalsUIStore = useApprovalsUIStore();
  const databaseUIStore = useDatabaseUIStore();

  const {
    filters,
    currentPage,
    setFilters: setFormData,
    setCurrentPage,
    clearFilters: clearAllFilters,
  } = isApprovalsContext
    ? approvalsUIStore.companies
    : databaseUIStore.companies;

  // Local search state for debouncing
  const [searchText, setSearchText] = useState(filters.search || "");
  const [activeStatus, setActiveStatus] = useState("pending");

  // Debounce search text
  const debouncedSearch = useDebounce(searchText, 500);

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

  // Handle status change (only for approvals context)
  const handleStatusChange = (status) => {
    if (!isApprovalsContext) return;

    setActiveStatus(status);
    setFormData({ status });
    setCurrentPage(1);
  };

  const {
    data: databaseData,
    isLoading: databaseLoading,
    error: databaseError,
  } = useGetDatabaseCompanies({
    enabled: !isApprovalsContext,
    page: currentPage,
    limit: 10,
    search: filters.search,
    status: safeJoin(filters.status) || "active",
    ...(filters.verification && {
      isVerified: filters.verification === "verified",
    }),
    industry: safeJoin(filters.industry),
    companySize: safeJoin(filters.companySize),
    location: safeJoin(filters.location),
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  });

  const {
    data: approvalsData,
    isLoading: approvalsLoading,
    error: approvalsError,
  } = useGetApprovalsCompanies({
    enabled: isApprovalsContext,
    page: currentPage,
    limit: 10,
    search: filters.search,
    status: filters.status,
    dateFrom: filters.dateRange?.from,
    dateTo: filters.dateRange?.to,
    sortBy: filters.sortBy || "submittedAt",
    sortOrder: filters.sortOrder || "desc",
  });

  // Get raw data based on context
  const approvalsCompanies = isApprovalsContext
    ? approvalsData?.data?.approvals || []
    : [];

  const databaseCompanies = !isApprovalsContext
    ? databaseData?.data?.corporates || []
    : [];

  const paginatedCompanies = isApprovalsContext
    ? approvalsCompanies
    : databaseCompanies;

  const approvalsPagination = isApprovalsContext
    ? approvalsData?.data?.pagination || {}
    : {};

  const totalPages = isApprovalsContext
    ? Math.ceil((approvalsPagination?.totalApprovals || 0) / 10)
    : databaseData?.data?.pagination?.totalPages || 0;

  const isLoading = isApprovalsContext ? approvalsLoading : databaseLoading;
  const hasError = isApprovalsContext ? approvalsError : databaseError;

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Companies</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading companies...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Companies</h1>
        <ErrorDisplay error={hasError} title="Error loading companies" />
      </div>
    );
  }

  const getFilterControls = () => {
    if (isApprovalsContext) {
      return createApprovalFilters("companies", { companyOptions: [] });
    }
    return createDatabaseFilters("companies");
  };

  return (
    <div className="h-full grid grid-rows-[auto,1fr] gap-6">
      {/* Header - auto height */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Companies</h1>
        {isApprovalsContext && (
          <StatusTabs
            activeStatus={activeStatus}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
      {hasError && (
        <ErrorDisplay error={hasError} title="Error loading companies" />
      )}

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
                formControls={getFilterControls()}
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
              value={searchText}
              handleSearch={setSearchText}
              placeholder={
                context === "database"
                  ? "Search name, email, industry, location"
                  : "Search by company, name, email, title"
              }
            />
          </div>
          <div className="flex-1 min-w-0">
            <CompaniesTable
              paginatedCompanies={paginatedCompanies}
              context={context}
              onRevalidate={() => {}}
            />
          </div>
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesTab;
