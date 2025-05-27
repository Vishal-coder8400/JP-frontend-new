import { useState } from "react";
import CandidateProfile from "../../components/recruiter-view/candidates";
import CandidateProfiles from "../../components/recruiter-view/job-openings/candidate-profile";
import { useGetAllApplicant } from "../../hooks/recruiter/useApplicant";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const Candidates = () => {
  const { data: applicants, isLoading, isError, error } = useGetAllApplicant();
  const [formData, setFormData] = useState({ sortBy: "" });
  const [open2, setOpen2] = useState(false);
  console.log(formData);
  return (
    <div className="lg:pt-[80px] w-full">
      <Sheet open={open2} onOpenChange={setOpen2}>
        <SheetContent
          side="right"
          className="
              w-full h-screen 
            lg:max-w-[999px] 
            md:max-w-full
            sm:max-w-full 
            overflow-y-auto"
        >
          <div className="w-full h-full">
            <CandidateProfiles />
          </div>
        </SheetContent>
      </Sheet>
      <CandidateProfile
        applicants={applicants}
        formData={formData}
        setFormData={setFormData}
        setOpen2={setOpen2}
      />
    </div>
  );
};

export default Candidates;
