import { jobsAndTrainingsTabs } from "./utils";
import useJobsAndTrainingsTabStore from "./zustand";
import JobsTab from "./tabs/jobs";
import TrainingsTab from "./tabs/trainings";
import TabNavigation from "@/components/common/TabNavigation";
import TabContent from "@/components/common/TabContent";

const JobsAndTrainings = () => {
  const { activeTab, setActiveTab } = useJobsAndTrainingsTabStore();

  const tabComponents = {
    jobs: JobsTab,
    trainings: TrainingsTab,
  };

  return (
    <div className="w-full space-y-6 min-w-0">
      <TabNavigation
        tabs={jobsAndTrainingsTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <TabContent
        activeTab={activeTab}
        tabComponents={tabComponents}
        defaultTab="jobs"
      />
    </div>
  );
};

export default JobsAndTrainings;
