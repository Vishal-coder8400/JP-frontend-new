import { useState } from "react";
import CandidateProfile from "../../components/recruiter-view/candidates";
import CandidateProfiles from "../../components/recruiter-view/job-openings/candidate-profile";
import { useGetAllApplicant } from "../../hooks/recruiter/useApplicant";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Navbar from "../../components/recruiter-view/navbar";

const Candidates = () => {
  const { data, isLoading, isError, error } = useGetAllApplicant();
  const applicants = data?.data ? [...data.data].reverse() : [];
  const [formData, setFormData] = useState({ sortBy: "" });
  const [open2, setOpen2] = useState(false);

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
            overflow-y-auto border-transparent [&>button.absolute]:hidden"
        >
          <div className="w-full h-full">
            <CandidateProfiles />
          </div>
        </SheetContent>
      </Sheet>
      <Navbar onlySupport={false} />
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
