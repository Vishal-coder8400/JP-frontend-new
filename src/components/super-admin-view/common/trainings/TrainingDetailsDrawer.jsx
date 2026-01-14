import { Badge } from "@/components/ui/badge";
import {
  ClockIcon,
  DollarSignIcon,
  CalendarIcon,
  MapPinIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useGetTrainingDetails } from "../../../../hooks/super-admin/useTraining";
import { formatApiError } from "../../../../utils/commonFunctions";
import {
  useApprovals,
  useGetApprovalDetails,
} from "../../../../hooks/super-admin/useApprovals";
import RejectionReasonModal from "@/components/common/RejectionReasonModal";
import HoldReasonModal from "@/components/common/HoldReasonModal";
import EditTrainingDrawer from "./EditTrainingDrawer";
import ActionButtons from "../../shared/ActionButtons";
import StatusReasonAlert from "@/components/common/StatusReasonAlert";

const TrainingDetailsDrawer = ({
  trainingId,
  context = "database", // "database", "approvals"
  areApprovalBtnsVisible = false,
  approvalId,
  approvalStatus,
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
    refetch: refetchTrainingDetails,
  } = useGetTrainingDetails(trainingId, {
    enabled: !!trainingId,
  });

  const { data: approvalDetails } = useGetApprovalDetails(approvalId, {
    enabled: !!approvalId && context === "approvals",
  });

  const {
    isLoading: isApprovalActionLoading,
    approveApplication,
    rejectApplication,
    holdApplication,
  } = useApprovals();

  const isLoading = isLoadingDetails;
  const error = detailsError;
  const statusReason = approvalDetails?.data?.reviewerNotes;

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

  const handleTrainingUpdate = async () => {
    try {
      await refetchTrainingDetails();
      if (onRevalidate) {
        await onRevalidate();
      }
    } catch (error) {
      console.error("Failed to refetch training details:", error);
    }
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

  if (!trainingData?.data?.training) {
    return (
      <div className="min-h-screen flex flex-col bg-white p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">No training details found</div>
        </div>
      </div>
    );
  }

  const displayTraining = trainingData?.data?.training;

  const renderActionButtons = () => {
    const isApprovalsContext =
      context === "approvals" && areApprovalBtnsVisible;
    const isDatabaseContext = context === "database";

    if (!isDatabaseContext && !isApprovalsContext) {
      return null;
    }

    return (
      <ActionButtons
        context={isApprovalsContext ? "approvals" : "other"}
        onEdit={() => setIsEditDrawerOpen(true)}
        onApprove={handleApprove}
        onReject={handleRejectClick}
        onHold={handleHoldClick}
        isLoading={isApprovalActionLoading}
        entityName="Training"
        editButtonVariant="outline"
        editButtonSize="sm"
        showApprovalButtons={areApprovalBtnsVisible}
        layout="vertical"
        approvalStatus={
          approvalStatus ||
          displayTraining?.approvalStatus ||
          displayTraining?.status
        }
      />
    );
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
            <div className="flex flex-col">
              <span className="font-bold text-gray-700">
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

            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
              <span className="text-gray-700">
                <strong>How many participants will be in each batch:</strong>{" "}
                {displayTraining?.participantsPerBatch || "-"}
              </span>
            </li>

            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
              <span className="text-gray-700">
                <strong>Total Number of Sessions:</strong>{" "}
                {displayTraining?.sessionsExpected || "-"}
              </span>
            </li>

            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
              <span className="text-gray-700">
                <strong>
                  Do you expect the trainer to provide study materials or
                  slides?
                </strong>{" "}
                {displayTraining?.studyMaterialsProvided === true
                  ? "Yes"
                  : "No"}
              </span>
            </li>

            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
              <span className="text-gray-700">
                <strong>
                  Would you like a demo session before confirming:
                </strong>{" "}
                {displayTraining?.demoSessionBeforeConfirming === true
                  ? "Yes"
                  : "No"}
              </span>
            </li>
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
                <strong>
                  {" "}
                  Will you cover travel/stay if the trainer needs to relocate:
                </strong>{" "}
                {displayTraining?.travelRequired === true ? "Yes" : "No"}
              </span>
            </li>

            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
              <span className="text-gray-700">
                <strong>What languages should the trainer be fluent in?</strong>{" "}
                {displayTraining?.languagesFluent?.join(", ") || "-"}
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
        {displayTraining.requiredSkills && (
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
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
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
                    "Company"
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

            {/* Training Title */}
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {displayTraining.title}
              </h1>
              {context === "approvals" &&
                (displayTraining.applicationsCount ||
                  displayTraining.candidates) && (
                  <Badge className="text-primary-purple bg-light-purple text-xs">
                    {displayTraining.applicationsCount ||
                      displayTraining.candidates}{" "}
                    Applied
                  </Badge>
                )}
            </div>

            {/* Training Details Row */}
            <div className="flex items-center gap-6 text-gray-600">
              {displayTraining.trainingMode && (
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4" />
                  <span className="text-sm">
                    {displayTraining.trainingMode}
                  </span>
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
          </div>
          <div className="shrink-0">{renderActionButtons()}</div>
        </div>
      </div>

      {/* Status Reason Display */}
      <StatusReasonAlert
        statusReason={statusReason}
        status={approvalStatus}
        className="mt-6"
      />

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
        <p className="text-gray-700">
          <strong>City:</strong> {displayTraining.postedBy?.city}
        </p>
        <p className="text-gray-700">
          <strong>State:</strong> {displayTraining.postedBy?.state}
        </p>
        <p className="text-gray-700">
          <strong>Pin Code:</strong> {displayTraining.postedBy?.pincode}
        </p>
      </div>

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

      {/* Edit Training Drawer - For database and approvals contexts */}
      {(context === "database" || context === "approvals") && (
        <EditTrainingDrawer
          training={displayTraining}
          isOpen={isEditDrawerOpen}
          onClose={() => setIsEditDrawerOpen(false)}
          onRevalidate={handleTrainingUpdate}
        />
      )}
    </div>
  );
};

export default TrainingDetailsDrawer;
