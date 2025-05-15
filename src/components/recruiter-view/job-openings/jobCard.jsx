import React, { Fragment } from "react";
import {
  CalenderIcon,
  ClockIcon,
  CurrencyIcon,
  Fill,
  LocationIcon,
  RightArrow,
} from "../../../utils/icon";
import { Button } from "../../ui/button";

const JobCard = ({ setOpen }) => {
  return (
    <Fragment>
      {/* //desktop-view */}
      <div className="hidden lg:flex items-center justify-between rounded-[8px] p-[24px] border border-[#dadada]">
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[4px]">
            <div className="flex items-center gap-[10px]">
              <div className="h-[24px] w-[24px] rounded-[4px] bg-[#6945ED]"></div>
              <div className="text-[#141414] text-md">The Company</div>
            </div>
            <div className="text-[#141414] text-lg font-medium">
              Business Development Intern
            </div>
          </div>
          <div className="flex items-center justify-start">
            <span className="text-[#7D5AE2] text-xs font-medium py-[2px] px-[6px] rounded-[3px] bg-custom-purple">
              2 Applied
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-[24px]">
          <div className="flex gap-[6px] items-center">
            <div className="flex items-center justify-center">
              <LocationIcon className="h-[16px] w-[16px]" />
            </div>
            <div className="text-[#141414] text-sm">Brussels</div>
          </div>
          <div className="flex gap-[6px] items-center">
            <div className="flex items-center justify-center">
              <ClockIcon className="h-[16px] w-[16px]" />
            </div>
            <div className="text-[#141414] text-sm">Brussels</div>
          </div>
          <div className="flex gap-[6px] items-center">
            <div className="flex items-center justify-center">
              <CurrencyIcon className="h-[16px] w-[16px]" />
            </div>
            <div className="text-[#141414] text-sm">Brussels</div>
          </div>
          <div className="flex gap-[6px] items-center">
            <div className="flex items-center justify-center">
              <CalenderIcon className="h-[16px] w-[16px]" />
            </div>
            <div className="text-[#141414] text-sm">Brussels</div>
          </div>
        </div>
        <div className="flex flex-col gap-[11px]">
          <div className="flex items-center justify-center gap-[13px] rounded-[8px] border border-[#54C413] px-[12px] py-[8px]">
            <span className="text-[#54C413] text-sm">Active</span>
            <span className="flex items-center justify-center">
              <Fill className="h-[10px] w-[10px]" />
            </span>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="cursor-pointer flex items-center justify-center gap-[4px] rounded-[8px] bg-[#6945ED] px-[12px] py-[8px]"
          >
            <div className="text-[#fff] text-sm">View Details</div>
            <div className="flex items-center justify-center">
              <RightArrow className="h-[16px] w-[16px]" />
            </div>
          </Button>
        </div>
      </div>
      {/* \\mobile-view\\ */}
      <div className="lg:hidden self-stretch flex flex-col justify-center items-center">
        <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-6">
          <div className="self-stretch flex flex-col justify-center gap-3.5">
            <div className="inline-flex justify-start items-center gap-2.5">
              <div className="px-3 py-2 rounded-lg outline outline-offset-[-1px] outline-zinc-300 flex justify-start items-center gap-1.5">
                <div className="w-4 h-4 relative">
                  <CalenderIcon className="w-full h-full" />
                </div>
                <div className="justify-start text-neutral-900/70 text-base font-normal leading-none">
                  29 min ago
                </div>
              </div>
              <div className="px-3 py-2 rounded-lg outline outline-offset-[-1px] outline-lime-600 flex justify-center items-center gap-3">
                <div className="justify-start text-lime-600 text-base font-normal leading-none">
                  Active
                </div>
                <div className="w-2.5 h-2.5 bg-lime-600 rounded-full" />
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-center items-start gap-3.5">
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="inline-flex justify-center items-center gap-2.5">
                  <img
                    className="w-4 h-4 relative rounded"
                    src="https://placehold.co/16x16"
                  />
                  <div className="justify-start text-neutral-900 text-md font-normal leading-none">
                    The Company
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-3">
                  <div className="justify-start text-neutral-900 text-sm font-medium leading-none">
                    Business Development Intern
                  </div>
                  <div className="px-1.5 py-0.5 bg-violet-500/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                    <div className="justify-start text-violet-500 text-sm font-medium leading-none">
                      2 applied
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-0.5 inline-flex justify-start items-start gap-3">
              <div className="flex justify-center items-center gap-1.5">
                <LocationIcon className="h-[14px] w-[14px]" />
                <div className="justify-start text-neutral-900/70 text-sm font-normal leading-none">
                  Brussels
                </div>
              </div>
              <div className="flex justify-start items-center gap-1.5">
                <ClockIcon className="h-[14px] w-[14px]" />
                <div className="justify-start text-neutral-900/70 text-sm font-normal leading-none">
                  Full time
                </div>
              </div>
              <div className="flex justify-start items-center gap-1.5">
                <CurrencyIcon className="h-[14px] w-[14px]" />
                <div className="justify-start text-neutral-900/70 text-sm font-normal leading-none">
                  50-55k
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            className="px-3 py-2 bg-violet-600 rounded-lg outline outline-offset-[-1px] outline-violet-600 inline-flex justify-center items-center gap-1"
          >
            <div className="justify-start text-white text-base font-normal leading-tight">
              View Details
            </div>
            <div className="w-4 h-4 relative overflow-hidden">
              <RightArrow className="w-full h-full" />
            </div>
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default JobCard;
