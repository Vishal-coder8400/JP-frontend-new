import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { YourImageIcon, YourPdfIcon } from "@/utils/icon";
import {
  DownloadIcon,
  MailIcon,
  MapPin,
  PhoneCallIcon,
  SquarePenIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";
import { useApprovals } from "@/hooks/super-admin/useApprovals";
import { useGetTrainerDetails } from "@/hooks/super-admin/useTrainers";
import EditTrainerDrawer from "./EditTrainerDrawer";
import RejectionReasonModal from "@/components/common/RejectionReasonModal";
import HoldReasonModal from "@/components/common/HoldReasonModal";
import AdminStatusBadge from "../../shared/AdminStatusBadge";
import { toast } from "sonner";

const TrainerDetailsDrawer = ({
  trainer,
  context = "other", // "database", "approvals", or "other"
  approvalId,
  trainerId,
  onClose,
  onRevalidate,
}) => {
  const [hasApprovalAction, setHasApprovalAction] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showHoldModal, setShowHoldModal] = useState(false);

  const {
    isLoading: isApprovalLoading,
    approveApplication,
    rejectApplication,
    holdApplication,
  } = useApprovals();

  const {
    data: trainerDetails,
    isLoading: isLoadingTrainerDetails,
    error: trainerDetailsError,
    refetch: refetchTrainerDetails,
  } = useGetTrainerDetails(trainerId || trainer?._id || trainer?.id, {
    enabled: !!(trainerId || trainer?._id || trainer?.id),
  });

  const displayTrainer = trainerDetails?.data?.data || trainer;
  const isLoading = isLoadingTrainerDetails;
  const error = trainerDetailsError;

  console.log("displayTrainer", displayTrainer);
  const handleApprove = async () => {
    try {
      await approveApplication(approvalId);
      setHasApprovalAction(true);
      if (onRevalidate) {
        await onRevalidate();
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to approve trainer:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to approve trainer. Please try again."
      );
    }
  };

  const handleReject = async (rejectionReason) => {
    try {
      await rejectApplication(approvalId, rejectionReason);
      setHasApprovalAction(true);
      if (onRevalidate) {
        await onRevalidate();
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to reject trainer:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to reject trainer. Please try again."
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
      console.error("Failed to hold trainer:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to hold trainer. Please try again."
      );
    }
  };

  const handleHoldClick = () => {
    setShowHoldModal(true);
  };

  const handleEdit = () => {
    setIsEditDrawerOpen(true);
  };

  const handleTrainerUpdate = async () => {
    // Only trigger parent component revalidation for list updates
    // Trainer details are automatically refetched by React Query's invalidateQueries
    if (onRevalidate) {
      await onRevalidate();
    }
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-purple mx-auto mb-4"></div>
          <p className="text-gray-600">Loading trainer details...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <p className="text-red-600 mb-2">Failed to load trainer details</p>
          <p className="text-gray-500 text-sm">
            {error.message || "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  // Handle no trainer data
  if (!displayTrainer) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No trainer data available</p>
        </div>
      </div>
    );
  }

  const pdfFiles = displayTrainer?.qualificationDocuments || [];

  // Render action buttons based on context
  const renderActionButtons = () => {
    if (context === "approvals") {
      // Get approval status from the trainer data
      const approvalStatus =
        displayTrainer?.approvalStatus || displayTrainer?.status;

      if (approvalStatus === "approved") {
        return (
          <div className="flex flex-col gap-2">
            <AdminStatusBadge status={approvalStatus} />
            {approvalStatus === "rejected" &&
              displayTrainer?.rejectionReason && (
                <div className="text-xs text-red-600 bg-red-50 p-2 rounded border max-w-xs">
                  <strong>Rejection Reason:</strong>{" "}
                  {displayTrainer.rejectionReason}
                </div>
              )}
          </div>
        );
      }

      // Show approval buttons in every case except approved and if no action has been taken
      if (!hasApprovalAction) {
        return (
          <div className="flex items-center gap-4">
            <Button
              variant="purple"
              onClick={handleApprove}
              disabled={isApprovalLoading}
            >
              {isApprovalLoading ? "Processing..." : "Approve Trainer"}
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectClick}
              disabled={isApprovalLoading}
            >
              {isApprovalLoading ? "Processing..." : "Reject Trainer"}
            </Button>
            <Button
              variant="black"
              onClick={handleHoldClick}
              disabled={isApprovalLoading}
            >
              {isApprovalLoading ? "Processing..." : "Hold Trainer"}
            </Button>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="h-[186px] w-full bg-[url('/Group_1000005865.jpg')] bg-cover bg-center rounded-tl-2xl" />
      <div className="w-4xl mx-auto flex items-center rounded-xl bg-white border border-gray2 p-4 -mt-8 shadow-lg relative">
        <img
          src={displayTrainer?.profileImage || "/person.png"}
          alt={`${displayTrainer?.firstName} ${displayTrainer?.lastName}`}
          className="w-28 h-auto aspect-square object-cover rounded-full absolute -top-[30%] left-[3%]"
        />
        {context === "database" && (
          <SquarePenIcon
            className="absolute -bottom-[32%] left-[12%] text-primary-purple bg-white p-1.5 rounded cursor-pointer"
            onClick={handleEdit}
          />
        )}
        <div className="ml-36 flex items-center justify-between w-full">
          <div>
            <h1 className="text-xl font-semibold">
              {displayTrainer?.firstName} {displayTrainer?.lastName}
            </h1>
          </div>
          {renderActionButtons()}
        </div>
      </div>

      {/* Personal Information */}
      <div className="p-6">
        <h2 className="text-lg font-semibold mt-4">Personal Information</h2>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="p-4 rounded-lg border border-gray2">
            <div className="flex items-center gap-2 mb-2">
              <UserIcon className="w-4" />
              Experience
            </div>
            <span className="text-gray1/50">
              {displayTrainer?.totalYearsExperience
                ? `${displayTrainer.totalYearsExperience} years`
                : "Not specified"}
            </span>
          </div>

          <div className="p-4 rounded-lg border border-gray2">
            <div className="flex items-center gap-2 mb-2">
              <UserIcon className="w-4" />
              Expertise
            </div>
            <div className="text-gray1/50">
              {displayTrainer?.expertiseAreas &&
              displayTrainer.expertiseAreas.length > 0
                ? displayTrainer.expertiseAreas.map((skill, index) => (
                    <span key={index} className="inline-block">
                      {skill}
                      {index < displayTrainer.expertiseAreas.length - 1 && (
                        <br />
                      )}
                    </span>
                  ))
                : "Not specified"}
            </div>
          </div>

          <div className="p-4 rounded-lg border border-gray2">
            <div className="flex items-center gap-2 mb-2">
              <PhoneCallIcon className="w-4" />
              Contact Information
            </div>
            <span className="text-gray1/50 inline-flex items-center gap-2">
              <PhoneCallIcon className="w-4" />
              {typeof displayTrainer?.phoneNumber === "object" &&
              displayTrainer?.phoneNumber?.countryCode
                ? `${displayTrainer.phoneNumber.countryCode} ${displayTrainer.phoneNumber.number}`
                : displayTrainer?.phoneNumber || "-"}
            </span>
            <span className="text-gray1/50 inline-flex items-center gap-2">
              <MailIcon className="w-4" />
              <span className="truncate w-40">
                {displayTrainer?.email || "Not provided"}
              </span>
            </span>
          </div>

          <div className="p-4 rounded-lg border border-gray2">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4" />
              Address
            </div>
            <span className="text-gray1/50">
              {displayTrainer?.currentAddress ||
                displayTrainer?.permanentAddress ||
                "Not specified"}
            </span>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold">Documents</h2>
        <div className="flex flex-wrap gap-3 mt-2">
          {pdfFiles.length > 0 ? (
            pdfFiles.map((doc, index) => (
              <a
                key={index}
                href={doc}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Qualification Document {index + 1}
              </a>
            ))
          ) : (
            <span className="text-gray-500">
              No qualification documents available
            </span>
          )}
        </div>
      </div>

      <div className="px-6 pb-6 grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mt-4">Other Details</h2>
          <div className="space-y-2 mt-3">
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                LinkedIn
              </span>
              <span className="font-medium">
                {displayTrainer?.linkedin || "Not specified"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Experience In
              </span>
              <span className="font-medium">
                {displayTrainer?.expertiseAreas &&
                displayTrainer.expertiseAreas.length > 0
                  ? displayTrainer.expertiseAreas.join(", ")
                  : "Not specified"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Last Organization Name
              </span>
              <span className="font-medium">
                {displayTrainer?.WorkingDetails?.lastOrganizationName ||
                  "Not specified"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Designation in last Organization
              </span>
              <span className="font-medium">
                {displayTrainer?.WorkingDetails?.lastDesignation ||
                  "Not specified"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Latest Qualification
              </span>
              <span className="font-medium">
                {displayTrainer?.latestQualification || "Not specified"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Why you want to proceed ahead with this Gig Training assignment
                ?
              </span>
              <span className="font-medium">
                {displayTrainer?.whyProceedWithGigTraining || "Not specified"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                How many average number of monthly sessions were you able to
                make in your last work assignment
              </span>
              <span className="font-medium">
                {displayTrainer?.averageMonthlySessions || "Not specified"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                How do you come to know about this opportunity
              </span>
              <span className="font-medium">
                {displayTrainer?.howDidYouKnowAboutOpportunity ||
                  "Not specified"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Father Name
              </span>
              <span className="font-medium">
                {displayTrainer?.fatherName || "Not specified"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Mother Name
              </span>
              <span className="font-medium">
                {displayTrainer?.motherName || "Not specified"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Any Medical problem
              </span>
              <span className="font-medium">
                {displayTrainer?.hasMedicalProblem ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Any professional achievement which you will like to highlight
              </span>
              <span className="font-medium">
                {displayTrainer?.professionalAchievements || "Not specified"}
              </span>
            </div>
          </div>
        </div>

        <div>
          <div>
            <h2 className="text-lg font-semibold mt-4">Certifications</h2>
            <div className="flex gap-3 items-center flex-wrap mt-3">
              {displayTrainer?.certifications &&
              displayTrainer.certifications.length > 0 ? (
                displayTrainer.certifications.map((cert, i) => (
                  <Badge
                    key={i}
                    className="flex justify-between border-b border-gray2 text-gray1 py-2 px-4 text-sm rounded-2xl"
                  >
                    {cert}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500">
                  No certifications available
                </span>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mt-4">Training Images</h2>
            <div className="flex flex-wrap gap-3 mt-2">
              {displayTrainer?.trainingImages &&
              displayTrainer.trainingImages.length > 0 ? (
                displayTrainer.trainingImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Training ${i + 1}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                ))
              ) : (
                <span className="text-gray-500">
                  No training images available
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Trainer Drawer */}
      <EditTrainerDrawer
        isOpen={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        trainer={displayTrainer}
        onRevalidate={handleTrainerUpdate}
      />

      {/* Rejection Reason Modal */}
      <RejectionReasonModal
        isOpen={showRejectionModal}
        onClose={() => setShowRejectionModal(false)}
        onConfirm={handleReject}
        isLoading={isApprovalLoading}
        entityType="trainer"
      />

      {/* Hold Reason Modal */}
      <HoldReasonModal
        isOpen={showHoldModal}
        onClose={() => setShowHoldModal(false)}
        onConfirm={handleHold}
        isLoading={isApprovalLoading}
        entityType="trainer"
      />
    </div>
  );
};

export default TrainerDetailsDrawer;
