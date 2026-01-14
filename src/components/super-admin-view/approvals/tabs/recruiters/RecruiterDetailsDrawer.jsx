import { DownloadIcon, YourImageIcon, YourPdfIcon } from "@/utils/icon";
import { Link } from "react-router-dom";
import {
  useApprovals,
  useGetApprovalDetails,
} from "@/hooks/super-admin/useApprovals";
import { useRecruiterDetails } from "@/hooks/super-admin/useRecruiterDetails";
import RejectionReasonModal from "@/components/common/RejectionReasonModal";
import HoldReasonModal from "@/components/common/HoldReasonModal";
import EditRecruiterDrawer from "../../../common/recruiters/EditRecruiterDrawer";
import ActionButtons from "@/components/super-admin-view/shared/ActionButtons";
import { useState } from "react";
import { toast } from "sonner";
import StatusReasonAlert from "@/components/common/StatusReasonAlert";
import {
  Mail,
  User,
  Phone,
  MapPin,
  Briefcase,
  Stethoscope,
  LinkIcon,
  UserIcon,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createNotification } from "@/api/super-admin/notifications";

const RecruiterDetailsDrawer = ({
  recruiterId,
  context = "other", // "approvals" or "other"
  approvalId,
  approvalStatus,
  onClose,
  onRevalidate,
}) => {
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showHoldModal, setShowHoldModal] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);

  const {
    isLoading: isApprovalLoading,
    approveApplication,
    rejectApplication,
    holdApplication,
  } = useApprovals();

  const {
    data: recruiterDetails,
    isLoading: isLoadingDetails,
    error: detailsError,
  } = useRecruiterDetails(recruiterId, {
    enabled: !!recruiterId,
  });

  const { data: approvalDetails } = useGetApprovalDetails(approvalId, {
    enabled: !!approvalId && context === "approvals",
  });

  // Get recruiter data from the hook response
  const displayRecruiter = recruiterDetails?.data?.recruiter;
  const statusReason =
    approvalDetails?.data?.reviewerNotes ||
    displayRecruiter?.rejectionReason ||
    displayRecruiter?.holdReason;
  const isLoading = isLoadingDetails;
  const error = detailsError;

  const handleApprove = async () => {
    try {
      await approveApplication(approvalId);
      try {
        const senderId = sessionStorage.getItem("userId");
        const messageId =
          typeof crypto !== "undefined" && crypto?.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

        if (senderId) {
          await createNotification({
            messageId,
            messageContent:
              "Congratulations !!! Your gHRig account is Live now",
            senderId,
            senderType: "system",
            notificationType: "application",
            category: "approval",
            priority: "medium",
            metadata: { applicationId: approvalId },
          });
        }
      } catch (notifyErr) {
        console.warn("Notification creation failed:", notifyErr);
      }

      if (onRevalidate) {
        await onRevalidate();
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to approve recruiter:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to approve recruiter. Please try again."
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
      console.error("Failed to reject recruiter:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to reject recruiter. Please try again."
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
      console.error("Failed to hold recruiter:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to hold recruiter. Please try again."
      );
    }
  };

  const handleHoldClick = () => {
    setShowHoldModal(true);
  };

  const pdfObject = {
    Resume: "documents.resume",
    "PAN Card": "documents.panCard",
    "Aadhar Card": "documents.aadharCard",
    "Cancel Cheque": "documents.cancelledCheque",
    "Relieving Letter": "documents.relievingLetter",
    "Latest Qualification": "latestQualification",
  };
  const pdfFiles = Object.entries(pdfObject).reduce(
    (acc, [customKey, path]) => {
      const value = path
        .split(".")
        .reduce((obj, key) => obj?.[key], displayRecruiter);
      acc[customKey] = value || null;
      return acc;
    },
    {}
  );
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex flex-col w-full h-full gap-[24px] p-8 bg-white">
        <div className="flex justify-center items-center">
          <div className="text-gray-500">
            Loading displayRecruiter details...
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col w-full h-full gap-[24px] p-8 bg-white">
        <div className="flex justify-center items-center">
          <div className="text-red-500">
            Error loading displayRecruiter details:{" "}
            {error.message || "Unknown error"}
          </div>
        </div>
      </div>
    );
  }

  // Show no data state
  if (!displayRecruiter) {
    return (
      <div className="flex flex-col w-full h-full gap-[24px] p-8 bg-white">
        <div className="flex justify-center items-center">
          <div className="text-gray-500">
            No display Recruiter data available
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="relative w-full bg-white rounded-t-[16px] overflow-hidden">
        <div className="h-[186px] w-full bg-[url('/Group_1000005865.jpg')] bg-cover bg-center" />
        <div className="p-6">
          <div className="relative bg-white rounded-2xl shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] outline-1 outline-offset-[-1px] outline-neutral-300 px-6 py-4 -mt-16">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-6">
                <div className="absolute -top-3 left-4">
                  {displayRecruiter?.profileImage ? (
                    <img
                      className="size-24 object-cover rounded-full outline-2 outline-white"
                      src={displayRecruiter?.profileImage}
                      alt={displayRecruiter?.name}
                    />
                  ) : (
                    <UserIcon className="size-24 object-cover rounded-full outline-2 outline-white bg-gray-200 p-5 text-gray-600" />
                  )}
                </div>
                <div className="flex flex-col gap-2 pl-24">
                  <div className="text-lg font-medium capitalize">
                    {displayRecruiter?.name}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ActionButtons
                  context={context}
                  onEdit={() => setShowEditDrawer(true)}
                  onApprove={handleApprove}
                  onReject={handleRejectClick}
                  onHold={handleHoldClick}
                  isLoading={isLoading}
                  approvalStatus={approvalStatus || displayRecruiter?.status}
                  entityName="Recruiter"
                  editButtonVariant="gray"
                  editButtonSize="sm"
                />
              </div>
            </div>
          </div>

          {/* Status Reason Display */}
          <StatusReasonAlert
            statusReason={statusReason}
            status={approvalStatus || displayRecruiter?.status}
            className="mt-8"
          />

          <div
            className={cn(
              "self-stretch inline-flex flex-col justify-start items-start gap-6",
              statusReason ? "mt-4" : "mt-8"
            )}
          >
            <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
              Personal Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              <div className="h-48 flex flex-col p-[16px] gap-[12px] rounded-[8px] border-[#DBE0E5] border-[1px]">
                <div className="flex items-center gap-[12px]">
                  <div>
                    <Briefcase className="w-5 h-4 text-[#121417]" />
                  </div>
                  <div className="text-[#121417] text-sm font-semibold">
                    Experience
                  </div>
                </div>
                <div className="text-[#61758A] text-sm font-normal">
                  {displayRecruiter?.totalExperience} YOE
                </div>
              </div>

              <div className="h-48 flex flex-col p-[16px] gap-[12px] rounded-[8px] border-[#DBE0E5] border-[1px]">
                <div className="flex items-center gap-[12px]">
                  <div>
                    <Phone className="w-5 h-5 text-[#121417]" />
                  </div>
                  <div className="text-[#121417] text-sm font-semibold">
                    Contact Information
                  </div>
                </div>
                <div className="text-[#61758A] text-sm font-normal flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#61758A]" />
                  <div>
                    {displayRecruiter?.phone?.countryCode}{" "}
                    {displayRecruiter?.phone?.number}
                  </div>
                </div>
                <div className="text-[#61758A] text-sm font-normal flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#61758A]" />
                  <div>{displayRecruiter?.email}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch inline-flex flex-col justify-start items-start gap-6 mt-8">
            <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
              Documents
            </div>
            <div className="flex flex-wrap gap-3">
              {Object.entries(pdfFiles).map(([key, value]) => {
                const isPdf =
                  key === "Resume" ||
                  key === "Relieving Letter" ||
                  key === "Latest Qualification";
                const fileName = value?.split("/").pop();
                const handleDownload = () => {
                  if (!value) return;
                  const link = document.createElement("a");
                  link.href = value;
                  link.target = "_blank";
                  link.download = fileName || `${key}.pdf`; // default filename fallback
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
                        <div
                          className="cursor-pointer"
                          onClick={handleDownload}
                        >
                          <DownloadIcon className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <div
                      className="flex-1 w-full overflow-hidden rounded-sm mb-2 cursor-pointer"
                      onClick={() =>
                        value?.trim() && window.open(value, "_blank")
                      }
                    >
                      {value?.trim() ? (
                        isPdf ? (
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
          <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-[12px] mt-8">
            <div className="w-full lg:w-[48%] inline-flex flex-col justify-start items-start gap-6">
              <div className="self-stretch justify-start text-gray-900 text-xl font-semibold leading-tight">
                Professional Details
              </div>
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch py-4 border-t border-b border-gray-200 flex flex-col lg:flex-row justify-start items-start lg:items-center gap-2 lg:gap-28">
                  <div className="w-full lg:w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                    Sectoral Specialization
                  </div>
                  <div className="w-full lg:w-48 justify-start text-neutral-900 text-sm font-normal leading-tight break-words">
                    {displayRecruiter?.sectorSpecialization?.length > 0
                      ? displayRecruiter.sectorSpecialization.join(", ")
                      : displayRecruiter?.otherSectorSpecification ||
                        "Not specified"}
                  </div>
                </div>
                <div className="self-stretch py-4 border-t border-b border-gray-200 flex flex-col lg:flex-row justify-start items-start lg:items-center gap-2 lg:gap-28">
                  <div className="w-full lg:w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                    LinkedIn
                  </div>
                  {displayRecruiter?.linkedinProfile ? (
                    <Link
                      to={displayRecruiter?.linkedinProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full lg:w-48 justify-start text-blue-500 text-sm font-normal leading-tight truncate flex items-center gap-2"
                    >
                      <LinkIcon className="w-4 h-4" /> View
                    </Link>
                  ) : (
                    <p>-</p>
                  )}
                </div>
                <div className="self-stretch py-4 border-t border-b border-gray-200 flex flex-col lg:flex-row justify-start items-start lg:items-center gap-2 lg:gap-28">
                  <div className="w-full lg:w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                    Experience In
                  </div>
                  <div className="w-full lg:w-48 justify-start text-neutral-900 text-sm font-normal leading-tight break-words">
                    {displayRecruiter?.experienceLevel?.join(", ") ||
                      "Not Specified"}
                  </div>
                </div>
                <div className="self-stretch py-4 border-t border-b border-gray-200 flex flex-col lg:flex-row justify-start items-start lg:items-center gap-2 lg:gap-28">
                  <div className="w-full lg:w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                    Last Organization Name
                  </div>
                  <div className="w-full lg:w-48 justify-start text-neutral-900 text-sm font-normal leading-tight break-words">
                    {displayRecruiter?.lastOrganization?.name ||
                      "Not Specified"}
                  </div>
                </div>
                <div className="self-stretch py-4 border-t border-b border-gray-200 flex flex-col lg:flex-row justify-start items-start lg:items-center gap-2 lg:gap-28">
                  <div className="w-full lg:w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                    Designation in last Organization
                  </div>
                  <div className="w-full lg:w-48 justify-start text-neutral-900 text-sm font-normal leading-tight break-words">
                    {displayRecruiter?.lastOrganization?.position ||
                      "Not Specified"}
                  </div>
                </div>
                <div className="self-stretch py-4 border-t border-b border-gray-200 flex flex-col lg:flex-row justify-start items-start lg:items-center gap-2 lg:gap-28">
                  <div className="w-full lg:w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                    Monthly Closures
                  </div>
                  <div className="w-full lg:w-48 justify-start text-neutral-900 text-sm font-normal leading-tight break-words">
                    {displayRecruiter?.monthlyClosures || "Not Specified"}
                  </div>
                </div>
                <div className="self-stretch py-4 border-b border-gray-200 flex flex-col lg:flex-row justify-start items-start lg:items-center gap-2 lg:gap-28">
                  <div className="w-full lg:w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                    Why do you want to join?
                  </div>
                  <div className="w-full lg:w-48 justify-start text-neutral-900 text-sm font-normal leading-tight break-words">
                    {displayRecruiter?.whyYouWantToJoin || "Not specified"}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[48%] h-full inline-flex flex-col justify-start items-start gap-6 mt-6 lg:mt-0">
              <div className="self-stretch justify-start text-gray-900 text-xl font-semibold leading-tight">
                Additional Information
              </div>
              <div className="grid grid-cols-2 gap-[12px] justify-between w-full">
                <div className="flex flex-col gap-[12px] p-[16px]  w-full h-[115px] rounded-[8px] border-[#CFD1E8] border-[1px]">
                  <div>
                    <User className="w-5 h-5 text-[#0D0F1C]" />
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    <div className="font-medium text-md text-[#0D0F1C]">
                      Father's Name
                    </div>
                    <div className="font-normal text-base text-[#61758A]">
                      {displayRecruiter?.fatherName || "Not specified"}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[12px] p-[16px]  w-full h-[115px] rounded-[8px] border-[#CFD1E8] border-[1px]">
                  <div>
                    <User className="w-5 h-5 text-[#0D0F1C]" />
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    <div className="font-medium text-md text-[#0D0F1C]">
                      Mother's Name
                    </div>
                    <div className="font-normal text-base text-[#61758A]">
                      {displayRecruiter?.motherName || "Not specified"}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[12px] p-[16px] w-full rounded-[8px] border-[#CFD1E8] border-[1px]">
                  <div>
                    <Stethoscope className="w-5 h-5 text-[#0D0F1C]" />
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    <div className="font-medium text-md text-[#0D0F1C]">
                      Medical Problems
                    </div>
                    <div className="font-normal text-base text-[#61758A]">
                      {displayRecruiter?.medicalProblemDetails === "" ||
                      !displayRecruiter?.medicalProblemDetails
                        ? "None"
                        : displayRecruiter?.medicalProblemDetails}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[12px] p-[16px] w-full rounded-[8px] border-[#CFD1E8] border-[1px]">
                  <div>
                    <Info className="w-5 h-5 text-[#0D0F1C]" />
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    <div className="font-medium text-md text-[#0D0F1C]">
                      How did you know about this job?
                    </div>
                    <div className="font-normal text-base text-[#61758A]">
                      {displayRecruiter?.howDidYouKnowAboutThisJob ||
                        "Not specified"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch inline-flex flex-col justify-start items-start gap-6 mt-8">
            <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
              Financial Details
            </div>
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch py-4 border-t border-b border-gray-200 flex flex-col lg:flex-row justify-start items-start lg:items-center gap-2 lg:gap-28">
                <div className="w-full lg:w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                  PAN Number
                </div>
                <div className="w-full lg:w-48 justify-start text-neutral-900 text-sm font-normal leading-tight break-words">
                  {displayRecruiter?.kycDetails?.panDetails?.number ||
                    "Not specified"}
                </div>
              </div>
              <div className="self-stretch py-4 border-t border-b border-gray-200 flex flex-col lg:flex-row justify-start items-start lg:items-center gap-2 lg:gap-28">
                <div className="w-full lg:w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                  Aadhaar Number
                </div>
                <div className="w-full lg:w-48 justify-start text-neutral-900 text-sm font-normal leading-tight break-words">
                  {displayRecruiter?.kycDetails?.aadharDetails?.number ||
                    "Not specified"}
                </div>
              </div>
              <div className="self-stretch py-4 border-t border-b border-gray-200 flex flex-col lg:flex-row justify-start items-start lg:items-center gap-2 lg:gap-28">
                <div className="w-full lg:w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                  Account Number
                </div>
                <div className="w-full lg:w-48 justify-start text-neutral-900 text-sm font-normal leading-tight break-words">
                  {displayRecruiter?.kycDetails?.bankDetails?.accountNumber ||
                    "Not specified"}
                </div>
              </div>
              <div className="self-stretch py-4 border-t border-b border-gray-200 flex flex-col lg:flex-row justify-start items-start lg:items-center gap-2 lg:gap-28">
                <div className="w-full lg:w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                  Account Holder Name
                </div>
                <div className="w-full lg:w-48 justify-start text-neutral-900 text-sm font-normal leading-tight break-words">
                  {displayRecruiter?.kycDetails?.bankDetails
                    ?.accountHolderName || "Not specified"}
                </div>
              </div>
              <div className="self-stretch py-4 border-t border-b border-gray-200 flex flex-col lg:flex-row justify-start items-start lg:items-center gap-2 lg:gap-28">
                <div className="w-full lg:w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                  Branch Name
                </div>
                <div className="w-full lg:w-48 justify-start text-neutral-900 text-sm font-normal leading-tight break-words">
                  {displayRecruiter?.kycDetails?.bankDetails?.bankName ||
                    "Not specified"}
                </div>
              </div>
              <div className="self-stretch py-4 border-t border-b border-gray-200 flex flex-col lg:flex-row justify-start items-start lg:items-center gap-2 lg:gap-28">
                <div className="w-full lg:w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                  IFSC Code
                </div>
                <div className="w-full lg:w-48 justify-start text-neutral-900 text-sm font-normal leading-tight break-words">
                  {displayRecruiter?.kycDetails?.bankDetails?.ifscCode ||
                    "Not specified"}
                </div>
              </div>
              <div className="self-stretch py-4 border-t border-b border-gray-200 flex flex-col lg:flex-row justify-start items-start lg:items-center gap-2 lg:gap-28">
                <div className="w-full lg:w-48 justify-start text-gray-500 text-sm font-normal leading-tight">
                  Account Type
                </div>
                <div className="w-full lg:w-48 justify-start text-neutral-900 text-sm font-normal leading-tight break-words">
                  {displayRecruiter?.kycDetails?.bankDetails?.accountType ||
                    "Not specified"}
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch inline-flex flex-col justify-start items-start gap-6 mt-8">
            <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
              References
            </div>
            {displayRecruiter?.references &&
            displayRecruiter?.references?.length > 0 ? (
              <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-900">
                        Name
                      </th>
                      <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-900">
                        Contact No
                      </th>
                      <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-900">
                        Organization
                      </th>
                      <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-900">
                        Designation
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayRecruiter?.references?.map((ref, index) => (
                      <tr key={index}>
                        <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">
                          {ref.name || "-"}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">
                          {ref.contactNo || "-"}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">
                          {ref.organization || "-"}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">
                          {ref.designation || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-gray-500 text-sm">
                No references available
              </div>
            )}
          </div>
          <div className="self-stretch inline-flex flex-col justify-start items-start gap-6 mt-8">
            <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
              Address Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="h-48 flex flex-col p-[16px] gap-[12px] rounded-[8px] border-[#DBE0E5] border-[1px]">
                <div className="flex items-center gap-[12px]">
                  <div>
                    <MapPin className="w-5 h-5 text-[#121417]" />
                  </div>
                  <div className="text-[#121417] text-sm font-semibold">
                    Address
                  </div>
                </div>
                <div className="text-[#61758A] text-sm">
                  <div>{displayRecruiter?.currentAddress?.address || "-"}</div>
                  <div className="mt-1">
                    City: {displayRecruiter?.currentAddress?.city || "-"}
                  </div>
                  <div>
                    State: {displayRecruiter?.currentAddress?.state || "-"}
                  </div>
                  <div>
                    Pincode: {displayRecruiter?.currentAddress?.pincode || "-"}
                  </div>
                </div>
              </div>

              <div className="h-48 flex flex-col p-[16px] gap-[12px] rounded-[8px] border-[#DBE0E5] border-[1px]">
                <div className="flex items-center gap-[12px]">
                  <div>
                    <MapPin className="w-5 h-5 text-[#121417]" />
                  </div>
                  <div className="text-[#121417] text-sm font-semibold">
                    Permanent Address
                  </div>
                </div>
                <div className="text-[#61758A] text-sm">
                  <div>{displayRecruiter?.permanentAddress?.address}</div>
                  <div className="mt-1">
                    City: {displayRecruiter?.permanentAddress?.city || "-"}
                  </div>
                  <div>
                    State: {displayRecruiter?.permanentAddress?.state || "-"}
                  </div>
                  <div>
                    Pincode:{" "}
                    {displayRecruiter?.permanentAddress?.pincode || "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rejection Reason Modal - Only for approvals context */}
      {context === "approvals" && (
        <RejectionReasonModal
          isOpen={showRejectionModal}
          onClose={() => setShowRejectionModal(false)}
          onConfirm={handleReject}
          isLoading={isLoading}
          entityType="recruiter"
        />
      )}

      {/* Hold Reason Modal - Only for approvals context */}
      {context === "approvals" && (
        <HoldReasonModal
          isOpen={showHoldModal}
          onClose={() => setShowHoldModal(false)}
          onConfirm={handleHold}
          isLoading={isLoading}
          entityType="recruiter"
        />
      )}

      {/* Edit Recruiter Drawer */}
      <EditRecruiterDrawer
        isOpen={showEditDrawer}
        onClose={() => setShowEditDrawer(false)}
        recruiter={displayRecruiter}
        onRevalidate={onRevalidate}
      />
    </div>
  );
};

export default RecruiterDetailsDrawer;
