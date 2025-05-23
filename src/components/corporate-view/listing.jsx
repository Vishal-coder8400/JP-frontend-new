import { Link } from "react-router-dom";
import HeroProfile from "../recruiter-view/common/hero-profile";
import JobCard from "../recruiter-view/job-openings/jobCard";

const Listing = () => {
  return (
    <div className="w-full  inline-flex flex-col justify-start items-start gap-12 overflow-hidden">
      <div className="w-full">
        <HeroProfile />
      </div>

      <div className="inline-flex justify-start items-center gap-5">
        <Link
          to={"/corporate/job-posting/analytics"}
          className="w-28 p-3 bg-white rounded-[69px] outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-center items-center gap-6 overflow-hidden"
        >
          <div className="justify-center text-neutral-400 text-base font-normal leading-snug">
            Analytics
          </div>
        </Link>
        <div className="w-28 p-3 bg-violet-600 rounded-[69px] flex justify-center items-center gap-6 overflow-hidden">
          <div className="justify-center text-white text-base font-normal leading-snug">
            Listings
          </div>
        </div>
      </div>
      <div className="self-stretch inline-flex justify-start items-start gap-10">
        <div className="max-w-[196px] w-full inline-flex flex-col justify-start items-start gap-6">
          <div className="self-stretch justify-start text-gray-900 text-xl font-semibold leading-tight">
            Filters
          </div>
          <div className="justify-start text-blue-500 text-sm font-medium leading-none">
            Clear All
          </div>
        </div>
        <div className="flex-1 p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-4">
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
              Job Listings{" "}
            </div>
            <div className="justify-start text-zinc-500 text-xs font-medium leading-tight">
              View All
            </div>
          </div>
          <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
          <div className="self-stretch h-10 pl-3 pr-24 py-3 bg-white rounded-[69px] outline outline-1 outline-offset-[-1px] outline-violet-600 inline-flex justify-start items-center gap-6 overflow-hidden">
            <div className="size-4 relative overflow-hidden">
              <div className="size-3 left-[2.25px] top-[2.25px] absolute outline outline-2 outline-offset-[-1px] outline-stone-300" />
              <div className="size-[3.26px] left-[12.49px] top-[12.49px] absolute outline outline-2 outline-offset-[-1px] outline-stone-300" />
            </div>
            <div className="justify-center text-neutral-400 text-xs font-normal leading-3">
              Enter job title, company, location
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-4 w-full">
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
