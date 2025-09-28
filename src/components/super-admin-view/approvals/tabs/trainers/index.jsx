import { TrainersTable } from "../../../common/trainers";
import Pagination from "../../../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../../../common/filterComponent";
import { getApprovalFilters } from "../../utils";
import { useState, useEffect } from "react";
import { getApprovalsList } from "../../../../../api/super-admin/approvals";

const TrainersTab = () => {
  // Local state for filters and pagination
  const [filters, setFilters] = useState({
    search: "",
    status: "pending", // For approvals, we want pending trainers by default
    dateFrom: null,
    dateTo: null,
    sortBy: "submittedAt",
    sortOrder: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // State for API data
  const [trainers, setTrainers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch trainers data
  const fetchTrainers = async () => {
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
          phoneNumber: trainer.phoneNumber,
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

  // Fetch trainers on component mount and when filters change
  useEffect(() => {
    fetchTrainers();
  }, [currentPage, filters]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

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
    setFilters({
      search: "",
      status: "pending",
      dateFrom: null,
      dateTo: null,
      sortBy: "submittedAt",
      sortOrder: "desc",
    });
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Trainers</h1>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-800 font-medium">Error loading trainers</div>
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
                formControls={getApprovalFilters("trainers")}
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

          {/* Trainers Table Container with horizontal scroll */}
          <div className="min-w-0 overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-gray-500">Loading trainers...</div>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-red-500">
                  Error loading trainers: {error}
                </div>
              </div>
            ) : (
              <TrainersTable
                paginatedTrainers={trainers}
                showStatusColumn={true}
                areApprovalBtnsVisible={true}
                onRevalidate={fetchTrainers}
              />
            )}
          </div>

          {/* Pagination */}
          {!loading && totalCount > 0 && (
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
