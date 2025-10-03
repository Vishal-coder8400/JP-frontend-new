import { Fragment } from "react";
import {
  CallIcon,
  ClockIcon,
  DOBIcon,
  EmailIcon,
  LocationIcon,
} from "../../../utils/icon";
import {
  formatExperience,
  formatIndianNumber,
  formatToMonthYear,
  getDurationBetweenDates,
} from "../../../utils/commonFunctions";
import { useLocation } from "react-router-dom";
import ResumeViewer from "../../common/ResumeViewer";

const CandidateProfile = ({ applicantData }) => {
  const location = useLocation();
  return (
    <Fragment>
      <div className="min-h-screen w-full hidden self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 lg:inline-flex flex-col justify-start items-start gap-4">
        <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-center items-center gap-6">
          <div className="size-16 relative rounded-sm overflow-hidden">
            <img
              className="size-16 left-0 top-0 absolute object-cover overflow-hidden"
              src={applicantData?.data?.profilePicture}
              alt={applicantData?.data?.name}
            />
          </div>
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
            <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="inline-flex justify-start items-center gap-3">
                  <div className="justify-start text-neutral-900 text-lg font-normal leading-relaxed">
                    {applicantData?.data?.areaOfExpertise}
                  </div>
                </div>
                <div className="inline-flex justify-start items-center gap-7">
                  <div className="justify-start text-neutral-900 text-2xl font-medium leading-9">
                    {applicantData?.data?.name}
                  </div>
                  {applicantData?.data?.status === "active" ? (
                    <div className="px-1.5 py-0.5 bg-[#54C4131A] rounded-[3px] flex justify-start items-center gap-1 overflow-hidden">
                      <div className="justify-start text-[#54C413] text-xs font-medium leading-none">
                        Active
                      </div>
                    </div>
                  ) : (
                    <div className="px-1.5 py-0.5 bg-amber-600/10 rounded-[3px] flex justify-start items-center gap-1 overflow-hidden">
                      <div className="justify-start text-amber-600 text-xs font-medium leading-none">
                        Pending
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="self-stretch py-0.5 inline-flex justify-start items-center gap-6">
                <div className="flex justify-start items-center gap-1.5">
                  <div className="size-4 relative">
                    <LocationIcon className="h-full w-full" />
                  </div>
                  <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                    {applicantData?.data?.permanentAddress?.city}
                  </div>
                </div>
                <div className="size-0.5 bg-neutral-900/70 rounded-full" />
                <div className="flex justify-start items-center gap-1.5">
                  <div className="size-4 relative">
                    <ClockIcon className="h-full w-full" />
                  </div>
                  <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                    {formatExperience(
                      applicantData?.data?.totalExperience,
                      applicantData?.data?.totalExperienceInMonth
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {location.pathname.includes("corporate") && (
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
              <div className="self-stretch px-5 py-2.5 bg-black rounded-3xl outline-1 outline-offset-[-1px] outline-black inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-white text-sm font-medium capitalize">
                  Hold
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full self-stretch flex flex-col justify-start items-start gap-4 overflow-hidden">
          <div className="self-stretch inline-flex justify-start items-start gap-4">
            <div className="self-stretch px-6 py-4 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-center gap-4">
              <div className="min-w-[130px] flex flex-col justify-start items-start gap-4">
                <div className="justify-start text-zinc-500 text-sm font-normal leading-normal">
                  Location
                </div>
                <div className="justify-start text-gray-900 text-sm font-normal leading-normal">
                  {applicantData?.data?.currentAddress?.city}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-center items-center">
              <div className="min-w-[150px] flex flex-col justify-center items-start gap-4">
                <div className="justify-start text-zinc-500 text-sm font-normal leading-normal">
                  Current Employment
                </div>
                <div className="flex flex-col justify-start items-start gap-2.5">
                  <div className="justify-start text-gray-900 text-sm font-normal leading-normal">
                    {applicantData?.data?.experienceDetails[0]?.companyName}
                  </div>
                  <div className="justify-start text-neutral-900 text-sm font-normal leading-normal">
                    {applicantData?.data?.experienceDetails[0]
                      ?.employmentType || "N/A"}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex px-6 py-4 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 justify-start items-start gap-4 flex-col">
              <div className="inline-flex flex-col items-start gap-1.5">
                <div className="justify-start text-zinc-500 text-sm font-normal leading-normal">
                  Contact Information
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="inline-flex justify-start items-center gap-3">
                  <div className="flex justify-start items-center gap-2.5">
                    <CallIcon />
                  </div>
                  <div className="justify-start text-neutral-900 text-sm font-normal leading-normal">
                    {applicantData?.data?.phone?.countryCode}
                    {applicantData?.data?.phone?.number}
                  </div>
                </div>
                <div className="inline-flex justify-start items-center gap-3">
                  <div className="flex justify-start items-center gap-2.5">
                    <div className="size-3.5 relative overflow-hidden">
                      <EmailIcon />
                    </div>
                  </div>
                  <div className="justify-start text-neutral-900 text-sm font-normal leading-normal">
                    {applicantData?.data?.email}
                  </div>
                </div>
                {/* <div className="inline-flex justify-start items-center gap-3">
                  <div className="size-4 relative overflow-hidden">
                    <DOBIcon />
                  </div>
                  <div className="justify-start text-neutral-900 text-sm font-normal leading-normal">
                    {formatDate(applicantData?.data?.dob)}
                  </div>
                </div> */}
                <div className="inline-flex justify-start items-center gap-3">
                  <DOBIcon />
                  <div className="justify-start text-neutral-900 text-sm font-normal leading-normal">
                    {applicantData?.data?.gender}
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
                    {applicantData?.data?.summary}
                  </span>
                </div>
              </div>
              <div className="inline-flex justify-start items-start gap-4">
                <div className="px-5 py-2.5 rounded-3xl outline-1 outline-offset-[-1px] outline-black flex justify-start items-start gap-2.5">
                  <div className="justify-start text-black text-sm font-medium capitalize">
                    Current CTC:{" "}
                    {formatIndianNumber(applicantData?.data?.currentSalary)}
                  </div>
                </div>
                <div className="px-5 py-2.5 rounded-3xl outline-1 outline-offset-[-1px] outline-[#6945ED] flex justify-start items-start gap-2.5">
                  <div className="justify-start text-[#6945ED] text-sm font-medium capitalize">
                    Expected CTC:{" "}
                    {formatIndianNumber(applicantData?.data?.expectedSalary)}
                  </div>
                </div>
                <div className="px-5 py-2.5 rounded-3xl outline-1 outline-offset-[-1px] outline-black flex justify-start items-start gap-2.5">
                  <div className="justify-start text-black text-sm font-medium capitalize">
                    Notice Period: {applicantData?.data?.noticePeriod} Days
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                <div className="self-stretch justify-start text-neutral-900 text-base font-semibold leading-snug">
                  Work Experience
                </div>
                <div className="inline-flex justify-start items-start gap-5">
                  {applicantData?.data?.experienceDetails?.map((item, i) => (
                    <div
                      key={item._id}
                      className="p-3 rounded-lg outline-1 outline-offset-[-1px] outline-zinc-300 flex justify-start items-start gap-5 overflow-hidden"
                    >
                      <div className="inline-flex flex-col justify-start items-start gap-2.5">
                        <div className="justify-start text-neutral-900 text-base font-medium leading-tight">
                          {item?.employmentType || "N/A"}
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
                  {applicantData?.data?.education?.map((item, i) => (
                    <div
                      key={item._id}
                      className="p-3 rounded-lg outline-1 outline-offset-[-1px] outline-zinc-300 flex justify-start items-start gap-5 overflow-hidden"
                    >
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
                  {applicantData?.data?.skills?.map((item, i) => (
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
              <div className="bg-white space-y-6">
                {/* 🧾 Personal Info */}
                <div>
                  <h2 className="text-lg font-semibold mb-3">
                    Other Information
                  </h2>
                  <table className="w-full border border-gray-200 text-sm">
                    <tbody>
                      {applicantData?.data?.gender && (
                        <tr className="border-b">
                          <td className="p-2 font-medium">Gender</td>
                          <td className="p-2 capitalize">
                            {applicantData?.data?.gender}
                          </td>
                        </tr>
                      )}
                      {applicantData?.data?.currentWorkingStatus && (
                        <tr className="border-b">
                          <td className="p-2 font-medium">
                            Current Working Status
                          </td>
                          <td className="p-2 capitalize">
                            {applicantData?.data?.currentWorkingStatus}
                          </td>
                        </tr>
                      )}
                      {applicantData?.data?.totalExperience !== undefined &&
                        applicantData?.data?.totalExperienceInMonth !==
                          undefined && (
                          <tr className="border-b">
                            <td className="p-2 font-medium">
                              Total Experience
                            </td>
                            <td className="p-2">
                              {`${applicantData?.data?.totalExperience} Years ${applicantData?.data?.totalExperienceInMonth} Months`}
                            </td>
                          </tr>
                        )}
                      {applicantData?.data?.currentSalary !== undefined && (
                        <tr className="border-b">
                          <td className="p-2 font-medium">Current Salary</td>
                          <td className="p-2">
                            ₹
                            {applicantData?.data?.currentSalary.toLocaleString()}
                          </td>
                        </tr>
                      )}
                      {applicantData?.data?.expectedSalary !== undefined && (
                        <tr className="border-b">
                          <td className="p-2 font-medium">Expected Salary</td>
                          <td className="p-2">
                            ₹
                            {applicantData?.data?.expectedSalary.toLocaleString()}
                          </td>
                        </tr>
                      )}
                      {applicantData?.data?.noticePeriod !== undefined && (
                        <tr className="border-b">
                          <td className="p-2 font-medium">Notice Period</td>
                          <td className="p-2">{`${applicantData?.data?.noticePeriod} Days`}</td>
                        </tr>
                      )}
                      {applicantData?.data?.currentIndustry && (
                        <tr className="border-b">
                          <td className="p-2 font-medium">Current Industry</td>
                          <td className="p-2 capitalize">
                            {applicantData?.data?.currentIndustry}
                          </td>
                        </tr>
                      )}
                      {applicantData?.data?.currentAddress?.address && (
                        <tr className="border-b">
                          <td className="p-2 font-medium">Current Address</td>
                          <td className="p-2">
                            {`${applicantData?.data?.currentAddress.address}, ${applicantData?.data?.currentAddress.city}`}
                          </td>
                        </tr>
                      )}
                      {applicantData?.data?.permanentAddress?.address && (
                        <tr className="border-b">
                          <td className="p-2 font-medium">Permanent Address</td>
                          <td className="p-2">
                            {`${applicantData?.data?.permanentAddress.address}, ${applicantData?.data?.permanentAddress.city}`}
                          </td>
                        </tr>
                      )}
                      <tr className="border-b">
                        <td className="p-2 font-medium">Willing to Relocate</td>
                        <td className="p-2">
                          {applicantData?.data?.willingToRelocate
                            ? "Yes"
                            : "No"}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Willing to Travel</td>
                        <td className="p-2">
                          {applicantData?.data?.willingToTravel ? "Yes" : "No"}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">
                          Willing to Work 6 Days
                        </td>
                        <td className="p-2">
                          {applicantData?.data?.willingToWork6Days
                            ? "Yes"
                            : "No"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <ResumeViewer
                name={applicantData?.data?.name}
                fileUrl={applicantData?.data?.resume}
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
                  src={applicantData?.data?.profilePicture}
                  alt={applicantData?.data?.name}
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
                      {applicantData?.data?.areaOfExpertise}
                    </div>
                  </div>
                  <div className="inline-flex justify-start items-center gap-7">
                    <div className="justify-start text-neutral-900 text-xl font-medium leading-9">
                      {applicantData?.data?.name}
                    </div>
                    <div
                      className={`px-1.5 py-0.5 ${
                        applicantData?.data?.status === "active"
                          ? "bg-[#54C4131A]"
                          : "bg-amber-600/10"
                      } rounded-[3px] flex justify-start items-center gap-1 overflow-hidden`}
                    >
                      <div
                        className={`justify-start ${
                          applicantData?.data?.status === "active"
                            ? "text-[#54C413]"
                            : "text-amber-600"
                        } text-sm font-medium leading-none`}
                      >
                        {applicantData?.data?.status}
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
                      {applicantData?.data?.permanentAddress?.city}
                    </div>
                  </div>
                  <div className="w-0.5 h-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="flex justify-start items-center gap-1.5">
                    <div className="w-4 h-4 relative">
                      <ClockIcon className="h-full w-full" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      {formatExperience(
                        applicantData?.data?.totalExperience,
                        applicantData?.data?.totalExperienceInMonth
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
                    {applicantData?.data?.about}
                  </span>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-4">
                  <div className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-black inline-flex justify-start items-start gap-2.5">
                    <div className="justify-start text-black text-sm font-medium capitalize">
                      Current CTC:{" "}
                      {formatIndianNumber(applicantData?.data?.currentSalary)}
                    </div>
                  </div>
                  <div className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-violet-600 inline-flex justify-start items-start gap-2.5">
                    <div className="justify-start text-violet-600 text-sm font-medium capitalize">
                      Expected CTC:{" "}
                      {formatIndianNumber(applicantData?.data?.expectedSalary)}
                    </div>
                  </div>
                  <div className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-black inline-flex justify-start items-start gap-2.5">
                    <div className="justify-start text-black text-sm font-medium capitalize">
                      Notice Period: {applicantData?.data?.noticePeriod} Days
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                  <div className="self-stretch justify-start text-neutral-900 text-[15px] font-semibold leading-snug">
                    Work Experience
                  </div>
                  <div className="self-stretch flex flex-col justify-start items-start gap-5">
                    {applicantData?.data?.experienceDetails?.map((item, i) => (
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
                    {applicantData?.data?.education?.map((item, i) => (
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
                    {applicantData?.data?.skills?.map((item, i) => (
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
