import CandidateCreation from "../../components/recruiter-view/candidateCreate";
import Navbar from "../../components/recruiter-view/navbar";

const CandidateCreate = () => {
  return (
    <div className="w-full">
      <Navbar onlySupport={false} />
      <CandidateCreation />
    </div>
  );
};

export default CandidateCreate;
