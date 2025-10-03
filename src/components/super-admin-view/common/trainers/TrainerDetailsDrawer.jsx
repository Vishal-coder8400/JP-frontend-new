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
import { toast } from "sonner";
import {
  useApprovals,
  useGetApprovalDetails,
} from "@/hooks/super-admin/useApprovals";
import { useGetTrainerDetails } from "@/hooks/super-admin/useTrainers";
import EditTrainerDrawer from "./EditTrainerDrawer";
import RejectionReasonModal from "@/components/common/RejectionReasonModal";
import AdminStatusBadge from "../../shared/AdminStatusBadge";

const TrainerDetailsDrawer = ({
  trainer,
  context = "other", // "database", "approvals", or "other"
  onClose,
  onRevalidate,
}) => {
  const [hasApprovalAction, setHasApprovalAction] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);

  const {
    isLoading: isApprovalLoading,
    approveApplication,
    rejectApplication,
    holdApplication,
  } = useApprovals();

  // Fetch detailed trainer data using appropriate endpoint based on context
  const {
    data: approvalDetails,
    isLoading: isLoadingApprovalDetails,
    error: approvalDetailsError,
  } = useGetApprovalDetails(trainer?._id || trainer?.id, {
    enabled: !!(trainer?._id || trainer?.id) && context === "approvals",
  });

  const {
    data: trainerDetails,
    isLoading: isLoadingTrainerDetails,
    error: trainerDetailsError,
  } = useGetTrainerDetails(trainer?._id || trainer?.id, {
    enabled: !!(trainer?._id || trainer?.id) && context !== "approvals",
  });

  // Use appropriate data based on which API was called
  const displayTrainer =
    context === "approvals"
      ? approvalDetails?.data?.data || trainer
      : trainerDetails?.data?.data || trainer;
  const isLoading =
    context === "approvals"
      ? isLoadingApprovalDetails
      : isLoadingTrainerDetails;
  const error =
    context === "approvals" ? approvalDetailsError : trainerDetailsError;

  const handleApprove = async () => {
    try {
      await approveApplication(displayTrainer._id);
      setHasApprovalAction(true);
      if (onRevalidate) {
        await onRevalidate();
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to approve trainer:", error);
    }
  };

  const handleReject = async (rejectionReason) => {
    try {
      await rejectApplication(displayTrainer._id, rejectionReason);
      setHasApprovalAction(true);
      if (onRevalidate) {
        await onRevalidate();
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to reject trainer:", error);
    }
  };

  const handleRejectClick = () => {
    setShowRejectionModal(true);
  };

  const handleHold = () => {
    toast.info("Trainer is on hold");
  };

  const handleEdit = () => {
    setIsEditDrawerOpen(true);
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

  const pdfObject = {
    Resume: displayTrainer?.resume || "",
    "Relieving Letter": displayTrainer?.relievingLetter || "",
    Certificates: displayTrainer?.certificates || "",
  };

  const pdfFiles = Object.entries(pdfObject).reduce(
    (acc, [customKey, value]) => {
      if (value) {
        acc[customKey] = value;
      }
      return acc;
    },
    {}
  );

  // Render action buttons based on context
  const renderActionButtons = () => {
    if (context === "database") {
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={handleEdit}
          className="flex items-center gap-2 cursor-pointer"
        >
          <SquarePenIcon className="w-4 h-4" />
          Edit Trainer
        </Button>
      );
    } else if (context === "approvals") {
      // Get approval status from the trainer data
      const approvalStatus =
        displayTrainer?.approvalStatus || displayTrainer?.status;

      if (approvalStatus !== "pending") {
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

      // Show approval buttons only for pending trainers and if no action has been taken
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
              onClick={handleHold}
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
            <p className="text-sm text-gray-600">{displayTrainer?.email}</p>
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
              {displayTrainer?.experience || "Not specified"}
            </span>
          </div>

          <div className="p-4 rounded-lg border border-gray2">
            <div className="flex items-center gap-2 mb-2">
              <UserIcon className="w-4" />
              Expertise
            </div>
            <div className="text-gray1/50">
              {displayTrainer?.expertise && displayTrainer.expertise.length > 0
                ? displayTrainer.expertise.map((skill, index) => (
                    <span key={index} className="inline-block">
                      {skill}
                      {index < displayTrainer.expertise.length - 1 && <br />}
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
              {displayTrainer?.phone || "Not provided"}
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
              {displayTrainer?.address ||
                displayTrainer?.location ||
                "Not specified"}
            </span>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold">Documents</h2>
        <div className="flex flex-wrap gap-3 mt-2">
          {Object.entries(pdfFiles).map(([key, value]) => {
            const isPdf = key === "Resume" || key === "Relieving Letter";
            const fileName = value?.split("/").pop();
            const handleDownload = () => {
              if (!value) return;
              const link = document.createElement("a");
              link.href = value;
              link.target = "_blank";
              link.download = fileName || `${key}.pdf`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            };
            return (
              <div
                key={key}
                className="relative overflow-hidden p-3 w-[180px] h-[100px] flex flex-col bg-stone-50 rounded-lg gap-2"
              >
                <div className="flex justify-between items-center w-full mb-2">
                  <div className="flex items-center gap-1">
                    {isPdf ? <YourPdfIcon /> : <YourImageIcon />}
                    <div className="text-neutral-900 text-xs font-medium leading-none">
                      {key}
                    </div>
                  </div>
                  {value?.trim() && (
                    <div className="cursor-pointer" onClick={handleDownload}>
                      <DownloadIcon className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <div className="flex-1 w-full overflow-hidden rounded-sm mb-2">
                  {value?.trim() ? (
                    isPdf ? (
                      <iframe
                        src={`${value}#toolbar=0&navpanes=0&scrollbar=0`}
                        title={key}
                        className="w-full h-full border-none no-scrollbar"
                      />
                    ) : (
                      <img
                        src={value}
                        alt={key}
                        className="w-full h-full object-cover rounded-sm"
                      />
                    )
                  ) : (
                    <div className="text-center text-gray-400 text-xs h-full flex items-center justify-center">
                      No file found
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 w-full px-3 py-1 bg-stone-50 text-zinc-600 text-xs truncate border-t border-stone-200">
                  {fileName}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-6 pb-6 grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mt-4">Other Details</h2>
          <div className="space-y-2 mt-3">
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Specialization
              </span>
              <span className="font-medium">
                {displayTrainer?.specialization || "Not specified"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Industry
              </span>
              <span className="font-medium">
                {displayTrainer?.industry || "Not specified"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Status
              </span>
              <span className="font-medium">
                {displayTrainer?.status || "Active"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Created
              </span>
              <span className="font-medium">
                {displayTrainer?.createdAt
                  ? new Date(displayTrainer.createdAt).toLocaleDateString()
                  : "Not specified"}
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
        onRevalidate={onRevalidate}
      />

      {/* Rejection Reason Modal */}
      <RejectionReasonModal
        isOpen={showRejectionModal}
        onClose={() => setShowRejectionModal(false)}
        onConfirm={handleReject}
        isLoading={isApprovalLoading}
        entityType="trainer"
      />
    </div>
  );
};

export default TrainerDetailsDrawer;
