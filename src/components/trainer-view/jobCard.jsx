import { timeAgo } from "@/utils/commonFunctions";
import { CalenderIcon, ClockIcon, LocationIcon } from "@/utils/icon";
import { BookmarkIcon, IndianRupeeIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const JobCard = ({ item }) => {
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef(null);
  useEffect(() => {
    if (textRef.current) {
      const el = textRef.current;
      // check if text is actually clamped
      setIsClamped(el.scrollHeight > el.clientHeight);
    }
  }, [item.description]);
  return (
    <Link
      to={`/trainer/dashboard/${item._id}`}
      key={item._id}
      className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6"
    >
      <img
        className="size-16 relative rounded-sm object-cover"
        src={item.company.companyLogo}
        alt={item.company.companyName}
      />
      <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
        <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
          <div className="size- flex flex-col justify-start items-start gap-1">
            <div className="size- inline-flex justify-start items-center gap-3">
              <div className="justify-start text-neutral-900 text-lg font-normal leading-relaxed">
                {item.company.companyName}
              </div>
            </div>
            <div className="size- inline-flex justify-center items-center gap-3">
              <div className="justify-start text-neutral-900 text-2xl font-medium leading-9">
                {item.title}
              </div>
              <div className="size- px-1.5 py-0.5 bg-violet-500/10 rounded-[3px] flex justify-start items-center gap-1 overflow-hidden">
                <div className="justify-start text-violet-500 text-xs font-medium leading-none">
                  2 applied
                </div>
              </div>
            </div>
          </div>
          <div className="size- py-0.5 inline-flex justify-center items-center gap-6">
            <div className="size- flex justify-start items-center gap-1.5">
              <LocationIcon className="h-[16px] w-[16px]" />
              <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                Brussels
              </div>
            </div>
            <div className="size-0.5 bg-neutral-900/70 rounded-full" />
            <div className="size- flex justify-start items-center gap-1.5">
              <ClockIcon className="h-[16px] w-[16px]" />
              <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                Full time
              </div>
            </div>
            <div className="size-0.5 bg-neutral-900/70 rounded-full" />
            <div className="size- flex justify-start items-center gap-1.5">
              <IndianRupeeIcon className="h-[13px] w-[13px]" />
              <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                50-55k
              </div>
            </div>
            <div className="size-0.5 bg-neutral-900/70 rounded-full" />
            <div className="size- flex justify-start items-center gap-1.5">
              <CalenderIcon className="h-[16px] w-[16px]" />
              <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                {timeAgo(item.createdAt)}
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch text-neutral-900/70 text-base font-normal leading-normal">
          <p
            ref={textRef}
            className={`transition-all duration-300 line-clamp-2`}
          >
            {item.description}
          </p>

          {isClamped && (
            <span className="text-blue-600 mt-1 font-medium hover:underline">
              Read More
            </span>
          )}
        </div>
        <div className="size- px-5 py-2.5 bg-gray-900 rounded-3xl inline-flex justify-center items-center gap-2.5">
          <div className="justify-start text-white text-sm font-medium capitalize">
            Apply Now
          </div>
        </div>
      </div>
      <div className="size- pl-3.5 pr-5 py-2.5 rounded-3xl outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-center items-center gap-2.5">
        <BookmarkIcon className="h-4 w-4 text-neutral-400" />
        <div className="justify-start text-neutral-400 text-sm font-medium capitalize">
          Save
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
