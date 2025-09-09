import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import CorporateResumeFiltering from "../../components/corporate-view/resume-filtering";
import CandidateProfiles from "../../components/recruiter-view/job-openings/candidate-profile";
import Navbar from "../../components/recruiter-view/navbar";

const ResumeFiltering = () => {
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
            overflow-y-auto border-transparent"
        >
          <div className="w-full h-full">
            <CandidateProfiles />
          </div>
        </SheetContent>
      </Sheet>
      <Navbar onlySupport={false} />
      <CorporateResumeFiltering
        formData={formData}
        setFormData={setFormData}
        setOpen2={setOpen2}
      />
    </div>
  );
};

export default ResumeFiltering;
