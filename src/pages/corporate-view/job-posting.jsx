import React, { useState } from "react";
import CommonForm from "../../components/common/form";
import { jobController1, jobController2 } from "../../config";

const JobPosting = () => {
  const [formData, setFormData] = useState({});
  return (
    <div className="w-full self-stretch px-36 py-14 inline-flex flex-col justify-start items-start gap-7">
      <div className="w-full flex flex-col justify-start items-start gap-8">
        <div className="self-stretch flex flex-col justify-start items-start gap-7">
          <div className="self-stretch justify-start text-gray-900 text-3xl font-bold leading-loose">
            Post Trainings
          </div>
        </div>
      </div>
      <div className="w-full inline-flex justify-start items-start gap-7">
        <div className="size- p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-4">
          <div className="self-stretch inline-flex justify-start items-center gap-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M13.333 4.66675H2.66634C1.92996 4.66675 1.33301 5.2637 1.33301 6.00008V12.6667C1.33301 13.4031 1.92996 14.0001 2.66634 14.0001H13.333C14.0694 14.0001 14.6663 13.4031 14.6663 12.6667V6.00008C14.6663 5.2637 14.0694 4.66675 13.333 4.66675Z"
                stroke="#54C413"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.6663 14V3.33333C10.6663 2.97971 10.5259 2.64057 10.2758 2.39052C10.0258 2.14048 9.68663 2 9.33301 2H6.66634C6.31272 2 5.97358 2.14048 5.72353 2.39052C5.47348 2.64057 5.33301 2.97971 5.33301 3.33333V14"
                stroke="#54C413"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div className="justify-start">
              <span class="text-gray-900 text-sm font-semibold leading-tight">
                Job Posting <br />
              </span>
              <span class="text-gray-900 text-sm font-normal leading-tight">
                For hiring employees
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch inline-flex justify-start items-start gap-10">
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-10">
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
            <CommonForm
              formControls={jobController1}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </div>
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-10">
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
            <CommonForm
              formControls={jobController2}
              formData={formData}
              setFormData={setFormData}
            />
          </div>

          <div className="self-stretch flex flex-col justify-start items-end gap-2.5">
            <div className="w-64 px-5 py-2.5 bg-violet-600 rounded-3xl inline-flex justify-center items-center gap-2.5">
              <div className="justify-start text-white text-sm font-medium capitalize">
                Save & Update Profile
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPosting;
