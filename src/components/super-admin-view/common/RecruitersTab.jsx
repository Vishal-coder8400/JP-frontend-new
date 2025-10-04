import { useState } from "react";
import RecruitersTable from "./RecruitersTable";
import Pagination from "../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../common/filterComponent";
import { getRecruitersFilters } from "./recruitersFilters";
import { useGetApprovalsRecruiters } from "../../../hooks/super-admin/useApprovals";
import { useRecruiters } from "../../../hooks/super-admin/useRecruiters";
import StatusTabs from "../approvals/common/StatusTabs";
import ErrorDisplay from "@/components/common/ErrorDisplay";

const RecruitersTab = ({ context = "database" }) => {
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
      jobStatus: [],
      postedDate: null,
      location: [],
      company: [],
      industry: [],
    };
  });

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
    ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
    ...(filters.dateTo && { dateTo: filters.dateTo }),
  };

  // Use appropriate query hook based on context
  const approvalsQuery = useGetApprovalsRecruiters(queryParams);
  const databaseQuery = useRecruiters(filters, currentPage, itemsPerPage);

  const { data, isLoading, error, refetch } =
    context === "approvals" ? approvalsQuery : databaseQuery;

  // Process the data based on context
  const paginatedRecruiters =
    context === "approvals"
      ? data?.data?.data?.approvals?.map((approval) => {
          const recruiter = approval.data || {};
          return {
            id: approval._id,
            name: recruiter.name || "N/A",
            email: recruiter.email || "N/A",
            contact: recruiter.phone
              ? `${recruiter.phone.countryCode} ${recruiter.phone.number}`
              : "N/A",
            company: recruiter.company || "N/A",
            designation: recruiter.designation || "N/A",
            industry: recruiter.industry || "N/A",
            location: recruiter.currentAddress?.city || "N/A",
            jobStatus: approval.status || "pending",
            candidatesCount: recruiter.candidatesCount || 0,
            postedDate: approval.createdAt
              ? new Date(approval.createdAt).toISOString().split("T")[0]
              : "N/A",
            lastUpdated: approval.updatedAt
              ? new Date(approval.updatedAt).toISOString().split("T")[0]
              : "N/A",
            _id: approval._id,
            phone: recruiter.phone,
            createdAt: approval.createdAt,
            updatedAt: approval.updatedAt,
            approvalStatus: approval.status,
            applicantId: approval.applicantId,
            applicantType: approval.applicantType,
            submittedAt: approval.submittedAt,
            version: approval.version,
            isActive: approval.isActive,
            recruiterId: recruiter.recruiterId,
            currentAddress: recruiter.currentAddress,
            resume: recruiter.resume,
            sectorSpecialization: recruiter.sectorSpecialization,
            experienceLevel: recruiter.experienceLevel,
            isVerified: recruiter.isVerified,
            signupProgress: recruiter.signupProgress,
            completedStages: recruiter.completedStages,
            currentStage: recruiter.currentStage,
            status: recruiter.status,
            references: recruiter.references,
            kycDetails: recruiter.kycDetails,
            profileImage: recruiter.profileImage,
          };
        }) || []
      : data?.data?.data?.recruiters || [];

  const totalCount =
    context === "approvals"
      ? data?.data?.pagination?.totalApprovals || paginatedRecruiters.length
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
        jobStatus: [],
        postedDate: null,
        location: [],
        company: [],
        industry: [],
      });
    }
    setCurrentPage(1);
  };

  const handleDeleteRecruiter = (recruiter) => {
    // TODO: Implement delete logic
    console.log("Delete recruiter:", recruiter);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Recruiters</h1>

      {/* Error State */}
      {error && <ErrorDisplay error={error} title="Error loading recruiters" />}

      {/* Show content only when there's no error */}
      {!error && (
        <>
          {/* Status Tabs for Approvals */}
          {context === "approvals" && (
            <StatusTabs
              activeStatus={activeStatus}
              onStatusChange={handleStatusChange}
            />
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
                    formControls={getRecruitersFilters(context)}
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
                    value={filters.search}
                    onChange={(e) => setFormData({ search: e.target.value })}
                  />
                </div>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex justify-center items-center py-8">
                  <div className="text-gray-500">Loading recruiters...</div>
                </div>
              )}

              {/* Recruiters Table */}
              {!isLoading && (
                <RecruitersTable
                  paginatedRecruiters={paginatedRecruiters}
                  onRevalidate={refetch}
                  showStatusColumn={context === "approvals"}
                  context={context}
                />
              )}

              {/* Pagination */}
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

export default RecruitersTab;
