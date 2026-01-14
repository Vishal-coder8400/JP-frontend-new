import { useEffect, useState } from "react";
import Navbar from "../../components/recruiter-view/navbar";
import { Link, useSearchParams } from "react-router-dom";
import HeroProfile from "../../components/recruiter-view/common/hero-profile";
import Pagination from "../../components/common/pagination";
import SearchComponent from "../../components/common/searchComponent";
import { useGetTrainerProgress } from "@/hooks/trainer/useProfile";
import {
  useApplyForTraining,
  useGetAllTrainings,
} from "@/hooks/trainer/useTrainings";
import useAuthStore from "@/stores/useAuthStore";
import PendingApprove from "@/components/common/pending-approve";
import JobCard from "@/components/trainer-view/jobCard";
import { useDebounce } from "@/hooks/common/useDebounce";

const JobSeekerDashboard = () => {
  const { user } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState(() => {
    // Restore from URL on first render
    const params = Object.fromEntries([...searchParams]);
    return {
      page: params.page ? parseInt(params.page) : 1,
      limit: 10,
      search: params.search || "",
    };
  });
  const { data: trainerProgressData } = useGetTrainerProgress();
  const { data: allTrainingsData } = useGetAllTrainings(filters);
  const { mutate: applyForTraining } = useApplyForTraining();
  const debouncedSearch = useDebounce(searchText, 500);
  const nextStagePath =
    trainerProgressData?.data?.currentStage === 2
      ? "/trainer/profile-setup/education-details"
      : trainerProgressData?.data?.currentStage === 3
      ? "/trainer/profile-setup/working-details"
      : trainerProgressData?.data?.currentStage === 4
      ? "/trainer/profile-setup/certificate-details"
      : "/trainer/dashboard";
  const handleApply = (e, trainingId) => {
    e.preventDefault();
    e.stopPropagation();
    applyForTraining({
      trainingId: trainingId,
    });
  };

  useEffect(() => {
    if (filters?.search && !searchText) {
      setSearchText(filters.search);
    }
  }, [filters.search]);
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
    const updatedParams = {};

    for (const key in filters) {
      if (filters[key]) updatedParams[key] = filters[key];
    }
    setSearchParams(updatedParams);
  }, [filters]);
  const handleSearch = (e) => {
    setSearchText(e);
  };
  return (
    <div className="w-full flex flex-col gap-[30px] ">
      <Navbar onlySupport={false} />
      <div className="flex w-full items-start justify-between">
        <div className="w-full flex flex-col gap-[31px]">
          <HeroProfile />
          {trainerProgressData?.data?.signupProgress < 100 ? (
            <div className="self-stretch p-10 bg-white rounded-2xl shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] outline outline-offset-[-1px] outline-neutral-300 flex flex-col justify-start items-start gap-2.5">
              <div className="self-stretch inline-flex justify-start items-start gap-12">
                <div className="inline-flex flex-col justify-center items-start gap-3.5">
                  <div className="justify-start text-gray-900 text-6xl font-semibold leading-[64px]">
                    {trainerProgressData?.data?.signupProgress}%
                  </div>
                  <div className="w-28 opacity-70 justify-start text-gray-900 text-base font-semibold">
                    Of your profile is complete
                  </div>
                </div>
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
                  <div className="self-stretch justify-start text-gray-900 text-lg font-semibold leading-tight">
                    Complete your profile!
                  </div>
                  <div className="self-stretch inline-flex justify-start items-start gap-2">
                    {Array.from({
                      length: trainerProgressData?.data?.totalStages,
                    }).map((_, index) => (
                      <div
                        key={index}
                        className={`flex-1 h-2 ${
                          trainerProgressData?.data?.completedStages.includes(
                            index + 1
                          )
                            ? "bg-lime-600"
                            : "bg-zinc-300"
                        } rounded-xl`}
                      />
                    ))}
                  </div>
                  <div className="self-stretch inline-flex justify-start items-center gap-12">
                    <div className="flex-1 opacity-70 justify-start text-gray-900 text-base font-normal">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut.
                    </div>
                    <Link
                      to={nextStagePath}
                      className="px-4 py-3.5 bg-neutral-800 rounded-md shadow-[0px_1px_4px_0px_rgba(25,33,61,0.08)] flex justify-center items-center gap-[3px]"
                    >
                      <div className="text-center justify-start text-white text-base font-semibold leading-tight">
                        Proceed to Complete
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : user?.status === "pending" ? (
            <PendingApprove />
          ) : null}
          <div className="self-stretch inline-flex justify-start items-start gap-3.5">
            {/* <div className="flex-1 px-4 py-5 bg-color-gray-10 rounded-xl outline outline-1 outline-offset-[-1px] outline-stone-300/80 flex justify-center items-center gap-2.5">
              <div className="size-4 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M7.66683 13.9999C11.1646 13.9999 14.0002 11.1644 14.0002 7.66659C14.0002 4.16878 11.1646 1.33325 7.66683 1.33325C4.16903 1.33325 1.3335 4.16878 1.3335 7.66659C1.3335 11.1644 4.16903 13.9999 7.66683 13.9999Z"
                    stroke="#9E9E9E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.6668 14.6666L13.3335 13.3333"
                    stroke="#9E9E9E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex-1 self-stretch justify-center text-color-gray-60 text-xs font-medium">
                Search your job here
              </div>
            </div> */}
            <SearchComponent value={searchText} handleSearch={handleSearch} />
            {/* <div className="w-44 px-4 py-5 bg-color-gray-10 rounded-xl outline outline-1 outline-offset-[-1px] outline-stone-300/80 flex justify-center items-center gap-2.5">
              <div className="size-4 relative overflow-hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1168_13659)">
                    <path
                      d="M14 6.66675C14 11.3334 8 15.3334 8 15.3334C8 15.3334 2 11.3334 2 6.66675C2 5.07545 2.63214 3.54933 3.75736 2.42411C4.88258 1.29889 6.4087 0.666748 8 0.666748C9.5913 0.666748 11.1174 1.29889 12.2426 2.42411C13.3679 3.54933 14 5.07545 14 6.66675Z"
                      stroke="#9E9E9E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 8.66675C9.10457 8.66675 10 7.77132 10 6.66675C10 5.56218 9.10457 4.66675 8 4.66675C6.89543 4.66675 6 5.56218 6 6.66675C6 7.77132 6.89543 8.66675 8 8.66675Z"
                      stroke="#9E9E9E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1168_13659">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="flex-1 self-stretch justify-center text-color-gray-60 text-xs font-medium">
                Location
              </div>
            </div> */}
          </div>
          {/* <div className="size- inline-flex justify-start items-start gap-8">
            <div className="size- px-5 py-2.5 rounded-3xl outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-center items-center gap-2.5">
              <div className="justify-start text-neutral-400 text-sm font-medium capitalize">
                Applied Jobs
              </div>
            </div>
            <div className="size- px-5 py-2.5 rounded-3xl outline outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-center items-center gap-2.5">
              <div className="justify-start text-neutral-400 text-sm font-medium capitalize">
                Saved Jobs
              </div>
            </div>
          </div> */}
          <div className="justify-start text-neutral-900 text-lg font-semibold leading-tight">
            Recommended Trainings
          </div>
          {allTrainingsData?.data?.trainings?.map((item) => (
            <JobCard key={item._id} item={item} handleApply={handleApply} />
          ))}

          <Pagination
            range={2}
            currentPage={filters.page}
            totalPages={allTrainingsData?.data?.pagination?.totalPages}
            onPageChange={(page) =>
              setFilters((prev) => ({ ...prev, page: page }))
            }
          />
          {/* <div className="justify-start text-neutral-900 text-lg font-semibold leading-tight">
            Top companies hiring
          </div> */}
          {/* <div className="w-64 p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-3.5">
            <div className="self-stretch inline-flex justify-start items-start gap-6">
              <div className="size-10 relative rounded-sm overflow-hidden">
                <img
                  className="size-10 left-0 top-0 absolute"
                  src="https://placehold.co/42x42"
                />
              </div>
              <div className="size- pl-3.5 pr-5 py-2.5 rounded-3xl outline outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-center items-center gap-2.5">
                <div className="size-4 relative overflow-hidden">
                  <div className="w-2.5 h-3 left-[3.33px] top-[2px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-400" />
                </div>
                <div className="justify-start text-neutral-400 text-sm font-medium capitalize">
                  Save
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                <div className="self-stretch flex flex-col justify-start items-start gap-3">
                  <div className="self-stretch flex flex-col justify-start items-start">
                    <div className="self-stretch justify-start text-neutral-900 text-base font-normal leading-normal">
                      Google
                    </div>
                    <div className="self-stretch justify-start text-neutral-900 text-xl font-semibold leading-tight">
                      Data Engineer
                    </div>
                  </div>
                  <div className="size- px-1.5 py-0.5 bg-violet-500/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                    <div className="justify-start text-violet-500 text-xs font-medium leading-none">
                      2 applied
                    </div>
                  </div>
                </div>
                <div className="self-stretch py-3 inline-flex justify-center items-center gap-3 flex-wrap content-center">
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="w-2.5 h-px left-[3px] top-[14px] absolute bg-neutral-900/70" />
                      <div className="size-[5px] left-[5.50px] top-[4px] absolute bg-neutral-900/70" />
                      <div className="w-2.5 h-3.5 left-[2.50px] top-[1px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      Brussels
                    </div>
                  </div>
                  <div className="size-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="size-3 left-[1.50px] top-[1.50px] absolute bg-neutral-900/70" />
                      <div className="size-1 left-[7.50px] top-[4px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      Full time
                    </div>
                  </div>
                  <div className="size-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="w-px h-3.5 left-[7.50px] top-[1px] absolute bg-neutral-900/70" />
                      <div className="w-2 h-2.5 left-[3.50px] top-[2.50px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      50-55k
                    </div>
                  </div>
                  <div className="size-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="size- flex justify-start items-center gap-1.5">
                    <div className="size-4 relative">
                      <div className="size-3 left-[2px] top-[2px] absolute bg-neutral-900/70" />
                      <div className="w-px h-[3px] left-[10.50px] top-[1px] absolute bg-neutral-900/70" />
                      <div className="w-px h-[3px] left-[4.50px] top-[1px] absolute bg-neutral-900/70" />
                      <div className="w-3 h-px left-[2px] top-[5px] absolute bg-neutral-900/70" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      29 min ago
                    </div>
                  </div>
                </div>
              </div>
              <div className="size- px-5 py-2.5 bg-gray-900 rounded-3xl inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-white text-sm font-medium capitalize">
                  Apply Now
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
