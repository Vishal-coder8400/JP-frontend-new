import { useState, useEffect } from "react";
import JobApprovalTab from "./JobApprovalTab";
import TrainingApprovalTab from "./TrainingApprovalTab";

const JobTrainingsTab = () => {
  const [activeSubTab, setActiveSubTab] = useState("jobs");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const subTabs = [
    {
      id: "jobs",
      name: "Jobs",
    },
    {
      id: "trainings",
      name: "Trainings",
    },
  ];

  const handleTabChange = (tabId) => {
    if (tabId !== activeSubTab) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSubTab(tabId);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case "jobs":
        return <JobApprovalTab />;
      case "trainings":
        return <TrainingApprovalTab />;
      default:
        return <JobApprovalTab />;
    }
  };

  return (
    <div className="w-full gap-6">
      {/* Sub Tab Navigation */}
      <div className="w-full grid grid-cols-12 gap-2">
        {subTabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`${
              index === 0 ? "col-start-11" : "col-start-12"
            } col-span-1 text-center px-4 py-2 transition-colors font-medium cursor-pointer whitespace-nowrap rounded-3xl ${
              activeSubTab === tab.id
                ? "bg-primary-purple text-white"
                : "text-gray1"
            }`}
          >
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Sub Tab Content with grid layout */}
      <div className="grid grid-cols-1 min-h-0">
        <div
          className={`transition-opacity duration-300 ease-in-out ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {renderSubTabContent()}
        </div>
      </div>
    </div>
  );
};

export default JobTrainingsTab;
