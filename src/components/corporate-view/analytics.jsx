import { Link } from "react-router-dom";

const Analytics = () => {
  return (
    <div className="w-full inline-flex flex-col justify-start items-start gap-6 overflow-hidden">
      <div className="self-stretch flex flex-col justify-start items-start gap-8">
        <div className="self-stretch flex flex-col justify-start items-start gap-7">
          <div className="self-stretch justify-start text-gray-900 text-3xl font-bold leading-loose">
            Job & Training Postings
          </div>
        </div>
      </div>
      <div className="size- inline-flex justify-start items-center gap-5">
        <div className="w-28 p-3 bg-violet-600 rounded-[69px] flex justify-center items-center gap-6 overflow-hidden">
          <div className="justify-center text-white text-base font-normal leading-snug">
            Analytics
          </div>
        </div>
        <Link
          to={"/corporate/job-posting/listing"}
          className="w-28 p-3 bg-white rounded-[69px] outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-center items-center gap-6 overflow-hidden"
        >
          <div className="justify-center text-neutral-400 text-base font-normal leading-snug">
            Listings
          </div>
        </Link>
      </div>
      <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4 overflow-hidden">
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
            Job Post Performance
          </div>
          <div className="justify-start text-zinc-500 text-xs font-medium leading-tight">
            View All
          </div>
        </div>
        <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
        <div className="self-stretch h-10 pl-3 pr-24 py-3 bg-white rounded-[69px] outline-1 outline-offset-[-1px] outline-violet-600 inline-flex justify-start items-center gap-6 overflow-hidden">
          <div className="size-4 relative overflow-hidden">
            <div className="size-3 left-[2.25px] top-[2.25px] absolute outline outline-2 outline-offset-[-1px] outline-stone-300" />
            <div className="size-[3.26px] left-[12.49px] top-[12.49px] absolute outline outline-2 outline-offset-[-1px] outline-stone-300" />
          </div>
          <div className="justify-center text-neutral-400 text-xs font-normal leading-3">
            Find posted job by name
          </div>
        </div>
        <div className="self-stretch rounded-lg outline outline-1 outline-zinc-300 inline-flex justify-start items-start">
          <div className="flex-1 bg-Neutral-200 inline-flex flex-col justify-start items-start gap-px">
            <div
              data-checkbox="false"
              data-column-locked="Off"
              data-filter-applied="Off"
              data-sort="Off"
              data-state="Default"
              className="self-stretch h-12 px-4 py-3 bg-Surface-Default inline-flex justify-start items-center gap-2"
            >
              <div className="flex-1 justify-start text-Text-Primary text-xs font-semibold leading-none">
                Job Title
              </div>
            </div>
            <div
              data-checkbox="true"
              data-drop-down="true"
              data-state="Default"
              data-sub-text="true"
              data-type="Default"
              className="self-stretch h-14 px-4 py-5 bg-Surface-Default inline-flex justify-start items-center gap-2"
            >
              <div className="flex-1 justify-start text-Text-Secondary text-sm font-normal leading-tight">
                UX Designer
              </div>
            </div>
            <div
              data-checkbox="true"
              data-drop-down="true"
              data-state="Default"
              data-sub-text="true"
              data-type="Default"
              className="self-stretch h-14 px-4 py-5 bg-Surface-Default inline-flex justify-start items-center gap-2"
            >
              <div className="flex-1 justify-start text-Text-Secondary text-sm font-normal leading-tight">
                Software Engineer
              </div>
            </div>
            <div
              data-checkbox="true"
              data-drop-down="true"
              data-state="Default"
              data-sub-text="true"
              data-type="Default"
              className="self-stretch h-14 px-4 py-5 bg-Surface-Default inline-flex justify-start items-center gap-2"
            >
              <div className="flex-1 justify-start text-Text-Secondary text-sm font-normal leading-tight">
                Software Engineer
              </div>
            </div>
            <div
              data-checkbox="true"
              data-drop-down="true"
              data-state="Default"
              data-sub-text="true"
              data-type="Default"
              className="self-stretch h-14 px-4 py-5 bg-Surface-Default inline-flex justify-start items-center gap-2"
            >
              <div className="flex-1 justify-start text-Text-Secondary text-sm font-normal leading-tight">
                UX Designer
              </div>
            </div>
          </div>
          <div className="flex-1 bg-Neutral-200 inline-flex flex-col justify-start items-start gap-px">
            <div className="self-stretch h-12 px-4 py-3 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="flex-1 justify-start text-Text-Primary text-xs font-semibold leading-none">
                Applications Received
              </div>
            </div>
            <div className="self-stretch h-14 px-4 py-3 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="flex-1 justify-start text-Text-Secondary text-sm font-normal leading-tight">
                120
              </div>
            </div>
            <div className="self-stretch h-14 px-4 py-3 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="flex-1 justify-start text-Text-Secondary text-sm font-normal leading-tight">
                134
              </div>
            </div>
            <div className="self-stretch h-14 px-4 py-3 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="flex-1 justify-start text-Text-Secondary text-sm font-normal leading-tight">
                243
              </div>
            </div>
            <div className="self-stretch h-14 px-4 py-3 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="flex-1 justify-start text-Text-Secondary text-sm font-normal leading-tight">
                324
              </div>
            </div>
          </div>
          <div className="flex-1 bg-Neutral-200 inline-flex flex-col justify-start items-start gap-px">
            <div
              data-checkbox="false"
              data-column-locked="Off"
              data-filter-applied="Off"
              data-sort="Off"
              data-state="Default"
              className="self-stretch h-12 px-4 py-3 bg-Surface-Default inline-flex justify-start items-center gap-2"
            >
              <div className="flex-1 justify-start text-Text-Primary text-xs font-semibold leading-none">
                Shortlisted
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                56
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                43
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                40
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                40
              </div>
            </div>
          </div>
          <div className="flex-1 bg-Neutral-200 inline-flex flex-col justify-start items-start gap-px">
            <div className="self-stretch h-12 px-4 py-3 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="flex-1 justify-start text-Text-Primary text-xs font-semibold leading-none">
                Interviews Scheduled
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                24
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                24
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                24
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                24
              </div>
            </div>
          </div>
          <div className="flex-1 bg-Neutral-200 inline-flex flex-col justify-start items-start gap-px">
            <div
              data-checkbox="false"
              data-column-locked="Off"
              data-filter-applied="Off"
              data-sort="Off"
              data-state="Default"
              className="self-stretch h-12 px-4 py-3 bg-Surface-Default inline-flex justify-start items-center gap-2"
            >
              <div className="flex-1 justify-start text-Text-Primary text-xs font-semibold leading-none">
                Hires Made
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                2
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                3
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                1
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                2
              </div>
            </div>
          </div>
          <div className="w-24 bg-Neutral-200 rounded-lg inline-flex flex-col justify-start items-start gap-px">
            <div className="self-stretch h-12 px-4 py-3 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="flex-1 justify-start text-Text-Primary text-xs font-semibold leading-none">
                Status
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-center items-start gap-2">
              <div className="size- px-2 py-1 bg-lime-600/10 rounded-[3px] flex justify-start items-center gap-1 overflow-hidden">
                <div className="justify-start text-lime-600 text-xs font-medium leading-none">
                  Open
                </div>
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-center items-start gap-2">
              <div className="size- px-2 py-1 bg-red-600/10 rounded-[3px] flex justify-start items-center gap-1 overflow-hidden">
                <div className="justify-start text-red-600 text-xs font-medium leading-none">
                  Closed
                </div>
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-center items-start gap-2">
              <div className="size- px-2 py-1 bg-lime-600/10 rounded-[3px] flex justify-start items-center gap-1 overflow-hidden">
                <div className="justify-start text-lime-600 text-xs font-medium leading-none">
                  Open
                </div>
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-center items-start gap-2">
              <div className="size- px-2 py-1 bg-lime-600/10 rounded-[3px] flex justify-start items-center gap-1 overflow-hidden">
                <div className="justify-start text-lime-600 text-xs font-medium leading-none">
                  Open
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4 overflow-hidden">
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
            Training
          </div>
          <div className="justify-start text-zinc-500 text-xs font-medium leading-tight">
            View All
          </div>
        </div>
        <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
        <div className="self-stretch h-10 pl-3 pr-24 py-3 bg-white rounded-[69px] outline outline-1 outline-offset-[-1px] outline-violet-600 inline-flex justify-start items-center gap-6 overflow-hidden">
          <div className="size-4 relative overflow-hidden">
            <div className="size-3 left-[2.25px] top-[2.25px] absolute outline outline-2 outline-offset-[-1px] outline-stone-300" />
            <div className="size-[3.26px] left-[12.49px] top-[12.49px] absolute outline outline-2 outline-offset-[-1px] outline-stone-300" />
          </div>
          <div className="justify-center text-neutral-400 text-xs font-normal leading-3">
            Find posted Training by name
          </div>
        </div>
        <div className="self-stretch rounded-lg outline outline-1 outline-zinc-300 inline-flex justify-start items-start">
          <div className="flex-1 bg-Neutral-200 inline-flex flex-col justify-start items-start gap-px">
            <div
              data-checkbox="false"
              data-column-locked="Off"
              data-filter-applied="Off"
              data-sort="Off"
              data-state="Default"
              className="self-stretch h-12 px-4 py-3 bg-Surface-Default inline-flex justify-start items-center gap-2"
            >
              <div className="flex-1 justify-start text-Text-Primary text-xs font-semibold leading-none">
                Training Title
              </div>
            </div>
            <div
              data-checkbox="true"
              data-drop-down="true"
              data-state="Default"
              data-sub-text="true"
              data-type="Default"
              className="self-stretch h-14 px-4 py-5 bg-Surface-Default inline-flex justify-start items-center gap-2"
            >
              <div className="flex-1 justify-start text-Text-Secondary text-sm font-normal leading-tight">
                UX Designer
              </div>
            </div>
            <div
              data-checkbox="true"
              data-drop-down="true"
              data-state="Default"
              data-sub-text="true"
              data-type="Default"
              className="self-stretch h-14 px-4 py-5 bg-Surface-Default inline-flex justify-start items-center gap-2"
            >
              <div className="flex-1 justify-start text-Text-Secondary text-sm font-normal leading-tight">
                Software Engineer
              </div>
            </div>
            <div
              data-checkbox="true"
              data-drop-down="true"
              data-state="Default"
              data-sub-text="true"
              data-type="Default"
              className="self-stretch h-14 px-4 py-5 bg-Surface-Default inline-flex justify-start items-center gap-2"
            >
              <div className="flex-1 justify-start text-Text-Secondary text-sm font-normal leading-tight">
                Software Engineer
              </div>
            </div>
            <div
              data-checkbox="true"
              data-drop-down="true"
              data-state="Default"
              data-sub-text="true"
              data-type="Default"
              className="self-stretch h-14 px-4 py-5 bg-Surface-Default inline-flex justify-start items-center gap-2"
            >
              <div className="flex-1 justify-start text-Text-Secondary text-sm font-normal leading-tight">
                UX Designer
              </div>
            </div>
          </div>
          <div className="flex-1 bg-Neutral-200 inline-flex flex-col justify-start items-start gap-px">
            <div className="self-stretch h-12 px-4 py-3 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="flex-1 justify-start text-Text-Primary text-xs font-semibold leading-none">
                Applications Received
              </div>
            </div>
            <div className="self-stretch h-14 px-4 py-3 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="flex-1 justify-start text-Text-Secondary text-sm font-normal leading-tight">
                120
              </div>
            </div>
            <div className="self-stretch h-14 px-4 py-3 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="flex-1 justify-start text-Text-Secondary text-sm font-normal leading-tight">
                134
              </div>
            </div>
            <div className="self-stretch h-14 px-4 py-3 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="flex-1 justify-start text-Text-Secondary text-sm font-normal leading-tight">
                243
              </div>
            </div>
            <div className="self-stretch h-14 px-4 py-3 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="flex-1 justify-start text-Text-Secondary text-sm font-normal leading-tight">
                324
              </div>
            </div>
          </div>
          <div className="flex-1 bg-Neutral-200 inline-flex flex-col justify-start items-start gap-px">
            <div
              data-checkbox="false"
              data-column-locked="Off"
              data-filter-applied="Off"
              data-sort="Off"
              data-state="Default"
              className="self-stretch h-12 px-4 py-3 bg-Surface-Default inline-flex justify-start items-center gap-2"
            >
              <div className="flex-1 justify-start text-Text-Primary text-xs font-semibold leading-none">
                Shortlisted
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                56
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                43
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                40
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                40
              </div>
            </div>
          </div>
          <div className="flex-1 bg-Neutral-200 inline-flex flex-col justify-start items-start gap-px">
            <div className="self-stretch h-12 px-4 py-3 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="flex-1 justify-start text-Text-Primary text-xs font-semibold leading-none">
                Interviews   Scheduled
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                24
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                24
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                24
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                24
              </div>
            </div>
          </div>
          <div className="flex-1 bg-Neutral-200 inline-flex flex-col justify-start items-start gap-px">
            <div
              data-checkbox="false"
              data-column-locked="Off"
              data-filter-applied="Off"
              data-sort="Off"
              data-state="Default"
              className="self-stretch h-12 px-4 py-3 bg-Surface-Default inline-flex justify-start items-center gap-2"
            >
              <div className="flex-1 justify-start text-Text-Primary text-xs font-semibold leading-none">
                Hires Made
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                2
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                3
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                1
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-sm font-normal leading-tight">
                2
              </div>
            </div>
          </div>
          <div className="w-24 bg-Neutral-200 rounded-lg inline-flex flex-col justify-start items-start gap-px">
            <div className="self-stretch h-12 px-4 py-3 bg-Surface-Default inline-flex justify-start items-center gap-2">
              <div className="flex-1 justify-start text-Text-Primary text-xs font-semibold leading-none">
                Status
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-center items-start gap-2">
              <div className="size- px-2 py-1 bg-lime-600/10 rounded-[3px] flex justify-start items-center gap-1 overflow-hidden">
                <div className="justify-start text-lime-600 text-xs font-medium leading-none">
                  Open
                </div>
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-center items-start gap-2">
              <div className="size- px-2 py-1 bg-red-600/10 rounded-[3px] flex justify-start items-center gap-1 overflow-hidden">
                <div className="justify-start text-red-600 text-xs font-medium leading-none">
                  Closed
                </div>
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-center items-start gap-2">
              <div className="size- px-2 py-1 bg-lime-600/10 rounded-[3px] flex justify-start items-center gap-1 overflow-hidden">
                <div className="justify-start text-lime-600 text-xs font-medium leading-none">
                  Open
                </div>
              </div>
            </div>
            <div className="self-stretch h-14 p-4 bg-Surface-Default inline-flex justify-center items-start gap-2">
              <div className="size- px-2 py-1 bg-lime-600/10 rounded-[3px] flex justify-start items-center gap-1 overflow-hidden">
                <div className="justify-start text-lime-600 text-xs font-medium leading-none">
                  Open
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
