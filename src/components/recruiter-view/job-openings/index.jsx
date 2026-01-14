import { Fragment } from "react";
import JobCard from "./jobCard";
import HeroProfile from "../common/hero-profile";
import SearchComponent from "../../common/searchComponent";
import Pagination from "../../common/pagination";
import FilterComponent from "../../common/filterComponent";
import { jobOpeningFilters } from "../../../config";

const Index = ({
  setOpen,
  formData,
  setFormData,
  jobPosts,
  handleSearch,
  searchText,
  ClearAll,
  setCandidateFilters,
}) => {
  const totalPages = Math.ceil(jobPosts?.pagination?.total / 10);
  return (
    <Fragment>
      {/* Desktop-view */}
      <div className="hidden lg:flex flex-col gap-[51px]">
        <HeroProfile />
        <div className="flex w-full justify-between">
          <div className="w-[196px] flex flex-col gap-[23px]">
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
          <div className="flex flex-col gap-[18px] w-3/4 rounded-[8px] border border-[#dadada] p-[24px]">
            <div className="flex items-center text-[#171923] text-lg font-semibold leading-tight">
              Job Listings Management
            </div>
            <div className="border border-[#DFDFDF]"></div>
            <SearchComponent handleSearch={handleSearch} value={searchText} />
            {jobPosts?.data?.map((item, i) => (
              <JobCard
                key={i}
                item={item}
                setOpen={setOpen}
                setCandidateFilters={setCandidateFilters}
              />
            ))}
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
      {/* mobile-view */}
      <div className="w-full p-[24px] lg:hidden inline-flex flex-col justify-start items-start gap-6">
        <HeroProfile />
        <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="justify-start text-gray-900 text-lg font-semibold leading-tight">
              Job Listings Management
            </div>
          </div>
          <div className="self-stretch h-0 outline outline-offset-[-0.50px] outline-neutral-200"></div>
          <SearchComponent handleSearch={handleSearch} value={searchText} />
          {jobPosts?.data?.map((item, i) => (
            <JobCard
              key={i}
              item={item}
              setOpen={setOpen}
              setCandidateFilters={setCandidateFilters}
            />
          ))}
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
    </Fragment>
  );
};

export default Index;
