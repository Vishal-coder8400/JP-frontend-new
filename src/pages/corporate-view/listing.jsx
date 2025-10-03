import { useEffect, useState } from "react";
import CorporateListing from "../../components/corporate-view/listing";
import {
  useCorporateJobById,
  useFilteredJobs,
  useGetCandidatesByJobId,
} from "../../hooks/corporate/useJob";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import JobDescription from "../../components/recruiter-view/job-openings/job-description";
import Navbar from "../../components/recruiter-view/navbar";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks/common/useDebounce";
import {
  useGetTrainningById,
  useTraining,
} from "../../hooks/corporate/useTraining";
import CandidateProfiles from "../../components/recruiter-view/job-openings/candidate-profile";

import Pagination from "../../components/common/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "../../components/ui/checkbox";
import SearchComponent from "../../components/common/searchComponent";
import { convertMonthsToYearsAndMonths } from "../../utils/commonFunctions";
import useJobPostStore from "../../stores/useJobPostStore";
import useJobSeekerProfileStore from "../../stores/useJobSeekerProfileStore";
import { useGetApplicantById } from "../../hooks/recruiter/useApplicant";

const Listing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setJobSeekerProfile, jobSeekerProfile } = useJobSeekerProfileStore();
  const [currentPage, setCurrentPage] = useState(1);
  const { jobPost } = useJobPostStore();

  // console.log(jobPost)
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [filters, setFilters] = useState(() => {
    // Restore from URL on first render
    const params = Object.fromEntries([...searchParams]);
    return {
      page: params.page ? parseInt(params.page) : 1,
      limit: 10,
      search: params.search || "",
      jobType: params.jobType || "job",
      sortBy: params.sortBy || "",
      jobStatus: params.jobStatus || "",
    };
  });
  const [candidateListFilters, setCandidateListFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
  });
  const { data: applicantData } = useGetApplicantById(jobSeekerProfile?._id);
  const { data: jobPosts, isLoading } = useFilteredJobs(filters);
  const { data: trainingPosts, isLoading: isLoading2 } = useTraining(filters);
  const { data: candidateProfiles, isLoading: isLoading3 } =
    useGetCandidatesByJobId(jobPost?._id, candidateListFilters);
  console.log(candidateProfiles);

  // 👇 Sync filters.search to searchText on mount
  useEffect(() => {
    if (filters?.search && !searchText) {
      setSearchText(filters.search);
    }
  }, [filters.search]);

  // Debounce searchText to avoid too many API calls
  const debouncedSearch = useDebounce(searchText, 500);

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
  // Clear all filters
  const ClearAll = () => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      limit: 10,
      search: "",
      jobType: "job",
      sortBy: "",
      jobStatus: "",
    }));
    setSearchText("");
  };
  const handlejobseekerProfile = (id) => {
    setOpen2(true);
    setJobSeekerProfile({ _id: id });
  };
  return (
    <div className="w-full">
      <Sheet open={open} onOpenChange={setOpen}>
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
            <JobDescription
              useGetJobById={useCorporateJobById}
              useGetTrainningById={useGetTrainningById}
            />
          </div>
        </SheetContent>
      </Sheet>
      <Navbar onlySupport={false} />
      <CorporateListing
        jobPosts={filters.jobType === "job" ? jobPosts : trainingPosts?.data}
        formData={filters}
        setFormData={setFilters}
        setOpen={setOpen}
        handleSearch={handleSearch}
        searchText={searchText}
        ClearAll={ClearAll}
        open1={open1}
        setOpen1={setOpen1}
      />
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
            <CandidateProfiles applicantData={applicantData} />
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
            overflow-y-auto border-transparent"
        >
          <div className="w-full h-full">
            <div className="w-full min-h-screen p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
              <div className="self-stretch inline-flex justify-start items-start">
                <div className="flex-1 justify-start text-gray-900 text-lg font-semibold leading-tight">
                  Candidate List
                </div>
              </div>
              <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
              <SearchComponent />
              <div className="self-stretch rounded-lg ">
                <div className="w-full overflow-x-auto">
                  {/* <div className="min-w-[1000px]"> */}
                  <Table className="w-full border border-[#DADADA] rounded-[8px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="[&:has([role=checkbox])]:border-none px-[16px] py-[12px] w-[50px] text-sm text-[#101018] font-semibold">
                          <Checkbox className="data-[state=checked]:text-white data-[state=checked]:bg-[#6945ED] h-[16px] w-[16px] rounded-[2px] flex items-center justify-center cursor-pointer" />
                        </TableHead>
                        <TableHead className="px-[16px] py-[12px] w-[292px] text-sm text-[#101018] font-semibold">
                          Owner
                        </TableHead>
                        <TableHead className="px-[16px] py-[12px] w-[164px] text-sm text-[#101018] font-semibold">
                          Skills
                        </TableHead>
                        <TableHead className="px-[16px] py-[12px] w-[164px] text-sm text-[#101018] font-semibold">
                          Experience
                        </TableHead>
                        <TableHead className="px-[16px] py-[12px] w-[164px] text-sm text-[#101018] font-semibold">
                          Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {candidateProfiles?.data?.applications.map((item, i) => (
                        <TableRow key={i}>
                          <TableCell className="w-[50px] px-[16px] py-[12px]">
                            <Checkbox className="data-[state=checked]:text-white data-[state=checked]:bg-[#6945ED] h-[16px] w-[16px] rounded-[2px] flex items-center justify-center cursor-pointer" />
                          </TableCell>
                          <TableCell className="px-[16px] py-[12px] flex gap-[10px]">
                            <div
                              onClick={() =>
                                handlejobseekerProfile(item.applicantId)
                              }
                              className="relative cursor-pointer w-[36px] h-[36px] "
                            >
                              <img
                                src={item?.profilePicture}
                                alt={item?.name}
                                className="h-full w-full rounded-[50px] object-cover"
                              />
                            </div>
                            <div className="flex flex-col">
                              <div className="self-stretch justify-start text-[#35353A] text-sm font-bold leading-tight">
                                {item?.name || "N/A"}
                              </div>
                              <div className="self-stretch justify-start text-[#6E6E71] text-xs font-normal leading-none">
                                {item?.areaOfExpertise || "N/A"}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="px-[16px] py-[12px]">
                            <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                              {item?.skills?.join(", ") || "N/A"}
                            </div>
                          </TableCell>
                          <TableCell className="px-[16px] py-[12px]">
                            <div className="self-stretch justify-start text-[#35353A] text-sm font-normal leading-tight">
                              {convertMonthsToYearsAndMonths(
                                item?.totalExperience
                              ) || "N/A"}
                            </div>
                          </TableCell>
                          <TableCell className="px-[16px] py-[12px]">
                            {item.status === "Rejected" ? (
                              <div className="size- px-2 py-1 bg-red-600/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                                <div className="justify-start text-red-600 text-xs font-medium leading-none">
                                  Rejected
                                </div>
                              </div>
                            ) : item.status === "Shortlisted" ? (
                              <div className="size- px-2 py-1 bg-lime-600/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                                <div className="justify-start text-lime-600 text-xs font-medium leading-none">
                                  Shortlisted
                                </div>
                              </div>
                            ) : (
                              <div className="size- px-2 py-1 bg-amber-600/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                                <div className="justify-start text-amber-600 text-xs font-medium leading-none">
                                  Pending
                                </div>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {/* </div> */}
                </div>
                <Pagination
                  currentPage={candidateProfiles?.data?.pagination?.currentPage}
                  totalPages={candidateProfiles?.data?.pagination?.totalPages}
                  range={2}
                  onPageChange={(page) =>
                    setCandidateListFilters((prev) => ({ ...prev, page }))
                  }
                />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Listing;
