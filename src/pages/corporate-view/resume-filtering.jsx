import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import CorporateResumeFiltering from "../../components/corporate-view/resume-filtering";
import CandidateProfiles from "../../components/recruiter-view/job-openings/candidate-profile";
import Navbar from "../../components/recruiter-view/navbar";
import {
  useGetApplicantById,
  useGetApplicantCorporateDetails,
} from "@/hooks/corporate/useApplicant";
import useJobSeekerProfileStore from "@/stores/useJobSeekerProfileStore";
import {
  useGetTrainingCorporateDetails,
  useGetTrainningById,
} from "@/hooks/corporate/useTraining";

const ResumeFiltering = () => {
  const [formData, setFormData] = useState({ sortBy: "" });
  const [switchState, setSwitchState] = useState(false);
  const { jobSeekerProfile } = useJobSeekerProfileStore();
  const [open2, setOpen2] = useState(false);
  const { data } = useGetApplicantCorporateDetails();
  const { data: Training } = useGetTrainingCorporateDetails();
  const { data: applicantData } = useGetApplicantById(jobSeekerProfile?._id);
  const { data: trainingData } = useGetTrainningById(jobSeekerProfile?._id);
  return (
    <div className="w-full">
      <Sheet open={open2} onOpenChange={setOpen2}>
        <SheetContent
          side="right"
          className="
            w-full h-screen 
            lg:max-w-[999px] 
            md:max-w-full
            sm:max-w-full 
            overflow-y-auto border-transparent"
        >
          <div className="w-full h-full">
            <CandidateProfiles
              open={open2}
              setOpen={setOpen2}
              applicantData={switchState ? trainingData : applicantData}
            />
          </div>
        </SheetContent>
      </Sheet>
      <Navbar onlySupport={false} />
      <CorporateResumeFiltering
        formData={formData}
        setFormData={setFormData}
        setOpen2={setOpen2}
        candidateProfiles={switchState ? Training : data || []}
        setSwitchState={setSwitchState}
        switchState={switchState}
      />
    </div>
  );
};

export default ResumeFiltering;
