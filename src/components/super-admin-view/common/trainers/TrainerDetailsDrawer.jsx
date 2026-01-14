import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { YourImageIcon, YourPdfIcon } from "@/utils/icon";
import {
  DownloadIcon,
  LinkIcon,
  MailIcon,
  MapPin,
  PhoneCallIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";
import {
  useApprovals,
  useGetApprovalDetails,
} from "@/hooks/super-admin/useApprovals";
import { useApplicationApprovals } from "@/hooks/super-admin/useApplicationApprovals";
import { useGetTrainerDetails } from "@/hooks/super-admin/useTrainers";
import EditTrainerDrawer from "./EditTrainerDrawer";
import RejectionReasonModal from "@/components/common/RejectionReasonModal";
import HoldReasonModal from "@/components/common/HoldReasonModal";
import AdminStatusBadge from "../../shared/AdminStatusBadge";
import ActionButtons from "../../shared/ActionButtons";
import { toast } from "sonner";
import StatusReasonAlert from "@/components/common/StatusReasonAlert";

const TrainerDetailsDrawer = ({
  context = "other", // "database", "approvals", "application", or "other"
  approvalId,
  trainerId,
  onClose,
  onRevalidate,
  buttonsLayout = "horizontal", // "horizontal" | "vertical"
  approvalStatus,
}) => {
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showHoldModal, setShowHoldModal] = useState(false);

  const approvalsHook = useApprovals();
  const applicationApprovalsHook = useApplicationApprovals("training");

  const {
    isLoading: isApprovalLoading,
    approveApplication,
    rejectApplication,
    holdApplication,
  } = context === "application"
    ? {
        isLoading: applicationApprovalsHook.isLoading,
        approveApplication: (id) => applicationApprovalsHook.handleApprove(id),
        rejectApplication: (id, notes) =>
          applicationApprovalsHook.handleReject(id, notes),
        holdApplication: (id, notes) =>
          applicationApprovalsHook.handleHold(id, notes),
      }
    : approvalsHook;

  const {
    data: trainerDetails,
    isLoading: isLoadingTrainerDetails,
    error: trainerDetailsError,
    refetch: refetchTrainerDetails,
  } = useGetTrainerDetails(trainerId, {
    enabled: !!trainerId,
  });

  const { data: approvalDetails } = useGetApprovalDetails(approvalId, {
    enabled: !!approvalId && context === "approvals",
  });

  const displayTrainer = trainerDetails?.data;
  const statusReason = approvalDetails?.data?.reviewerNotes;
  const isLoading = isLoadingTrainerDetails;
  const error = trainerDetailsError;

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

  const pdfObject = {
    "Adhaar Card": ["aadharImage", "kycDetails.aadharDetails.image"],
    "PAN Card": ["panCardImage", "kycDetails.panDetails.image"],
    "Cancel Cheque": [
      "cancelledChequeImage",
      "kycDetails.cancelChequeOrPassbookImage",
    ],
    "Relieving Letter": "relievingLetter",
    Resume: "resume",
  };

  const pdfFiles = Object.entries(pdfObject).reduce(
    (acc, [customKey, paths]) => {
      const pathArray = Array.isArray(paths) ? paths : [paths];
      let value = null;

      for (const path of pathArray) {
        value = path
          .split(".")
          .reduce((obj, key) => obj?.[key], displayTrainer);
        if (value) break;
      }

      if (Array.isArray(value) && value.length > 0) {
        value.forEach((doc, index) => {
          acc[`${customKey} ${index + 1}`] = doc;
        });
      } else {
        acc[customKey] = value || null;
      }
      return acc;
    },
    {}
  );

  // Add education documents to pdfFiles
  if (Array.isArray(displayTrainer?.education)) {
    displayTrainer.education.forEach((edu, index) => {
      if (edu?.document) {
        pdfFiles[`Qualification ${index + 1}`] = edu.document;
      }
    });
  }

  const renderActionButtons = () => {
    return (
      <ActionButtons
        context={context}
        onEdit={handleEdit}
        onApprove={handleApprove}
        onReject={handleRejectClick}
        onHold={handleHoldClick}
        isLoading={isApprovalLoading}
        approvalStatus={
          approvalStatus ||
          displayTrainer?.approvalStatus ||
          displayTrainer?.status
        }
        entityName="Trainer"
        editButtonVariant="gray"
        editButtonSize="sm"
        layout={buttonsLayout}
      />
    );
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="h-[186px] w-full bg-[url('/Group_1000005865.jpg')] bg-cover bg-center rounded-tl-2xl" />
      <div className="w-[90%] mx-auto flex items-center rounded-xl bg-white border border-gray2 p-4 -mt-8 shadow-lg relative">
        {displayTrainer?.profileImage ? (
          <img
            src={displayTrainer?.profileImage}
            alt={displayTrainer?.name}
            className="w-24 h-auto aspect-square object-cover rounded-full absolute -top-[18%] left-[3%]"
          />
        ) : (
          <div className="w-24 h-auto aspect-square object-cover rounded-full absolute -top-[18%] left-[3%] bg-gray-300 flex items-center justify-center">
            <UserIcon className="w-10 h-10 text-gray-400" />
          </div>
        )}
        <div className="ml-28 flex items-center justify-between w-full">
          <div>
            <h1 className="text-lg font-semibold">{displayTrainer?.name}</h1>
            <p className="text-sm text-gray-500">{displayTrainer?.email}</p>
          </div>
          {renderActionButtons()}
        </div>
      </div>

      {/* Status Reason Display */}
      <StatusReasonAlert
        statusReason={statusReason}
        status={approvalStatus}
        className="mt-10 mx-6"
      />

      {/* Personal Information */}
      <div className="p-6">
        <h2 className="text-lg font-semibold">Personal Information</h2>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="p-4 rounded-lg border border-gray2">
            <div className="flex items-center gap-2 mb-2 text-sm">
              <UserIcon className="w-4" />
              Experience
            </div>
            <span className="text-gray1/50 text-sm text-wrap">
              {displayTrainer?.totalYearsExperience !== undefined && displayTrainer?.totalYearsExperience !== null
                ? `${displayTrainer.totalYearsExperience} years`
                : displayTrainer?.totalMonthsExperience !== undefined && displayTrainer?.totalMonthsExperience !== null
                ? `${displayTrainer.totalMonthsExperience} months`
                : "Not specified"}
            </span>
          </div>

          <div className="p-4 rounded-lg border border-gray2">
            <div className="flex items-center gap-2 mb-2 text-sm">
              <UserIcon className="w-4" />
              Expertise
            </div>
            <div className="text-gray1/50 text-sm text-wrap">
              {displayTrainer?.expertiseAreas &&
              displayTrainer.expertiseAreas.length > 0
                ? displayTrainer.expertiseAreas.map((skill, index) => (
                    <span key={index} className="inline-block">
                      {skill?.skillName || skill?.name || skill?._id || "Skill"}
                      {index < displayTrainer.expertiseAreas.length - 1 && (
                        <br />
                      )}
                    </span>
                  ))
                : "Not specified"}
            </div>
          </div>

          <div className="p-4 rounded-lg border border-gray2">
            <div className="flex items-center gap-2 mb-2 text-sm">
              <PhoneCallIcon className="w-4" />
              Contact Information
            </div>
            <div className="space-y-1">
              <span className="text-gray1/50 inline-flex items-center gap-2 text-sm text-wrap">
                <PhoneCallIcon className="w-4" />
                {displayTrainer?.phoneNumber || "-"}
              </span>
              <span className="text-gray1/50 inline-flex items-center gap-2 text-sm">
                <MailIcon className="w-4" />
                <span className="break-all">
                  {displayTrainer?.email || "Not provided"}
                </span>
              </span>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-gray2">
            <div className="flex items-center gap-2 mb-2 text-sm">
              <MapPin className="w-4" />
              Address
            </div>
            <span className="text-gray1/50 text-sm text-wrap">
              {displayTrainer?.currentAddress ||
                displayTrainer?.permanentAddress ||
                "Not specified"}
            </span>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="px-6">
        <h2 className="text-lg font-semibold">Education</h2>
        <div className="mt-3 space-y-3">
          {Array.isArray(displayTrainer?.education) && displayTrainer.education.length > 0 ? (
            displayTrainer.education.map((edu, index) => (
              <div key={index} className="border border-gray-200 rounded p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium capitalize">{edu?.degree || "Not specified"}</p>
                    <p className="text-sm text-gray-600">{edu?.institution || "Not specified"}</p>
                    <p className="text-xs text-gray-500">
                      {edu?.fieldOfStudy ? `${edu.fieldOfStudy} • ` : ""}
                      {edu?.startDate || ""}
                      {edu?.endDate ? ` - ${edu.endDate}` : ""}
                    </p>
                  </div>
                  {edu?.document && (
                    <a
                      href={edu.document}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-sm flex items-center gap-1"
                    >
                      <DownloadIcon className="w-4 h-4" /> Document
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No education details available</p>
          )}
        </div>
      </div>

      {/* Documents */}
      <div className="px-6 pb-6 mt-6">
        <h2 className="text-lg font-semibold">Documents</h2>
        <div className="flex flex-wrap gap-3 mt-3">
          {Object.entries(pdfFiles).map(([key, value]) => {
            if (!value || typeof value !== "string") return null;
            const isPdf =
              value.toLowerCase().includes('.pdf') || 
              key.toLowerCase().includes('resume') ||
              key.toLowerCase().includes('letter');
            const fileName = value.split("/").pop();
            const handleDownload = () => {
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
                  <div className="cursor-pointer" onClick={handleDownload}>
                    <DownloadIcon className="w-4 h-4" />
                  </div>
                </div>
                <div
                  className="flex-1 w-full overflow-hidden rounded-sm mb-2 cursor-pointer"
                  onClick={() => window.open(value, "_blank")}
                >
                  {isPdf ? (
                    <iframe
                      src={`${value}#toolbar=0&navpanes=0&scrollbar=0`}
                      title={key}
                      className="w-full h-full border-none no-scrollbar pointer-events-none"
                    />
                  ) : (
                    <img
                      src={value}
                      alt={key}
                      className="w-full h-full object-cover rounded-sm"
                    />
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
                LinkedIn
              </span>
              <a
                href={displayTrainer?.linkedin}
                target="_blank"
                className="font-medium flex items-center gap-1 text-blue-500"
              >
                <LinkIcon className="w-4 h-4" /> View
              </a>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Gender
              </span>
              <span className="font-medium capitalize">
                {displayTrainer?.gender || "Not specified"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Marital Status
              </span>
              <span className="font-medium capitalize">
                {displayTrainer?.maritalStatus || "Not specified"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                PAN Number
              </span>
              <span className="font-medium">
                {displayTrainer?.panCardNumber || "Not specified"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Aadhar Number
              </span>
              <span className="font-medium">
                {displayTrainer?.aadharNumber || "Not specified"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Bank Account
              </span>
              <span className="font-medium">
                {displayTrainer?.bankAccountNumber || "Not specified"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Bank IFSC Code
              </span>
              <span className="font-medium">
                {displayTrainer?.bankIFSCCode || "Not specified"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Account Holder
              </span>
              <span className="font-medium">
                {displayTrainer?.accountHolderName || "Not specified"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Last Organization
              </span>
              <span className="font-medium">
                {displayTrainer?.WorkingDetails?.companyName || "Not specified"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Designation in last Organization
              </span>
              <span className="font-medium">
                {displayTrainer?.WorkingDetails?.designation || "Not specified"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Last Job Period
              </span>
              <span className="font-medium">
                {displayTrainer?.WorkingDetails?.startDate || ""}
                {displayTrainer?.WorkingDetails?.endDate ? ` - ${displayTrainer.WorkingDetails.endDate}` : ""}
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
                Why you want to proceed ahead with this Gig Training assignment?
              </span>
              <span className="font-medium">
                {displayTrainer?.whyProceedWithGigTraining || 
                 displayTrainer?.gigTrainingReason || 
                 "Not specified"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Average monthly sessions in last work
              </span>
              <span className="font-medium">
                {displayTrainer?.averageMonthlySessions !== undefined && displayTrainer?.averageMonthlySessions !== null
                  ? `${displayTrainer.averageMonthlySessions} sessions`
                  : displayTrainer?.avgMonthlySessions || "Not specified"}
              </span>
            </div>
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                How did you know about this opportunity
              </span>
              <span className="font-medium">
                {displayTrainer?.howDidYouKnowAboutOpportunity || 
                 displayTrainer?.opportunitySource || 
                 displayTrainer?.opportunitySourceOther || 
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
            {displayTrainer?.hasMedicalProblem && (
              <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
                <span className="text-gray1/50 inline-block w-50 text-wrap">
                  Medical Problem Details
                </span>
                <span className="font-medium">
                  {displayTrainer?.medicalProblemDetails || "Not specified"}
                </span>
              </div>
            )}
            <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
              <span className="text-gray1/50 inline-block w-50 text-wrap">
                Professional achievements
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
            <div className="mt-3 space-y-3">
              {Array.isArray(displayTrainer?.certificates) && displayTrainer.certificates.length > 0 ? (
                displayTrainer.certificates.map((cert, index) => (
                  <div key={index} className="border border-gray-200 rounded p-4">
                    <p className="font-medium">{cert?.title || "Certification"}</p>
                    <p className="text-sm text-gray-600">{cert?.organisation || ""}</p>
                    <p className="text-xs text-gray-500">
                      {cert?.issueDate || ""}
                      {cert?.expiryDate ? ` - ${cert.expiryDate}` : ""}
                    </p>
                  </div>
                ))
              ) : (
                <span className="text-gray-500">
                  No certificates available
                </span>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold">Expertise Level</h2>
            <div className="flex gap-3 items-center flex-wrap mt-3">
              {Array.isArray(displayTrainer?.expertiseLevel) && displayTrainer.expertiseLevel.length > 0 ? (
                displayTrainer.expertiseLevel.map((expertise, i) => (
                  <Badge
                    key={i}
                    className="flex justify-between border-b border-gray2 text-gray1 py-2 px-4 text-sm rounded-2xl"
                  >
                    {expertise}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500">
                  No expertise level specified
                </span>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold">Training Images</h2>
            <div className="flex flex-wrap gap-3 mt-2">
              {Array.isArray(displayTrainer?.trainingPictures) && displayTrainer.trainingPictures.length > 0 ? (
                displayTrainer.trainingPictures.map((img, i) => {
                  if (!img || typeof img !== "string") return null;
                  const fileName = img.split("/").pop();
                  const handleDownload = () => {
                    const link = document.createElement("a");
                    link.href = img;
                    link.target = "_blank";
                    link.download = fileName || `Training-${i + 1}.jpg`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  };
                  return (
                    <div
                      key={i}
                      className="relative overflow-hidden p-3 w-[180px] h-[100px] flex flex-col bg-stone-50 rounded-lg gap-2"
                    >
                      <div className="flex justify-between items-center w-full mb-2">
                        <div className="flex items-center gap-1">
                          <YourImageIcon />
                          <div className="text-neutral-900 text-xs font-medium leading-none">
                            Training {i + 1}
                          </div>
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={handleDownload}
                        >
                          <DownloadIcon className="w-4 h-4" />
                        </div>
                      </div>
                      <div
                        className="flex-1 w-full overflow-hidden rounded-sm mb-2 cursor-pointer"
                        onClick={() => window.open(img, "_blank")}
                      >
                        <img
                          src={img}
                          alt={`Training ${i + 1}`}
                          className="w-full h-full object-cover rounded-sm"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 w-full px-3 py-1 bg-stone-50 text-zinc-600 text-xs truncate border-t border-stone-200">
                        {fileName}
                      </div>
                    </div>
                  );
                })
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

      {/* Rejection Reason Modal - Only for approvals and application contexts */}
      {(context === "approvals" || context === "application") && (
        <RejectionReasonModal
          isOpen={showRejectionModal}
          onClose={() => setShowRejectionModal(false)}
          onConfirm={handleReject}
          isLoading={isApprovalLoading}
          entityType="trainer"
        />
      )}

      {/* Hold Reason Modal - Only for approvals and application contexts */}
      {(context === "approvals" || context === "application") && (
        <HoldReasonModal
          isOpen={showHoldModal}
          onClose={() => setShowHoldModal(false)}
          onConfirm={handleHold}
          isLoading={isApprovalLoading}
          entityType="trainer"
        />
      )}
    </div>
  );
};

export default TrainerDetailsDrawer;