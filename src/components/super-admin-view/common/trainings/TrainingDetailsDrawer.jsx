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
import { useGetTrainingDetails } from "../../../../hooks/super-admin/useTraining";
import {
  useApprovals,
  useGetApprovalDetails,
} from "../../../../hooks/super-admin/useApprovals";
import RejectionReasonModal from "@/components/common/RejectionReasonModal";
import EditTrainingDrawer from "./EditTrainingDrawer";

const TrainingDetailsDrawer = ({
  trainingId,
  training, // For approvals context
  context = "default", // "jobs-and-trainings", "approvals", "default"
  areApprovalBtnsVisible = false,
  onClose,
  onRevalidate,
}) => {
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

  // For jobs-and-trainings context
  const {
    data: trainingData,
    isLoading: isLoadingDetails,
    error: detailsError,
  } = useGetTrainingDetails(trainingId, {
    enabled: !!trainingId && context !== "approvals",
  });

  // For approvals context
  const {
    data: approvalData,
    isLoading: isLoadingApprovals,
    error: approvalError,
  } = useGetApprovalDetails(training?.id, {
    enabled: !!training?.id && context === "approvals",
  });

  const {
    isLoading: isApprovalActionLoading,
    approveApplication,
    rejectApplication,
  } = useApprovals();

  const isLoading = isLoadingDetails || isLoadingApprovals;
  const error = detailsError || approvalError;

  const handleApprove = async () => {
    try {
      await approveApplication(training?.id);
      if (onRevalidate) {
        await onRevalidate();
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to approve training:", error);
    }
  };

  const handleReject = async (rejectionReason) => {
    try {
      await rejectApplication(training?.id, rejectionReason);
      if (onRevalidate) {
        await onRevalidate();
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to reject training:", error);
    }
  };

  const handleRejectClick = () => {
    setShowRejectionModal(true);
  };

  const handleHold = async () => {
    toast.info("Training is on hold");
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
          <div className="text-lg text-red-500">
            Error loading training details: {error.message}
          </div>
        </div>
      </div>
    );
  }

  // Determine which training data to use based on context
  let displayTraining;
  let displayApplicant;
  let displayApprovalData;

  if (context === "approvals") {
    // For approvals: approvalData.data.data.data contains the training details
    const detailedTraining = approvalData?.data?.data?.data;
    const applicant = approvalData?.data?.data?.applicant;

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
    displayApprovalData = approvalData?.data?.data;
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
      // Show approval buttons only when status is pending
      if (displayApprovalData?.status === "pending") {
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
              onClick={handleHold}
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
    if (context === "approvals") {
      return (
        <>
          <h3 className="text-lg font-semibold">About the training</h3>
          <div className="text-gray1 mt-4 space-y-2">
            <h4 className="font-semibold">Training Description</h4>
            <p>{displayTraining.description}</p>

            {displayTraining.responsibilities && (
              <>
                <h4 className="font-semibold">Key Responsibilities</h4>
                <ul className="list-disc list-inside">
                  {Array.isArray(displayTraining.responsibilities) ? (
                    displayTraining.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))
                  ) : (
                    <li>{displayTraining.responsibilities}</li>
                  )}
                </ul>
              </>
            )}

            {displayTraining.requiredSkills && (
              <>
                <h4 className="font-semibold">Required Skills</h4>
                <ul className="list-disc list-inside">
                  {Array.isArray(displayTraining.requiredSkills) ? (
                    displayTraining.requiredSkills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))
                  ) : (
                    <li>{displayTraining.requiredSkills}</li>
                  )}
                </ul>
              </>
            )}

            {displayTraining.minimumEducation && (
              <>
                <h4 className="font-semibold">Education</h4>
                <p>{displayTraining.minimumEducation}</p>
              </>
            )}

            {(displayTraining.minimumExperience ||
              displayTraining.trainingMode ||
              displayTraining.sessionFrequency ||
              displayTraining.totalDurationDays ||
              displayTraining.hoursPerDay ||
              displayTraining.subjectMatterExpertise ||
              displayTraining.qualificationsRequired ||
              displayTraining.participantsPerBatch) && (
              <>
                <h4 className="font-semibold">Other Details</h4>
                <ul className="list-disc list-inside">
                  {displayTraining.minimumExperience && (
                    <li>
                      Minimum Experience: {displayTraining.minimumExperience}
                    </li>
                  )}
                  {displayTraining.trainingMode && (
                    <li>Training Mode: {displayTraining.trainingMode}</li>
                  )}
                  {displayTraining.sessionFrequency && (
                    <li>
                      Session Frequency: {displayTraining.sessionFrequency}
                    </li>
                  )}
                  {displayTraining.totalDurationDays && (
                    <li>
                      Total Duration: {displayTraining.totalDurationDays} days
                    </li>
                  )}
                  {displayTraining.hoursPerDay && (
                    <li>Hours Per Day: {displayTraining.hoursPerDay} hours</li>
                  )}
                  {displayTraining.subjectMatterExpertise && (
                    <li>
                      Subject Matter Expertise:{" "}
                      {displayTraining.subjectMatterExpertise}
                    </li>
                  )}
                  {displayTraining.qualificationsRequired && (
                    <li>
                      Qualifications Required:{" "}
                      {displayTraining.qualificationsRequired}
                    </li>
                  )}
                  {displayTraining.participantsPerBatch && (
                    <li>
                      Participants Per Batch:{" "}
                      {displayTraining.participantsPerBatch}
                    </li>
                  )}
                  {displayTraining.travelRequired !== undefined && (
                    <li>
                      Travel Required:{" "}
                      {displayTraining.travelRequired ? "Yes" : "No"}
                    </li>
                  )}
                  {displayTraining.studyMaterialsProvided !== undefined && (
                    <li>
                      Study Materials Provided:{" "}
                      {displayTraining.studyMaterialsProvided ? "Yes" : "No"}
                    </li>
                  )}
                  {displayTraining.demoSessionBeforeConfirming !==
                    undefined && (
                    <li>
                      Demo Session Before Confirming:{" "}
                      {displayTraining.demoSessionBeforeConfirming
                        ? "Yes"
                        : "No"}
                    </li>
                  )}
                  {displayTraining.recommendationsFromPastClients !==
                    undefined && (
                    <li>
                      Recommendations From Past Clients:{" "}
                      {displayTraining.recommendationsFromPastClients
                        ? "Yes"
                        : "No"}
                    </li>
                  )}
                </ul>
              </>
            )}

            {displayTraining.contactEmail && (
              <p>
                For additional information, you can reach out to me at{" "}
                {displayTraining.contactEmail}
              </p>
            )}

            {displayTraining.languagesFluent &&
              displayTraining.languagesFluent.length > 0 && (
                <>
                  <h4 className="font-semibold">Languages Fluent</h4>
                  <div className="flex flex-wrap gap-2">
                    {displayTraining.languagesFluent.map((language, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 text-xs font-medium border-1 rounded-full"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </>
              )}

            {displayTraining.skills && displayTraining.skills.length > 0 && (
              <>
                <h4 className="font-semibold">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {displayTraining.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 text-xs font-medium border-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      );
    } else {
      // For jobs-and-trainings context
      return (
        <>
          <h3 className="text-lg font-semibold">About the training</h3>
          <div className="text-gray1 mt-4 space-y-4">
            {displayTraining.description && (
              <>
                <h4 className="font-semibold">Description</h4>
                <p>{displayTraining.description}</p>
              </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayTraining.trainingMode && (
                <div>
                  <h4 className="font-semibold">Training Mode</h4>
                  <p>{displayTraining.trainingMode}</p>
                </div>
              )}

              {displayTraining.sessionFrequency && (
                <div>
                  <h4 className="font-semibold">Session Frequency</h4>
                  <p>{displayTraining.sessionFrequency}</p>
                </div>
              )}

              {displayTraining.totalDurationDays && (
                <div>
                  <h4 className="font-semibold">Total Duration</h4>
                  <p>{displayTraining.totalDurationDays} days</p>
                </div>
              )}

              {displayTraining.hoursPerDay && (
                <div>
                  <h4 className="font-semibold">Hours Per Day</h4>
                  <p>{displayTraining.hoursPerDay} hours</p>
                </div>
              )}

              {displayTraining.sessionsExpected && (
                <div>
                  <h4 className="font-semibold">Expected Sessions</h4>
                  <p>{displayTraining.sessionsExpected} sessions</p>
                </div>
              )}

              {displayTraining.minimumExperience && (
                <div>
                  <h4 className="font-semibold">Minimum Experience</h4>
                  <p>{displayTraining.minimumExperience}</p>
                </div>
              )}

              {displayTraining.subjectMatterExpertise && (
                <div>
                  <h4 className="font-semibold">Subject Matter</h4>
                  <p>{displayTraining.subjectMatterExpertise}</p>
                </div>
              )}

              {displayTraining.participantsPerBatch && (
                <div>
                  <h4 className="font-semibold">Participants Per Batch</h4>
                  <p>{displayTraining.participantsPerBatch}</p>
                </div>
              )}
            </div>

            {displayTraining.qualificationsRequired && (
              <>
                <h4 className="font-semibold">Qualifications Required</h4>
                <p>{displayTraining.qualificationsRequired}</p>
              </>
            )}

            {displayTraining.languagesFluent &&
              displayTraining.languagesFluent.length > 0 && (
                <>
                  <h4 className="font-semibold">Languages Fluent</h4>
                  <div className="flex flex-wrap gap-2">
                    {displayTraining.languagesFluent.map((language, index) => (
                      <Badge key={index} variant="secondary">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </>
              )}

            {displayTraining.technicalSkills &&
              displayTraining.technicalSkills.length > 0 && (
                <>
                  <h4 className="font-semibold">Technical Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {displayTraining.technicalSkills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </>
              )}
          </div>
        </>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white p-6">
      {/* Header */}
      <div className="flex justify-between gap-4 p-6 border-1 border-gray2 rounded-lg">
        {context === "approvals" && displayTraining.companyLogo ? (
          <img
            src={displayTraining.companyLogo}
            alt={displayTraining.company || displayApplicant?.name}
            className="h-10 w-10 rounded-md"
          />
        ) : context === "approvals" ? (
          <img
            src="/google.png"
            alt="Company Logo"
            className="h-6 w-6 text-gray-400"
          />
        ) : null}

        <div className="flex-1">
          {context === "approvals" ? (
            <>
              {displayTraining?.company && <p>{displayTraining.company}</p>}
              <div className="flex items-center gap-4">
                <p className="text-xl font-medium">{displayTraining.title}</p>
                {(displayTraining.applicationsCount ||
                  displayTraining.candidates) && (
                  <Badge className="text-primary-purple bg-light-purple text-xs">
                    {displayTraining.applicationsCount ||
                      displayTraining.candidates}{" "}
                    Applied
                  </Badge>
                )}
              </div>
              <div className="text-gray1 flex items-center gap-6 mt-2">
                {displayTraining.trainingMode && (
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-gray1" />
                    {displayTraining.trainingMode}
                  </div>
                )}
                {displayTraining.subjectMatterExpertise && (
                  <div className="flex items-center gap-2">
                    <LocationIcon className="h-4 w-4 text-gray1" />
                    {displayTraining.subjectMatterExpertise}
                  </div>
                )}
                {displayTraining.participantsPerBatch && (
                  <div className="flex items-center gap-2">
                    <DollarSignIcon className="h-4 w-4 text-gray1" />
                    {displayTraining.participantsPerBatch} participants per
                    batch
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-4">
                {displayTraining.title && (
                  <p className="text-xl font-medium">{displayTraining.title}</p>
                )}
                <Badge
                  className={`text-xs ${
                    displayTraining.status === "active"
                      ? "text-green-600 bg-green-100"
                      : displayTraining.status === "closed"
                      ? "text-red-600 bg-red-100"
                      : "text-gray-600 bg-gray-100"
                  }`}
                >
                  {displayTraining.status?.charAt(0).toUpperCase() +
                    displayTraining.status?.slice(1)}
                </Badge>
              </div>
              <div className="text-gray1 flex items-center gap-6 mt-2">
                {displayTraining.trainingMode && (
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-gray1" />
                    {displayTraining.trainingMode}
                  </div>
                )}
                {displayTraining.subjectMatterExpertise && (
                  <div className="flex items-center gap-2">
                    <LocationIcon className="h-4 w-4 text-gray1" />
                    {displayTraining.subjectMatterExpertise}
                  </div>
                )}
                {displayTraining.participantsPerBatch && (
                  <div className="flex items-center gap-2">
                    <DollarSignIcon className="h-4 w-4 text-gray1" />
                    {displayTraining.participantsPerBatch} participants per
                    batch
                  </div>
                )}
              </div>
            </>
          )}

          {displayTraining.createdAt && (
            <div className="text-gray1 flex items-center gap-2 mt-2">
              <CalendarIcon className="h-4 w-4 text-gray1" />
              {context === "approvals"
                ? new Date(displayTraining.createdAt).toLocaleDateString()
                : `Created: ${new Date(
                    displayTraining.createdAt
                  ).toLocaleDateString()}`}
            </div>
          )}
        </div>

        {renderActionButtons()}
      </div>

      {/* Content */}
      <div className="p-6 border-1 border-gray2 rounded-lg mt-6">
        {renderTrainingContent()}
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
