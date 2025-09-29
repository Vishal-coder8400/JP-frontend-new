import { Fragment } from "react";
import { Button } from "../../ui/button";
import useJobPostStore from "../../../stores/useJobPostStore";
import {
  CalenderIcon,
  ClockIcon,
  CurrencyIcon,
  LocationIcon,
} from "../../../utils/icon";
import { formatSalaryRange, timeAgo } from "../../../utils/commonFunctions";
import { useLocation } from "react-router-dom";
import { useGetJobById } from "../../../hooks/recruiter/useJob";
import { useGetTrainningById } from "../../../hooks/recruiter/useTraining";

const JobDescription = ({ setOpen1 }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobType = queryParams.get("jobType");
  const { jobPost } = useJobPostStore();

  const { data: jobDetail } = useGetJobById(jobPost?._id, jobType);
  const { data: trainningDetails } = useGetTrainningById(jobPost?._id, jobType);

  const data = jobType === "job" ? jobDetail : trainningDetails;

  return (
    <Fragment>
      {/* desktop-view */}
      <div
        aria-labelledby="dialog-title"
        aria-describedby="dialog-desc"
        className="hidden p-6 w-full bg-white outline outline-offset-[-1px] outline-neutral-400 lg:inline-flex flex-col justify-start items-center overflow-hidden min-h-screen"
      >
        <div className="self-stretch flex-1 flex flex-col justify-start items-start gap-8">
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
            <img
              className="w-16 h-16 relative rounded object-cover overflow-hidden"
              src={data?.data?.company?.companyLogo}
              alt={data?.data?.company?.companyName}
            />
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                <div className="flex flex-col justify-start items-start gap-1">
                  <div className="inline-flex justify-start items-center gap-3">
                    <div className="justify-start text-neutral-900 text-md2 font-normal leading-relaxed">
                      {data?.data?.company?.companyName}
                    </div>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-3">
                    <div className="justify-start text-neutral-900 text-xl font-medium leading-9">
                      {data?.data?.jobTitle || data?.data?.title}
                    </div>
                    <div className="px-1.5 py-0.5 bg-[#7D5AE21A] rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                      <div className="justify-start text-[#7D5AE2] text-xs font-medium leading-none">
                        2 applied
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch py-0.5 inline-flex justify-start items-center gap-5 flex-wrap content-center">
                  <div className="flex justify-start items-center gap-1.5">
                    <div className="w-4 h-4 relative">
                      <LocationIcon className="h-full w-full" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      {data?.data?.city}, {data?.data?.state}
                    </div>
                  </div>
                  <div className="w-0.5 h-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="flex justify-start items-center gap-1.5">
                    <div className="w-4 h-4 relative">
                      <ClockIcon className="h-full w-full" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      {data?.data?.jobType || data?.data?.trainingMode}
                    </div>
                  </div>
                  <div className="w-0.5 h-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="flex justify-start items-center gap-1.5">
                    <div className="w-4 h-4 relative">
                      <CurrencyIcon className="h-full w-full" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      {formatSalaryRange(
                        data?.data?.salaryRange?.min,
                        data?.data?.salaryRange?.max
                      )}
                    </div>
                  </div>
                  <div className="w-0.5 h-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="flex justify-start items-center gap-1.5">
                    <div className="w-4 h-4 relative">
                      <CalenderIcon className="h-full w-full" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      {timeAgo(data?.data?.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {!location.pathname.includes("corporate") && (
              <Button
                onClick={() => {
                  setOpen1(true);
                }}
                className="cursor-pointer px-5 py-2.5 bg-gray-900 rounded-3xl flex justify-center items-center gap-2.5"
              >
                <div className="justify-start text-white text-base font-medium capitalize">
                  Apply For Candidate
                </div>
              </Button>
            )}
          </div>
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-8">
              <div className="self-stretch justify-start text-neutral-900 text-lg font-semibold leading-tight">
                About the job
              </div>
              <div className="self-stretch justify-start">
                <span className="text-neutral-900/70 text-base font-bold leading-normal">
                  Job description
                  <br />
                </span>
                <span className="text-neutral-900/70 text-base font-normal leading-normal">
                  <p>{data?.data?.jobDescription || data?.data?.description}</p>
                </span>
              </div>
              <div className="w-full inline-flex justify-start items-start gap-3 flex-wrap content-start">
                {(data?.data?.requiredSkills || data?.data?.skillDetails)?.map(
                  (item, i) => (
                    <div
                      key={i}
                      className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-neutral-500 flex justify-start items-start gap-2.5"
                    >
                      <div className="justify-start text-neutral-500 text-sm font-medium capitalize">
                        {item?.skillName}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-8">
              <div className="self-stretch justify-start text-neutral-900 text-lg font-semibold leading-tight">
                About the Company
              </div>
              <div className="self-stretch justify-start">
                <span className="text-neutral-900/70 text-base font-normal leading-normal">
                  Stimuler has helped over 3.5 Million people improve their
                  conversational skills using its Audio AI technology. Our AI
                  engines listen, provide detailed feedback on essential speech
                  metrics, and offer guided practice for improvement. Awarded
                  Google Play’s Best AI App and backed by some of the world’s
                  best VC funds, our app has impacted users from over 200
                  countries till date.
                  <br />
                </span>
                <span className="text-neutral-900/70 text-base font-bold leading-normal">
                  {" "}
                  Company Info:
                  <br />
                </span>
                <span className="text-neutral-900/70 text-base font-bold leading-normal">
                  Address:{" "}
                </span>
                <span className="text-neutral-900/70 text-base font-normal leading-normal">
                  Jayanagar, Bangalore, Karnataka, India
                </span>
              </div>
              <div className="self-stretch h-0 outline outline-2 outline-offset-[-1px] outline-stone-300" />
            </div>
          </div>
        </div>
      </div>
      {/* mobile-view */}
      <div className="lg:hidden h-[100dvh] overflow-y-auto bg-white w-full p-6 inline-flex flex-col justify-start items-start gap-6">
        <div className="self-stretch p-6  rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
          <img
            className="w-12 h-12 relative rounded object-cover overflow-hidden"
            src={data?.data?.company?.companyLogo}
            alt={data?.data?.company?.companyName}
          />
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
            <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-neutral-900 text-[15px] font-normal">
                  {data?.data?.company?.companyName}
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-3">
                  <div className="self-stretch justify-start text-neutral-900 text-lg font-medium">
                    {data?.data?.jobTitle || data?.data?.title}
                  </div>
                  <div className="px-1.5 py-0.5 bg-[#7D5AE21A] rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                    <div className="justify-start text-[#7D5AE2] text-xs font-medium leading-none">
                      2 applied
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch py-0.5 inline-flex justify-start items-center gap-5 flex-wrap content-center">
                <div className="flex justify-start items-center gap-1.5">
                  <div className="w-4 h-4 relative">
                    <LocationIcon className="h-full w-full" />
                  </div>
                  <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                    {data?.data?.city}, {data?.data?.state}
                  </div>
                </div>
                <div className="w-0.5 h-0.5 bg-neutral-900/70 rounded-full" />
                <div className="flex justify-start items-center gap-1.5">
                  <div className="w-4 h-4 relative">
                    <ClockIcon className="h-full w-full" />
                  </div>
                  <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                    {data?.data?.jobType || data?.data?.trainingMode}
                  </div>
                </div>
                <div className="w-0.5 h-0.5 bg-neutral-900/70 rounded-full" />
                <div className="flex justify-start items-center gap-1.5">
                  <div className="w-4 h-4 relative">
                    <CurrencyIcon className="h-full w-full" />
                  </div>
                  <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                    {formatSalaryRange(
                      data?.data?.salaryRange?.min,
                      data?.data?.salaryRange?.max
                    )}
                  </div>
                </div>
                <div className="w-0.5 h-0.5 bg-neutral-900/70 rounded-full" />
                <div className="flex justify-start items-center gap-1.5">
                  <div className="w-4 h-4 relative">
                    <CalenderIcon className="h-full w-full" />
                  </div>
                  <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                    {timeAgo(data?.data?.createdAt)}
                  </div>
                </div>
              </div>
            </div>
            {!location.pathname.includes("corporate") && (
              <Button
                onClick={() => setOpen1(true)}
                className="self-stretch px-5 py-2.5 bg-gray-900 rounded-3xl inline-flex justify-center items-center gap-2.5"
              >
                <div className="justify-start text-white text-sm font-medium capitalize">
                  Apply For Candidate
                </div>
              </Button>
            )}
          </div>
        </div>
        <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
            <div className="self-stretch justify-start text-neutral-900 text-lg font-semibold leading-tight">
              About the job
            </div>
            <div className="self-stretch justify-start">
              <span className="text-neutral-900/70 text-base font-bold leading-normal">
                Job description
                <br />
              </span>
              <span className="text-neutral-900/70 text-base font-normal leading-normal">
                <p>{data?.data?.jobDescription || data?.data?.description}</p>
              </span>
            </div>
            <div className="w-full self-stretch inline-flex justify-start items-start gap-3 flex-wrap content-start">
              {(data?.data?.requiredSkills || data?.data?.skillDetails)?.map(
                (item, i) => (
                  <div
                    key={i}
                    className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-neutral-500 flex justify-start items-start gap-2.5"
                  >
                    <div className="justify-start text-neutral-500 text-sm font-medium capitalize">
                      {item?.skillName}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-8">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
            <div className="self-stretch justify-start text-neutral-900 text-lg font-semibold leading-tight">
              About the Company
            </div>
            <div className="self-stretch justify-start">
              <span className="text-neutral-900/70 text-base font-normal leading-normal">
                Stimuler has helped over 3.5 Million people improve their
                conversational skills using its Audio AI technology. Our AI
                engines listen, provide detailed feedback on essential speech
                metrics, and offer guided practice for improvement. Awarded
                Google Play’s Best AI App and backed by some of the world’s best
                VC funds, our app has impacted users from over 200 countries
                till date.
                <br />
              </span>
              <span className="text-neutral-900/70 text-base font-bold leading-normal">
                {" "}
                Company Info:
                <br />
              </span>
              <span className="text-neutral-900/70 text-base font-bold leading-normal">
                Address:{" "}
              </span>
              <span className="text-neutral-900/70 text-base font-normal leading-normal">
                Jayanagar, Bangalore, Karnataka, India
              </span>
            </div>
            <div className="self-stretch h-0 outline outline-2 outline-offset-[-1px] outline-stone-300" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default JobDescription;
