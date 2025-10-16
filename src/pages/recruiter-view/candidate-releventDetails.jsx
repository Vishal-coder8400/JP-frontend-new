import { useEffect, useState } from "react";
import CommonForm from "../../components/common/form";
import {
  releventCandidateProfessionalDetails,
  releventCandidateSalary,
  workingExperience,
} from "../../config";
import { Input } from "../../components/ui/input";
import { useUpdateApplicant } from "../../hooks/recruiter/useApplicant";
import { z } from "zod";
import { validateFormData } from "../../utils/commonFunctions";
import ButtonComponent from "../../components/common/button";
import PrevButton from "../../components/common/prevButton";
import { Checkbox } from "../../components/ui/checkbox";
import Navbar from "../../components/recruiter-view/navbar";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const experienceDetailSchema = z
  .object({
    companyName: z.string().min(1, "Company name is required"),

    employmentType: z.string().optional(),

    startDate: z
      .string()
      .min(1, "Start date is required")
      .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Start date must be in MM/YY format"),

    endDate: z
      .string()
      .optional()
      .refine((val) => !val || /^(0[1-9]|1[0-2])\/\d{2}$/.test(val), {
        message: "End date must be in MM/YY format",
      }),

    currentlyWorking: z.boolean().optional(),
  })
  // ✅ Rule 1: endDate is required if not currently working
  .superRefine((data, ctx) => {
    if (!data.currentlyWorking && !data.endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "End date is required when not currently working",
      });
    }

    // ✅ Rule 2: startDate must be <= endDate (if both exist)
    if (data.startDate && data.endDate) {
      const parseDate = (str) => {
        const [month, year] = str.split("/").map(Number);
        const fullYear = year >= 50 ? 1900 + year : 2000 + year;
        return new Date(fullYear, month - 1);
      };

      const start = parseDate(data.startDate);
      const end = parseDate(data.endDate);

      if (start > end) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["startDate"],
          message: "Start date must be before or equal to end date",
        });
      }
    }
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
  const [showPage, setShowPage] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    noticePeriod: 0,
    totalExperience: "0",
    totalExperienceInMonth: "0",
    currentSalary: 0,
    currentIndustry: "",
    expectedSalary: 0,
    variableCTC: 0,
    currentWorkingStatus: "",
    experienceDetails: [
      {
        companyName: "",
        designation: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
      },
    ],
    variableTick: false,
    acceptTerms: false,
  });
  const { mutate, isPending } = useUpdateApplicant();
  const onSubmit = (e) => {
    const id = localStorage.getItem("seekerID");
    e.preventDefault();
    const payload = {
      ...formData,
      totalExperience: Number(formData.totalExperience),
      totalExperienceInMonth: Number(formData.totalExperienceInMonth),
    };
    const isValid = validateFormData(formDataSchema, payload);
    if (!isValid) return;
    mutate({ id, data: payload });
    queryClient.invalidateQueries({ queryKey: ["applicants"] });
  };
  useEffect(() => {
    if (!localStorage.getItem("seekerID")) {
      return navigate("/recruiter/candidates/candidate-create");
    }
    return setShowPage(true);
  }, []);
  if (!showPage) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <Navbar onlySupport={false} />
      <div className="self-stretch lg:px-36 lg:py-0 p-[20px] inline-flex flex-col justify-start items-end lg:gap-10 gap-[15px]">
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
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
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
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch inline-flex justify-start items-center gap-3">
                    <div className="flex justify-start items-start gap-2.5">
                      <div className="justify-start text-gray-900 text-sm font-semibold leading-normal">
                        Current Working Status
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch inline-flex justify-start items-start gap-2">
                    <div
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          currentWorkingStatus: "working",
                          experienceDetails: prev.experienceDetails.map(
                            (item) => ({
                              ...item,
                              currentlyWorking: true,
                            })
                          ),
                        }))
                      }
                      className={`min-w-[100px] flex-1 px-4 py-2.5 bg-white rounded outline-2 outline-offset-[-1px] ${
                        formData.currentWorkingStatus === "working"
                          ? "outline-[#6945ED]"
                          : "outline-neutral-200"
                      } flex justify-between items-center gap-2 cursor-pointer min-h-[44px]`}
                    >
                      <span className="text-sm text-neutral-400 truncate whitespace-nowrap overflow-hidden max-w-[80%]">
                        Working
                      </span>

                      {formData.currentWorkingStatus === "working" && (
                        <div className="w-2 h-2 bg-white rounded-full outline-4 outline-offset-[-2px] outline-[#6945ED]" />
                      )}
                    </div>

                    <div
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          currentWorkingStatus: "serving-notice-period",
                          experienceDetails: prev.experienceDetails.map(
                            (item) => ({ ...item, currentlyWorking: true })
                          ),
                        }))
                      }
                      className={`min-w-[100px] flex-1 px-4 py-2.5 bg-white rounded outline-2 outline-offset-[-1px] ${
                        formData.currentWorkingStatus ===
                        "serving-notice-period"
                          ? "outline-[#6945ED]"
                          : "outline-neutral-200"
                      } flex justify-between items-center gap-2 cursor-pointer min-h-[44px]`}
                    >
                      <span className="text-sm text-neutral-400 truncate whitespace-nowrap overflow-hidden max-w-[80%]">
                        Serving Notice Period
                      </span>

                      {formData.currentWorkingStatus ===
                        "serving-notice-period" && (
                        <div className="w-2 h-2 bg-white rounded-full outline-4 outline-offset-[-2px] outline-[#6945ED]" />
                      )}
                    </div>

                    <div
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          currentWorkingStatus: "not-working",
                          experienceDetails: prev.experienceDetails.map(
                            (item) => ({ ...item, currentlyWorking: false })
                          ),
                        }))
                      }
                      className={`min-w-[100px] flex-1 px-4 py-2.5 bg-white rounded outline-2 outline-offset-[-1px] ${
                        formData.currentWorkingStatus === "not-working"
                          ? "outline-[#6945ED]"
                          : "outline-neutral-200"
                      } flex justify-between items-center gap-2 cursor-pointer min-h-[44px]`}
                    >
                      <span className="text-sm text-neutral-400 truncate whitespace-nowrap overflow-hidden max-w-[80%]">
                        Not working
                      </span>

                      {formData.currentWorkingStatus === "not-working" && (
                        <div className="w-2 h-2 bg-white rounded-full outline-4 outline-offset-[-2px] outline-[#6945ED]" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  {formData.experienceDetails.map((item, index) => (
                    <CommonForm
                      formControls={workingExperience}
                      formData={formData}
                      setFormData={setFormData}
                      key={index}
                      i={index}
                      formType={"experienceDetails"}
                      disabled={formData.currentWorkingStatus === "working"}
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
                    <div className="self-stretch flex justify-center items-center gap-2.5">
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
                    <div className="self-stretch flex justify-center items-center gap-2.5">
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
                    <div className="self-stretch flex justify-center items-center gap-2.5">
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
                    <div className="self-stretch flex justify-center items-center gap-2.5">
                      <div className="justify-start text-neutral-400 text-sm font-normal leading-normal">
                        45 Days
                      </div>
                    </div>
                    {formData.noticePeriod === 45 && (
                      <div className="w-2 h-2 bg-white rounded-full outline-4 outline-offset-[-2px] outline-[#6945ED]" />
                    )}
                  </div>
                  <div className="relative flex-1 h-11 bg-white rounded outline outline-neutral-200">
                    <Input
                      value={formData.noticePeriod}
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
                      variableTick: !formData.variableTick,
                      variableCTC: "",
                    }))
                  }
                  checked={formData.variableTick}
                  className="data-[state=checked]:text-white data-[state=checked]:bg-[#6945ED] h-[16px] w-[16px] rounded-[2px] flex items-center justify-center cursor-pointer"
                />
                <span className="text-xs font-medium">
                  Tick if CTC has variable
                </span>
              </div>
              <div
                className={`w-1/2 ${
                  formData.variableTick ? "block" : "hidden"
                }`}
              >
                <Input
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      variableCTC: e.target.value,
                    }))
                  }
                  value={formData.variableCTC}
                  type={"number"}
                  placeholder="Enter Variable CTC"
                  className="flex placeholder:translate-y-[1px] items-center justify-center text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[10px] px-[16px] placeholder:text-[#9B959F]"
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  onCheckedChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      acceptTerms: !formData.acceptTerms,
                    }))
                  }
                  checked={formData.acceptTerms}
                  className="data-[state=checked]:text-white data-[state=checked]:bg-[#6945ED] h-[16px] w-[16px] rounded-[2px] flex items-center justify-center cursor-pointer"
                />
                <span className="text-xs font-medium">
                  I accept the Terms & Conditions
                </span>
              </div>
            </div>
            <div className="self-stretch flex justify-end items-end gap-10">
              {/* <PrevButton link={"/recruiter/candidates/candidate-create"} /> */}
              <ButtonComponent
                type="submit"
                color={"#6945ED"}
                isPending={isPending}
                buttonText={"Continue"}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CandidateReleventDetails;
