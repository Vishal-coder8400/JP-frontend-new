import { User } from "lucide-react";
import { useState } from "react";
import AboutCandidate from "./AboutCandidate";
import { Button } from "@/components/ui/button";
import EditCandidateDrawer from "@/components/super-admin-view/common/candidates/EditCandidateDrawer";
import {
  useApprovals,
  useGetApprovalDetails,
} from "@/hooks/super-admin/useApprovals";
import { useGetCandidateDetails } from "@/hooks/super-admin/useApplicant";
import { useApplicationApprovals } from "@/hooks/super-admin/useApplicationApprovals";
import { useGetJobsByApplicant } from "@/hooks/super-admin/useJob";
import AdminStatusBadge from "@/components/super-admin-view/shared/AdminStatusBadge";
import RejectionReasonModal from "@/components/common/RejectionReasonModal";
import HoldReasonModal from "@/components/common/HoldReasonModal";
import { toast } from "sonner";
import JobsTable from "../jobs/JobsTable";

const CandidateDetailsDrawer = ({
  candidateId,
  approvalId,
  applicationId,
  applicationType,
  context = "database",
  onRevalidate,
  areApprovalBtnsVisible = false,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("aboutCandidate");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showHoldModal, setShowHoldModal] = useState(false);

  const { data: candidateDetails, isLoading: isLoadingCandidate } =
    useGetCandidateDetails(candidateId, {
      enabled: !!candidateId,
    });

  const { data: approvalDetails, isLoading: isLoadingApproval } =
    useGetApprovalDetails(approvalId, {
      enabled: !!approvalId && context === "approvals",
    });

  const { data: jobsData, isLoading: isLoadingJobs } = useGetJobsByApplicant(
    candidateId,
    {
      enabled: !!candidateId,
    }
  );

  const applicationApprovals = useApplicationApprovals(applicationType);
  const approvals = useApprovals();

  const {
    isLoading: isApprovalLoading,
    approveApplication,
    rejectApplication,
    holdApplication,
  } = applicationId
    ? {
        isLoading: applicationApprovals.isLoading,
        approveApplication: applicationApprovals.handleApprove,
        rejectApplication: applicationApprovals.handleReject,
        holdApplication: applicationApprovals.handleHold,
      }
    : approvals;

  const isLoading = isLoadingCandidate || isLoadingApproval;

  const candidate =
    context === "approvals" && candidateDetails && approvalDetails
      ? {
          ...candidateDetails,
          status: approvalDetails?.data?.approvalStatus,
          rejectionReason: approvalDetails?.data?.reviewerNotes,
          holdReason: approvalDetails?.data?.reviewerNotes,
        }
      : candidateDetails;

  const displayCandidate = candidate?.data;
  const candidateStatus =
    context === "approvals" ? candidate?.status : displayCandidate?.status;

  const handleApprove = async () => {
    try {
      if (applicationId) {
        await approveApplication(applicationId);
        toast.success("Application approved successfully");
      } else {
        await approveApplication(approvalId);
        toast.success("Candidate approved successfully");
      }
      if (onRevalidate) {
        await onRevalidate();
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error(
        `Failed to approve ${applicationId ? "application" : "candidate"}:`,
        error
      );
      toast.error(
        error?.response?.data?.message ||
          `Failed to approve ${
            applicationId ? "application" : "candidate"
          }. Please try again.`
      );
    }
  };

  const handleReject = async (rejectionReason) => {
    try {
      if (applicationId) {
        await rejectApplication(applicationId, rejectionReason);
        toast.success("Application rejected successfully");
      } else {
        await rejectApplication(approvalId, rejectionReason);
        toast.success("Candidate rejected successfully");
      }
      if (onRevalidate) {
        await onRevalidate();
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error(
        `Failed to reject ${applicationId ? "application" : "candidate"}:`,
        error
      );
      toast.error(
        error?.response?.data?.message ||
          `Failed to reject ${
            applicationId ? "application" : "candidate"
          }. Please try again.`
      );
    }
  };

  const handleRejectClick = () => {
    setShowRejectionModal(true);
  };

  const handleHold = async (holdReason) => {
    try {
      if (applicationId) {
        await holdApplication(applicationId, holdReason);
        toast.success("Application put on hold successfully");
      } else {
        await holdApplication(approvalId, holdReason);
        toast.success("Candidate put on hold successfully");
      }
      if (onRevalidate) {
        await onRevalidate();
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error(
        `Failed to hold ${applicationId ? "application" : "candidate"}:`,
        error
      );
      toast.error(
        error?.response?.data?.message ||
          `Failed to hold ${
            applicationId ? "application" : "candidate"
          }. Please try again.`
      );
    }
  };

  const handleHoldClick = () => {
    setShowHoldModal(true);
  };

  const tabs = [
    {
      id: "jobsApplied",
      label: "Jobs Applied",
    },
    {
      id: "aboutCandidate",
      label: "About Candidate",
    },
  ];

  if (isLoading) {
    return (
      <div className="w-full h-full p-10 bg-white rounded-l-2xl inline-flex flex-col justify-center items-center">
        <div className="text-center">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-500">Loading candidate details...</p>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="w-full h-full p-10 bg-white rounded-l-2xl inline-flex flex-col justify-center items-center">
        <div className="text-center">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No candidate selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white rounded-l-2xl inline-flex flex-col gap-8 overflow-y-auto">
      <img src="/Group_1000005865.jpg" className="w-full object-contain" />

      <div className="bg-white p-6 w-[700px] mx-auto rounded-lg shadow-md -mt-20 flex items-center gap-6">
        {displayCandidate?.profilePicture ? (
          <img
            src={displayCandidate?.profilePicture}
            alt={displayCandidate?.name}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-6 w-6 text-gray-400" />
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-semibold capitalize">
            {displayCandidate?.name || "-"}
          </h3>
        </div>
        <div className="flex items-center gap-4">
          {!areApprovalBtnsVisible && (
            <Button
              variant={"purple"}
              className={"w-fit"}
              onClick={() => setIsEditOpen(true)}
            >
              Edit Candidate
            </Button>
          )}
          {areApprovalBtnsVisible && (
            <>
              {candidateStatus !== "approved" ? (
                <>
                  <Button
                    variant={"purple"}
                    onClick={handleApprove}
                    disabled={isApprovalLoading}
                  >
                    {isApprovalLoading ? "Processing..." : "Approve"}
                  </Button>
                  <Button
                    variant={"destructive"}
                    onClick={handleRejectClick}
                    disabled={isApprovalLoading}
                  >
                    {isApprovalLoading ? "Processing..." : "Reject"}
                  </Button>
                  <Button
                    variant={"black"}
                    onClick={handleHoldClick}
                    disabled={isApprovalLoading}
                  >
                    {isApprovalLoading ? "Processing..." : "Hold"}
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <AdminStatusBadge status={candidateStatus} />
                  {candidateStatus === "rejected" &&
                    candidate?.rejectionReason && (
                      <div className="text-xs text-red-600 bg-red-50 p-2 rounded border max-w-xs">
                        <strong>Rejection Reason:</strong>{" "}
                        {candidate.rejectionReason}
                      </div>
                    )}
                  {candidateStatus === "hold" && candidate?.holdReason && (
                    <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded border max-w-xs">
                      <strong>Hold Reason:</strong> {candidate.holdReason}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="px-6">
        {/* Tab Navigation */}
        <div className="flex gap-4 justify-end">
          {tabs.map((tab) => {
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? "purple" : "outline"}
                className={"rounded-3xl"}
              >
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {activeTab === "aboutCandidate" && (
            <AboutCandidate candidate={candidate} />
          )}
          {activeTab === "jobsApplied" && (
            <JobsTable
              paginatedJobs={jobsData?.data.applications || []}
              context="database"
            />
          )}
        </div>
      </div>

      {!areApprovalBtnsVisible && (
        <EditCandidateDrawer
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          candidate={candidate}
        />
      )}

      <RejectionReasonModal
        isOpen={showRejectionModal}
        onClose={() => setShowRejectionModal(false)}
        onConfirm={handleReject}
        isLoading={isApprovalLoading}
        entityType="candidate"
      />

      <HoldReasonModal
        isOpen={showHoldModal}
        onClose={() => setShowHoldModal(false)}
        onConfirm={handleHold}
        isLoading={isApprovalLoading}
        entityType="candidate"
      />
    </div>
  );
};

export default CandidateDetailsDrawer;
