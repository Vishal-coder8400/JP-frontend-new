import JobsTable from "./JobsTable";
import Pagination from "../../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../../common/filterComponent";
import {
  createJobsAndTrainingsFilters,
  createApprovalFilters,
} from "@/config/super-admin/filters";
import { useGetAllJobs } from "../../../../hooks/super-admin/useJob";
import { useGetApprovalsJobs } from "../../../../hooks/super-admin/useApprovals";
import { useState, useCallback, useMemo, useEffect } from "react";
import ErrorDisplay from "@/components/common/ErrorDisplay";
import { useDebounce } from "@/hooks/common/useDebounce";
import StatusTabs from "../../approvals/common/StatusTabs";

const JobsTab = ({ context = "database" }) => {
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
      jobType: "",
      experienceLevel: "",
      location: "",
      modeOfWork: "",
      genderPreference: "",
      isWalkInInterview: "",
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

  const apiParams = useMemo(() => {
    const params = {
      page: currentPage,
      limit: itemsPerPage,
      search: filters.search,
      status: filters.status,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
    };

    if (context === "approvals") {
      if (filters.dateRange?.from) params.dateFrom = filters.dateRange.from;
      if (filters.dateRange?.to) params.dateTo = filters.dateRange.to;
    } else {
      params.jobType = filters.jobType || undefined;
      params.experienceLevel = filters.experienceLevel || undefined;
      params.location = filters.location || undefined;
      params.modeOfWork = filters.modeOfWork || undefined;
      params.genderPreference = filters.genderPreference || undefined;
      params.isWalkInInterview = filters.isWalkInInterview || undefined;
    }

    return params;
  }, [currentPage, filters, context]);

  // Fetch jobs data - use different hooks based on context
  const databaseQuery = useGetAllJobs(apiParams, context === "database");
  const approvalsQuery = useGetApprovalsJobs({
    ...apiParams,
    enabled: context === "approvals",
  });

  const {
    data: jobsData,
    isLoading,
    error,
    refetch,
  } = context === "approvals" ? approvalsQuery : databaseQuery;

  // Process jobs data based on context
  const jobs = useMemo(() => {
    if (context === "approvals") {
      const approvals = jobsData?.data?.approvals || [];
      return approvals.map((approval) => {
        const job = approval.data || {};
        return {
          ...job,
          _id: approval._id,
          id: approval._id,
          jobId: job._id,
          title: job.jobTitle,
          jobTitle: job.jobTitle,
          company: approval.applicantDetails?.company || "N/A",
          location: `${job.city || ""}, ${job.state || ""}`.trim() || "-",
          experience: job.experienceLevel || "-",
          experienceLevel: job.experienceLevel || "-",
          industry: job.industry || "-",
          sector: job.postedBy?.industryType || job.industryType || "-",
          noOfPositions: job.numberOfOpenings ?? "-",
          postedDate: approval.createdAt,
          createdAt: approval.createdAt,
          approvalStatus: approval.status,
          status: job.status,
        };
      });
    }
    return jobsData?.data?.jobs || [];
  }, [jobsData, context]);

  const handleStatusChange = (status) => {
    setActiveStatus(status);
    setFormData({ status });
  };

  const setFormData = useCallback((newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setCurrentPage(1);
  }, []);

  const clearAllFilters = useCallback(() => {
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
        jobType: "",
        experienceLevel: "",
        location: "",
        modeOfWork: "",
        genderPreference: "",
        isWalkInInterview: "",
      });
    }
    setCurrentPage(1);
  }, [context]);

  const getFilterConfig = () => {
    if (context === "approvals") {
      return createApprovalFilters("jobs");
    }
    return createJobsAndTrainingsFilters();
  };

  // Use server-side pagination data from API
  const totalPages =
    context === "approvals"
      ? jobsData?.data?.pagination?.totalPages || 0
      : jobsData?.data?.pagination?.totalPages || 0;
  const filteredCount =
    context === "approvals"
      ? jobsData?.data?.pagination?.totalApprovals || 0
      : jobsData?.data?.pagination?.totalJobs || 0;

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6 min-w-0">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">Loading jobs...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6 min-w-0">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <ErrorDisplay error={error} title="Error loading jobs" />
      </div>
    );
  }

  return (
    <div className="h-full space-y-6">
      {/* Header - auto height */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Jobs</h1>
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
        <div className="flex-1 min-w-0 flex flex-col gap-6 min-h-0 w-full">
          <div className="w-full">
            <SearchComponent
              value={searchText}
              handleSearch={setSearchText}
              placeholder={
                context === "database"
                  ? "Search by job title, company, location"
                  : "Search by company, name, email, title"
              }
            />
          </div>
          <div className="flex-1 min-w-0 overflow-x-auto w-full">
            <JobsTable
              paginatedJobs={jobs}
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

export default JobsTab;
