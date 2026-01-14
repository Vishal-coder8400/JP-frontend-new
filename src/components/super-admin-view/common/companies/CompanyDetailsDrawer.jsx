import { Building2, Mail, Phone, Globe, Briefcase, MapPin } from "lucide-react";
import { useState } from "react";
import CompanyClientDetails from "./CompanyClientDetails";
import {
  useApprovals,
  useGetApprovalDetails,
} from "@/hooks/super-admin/useApprovals";
import RejectionReasonModal from "@/components/common/RejectionReasonModal";
import HoldReasonModal from "@/components/common/HoldReasonModal";
import EditCompanyDrawer from "./EditCompanyDrawer";
import { toast } from "sonner";
import ActionButtons from "../../shared/ActionButtons";
import { useGetCompanyDetails } from "@/hooks/super-admin/useCompanies";
import CompanyStats from "./CompanyStats";
import StatusReasonAlert from "@/components/common/StatusReasonAlert";

const CompanyDetailsDrawer = ({
  companyId,
  context = "other", // "approvals", "database", or "other"
  approvalId,
  approvalStatus,
  onClose,
  onRevalidate,
}) => {
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showHoldModal, setShowHoldModal] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const { isLoading, approveApplication, rejectApplication, holdApplication } =
    useApprovals();

  const {
    data: companyData,
    isLoading: isLoadingDetails,
    error: detailsError,
    refetch,
  } = useGetCompanyDetails(companyId);

  const { data: approvalDetails } = useGetApprovalDetails(approvalId, {
    enabled: !!approvalId && context === "approvals",
  });

  const company = companyData?.data?.corporate;
  const statusReason = approvalDetails?.data?.reviewerNotes;
  
  // Access nested data with proper fallbacks
  const basicInfo = company?.basicInformation || {};
  const companyDetails = company?.companyDetails || {};
  const spocInfo = company?.spocInformation || {};

  // Handle approval actions
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
      console.error("Failed to approve company:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to approve company. Please try again."
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
      console.error("Failed to reject company:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to reject company. Please try again."
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
      console.error("Failed to hold company:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to hold company. Please try again."
      );
    }
  };

  const handleHoldClick = () => {
    setShowHoldModal(true);
  };

  // Simple block handler - shows message only
  const handleBlockClick = () => {
    toast.info("Block functionality coming soon. Contact admin for now.");
  };

  const handleEditClick = () => {
    setShowEditDrawer(true);
  };

  const handleEditClose = () => {
    setShowEditDrawer(false);
  };

  const handleCompanyUpdate = async () => {
    await refetch();
    if (onRevalidate) {
      await onRevalidate();
    }
  };

  if (isLoadingDetails) {
    return (
      <div className="w-full h-full p-10 bg-white rounded-l-2xl inline-flex flex-col justify-center items-center">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Loading company details...</p>
        </div>
      </div>
    );
  }

  if (detailsError) {
    return (
      <div className="w-full h-full p-10 bg-white rounded-l-2xl inline-flex flex-col justify-center items-center">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-red-500">
            Error: {detailsError.message || detailsError}
          </p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="w-full h-full p-10 bg-white rounded-l-2xl inline-flex flex-col justify-center items-center">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No company data available</p>
        </div>
      </div>
    );
  }

  const renderActionButtons = () => {
    const status = approvalStatus || company?.status;
    
    return (
      <ActionButtons
        context={context}
        onEdit={handleEditClick}
        onApprove={handleApprove}
        onReject={handleRejectClick}
        onHold={handleHoldClick}
        onBlock={handleBlockClick} // Pass the simple handler
        isLoading={isLoading}
        approvalStatus={status}
        entityName="Company"
        editButtonVariant="gray"
        editButtonSize="sm"
        layout="vertical"
        className="w-full"
      />
    );
  };

  // Format contact number
  const formatContactNumber = (contact) => {
    if (!contact) return "-";
    return `${contact.countryCode || ""} ${contact.number || ""}`.trim();
  };

  // Format company type for display
  const formatCompanyType = (type) => {
    if (!type) return "-";
    return type.replace(/([A-Z])/g, ' $1').trim();
  };

  return (
    <div className="w-full h-full p-10 bg-white rounded-l-2xl inline-flex flex-col gap-6 overflow-y-auto">
      {/* Header */}
      <div className="w-full border-1 border-gray2 p-4 rounded-lg grid grid-cols-12 gap-4 items-start">
        <div className="col-span-1 flex justify-center">
          {basicInfo?.companyLogo ? (
            <img
              src={basicInfo.companyLogo}
              alt={`${basicInfo.companyName} logo`}
              className="object-fill rounded-full aspect-square"
              width={50}
            />
          ) : (
            <Building2 className="h-6 w-6 text-gray-400" />
          )}
        </div>

        <div className="col-span-8">
          <h3 className="text-xl font-medium">
            {basicInfo?.companyName || "Company Name"}
          </h3>
          
          {/* Basic Information in one box */}
          <div className="border-1 border-gray2 p-4 rounded-lg mt-4">
            <h4 className="font-medium mb-3">Basic Information</h4>
            <div className="grid grid-cols-2 gap-4">
              {/* Email */}
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Company Email</p>
                  <p className="text-sm font-medium">{basicInfo?.companyEmail || "-"}</p>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Company Contact</p>
                  <p className="text-sm font-medium">
                    {formatContactNumber(basicInfo?.companyContactNumber)}
                  </p>
                </div>
              </div>
              
              {/* Website */}
              <div className="flex items-start gap-2">
                <Globe className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Website</p>
                  <p className="text-sm font-medium truncate">
                    {basicInfo?.websiteURL || "-"}
                  </p>
                </div>
              </div>
              
              {/* Company Type */}
              <div className="flex items-start gap-2">
                <Briefcase className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Company Type</p>
                  <p className="text-sm font-medium capitalize">
                    {formatCompanyType(basicInfo?.companyType)}
                  </p>
                </div>
              </div>

              {/* Industry Type */}
              <div className="flex items-start gap-2">
                <Building2 className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Industry Type</p>
                  <p className="text-sm font-medium capitalize">
                    {companyDetails?.industryType?.replace(/_/g, ' ') || "-"}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-medium">
                    {companyDetails?.city || "-"}
                    {companyDetails?.state ? `, ${companyDetails.state}` : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Company Description */}
          <div className="border-1 border-gray2 p-4 rounded-lg mt-4">
            <h4 className="font-medium">About the Company</h4>
            <p className="text-sm text-gray1/75 mt-2">
              {basicInfo?.companyDescription || "N/A"}
            </p>
          </div>
        </div>

        <div className="col-span-3 space-y-3">{renderActionButtons()}</div>
      </div>

      {/* Status Reason Display */}
      <StatusReasonAlert statusReason={statusReason} status={approvalStatus} />

      <CompanyStats company={company} />

      <CompanyClientDetails company={company} />

      {/* Rejection Reason Modal - Only for approvals context */}
      {context === "approvals" && (
        <RejectionReasonModal
          isOpen={showRejectionModal}
          onClose={() => setShowRejectionModal(false)}
          onConfirm={handleReject}
          isLoading={isLoading}
          entityType="company"
        />
      )}

      {/* Hold Reason Modal - Only for approvals context */}
      {context === "approvals" && (
        <HoldReasonModal
          isOpen={showHoldModal}
          onClose={() => setShowHoldModal(false)}
          onConfirm={handleHold}
          isLoading={isLoading}
          entityType="company"
        />
      )}

      {/* Edit Company Drawer */}
      <EditCompanyDrawer
        isOpen={showEditDrawer}
        onClose={handleEditClose}
        company={company}
        onRevalidate={handleCompanyUpdate}
      />
    </div>
  );
};

export default CompanyDetailsDrawer;