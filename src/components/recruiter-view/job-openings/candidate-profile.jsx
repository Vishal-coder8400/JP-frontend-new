import { Fragment } from "react";
import { ClockIcon, LocationIcon } from "../../../utils/icon";
import useJobSeekerProfileStore from "../../../stores/useJobSeekerProfileStore";
import {
  formatIndianNumber,
  formatToMonthYear,
  getDurationBetweenDates,
} from "../../../utils/objectUtils";

const CandidateProfile = () => {
  const { jobSeekerProfile } = useJobSeekerProfileStore();
  return (
    <Fragment>
      <div className="hidden w-full min-h-screen self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 lg:inline-flex flex-col justify-start items-start gap-4">
        <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
          <div className="w-16 h-16 relative rounded overflow-hidden">
            <img
              className="w-16 h-16 left-0 top-0 absolute object-cover"
              src={jobSeekerProfile?.profilePicture}
              alt={jobSeekerProfile?.name}
            />
          </div>
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
            <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="inline-flex justify-start items-center gap-3">
                  <div className="justify-start text-neutral-900 text-md2 font-normal leading-relaxed">
                    {jobSeekerProfile?.areaOfExpertise}
                  </div>
                </div>
                <div className="inline-flex justify-start items-center gap-7">
                  <div className="justify-start text-neutral-900 text-2xl font-medium leading-9">
                    {jobSeekerProfile?.name}
                  </div>
                  <div
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
                      }  text-xs font-medium leading-none`}
                    >
                      {jobSeekerProfile?.status}
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch py-0.5 inline-flex justify-start items-center gap-6">
                <div className="flex justify-start items-center gap-1.5">
                  <div className="w-4 h-4 relative">
                    <div className="w-2.5 h-px left-[3px] top-[14px] absolute bg-neutral-900/70" />
                    <div className="w-[5px] h-[5px] left-[5.50px] top-[4px] absolute bg-neutral-900/70" />
                    <div className="w-2.5 h-3.5 left-[2.50px] top-[1px] absolute bg-neutral-900/70" />
                  </div>
                  <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                    Brussels
                  </div>
                </div>
                <div className="w-0.5 h-0.5 bg-neutral-900/70 rounded-full" />
                <div className="flex justify-start items-center gap-1.5">
                  <div className="w-4 h-4 relative">
                    <div className="w-3 h-3 left-[1.50px] top-[1.50px] absolute bg-neutral-900/70" />
                    <div className="w-1 h-1 left-[7.50px] top-[4px] absolute bg-neutral-900/70" />
                  </div>
                  <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                    {(jobSeekerProfile?.totalExperience > 0 ||
                      jobSeekerProfile?.totalExperienceInMonth > 0) && (
                      <>
                        {jobSeekerProfile?.totalExperience > 0 &&
                          `${jobSeekerProfile?.totalExperience} years `}
                        {jobSeekerProfile?.totalExperienceInMonth > 0 &&
                          `${jobSeekerProfile?.totalExperienceInMonth} months`}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
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
        <div className="self-stretch flex flex-col justify-start items-start gap-4 overflow-hidden">
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
            <div className="flex-1 inline-flex flex-col justify-center items-start gap-8">
              <div className="self-stretch justify-start">
                <span class="text-neutral-900 text-base font-semibold leading-snug">
                  Summary
                  <br />
                </span>
                <span class="text-neutral-900 text-base font-normal leading-snug">
                  {jobSeekerProfile?.about}
                </span>
              </div>
              <div className="inline-flex justify-start items-start gap-4">
                <div className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-black flex justify-start items-start gap-2.5">
                  <div className="justify-start text-black text-sm font-medium capitalize">
                    Current CTC:{" "}
                    {formatIndianNumber(jobSeekerProfile?.currentSalary)}
                  </div>
                </div>
                <div className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-violet-600 flex justify-start items-start gap-2.5">
                  <div className="justify-start text-violet-600 text-sm font-medium capitalize">
                    Expected CTC:{" "}
                    {formatIndianNumber(jobSeekerProfile?.expectedSalary)}
                  </div>
                </div>
                <div className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-black flex justify-start items-start gap-2.5">
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
                      className="p-3 rounded-lg outline outline-offset-[-1px] outline-zinc-300 flex justify-start items-start gap-5 overflow-hidden"
                    >
                      <img
                        className="w-8 h-8 relative rounded"
                        src="https://placehold.co/32x32"
                      />
                      <div className="inline-flex flex-col justify-start items-start gap-2.5">
                        <div className="justify-start text-neutral-900 text-base font-medium leading-tight">
                          Business Development Intern
                        </div>
                        <div className="justify-start text-neutral-900 text-sm font-normal leading-none">
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
                <div className="inline-flex justify-start items-start gap-5">
                  {jobSeekerProfile?.education?.map((item, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg outline outline-offset-[-1px] outline-zinc-300 flex justify-start items-start gap-5 overflow-hidden"
                    >
                      <img
                        className="w-8 h-8 relative rounded"
                        src="https://placehold.co/32x32"
                      />
                      <div className="inline-flex flex-col justify-start items-start gap-2.5">
                        <div className="justify-start text-neutral-900 text-base font-medium leading-tight">
                          {item?.degree}
                        </div>
                        <div className="justify-start text-neutral-900 text-sm font-normal leading-none">
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
      <div className="lg:hidden w-full p-6 h-dvh overflow-y-auto bg-white inline-flex flex-col justify-start items-start gap-6">
        <div className="self-stretch p-6  rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
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
                    <div className="justify-start text-neutral-900 text-lg font-normal leading-relaxed">
                      {jobSeekerProfile?.areaOfExpertise}
                    </div>
                  </div>
                  <div className="inline-flex justify-start items-center gap-7">
                    <div className="justify-start text-neutral-900 text-2xl font-medium leading-9">
                      {jobSeekerProfile?.name}
                    </div>
                    <div
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
                        } text-md font-medium leading-none`}
                      >
                        {jobSeekerProfile?.status}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch py-0.5 inline-flex justify-start items-center gap-6">
                  <div className="flex justify-start items-center gap-1.5">
                    <div className="w-4 h-4 relative">
                      <LocationIcon className="h-full w-full" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      Brussels
                    </div>
                  </div>
                  <div className="w-0.5 h-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="flex justify-start items-center gap-1.5">
                    <div className="w-4 h-4 relative">
                      <ClockIcon className="h-full w-full" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      {(jobSeekerProfile?.totalExperience > 0 ||
                        jobSeekerProfile?.totalExperienceInMonth > 0) && (
                        <>
                          {jobSeekerProfile?.totalExperience > 0 &&
                            `${jobSeekerProfile?.totalExperience} years `}
                          {jobSeekerProfile?.totalExperienceInMonth > 0 &&
                            `${jobSeekerProfile?.totalExperienceInMonth} months`}
                        </>
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
                  <span class="text-neutral-900 text-base font-semibold leading-snug">
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
                  <div className="self-stretch justify-start text-neutral-900 text-base font-semibold leading-snug">
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
                          <div className="justify-start text-neutral-900 text-md font-medium leading-none">
                            Business Development Intern
                          </div>
                          <div className="justify-start text-neutral-900 text-sm font-normal leading-none">
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
                          <div className="self-stretch justify-start text-neutral-900 text-base font-medium leading-tight">
                            {item?.degree}
                          </div>
                          <div className="justify-start text-neutral-900 text-sm font-normal leading-none">
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
