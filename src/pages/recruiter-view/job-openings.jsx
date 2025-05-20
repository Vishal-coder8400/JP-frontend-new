import { Fragment, useState } from "react";
import JobOpeningComponent from "../../components/recruiter-view/job-openings";
import JobDescription from "../../components/recruiter-view/job-openings/job-description";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import CandidateSelection from "../../components/recruiter-view/job-openings/candidates-selection";
import CandidateProfile from "../../components/recruiter-view/job-openings/candidate-profile";
import { useGetAllApplicant } from "../../hooks/recruiter/useApplicant";

const JobOpenings = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const { data: applicants, isLoading, isError, error } = useGetAllApplicant();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
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
            <JobDescription setOpen1={setOpen1} setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <Sheet open={open1} onOpenChange={setOpen1}>
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
            <CandidateSelection
              applicants={applicants}
              show={true}
              setOpen2={setOpen2}
              button={true}
            />
          </div>
        </SheetContent>
      </Sheet>
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
            <CandidateProfile />
          </div>
        </SheetContent>
      </Sheet>

      <div className="lg:pt-[80px] w-full">
        <JobOpeningComponent setOpen={setOpen} />
      </div>
    </Fragment>
  );
};

export default JobOpenings;
