import React, { useState } from "react";
import SearchComponent from "../../components/common/searchComponent";
import HeroProfile from "../../components/recruiter-view/common/hero-profile";
import FilterComponent from "../../components/common/filterComponent";
import { jobOpeningFilters } from "../../config";
import Pagination from "../../components/common/pagination";

const Search = () => {
  const [formData, setFormData] = useState({});
  return (
    <div className="hidden lg:flex flex-col gap-[51px]">
      <HeroProfile />
      <div className="flex w-full justify-between">
        <div className="w-[196px] flex flex-col gap-[23px]">
          <div className="text-lg text-[#171923] font-semibold">Filters</div>
          <div
            // onClick={ClearAll}
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
            Job Lists
          </div>
          <div className="border border-[#DFDFDF]"></div>
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
            <img
              className="size-16 relative rounded-sm"
              src="https://placehold.co/72x72"
            />
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                <div className="size- flex flex-col justify-start items-start gap-1">
                  <div className="size- inline-flex justify-start items-center gap-3">
                    <div className="justify-start text-neutral-900 text-lg font-normal leading-relaxed">
                      The Company
                    </div>
                  </div>
                  <div className="size- inline-flex justify-center items-center gap-3">
                    <div className="justify-start text-neutral-900 text-2xl font-medium leading-9">
                      Business Development Intern
                    </div>
                    <div className="size- px-1.5 py-0.5 bg-violet-500/10 rounded-[3px] flex justify-start items-center gap-1 overflow-hidden">
                      <div className="justify-start text-violet-500 text-xs font-medium leading-none">
                        2 applied
                      </div>
                    </div>
                  </div>
                </div>
                <div className="size- py-0.5 inline-flex justify-center items-center gap-6">
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
              <div className="self-stretch justify-start text-neutral-900/70 text-base font-normal leading-normal">
                Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad
                sunt. Pariatur sint culpa do incididunt eiusmod eiusmo...
              </div>
              <div className="size- px-5 py-2.5 bg-gray-900 rounded-3xl inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-white text-sm font-medium capitalize">
                  Apply Now
                </div>
              </div>
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
          <Pagination
            range={2}
            // currentPage={formData.page}
            // totalPages={totalPages}
            onPageChange={(page) =>
              setFormData((prev) => ({ ...prev, page: page }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
