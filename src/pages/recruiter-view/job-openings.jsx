import { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import JobOpeningComponent from "../../components/recruiter-view/job-openings";
import JobDescription from "../../components/recruiter-view/job-openings/job-description";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import CandidateSelection from "../../components/recruiter-view/job-openings/candidates-selection";
import CandidateProfile from "../../components/recruiter-view/job-openings/candidate-profile";
import {
  useGetAllApplicant,
  useGetApplicantById,
} from "../../hooks/recruiter/useApplicant";
import { useFilteredJobs, useGetJobById } from "../../hooks/recruiter/useJob";
import Navbar from "../../components/recruiter-view/navbar";
import { useDebounce } from "../../hooks/common/useDebounce";
import { useGetTrainningById } from "../../hooks/recruiter/useTraining";
import useJobSeekerProfileStore from "../../stores/useJobSeekerProfileStore";

const JobOpenings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSeeker, setSelectedSeeker] = useState([]);
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState(() => {
    // Restore from URL on first render
    const params = Object.fromEntries([...searchParams]);
    return {
      page: params.page ? parseInt(params.page) : 1,
      limit: 10,
      search: params.search || "",
      sortBy: params.sortBy || "",
      status: params.status || "",
      jobType: "job",
    };
  });
  const [candidateFilters, setCandidateFilters] = useState({
    page: 1,
    limit: 10,
    status: "",
    search: "",
    skills: "",
    location: "",
    salaryRange: "",
    experienceRange: "",
    currentWorkingStatus: "",
  });
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchTextCandidate, setSearchTextCandidate] = useState("");
  const { jobSeekerProfile } = useJobSeekerProfileStore();
  const { data: applicantData } = useGetApplicantById(jobSeekerProfile?._id);

  const {
    data: applicants,
    isLoading,
    isError,
    error,
  } = useGetAllApplicant(candidateFilters);
  const { data: jobPosts, isLoading: isLoading2 } = useFilteredJobs(filters);

  // 👇 Sync filters.search to searchText on mount
  useEffect(() => {
    if (filters?.search && !searchText) {
      setSearchText(filters.search);
    }
    if (candidateFilters?.search && !searchTextCandidate) {
      setSearchTextCandidate(candidateFilters.search);
    }
  }, [filters.search, candidateFilters.search]);

  // Debounce searchText to avoid too many API calls
  const debouncedSearch = useDebounce(searchText, 500);
  const debouncedSearchCandidate = useDebounce(searchTextCandidate, 500);

  // 👇 Sync debounced searchText → filters
  useEffect(() => {
    setCandidateFilters((prev) => {
      if (prev.search === debouncedSearchCandidate) return prev;
      return { ...prev, search: debouncedSearchCandidate, page: 1 };
    });

    setFilters((prev) => {
      if (prev.search === debouncedSearch) return prev;
      return {
        ...prev,
        search: debouncedSearch,
        page: 1,
      };
    });
  }, [debouncedSearch, debouncedSearchCandidate]);
  // Update URL when filters change
  useEffect(() => {
    const updatedParams = {};

    for (const key in filters) {
      if (filters[key]) updatedParams[key] = filters[key];
    }
    setSearchParams(updatedParams);
  }, [filters]);
  // Handle search input
  const handleSearch = (e) => {
    setSearchText(e);
  };
  const handleSearchCandidate = (e) => {
    setSearchTextCandidate(e);
  };
  // Clear all filters
  const ClearAll = () => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      limit: 10,
      search: "",
      status: "",
      sortBy: "",
      jobType: "job",
    }));
    setSearchText("");
  };

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error: {error.message}</div>;
  // if (isLoading2) return <div>Loading job posts...</div>;

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
            overflow-y-auto border-transparent [&>button.absolute]:hidden"
        >
          <div className="w-full h-full">
            <JobDescription
              setOpen1={setOpen1}
              setOpen={setOpen}
              useGetTrainningById={useGetTrainningById}
              useGetJobById={useGetJobById}
            />
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
            overflow-y-auto border-transparent [&>button.absolute]:hidden"
        >
          <div className="w-full h-full">
            <CandidateSelection
              applicants={applicants?.data?.jobSeekers}
              show={true}
              setOpen2={setOpen2}
              button={true}
              selectedSeeker={selectedSeeker}
              setSelectedSeeker={setSelectedSeeker}
              filters={candidateFilters}
              setFilters={setCandidateFilters}
              currentPage={applicants?.data?.pagination?.currentPage}
              totalPages={applicants?.data?.pagination?.totalPages}
              handleSearch={handleSearchCandidate}
              searchTextCandidate={searchTextCandidate}
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
            overflow-y-auto border-transparent [&>button.absolute]:hidden"
        >
          <div className="w-full h-full">
            <CandidateProfile applicantData={applicantData} />
          </div>
        </SheetContent>
      </Sheet>

      <div className="w-full">
        <Navbar onlySupport={false} />
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
