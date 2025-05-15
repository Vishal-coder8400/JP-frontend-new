import React, { Fragment } from "react";
import HeroProfile from "../common/hero-profile";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Fragment>
      <div className="hidden lg:flex flex-col gap-[51px] w-full">
        <HeroProfile />

        <div className="self-stretch p-10 bg-white rounded-2xl shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] outline outline-offset-[-1px] outline-neutral-300 flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch inline-flex justify-start items-start gap-12">
            <div className="inline-flex flex-col justify-center items-start gap-3.5">
              <div className="justify-start text-gray-900 text-6xl font-semibold leading-[64px]">
                10%
              </div>
              <div className="w-28 opacity-70 justify-start text-gray-900 text-base font-semibold">
                Of your profile is complete
              </div>
            </div>
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
              <div className="self-stretch justify-start text-gray-900 text-lg font-semibold leading-tight">
                Complete your profile to post jobs!
              </div>
              <div className="self-stretch inline-flex justify-start items-start gap-2">
                <div className="flex-1 h-2 bg-lime-600 rounded-xl" />
                <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
                <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
                <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
                <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
                <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-12">
                <div className="flex-1 opacity-70 justify-start text-gray-900 text-base font-normal">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut.
                </div>
                <Link
                  to="/recruiter/profile-setup/sectoral-details"
                  data-color="Default"
                  data-icon-left="False"
                  data-icon-right="False"
                  data-size="Default"
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
        <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-6 overflow-hidden">
          <div className="self-stretch inline-flex justify-start items-start gap-[662px]">
            <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
              Reports & Insights
            </div>
          </div>
          <div className="self-stretch h-0 outline outline-offset-[-0.50px] outline-neutral-200"></div>
          <div className="self-stretch h-10 pl-3 pr-24 py-3 bg-white rounded-[69px] outline outline-offset-[-1px] outline-violet-600 inline-flex justify-start items-center gap-6 overflow-hidden">
            <div className="w-4 h-4 relative overflow-hidden">
              <div className="w-3 h-3 left-[2.25px] top-[2.25px] absolute outline outline-2 outline-offset-[-1px] outline-stone-300" />
              <div className="w-[3.26px] h-[3.26px] left-[12.49px] top-[12.49px] absolute outline outline-2 outline-offset-[-1px] outline-stone-300" />
            </div>
            <div className="justify-center text-neutral-400 text-md font-normal leading-3">
              Find candidates by name, skills, job title, location.
            </div>
          </div>
          <div className="self-stretch inline-flex justify-start items-start gap-7">
            <div className="p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-4">
              <div className="self-stretch inline-flex justify-start items-center gap-5">
                <div className="justify-start text-gray-900 text-sm font-semibold leading-none">
                  Total Candidates
                  <br />
                  Submitted
                </div>
                <div className="justify-start text-gray-900 text-3xl font-semibold leading-7">
                  120
                </div>
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-4">
              <div className="inline-flex justify-start items-center gap-5">
                <div className="justify-start text-gray-900 text-sm font-semibold leading-none">
                  Shortlisted by
                  <br />
                  Employers
                </div>
                <div className="justify-start text-gray-900 text-3xl font-semibold leading-7">
                  53
                </div>
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-4">
              <div className="self-stretch inline-flex justify-start items-center gap-5">
                <div className="justify-start text-gray-900 text-sm font-semibold leading-none">
                  Interviews
                  <br />
                  Scheduled
                </div>
                <div className="justify-start text-gray-900 text-3xl font-semibold leading-7">
                  120
                </div>
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-4">
              <div className="self-stretch inline-flex justify-start items-center gap-5">
                <div className="justify-start text-gray-900 text-sm font-semibold leading-none">
                  Hired Candidates
                </div>
                <div className="justify-start text-gray-900 text-3xl font-semibold leading-7">
                  120
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex justify-start items-start gap-6">
            <div className="w-[493px] inline-flex flex-col justify-start items-start gap-7">
              <div className="inline-flex justify-start items-start gap-60">
                <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
                  Top Hiring Companies
                </div>
              </div>
              <div className="w-[493px] rounded-lg outline outline-zinc-300 inline-flex justify-start items-start">
                <div className="flex-1 bg-zinc-300 inline-flex flex-col justify-start items-start gap-px">
                  <div
                    data-checkbox="false"
                    data-column-locked="Off"
                    data-filter-applied="Off"
                    data-sort="Off"
                    data-state="Default"
                    className="self-stretch h-12 px-4 py-3 bg-white inline-flex justify-start items-center gap-2"
                  >
                    <div className="flex-1 justify-start text-neutral-900 text-md font-semibold leading-none">
                      Company
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-4 py-3 bg-white inline-flex justify-start items-center gap-2">
                    <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                      ABC Tech
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-4 py-3 bg-white inline-flex justify-start items-center gap-2">
                    <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                      XYZ Corp
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-4 py-3 bg-white inline-flex justify-start items-center gap-2">
                    <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                      ABC Tech
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-4 py-3 bg-white inline-flex justify-start items-center gap-2">
                    <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                      Innovate Ltd
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-4 py-3 bg-white inline-flex justify-start items-center gap-2">
                    <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                      XYZ Corp
                    </div>
                  </div>
                  <div className="self-stretch h-14 px-4 py-3 bg-white inline-flex justify-start items-center gap-2">
                    <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                      Innovate Ltd
                    </div>
                  </div>
                </div>
                <div className="w-28 bg-zinc-300 inline-flex flex-col justify-start items-start gap-px">
                  <div className="self-stretch h-12 px-4 py-3 bg-white inline-flex justify-start items-center gap-2">
                    <div className="flex-1 justify-start text-neutral-900 text-md font-semibold leading-none">
                      Candidates
                      <br />
                      Submitted
                    </div>
                  </div>
                  <div
                    data-checkbox="true"
                    data-drop-down="true"
                    data-state="Default"
                    data-sub-text="true"
                    data-type="Default"
                    className="self-stretch h-14 px-4 py-5 bg-white inline-flex justify-start items-center gap-2"
                  >
                    <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                      32
                    </div>
                  </div>
                  <div
                    data-checkbox="true"
                    data-drop-down="true"
                    data-state="Default"
                    data-sub-text="true"
                    data-type="Default"
                    className="self-stretch h-14 px-4 py-5 bg-white inline-flex justify-start items-center gap-2"
                  >
                    <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                      21
                    </div>
                  </div>
                  <div
                    data-checkbox="true"
                    data-drop-down="true"
                    data-state="Default"
                    data-sub-text="true"
                    data-type="Default"
                    className="self-stretch h-14 px-4 py-5 bg-white inline-flex justify-start items-center gap-2"
                  >
                    <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                      18
                    </div>
                  </div>
                  <div
                    data-checkbox="true"
                    data-drop-down="true"
                    data-state="Default"
                    data-sub-text="true"
                    data-type="Default"
                    className="self-stretch h-14 px-4 py-5 bg-white inline-flex justify-start items-center gap-2"
                  >
                    <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                      14
                    </div>
                  </div>
                  <div
                    data-checkbox="true"
                    data-drop-down="true"
                    data-state="Default"
                    data-sub-text="true"
                    data-type="Default"
                    className="self-stretch h-14 px-4 py-5 bg-white inline-flex justify-start items-center gap-2"
                  >
                    <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                      14
                    </div>
                  </div>
                  <div
                    data-checkbox="true"
                    data-drop-down="true"
                    data-state="Default"
                    data-sub-text="true"
                    data-type="Default"
                    className="self-stretch h-14 px-4 py-5 bg-white inline-flex justify-start items-center gap-2"
                  >
                    <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                      13
                    </div>
                  </div>
                </div>
                <div className="w-24 bg-zinc-300 inline-flex flex-col justify-start items-start gap-px">
                  <div
                    data-checkbox="false"
                    data-column-locked="Off"
                    data-filter-applied="Off"
                    data-sort="Off"
                    data-state="Default"
                    className="self-stretch h-12 px-4 py-3 bg-white inline-flex justify-start items-center gap-2"
                  >
                    <div className="flex-1 justify-start text-neutral-900 text-md font-semibold leading-none">
                      Shortlisted
                    </div>
                  </div>
                  <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                    <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                      18
                    </div>
                  </div>
                  <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                    <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                      20
                    </div>
                  </div>
                  <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                    <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                      14
                    </div>
                  </div>
                  <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                    <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                      11
                    </div>
                  </div>
                  <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                    <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                      10
                    </div>
                  </div>
                  <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                    <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                      9
                    </div>
                  </div>
                </div>
                <div className="w-20 bg-zinc-300 inline-flex flex-col justify-start items-start gap-px">
                  <div
                    data-checkbox="false"
                    data-column-locked="Off"
                    data-filter-applied="Off"
                    data-sort="Off"
                    data-state="Default"
                    className="self-stretch h-12 px-4 py-3 bg-white inline-flex justify-start items-center gap-2"
                  >
                    <div className="flex-1 justify-start text-neutral-900 text-md font-semibold leading-none">
                      Hired
                    </div>
                  </div>
                  <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                    <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                      18
                    </div>
                  </div>
                  <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                    <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                      20
                    </div>
                  </div>
                  <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                    <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                      14
                    </div>
                  </div>
                  <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                    <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                      11
                    </div>
                  </div>
                  <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                    <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                      10
                    </div>
                  </div>
                  <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                    <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                      9
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden w-full p-6 inline-flex flex-col justify-start items-start gap-6">
        <HeroProfile />
        <div className="self-stretch p-7 bg-white rounded-2xl shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] outline outline-offset-[-1px] outline-neutral-300 flex flex-col justify-start items-end gap-4">
          <div className="self-stretch inline-flex justify-start items-start gap-3">
            <div className="inline-flex flex-col justify-center items-start gap-3.5">
              <div className="justify-start text-gray-900 text-5xl font-semibold leading-[48px]">
                10%
              </div>
              <div className="w-28 opacity-70 justify-start text-gray-900 text-md font-semibold">
                Of your profile is complete
              </div>
            </div>
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
              <div className="self-stretch justify-start text-gray-900 text-xl font-semibold leading-tight">
                Complete your profile to post jobs!
              </div>
            </div>
          </div>
          <div className="self-stretch inline-flex justify-start items-start gap-2">
            <div className="flex-1 h-2 bg-lime-600 rounded-xl" />
            <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
            <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
            <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
            <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
            <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
          </div>
          <div className="self-stretch opacity-70 justify-start text-gray-900 text-md font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
          </div>
          <Link
            to="/recruiter/profile-setup/sectoral-details"
            data-color="Default"
            data-icon-left="False"
            data-icon-right="False"
            data-size="Default"
            className="px-4 py-3.5 bg-neutral-800 rounded-md shadow-[0px_1px_4px_0px_rgba(25,33,61,0.08)] inline-flex justify-center items-center gap-[3px]"
          >
            <div className="text-center justify-start text-white text-md font-semibold leading-tight">
              Proceed to Complete
            </div>
          </Link>
        </div>
        <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4 overflow-hidden">
          <div className="self-stretch inline-flex justify-start items-start">
            <div className="flex-1 justify-start text-gray-900 text-xl font-semibold leading-tight">
              Reports & Insights
            </div>
            <div className="justify-start text-zinc-500 text-md font-medium leading-tight">
              View All
            </div>
          </div>
          <div className="self-stretch h-0 outline outline-offset-[-0.50px] outline-neutral-200"></div>
          <div className="self-stretch h-10 pl-3 pr-24 py-3 bg-white rounded-[69px] outline outline-offset-[-1px] outline-violet-600 inline-flex justify-start items-center gap-6 overflow-hidden">
            <div className="w-4 h-4 relative overflow-hidden">
              <div className="w-3 h-3 left-[2.25px] top-[2.25px] absolute outline outline-2 outline-offset-[-1px] outline-stone-300" />
              <div className="w-[3.26px] h-[3.26px] left-[12.49px] top-[12.49px] absolute outline outline-2 outline-offset-[-1px] outline-stone-300" />
            </div>
            <div className="justify-center text-neutral-400 text-md font-normal leading-3">
              Find candidates by name, skills, job title...
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
              <div className="self-stretch inline-flex justify-center items-center gap-5">
                <div className="justify-start text-gray-900 text-md font-semibold leading-3">
                  Total Candidates
                  <br />
                  Submitted
                </div>
                <div className="justify-start text-gray-900 text-3xl font-semibold leading-7">
                  120
                </div>
              </div>
            </div>
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
              <div className="self-stretch inline-flex justify-center items-center gap-5">
                <div className="justify-start text-gray-900 text-md font-semibold leading-3">
                  Hired Candidates
                </div>
                <div className="justify-start text-gray-900 text-3xl font-semibold leading-7">
                  120
                </div>
              </div>
            </div>
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 flex flex-col justify-center items-center gap-4">
              <div className="inline-flex justify-center items-center gap-5">
                <div className="justify-start text-gray-900 text-md font-semibold leading-3">
                  Shortlisted by
                  <br />
                  Employers
                </div>
                <div className="justify-start text-gray-900 text-3xl font-semibold leading-7">
                  53
                </div>
              </div>
            </div>
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
              <div className="self-stretch inline-flex justify-center items-center gap-5">
                <div className="justify-start text-gray-900 text-md font-semibold leading-3">
                  Interviews
                  <br />
                  Scheduled
                </div>
                <div className="justify-start text-gray-900 text-3xl font-semibold leading-7">
                  120
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-7">
            <div className="inline-flex justify-start items-start gap-60">
              <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
                Top Hiring Companies
              </div>
            </div>
            <div className="self-stretch rounded-lg outline outline-zinc-300 inline-flex justify-start items-start">
              <div className="flex-1 bg-zinc-300 inline-flex flex-col justify-start items-start gap-px">
                <div
                  data-checkbox="false"
                  data-column-locked="Off"
                  data-filter-applied="Off"
                  data-sort="Off"
                  data-state="Default"
                  className="self-stretch h-12 px-4 py-3 bg-white inline-flex justify-start items-center gap-2"
                >
                  <div className="flex-1 justify-start text-neutral-900 text-md font-semibold leading-none">
                    Company
                  </div>
                </div>
                <div className="self-stretch h-14 px-4 py-3 bg-white inline-flex justify-start items-center gap-2">
                  <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                    ABC Tech
                  </div>
                </div>
                <div className="self-stretch h-14 px-4 py-3 bg-white inline-flex justify-start items-center gap-2">
                  <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                    XYZ Corp
                  </div>
                </div>
                <div className="self-stretch h-14 px-4 py-3 bg-white inline-flex justify-start items-center gap-2">
                  <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                    ABC Tech
                  </div>
                </div>
                <div className="self-stretch h-14 px-4 py-3 bg-white inline-flex justify-start items-center gap-2">
                  <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                    Innovate Ltd
                  </div>
                </div>
                <div className="self-stretch h-14 px-4 py-3 bg-white inline-flex justify-start items-center gap-2">
                  <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                    XYZ Corp
                  </div>
                </div>
                <div className="self-stretch h-14 px-4 py-3 bg-white inline-flex justify-start items-center gap-2">
                  <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                    Innovate Ltd
                  </div>
                </div>
              </div>
              <div className="w-20 bg-zinc-300 inline-flex flex-col justify-start items-start gap-px">
                <div className="self-stretch h-12 px-4 py-3 bg-white inline-flex justify-start items-center gap-2">
                  <div className="flex-1 justify-start text-neutral-900 text-md font-semibold leading-none">
                    Candidates
                    <br />
                    Submitted
                  </div>
                </div>
                <div
                  data-checkbox="true"
                  data-drop-down="true"
                  data-state="Default"
                  data-sub-text="true"
                  data-type="Default"
                  className="self-stretch h-14 px-4 py-5 bg-white inline-flex justify-start items-center gap-2"
                >
                  <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                    32
                  </div>
                </div>
                <div
                  data-checkbox="true"
                  data-drop-down="true"
                  data-state="Default"
                  data-sub-text="true"
                  data-type="Default"
                  className="self-stretch h-14 px-4 py-5 bg-white inline-flex justify-start items-center gap-2"
                >
                  <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                    21
                  </div>
                </div>
                <div
                  data-checkbox="true"
                  data-drop-down="true"
                  data-state="Default"
                  data-sub-text="true"
                  data-type="Default"
                  className="self-stretch h-14 px-4 py-5 bg-white inline-flex justify-start items-center gap-2"
                >
                  <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                    18
                  </div>
                </div>
                <div
                  data-checkbox="true"
                  data-drop-down="true"
                  data-state="Default"
                  data-sub-text="true"
                  data-type="Default"
                  className="self-stretch h-14 px-4 py-5 bg-white inline-flex justify-start items-center gap-2"
                >
                  <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                    14
                  </div>
                </div>
                <div
                  data-checkbox="true"
                  data-drop-down="true"
                  data-state="Default"
                  data-sub-text="true"
                  data-type="Default"
                  className="self-stretch h-14 px-4 py-5 bg-white inline-flex justify-start items-center gap-2"
                >
                  <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                    14
                  </div>
                </div>
                <div
                  data-checkbox="true"
                  data-drop-down="true"
                  data-state="Default"
                  data-sub-text="true"
                  data-type="Default"
                  className="self-stretch h-14 px-4 py-5 bg-white inline-flex justify-start items-center gap-2"
                >
                  <div className="flex-1 justify-start text-neutral-700 text-sm font-normal leading-tight">
                    13
                  </div>
                </div>
              </div>
              <div className="w-16 bg-zinc-300 inline-flex flex-col justify-start items-start gap-px">
                <div className="self-stretch h-12 px-4 py-3 bg-white inline-flex justify-start items-center gap-2">
                  <div className="flex-1 justify-start text-neutral-900 text-md font-semibold leading-none">
                    Shortlisted
                  </div>
                </div>
                <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                  <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                    18
                  </div>
                </div>
                <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                  <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                    20
                  </div>
                </div>
                <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                  <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                    14
                  </div>
                </div>
                <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                  <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                    11
                  </div>
                </div>
                <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                  <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                    10
                  </div>
                </div>
                <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                  <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                    9
                  </div>
                </div>
              </div>
              <div className="w-12 bg-zinc-300 inline-flex flex-col justify-start items-start gap-px">
                <div className="self-stretch h-12 px-4 py-3 bg-white inline-flex justify-start items-center gap-2">
                  <div className="flex-1 justify-start text-neutral-900 text-md font-semibold leading-none">
                    Hired
                  </div>
                </div>
                <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                  <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                    18
                  </div>
                </div>
                <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                  <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                    20
                  </div>
                </div>
                <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                  <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                    14
                  </div>
                </div>
                <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                  <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                    11
                  </div>
                </div>
                <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                  <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                    10
                  </div>
                </div>
                <div className="self-stretch h-14 p-4 bg-white inline-flex justify-start items-center gap-2">
                  <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                    9
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
