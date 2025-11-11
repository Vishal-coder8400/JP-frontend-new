import { useState } from "react";
import ApplicationsTable from "./ApplicationsTable";
import Pagination from "@/components/common/pagination";
import SearchComponent from "@/components/common/searchComponent";
import FilterComponent from "@/components/common/filterComponent";
import { createApplicationFilters } from "@/config/super-admin/filters";
import { useGetApplications } from "@/hooks/super-admin/useApplications";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { MoveLeftIcon } from "lucide-react";
import ErrorDisplay from "@/components/common/ErrorDisplay";

const ApplicationsTab = ({ isBackBtnEnabled = false }) => {
  const navigate = useNavigate();
  const { id: jobId } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const title =
    type === "training" ? "Training applications" : "Job applications";

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    source: "",
    stage: "",
    dateRange: { from: null, to: null },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useGetApplications(jobId, type, {
    ...filters,
    page: currentPage,
    limit: itemsPerPage,
  });

  const paginatedApplications = data?.data?.applications || [];
  const totalCount = data?.data?.pagination?.totalApplications || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const filteredCount = totalCount;

  const processApplications = (applications) => {
    return applications.map((application) => {
      const baseFields = {
        _id: application._id,
        applicantId: application.applicantId,
        applicantImage: application.applicantImage,
        applicantName: application.applicantName,
        status: application.status,
        statusByCorporate: application.statusByCorporate,
        statusByCorporateFeedback: application.statusByCorporateFeedback,
        statusByCorporateNotes: application.statusByCorporateNotes,
        statusFeedback: application.statusFeedback,
        statusNotes: application.statusNotes,
        applicantType: application.applicantType,
        applicationDate: application.applicationDate,
      };

      if (type === "job") {
        return {
          ...baseFields,
          source: application.source,
          recruiterInfo: application.applierRecruiterInfo
            ? {
                name:
                  application.applierRecruiterInfo.firstName +
                  " " +
                  application.applierRecruiterInfo.lastName,
                email: application.applierRecruiterInfo.email,
              }
            : application.profileCreatorRecruiterInfo
            ? {
                name:
                  application.profileCreatorRecruiterInfo.firstName +
                  " " +
                  application.profileCreatorRecruiterInfo.lastName,
                email: application.profileCreatorRecruiterInfo.email,
              }
            : null,
          recruiterId: application.applierRecruiterId,
          applicantExperience: application.applicantExperience,
        };
      }

      const sectorSpecialization = application.applicant?.sectorSpecialization
        ? Array.isArray(application.applicant.sectorSpecialization)
          ? application.applicant.sectorSpecialization
              .map((sector) =>
                typeof sector === "object" ? sector.name || sector._id : sector
              )
              .join(", ")
          : application.applicant.sectorSpecialization
        : null;

      const expertiseAreas = application.applicant?.expertiseAreas
        ? Array.isArray(application.applicant.expertiseAreas)
          ? application.applicant.expertiseAreas
              .map((area) =>
                typeof area === "object" ? area.name || area._id : area
              )
              .join(", ")
          : application.applicant.expertiseAreas
        : null;

      return {
        ...baseFields,
        teachingExperience: application.teachingExperience,
        relevantExperience: application.relevantExperience,
        sectorSpecialization,
        expertiseAreas,
      };
    });
  };

  const processedApplications = processApplications(paginatedApplications);

  const handleBackClick = () => {
    navigate(-1);
  };

  const setFormData = (newFormData) => {
    setFilters((prevFilters) => {
      const updatedFilters =
        typeof newFormData === "function"
          ? newFormData(prevFilters)
          : { ...prevFilters, ...newFormData };
      return updatedFilters;
    });
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      search: "",
      status: "",
      source: "",
      stage: "",
      dateRange: { from: null, to: null },
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {isBackBtnEnabled && (
          <MoveLeftIcon
            onClick={handleBackClick}
            className="w-5 h-5 text-gray-600 cursor-pointer"
          />
        )}
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>

      {/* Error Message */}
      {error && (
        <ErrorDisplay error={error} title="Error loading applications" />
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
                formControls={createApplicationFilters()}
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
            <div className="w-full">
              <SearchComponent
                value={filters.search}
                onChange={(e) => setFormData({ search: e.target.value })}
                placeholder="Search by applicant name, email, or job title"
              />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500">Loading applications...</div>
            </div>
          )}

          {/* Applications Table Container with horizontal scroll */}
          {!loading && (
            <div className="min-w-0 overflow-x-auto">
              <ApplicationsTable
                paginatedApplications={processedApplications}
                onRevalidate={refetch}
                currentType={type}
              />
            </div>
          )}

          {/* Pagination */}
          {!loading && filteredCount > 0 && (
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationsTab;
