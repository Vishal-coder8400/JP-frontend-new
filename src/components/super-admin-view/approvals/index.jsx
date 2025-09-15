import { databaseTabs } from "./utils";
import useDatabaseTabStore from "./zustand";
import CompaniesTab from "./tabs/companies";
import CandidatesTab from "./tabs/candidates";
import RecruitersTab from "./tabs/recruiters";
import TrainersTab from "./tabs/trainers";

const Approvals = () => {
  const { activeTab, setActiveTab } = useDatabaseTabStore();

  const renderTabContent = () => {
    switch (activeTab) {
      case "companies":
        return <CompaniesTab />;
      case "candidates":
        return <CandidatesTab />;
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
      <div className="grid grid-cols-6">
        <div className="col-span-4 flex p-1">
          {databaseTabs.map((tab) => (
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
      <div>{renderTabContent()}</div>
    </div>
  );
};

export default Approvals;
