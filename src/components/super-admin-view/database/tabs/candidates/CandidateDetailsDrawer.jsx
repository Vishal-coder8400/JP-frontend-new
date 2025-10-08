import { User } from "lucide-react";
import { useState } from "react";
import JobsApplied from "./tabs/JobsApplied";
import AboutCandidate from "./tabs/AboutCandidate";
import { Button } from "@/components/ui/button";
import EditCandidateDrawer from "@/components/super-admin-view/common/candidates/EditCandidateDrawer";

const CandidateDetailsDrawer = ({ candidate, isLoading }) => {
  const [activeTab, setActiveTab] = useState("aboutCandidate");
  const [isEditOpen, setIsEditOpen] = useState(false);

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

  console.log("candidate", candidate);

  return (
    <div className="w-full h-full bg-white rounded-l-2xl inline-flex flex-col gap-8 overflow-y-auto">
      <img src="/Group_1000005865.jpg" className="w-full object-contain" />

      <div className="bg-white p-6 w-[800px] mx-auto rounded-lg shadow-md -mt-20 flex items-center gap-6">
        {candidate?.data?.profilePicture ? (
          <img
            src={candidate?.data?.profilePicture}
            alt={candidate?.name}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-6 w-6 text-gray-400" />
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-semibold capitalize">
            {candidate?.data?.name || "-"}
          </h3>
        </div>
        <Button
          variant={"purple"}
          className={"w-fit"}
          onClick={() => setIsEditOpen(true)}
        >
          Edit Candidate
        </Button>
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

          {activeTab === "aboutCandidate" && (
            <AboutCandidate candidate={candidate} />
          )}
        </div>
      </div>

      <EditCandidateDrawer
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        candidate={candidate}
      />
    </div>
  );
};

export default CandidateDetailsDrawer;
