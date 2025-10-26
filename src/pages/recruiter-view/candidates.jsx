import { useEffect, useState } from "react";
import CandidateProfile from "../../components/recruiter-view/candidates";
import CandidateProfiles from "../../components/recruiter-view/job-openings/candidate-profile";
import {
  useGetAllApplicant,
  useGetApplicantById,
} from "../../hooks/recruiter/useApplicant";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Navbar from "../../components/recruiter-view/navbar";
import useJobSeekerProfileStore from "../../stores/useJobSeekerProfileStore";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks/common/useDebounce";

const Candidates = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const [open2, setOpen2] = useState(false);
  const [filters, setFilters] = useState(() => {
    const params = Object.fromEntries([...searchParams]);
    return {
      page: params.page ? parseInt(params.page) : 1,
      limit: 10,
      designation: params.designation || "",
      search: params.search || "",
      currentSector: params.currentSector || "",
      lastOrganization: params.lastOrganization || "",
      degree: params.degree || "",
      noticePeriod: params.noticePeriod || "",
      salaryRange: params.salaryRange || "",
      experienceLevel: params.experienceLevel || "",
      gender: params.gender || "",
    };
  });
  const { data, isLoading, isError, error } = useGetAllApplicant(filters);
  const { jobSeekerProfile } = useJobSeekerProfileStore();
  const { data: applicantData } = useGetApplicantById(jobSeekerProfile?._id);

  // Debounce searchText to avoid too many API calls
  const debouncedSearch = useDebounce(searchText, 500);
  const handleSearch = (e) => {
    setSearchText(e);
  };
  const ClearAll = () => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      limit: 10,
      designation: "",
      search: "",
      gender: "",
      currentSector: "",
      lastOrganization: "",
      experienceLevel: "",
      degree: "",
      salaryRange: "",
      noticePeriod: "",
    }));
    setSearchText("");
  };

  // 👇 Sync debounced searchText → filters
  useEffect(() => {
    setFilters((prev) => {
      if (prev.search === debouncedSearch) return prev;
      return {
        ...prev,
        search: debouncedSearch,
        page: 1,
      };
    });
  }, [debouncedSearch]);
  useEffect(() => {
    if (filters?.search && !searchText) {
      setSearchText(filters.search);
    }
  }, [filters.search]);
  useEffect(() => {
    const updatedParams = {};

    for (const key in filters) {
      if (filters[key]) updatedParams[key] = filters[key];
    }
    setSearchParams(updatedParams);
  }, [filters]);

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
            <CandidateProfiles applicantData={applicantData} />
          </div>
        </SheetContent>
      </Sheet>
      <Navbar onlySupport={false} />
      <CandidateProfile
        applicants={data}
        filters={filters}
        setFilters={setFilters}
        setOpen2={setOpen2}
        handleSearch={handleSearch}
        searchText={searchText}
        ClearAll={ClearAll}
      />
    </div>
  );
};

export default Candidates;
