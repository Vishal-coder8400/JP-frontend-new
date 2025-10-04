import { User, CheckCircle, XCircle, Clock } from "lucide-react";
import { useState } from "react";
import JobsApplied from "../../database/tabs/candidates/tabs/JobsApplied";
import AboutCandidate from "../../database/tabs/candidates/tabs/AboutCandidate";
import { Button } from "@/components/ui/button";
import { useGetCandidateDetails } from "../../../../hooks/super-admin/useApplicant";
import { useApplicationApprovals } from "../../../../hooks/super-admin/useApplicationApprovals";
import RejectionReasonModal from "../../../../components/common/RejectionReasonModal";
import HoldReasonModal from "../../../../components/common/HoldReasonModal";
import { toast } from "sonner";

const ApplicationDetailsDrawer = ({ application, onRevalidate }) => {
  const [activeTab, setActiveTab] = useState("aboutCandidate");
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showHoldModal, setShowHoldModal] = useState(false);
  const applicantId = application?.applicantId;

  const {
    data: candidateDetails,
    isLoading,
    isError,
  } = useGetCandidateDetails(applicantId, {
    enabled: !!applicantId && !!application,
  });

  const {
    isLoading: isApprovalLoading,
    handleApprove: approveApplication,
    handleReject: rejectApplication,
    handleHold,
  } = useApplicationApprovals();

  const candidate = candidateDetails?.data;

  const handleApprove = async () => {
    try {
      await approveApplication(
        application._id,
        "Application approved by admin",
        "Candidate meets requirements"
      );
      toast.success("Application approved successfully");
      if (onRevalidate) {
        await onRevalidate();
      }
    } catch (error) {
      console.error("Failed to approve application:", error);
      toast.error("Failed to approve application");
    }
  };

  const handleReject = async (rejectionReason) => {
    try {
      await rejectApplication(
        application._id,
        rejectionReason,
        rejectionReason
      );
      toast.success("Application rejected successfully");
      setShowRejectionModal(false);
      if (onRevalidate) {
        await onRevalidate();
      }
    } catch (error) {
      console.error("Failed to reject application:", error);
      toast.error("Failed to reject application");
    }
  };

  const handleHoldApplication = async (holdReason) => {
    try {
      await handleHold(
        application._id,
        holdReason,
        "Pending additional information"
      );
      toast.success("Application put on hold");
      if (onRevalidate) {
        await onRevalidate();
      }
    } catch (error) {
      console.error("Failed to put application on hold:", error);
      toast.error("Failed to put application on hold");
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

  if (isError) {
    return (
      <div className="w-full h-full p-10 bg-white rounded-l-2xl inline-flex flex-col justify-center items-center">
        <div className="text-center">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Failed to load candidate details</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="w-full h-full p-10 bg-white rounded-l-2xl inline-flex flex-col justify-center items-center">
        <div className="text-center">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No application selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white rounded-l-2xl inline-flex flex-col gap-8 overflow-y-auto">
      <img src="/Group_1000005865.jpg" className="w-full object-contain" />

      <div className="bg-white p-6 w-[800px] mx-auto rounded-lg shadow-md -mt-20 flex items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <User className="h-6 w-6 text-gray-400" />
          <div className="flex-1">
            <h3 className="font-semibold">
              {candidate?.name || application.applicantId || "N/A"}
            </h3>
            <p className="text-gray1">
              {candidate?.email || application.applicantType || "Job Seekers"}
            </p>
          </div>
        </div>

        {/* Approval Actions in Header */}
        <div className="flex gap-2">
          <Button
            variant={"destructive"}
            onClick={() => setShowRejectionModal(true)}
            disabled={isApprovalLoading}
          >
            Reject Application
          </Button>
          <Button
            variant={"black"}
            onClick={handleHoldClick}
            disabled={isApprovalLoading}
          >
            Hold Application
          </Button>

          <Button
            variant={"purple"}
            onClick={handleApprove}
            disabled={isApprovalLoading}
          >
            Accept Application
          </Button>
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
          {activeTab === "jobsApplied" && <JobsApplied />}

          {activeTab === "aboutCandidate" && <AboutCandidate />}
        </div>
      </div>

      {/* Rejection Reason Modal */}
      <RejectionReasonModal
        isOpen={showRejectionModal}
        onClose={() => setShowRejectionModal(false)}
        onConfirm={handleReject}
        isLoading={isApprovalLoading}
        entityType="application"
      />

      {/* Hold Reason Modal */}
      <HoldReasonModal
        isOpen={showHoldModal}
        onClose={() => setShowHoldModal(false)}
        onConfirm={handleHoldApplication}
        isLoading={isApprovalLoading}
        entityType="application"
      />
    </div>
  );
};

export default ApplicationDetailsDrawer;
