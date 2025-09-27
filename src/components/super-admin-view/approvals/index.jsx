import { databaseTabs } from "./utils";
import useDatabaseTabStore from "./zustand";
import CompaniesTab from "./tabs/companies";
import RecruitersTab from "./tabs/recruiters";
import TrainersTab from "./tabs/trainers";
import JobTrainingsTab from "./tabs/jobs-and-trainings";

const Approvals = () => {
  const { activeTab, setActiveTab } = useDatabaseTabStore();

  const renderTabContent = () => {
    switch (activeTab) {
      case "companies":
        return <CompaniesTab />;
      case "jobTrainings":
        return <JobTrainingsTab />;
      case "trainers":
        return <TrainersTab />;
      case "recruiters":
        return <RecruitersTab />;
      default:
        return <CompaniesTab />;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Tab Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex p-1 overflow-x-auto flex-1 lg:max-w-3xl">
          {databaseTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 transition-colors font-medium border-b-[1px] cursor-pointer whitespace-nowrap ${
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

        <div className="flex justify-end items-center space-x-4 ml-4">
          {/* --- Right Action buttons */}
        </div>
      </div>

      {/* Tab Content */}
      <div className="w-full">{renderTabContent()}</div>
    </div>
  );
};

export default Approvals;
