import { Fragment } from "react";
import {
  CalenderIcon,
  ClockIcon,
  CurrencyIcon,
  Fill,
  LocationIcon,
  RightArrow,
} from "../../../utils/icon";
import { Button } from "../../ui/button";
import {
  formatSalaryRange,
  isTodayOrFuture,
  timeAgo,
} from "../../../utils/commonFunctions";
import useJobPostStore from "../../../stores/useJobPostStore";
import { IndianRupee } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore";

const JobCard = ({ setOpen, item, setOpen1, setCandidateFilters }) => {
  const { setJobPost } = useJobPostStore();
  const { user } = useAuthStore();
  const location = useLocation();
  const isClickable = location.pathname.includes("corporate");
  // const handleParentClick = (e) => {
  //   setOpen1((prev) => !prev);
  //   setJobPost(item);
  // };
  const trainingPath = location.pathname.includes("training-listing");
  const handleJob = (e, job) => {
    e.preventDefault();
    e.stopPropagation();
    setJobPost(job);
    setOpen(true);
    setCandidateFilters((prev) => ({
      ...prev,
      excludeAppliedForJob: job?._id,
    }));
  };
  const cardContent = (
    <>
      {" "}
      <div className="flex flex-col gap-[12px]">
        <div className="flex flex-col gap-[4px]">
          <div className="flex items-center gap-[10px]">
            <div className="h-[24px] w-[24px] rounded-[4px] overflow-hidden">
              <img
                src={item?.companyDetails?.companyLogo}
                alt={item?.companyDetails?.companyName}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-[#141414] text-md">
              {item?.companyDetails?.companyName}
            </div>
          </div>
          <div className="text-[#141414] text-lg font-medium">
            {item?.jobTitle || item?.title}
          </div>
        </div>
        <div className="flex items-center gap-[24px]">
          <span className="text-[#7D5AE2] text-xs font-medium py-[2px] px-[6px] rounded-[3px] bg-custom-purple">
            2 Applied
          </span>
          <div className="flex flex-wrap items-center gap-[14px]">
            <div className="flex gap-[6px] items-center">
              <div className="flex items-center justify-center">
                <LocationIcon className="h-[16px] w-[16px]" />
              </div>
              <div className="text-[#141414] text-sm">{item?.city}</div>
            </div>
            <div className="flex gap-[6px] items-center">
              <div className="flex items-center justify-center">
                <ClockIcon className="h-[16px] w-[16px]" />
              </div>
              <div className="text-[#141414] text-sm">
                {item?.jobType || item?.trainingMode}
              </div>
            </div>
            <div className="flex gap-[6px] items-center">
              <div className="flex items-center justify-center">
                <CalenderIcon className="h-[16px] w-[16px]" />
              </div>
              <div className="text-[#141414] text-sm">
                {timeAgo(item?.createdAt)}
              </div>
            </div>{" "}
            <div className="flex gap-[6px] items-center">
              <div className="flex items-center justify-center">
                <IndianRupee
                  width={10}
                  height={10}
                  color="#141414"
                  strokeWidth={1.5}
                />
              </div>
              <div className="text-[#141414] text-sm">{item?.salaryRange}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[11px]">
        {item?.status === "active" ? (
          <div className="flex items-center justify-center gap-[13px] rounded-[8px] border border-[#54C413] px-[12px] py-[8px]">
            <span className="text-[#54C413] text-sm">Active</span>
            <span className="flex items-center justify-center">
              <Fill className="h-[10px] w-[10px]" />
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-center px-[12px] py-[9px] rounded-[8px] outline-1 outline-offset-[-1px] outline-stone-300">
            <div className="text-stone-300 text-sm leading-tight">Ended</div>
          </div>
        )}
        <Button
          onClick={(e) => handleJob(e, item)}
          className="cursor-pointer flex items-center justify-center gap-[4px] rounded-[8px] bg-[#6945ED] px-[12px] py-[8px]"
        >
          <div className="text-[#fff] text-sm">View Details</div>
          <div className="flex items-center justify-center">
            <RightArrow className="h-[16px] w-[16px]" />
          </div>
        </Button>
      </div>
    </>
  );
  return (
    <Fragment>
      {/* //desktop-view */}
      {isClickable ? (
        <Link
          to={
            trainingPath
              ? `/corporate/training-listing/${item?._id}`
              : `/corporate/job-posting/listing/${item?._id}`
          }
          // onClick={handleParentClick}
          className="cursor-pointer hidden lg:flex items-center justify-between rounded-[8px] p-[24px] border border-[#dadada] w-full"
        >
          {cardContent}
        </Link>
      ) : (
        <div className="hidden lg:flex items-center justify-between rounded-[8px] p-[24px] border border-[#dadada] w-full">
          {cardContent}
        </div>
      )}
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
                  {timeAgo(item?.createdAt)}
                </div>
              </div>
              {isTodayOrFuture(item?.applicationDeadline) ? (
                <div className="px-3 py-2 rounded-lg outline outline-offset-[-1px] outline-lime-600 flex justify-center items-center gap-3">
                  <div className="justify-start text-lime-600 text-base font-normal leading-none">
                    Active
                  </div>
                  <div className="w-2.5 h-2.5 bg-lime-600 rounded-full" />
                </div>
              ) : (
                <div className="flex items-center justify-center px-3 py-2 rounded-lg outline-1 outline-offset-[-1px] outline-stone-300">
                  <div className="text-stone-300 text-base leading-none">
                    Ended
                  </div>
                </div>
              )}
            </div>
            <div className="self-stretch flex flex-col justify-center items-start gap-3.5">
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="inline-flex justify-center items-center gap-2.5">
                  <img
                    className="w-4 h-4 relative rounded object-cover overflow-hidden"
                    src={item?.companyDetails?.companyLogo}
                    alt={item?.companyDetails?.companyName}
                  />
                  <div className="justify-start text-neutral-900 text-sm font-normal leading-none">
                    {item?.companyDetails?.companyName}
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-3">
                  <div className="justify-start text-neutral-900 text-md font-medium leading-none">
                    {item?.jobTitle || item?.title}
                  </div>
                  <div className="px-1.5 py-0.5 bg-violet-500/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                    <div className="justify-start text-[#6945ED] text-sm font-medium leading-none">
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
                  {item?.location}
                </div>
              </div>
              <div className="flex justify-start items-center gap-1.5">
                <ClockIcon className="h-[14px] w-[14px]" />
                <div className="justify-start text-neutral-900/70 text-sm font-normal leading-none">
                  {item?.jobType || item?.trainingMode}
                </div>
              </div>
              <div className="flex justify-start items-center gap-1.5">
                <IndianRupee
                  width={10}
                  height={10}
                  color="#141414"
                  strokeWidth={1.5}
                />
                <div className="justify-start text-neutral-900/70 text-sm font-normal leading-none">
                  {formatSalaryRange(
                    item?.salaryRange?.min,
                    item?.salaryRange?.max
                  )}
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={() => handleJob(item)}
            className="px-3 py-2 bg-[#6945ED] rounded-lg outline outline-offset-[-1px] outline-[#6945ED] inline-flex justify-center items-center gap-1"
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
