import { databaseTabs } from "./utils";
import useDatabaseTabStore from "./zustand";
import CompaniesTab from "./tabs/companies";
import TrainersTab from "./tabs/Trainers";
import RecruitersTab from "./tabs/Recruiters";
import CandidatesTab from "./tabs/candidates";

const SuperAdminDatabase = () => {
  const { activeTab, setActiveTab } = useDatabaseTabStore();

  const tabComponents = {
    companies: <CompaniesTab />,
    candidates: <CandidatesTab />,
    trainers: <TrainersTab />,
    recruiters: <RecruitersTab />,
  };

  const renderActiveTabContent = () => {
    return tabComponents[activeTab] || tabComponents.companies;
  };

  return (
    <div className="w-full space-y-6">
      {/* Tab Navigation */}
      <div className="grid grid-cols-6">
        <div className="cols-span-4 flex p-1">
          {databaseTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 transition-colors font-medium border-b-[1px] ${
                activeTab === tab.id
                  ? "border-b-primary-purple text-primary-purple"
                  : "text-gray1 border-b-gray1"
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        <div className="cols-span-2 flex justify-end items-center space-x-4">
          {/* --- Right Action buttons */}
        </div>
      </div>

      {/* Tab Content */}
      <div>{renderActiveTabContent()}</div>
    </div>
  );
};

export default SuperAdminDatabase;
