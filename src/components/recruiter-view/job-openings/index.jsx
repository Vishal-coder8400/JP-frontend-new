import React, { Fragment } from "react";
import { Input } from "../../ui/input";
import { FilterIcon, SearchIcon } from "../../../utils/icon";
import JobCard from "./jobCard";
import HeroProfile from "../common/hero-profile";

const Index = ({ setOpen }) => {
  return (
    <Fragment>
      {/* Desktop-view */}
      <div className="hidden lg:flex flex-col gap-[51px]">
        <HeroProfile />
        <div className="flex w-full justify-between">
          <div className="w-[196px]">Filter Part</div>
          <div className="flex flex-col gap-[18px] w-3/4 rounded-[8px] border border-[#dadada] p-[24px]">
            <div className="flex items-center text-[#171923] text-lgfont-semibold leading-tight">
              Job Listings Management
            </div>
            <div className="border border-[#DFDFDF]"></div>
            <div className="relative flex items-center justify-center">
              <Input
                type="search"
                placeholder="Enter job title, company, location"
                className="appearance-none p-[12px] pl-[35px] rounded-[69px] border border-[#6945ED] focus-visible:ring-0 focus:border-[2px] focus:border-[#4E2FC0] placeholder:text-sm placeholder:text-[#A3A3A3]"
              />
              <div className="absolute left-[12px] top-1/2 transform -translate-y-1/2">
                <SearchIcon className="h-[18px] w-[18px]" />
              </div>
            </div>
            {[1, 2, 3, 45, 5].map((j, i) => (
              <JobCard key={i} setOpen={setOpen} />
            ))}
          </div>
        </div>
      </div>
      {/* mobile-view */}
      <div className="w-full p-[24px] lg:hidden inline-flex flex-col justify-start items-start gap-6">
        <HeroProfile />
        <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
              Job Listings Management
            </div>
          </div>
          <div className="self-stretch h-0 outline outline-offset-[-0.50px] outline-neutral-200"></div>
          <div className="relative w-full flex items-center justify-center">
            <Input
              type="search"
              placeholder="Enter job title, company, location"
              className="appearance-none p-[12px] pl-[35px] rounded-[69px] border border-[#6945ED] focus-visible:ring-0 focus:border-[1.5px] focus:border-[#4E2FC0] placeholder:text-sm placeholder:text-[#A3A3A3]"
            />
            <div className="absolute left-[12px] top-1/2 transform -translate-y-1/2">
              <SearchIcon className="h-[18px] w-[18px]" />
            </div>
          </div>
          <JobCard setOpen={setOpen} />
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
