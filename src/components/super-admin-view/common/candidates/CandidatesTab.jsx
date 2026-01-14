import { useState } from "react";
import CandidatesTable from "./CandidatesTable";
import Pagination from "../../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../../common/filterComponent";
import { createDatabaseFilters } from "@/config/super-admin/filters";
import { useGetDatabaseCandidates } from "../../../../hooks/super-admin/useDatabase";
import ErrorDisplay from "@/components/common/ErrorDisplay";

const CandidatesTab = () => {
  const [filters, setFilters] = useState(() => {
    return {
      search: "",
      sortBy: "createdAt",
      sortOrder: "desc",
    };
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const queryParams = {
    page: currentPage,
    limit: itemsPerPage,
    search: filters.search || "",
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  };

  const databaseQuery = useGetDatabaseCandidates(queryParams);

  const { data, error, refetch } = databaseQuery;

  const transformDatabaseCandidates = (candidates = []) =>
    candidates.map((candidate) => {
      return {
        _id: candidate?._id,
        name: candidate?.name || "-",
        email: candidate?.email || "-",
        contactNumber:
          candidate?.phone?.countryCode + " " + candidate?.phone?.number || "-",
        totalExperience: candidate?.totalExperience,
        totalExperienceInMonth: candidate?.totalExperienceInMonth,
        updatedAt: candidate?.updatedAt,
        approvalStatus: candidate?.approvalStatus,
        jobStatus: candidate?.status || candidate?.jobStatus,
      };
    });

  const paginatedCandidates = transformDatabaseCandidates(
    data?.data?.jobSeekers || []
  );

  const totalCount = data?.data?.pagination?.total || 0;

  const totalPages = data?.data?.pagination?.totalPages || 0;

  const setFormData = (newFormData) => {
    setFilters((prev) => {
      const updated =
        typeof newFormData === "function"
          ? newFormData(prev)
          : { ...prev, ...newFormData };
      return updated;
    });
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      search: "",
      sortBy: "createdAt",
      sortOrder: "desc",
    });
    setCurrentPage(1);
  };

  const getFilterConfig = () => {
    return createDatabaseFilters("candidates");
  };

  return (
    <div className="h-full grid grid-rows-[auto,1fr] gap-6">
      {/* Header - auto height */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Candidates</h1>
      </div>
      {error && <ErrorDisplay error={error} title="Error loading candidates" />}

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
              value={filters.search}
              handleSearch={(search) => setFilters({ ...filters, search })}
              placeholder={"Search name, email, industry, location"}
            />
          </div>
          <div className="flex-1 min-w-0">
            <CandidatesTable
              paginatedCandidates={paginatedCandidates}
              onRevalidate={refetch}
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

export default CandidatesTab;
