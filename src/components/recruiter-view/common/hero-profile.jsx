import React, { Fragment } from "react";
import { Input } from "../../ui/input";
import { FilterIcon, SearchIcon } from "../../../utils/icon";
import useAuthStore from "../../../stores/useAuthStore";

const HeroProfile = () => {
  const { user } = useAuthStore();
  return (
    <Fragment>
      <div className="hidden lg:flex flex-col gap-[30px]">
        <div className="text-3xl text-[#171923] font-bold">
          Hello, {user?.name}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[12px]">
            <div className="flex justify-center items-center w-[39px] h-[39px] overflow-hidden rounded-[6px]">
              <img src="" alt="" className="h-full w-full bg-black" />
            </div>
            <div className="text-[#141414] text-lg">Uber India</div>
          </div>
          <div className="relative w-3/4 flex items-center justify-center">
            <Input
              type="search"
              placeholder="Enter job title, company, location"
              className="appearance-none p-[12px] pl-[35px] rounded-[69px] border border-[#6945ED] focus-visible:ring-0 focus:border-[2px] focus:border-[#4E2FC0] placeholder:text-sm placeholder:text-[#A3A3A3]"
            />
            <div className="absolute left-[12px] top-1/2 transform -translate-y-1/2">
              <SearchIcon className="h-[18px] w-[18px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden self-stretch inline-flex justify-between items-center">
        <div className="justify-start text-gray-900 text-xl font-bold leading-tight">
          Hello, {user?.name}
        </div>
        <div className="flex justify-start items-center gap-3">
          <img className="w-7 h-7 rounded" src="https://placehold.co/28x28" />
          <div className="justify-start text-[#141414] text-sm font-normal leading-tight">
            Uber India
          </div>
        </div>
      </div>
      <div className="lg:hidden self-stretch inline-flex justify-between items-center gap-6">
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
        <div className="p-[12px] rounded-[50px] outline outline-offset-[-1px] outline-black flex justify-center items-center">
          <FilterIcon className="h-[17px] w-[17px]" />
        </div>
      </div>
    </Fragment>
  );
};

export default HeroProfile;
