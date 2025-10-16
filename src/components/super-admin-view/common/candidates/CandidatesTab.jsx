import { useState } from "react";
import CandidatesTable from "./CandidatesTable";
import Pagination from "../../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../../common/filterComponent";
import {
  createApprovalFilters,
  createDatabaseFilters,
} from "@/config/super-admin/filters";
import { useGetApprovalsCandidates } from "../../../../hooks/super-admin/useApprovals";
import { useGetDatabaseCandidates } from "../../../../hooks/super-admin/useDatabase";
import StatusTabs from "../../approvals/common/StatusTabs";
import ErrorDisplay from "@/components/common/ErrorDisplay";

const CandidatesTab = ({ context = "database" }) => {
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
    status: filters.status,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  };

  if (context === "approvals") {
    if (filters.dateRange?.from) queryParams.dateFrom = filters.dateRange.from;
    if (filters.dateRange?.to) queryParams.dateTo = filters.dateRange.to;
  } else {
    if (filters.verification) {
      queryParams.isVerified = filters.verification === "verified";
    }
  }

  const approvalsQuery = useGetApprovalsCandidates(queryParams);
  const databaseQuery = useGetDatabaseCandidates(queryParams);

  const { data, isLoading, error, refetch } =
    context === "approvals" ? approvalsQuery : databaseQuery;

  const paginatedCandidates =
    context === "approvals"
      ? data?.data?.data?.approvals?.map((approval) => {
          const candidate = approval.data || {};
          return {
            id: approval._id,
            candidateId: candidate._id,
            name: candidate.name || "N/A",
            email: candidate.email || "N/A",
            contact: candidate.phoneNumber || "N/A",
            skills: candidate.skills || [],
            roleLookingFor: candidate.roleLookingFor || "N/A",
            totalExperience: candidate.totalExperience,
            totalExperienceInMonth: candidate.totalExperienceInMonth,
            profilePicture: candidate.profilePicture,
            location: candidate.location || "N/A",
            jobStatus: approval.status || "pending",
            postedDate: approval.createdAt
              ? new Date(approval.createdAt).toISOString().split("T")[0]
              : "N/A",
            lastUpdated: approval.updatedAt
              ? new Date(approval.updatedAt).toISOString().split("T")[0]
              : "N/A",
            _id: approval._id,
            createdAt: approval.createdAt,
            updatedAt: approval.updatedAt,
            approvalStatus: approval.status,
            applicantId: approval.applicantId,
            applicantType: approval.applicantType,
            submittedAt: approval.submittedAt,
            version: approval.version,
            isActive: approval.isActive,
            rejectionReason: approval.reviewerNotes,
            holdReason: approval.reviewerNotes,
          };
        }) || []
      : data?.data?.jobSeekers || [];

  const totalCount =
    context === "approvals"
      ? data?.data?.pagination?.totalApprovals || paginatedCandidates.length
      : data?.data?.pagination?.total || 0;

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
        sortBy: "createdAt",
        sortOrder: "desc",
      });
    }
    setCurrentPage(1);
  };

  const getFilterConfig = () => {
    if (context === "approvals") {
      return createApprovalFilters("candidates");
    }
    return createDatabaseFilters("candidates");
  };

  return (
    <div className="h-full grid grid-rows-[auto,1fr] gap-6">
      {/* Header - auto height */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Candidates</h1>
        {context === "approvals" && (
          <StatusTabs
            activeStatus={activeStatus}
            onStatusChange={handleStatusChange}
          />
        )}
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
              placeholder={
                context === "database"
                  ? "Search name, email, industry, location"
                  : "Search by company, name, email, title"
              }
            />
          </div>
          <div className="flex-1 min-w-0">
            <CandidatesTable
              paginatedCandidates={paginatedCandidates}
              context={context}
              handleDeleteCandidate={null}
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
