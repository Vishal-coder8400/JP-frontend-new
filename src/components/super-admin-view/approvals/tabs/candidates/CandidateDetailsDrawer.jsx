import { User, Briefcase, FileText } from "lucide-react";
import { useState } from "react";
import JobsApplied from "./tabs/JobsApplied";
import AboutCandidate from "./tabs/AboutCandidate";
import { Button } from "@/components/ui/button";
import { useGetCandidateDetails } from "@/hooks/superAdmin/useApplicant";
import { useApprovals } from "@/hooks/superAdmin/useApprovals";

const CandidateDetailsDrawer = ({
  candidate,
  areApprovalBtnsVisible = false,
}) => {
  const [activeTab, setActiveTab] = useState("aboutCandidate");
  const { isLoading, approveApplication, rejectApplication, holdApplication } =
    useApprovals();

  // Fetch detailed candidate data
  const {
    data: candidateDetails,
    isLoading: isLoadingDetails,
    error: detailsError,
  } = useGetCandidateDetails(candidate?._id || candidate?.id, {
    enabled: !!(candidate?._id || candidate?.id),
  });

  // Use detailed data if available, otherwise fall back to basic candidate data
  const displayCandidate = candidateDetails?.data?.data || candidate;

  const handleApprove = async () => {
    try {
      await approveApplication(displayCandidate.id);
      // Optionally refresh the candidate data or close the drawer
    } catch (error) {
      console.error("Failed to approve candidate:", error);
    }
  };

  const handleReject = async () => {
    try {
      await rejectApplication(displayCandidate.id);
      // Optionally refresh the candidate data or close the drawer
    } catch (error) {
      console.error("Failed to reject candidate:", error);
    }
  };

  const handleHold = async () => {
    try {
      await holdApplication(displayCandidate.id);
      // Optionally refresh the candidate data or close the drawer
    } catch (error) {
      console.error("Failed to hold candidate:", error);
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

  if (isLoadingDetails) {
    return (
      <div className="w-full h-full p-10 bg-white rounded-l-2xl inline-flex flex-col justify-center items-center">
        <div className="text-center">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Loading candidate details...</p>
        </div>
      </div>
    );
  }

  if (detailsError) {
    return (
      <div className="w-full h-full p-10 bg-white rounded-l-2xl inline-flex flex-col justify-center items-center">
        <div className="text-center">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Error loading candidate details</p>
          <p className="text-red-500 text-sm">{detailsError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white rounded-l-2xl inline-flex flex-col gap-8 overflow-y-auto">
      <img src="/Group_1000005865.jpg" className="w-full object-contain" />

      <div className="bg-white p-6 w-[800px] mx-auto rounded-lg shadow-md -mt-20 flex items-center gap-6">
        {displayCandidate.profilePicture ? (
          <img
            src={displayCandidate.profilePicture}
            alt={`${displayCandidate.name} avatar`}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-8 w-8 text-gray-400" />
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-semibold">{displayCandidate.name || "N/A"}</h3>
          <p className="text-gray1">
            {displayCandidate.education?.length > 0
              ? `${displayCandidate.education[0].degree} - ${displayCandidate.education[0].institution}`
              : "Profile information not available"}
          </p>
        </div>

        {areApprovalBtnsVisible && (
          <div className="flex items-center gap-4">
            <Button
              variant={"purple"}
              onClick={handleApprove}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Approve Candidate"}
            </Button>
            <Button
              variant={"destructive"}
              onClick={handleReject}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Reject Candidate"}
            </Button>
            <Button variant={"black"} onClick={handleHold} disabled={isLoading}>
              {isLoading ? "Processing..." : "Hold Candidate"}
            </Button>
          </div>
        )}
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
          {activeTab === "jobsApplied" && (
            <JobsApplied candidate={displayCandidate} />
          )}

          {activeTab === "aboutCandidate" && (
            <AboutCandidate candidate={displayCandidate} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsDrawer;
