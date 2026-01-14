import { useEffect, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import CorporateResumeFiltering from "../../components/corporate-view/resume-filtering";
import CandidateProfiles from "../../components/recruiter-view/job-openings/candidate-profile";
import Navbar from "../../components/recruiter-view/navbar";
import { useParams, useSearchParams } from "react-router-dom";
import useJobSeekerProfileStore from "../../stores/useJobSeekerProfileStore";
import {
  useGetCandidatesByTrainingId,
  useGetTrainningById,
} from "../../hooks/corporate/useTraining";

const AppliedCandidatesTrainings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { jobSeekerProfile } = useJobSeekerProfileStore();
  const { trainingID } = useParams();
  const [candidateListFilters, setCandidateListFilters] = useState(() => {
    const params = Object.fromEntries([...searchParams]);
    return {
      page: params.page ? Number(params.page) : 1,
      limit: 10,
      search: params.search || "",
    };
  });
  const [open2, setOpen2] = useState(false);
  const { data: applicantData } = useGetTrainningById(jobSeekerProfile?._id);

  const { data: candidateProfiles, isLoading: isLoading3 } =
    useGetCandidatesByTrainingId(trainingID, candidateListFilters);
  useEffect(() => {
    const updatedParams = {};
    for (const key in candidateListFilters) {
      if (candidateListFilters[key])
        updatedParams[key] = candidateListFilters[key];
    }
    setSearchParams(updatedParams);
  }, [candidateListFilters, setSearchParams]);
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
              applicantData={applicantData}
              setOpen={setOpen2}
            />
          </div>
        </SheetContent>
      </Sheet>
      <Navbar onlySupport={false} />
      <CorporateResumeFiltering
        candidateProfiles={candidateProfiles}
        formData={candidateListFilters}
        setFormData={setCandidateListFilters}
        setOpen2={setOpen2}
      />
    </div>
  );
};

export default AppliedCandidatesTrainings;
