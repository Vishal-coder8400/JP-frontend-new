import { useEffect, useState } from "react";
import CompaniesTable from "./CompaniesTable";
import Pagination from "../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../common/filterComponent";
import { companiesFilters } from "../database/tabs/companies/utils";
import { getApprovalFilters } from "../approvals/utils";
import { useGetApprovalsCompanies } from "../../../hooks/super-admin/useApprovals";
import { useGetDatabaseCompanies } from "../../../hooks/super-admin/useDatabase";
import useApprovalsUIStore from "../../../stores/useApprovalsUIStore";
import useDatabaseUIStore from "../../../stores/useDatabaseUIStore";
import { useDebounce } from "@/hooks/common/useDebounce";
import StatusTabs from "../approvals/common/StatusTabs";
import { formatApiError } from "../../../utils/commonFunctions";
import ErrorDisplay from "../../common/ErrorDisplay";

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

  // Database context uses React Query hook
  const {
    data: databaseData,
    isLoading: databaseLoading,
    error: databaseError,
  } = useGetDatabaseCompanies({
    page: currentPage,
    limit: 10,
    search: filters.search,
    status: safeJoin(filters.status),
    verification: safeJoin(filters.verification),
    industry: safeJoin(filters.industry),
    companySize: safeJoin(filters.companySize),
    location: safeJoin(filters.location),
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  });

  // Approvals context uses React Query hook
  const {
    data: approvalsData,
    isLoading: approvalsLoading,
    error: approvalsError,
  } = useGetApprovalsCompanies({
    page: currentPage,
    limit: 10,
    search: filters.search,
    status: filters.status,
    location: safeJoin(filters.location),
    industry: safeJoin(filters.industry),
    company: safeJoin(filters.company),
    dateFrom: filters.dateFrom,
    dateTo: filters.dateTo,
  });

  // No need to update store - React Query handles data management

  // Process approvals data
  const processApprovalsData = (data) => {
    if (!data?.data?.data?.approvals) return { companies: [], pagination: {} };

    const approvals = data.data.data.approvals;
    const pagination = data.data.data.pagination || {};

    const companies = approvals.map((approval) => {
      const companyData = approval.data || {};
      const basicInfo = companyData.basicInformation || {};
      const spocInfo = companyData.spocInformation || {};

      return {
        id: approval._id,
        name: basicInfo.companyName || "N/A",
        email: basicInfo.companyEmail || "N/A",
        contact: basicInfo.companyContactNumber
          ? `${basicInfo.companyContactNumber.countryCode} ${basicInfo.companyContactNumber.number}`
          : "N/A",
        industry: basicInfo.companyType || "N/A",
        location: "",
        status: approval.status || "pending",
        approvalStatus: approval.status || "pending",
        joinedDate: companyData.createdAt
          ? new Date(companyData.createdAt).toISOString().split("T")[0]
          : "N/A",
        lastUpdated: companyData.updatedAt
          ? new Date(companyData.updatedAt).toISOString().split("T")[0]
          : "N/A",
        _id: approval._id,
        type: approval.type,
        applicantId: approval.applicantId,
        applicantType: approval.applicantType,
        submittedAt: approval.submittedAt,
        version: approval.version,
        isActive: approval.isActive,
        createdAt: approval.createdAt,
        updatedAt: approval.updatedAt,
        fullCompanyData: companyData,
        spocName: spocInfo.fullName || "N/A",
        spocEmail: spocInfo.email || "N/A",
        spocContact: spocInfo.contactNumber
          ? `${spocInfo.contactNumber.countryCode} ${spocInfo.contactNumber.number}`
          : "N/A",
        companyLogo: basicInfo.companyLogo || "",
        websiteURL: basicInfo.websiteURL || "",
      };
    });

    return { companies, pagination };
  };

  // Get computed data based on context
  const { companies: approvalsCompanies, pagination: approvalsPagination } =
    isApprovalsContext
      ? processApprovalsData(approvalsData)
      : { companies: [], pagination: {} };

  const paginatedCompanies = isApprovalsContext
    ? approvalsCompanies
    : databaseData?.data?.data?.corporates || [];

  const totalPages = isApprovalsContext
    ? Math.ceil((approvalsPagination?.totalApprovals || 0) / 10)
    : databaseData?.data?.pagination?.totalPages || 0;

  const filteredCount = isApprovalsContext
    ? approvalsPagination?.totalApprovals || 0
    : databaseData?.data?.pagination?.total || 0;

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
      return getApprovalFilters("companies", { companyOptions: [] });
    }
    return companiesFilters;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Companies</h1>
        {isApprovalsContext && (
          <StatusTabs
            activeStatus={activeStatus}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      {/* Error Message */}
      {hasError && (
        <ErrorDisplay error={hasError} title="Error loading companies" />
      )}

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
                formControls={getFilterControls()}
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
                value={searchText}
                handleSearch={setSearchText}
              />
            </div>
          </div>

          {/* Companies Table Container */}
          <div className="min-w-0 overflow-x-auto">
            <CompaniesTable
              paginatedCompanies={paginatedCompanies}
              context={context}
              handleDeleteCompany={null} // No delete functionality in either context
              onRevalidate={() => {}} // React Query handles revalidation automatically
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

export default CompaniesTab;
