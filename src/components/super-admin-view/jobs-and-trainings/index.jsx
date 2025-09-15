import { jobsAndTrainingsTabs } from "./utils";
import useJobsAndTrainingsTabStore from "./zustand";
import JobsTab from "./tabs/jobs";
import TrainingsTab from "./tabs/trainings";

const JobsAndTrainings = () => {
  const { activeTab, setActiveTab } = useJobsAndTrainingsTabStore();

  const renderTabContent = () => {
    switch (activeTab) {
      case "jobs":
        return <JobsTab />;
      case "trainings":
        return <TrainingsTab />;
      default:
        return <JobsTab />;
    }
  };

  return (
    <div className="w-full space-y-6 min-w-0">
      {/* Tab Navigation */}
      <div className="grid grid-cols-6 min-w-0">
        <div className="col-span-4 flex p-1 min-w-0">
          {jobsAndTrainingsTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 transition-colors font-medium border-b-[1px] cursor-pointer ${
                activeTab === tab.id
                  ? "border-b-primary-purple text-primary-purple"
                  : "text-gray1 border-b-gray1"
              }`}
            >
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        <div className="col-span-2 flex justify-end items-center space-x-4">
          {/* --- Right Action buttons */}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-w-0">{renderTabContent()}</div>
    </div>
  );
};

export default JobsAndTrainings;
