import { approvalTabs } from "./utils";
import useApprovalsUIStore from "../../../stores/useApprovalsUIStore";
import CompaniesTabApprovals from "./tabs/companies";
import RecruitersTab from "./tabs/recruiters";
import TrainersTabApprovals from "./tabs/trainers";
import JobTrainingsTab from "./tabs/jobs-and-trainings";
import TabNavigation from "@/components/common/TabNavigation";
import TabContent from "@/components/common/TabContent";

const Approvals = () => {
  const { activeTab, setActiveTab } = useApprovalsUIStore();

  const tabComponents = {
    companies: CompaniesTabApprovals,
    jobTrainings: JobTrainingsTab,
    trainers: TrainersTabApprovals,
    recruiters: RecruitersTab,
  };

  return (
    <div className="w-full space-y-6">
      <TabNavigation
        tabs={approvalTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        containerClassName="w-full space-y-6"
      />

      <TabContent
        activeTab={activeTab}
        tabComponents={tabComponents}
        defaultTab="companies"
        className="w-full"
      />
    </div>
  );
};

export default Approvals;
