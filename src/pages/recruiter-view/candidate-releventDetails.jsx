import { useState } from "react";
import CommonForm from "../../components/common/form";
import {
  releventCandidateProfessionalDetails,
  releventCandidateSalary,
  workingExperience,
} from "../../config";
import { Input } from "../../components/ui/input";
import { useCreateApplicant } from "../../hooks/recruiter/useApplicant";
import { z } from "zod";
import { validateFormData } from "../../utils/objectUtils";
import useJobSeekerProfileStore from "../../stores/useJobSeekerProfileStore";
import ButtonComponent from "../../components/common/button";

const experienceDetailSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  employmentType: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z
    .string()
    .min(1, "End date is required")
    .optional()
    .or(z.literal("")), // Allow empty string if currentlyWorking is true
  currentlyWorking: z.boolean().optional(),
});

const formDataSchema = z.object({
  noticePeriod: z
    .number()
    .min(0, "Notice period must be a non-negative number"),

  totalExperience: z
    .number()
    .min(0, "Total experience must be a non-negative number"),

  totalExperienceInMonth: z
    .number()
    .min(0, "Total experience in months must be non-negative"),

  currentSalary: z
    .number()
    .min(0, "Current salary must be a non-negative number"),

  expectedSalary: z
    .number()
    .min(0, "Expected salary must be a non-negative number"),

  currentIndustry: z.string().min(1, "Current Sector is required"),
  experienceDetails: z
    .array(experienceDetailSchema)
    .min(1, "At least one experience entry is required"),
});

const CandidateReleventDetails = () => {
  const { jobSeekerProfile } = useJobSeekerProfileStore();
  const [formData, setFormData] = useState({
    email: jobSeekerProfile?.email,
    password: jobSeekerProfile?.password,
    noticePeriod: 0,
    totalExperience: "0",
    totalExperienceInMonth: "0",
    currentSalary: 0,
    currentIndustry: "",
    expectedSalary: 0,
    experienceDetails: [
      {
        companyName: "",
        employmentType: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
      },
    ],
  });
  const { mutate, isPending } = useCreateApplicant();
  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      totalExperience: Number(formData.totalExperience),
      totalExperienceInMonth: Number(formData.totalExperienceInMonth),
    };
    const isValid = validateFormData(formDataSchema, payload);
    if (!isValid) return;
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
      <form
        onSubmit={onSubmit}
        className="w-full flex flex-col justify-start items-start gap-10"
      >
        <div className="self-stretch flex flex-col justify-start items-start gap-10">
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
            <div className="self-stretch inline-flex justify-start items-start gap-60">
              <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
                Professional Details
              </div>
            </div>
            <div className="w-full flex flex-col gap-[18px]">
              <CommonForm
                formControls={releventCandidateProfessionalDetails}
                formData={formData}
                setFormData={setFormData}
              />
              <div className="w-full">
                {formData.experienceDetails.map((item, index) => (
                  <CommonForm
                    formControls={workingExperience}
                    formData={formData}
                    setFormData={setFormData}
                    key={index}
                    i={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full self-stretch flex flex-col justify-start items-start gap-10">
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
            <ButtonComponent isPending={isPending} buttonText={"Continue"} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CandidateReleventDetails;
