import { Button } from "@/components/ui/button";
import { Building2, Briefcase } from "lucide-react";
import { Fragment, useState, useEffect } from "react";
import CompanyDetailsTab from "./CompanyDetailsTab";
import JobListingTab from "../database/tabs/companies/tabs/JobListingTab";
import CompanyStats from "../database/tabs/companies/CompanyStats";
import { useCompanyDetails } from "../../../hooks/super-admin/useCompanyDetails";
import {
  useApprovals,
  useGetApprovalDetails,
} from "@/hooks/super-admin/useApprovals";
import { Badge } from "@/components/ui/badge";
import RejectionReasonModal from "@/components/common/RejectionReasonModal";
import HoldReasonModal from "@/components/common/HoldReasonModal";
import EditCompanyDrawer from "./companies/EditCompanyDrawer";

const CompanyDetailsDrawer = ({
  companyId,
  company,
  context = "database", // "database", "approvals", or "other"
  onClose,
  onRevalidate,
}) => {
  const [activeTab, setActiveTab] = useState("details");
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showHoldModal, setShowHoldModal] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { isLoading, approveApplication, rejectApplication, holdApplication } =
    useApprovals();

  // Conditionally call hooks based on context
  const companyDetailsQuery =
    context === "database"
      ? useCompanyDetails(companyId)
      : { data: null, loading: false, error: null, refetch: () => {} };

  const approvalDetailsQuery =
    context === "approvals"
      ? useGetApprovalDetails(company?._id || company?.id, {
          enabled: !!(company?._id || company?.id),
        })
      : { data: null, isLoading: false, error: null };

  // Extract data based on context
  const companyData = companyDetailsQuery.data;
  const loading = companyDetailsQuery.loading;
  const error = companyDetailsQuery.error;

  const approvalDetails = approvalDetailsQuery.data;
  const isLoadingDetails = approvalDetailsQuery.isLoading;
  const detailsError = approvalDetailsQuery.error;

  useEffect(() => {
    if (companyData) {
      setRefreshKey((prev) => prev + 1);
    }
  }, [companyData]);

  // Determine which data to use based on context
  const getDisplayData = () => {
    if (context === "database") {
      return companyData;
    } else if (context === "approvals") {
      const approvalData = approvalDetails?.data || {};
      return approvalData.data || company;
    }
    return company;
  };

  const getApprovalData = () => {
    if (context === "approvals") {
      return approvalDetails?.data || {};
    }
    return {};
  };

  const displayCompany = getDisplayData();
  const displayApprovalData = getApprovalData();

  // Handle approval actions
  const handleApprove = async () => {
    try {
      await approveApplication(company?._id || company?.id);
      if (onRevalidate) {
        await onRevalidate();
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to approve company:", error);
    }
  };

  const handleReject = async (rejectionReason) => {
    try {
      await rejectApplication(company?._id || company?.id, rejectionReason);
      if (onRevalidate) {
        await onRevalidate();
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to reject company:", error);
    }
  };

  const handleRejectClick = () => {
    setShowRejectionModal(true);
  };

  const handleHold = async (holdReason) => {
    try {
      await holdApplication(
        displayCompany.id || displayCompany._id,
        holdReason
      );
      // Revalidate the list data before closing
      if (onRevalidate) {
        await onRevalidate();
      }
      // Close the drawer after successful hold and revalidation
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to hold displayCompany:", error);
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
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (companyDetailsQuery.refetch) {
      await companyDetailsQuery.refetch(true);
    }
    if (onRevalidate) {
      await onRevalidate();
    }
  };

  // Handle loading state
  const isLoadingData = context === "database" ? loading : isLoadingDetails;
  const hasError = context === "database" ? error : detailsError;

  if (isLoadingData) {
    return (
      <div className="w-full h-full p-10 bg-white rounded-l-2xl inline-flex flex-col justify-center items-center">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Loading company details...</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="w-full h-full p-10 bg-white rounded-l-2xl inline-flex flex-col justify-center items-center">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-red-500">Error: {hasError.message || hasError}</p>
        </div>
      </div>
    );
  }

  if (!displayCompany) {
    return (
      <div className="w-full h-full p-10 bg-white rounded-l-2xl inline-flex flex-col justify-center items-center">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No company data available</p>
        </div>
      </div>
    );
  }

  const tabs = [
    {
      id: "details",
      label: "Company Details",
      icon: Building2,
    },
    {
      id: "jobs",
      label: "Job Listings",
      icon: Briefcase,
    },
  ];

  const renderActionButtons = () => {
    if (context === "database") {
      return (
        <div className="space-y-3">
          <Button
            variant={"purple"}
            className={"px-3 w-full"}
            onClick={handleEditClick}
          >
            Edit Company
          </Button>
        </div>
      );
    } else if (context === "approvals") {
      // Show approval buttons only when status is pending
      if (displayApprovalData?.data?.status === "pending") {
        return (
          <Fragment>
            <Button
              variant={"purple"}
              className={"w-full"}
              onClick={handleApprove}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Approve Company"}
            </Button>
            <Button
              variant={"destructive"}
              className={"w-full"}
              onClick={handleRejectClick}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Reject Company"}
            </Button>
            <Button
              variant={"black"}
              className={"w-full"}
              onClick={handleHoldClick}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Hold Company"}
            </Button>
          </Fragment>
        );
      } else {
        return (
          <div className="flex flex-col gap-2">
            <Badge
              className={`${
                displayApprovalData?.data?.status === "approved"
                  ? "bg-success2 text-success1"
                  : displayApprovalData?.data?.status === "rejected"
                  ? "bg-danger2 text-danger1"
                  : "bg-gray2 text-gray1"
              } text-sm capitalize`}
            >
              {displayApprovalData?.data?.status}
            </Badge>
            {displayApprovalData?.data?.status === "rejected" &&
              displayApprovalData?.data?.rejectionReason && (
                <div className="text-xs text-red-600 bg-red-50 p-2 rounded border max-w-xs">
                  <strong>Rejection Reason:</strong>{" "}
                  {displayApprovalData.data.rejectionReason}
                </div>
              )}
          </div>
        );
      }
    }
    // For "other" context, no buttons are shown
    return null;
  };

  return (
    <div className="w-full h-full p-10 bg-white rounded-l-2xl inline-flex flex-col gap-8 overflow-y-auto">
      {/* Header */}
      <div
        key={`header-${refreshKey}`}
        className="w-full border-1 border-gray2 p-4 rounded-lg grid grid-cols-12 gap-4 items-start"
      >
        <div className="col-span-1 flex justify-center">
          {displayCompany?.basicInformation?.companyLogo ||
          displayCompany.logo ? (
            <img
              src={
                displayCompany?.basicInformation?.companyLogo ||
                displayCompany.logo
              }
              alt={`${displayCompany.companyName || displayCompany.name} logo`}
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
              ? `${displayCompany?.basicInformation?.companyName}`
              : displayCompany.companyName ||
                displayCompany.name ||
                "Company Name"}
          </h3>
          <div className="border-1 border-gray2 p-4 rounded-lg mt-4">
            <h4 className="font-medium">About the Company</h4>
            <p className="text-sm text-gray1/75 mt-2">
              {displayCompany.description || "N/A"}
            </p>
          </div>
        </div>

        <div className="col-span-3 space-y-3">{renderActionButtons()}</div>
      </div>

      {/* Details Grid */}
      <CompanyStats key={`stats-${refreshKey}`} company={displayCompany} />

      {/* Tabs */}
      <div className="w-full">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-4 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="w-full" key={`tab-content-${refreshKey}`}>
          {activeTab === "details" && (
            <CompanyDetailsTab company={displayCompany} />
          )}
          {activeTab === "jobs" && <JobListingTab company={displayCompany} />}
        </div>
      </div>

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

      {/* Edit Company Drawer - Only for database context */}
      {context === "database" && (
        <EditCompanyDrawer
          isOpen={showEditDrawer}
          onClose={handleEditClose}
          company={displayCompany}
          onRevalidate={handleCompanyUpdate}
        />
      )}
    </div>
  );
};

export default CompanyDetailsDrawer;
