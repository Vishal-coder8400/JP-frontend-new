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

  const safeJoin = (value) => {
    return Array.isArray(value) ? value.join(",") : value;
  };

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

  const [searchText, setSearchText] = useState(filters.search || "");

  // Initialize activeStatus from filters or default to "pending"
  const [activeStatus, setActiveStatus] = useState(
    filters.status ? filters.status.toLowerCase() : "pending"
  );

  const debouncedSearch = useDebounce(searchText, 500);

  // Sync searchText with filters (e.g., clear filters)
  useEffect(() => {
    if (filters.search !== searchText) {
      setSearchText(filters.search || "");
    }
  }, [filters.search]);

  // Sync activeStatus with filters
  useEffect(() => {
    if (filters.status) {
      setActiveStatus(filters.status.toLowerCase());
    } else {
      setActiveStatus("pending");
    }
  }, [filters.status]);

  // Apply debounced search
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      setFormData({ search: debouncedSearch });
      setCurrentPage(1);
    }
  }, [debouncedSearch, filters.search, setFormData, setCurrentPage]);

  // Set default status "PENDING" immediately on mount if undefined
  useEffect(() => {
    if (isApprovalsContext && filters.status === undefined) {
      setFormData({ status: "PENDING" });
      setActiveStatus("pending");
    }
  }, [isApprovalsContext, filters.status, setFormData]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleStatusChange = (status) => {
    if (!isApprovalsContext) return;

    const uppercaseStatus = status.toUpperCase(); // API expects uppercase: PENDING, APPROVED, etc.

    setActiveStatus(status); // UI uses lowercase
    setFormData({ status: uppercaseStatus });
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
    search: filters.search || "",
    status: safeJoin(filters.status) || "active",
    ...(filters.verification && { isVerified: filters.verification === "verified" }),
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
    search: filters.search || "",
    status: filters.status, // uppercase from handleStatusChange
    dateFrom: filters.dateRange?.from,
    dateTo: filters.dateRange?.to,
    sortBy: filters.sortBy || "submittedAt",
    sortOrder: filters.sortOrder || "desc",
  });

  // Extract companies
  const approvalsCompanies = isApprovalsContext
    ? approvalsData?.data?.approvals || []
    : [];

  const databaseCompanies = !isApprovalsContext
    ? databaseData?.data?.corporates || []
    : [];

  const paginatedCompanies = isApprovalsContext
    ? approvalsCompanies
    : databaseCompanies;

  const totalPages = isApprovalsContext
    ? Math.ceil((approvalsData?.data?.pagination?.totalApprovals || 0) / 10)
    : databaseData?.data?.pagination?.totalPages || 0;

  const isLoading = isApprovalsContext ? approvalsLoading : databaseLoading;
  const hasError = isApprovalsContext ? approvalsError : databaseError;

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Companies</h1>
        {isApprovalsContext && (
          <StatusTabs
            activeStatus={activeStatus}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      {/* Main Content */}
      <div className="flex gap-6 min-h-0 min-w-0">
        {/* Filters Sidebar */}
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

        {/* Table Area */}
        <div className="flex-1 min-w-0 flex flex-col gap-6 min-h-0">
          <div className="w-full">
            <SearchComponent
              value={searchText}
              handleSearch={handleSearch}
              placeholder={
                context === "database"
                  ? "Search name, email, industry, location"
                  : "Search by company name, email, contact, spoc..."
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