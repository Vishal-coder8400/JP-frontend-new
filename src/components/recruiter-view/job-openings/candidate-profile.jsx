import { Fragment } from "react";
import {
  CallIcon,
  ClockIcon,
  DOBIcon,
  EmailIcon,
  LocationIcon,
} from "../../../utils/icon";
import useJobSeekerProfileStore from "../../../stores/useJobSeekerProfileStore";
import {
  formatDate,
  formatExperience,
  formatIndianNumber,
  formatToMonthYear,
  getDurationBetweenDates,
} from "../../../utils/commonFunctions";
import { useLocation } from "react-router-dom";
import ResumeViewer from "../../common/ResumeViewer";

const CandidateProfile = () => {
  const { jobSeekerProfile } = useJobSeekerProfileStore();
  const location = useLocation();
  return (
    <Fragment>
      <div className="min-h-screen w-full hidden self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 lg:inline-flex flex-col justify-start items-start gap-4">
        <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
          <div className="size-16 relative rounded-sm overflow-hidden">
            <img
              className="size-16 left-0 top-0 absolute object-cover overflow-hidden"
              src={jobSeekerProfile?.profilePicture}
              alt={jobSeekerProfile?.name}
            />
          </div>
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
            <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="inline-flex justify-start items-center gap-3">
                  <div className="justify-start text-neutral-900 text-lg font-normal leading-relaxed">
                    {jobSeekerProfile?.areaOfExpertise}
                  </div>
                </div>
                <div className="inline-flex justify-start items-center gap-7">
                  <div className="justify-start text-neutral-900 text-2xl font-medium leading-9">
                    {jobSeekerProfile?.name}
                  </div>
                  {/* <div className="px-1.5 py-0.5 bg-amber-600/10 rounded-[3px] flex justify-start items-center gap-1 overflow-hidden">
                    <div className="justify-start text-amber-600 text-xs font-medium leading-none">
                      Pending
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="self-stretch py-0.5 inline-flex justify-start items-center gap-6">
                <div className="flex justify-start items-center gap-1.5">
                  <div className="size-4 relative">
                    <LocationIcon className="h-full w-full" />
                  </div>
                  <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                    {jobSeekerProfile?.permanentAddress?.city}
                  </div>
                </div>
                <div className="size-0.5 bg-neutral-900/70 rounded-full" />
                <div className="flex justify-start items-center gap-1.5">
                  <div className="size-4 relative">
                    <ClockIcon className="h-full w-full" />
                  </div>
                  <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                    {formatExperience(
                      jobSeekerProfile?.totalExperience,
                      jobSeekerProfile?.totalExperienceInMonth
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!location.pathname.includes("corporate") ? (
            <div className="w-40 inline-flex flex-col justify-center items-start gap-2.5">
              <div className="self-stretch px-5 py-2.5 rounded-3xl outline-1 outline-offset-[-1px] outline-black inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-black text-sm font-medium capitalize">
                  Match to Job
                </div>
              </div>
              <div className="self-stretch px-5 py-2.5 bg-black rounded-3xl outline-1 outline-offset-[-1px] outline-black inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-white text-sm font-medium capitalize">
                  Send to Employer
                </div>
              </div>
            </div>
          ) : (
            <div className="w-40 inline-flex flex-col justify-center items-start gap-2.5">
              <div className="self-stretch px-5 py-2.5 bg-lime-600 rounded-3xl inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-white text-sm font-medium capitalize">
                  Request Interview
                </div>
              </div>
              <div className="self-stretch px-5 py-2.5 bg-rose-600 rounded-3xl inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-white text-sm font-medium capitalize">
                  Reject
                </div>
              </div>
              <div className="self-stretch px-5 py-2.5 bg-black rounded-3xl outline outline-1 outline-offset-[-1px] outline-black inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-white text-sm font-medium capitalize">
                  Hold
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-4 overflow-hidden">
          <div className="self-stretch inline-flex justify-start items-start gap-4">
            <div className="self-stretch px-6 py-4 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-center items-center gap-4">
              <div className="min-w-[130px] flex flex-col justify-center items-center gap-1.5">
                <div className="justify-center text-zinc-500 text-sm font-normal leading-normal">
                  Location
                </div>
                <div className="justify-start text-gray-900 text-sm font-normal leading-normal">
                  {jobSeekerProfile?.currentAddress?.city}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-center items-center gap-4">
              <div className="min-w-[150px] flex flex-col justify-center items-start gap-1.5">
                <div className="justify-start text-zinc-500 text-sm font-normal leading-normal">
                  Current Employment
                </div>
                <div className="justify-start text-gray-900 text-sm font-normal leading-normal">
                  Product Designer
                </div>
                <div className=" inline-flex justify-start items-center gap-3">
                  <img
                    className="size-6 rounded-sm"
                    src="https://placehold.co/24x24"
                  />
                  <div className="justify-start text-neutral-900 text-sm font-normal leading-normal">
                    Uber India
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 px-6 py-4 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 flex justify-start items-center gap-4">
              <div className="inline-flex flex-col justify-center items-start gap-1.5">
                <div className="justify-start text-zinc-500 text-sm font-normal leading-normal">
                  Contact Information
                </div>
                <div className="inline-flex justify-start items-center gap-3">
                  <div className="flex justify-start items-center gap-2.5">
                    <CallIcon />
                  </div>
                  <div className="justify-start text-neutral-900 text-sm font-normal leading-normal">
                    {jobSeekerProfile?.phone?.countryCode}
                    {jobSeekerProfile?.phone?.number}
                  </div>
                </div>
                <div className="inline-flex justify-start items-center gap-3">
                  <div className="flex justify-start items-center gap-2.5">
                    <div className="size-3.5 relative overflow-hidden">
                      <EmailIcon />
                    </div>
                  </div>
                  <div className="justify-start text-neutral-900 text-sm font-normal leading-normal">
                    {jobSeekerProfile?.email}
                  </div>
                </div>
              </div>
              <div className="h-20 inline-flex flex-col justify-end items-start gap-1.5">
                <div className="inline-flex justify-start items-center gap-3">
                  <div className="size-4 relative overflow-hidden">
                    <DOBIcon />
                  </div>
                  <div className="justify-start text-neutral-900 text-sm font-normal leading-normal">
                    {formatDate(jobSeekerProfile?.dob)}
                  </div>
                </div>
                <div className="inline-flex justify-start items-center gap-3">
                  <img className="size-4" src="https://placehold.co/16x16" />
                  <div className="justify-start text-neutral-900 text-sm font-normal leading-normal">
                    {jobSeekerProfile?.gender}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
            <div className="flex-1 inline-flex flex-col justify-center items-start gap-8">
              <div className="self-stretch inline-flex justify-start items-start gap-8">
                <div className="flex-1 justify-start">
                  <span class="text-neutral-900 text-base font-semibold leading-snug">
                    Summary
                    <br />
                  </span>
                  <span class="text-neutral-900 text-base font-normal leading-snug">
                    {jobSeekerProfile?.about}
                  </span>
                </div>
              </div>
              <div className="inline-flex justify-start items-start gap-4">
                <div className="px-5 py-2.5 rounded-3xl outline-1 outline-offset-[-1px] outline-black flex justify-start items-start gap-2.5">
                  <div className="justify-start text-black text-sm font-medium capitalize">
                    Current CTC:{" "}
                    {formatIndianNumber(jobSeekerProfile?.currentSalary)}
                  </div>
                </div>
                <div className="px-5 py-2.5 rounded-3xl outline-1 outline-offset-[-1px] outline-[#6945ED] flex justify-start items-start gap-2.5">
                  <div className="justify-start text-[#6945ED] text-sm font-medium capitalize">
                    Expected CTC:{" "}
                    {formatIndianNumber(jobSeekerProfile?.expectedSalary)}
                  </div>
                </div>
                <div className="px-5 py-2.5 rounded-3xl outline-1 outline-offset-[-1px] outline-black flex justify-start items-start gap-2.5">
                  <div className="justify-start text-black text-sm font-medium capitalize">
                    Notice Period: {jobSeekerProfile?.noticePeriod} Days
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                <div className="self-stretch justify-start text-neutral-900 text-base font-semibold leading-snug">
                  Work Experience
                </div>
                <div className="inline-flex justify-start items-start gap-5">
                  {jobSeekerProfile?.experienceDetails?.map((item, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg outline-1 outline-offset-[-1px] outline-zinc-300 flex justify-start items-start gap-5 overflow-hidden"
                    >
                      <img
                        className="size-8 relative rounded-sm"
                        src="https://placehold.co/32x32"
                      />
                      <div className="inline-flex flex-col justify-start items-start gap-2.5">
                        <div className="justify-start text-neutral-900 text-base font-medium leading-tight">
                          Business Development Intern
                        </div>
                        <div className="justify-start text-neutral-900 text-sm font-normal leading-none">
                          {item?.companyName}
                        </div>
                        <div className="justify-start text-zinc-400 text-xs font-semibold leading-3">
                          {formatToMonthYear(item?.startDate)} -{" "}
                          {formatToMonthYear(item?.endDate)} ·{" "}
                          {getDurationBetweenDates(
                            item?.startDate,
                            item?.endDate
                          )}
                        </div>
                        <div className="justify-start text-zinc-400 text-xs font-semibold leading-3">
                          Chicago, USA
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                <div className="self-stretch justify-start text-neutral-900 text-base font-semibold leading-snug">
                  Education
                </div>
                <div className="inline-flex justify-start items-start gap-5">
                  {jobSeekerProfile?.education?.map((item, i) => (
                    <div className="p-3 rounded-lg outline-1 outline-offset-[-1px] outline-zinc-300 flex justify-start items-start gap-5 overflow-hidden">
                      <img
                        className="size-8 relative rounded-sm"
                        src="https://placehold.co/32x32"
                      />
                      <div className="inline-flex flex-col justify-start items-start gap-2.5">
                        <div className="justify-start text-neutral-900 text-base font-medium leading-tight">
                          {item.degree}
                        </div>
                        <div className="justify-start text-neutral-900 text-sm font-normal leading-none">
                          {item.institution}
                        </div>
                        <div className="justify-start text-zinc-400 text-xs font-semibold leading-3">
                          {formatToMonthYear(item?.startDate)} -{" "}
                          {formatToMonthYear(item?.endDate)} ·{" "}
                          {getDurationBetweenDates(
                            item?.startDate,
                            item?.endDate
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                <div className="self-stretch justify-start text-neutral-900 text-base font-semibold leading-snug">
                  Skills
                </div>
                <div className="self-stretch inline-flex justify-start items-start gap-3 flex-wrap content-start">
                  {jobSeekerProfile?.skills?.map((item, i) => (
                    <div
                      key={i}
                      className="px-5 py-2.5 rounded-3xl outline-1 outline-offset-[-1px] outline-neutral-500 flex justify-start items-start gap-2.5"
                    >
                      <div className="justify-start text-neutral-500 text-sm font-medium capitalize">
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <ResumeViewer
                name={jobSeekerProfile?.name}
                fileUrl={jobSeekerProfile?.resume}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden w-full p-6 h-dvh overflow-y-auto bg-white inline-flex flex-col justify-start items-start gap-6">
        <div className="self-stretch rounded-lg outline-zinc-300 flex flex-col justify-start items-start gap-4">
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-6">
            <div className="self-stretch inline-flex justify-between items-center gap-6">
              <div className="w-16 h-16 relative rounded overflow-hidden">
                <img
                  className="w-16 h-16 left-0 top-0 absolute object-cover"
                  src={jobSeekerProfile?.profilePicture}
                  alt={jobSeekerProfile?.name}
                />
              </div>
              <div className="w-40 inline-flex flex-col justify-center items-start gap-2.5">
                <div className="self-stretch px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-black inline-flex justify-center items-center gap-2.5">
                  <div className="justify-start text-black text-sm font-medium capitalize">
                    Match to Job
                  </div>
                </div>
                <div className="self-stretch px-5 py-2.5 bg-black rounded-3xl outline outline-offset-[-1px] outline-black inline-flex justify-center items-center gap-2.5">
                  <div className="justify-start text-white text-sm font-medium capitalize">
                    Send to Employer
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                <div className="flex flex-col justify-start items-start gap-1">
                  <div className="inline-flex justify-start items-center gap-3">
                    <div className="justify-start text-neutral-900 text-md2 font-normal leading-relaxed">
                      {jobSeekerProfile?.areaOfExpertise}
                    </div>
                  </div>
                  <div className="inline-flex justify-start items-center gap-7">
                    <div className="justify-start text-neutral-900 text-xl font-medium leading-9">
                      {jobSeekerProfile?.name}
                    </div>
                    {/* <div
                      className={`px-1.5 py-0.5 ${
                        jobSeekerProfile?.status === "active"
                          ? "bg-[#54C4131A]"
                          : "bg-amber-600/10"
                      } rounded-[3px] flex justify-start items-center gap-1 overflow-hidden`}
                    >
                      <div
                        className={`justify-start ${
                          jobSeekerProfile?.status === "active"
                            ? "text-[#54C413]"
                            : "text-amber-600"
                        } text-sm font-medium leading-none`}
                      >
                        {jobSeekerProfile?.status}
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="self-stretch py-0.5 inline-flex justify-start items-center gap-6">
                  <div className="flex justify-start items-center gap-1.5">
                    <div className="w-4 h-4 relative">
                      <LocationIcon className="h-full w-full" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      {jobSeekerProfile?.permanentAddress?.city}
                    </div>
                  </div>
                  <div className="w-0.5 h-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="flex justify-start items-center gap-1.5">
                    <div className="w-4 h-4 relative">
                      <ClockIcon className="h-full w-full" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      {formatExperience(
                        jobSeekerProfile?.totalExperience,
                        jobSeekerProfile?.totalExperienceInMonth
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-4 overflow-hidden">
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
              <div className="flex-1 inline-flex flex-col justify-center items-start gap-8">
                <div className="self-stretch justify-start">
                  <span class="text-neutral-900 text-[15px] font-semibold leading-snug">
                    Summary
                    <br />
                  </span>
                  <span class="text-neutral-900 text-base font-normal leading-snug">
                    {jobSeekerProfile?.about}
                  </span>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-4">
                  <div className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-black inline-flex justify-start items-start gap-2.5">
                    <div className="justify-start text-black text-sm font-medium capitalize">
                      Current CTC:{" "}
                      {formatIndianNumber(jobSeekerProfile?.currentSalary)}
                    </div>
                  </div>
                  <div className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-violet-600 inline-flex justify-start items-start gap-2.5">
                    <div className="justify-start text-violet-600 text-sm font-medium capitalize">
                      Expected CTC:{" "}
                      {formatIndianNumber(jobSeekerProfile?.expectedSalary)}
                    </div>
                  </div>
                  <div className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-black inline-flex justify-start items-start gap-2.5">
                    <div className="justify-start text-black text-sm font-medium capitalize">
                      Notice Period: {jobSeekerProfile?.noticePeriod} Days
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                  <div className="self-stretch justify-start text-neutral-900 text-[15px] font-semibold leading-snug">
                    Work Experience
                  </div>
                  <div className="self-stretch flex flex-col justify-start items-start gap-5">
                    {jobSeekerProfile?.experienceDetails?.map((item, i) => (
                      <div
                        key={i}
                        className="self-stretch p-3 rounded-lg outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-5 overflow-hidden"
                      >
                        <img
                          className="w-8 h-8 relative rounded"
                          src="https://placehold.co/32x32"
                        />
                        <div className="flex-1 inline-flex flex-col justify-start items-start gap-2.5">
                          <div className="justify-start text-neutral-900 text-sm font-medium leading-none">
                            Business Development Intern
                          </div>
                          <div className="justify-start text-neutral-900 text-base font-normal leading-none">
                            {item?.companyName}
                          </div>
                          <div className="justify-start text-zinc-400 text-sm font-semibold leading-3">
                            {formatToMonthYear(item?.startDate)} -{" "}
                            {formatToMonthYear(item?.endDate)} ·{" "}
                            {getDurationBetweenDates(
                              item?.startDate,
                              item?.endDate
                            )}
                          </div>
                          <div className="justify-start text-zinc-400 text-sm font-semibold leading-3">
                            Chicago, USA
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                  <div className="self-stretch justify-start text-neutral-900 text-base font-semibold leading-snug">
                    Education
                  </div>
                  <div className="self-stretch flex flex-col justify-start items-start gap-5">
                    {jobSeekerProfile?.education?.map((item, i) => (
                      <div
                        key={i}
                        className="self-stretch p-3 rounded-lg outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-5 overflow-hidden"
                      >
                        <img
                          className="w-8 h-8 relative rounded"
                          src="https://placehold.co/32x32"
                        />
                        <div className="inline-flex flex-col justify-start items-start gap-2.5">
                          <div className="self-stretch justify-start text-neutral-900 text-sm font-medium leading-tight">
                            {item?.degree}
                          </div>
                          <div className="justify-start text-neutral-900 text-base font-normal leading-none">
                            {item?.institution}
                          </div>
                          <div className="justify-start text-zinc-400 text-sm font-semibold leading-3">
                            {formatToMonthYear(item?.startDate)} -{" "}
                            {formatToMonthYear(item?.endDate)} ·{" "}
                            {getDurationBetweenDates(
                              item?.startDate,
                              item?.endDate
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                  <div className="self-stretch justify-start text-neutral-900 text-base font-semibold leading-snug">
                    Skills
                  </div>
                  <div className="self-stretch inline-flex justify-start items-start gap-3 flex-wrap content-start">
                    {jobSeekerProfile?.skills?.map((item, i) => (
                      <div
                        key={i}
                        className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-neutral-500 flex justify-start items-start gap-2.5"
                      >
                        <div className="justify-start text-neutral-500 text-sm font-medium capitalize">
                          {item}
                        </div>
                      </div>
                    ))}
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

export default CandidateProfile;
