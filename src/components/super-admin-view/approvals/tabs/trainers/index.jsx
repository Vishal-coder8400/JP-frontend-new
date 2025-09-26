import { TrainersTable } from "../../../common/trainers";
import Pagination from "../../../../common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "../../../../common/filterComponent";
import { trainersFilters } from "./utils";
import { useState, useEffect } from "react";
import { getApprovalsList } from "../../../../../api/super-admin/approvals";

const TrainersTab = () => {
  // Local state for filters and pagination
  const [filters, setFilters] = useState({
    search: "",
    skills: [],
    industry: [],
    experience: [],
    location: [],
    status: "pending", // For approvals, we want pending trainers by default
    sortBy: "createdAt",
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
        ...(filters.skills.length > 0 && { skills: filters.skills }),
        ...(filters.industry.length > 0 && { industry: filters.industry }),
        ...(filters.experience.length > 0 && {
          experience: filters.experience,
        }),
        ...(filters.location.length > 0 && { location: filters.location }),
        ...(filters.status && { status: filters.status }),
        ...(filters.sortBy && { sortBy: filters.sortBy }),
        ...(filters.sortOrder && { sortOrder: filters.sortOrder }),
      };

      const response = await getApprovalsList("trainer", params);

      // Parse the API response structure
      const trainersData = response.data?.data?.trainers || [];
      const pagination = response.data?.data?.pagination || {};

      // Map API data to component expected format
      const mappedTrainers = trainersData.map((trainer) => ({
        id: trainer._id,
        name: trainer.name || "N/A",
        email: trainer.email || "N/A",
        contact: trainer.phone
          ? `${trainer.phone.countryCode} ${trainer.phone.number}`
          : "N/A",
        skills: trainer.skills?.length > 0 ? trainer.skills.join(", ") : "N/A",
        industry: trainer.industry || "N/A",
        experience: trainer.experience || "N/A",
        location: trainer.location || "N/A",
        status: trainer.status || "pending",
        rating: trainer.rating || 0,
        totalStudents: trainer.totalStudents || 0,
        coursesCompleted: trainer.coursesCompleted || 0,
        joinedDate: trainer.createdAt
          ? new Date(trainer.createdAt).toISOString().split("T")[0]
          : "N/A",
        lastUpdated: trainer.updatedAt
          ? new Date(trainer.updatedAt).toISOString().split("T")[0]
          : "N/A",
        // Additional API fields
        _id: trainer._id,
        phone: trainer.phone,
        createdAt: trainer.createdAt,
        updatedAt: trainer.updatedAt,
      }));

      setTrainers(mappedTrainers);
      setTotalCount(pagination.totalTrainers || mappedTrainers.length);
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
      skills: [],
      industry: [],
      experience: [],
      location: [],
      status: "pending",
      sortBy: "createdAt",
      sortOrder: "desc",
    });
    setCurrentPage(1);
  };

  // Handle delete trainer (placeholder - implement actual delete logic)
  const handleDeleteTrainer = (trainer) => {
    // TODO: Implement actual delete logic here
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
                formControls={trainersFilters}
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
