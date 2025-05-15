import React, { Fragment } from "react";
import HeroProfile from "../common/hero-profile";
import { Input } from "../../ui/input";
import { SearchIcon } from "../../../utils/icon";
import CandidateSelection from "../job-openings/candidates-selection";
import { Link } from "react-router-dom";

const Index = ({ applicants }) => {

  return (
    <Fragment>
      <div className="hidden lg:flex flex-col gap-[51px]">
        <HeroProfile />
        <div className="w-full p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
          <Link
            to="/recruiter/candidates/candidate-create"
            className="px-5 py-4 bg-gray-900 rounded-3xl inline-flex justify-center items-center gap-2.5"
          >
            <div className="justify-start text-white text-sm font-semibold leading-none">
              Create Candidate
            </div>
          </Link>
          <div className="self-stretch inline-flex justify-start items-center">
            <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
              Candidates Management
            </div>
          </div>
          <div className="self-stretch h-0 outline outline-offset-[-0.50px] outline-neutral-200"></div>
          <div className="relative w-full flex items-center justify-center">
            <Input
              type="search"
              placeholder="Enter job title, company, location"
              className="appearance-none p-[12px] pl-[35px] rounded-[69px] border border-[#6945ED] focus-visible:ring-0 focus:border-[2px] focus:border-[#4E2FC0] placeholder:text-sm placeholder:text-[#A3A3A3]"
            />
            <div className="absolute left-[12px] top-1/2 transform -translate-y-1/2">
              <SearchIcon className="h-[18px] w-[18px]" />
            </div>
          </div>
          <CandidateSelection
            show={false}
            button={false}
            applicants={applicants}
          />
        </div>
      </div>
      <div className="w-full p-[24px] lg:hidden inline-flex flex-col justify-start items-start gap-6">
        <HeroProfile />
        <div className="w-full p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
          <Link
            to="/recruiter/candidates/candidate-create"
            className="px-5 py-4 bg-gray-900 rounded-3xl inline-flex justify-center items-center gap-2.5"
          >
            <div className="justify-start text-white text-sm font-semibold leading-none">
              Create Candidate
            </div>
          </Link>
          <div className="self-stretch inline-flex justify-start items-center">
            <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
              Candidates Management
            </div>
          </div>
          <div className="self-stretch h-0 outline outline-offset-[-0.50px] outline-neutral-200"></div>
          <div className="relative w-full flex items-center justify-center">
            <Input
              type="search"
              placeholder="Enter job title, company, location"
              className="appearance-none p-[12px] pl-[35px] rounded-[69px] border border-[#6945ED] focus-visible:ring-0 focus:border-[2px] focus:border-[#4E2FC0] placeholder:text-sm placeholder:text-[#A3A3A3]"
            />
            <div className="absolute left-[12px] top-1/2 transform -translate-y-1/2">
              <SearchIcon className="h-[18px] w-[18px]" />
            </div>
          </div>
          <CandidateSelection
            show={false}
            button={false}
            applicants={applicants}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
