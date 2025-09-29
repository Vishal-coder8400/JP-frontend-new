import { User } from "lucide-react";
import { useState } from "react";
import JobsApplied from "../../database/tabs/candidates/tabs/JobsApplied";
import AboutCandidate from "../../database/tabs/candidates/tabs/AboutCandidate";
import { Button } from "@/components/ui/button";
import { useGetCandidateDetails } from "../../../../hooks/super-admin/useApplicant";

const ApplicationDetailsDrawer = ({ application }) => {
  const [activeTab, setActiveTab] = useState("aboutCandidate");
  const applicantId = application?.applicantId;

  const {
    data: candidateDetails,
    isLoading,
    isError,
  } = useGetCandidateDetails(applicantId, {
    enabled: !!applicantId && !!application,
  });

  const candidate = candidateDetails?.data;

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

      <div className="bg-white p-6 w-[800px] mx-auto rounded-lg shadow-md -mt-20 flex items-center gap-6">
        <User className="h-6 w-6 text-gray-400 mx-auto mb-4" />
        <div className="flex-1">
          <h3 className="font-semibold">
            {candidate?.name || application.applicantId || "N/A"}
          </h3>
          <p className="text-gray1">
            {candidate?.email || application.applicantType || "Job Seekers"}
          </p>
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
    </div>
  );
};

export default ApplicationDetailsDrawer;
