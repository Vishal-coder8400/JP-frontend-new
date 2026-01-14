import { useState, useEffect, useMemo } from "react";
import RecruitersTable from "./RecruitersTable";
import Pagination from "../../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../../common/filterComponent";
import { getRecruitersFilters } from "@/config/super-admin/filters";
import { useGetApprovalsRecruiters } from "../../../../hooks/super-admin/useApprovals";
import { useRecruiters } from "../../../../hooks/super-admin/useRecruiters";
import StatusTabs from "../../approvals/common/StatusTabs";
import ErrorDisplay from "@/components/common/ErrorDisplay";
import { useDebounce } from "@/hooks/common/useDebounce";
import dayjs from "dayjs";

const RecruitersTab = ({ context = "database" }) => {
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
      verification: "verified",
      experience: "",
      location: "",
    };
  });

  // Local search state for debouncing
  const [searchText, setSearchText] = useState(filters.search || "");

  // Debounce search text
  const debouncedSearch = useDebounce(searchText, 500);

  // Sync debounced search to filters
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      setFormData({ search: debouncedSearch });
    }
  }, [debouncedSearch]);

  // Sync filters.search to searchText when filters change externally
  useEffect(() => {
    if (filters.search !== searchText) {
      setSearchText(filters.search);
    }
  }, [filters.search]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Query parameters
  const queryParams = {
    page: currentPage,
    limit: itemsPerPage,
    search: filters.search || "",
    status: filters.status || "pending",
    sortBy: filters.sortBy || "submittedAt",
    sortOrder: filters.sortOrder || "desc",
    ...(filters.dateRange?.from && { dateFrom: filters.dateRange.from }),
    ...(filters.dateRange?.to && { dateTo: filters.dateRange.to }),
  };

  // Transform filters for database context
  const databaseFilters = { ...filters };
  if (context === "database") {
    if (filters.verification) {
      databaseFilters.isVerified = filters.verification === "verified";
      delete databaseFilters.verification;
    }
    if (filters.experience) {
      databaseFilters.experience = filters.experience;
    }
    if (filters.location) {
      databaseFilters.location = filters.location;
    }
  }

  // Use appropriate query hook based on context
  const approvalsQuery = useGetApprovalsRecruiters({
    ...queryParams,
    enabled: context === "approvals",
  });
  const databaseQuery = useRecruiters(
    databaseFilters,
    currentPage,
    itemsPerPage,
    { enabled: context === "database" }
  );

  const { data, isLoading, error, refetch } =
    context === "approvals" ? approvalsQuery : databaseQuery;

  // Process the data based on context
  const paginatedRecruiters = useMemo(() => {
    return context === "approvals"
      ? data?.data?.approvals?.map((approval) => ({
          id: approval?.applicantId,
          approvalId: approval?._id,
          name: approval?.applicantDetails?.name || "-",
          email: approval?.applicantDetails?.email || "-",
          contact: approval?.data?.phone
            ? `${approval.data.phone?.countryCode || ""} ${approval.data.phone?.number || ""}`.trim()
            : "-",
          company: approval?.applicantDetails?.company || "-",
          sector:
            approval?.data?.sectorSpecialization
              ?.map((sector) => sector.name)
              .join(", ") || "-",
          expertise: approval?.data?.experienceLevel?.join(", ") || "-",
          status: approval?.status || "-",
          postedDate: approval?.createdAt
            ? dayjs(approval?.createdAt).format("DD/MM/YYYY")
            : "-",
          lastUpdated: approval?.updatedAt
            ? dayjs(approval?.updatedAt).format("DD/MM/YYYY")
            : "-",
          candidatesCount: approval?.data?.candidatesCount || 0,
          profileImage: approval?.applicantDetails?.profileImage,
        }))
      : data?.data?.recruiters?.map((recruiter) => ({
          id: recruiter._id,
          name: recruiter.name || "-",
          email: recruiter.email || "-",
          profileImage: recruiter?.profileImage,
          totalCandidates: recruiter?.totalCandidates ?? "-",
          contact: recruiter?.phone
            ? `${recruiter.phone?.countryCode} ${recruiter.phone?.number}`
            : "-",
          company: recruiter.company || "-",
          sector:
            recruiter?.sectorSpecialization
              ?.map((sector) => sector.name)
              .join(", ") || "-",
          expertise: recruiter?.experienceLevel?.join(", ") || "-",
          lastUpdated: recruiter?.updatedAt
            ? dayjs(recruiter?.updatedAt).format("DD/MM/YYYY")
            : "-",
        }));
  }, [context, data]);

  const totalCount =
    context === "approvals"
      ? data?.data?.pagination?.totalApprovals
      : data?.data?.pagination?.total;

  const totalPages =
    context === "approvals"
      ? data?.data?.pagination?.totalPages ||
        Math.ceil(totalCount / itemsPerPage)
      : data?.data?.pagination?.totalPages || 0;

  const handleStatusChange = (status) => {
    setActiveStatus(status);
    setFormData({ status });
  };

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
        verification: "verified",
        experience: "",
        location: "",
      });
    }
    setCurrentPage(1);
  };

  return (
    <div className="h-full grid grid-rows-[auto,1fr] gap-6">
      {/* Header - auto height */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Recruiters</h1>
        {context === "approvals" && (
          <StatusTabs
            activeStatus={activeStatus}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
      {error && <ErrorDisplay error={error} title="Error loading recruiters" />}

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
                  formControls={getRecruitersFilters(context)}
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
                    ? "Search by name, email, company, experience, location, specializations"
                    : "Search by company, name, email, title"
                }
              />
            </div>
            <div className="flex-1 min-w-0 overflow-x-auto">
              {isLoading && (
                <div className="flex justify-center items-center py-8">
                  <div className="text-gray-500">Loading recruiters...</div>
                </div>
              )}
              {!isLoading && (
                <RecruitersTable
                  paginatedRecruiters={paginatedRecruiters}
                  onRevalidate={refetch}
                  showStatusColumn={context === "approvals"}
                  context={context}
                />
              )}
            </div>
            <div className="flex justify-center">
              {!isLoading && totalCount > 0 && (
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

export default RecruitersTab;
