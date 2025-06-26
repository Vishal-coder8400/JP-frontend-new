import { useState } from "react";
import CommonForm from "../../components/common/form";
import { trainingController1, trainingController2, trainingController3 } from "../../config";

const TrainningPosting = () => {
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
          <div className="self-stretch inline-flex justify-center items-center gap-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M14 10.6667V5.33335C13.9998 5.09953 13.938 4.86989 13.821 4.66746C13.704 4.46503 13.5358 4.29692 13.3333 4.18002L8.66667 1.51335C8.46397 1.39633 8.23405 1.33472 8 1.33472C7.76595 1.33472 7.53603 1.39633 7.33333 1.51335L2.66667 4.18002C2.46418 4.29692 2.29599 4.46503 2.17897 4.66746C2.06196 4.86989 2.00024 5.09953 2 5.33335V10.6667C2.00024 10.9005 2.06196 11.1301 2.17897 11.3326C2.29599 11.535 2.46418 11.7031 2.66667 11.82L7.33333 14.4867C7.53603 14.6037 7.76595 14.6653 8 14.6653C8.23405 14.6653 8.46397 14.6037 8.66667 14.4867L13.3333 11.82C13.5358 11.7031 13.704 11.535 13.821 11.3326C13.938 11.1301 13.9998 10.9005 14 10.6667Z"
                stroke="#D9790A"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.17969 4.63989L7.99969 8.00656L13.8197 4.63989"
                stroke="#D9790A"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 14.72V8"
                stroke="#D9790A"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div className="justify-start">
              <span class="text-gray-900 text-sm font-semibold leading-tight">
                Training Program <br />
              </span>
              <span class="text-gray-900 text-sm font-normal leading-tight">
                For internship, skill development, corporate training
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch inline-flex justify-start items-start gap-10">
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-10">
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
            <CommonForm
              formControls={trainingController1}
              formData={formData}
              setFormData={setFormData}
            />
            <CommonForm
              formControls={trainingController2}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </div>
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-10">
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
            <CommonForm
              formControls={trainingController3}
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

export default TrainningPosting;
