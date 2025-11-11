import { User } from "lucide-react";
import { useState } from "react";
import AboutCandidate from "./AboutCandidate";
import { Button } from "@/components/ui/button";
import EditCandidateDrawer from "@/components/super-admin-view/common/candidates/EditCandidateDrawer";
import { useGetCandidateDetails } from "@/hooks/super-admin/useApplicant";
import { useApplicationApprovals } from "@/hooks/super-admin/useApplicationApprovals";
import { useGetJobsByApplicant } from "@/hooks/super-admin/useJob";
import RejectionReasonModal from "@/components/common/RejectionReasonModal";
import HoldReasonModal from "@/components/common/HoldReasonModal";
import { toast } from "sonner";
import JobsTable from "../jobs/JobsTable";
import StatusReasonAlert from "@/components/common/StatusReasonAlert";
import ActionButtons from "@/components/super-admin-view/shared/ActionButtons";

const CandidateDetailsDrawer = ({
  applicationStatus,
  candidateId,
  applicationId,
  applicationType,
  context = "database",
  onRevalidate,
  onClose,
  statusByCorporateFeedback,
  statusByCorporateNotes,
  statusFeedback,
  statusNotes,
  status,
  statusByCorporate,
}) => {
  const [activeTab, setActiveTab] = useState("aboutCandidate");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showHoldModal, setShowHoldModal] = useState(false);

  const { data: candidateDetails, isLoading: isLoadingCandidate } =
    useGetCandidateDetails(candidateId, {
      enabled: !!candidateId,
    });

  const { data: jobsData } = useGetJobsByApplicant(candidateId, {
    enabled: !!candidateId,
  });

  const applicationApprovals = useApplicationApprovals(applicationType);
  const isApplicationContext = context === "application" && applicationId;
  const isApprovalLoading = isApplicationContext
    ? applicationApprovals.isLoading
    : false;

  const isLoading = isLoadingCandidate;

  const candidate = candidateDetails;

  const displayCandidate = candidate?.data;
  const candidateStatus = displayCandidate?.status;
  const statusReason = displayCandidate?.statusReason;

  const handleApprove = async () => {
    if (!isApplicationContext) return;
    try {
      await applicationApprovals.handleApprove(applicationId);
      toast.success("Application approved successfully");
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
    if (!isApplicationContext) return;
    try {
      await applicationApprovals.handleReject(applicationId, rejectionReason);
      toast.success("Application rejected successfully");
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

  const handleHold = async (holdReason) => {
    if (!isApplicationContext) return;
    try {
      await applicationApprovals.handleHold(applicationId, holdReason);
      toast.success("Application put on hold successfully");
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
          <ActionButtons
            context={context}
            onEdit={() => setIsEditOpen(true)}
            onApprove={handleApprove}
            onReject={() => setShowRejectionModal(true)}
            onHold={() => setShowHoldModal(true)}
            isLoading={isApprovalLoading}
            entityName={context === "database" ? "Candidate" : "Application"}
            approvalStatus={applicationStatus}
            editButtonVariant="gray"
            editButtonSize="sm"
          />
        </div>
      </div>

      {/* Status Reason Display */}
      <StatusReasonAlert
        statusReason={statusReason}
        status={candidateStatus}
        className="px-6 mb-6"
      />

      <div className="px-6">
        {context === "application" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Status (Admin)</p>
              <p className="text-gray-900 font-medium capitalize">
                {status || "-"}
              </p>
              {(statusNotes || statusFeedback) && (
                <div className="mt-2 space-y-1">
                  {statusNotes && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Notes:</span> {statusNotes}
                    </p>
                  )}
                  {statusFeedback && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Feedback:</span>{" "}
                      {statusFeedback}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Status (Corporate)</p>
              <p className="text-gray-900 font-medium capitalize">
                {statusByCorporate || "-"}
              </p>
              {(statusByCorporateNotes || statusByCorporateFeedback) && (
                <div className="mt-2 space-y-1">
                  {statusByCorporateNotes && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Notes:</span>{" "}
                      {statusByCorporateNotes}
                    </p>
                  )}
                  {statusByCorporateFeedback && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Feedback:</span>{" "}
                      {statusByCorporateFeedback}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
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
              paginatedJobs={jobsData?.data?.applications || []}
              context="database"
            />
          )}
        </div>
      </div>

      <EditCandidateDrawer
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        candidate={candidate}
      />

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
