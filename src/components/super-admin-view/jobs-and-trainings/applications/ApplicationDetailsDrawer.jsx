import { User, CheckCircle, XCircle, Clock } from "lucide-react";
import { useState } from "react";
import JobsApplied from "../../database/tabs/candidates/tabs/JobsApplied";
import AboutCandidate from "../../database/tabs/candidates/tabs/AboutCandidate";
import { Button } from "@/components/ui/button";
import { useGetCandidateDetails } from "../../../../hooks/super-admin/useApplicant";
import { useApplicationApprovals } from "../../../../hooks/super-admin/useApplicationApprovals";
import ApplicationActionModal from "../../../../components/common/ApplicationActionModal";
import { toast } from "sonner";

const ApplicationDetailsDrawer = ({ application, onRevalidate }) => {
  const [activeTab, setActiveTab] = useState("aboutCandidate");
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState("approve");
  const applicantId = application?.applicantId;
  console.log(applicantId);
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

  const handleApproveClick = () => {
    setActionType("approve");
    setShowActionModal(true);
  };

  const handleRejectClick = () => {
    setActionType("reject");
    setShowActionModal(true);
  };

  const handleHoldClick = () => {
    setActionType("hold");
    setShowActionModal(true);
  };

  const handleActionConfirm = async ({ notes, feedback }) => {
    try {
      if (actionType === "approve") {
        await approveApplication(application._id, notes, feedback);
        toast.success("Application approved successfully");
      } else if (actionType === "reject") {
        await rejectApplication(application._id, notes, feedback);
        toast.success("Application rejected successfully");
      } else if (actionType === "hold") {
        await handleHold(application._id, notes, feedback);
        toast.success("Application put on hold");
      }

      setShowActionModal(false);
      if (onRevalidate) {
        await onRevalidate();
      }
    } catch (error) {
      console.error(`Failed to ${actionType} application:`, error);
      toast.error(`Failed to ${actionType} application`);
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
            onClick={handleRejectClick}
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
            onClick={handleApproveClick}
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

      {/* Application Action Modal */}
      <ApplicationActionModal
        isOpen={showActionModal}
        onClose={() => setShowActionModal(false)}
        onConfirm={handleActionConfirm}
        isLoading={isApprovalLoading}
        actionType={actionType}
        entityType="application"
        showFeedback={true}
      />
    </div>
  );
};

export default ApplicationDetailsDrawer;
