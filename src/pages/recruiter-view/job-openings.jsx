import { Fragment, useEffect, useState } from "react";
import JobOpeningComponent from "../../components/recruiter-view/job-openings";
import JobDescription from "../../components/recruiter-view/job-openings/job-description";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import CandidateSelection from "../../components/recruiter-view/job-openings/candidates-selection";
import CandidateProfile from "../../components/recruiter-view/job-openings/candidate-profile";
import { useGetAllApplicant } from "../../hooks/recruiter/useApplicant";
import { useFilteredJobs } from "../../hooks/recruiter/useJob";

const JobOpenings = () => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    jobType: "",
    sortBy: "",
  });
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { data: applicants, isLoading, isError, error } = useGetAllApplicant();
  const { data: jobPosts, isLoading: isLoading2 } = useFilteredJobs(filters);
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchText, page: 1 }));
    }, 500); // Debounce delay (500ms)

    return () => clearTimeout(delayDebounce);
  }, [searchText]);
  const handleSearch = (e) => {
    setSearchText(e);
  };
  const ClearAll = () => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      limit: 10,
      search: "",
      jobType: "",
      sortBy: "",
    }));
    setSearchText("");
  };

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
        <JobOpeningComponent
          setOpen={setOpen}
          formData={filters}
          setFormData={setFilters}
          jobPosts={jobPosts}
          handleSearch={handleSearch}
          searchText={searchText}
          ClearAll={ClearAll}
        />
      </div>
    </Fragment>
  );
};

export default JobOpenings;
