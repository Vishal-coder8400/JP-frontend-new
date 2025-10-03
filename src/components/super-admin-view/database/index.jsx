import { databaseTabs } from "./utils";
import useDatabaseTabStore from "./zustand";
import CompaniesTabDatabase from "./tabs/companies";
import CandidatesTab from "./tabs/candidates";
import RecruitersTab from "./tabs/recruiters";
import TrainersTabDatabase from "./tabs/trainers";
import TabNavigation from "@/components/common/TabNavigation";
import TabContent from "@/components/common/TabContent";

const SuperAdminDatabase = () => {
  const { activeTab, setActiveTab } = useDatabaseTabStore();

  const tabComponents = {
    companies: CompaniesTabDatabase,
    candidates: CandidatesTab,
    trainers: TrainersTabDatabase,
    recruiters: RecruitersTab,
  };

  return (
    <div className="w-full space-y-6 min-w-0">
      <TabNavigation
        tabs={databaseTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <TabContent
        activeTab={activeTab}
        tabComponents={tabComponents}
        defaultTab="companies"
      />
    </div>
  );
};

export default SuperAdminDatabase;
