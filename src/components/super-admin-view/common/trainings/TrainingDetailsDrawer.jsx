import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ClockIcon,
  DollarSignIcon,
  CalendarIcon,
  SquarePenIcon,
  MapPinIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useGetTrainingDetails } from "../../../../hooks/super-admin/useTraining";
import { formatApiError } from "../../../../utils/commonFunctions";
import { useApprovals } from "../../../../hooks/super-admin/useApprovals";
import RejectionReasonModal from "@/components/common/RejectionReasonModal";
import HoldReasonModal from "@/components/common/HoldReasonModal";
import EditTrainingDrawer from "./EditTrainingDrawer";

const TrainingDetailsDrawer = ({
  trainingId,
  training, // For approvals context
  context = "default", // "jobs-and-trainings", "approvals", "default"
  areApprovalBtnsVisible = false,
  approvalId,
  onClose,
  onRevalidate,
}) => {
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showHoldModal, setShowHoldModal] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

  const {
    data: trainingData,
    isLoading: isLoadingDetails,
    error: detailsError,
  } = useGetTrainingDetails(trainingId, {
    enabled: !!trainingId,
  });

  const {
    isLoading: isApprovalActionLoading,
    approveApplication,
    rejectApplication,
    holdApplication,
  } = useApprovals();

  const isLoading = isLoadingDetails;
  const error = detailsError;

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
      console.error("Failed to approve training:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to approve training. Please try again."
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
      console.error("Failed to reject training:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to reject training. Please try again."
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
      setShowHoldModal(false);
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to hold training:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to hold training. Please try again."
      );
    }
  };

  const handleHoldClick = () => {
    setShowHoldModal(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">
            Loading training details...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-white p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-500">{formatApiError(error)}</div>
        </div>
      </div>
    );
  }

  // Determine which training data to use based on context
  let displayTraining;
  let displayApplicant;
  let displayApprovalData;

  if (context === "approvals") {
    // For approvals: trainingData.data contains the approval data
    const approvalData = trainingData?.data;
    const detailedTraining = approvalData?.data;
    const applicant = approvalData?.applicant;

    if (!detailedTraining) {
      return (
        <div className="min-h-full flex flex-col bg-white p-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-500">
              No training details found
            </div>
          </div>
        </div>
      );
    }

    displayTraining = detailedTraining;
    displayApplicant = applicant;
    displayApprovalData = approvalData;
  } else {
    // For jobs-and-trainings context
    if (!trainingData?.data?.data?.training) {
      return (
        <div className="min-h-screen flex flex-col bg-white p-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-500">
              No training details found
            </div>
          </div>
        </div>
      );
    }
    displayTraining = trainingData.data.data.training;
  }

  const renderActionButtons = () => {
    if (context === "jobs-and-trainings") {
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditDrawerOpen(true)}
            className="flex items-center gap-2"
          >
            <SquarePenIcon className="w-4 h-4" />
            Edit Training
          </Button>
        </div>
      );
    }

    if (context === "approvals" && areApprovalBtnsVisible) {
      // Show approval buttons in every case except approved
      if (displayApprovalData?.status !== "approved") {
        return (
          <div className="flex flex-col gap-2">
            <Button
              variant="purple"
              onClick={handleApprove}
              disabled={isApprovalActionLoading}
            >
              Approve Training
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectClick}
              disabled={isApprovalActionLoading}
            >
              Reject Training
            </Button>
            <Button
              variant="black"
              onClick={handleHoldClick}
              disabled={isApprovalActionLoading}
            >
              Hold Training
            </Button>
          </div>
        );
      } else {
        return (
          <div className="flex flex-col gap-2">
            <Badge
              className={`${
                displayApprovalData?.status === "approved"
                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                  : "bg-red-100 text-red-800 hover:bg-red-200"
              } text-sm h-fit capitalize`}
            >
              {displayApprovalData?.status}
            </Badge>
            {displayApprovalData?.status === "rejected" &&
              displayApprovalData?.rejectionReason && (
                <div className="text-xs text-red-600 bg-red-50 p-2 rounded border max-w-xs">
                  <strong>Rejection Reason:</strong>{" "}
                  {displayApprovalData.rejectionReason}
                </div>
              )}
          </div>
        );
      }
    }

    // Default context - no buttons
    return null;
  };

  const renderTrainingContent = () => {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-6">About the training</h3>

        {/* Training Overview */}
        {displayTraining.description && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">
              Training Overview:
            </h4>
            <p className="text-gray-700 leading-relaxed">
              {displayTraining.description}
            </p>
          </div>
        )}

        {/* Key Responsibilities */}
        {displayTraining.responsibilities && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">
              Key Responsibilities:
            </h4>
            <ul className="space-y-2">
              {Array.isArray(displayTraining.responsibilities) ? (
                displayTraining.responsibilities.map(
                  (responsibility, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">{responsibility}</span>
                    </li>
                  )
                )
              ) : (
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">
                    {displayTraining.responsibilities}
                  </span>
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Training Details */}
        <div className="space-y-4">
          {displayTraining.qualificationsRequired && (
            <div className="flex flex-col">
              <span className="font-bold text-gray-700">Education:</span>
              <span className="text-gray-700">
                {displayTraining.qualificationsRequired}
              </span>
            </div>
          )}

          {displayTraining.minimumExperience && (
            <div className="flex flex-col">
              <span className="font-bold text-gray-700">Experience Level:</span>
              <span className="text-gray-700">
                {displayTraining.minimumExperience}
              </span>
            </div>
          )}

          {displayTraining.trainingMode && (
            <div className="flex flex-col">
              <span className="font-bold text-gray-700">Mode of training:</span>
              <span className="text-gray-700">
                {displayTraining.trainingMode}
              </span>
            </div>
          )}

          {displayTraining.sessionFrequency && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium text-gray-900">
                Session Frequency:
              </span>
              <span className="text-gray-700">
                {displayTraining.sessionFrequency}
              </span>
            </div>
          )}
        </div>

        {/* Other Details */}
        <div className="mt-6">
          <h4 className="font-semibold text-gray-900 mb-3">Other Details:</h4>
          <ul className="space-y-2">
            {displayTraining.totalDurationDays && (
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700">
                  <strong>Duration:</strong> {displayTraining.totalDurationDays}{" "}
                  days
                </span>
              </li>
            )}
            {displayTraining.hoursPerDay && (
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700">
                  <strong>Hours Per Day:</strong> {displayTraining.hoursPerDay}{" "}
                  hours
                </span>
              </li>
            )}
            {displayTraining.participantsPerBatch && (
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700">
                  <strong>Participants Per Batch:</strong>{" "}
                  {displayTraining.participantsPerBatch}
                </span>
              </li>
            )}
            {displayTraining.subjectMatterExpertise && (
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700">
                  <strong>Subject Matter Expertise:</strong>{" "}
                  {displayTraining.subjectMatterExpertise}
                </span>
              </li>
            )}
            {displayTraining.qualificationsRequired && (
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700">
                  <strong>Qualifications Required:</strong>{" "}
                  {displayTraining.qualificationsRequired}
                </span>
              </li>
            )}
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
              <span className="text-gray-700">
                <strong>Travel Required:</strong>{" "}
                {displayTraining.travelRequired !== undefined
                  ? displayTraining.travelRequired
                    ? "Yes"
                    : "No"
                  : "Not specified"}
              </span>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        {displayTraining.contactEmail && (
          <div className="mt-6">
            <p className="text-gray-700">
              <strong>Contact Information:</strong> For additional information,
              you can reach out to me at {displayTraining.contactEmail}
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
        {(displayTraining.requiredSkills ||
          displayTraining.skills ||
          displayTraining.technicalSkills ||
          displayTraining.languagesFluent) && (
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {displayTraining.requiredSkills &&
                Array.isArray(displayTraining.requiredSkills) &&
                displayTraining.requiredSkills.map((skill, index) => (
                  <span
                    key={`req-${index}`}
                    className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-full border"
                  >
                    {skill}
                  </span>
                ))}
              {displayTraining.skills &&
                Array.isArray(displayTraining.skills) &&
                displayTraining.skills.map((skill, index) => (
                  <span
                    key={`skill-${index}`}
                    className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-full border"
                  >
                    {skill}
                  </span>
                ))}
              {displayTraining.technicalSkills &&
                Array.isArray(displayTraining.technicalSkills) &&
                displayTraining.technicalSkills.map((skill, index) => (
                  <span
                    key={`tech-${index}`}
                    className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-full border"
                  >
                    {skill}
                  </span>
                ))}
              {displayTraining.languagesFluent &&
                Array.isArray(displayTraining.languagesFluent) &&
                displayTraining.languagesFluent.map((language, index) => (
                  <span
                    key={`lang-${index}`}
                    className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-full border"
                  >
                    {language}
                  </span>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-full flex flex-col bg-white p-6">
      {/* Header */}
      <div className="p-6 border-1 border-gray2 rounded-lg bg-white">
        {/* Company Logo and Name */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full">
            <img
              src={
                displayTraining.companyLogo ||
                displayTraining.postedBy?.companyLogo
              }
              alt={
                displayTraining.company ||
                displayTraining.postedBy?.companyName ||
                displayApplicant?.name
              }
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-lg font-medium text-gray-900">
            {displayTraining.company ||
              displayTraining.postedBy?.companyName ||
              "Company Name"}
          </div>
        </div>

        {/* Training Title and Status/Deadline */}
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {displayTraining.title}
          </h1>
          {context === "approvals"
            ? (displayTraining.applicationsCount ||
                displayTraining.candidates) && (
                <Badge className="text-primary-purple bg-light-purple text-xs">
                  {displayTraining.applicationsCount ||
                    displayTraining.candidates}{" "}
                  Applied
                </Badge>
              )
            : displayTraining.status &&
              displayTraining.status !== "pending" && (
                <Badge
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    displayTraining.status === "active"
                      ? "bg-success2 text-success1"
                      : "bg-danger2 text-danger1"
                  }`}
                >
                  {displayTraining.status?.charAt(0).toUpperCase() +
                    displayTraining.status?.slice(1)}
                </Badge>
              )}
        </div>

        {/* Training Details Row */}
        <div className="flex items-center gap-6 text-gray-600">
          {displayTraining.trainingMode && (
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4" />
              <span className="text-sm">{displayTraining.trainingMode}</span>
            </div>
          )}
          {displayTraining.subjectMatterExpertise && (
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4" />
              <span className="text-sm">
                {displayTraining.subjectMatterExpertise}
              </span>
            </div>
          )}
          {displayTraining.participantsPerBatch && (
            <div className="flex items-center gap-2">
              <DollarSignIcon className="h-4 w-4" />
              <span className="text-sm">
                {displayTraining.participantsPerBatch} participants
              </span>
            </div>
          )}
          {displayTraining.totalDurationDays && (
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span className="text-sm">
                {displayTraining.totalDurationDays} days
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {renderActionButtons() && (
          <div className="flex justify-end mt-6">{renderActionButtons()}</div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 border-1 border-gray2 rounded-lg mt-6">
        {renderTrainingContent()}
      </div>

      <div className="p-6 border-1 border-gray2 rounded-lg mt-6">
        <h4 className="font-bold text-gray-700">About the Company</h4>
        <p className="text-gray-700">
          {displayTraining.postedBy?.companyDescription ||
            displayTraining.companyDescription ||
            "-"}
        </p>
        {displayTraining.postedBy?.currentAddress && (
          <p className="text-gray-700">
            <strong>Address:</strong> {displayTraining.postedBy?.currentAddress}
          </p>
        )}
      </div>

      {/* Applicant Information - Only for approvals context */}
      {context === "approvals" && displayApplicant && (
        <div className="p-6 border-1 border-gray2 rounded-lg mt-6">
          <h4>About the Applicant</h4>
          <div className="text-gray1 mt-4 space-y-2">
            <p>
              <strong>Name:</strong> {displayApplicant.name}
            </p>
            <p>
              <strong>Email:</strong> {displayApplicant.email}
            </p>
            <p>
              <strong>Type:</strong> {displayApplicant.type}
            </p>
            <p>
              <strong>Status:</strong> {displayApplicant.status}
            </p>
            <p>
              <strong>Applied On:</strong>{" "}
              {new Date(displayApprovalData.submittedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      {/* Rejection Reason Modal - Only for approvals context */}
      {context === "approvals" && (
        <RejectionReasonModal
          isOpen={showRejectionModal}
          onClose={() => setShowRejectionModal(false)}
          onConfirm={handleReject}
          isLoading={isApprovalActionLoading}
          entityType="training"
        />
      )}

      {/* Hold Reason Modal - Only for approvals context */}
      {context === "approvals" && (
        <HoldReasonModal
          isOpen={showHoldModal}
          onClose={() => setShowHoldModal(false)}
          onConfirm={handleHold}
          isLoading={isApprovalActionLoading}
          entityType="training"
        />
      )}

      {/* Edit Training Drawer - Only for jobs-and-trainings context */}
      {context === "jobs-and-trainings" && (
        <EditTrainingDrawer
          training={displayTraining}
          isOpen={isEditDrawerOpen}
          onClose={() => setIsEditDrawerOpen(false)}
          onRevalidate={onRevalidate}
        />
      )}
    </div>
  );
};

export default TrainingDetailsDrawer;
