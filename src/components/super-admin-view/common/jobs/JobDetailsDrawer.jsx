import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  ClockIcon,
  DollarSignIcon,
  CalendarIcon,
  MapPinIcon,
} from "lucide-react";
import { useState } from "react";
import EditJobDrawer from "./EditJobDrawer";
import RejectionReasonModal from "@/components/common/RejectionReasonModal";
import HoldReasonModal from "@/components/common/HoldReasonModal";
import { useGetJobDetails } from "../../../../hooks/super-admin/useJob";
import { formatApiError } from "../../../../utils/commonFunctions";
import { useApprovals } from "../../../../hooks/super-admin/useApprovals";
import ActionButtons from "../../shared/ActionButtons";

const JobDetailsDrawer = ({
  jobId,
  context = "database", // "database", "approvals"
  approvalId,
  approvalStatus,
  onRevalidate,
  onClose,
}) => {
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showHoldModal, setShowHoldModal] = useState(false);

  const { data: jobData, isLoading, error, refetch } = useGetJobDetails(jobId);

  const {
    isLoading: isLoadingApprovals,
    approveApplication,
    rejectApplication,
    holdApplication,
  } = useApprovals();

  const handleApprove = async () => {
    try {
      await approveApplication(approvalId);
      if (onRevalidate) {
        await onRevalidate();
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to approve job:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to approve job. Please try again."
      );
    }
  };

  const handleReject = async (rejectionReason) => {
    try {
      await rejectApplication(approvalId, rejectionReason);
      if (onRevalidate) {
        await onRevalidate();
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to reject job:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to reject job. Please try again."
      );
    }
  };

  const handleRejectClick = () => {
    setShowRejectionModal(true);
  };

  const handleHold = async (holdReason) => {
    try {
      await holdApplication(approvalId, holdReason);
      if (onRevalidate) {
        await onRevalidate();
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to hold job:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to hold job. Please try again."
      );
    }
  };

  const handleHoldClick = () => {
    setShowHoldModal(true);
  };

  const handleJobUpdate = async () => {
    try {
      await refetch();

      if (onRevalidate) {
        await onRevalidate();
      }

      setIsEditDrawerOpen(false);
    } catch (error) {
      console.error("Failed to refetch job details:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-full flex flex-col bg-white p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">Loading job details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full flex flex-col bg-white p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-500">{formatApiError(error)}</div>
        </div>
      </div>
    );
  }

  if (!jobData?.data?.job) {
    return (
      <div className="min-h-full flex flex-col bg-white p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">No job details found</div>
        </div>
      </div>
    );
  }

  const job = jobData.data.job;

  const renderButtons = () => {
    return (
      <ActionButtons
        context={context}
        onEdit={() => setIsEditDrawerOpen(true)}
        onApprove={handleApprove}
        onReject={handleRejectClick}
        onHold={handleHoldClick}
        isLoading={isLoadingApprovals}
        entityName="Job"
        editButtonVariant="outline"
        editButtonSize="sm"
        layout="vertical"
        approvalStatus={approvalStatus || job?.approvalStatus || job?.status}
      />
    );
  };

  return (
    <div className="h-full min-h-screen flex flex-col bg-white p-6">
      {/* Header */}
      <div className="p-6 border-1 border-gray2 rounded-lg bg-white">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            {/* Company Logo and Name */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full">
                <img
                  src={job.postedBy?.companyLogo}
                  alt={job.postedBy?.companyName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-lg font-medium text-gray-900">
                {job.postedBy?.companyName || "Company Name"}
              </div>
            </div>

            {/* Job Title and Deadline */}
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {job.jobTitle}
              </h1>
              {job.applicationDeadline && (
                <Badge className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                  Deadline:{" "}
                  {new Date(job.applicationDeadline).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </Badge>
              )}
            </div>

            {/* Job Details Row */}
            <div className="flex items-center gap-6 text-gray-600">
              {job.jobType && (
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4" />
                  <span className="text-sm">{job.jobType}</span>
                </div>
              )}
              {job.experienceLevel && (
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4" />
                  <span className="text-sm">{job.experienceLevel}</span>
                </div>
              )}
              {job.salaryRange && (
                <div className="flex items-center gap-2">
                  <DollarSignIcon className="h-4 w-4" />
                  <span className="text-sm">{job.salaryRange}</span>
                </div>
              )}
              {job.workingHours && (
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span className="text-sm">{job.workingHours}</span>
                </div>
              )}
            </div>
          </div>
          <div className="shrink-0">{renderButtons()}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 border-1 border-gray2 rounded-lg mt-6">
        <div>
          <h3 className="text-lg font-semibold mb-6">About the job</h3>

          {/* Job Overview */}
          {job.jobDescription && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">
                Job Overview:
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {job.jobDescription}
              </p>
            </div>
          )}

          {/* Key Responsibilities */}
          {job.keyResponsibilities && job.keyResponsibilities.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                Key Responsibilities:
              </h4>
              <ul className="space-y-2">
                {job.keyResponsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Job Details */}
          <div className="space-y-4">
            {job.minimumEducation && (
              <div className="flex flex-col">
                <span className="font-bold text-gray-700">Education:</span>
                <span className="text-gray-700">{job.minimumEducation}</span>
              </div>
            )}

            {job.experienceLevel && (
              <div className="flex flex-col">
                <span className="font-bold text-gray-700">
                  Experience Level:
                </span>
                <span className="text-gray-700">{job.experienceLevel}</span>
              </div>
            )}

            {job.modeOfWork && (
              <div className="flex flex-col">
                <span className="font-bold text-gray-700">Mode of work:</span>
                <span className="text-gray-700">{job.modeOfWork}</span>
              </div>
            )}

            {job.modeOfInterview && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-medium text-gray-900">
                  Mode of Interview:
                </span>
                <span className="text-gray-700">{job.modeOfInterview}</span>
              </div>
            )}
          </div>

          {/* Other Details */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-3">Other Details:</h4>
            <ul className="space-y-2">
              {job.officeLocation && (
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">
                    <strong>Location:</strong> {job.officeLocation}
                    {job.city && `, ${job.city}`}
                    {job.state && `, ${job.state}`}
                  </span>
                </li>
              )}
              {job.salaryRange && (
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">
                    <strong>Salary:</strong> {job.salaryRange}
                  </span>
                </li>
              )}
              {job.workingHours && (
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">
                    <strong>Duration:</strong> {job.workingHours}
                  </span>
                </li>
              )}
              {job.genderPreference && (
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">
                    <strong>Gender Preference:</strong> {job.genderPreference}
                  </span>
                </li>
              )}
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700">
                  <strong>Regional Language Required:</strong>{" "}
                  {job.regionalLanguageRequired ? "Required" : "None"}
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          {job.contactEmail && (
            <div className="mt-6">
              <p className="text-gray-700">
                <strong>Contact Information:</strong> For additional
                information, you can reach out to me at {job.contactEmail}
              </p>
            </div>
          )}

          {/* Closing Remark */}
          <div className="mt-6">
            <p className="text-gray-700 italic">
              Looking forward to seeing some great applications!
            </p>
          </div>

          {/* Skills/Tags */}
          {job.requiredSkills && job.requiredSkills.length > 0 && (
            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-full border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 border-1 border-gray2 rounded-lg mt-6">
        <h4 className="font-bold text-gray-700">About the Company</h4>
        <p className="text-gray-700">
          {job.postedBy?.companyDescription || "-"}
        </p>
        {job.postedBy?.currentAddress && (
          <p className="text-gray-700">
            <strong>Address:</strong> {job.postedBy?.currentAddress}
          </p>
        )}
      </div>

      {/* Edit Job Drawer - for database and approvals contexts */}
      {(context === "database" || context === "approvals") && (
        <EditJobDrawer
          isOpen={isEditDrawerOpen}
          onClose={() => setIsEditDrawerOpen(false)}
          job={job}
          onRevalidate={handleJobUpdate}
        />
      )}

      {/* Rejection Reason Modal - only for approvals context */}
      {context === "approvals" && (
        <RejectionReasonModal
          isOpen={showRejectionModal}
          onClose={() => setShowRejectionModal(false)}
          onConfirm={handleReject}
          isLoading={isLoadingApprovals}
          entityType="job"
        />
      )}

      {/* Hold Reason Modal - only for approvals context */}
      {context === "approvals" && (
        <HoldReasonModal
          isOpen={showHoldModal}
          onClose={() => setShowHoldModal(false)}
          onConfirm={handleHold}
          isLoading={isLoadingApprovals}
          entityType="job"
        />
      )}
    </div>
  );
};

export default JobDetailsDrawer;
