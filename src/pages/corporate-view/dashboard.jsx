import Dashboard from "../../components/corporate-view/dashboard";
import Navbar from "../../components/recruiter-view/navbar";

const CorporateDashboard = () => {
  return (
    <div className="w-full flex flex-col gap-[25px]">
      <Navbar onlySupport={false} />
      <Dashboard />
    </div>
  );
};

export default CorporateDashboard;
