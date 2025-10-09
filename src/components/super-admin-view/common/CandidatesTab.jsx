import { useState } from "react";
import CandidatesTable from "../database/tabs/candidates/CandidatesTable";
import Pagination from "../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../common/filterComponent";
import { candidatesFilters } from "../database/tabs/candidates/utils";
import { useGetApprovalsCandidates } from "../../../hooks/super-admin/useApprovals";
import { useGetDatabaseCandidates } from "../../../hooks/super-admin/useDatabase";
import StatusTabs from "../approvals/common/StatusTabs";
import ErrorDisplay from "@/components/common/ErrorDisplay";
import { getApprovalFilters } from "../approvals/utils";

const CandidatesTab = ({ context = "database" }) => {
  const [activeStatus, setActiveStatus] = useState("pending");

  const [filters, setFilters] = useState(() => {
    if (context === "approvals") {
      return {
        search: "",
        status: "pending",
        dateFrom: null,
        dateTo: null,
        sortBy: "submittedAt",
        sortOrder: "desc",
      };
    }
    return {
      search: "",
      status: [],
      industry: [],
      location: [],
      experience: [],
      education: [],
      skills: [],
      sortBy: "createdAt",
      sortOrder: "desc",
    };
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const safeJoin = (value) => {
    return Array.isArray(value) ? value.join(",") : value;
  };

  const queryParams = {
    page: currentPage,
    limit: itemsPerPage,
    search: filters.search || "",
    status: context === "approvals" ? filters.status : safeJoin(filters.status),
    sortBy: filters.sortBy || "submittedAt",
    sortOrder: filters.sortOrder || "desc",
    ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
    ...(filters.dateTo && { dateTo: filters.dateTo }),
  };

  if (context === "database") {
    queryParams.industry = safeJoin(filters.industry);
    queryParams.location = safeJoin(filters.location);
    queryParams.experience = safeJoin(filters.experience);
    queryParams.education = safeJoin(filters.education);
    queryParams.skills = safeJoin(filters.skills);
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
      : data?.data?.data?.jobSeekers || [];

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
        dateFrom: null,
        dateTo: null,
        sortBy: "submittedAt",
        sortOrder: "desc",
      });
    } else {
      setFilters({
        search: "",
        status: [],
        industry: [],
        location: [],
        experience: [],
        education: [],
        skills: [],
        sortBy: "createdAt",
        sortOrder: "desc",
      });
    }
    setCurrentPage(1);
  };

  const getFilterConfig = () => {
    if (context === "approvals") {
      return getApprovalFilters("candidates");
    } else {
      return candidatesFilters;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Candidates</h1>

      {error && <ErrorDisplay error={error} title="Error loading candidates" />}

      {!error && (
        <>
          {context === "approvals" && (
            <StatusTabs
              activeStatus={activeStatus}
              onStatusChange={handleStatusChange}
            />
          )}

          <div className="flex flex-col lg:flex-row gap-6 min-h-0">
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
                    formControls={getFilterConfig()}
                    formData={filters}
                    setFormData={setFormData}
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0 space-y-6">
              <div className="flex justify-between items-center min-w-0">
                <div className="max-w-sm w-full">
                  <SearchComponent
                    value={filters.search}
                    onChange={(e) => setFormData({ search: e.target.value })}
                  />
                </div>
              </div>

              {isLoading && (
                <div className="flex justify-center items-center py-8">
                  <div className="text-gray-500">Loading candidates...</div>
                </div>
              )}

              {!isLoading && (
                <CandidatesTable
                  paginatedCandidates={paginatedCandidates}
                  onRevalidate={refetch}
                  showStatusColumn={context === "approvals"}
                  context={context}
                />
              )}

              {!isLoading && totalCount > 0 && (
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
        </>
      )}
    </div>
  );
};

export default CandidatesTab;
