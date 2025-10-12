import { databaseTabs } from "./utils";
import useDatabaseTabStore from "./zustand";

import TabNavigation from "@/components/common/TabNavigation";
import TabContent from "@/components/common/TabContent";
import CompaniesTab from "../common/companies/CompaniesTab";
import { TrainersTab } from "../common/trainers";
import CandidatesTab from "../common/candidates/CandidatesTab";
import RecruitersTab from "../common/recruiters/RecruitersTab";

const SuperAdminDatabase = () => {
  const { activeTab, setActiveTab } = useDatabaseTabStore();

  const tabComponents = {
    companies: CompaniesTab,
    candidates: CandidatesTab,
    trainers: TrainersTab,
    recruiters: RecruitersTab,
  };

  return (
    <div className="h-full space-y-6">
      <TabNavigation
        tabs={databaseTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div>
        <TabContent
          activeTab={activeTab}
          tabComponents={tabComponents}
          defaultTab="companies"
          className="overflow-auto"
        />
      </div>
    </div>
  );
};

export default SuperAdminDatabase;
