import { useEffect, useState } from "react";
import RecruitersTable from "./RecruitersTable";
import Pagination from "../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../common/filterComponent";
import { getRecruitersFilters } from "./recruitersFilters";
import { useRecruiters } from "../../../hooks/super-admin/useUnifiedRecruiters";
import StatusTabs from "../approvals/common/StatusTabs";

const RecruitersTab = ({ context = "database" }) => {
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
  const [activeStatus, setActiveStatus] = useState("pending");

  const {
    data: paginatedRecruiters,
    loading,
    error,
    totalPages,
    totalCount,
    refetch,
  } = useRecruiters(filters, currentPage, 10, context);

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

      {/* Status Tabs for Approvals */}
      {context === "approvals" && (
        <StatusTabs
          activeStatus={activeStatus}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Error State */}
      {error && (
        <div className="flex justify-center items-center py-8">
          <div className="text-red-800 font-medium">
            Error loading recruiters
          </div>
          <div className="text-red-600 text-sm">{error}</div>
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
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500">Loading recruiters...</div>
            </div>
          )}

          {/* Recruiters Table */}
          {!loading && !error && (
            <RecruitersTable
              paginatedRecruiters={paginatedRecruiters}
              onRevalidate={refetch}
              showStatusColumn={context === "approvals"}
              context={context}
            />
          )}

          {/* Pagination */}
          {!loading && !error && totalCount > 0 && (
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

export default RecruitersTab;
