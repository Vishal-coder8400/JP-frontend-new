import React, { useState } from "react";
import Navbar from "../../components/recruiter-view/navbar";
import CommonForm from "../../components/common/form";
import ButtonComponent from "../../components/common/button";
import {
  releventCandidateSalary,
  roleExpertiseFormControls,
  workExperienceFormControls,
} from "../../config";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { useJobseekerProfileProgress } from "../../hooks/job-seeker/useProfile";

const WorkingDetails = () => {
  const { data: profileProgress } = useJobseekerProfileProgress();
  const [formData, setFormData] = useState({});
  return (
    <div className="w-full self-stretch px-[20px] py-[20px] lg:px-36 lg:py-[0px] lg:pb-[32px] inline-flex flex-col justify-start items-start gap-[18px] lg:gap-7">
      <Navbar onlySupport={true} />
      <div className="w-full flex flex-col justify-start items-start gap-8">
        <div className="flex flex-col justify-start items-start gap-7">
          <div className="justify-start text-gray-900 text-md2 lg:text-3xl font-bold leading-loose">
            Add your relevant work experience
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-8">
        <div className="justify-start text-gray-900 text-base lg:text-xl font-bold leading-tight">
          Halfway through! You're {profileProgress?.data?.signupProgress}% done
        </div>
        <div className="self-stretch inline-flex justify-start items-start gap-2">
          {Array.from({
            length: profileProgress?.data?.totalStages,
          }).map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-2 ${
                profileProgress?.data?.completedStages.includes(index + 1)
                  ? "bg-lime-600"
                  : "bg-zinc-300"
              } rounded-xl`}
            />
          ))}
        </div>
      </div>
      <div className="w-full self-stretch flex flex-col justify-start items-start gap-10">
        <div className="self-stretch inline-flex justify-start items-start gap-2.5">
          <form
            // onSubmit={onSubmit}
            className="w-full inline-flex flex-col justify-start items-start gap-4"
          >
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
              <div className="self-stretch inline-flex justify-start items-start gap-60">
                <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
                  Professional Details
                </div>
              </div>
              <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
              <div className="w-full">
                <CommonForm
                  formControls={workExperienceFormControls}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            </div>
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
              <div className="self-stretch inline-flex justify-start items-start gap-60">
                <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
                  Preferences
                </div>
              </div>
              <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
              <div className="w-full">
                <CommonForm
                  formControls={roleExpertiseFormControls}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch inline-flex justify-start items-center gap-3">
                  <div className="flex justify-start items-start gap-2.5">
                    <div className="justify-start text-gray-900 text-sm font-semibold leading-normal">
                      Notice Period
                    </div>
                  </div>
                </div>
                <div className="self-stretch inline-flex flex-wrap justify-start items-start gap-2">
                  <div
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, noticePeriod: 0 }))
                    }
                    className={`max-sm:min-w-[150px] flex-1 h-11 px-4 py-2.5 bg-white rounded outline-1 ${
                      formData?.noticePeriod === 0
                        ? "outline-[#6945ED]"
                        : "outline-neutral-200"
                    }  flex justify-center items-center gap-2`}
                  >
                    <div className="self-stretch flex justify-center items-center gap-2.5">
                      <div className="justify-start text-neutral-400 text-sm font-normal leading-normal">
                        Available Now
                      </div>
                    </div>
                    {formData?.noticePeriod === 0 && (
                      <div className="w-2 h-2 bg-white rounded-full outline-4 outline-offset-[-2px] outline-[#6945ED]" />
                    )}
                  </div>
                  <div
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, noticePeriod: 15 }))
                    }
                    className={`max-sm:min-w-[150px] flex-1 h-11 px-4 py-2.5 bg-white rounded outline-1 ${
                      formData?.noticePeriod === 15
                        ? "outline-[#6945ED]"
                        : "outline-neutral-200"
                    }  flex justify-center items-center gap-2`}
                  >
                    <div className="self-stretch flex justify-center items-center gap-2.5">
                      <div className="justify-start text-neutral-400 text-sm font-normal leading-normal">
                        15 Days
                      </div>
                    </div>
                    {formData?.noticePeriod === 15 && (
                      <div className="w-2 h-2 bg-white rounded-full outline-4 outline-offset-[-2px] outline-[#6945ED]" />
                    )}
                  </div>
                  <div
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, noticePeriod: 30 }))
                    }
                    className={`max-sm:min-w-[150px] flex-1 h-11 px-4 py-2.5 bg-white rounded outline-1 ${
                      formData?.noticePeriod === 30
                        ? "outline-[#6945ED]"
                        : "outline-neutral-200"
                    }  flex justify-center items-center gap-2`}
                  >
                    <div className="self-stretch flex justify-center items-center gap-2.5">
                      <div className="justify-start text-neutral-400 text-sm font-normal leading-normal">
                        30 Days
                      </div>
                    </div>
                    {formData?.noticePeriod === 30 && (
                      <div className="w-2 h-2 bg-white rounded-full outline-4 outline-offset-[-2px] outline-[#6945ED]" />
                    )}
                  </div>
                  <div
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, noticePeriod: 45 }))
                    }
                    className={`max-sm:min-w-[150px] flex-1 h-11 px-4 py-2.5 bg-white rounded outline-1 ${
                      formData?.noticePeriod === 45
                        ? "outline-[#6945ED]"
                        : "outline-neutral-200"
                    }  flex justify-center items-center gap-2`}
                  >
                    <div className="self-stretch flex justify-center items-center gap-2.5">
                      <div className="justify-start text-neutral-400 text-sm font-normal leading-normal">
                        45 Days
                      </div>
                    </div>
                    {formData?.noticePeriod === 45 && (
                      <div className="w-2 h-2 bg-white rounded-full outline-4 outline-offset-[-2px] outline-[#6945ED]" />
                    )}
                  </div>
                  <div className="relative flex-1 h-11 bg-white rounded outline outline-neutral-200">
                    <Input
                      value={formData?.noticePeriod}
                      onChange={(e) => {
                        let inputVal = e.target.value;

                        if (inputVal === "") {
                          setFormData((prev) => ({
                            ...prev,
                            noticePeriod: 0,
                          }));
                          return;
                        }

                        if (!/^\d+$/.test(inputVal)) {
                          return;
                        }

                        if (inputVal.length > 1 && inputVal.startsWith("0")) {
                          inputVal = inputVal.replace(/^0+/, "");
                        }

                        const value = Math.min(Number(inputVal), 99);

                        setFormData((prev) => ({
                          ...prev,
                          noticePeriod: value,
                        }));
                      }}
                      className="w-full h-full pr-14 text-black text-base focus:outline-none focus-visible:ring-0 focus:border-0 rounded-[4px] py-[10px] px-[16px] placeholder:text-[#9B959F]"
                    />
                    <span className="absolute right-16 top-1/2 -translate-y-1/2 text-sm text-gray-600 pointer-events-none">
                      {formData?.noticePeriod <= 1 ? "day" : "days"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full self-stretch inline-flex justify-between items-center gap-4">
                <CommonForm
                  formControls={releventCandidateSalary}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  onCheckedChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      variable: !formData?.variable,
                    }))
                  }
                  checked={formData?.variable}
                  className="data-[state=checked]:text-white data-[state=checked]:bg-[#6945ED] h-[16px] w-[16px] rounded-[2px] flex items-center justify-center cursor-pointer"
                />
                <span className="text-xs font-medium">
                  Tick if CTC has variable
                </span>
              </div>
              <div
                className={`w-1/2 ${formData?.variable ? "block" : "hidden"}`}
              >
                <Input
                  placeholder="Enter Variable CTC"
                  className="flex placeholder:translate-y-[1px] items-center justify-center text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[10px] px-[16px] placeholder:text-[#9B959F]"
                />
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-end items-end gap-2.5">
              <ButtonComponent
                // isPending={isPending}
                color={"#6945ED"}
                buttonText={"Save & Update Profile"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkingDetails;
