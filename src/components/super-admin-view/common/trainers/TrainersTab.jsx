import { TrainersTable } from "./index";
import Pagination from "../../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../../common/filterComponent";
import { useState, useEffect } from "react";
import { getApprovalsList } from "../../../../api/super-admin/approvals";
import { useGetAllTrainers } from "@/hooks/super-admin/useTrainers";
import { getApprovalFilters } from "../../approvals/utils";
import { trainersFilters } from "../../database/tabs/trainers/utils";
import StatusTabs from "../../approvals/common/StatusTabs";

const TrainersTab = ({
  context = "database", // "database" or "approvals"
  showStatusColumn = false,
  areApprovalBtnsVisible = false,
}) => {
  // Local state for filters and pagination
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

  // State for API data
  const [trainers, setTrainers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Database context: use hook for direct API call
  const {
    data: databaseData,
    isLoading: databaseLoading,
    error: databaseError,
  } = useGetAllTrainers();

  // Fetch trainers data based on context
  const fetchTrainers = async () => {
    if (context === "database") return; // Database uses hook

    setLoading(true);
    setError(null);

    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: filters.search,
        status: filters.status,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
        ...(filters.dateTo && { dateTo: filters.dateTo }),
      };

      const response = await getApprovalsList("trainer", params);

      // Parse the API response structure
      const approvals = response.data?.data?.approvals || [];
      const pagination = response.data?.data?.pagination || {};

      // Map API data to component expected format
      const mappedTrainers = approvals.map((approval) => {
        const trainer = approval.data || {};
        return {
          id: approval._id,
          name:
            trainer.firstName && trainer.lastName
              ? `${trainer.firstName} ${trainer.lastName}`
              : trainer.name || "N/A",
          email: trainer.email || "N/A",
          contact: trainer.phoneNumber || "N/A",
          skills:
            trainer.skills?.length > 0 ? trainer.skills.join(", ") : "N/A",
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
          // Additional API fields
          _id: approval._id,
          phone: trainer.phoneNumber,
          createdAt: approval.createdAt,
          updatedAt: approval.updatedAt,
          // Approval specific fields
          approvalStatus: approval.status,
          applicantId: approval.applicantId,
          applicantType: approval.applicantType,
          submittedAt: approval.submittedAt,
          version: approval.version,
          isActive: approval.isActive,
          // Trainer data fields
          firstName: trainer.firstName,
          lastName: trainer.lastName,
          profileImage: trainer.profileImage,
        };
      });

      setTrainers(mappedTrainers);
      setTotalCount(pagination.totalApprovals || mappedTrainers.length);
    } catch (error) {
      console.error("Error fetching trainers:", error);
      setError(error.response?.data?.message || "Failed to fetch trainers");
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch data when filters change (approvals context only)
  useEffect(() => {
    if (context === "approvals") {
      fetchTrainers();
    }
  }, [currentPage, filters, context]);

  // Get data based on context
  const getTrainersData = () => {
    if (context === "database") {
      return {
        trainers: databaseData?.data?.data?.trainers || [],
        totalCount: databaseData?.data?.data?.pagination?.totalTrainers || 0,
        loading: databaseLoading,
        error: databaseError,
      };
    } else {
      return {
        trainers,
        totalCount,
        loading,
        error,
      };
    }
  };

  const {
    trainers: trainersData,
    totalCount: totalTrainers,
    loading: isLoading,
    error: apiError,
  } = getTrainersData();

  // Handle filter updates
  const setFormData = (newFormData) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...(typeof newFormData === "function"
        ? newFormData(prevFilters)
        : newFormData),
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Clear all filters
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
        skills: [],
        industry: [],
        experience: [],
        location: [],
        status: "active",
        sortBy: "createdAt",
        sortOrder: "desc",
      });
    }
    setCurrentPage(1);
  };

  // Handle status tab change (approvals context only)
  const handleStatusChange = (status) => {
    if (context === "approvals") {
      setActiveStatus(status);
      setFilters((prev) => ({ ...prev, status }));
      setCurrentPage(1);
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

  // Revalidation function for approvals context
  const handleRevalidate = () => {
    if (context === "approvals") {
      fetchTrainers();
    }
  };

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
