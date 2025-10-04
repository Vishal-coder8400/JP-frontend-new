import { TrainersTable } from "./index";
import Pagination from "../../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../../common/filterComponent";
import { useState } from "react";
import { useGetAllTrainers } from "@/hooks/super-admin/useTrainers";
import { useGetApprovalsTrainers } from "@/hooks/super-admin/useApprovals";
import useApprovalsUIStore from "../../../../stores/useApprovalsUIStore";
import { getApprovalFilters } from "../../approvals/utils";
import { trainersFilters } from "../../database/tabs/trainers/utils";
import StatusTabs from "../../approvals/common/StatusTabs";
import ErrorDisplay from "@/components/common/ErrorDisplay";

const TrainersTab = ({
  context = "database", // "database" or "approvals"
  showStatusColumn = false,
  areApprovalBtnsVisible = false,
}) => {
  // Use UI store for approvals context
  const approvalsUIStore = useApprovalsUIStore();
  const approvalsStore =
    context === "approvals" ? approvalsUIStore.trainers : null;

  // Local state for database context
  const [filters, setFilters] = useState(() => {
    if (context === "approvals") {
      return (
        approvalsStore?.filters || {
          search: "",
          status: "pending",
          location: [],
          experience: [],
          skills: [],
          dateFrom: null,
          dateTo: null,
        }
      );
    } else {
      return {
        search: "",
        skills: [],
        industry: [],
        experience: [],
        location: [],
        status: "active",
        sortBy: "createdAt",
        sortOrder: "desc",
      };
    }
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [activeStatus, setActiveStatus] = useState(
    context === "approvals" ? "pending" : "active"
  );
  const itemsPerPage = 10;

  // Database context: use hook for direct API call
  const {
    data: databaseData,
    isLoading: databaseLoading,
    error: databaseError,
  } = useGetAllTrainers();

  // Approvals context: use React Query hook
  const {
    data: approvalsData,
    isLoading: approvalsLoading,
    error: approvalsError,
  } = useGetApprovalsTrainers({
    page: currentPage,
    limit: itemsPerPage,
    search: filters.search,
    status: filters.status,
    location: filters.location?.join(","),
    experience: filters.experience?.join(","),
    skills: filters.skills?.join(","),
    dateFrom: filters.dateFrom,
    dateTo: filters.dateTo,
  });

  // Process approvals data
  const processApprovalsData = (data) => {
    if (!data?.data?.data?.approvals) return { trainers: [], pagination: {} };

    const approvals = data.data.data.approvals;
    const pagination = data.data.data.pagination || {};

    const trainers = approvals.map((approval) => {
      const trainer = approval.data || {};
      return {
        id: approval._id,
        name:
          trainer.firstName && trainer.lastName
            ? `${trainer.firstName} ${trainer.lastName}`
            : trainer.name || "N/A",
        email: trainer.email || "N/A",
        contact: trainer.phoneNumber || "N/A",
        skills: trainer.skills?.length > 0 ? trainer.skills.join(", ") : "N/A",
        industry: trainer.industry || "N/A",
        experience: trainer.experience || "N/A",
        location: trainer.location || "N/A",
        status: approval.status || "pending",
        rating: trainer.rating || 0,
        totalStudents: trainer.totalStudents || 0,
        coursesCompleted: trainer.coursesCompleted || 0,
        joinedDate: approval.createdAt
          ? new Date(approval.createdAt).toISOString().split("T")[0]
          : "N/A",
        lastUpdated: approval.updatedAt
          ? new Date(approval.updatedAt).toISOString().split("T")[0]
          : "N/A",
        _id: approval._id,
        phone: trainer.phoneNumber,
        createdAt: approval.createdAt,
        updatedAt: approval.updatedAt,
        approvalStatus: approval.status,
        applicantId: approval.applicantId,
        applicantType: approval.applicantType,
        submittedAt: approval.submittedAt,
        version: approval.version,
        isActive: approval.isActive,
        firstName: trainer.firstName,
        lastName: trainer.lastName,
        profileImage: trainer.profileImage,
      };
    });

    return { trainers, pagination };
  };

  // Get data based on context
  const { trainers: approvalsTrainers, pagination: approvalsPagination } =
    context === "approvals"
      ? processApprovalsData(approvalsData)
      : { trainers: [], pagination: {} };

  const trainersData =
    context === "database"
      ? databaseData?.data?.data?.trainers || []
      : approvalsTrainers;

  const totalTrainers =
    context === "database"
      ? databaseData?.data?.data?.pagination?.totalTrainers || 0
      : approvalsPagination?.totalApprovals || 0;

  const isLoading = context === "database" ? databaseLoading : approvalsLoading;
  const apiError = context === "database" ? databaseError : approvalsError;

  // Handle filter updates
  const setFormData = (newFormData) => {
    if (context === "approvals" && approvalsStore) {
      approvalsStore.setFilters(newFormData);
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        ...(typeof newFormData === "function"
          ? newFormData(prevFilters)
          : newFormData),
      }));
      setCurrentPage(1); // Reset to first page when filtering
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    if (context === "approvals" && approvalsStore) {
      approvalsStore.clearFilters();
    } else {
      setFilters({
        search: "",
        skills: [],
        industry: [],
        experience: [],
        location: [],
        status: "active",
        sortBy: "createdAt",
        sortOrder: "desc",
      });
      setCurrentPage(1);
    }
  };

  // Handle status tab change (approvals context only)
  const handleStatusChange = (status) => {
    if (context === "approvals") {
      setActiveStatus(status);
      if (approvalsStore) {
        approvalsStore.setFilters({ status });
      }
    }
  };

  // Handle delete trainer (placeholder - implement actual delete logic)
  const handleDeleteTrainer = (trainer) => {
    // TODO: Implement actual delete logic here
  };

  // Get filter configuration based on context
  const getFilterConfig = () => {
    if (context === "approvals") {
      return getApprovalFilters("trainers");
    } else {
      return trainersFilters;
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(totalTrainers / itemsPerPage);

  // Revalidation function for approvals context (no longer needed with React Query)
  const handleRevalidate = () => {
    // React Query handles revalidation automatically
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Trainers</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading trainers...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (apiError) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Trainers</h1>
        <ErrorDisplay error={apiError} title="Error loading trainers" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Trainers</h1>

      {/* Status Tabs for approvals context */}
      {context === "approvals" && (
        <StatusTabs
          activeStatus={activeStatus}
          onStatusChange={handleStatusChange}
        />
      )}

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
                formControls={getFilterConfig()}
                formData={filters}
                setFormData={setFormData}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {/* Search Bar */}
          <div className="bg-white rounded-lg border p-4">
            <SearchComponent
              placeholder="Search trainers..."
              value={filters.search}
              onChange={(value) => setFormData({ search: value })}
            />
          </div>

          {/* Trainers Table */}
          <TrainersTable
            paginatedTrainers={trainersData}
            showStatusColumn={showStatusColumn || context === "approvals"}
            areApprovalBtnsVisible={
              areApprovalBtnsVisible || context === "approvals"
            }
            onRevalidate={handleRevalidate}
            context={context}
          />

          {/* Pagination */}
          {totalPages > 1 && (
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

export default TrainersTab;
