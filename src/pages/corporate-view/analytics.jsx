import CorporateAnalytics from "../../components/corporate-view/analytics";
import Navbar from "../../components/recruiter-view/navbar";

const Analytics = () => {
  return (
    <div className="w-full">
      <Navbar onlySupport={false} />
      <CorporateAnalytics />
    </div>
  );
};

export default Analytics;
