import ApplicationsTab from "./ApplicationsTab";

const Applications = () => {
  return (
    <div className="w-full space-y-6">
      <ApplicationsTab
        title="All applications for Product Designer at Google Inc."
        isBackBtnEnabled
      />
    </div>
  );
};

export default Applications;
