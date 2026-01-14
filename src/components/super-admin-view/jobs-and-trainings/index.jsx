import { jobsAndTrainingsTabs } from "./utils";
import useJobsAndTrainingsTabStore from "./zustand";
import JobsTab from "../common/jobs/JobsTab";
import TrainingsTab from "../common/trainings/TrainingsTab";
import TabNavigation from "@/components/common/TabNavigation";
import TabContent from "@/components/common/TabContent";

const JobsAndTrainings = () => {
  const { activeTab, setActiveTab } = useJobsAndTrainingsTabStore();

  const tabComponents = {
    jobs: JobsTab,
    trainings: TrainingsTab,
  };

  return (
    <div className="h-full w-full flex flex-col gap-6">
      <TabNavigation
        tabs={jobsAndTrainingsTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="flex-1 min-w-0 w-full">
        <TabContent
          activeTab={activeTab}
          tabComponents={tabComponents}
          defaultTab="jobs"
          className="h-full w-full"
        />
      </div>
    </div>
  );
};

export default JobsAndTrainings;
