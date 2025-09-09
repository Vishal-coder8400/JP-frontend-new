import React from "react";
import MatchesSubmissionComponent from "../../components/recruiter-view/matchesAndSubmission";
import Navbar from "../../components/recruiter-view/navbar";

const MatchesAndSubmission = () => {
  return (
    <div className="w-full">
      <Navbar onlySupport={false} />
      <MatchesSubmissionComponent />
    </div>
  );
};

export default MatchesAndSubmission;
