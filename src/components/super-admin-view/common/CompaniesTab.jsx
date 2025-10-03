import { useEffect, useState } from "react";
import CompaniesTable from "./CompaniesTable";
import Pagination from "../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../common/filterComponent";
import { companiesFilters } from "../database/tabs/companies/utils";
import { getApprovalFilters } from "../approvals/utils";
import useCompaniesStore from "../database/tabs/companies/zustand";
import useApprovalsCompaniesStore from "../approvals/tabs/companies/zustand";
import { useGetAllCompanies } from "../../../hooks/super-admin/useCompanies";
import { useDebounce } from "@/hooks/common/useDebounce";
import StatusTabs from "../approvals/common/StatusTabs";

const CompaniesTab = ({ context = "database" }) => {
  const isApprovalsContext = context === "approvals";

  // Helper function to safely join array filters
  const safeJoin = (value) => {
    return Array.isArray(value) ? value.join(",") : value;
  };

  // Use different stores based on context
  const databaseStore = useCompaniesStore();
  const approvalsStore = useApprovalsCompaniesStore();

  const store = isApprovalsContext ? approvalsStore : databaseStore;

  const {
    filters,
    currentPage,
    loading,
    error,
    companyOptions,
    setFormData,
    setSearchData,
    clearAllFilters,
    setCurrentPage,
    handleDeleteCompany,
    getPaginatedCompanies,
    getTotalPages,
    getFilteredCount,
    fetchCompanies,
  } = store;

  // Local search state for debouncing
  const [searchText, setSearchText] = useState(filters.search || "");
  const [activeStatus, setActiveStatus] = useState("pending");

  // Debounce search text
  const debouncedSearch = useDebounce(searchText, 500);

  // Sync debounced search to filters
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      setSearchData({ search: debouncedSearch });
    }
  }, [debouncedSearch, filters.search, setSearchData]);

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

  // Fetch companies on component mount and when status changes
  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies, activeStatus]);

  // Database context uses API hook
  const {
    data: companiesData,
    isLoading: apiLoading,
    error: apiError,
  } = useGetAllCompanies({
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

  // Update store with API data for database context
  useEffect(() => {
    if (isApprovalsContext) return;

    if (companiesData?.data) {
      const { corporates, pagination } = companiesData.data;
      useCompaniesStore.getState().setCompanies(corporates || []);
      useCompaniesStore.getState().setTotalCount(pagination?.total || 0);
    }
  }, [companiesData, isApprovalsContext]);

  // Get computed data based on context
  const paginatedCompanies = isApprovalsContext
    ? getPaginatedCompanies()
    : companiesData?.data?.data?.corporates || [];

  const totalPages = isApprovalsContext
    ? getTotalPages()
    : companiesData?.data?.pagination?.totalPages || 0;

  const filteredCount = isApprovalsContext
    ? getFilteredCount()
    : companiesData?.data?.pagination?.total || 0;

  const isLoading = isApprovalsContext ? loading : apiLoading;
  const hasError = isApprovalsContext ? error : apiError;

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
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">
            Error loading companies: {hasError.message || hasError}
          </div>
        </div>
      </div>
    );
  }

  const getFilterControls = () => {
    if (isApprovalsContext) {
      return getApprovalFilters("companies", { companyOptions });
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
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-800 font-medium">
            Error loading companies
          </div>
          <div className="text-red-600 text-sm">
            {hasError.message || hasError}
          </div>
        </div>
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
              handleDeleteCompany={handleDeleteCompany}
              onRevalidate={fetchCompanies}
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
