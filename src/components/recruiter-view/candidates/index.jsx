import { Fragment } from "react";
import HeroProfile from "../common/hero-profile";
import CandidateSelection from "../job-openings/candidates-selection";
import { Link } from "react-router-dom";
import SearchComponent from "../../common/searchComponent";
import FilterComponent from "../../common/filterComponent";
import { CandidatesFilters } from "../../../config";

const Index = ({ applicants, formData, setFormData, setOpen2 }) => {
  return (
    <Fragment>
      <div className="w-full hidden lg:flex flex-col gap-[51px] justify-start items-start">
        <HeroProfile />
        <div className="w-full flex justify-between">
          <div className="w-[196px] flex flex-col gap-[23px]">
            <div className="text-lg text-[#171923] font-semibold">Filters</div>
            <div
              // onClick={ClearAll}
              className="text-[#3F93FF] text-base font-medium cursor-pointer"
            >
              Clear All
            </div>
            <FilterComponent
              formControls={CandidatesFilters}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          <div
            className="w-3/4 p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start
           gap-[18px] overflow-x-auto"
          >
            <div className="w-full flex items-center justify-between">
              <Link
                to="/recruiter/candidates/candidate-create"
                className="px-5 py-4 bg-gray-900 rounded-3xl gap-2.5"
              >
                <div className="justify-start text-white text-sm font-semibold leading-none">
                  Create Candidate
                </div>
              </Link>
            </div>
            <div className="self-stretch inline-flex justify-start items-center">
              <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
                Candidates Management
              </div>
            </div>
            <div className="self-stretch h-0 outline outline-offset-[-0.50px] outline-neutral-200"></div>
            <SearchComponent />
            {/* <div className="overflow-y-auto w-full"> */}
            <CandidateSelection
              show={false}
              button={false}
              applicants={applicants}
              setOpen2={setOpen2}
            />
            {/* </div> */}
          </div>
        </div>
      </div>
      <div className="w-full p-[24px] lg:hidden inline-flex flex-col justify-start items-start gap-6">
        <HeroProfile />
        <div className="w-full p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
          <div className="flex items-center justify-between w-full">
            <Link
              to="/recruiter/candidates/candidate-create"
              className="px-5 py-4 bg-gray-900 rounded-3xl inline-flex justify-center items-center gap-2.5"
            >
              <div className="justify-start text-white text-sm font-semibold leading-none">
                Create Candidate
              </div>
            </Link>
          </div>

          <div className="self-stretch inline-flex justify-start items-center">
            <div className="justify-start text-gray-900 text-lg font-semibold leading-tight">
              Candidates Management
            </div>
          </div>
          <div className="self-stretch h-0 outline outline-offset-[-0.50px] outline-neutral-200"></div>
          <SearchComponent />
          <CandidateSelection
            show={false}
            button={false}
            applicants={applicants}
            setOpen2={setOpen2}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
