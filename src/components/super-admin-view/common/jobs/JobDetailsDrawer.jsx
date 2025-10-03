import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LocationIcon } from "@/utils/icon";
import { toast } from "sonner";
import {
  ClockIcon,
  DollarSignIcon,
  CalendarIcon,
  SquarePenIcon,
} from "lucide-react";
import { useState } from "react";
import EditJobDrawer from "./EditJobDrawer";
import RejectionReasonModal from "@/components/common/RejectionReasonModal";
import { useGetJobDetails } from "../../../../hooks/super-admin/useJob";
import {
  useApprovals,
  useGetApprovalDetails,
} from "../../../../hooks/super-admin/useApprovals";

const JobDetailsDrawer = ({
  jobId,
  context = "view", // "edit", "approval", "view"
  onRevalidate,
  onClose,
}) => {
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);

  // Determine which hook to use based on context
  const isApprovalContext = context === "approval";
  const {
    data: jobData,
    isLoading,
    error,
  } = isApprovalContext
    ? useGetApprovalDetails(jobId)
    : useGetJobDetails(jobId);

  const {
    isLoading: isLoadingApprovals,
    approveApplication,
    rejectApplication,
    holdApplication,
  } = useApprovals();

  const handleApprove = async () => {
    try {
      await approveApplication(jobId);
      if (onRevalidate) {
        await onRevalidate();
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to approve job:", error);
    }
  };

  const handleReject = async (rejectionReason) => {
    try {
      await rejectApplication(jobId, rejectionReason);
      if (onRevalidate) {
        await onRevalidate();
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to reject job:", error);
    }
  };

  const handleRejectClick = () => {
    setShowRejectionModal(true);
  };

  const handleHold = async () => {
    toast.info("Job is on hold");
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
          <div className="text-lg text-red-500">
            Error loading job details: {error.message}
          </div>
        </div>
      </div>
    );
  }

  // Extract job data based on context
  let job, approvalData, applicant;

  if (isApprovalContext) {
    if (!jobData?.data?.data) {
      return (
        <div className="min-h-full flex flex-col bg-white p-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-500">No job details found</div>
          </div>
        </div>
      );
    }
    approvalData = jobData.data;
    job = approvalData.data;
    applicant = approvalData.applicant;
  } else {
    if (!jobData?.data?.data?.job) {
      return (
        <div className="min-h-full flex flex-col bg-white p-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-500">No job details found</div>
          </div>
        </div>
      );
    }
    job = jobData.data.data.job;
  }

  // Render buttons based on context
  const renderButtons = () => {
    if (context === "edit") {
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditDrawerOpen(true)}
            className="flex items-center gap-2"
          >
            <SquarePenIcon className="w-4 h-4" />
            Edit Job
          </Button>
        </div>
      );
    }

    if (context === "approval") {
      const isPending = approvalData?.data?.status === "pending";

      if (isPending) {
        return (
          <div className="flex flex-col gap-2">
            <Button
              variant="purple"
              onClick={handleApprove}
              disabled={isLoadingApprovals}
            >
              {isLoadingApprovals ? "Processing..." : "Approve Job"}
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectClick}
              disabled={isLoadingApprovals}
            >
              {isLoadingApprovals ? "Processing..." : "Reject Job"}
            </Button>
            <Button
              variant="black"
              onClick={handleHold}
              disabled={isLoadingApprovals}
            >
              {isLoadingApprovals ? "Processing..." : "Hold Job"}
            </Button>
          </div>
        );
      } else {
        return (
          <div className="flex flex-col gap-2">
            <Badge
              className={`${
                approvalData?.data?.status === "approved"
                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                  : "bg-red-100 text-red-800 hover:bg-red-200"
              } text-sm h-fit capitalize`}
            >
              {approvalData?.data?.status}
            </Badge>
            {approvalData?.data?.status === "rejected" &&
              approvalData?.data?.rejectionReason && (
                <div className="text-xs text-red-600 bg-red-50 p-2 rounded border max-w-xs">
                  <strong>Rejection Reason:</strong>{" "}
                  {approvalData.data.rejectionReason}
                </div>
              )}
          </div>
        );
      }
    }

    // Default: no buttons for "view" context
    return null;
  };

  return (
    <div className="min-h-full flex flex-col bg-white p-6">
      {/* Header */}
      <div className="flex justify-between gap-4 p-6 border-1 border-gray2 rounded-lg">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <p className="text-xl font-medium">{job.jobTitle}</p>
            {context === "approval" ? (
              <Badge className="text-primary-purple bg-light-purple text-xs">
                {job.applicationsCount || job.candidates || 2} Applied
              </Badge>
            ) : (
              <Badge
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  job.status === "active"
                    ? "bg-success2 text-success1"
                    : "bg-danger2 text-danger1"
                }`}
              >
                {job.status?.charAt(0).toUpperCase() + job.status?.slice(1)}
              </Badge>
            )}
          </div>
          <div className="text-gray1 flex items-center gap-6 mt-2">
            {job.officeLocation && (
              <div className="flex items-center gap-2">
                <LocationIcon className="h-4 w-4 text-gray1" />
                {job.officeLocation}, {job.city}, {job.state}
              </div>
            )}
            {job.jobType && (
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-gray1" />
                {job.jobType}
              </div>
            )}
            {job.experienceLevel && (
              <div className="flex items-center gap-2">
                <DollarSignIcon className="h-4 w-4 text-gray1" />
                {job.experienceLevel}
              </div>
            )}
          </div>

          {job.createdAt && (
            <div className="text-gray1 flex items-center gap-2 mt-2">
              <CalendarIcon className="h-4 w-4 text-gray1" />
              Posted on {new Date(job.createdAt).toLocaleDateString()}
            </div>
          )}
        </div>
        {renderButtons()}
      </div>

      {/* Content */}
      <div className="p-6 border-1 border-gray2 rounded-lg mt-6">
        <div>
          <h3 className="text-lg font-semibold">About the job</h3>
          <div className="text-gray1 mt-4 space-y-4">
            {job.jobDescription && (
              <>
                <h4 className="font-semibold">Job Description</h4>
                <p>{job.jobDescription}</p>
              </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Job Details</h4>
                <ul className="space-y-1 mt-2">
                  <li>
                    <strong>Job Type:</strong> {job.jobType}
                  </li>
                  <li>
                    <strong>Experience Level:</strong> {job.experienceLevel}
                  </li>
                  <li>
                    <strong>Mode of Work:</strong> {job.modeOfWork}
                  </li>
                  <li>
                    <strong>Working Hours:</strong> {job.workingHours}
                  </li>
                  <li>
                    <strong>Working Days:</strong> {job.workingDays}
                  </li>
                  {job.isSundayWorking && (
                    <li>
                      <strong>Sunday Working:</strong> Yes
                    </li>
                  )}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold">Requirements</h4>
                <ul className="space-y-1 mt-2">
                  <li>
                    <strong>Minimum Education:</strong> {job.minimumEducation}
                  </li>
                  <li>
                    <strong>English Level:</strong> {job.englishLevel}
                  </li>
                  <li>
                    <strong>Gender Preference:</strong> {job.genderPreference}
                  </li>
                  <li>
                    <strong>Age Range:</strong> {job.preferredAgeRange}
                  </li>
                  <li>
                    <strong>Regional Language:</strong>{" "}
                    {job.regionalLanguageRequired ? "Required" : "Not Required"}
                  </li>
                  <li>
                    <strong>Two Wheeler:</strong>{" "}
                    {job.twoWheelerMandatory ? "Mandatory" : "Not Mandatory"}
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-semibold">Location Details</h4>
              <ul className="space-y-1 mt-2">
                <li>
                  <strong>Office Location:</strong> {job.officeLocation}
                </li>
                <li>
                  <strong>City:</strong> {job.city}
                </li>
                <li>
                  <strong>State:</strong> {job.state}
                </li>
                <li>
                  <strong>Pincode:</strong> {job.pincode}
                </li>
              </ul>
            </div>

            {job.requiredSkills && job.requiredSkills.length > 0 && (
              <div>
                <h4 className="font-semibold">Required Skills</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.requiredSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 text-xs font-medium bg-light-purple text-primary-purple rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {job.isWalkInInterview && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800">
                  Walk-in Interview
                </h4>
                <p className="text-yellow-700 mt-1">
                  This job allows walk-in interviews.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Applicant Information - only for approval context */}
      {context === "approval" && applicant && (
        <div className="p-6 border-1 border-gray2 rounded-lg mt-6">
          <h4>About the Applicant</h4>
          <div className="text-gray1 mt-4 space-y-2">
            <p>
              <strong>Name:</strong> {applicant.name}
            </p>
            <p>
              <strong>Email:</strong> {applicant.email}
            </p>
            <p>
              <strong>Type:</strong> {applicant.type}
            </p>
            <p>
              <strong>Status:</strong> {applicant.status}
            </p>
            <p>
              <strong>Applied On:</strong>{" "}
              {new Date(approvalData.submittedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      {/* Edit Job Drawer - only for edit context */}
      {context === "edit" && (
        <EditJobDrawer
          isOpen={isEditDrawerOpen}
          onClose={() => setIsEditDrawerOpen(false)}
          job={job}
          onRevalidate={onRevalidate}
        />
      )}

      {/* Rejection Reason Modal - only for approval context */}
      {context === "approval" && (
        <RejectionReasonModal
          isOpen={showRejectionModal}
          onClose={() => setShowRejectionModal(false)}
          onConfirm={handleReject}
          isLoading={isLoadingApprovals}
          entityType="job"
        />
      )}
    </div>
  );
};

export default JobDetailsDrawer;
