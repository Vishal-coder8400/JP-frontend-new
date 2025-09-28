import CompaniesTable from "./CompaniesTable";
import Pagination from "../../../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../../../common/filterComponent";
import { companiesFilters } from "./utils";
import useCompaniesStore from "./zustand";
import { useGetAllCompanies } from "../../../../../hooks/super-admin/useCompanies";
import { useEffect } from "react";

const CompaniesTab = () => {
  const {
    filters,
    currentPage,
    setFormData,
    clearAllFilters,
    setCurrentPage,
    handleDeleteCompany,
    fetchCompanies,
    isLoading,
    error,
  } = useCompaniesStore();

  // Fetch companies data using the API hook
  const {
    data: companiesData,
    isLoading: apiLoading,
    error: apiError,
  } = useGetAllCompanies({
    page: currentPage,
    limit: 10,
    search: filters.search,
    status: filters.status.join(","),
    verification: filters.verification.join(","),
    industry: filters.industry.join(","),
    companySize: filters.companySize.join(","),
    location: filters.location.join(","),
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  });

  // Update store with API data
  useEffect(() => {
    if (companiesData?.data) {
      const { corporates, pagination } = companiesData.data;
      useCompaniesStore.getState().setCompanies(corporates || []);
      useCompaniesStore.getState().setTotalCount(pagination?.total || 0);
    }
  }, [companiesData]);

  // Get computed data
  const paginatedCompanies = companiesData?.data?.data?.corporates || [];
  const totalPages = companiesData?.data?.pagination?.totalPages || 0;
  const filteredCount = companiesData?.data?.pagination?.total || 0;

  if (apiLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Companies</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading companies...</div>
        </div>
      </div>
    );
  }

  if (apiError) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Companies</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">
            Error loading companies: {apiError.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Companies</h1>

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
                formControls={companiesFilters}
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

          {/* Companies Table */}
          <CompaniesTable
            paginatedCompanies={paginatedCompanies}
            handleDeleteCompany={handleDeleteCompany}
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

export default CompaniesTab;
