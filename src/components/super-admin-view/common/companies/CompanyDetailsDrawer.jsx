import { Building2 } from "lucide-react";
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
    return (
      <ActionButtons
        context={context}
        onEdit={handleEditClick}
        onApprove={handleApprove}
        onReject={handleRejectClick}
        onHold={handleHoldClick}
        isLoading={isLoading}
        approvalStatus={approvalStatus || company?.status}
        entityName="Company"
        editButtonVariant="gray"
        editButtonSize="sm"
        layout="vertical"
        className="w-full"
      />
    );
  };

  return (
    <div className="w-full h-full p-10 bg-white rounded-l-2xl inline-flex flex-col gap-6 overflow-y-auto">
      {/* Header */}
      <div className="w-full border-1 border-gray2 p-4 rounded-lg grid grid-cols-12 gap-4 items-start">
        <div className="col-span-1 flex justify-center">
          {company?.basicInformation?.companyLogo || company.logo ? (
            <img
              src={company?.basicInformation?.companyLogo || company.logo}
              alt={`${company.companyName || company.name} logo`}
              className="object-fill rounded-full aspect-square"
              width={50}
            />
          ) : (
            <Building2 className="h-6 w-6 text-gray-400" />
          )}
        </div>

        <div className="col-span-8">
          <h3 className="text-xl font-medium">
            {context === "database"
              ? `${company?.basicInformation?.companyName}`
              : company.companyName || company.name || "Company Name"}
          </h3>
          <div className="border-1 border-gray2 p-4 rounded-lg mt-4">
            <h4 className="font-medium">About the Company</h4>
            <p className="text-sm text-gray1/75 mt-2">
              {company.description || "N/A"}
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
