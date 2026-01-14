import { Link, useLocation } from "react-router-dom";
import HeroProfile from "../recruiter-view/common/hero-profile";
import JobCard from "../recruiter-view/job-openings/jobCard";
import SearchComponent from "../common/searchComponent";
import Pagination from "../common/pagination";
import FilterComponent from "../common/filterComponent";
import { jobOpeningFilters } from "../../config";

const Listing = ({
  jobPosts,
  formData,
  setFormData,
  ClearAll,
  setOpen,
  handleSearch,
  searchText,
  setOpen1,
}) => {
  const location = useLocation();
  const totalPages = Math.ceil(jobPosts?.pagination?.total / 10);
  return (
    <div className="w-full flex flex-col gap-[26px] lg:gap-6 max-sm:p-[20px]">
      <div className="w-full">
        <HeroProfile />
      </div>
      {location.pathname.includes("job-posting") && (
        <div className="inline-flex justify-start items-center gap-5">
          <div className="w-28 p-3  bg-[#6945ED]  rounded-[69px]   flex justify-center items-center gap-6 overflow-hidden">
            <div className="justify-center text-white text-base font-normal leading-snug">
              Listings
            </div>
          </div>
          <Link
            to={"/corporate/job-posting/analytics"}
            className="w-28 p-3 bg-white outline-neutral-400  outline-1 outline-offset-[-1px] rounded-[69px] flex justify-center items-center gap-6 overflow-hidden"
          >
            <div className="justify-center text-neutral-400 text-base font-normal leading-snug">
              Analytics
            </div>
          </Link>
        </div>
      )}
      <div className="self-stretch inline-flex justify-start items-start gap-10">
        <div className="w-[196px] hidden lg:flex flex-col gap-[23px]">
          <div className="text-lg text-[#171923] font-semibold">Filters</div>
          <div
            onClick={ClearAll}
            className="text-[#3F93FF] text-base font-medium cursor-pointer"
          >
            Clear All
          </div>
          <FilterComponent
            formControls={jobOpeningFilters}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className="flex-1 p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-4">
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="justify-start text-gray-900 lg:text-xl text-lg font-semibold leading-tight">
              {location.pathname.includes("job-posting")
                ? "Job Listings"
                : "Training Listings"}
            </div>
          </div>
          <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
          <SearchComponent handleSearch={handleSearch} value={searchText} />
          <div className="self-stretch flex flex-col justify-start items-start gap-4 w-full">
            {jobPosts?.data?.length > 0 ? (
              jobPosts.data.map((item, i) => (
                <JobCard
                  key={i}
                  item={item}
                  setOpen={setOpen}
                  setOpen1={setOpen1}
                />
              ))
            ) : jobPosts?.data?.length > 0 ? (
              jobPosts.data.map((item, i) => (
                <JobCard
                  key={i}
                  item={item}
                  setOpen={setOpen}
                  setOpen1={setOpen1}
                />
              ))
            ) : (
              <div className="w-full text-center py-10 text-gray-500">
                No job posts found
              </div>
            )}
          </div>
          <Pagination
            range={2}
            currentPage={formData.page}
            totalPages={totalPages}
            onPageChange={(page) =>
              setFormData((prev) => ({ ...prev, page: page }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Listing;
