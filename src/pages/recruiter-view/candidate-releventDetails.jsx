import React, { useState } from "react";
import CommonForm from "../../components/common/form";
import {
  releventCandidateProfessionalDetails,
  releventCandidateSalary,
} from "../../config";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Loader2 } from "lucide-react";
import { useCreateApplicant } from "../../hooks/useApplicant";

const CandidateReleventDetails = () => {
  const [formData, setFormData] = useState({
    noticePeriod: 30,
    totalExperience: 8,
    currentSalary: 1200000,
    expectedSalary: 1500000,
    roleLookingFor: "Senior Backend Engineer",
    areaOfExpertise: "Backend Development",
    functionalArea: "Engineering",
  });
  const { mutate, isPending } = useCreateApplicant();
  const onSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };
  return (
    <div className="self-stretch lg:px-36 lg:py-20 p-[20px] inline-flex flex-col justify-start items-end lg:gap-10 gap-[15px]">
      <div className="w-full inline-flex justify-start items-start gap-8">
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-7">
          <div className="self-stretch justify-start text-gray-900 lg:text-3xl text-lg font-bold leading-loose">
            Candidate's relevant work experience
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-10">
        <div className="self-stretch flex flex-col justify-start items-start gap-10">
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
            <div className="self-stretch inline-flex justify-start items-start gap-60">
              <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
                Professional Details
              </div>
            </div>
            <div className="w-full">
              <CommonForm
                formControls={releventCandidateProfessionalDetails}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          className="w-full self-stretch flex flex-col justify-start items-start gap-10"
        >
          <div className="w-full self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
            <div className="self-stretch inline-flex justify-start items-start gap-60">
              <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
                Preferences
              </div>
            </div>
            <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch inline-flex justify-start items-center gap-3">
                <div className="flex justify-start items-start gap-2.5">
                  <div className="justify-start text-gray-900 text-sm font-medium leading-normal">
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
                    formData.noticePeriod === 0
                      ? "outline-[#6945ED]"
                      : "outline-neutral-200"
                  }  flex justify-center items-center gap-2`}
                >
                  <div className="self-stretch flex justify-start items-start gap-2.5">
                    <div className="justify-start text-neutral-400 text-sm font-normal leading-normal">
                      Available Now
                    </div>
                  </div>
                  {formData.noticePeriod === 0 && (
                    <div className="w-2 h-2 bg-white rounded-full outline-4 outline-offset-[-2px] outline-[#6945ED]" />
                  )}
                </div>
                <div
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, noticePeriod: 15 }))
                  }
                  className={`max-sm:min-w-[150px] flex-1 h-11 px-4 py-2.5 bg-white rounded outline-1 ${
                    formData.noticePeriod === 15
                      ? "outline-[#6945ED]"
                      : "outline-neutral-200"
                  }  flex justify-center items-center gap-2`}
                >
                  <div className="self-stretch flex justify-start items-start gap-2.5">
                    <div className="justify-start text-neutral-400 text-sm font-normal leading-normal">
                      15 Days
                    </div>
                  </div>
                  {formData.noticePeriod === 15 && (
                    <div className="w-2 h-2 bg-white rounded-full outline-4 outline-offset-[-2px] outline-[#6945ED]" />
                  )}
                </div>
                <div
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, noticePeriod: 30 }))
                  }
                  className={`max-sm:min-w-[150px] flex-1 h-11 px-4 py-2.5 bg-white rounded outline-1 ${
                    formData.noticePeriod === 30
                      ? "outline-[#6945ED]"
                      : "outline-neutral-200"
                  }  flex justify-center items-center gap-2`}
                >
                  <div className="self-stretch flex justify-start items-start gap-2.5">
                    <div className="justify-start text-neutral-400 text-sm font-normal leading-normal">
                      30 Days
                    </div>
                  </div>
                  {formData.noticePeriod === 30 && (
                    <div className="w-2 h-2 bg-white rounded-full outline-4 outline-offset-[-2px] outline-[#6945ED]" />
                  )}
                </div>
                <div
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, noticePeriod: 45 }))
                  }
                  className={`max-sm:min-w-[150px] flex-1 h-11 px-4 py-2.5 bg-white rounded outline-1 ${
                    formData.noticePeriod === 45
                      ? "outline-[#6945ED]"
                      : "outline-neutral-200"
                  }  flex justify-center items-center gap-2`}
                >
                  <div className="self-stretch flex justify-start items-start gap-2.5">
                    <div className="justify-start text-neutral-400 text-sm font-normal leading-normal">
                      45 Days
                    </div>
                  </div>
                  {formData.noticePeriod === 45 && (
                    <div className="w-2 h-2 bg-white rounded-full outline-4 outline-offset-[-2px] outline-[#6945ED]" />
                  )}
                </div>
                <div className=" flex-1 h-11  bg-white rounded outline-1 outline-neutral-200 flex justify-center items-center gap-2">
                  <Input
                    placeholder="Enter Days"
                    value={formData.noticePeriod}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        noticePeriod: Number(e.target.value),
                      }))
                    }
                    type="number"
                    className="flex placeholder:translate-y-[1px] items-center justify-center text-black text-base focus:outline-none focus-visible:ring-0 focus:border-0 focus:border-black rounded-[4px]  py-[10px] px-[16px] placeholder:text-[#9B959F] h-full"
                  />
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
          </div>
          <div className="self-stretch flex flex-col justify-start items-end gap-10">
            <Button className="cursor-pointer w-36 px-5 py-2.5 bg-[#6945ED] rounded-3xl inline-flex justify-center items-center gap-2.5">
              <div className="justify-start text-white text-sm font-medium capitalize">
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin h-2 w-2" /> Please wait
                  </span>
                ) : (
                  "Continue"
                )}
              </div>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateReleventDetails;
