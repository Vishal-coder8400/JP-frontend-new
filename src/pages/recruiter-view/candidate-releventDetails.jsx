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
  .superRefine((data, ctx) => {
    // ✅ Rule 1: End date required if not currently working
    if (!data.currentlyWorking && !data.endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "End date is required when not currently working",
      });
    }

    // ✅ Rule 2: Start date must be before or equal to end date (if both exist)
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

export const formDataSchema = z
  .object({
    noticePeriod: z
      .union([
        z.number().min(0, "Notice period must be a non-negative number"),
        z.null(),
      ])
      .optional(),
    totalExperience: z
      .number({ required_error: "Total experience is required" })
      .min(0, "Total experience must be a non-negative number"),
    totalExperienceInMonth: z
      .number({ required_error: "Total experience in months is required" })
      .min(0, "Total experience in months must be non-negative"),
    currentSalary: z
      .number({ required_error: "Current salary is required" })
      .min(0, "Current salary must be a non-negative number"),
    expectedSalary: z
      .number({ required_error: "Expected salary is required" })
      .min(0, "Expected salary must be a non-negative number"),
    currentIndustry: z.string().min(1, "Current Sector is required"),
    experienceDetails: z
      .array(experienceDetailSchema)
      .min(1, "At least one experience entry is required"),
  })
  .refine(
    (data) => Number(data.expectedSalary) > Number(data.currentSalary),
    {
      path: ["expectedSalary"],
      message: "Expected salary must be greater than current salary",
    }
  );

const CandidateReleventDetails = () => {
  const [showPage, setShowPage] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    noticePeriod: null,
    noticePeriodType: "preset", // Add this to track preset vs custom
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
    const { isValid } = validateFormData(formDataSchema, payload);
    if (!isValid) return;
    mutate({ id, data: payload });
    queryClient.invalidateQueries({ queryKey: ["applicants"] });
  };

const getFieldLabels = () => {
  const isCurrentlyWorking = ["working", "serving-notice-period"].includes(
    formData.currentWorkingStatus
  );
  
  return {
    companyLabel: isCurrentlyWorking ? "Current Organisation" : "Last Organisation",
    designationLabel: isCurrentlyWorking 
      ? "Designation in Current Organization" 
      : "Designation in Last Organisation",
  };
};

// Create a modified config based on current state
const workingExperienceWithDynamicLabels = workingExperience.map(item => {
  const labels = getFieldLabels();
  
  if (item.name === "companyName") {
    return {
      ...item,
      label: labels.companyLabel
    };
  }
  
  if (item.name === "designation") {
    return {
      ...item,
      label: labels.designationLabel
    };
  }
  
  return item;
});

  useEffect(() => {
    if (!localStorage.getItem("seekerID")) {
      return navigate("/recruiter/candidates/candidate-create");
    }
    return setShowPage(true);
  }, []);

  if (!showPage) {
    return <div>Loading....</div>;
  }

  // Function to handle notice period selection
  const handleNoticePeriodSelect = (value) => {
    setFormData((prev) => ({
      ...prev,
      noticePeriod: value,
      noticePeriodType: "preset" // Mark as preset selection
    }));
  };

  // Function to handle custom notice period input
  const handleCustomNoticePeriod = (value) => {
    setFormData((prev) => ({
      ...prev,
      noticePeriod: value,
      noticePeriodType: "custom" // Mark as custom input
    }));
  };

  // Determine if custom input should show the value
  const shouldShowCustomValue = formData.noticePeriodType === "custom" || 
    (formData.noticePeriodType === "preset" && 
     !["0", "15", "30", "45"].includes(String(formData.noticePeriod)));

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
                          : "outline-[#000]/30"
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
                          : "outline-[#000]/30"
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
                          noticePeriod: null,
                          noticePeriodType: "preset",
                          experienceDetails: prev.experienceDetails.map(
                            (item) => ({ ...item, currentlyWorking: false })
                          ),
                        }))
                      }
                      className={`min-w-[100px] flex-1 px-4 py-2.5 bg-white rounded outline-2 outline-offset-[-1px] ${
                        formData.currentWorkingStatus === "not-working"
                          ? "outline-[#6945ED]"
                          : "outline-[#000]/30"
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
                      formControls={workingExperienceWithDynamicLabels}
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
                  {/* Available Now */}
                  <button
                    onClick={() => handleNoticePeriodSelect(0)}
                    type="button"
                    disabled={formData?.currentWorkingStatus === "not-working"}
                    className={`max-sm:min-w-[150px] flex-1 h-11 px-4 py-2.5 bg-white rounded outline-1 ${
                      formData.noticePeriod === 0 && formData.noticePeriodType === "preset"
                        ? "outline-[#6945ED]"
                        : "outline-[#000]/30"
                    }  flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="self-stretch flex justify-center items-center gap-2.5">
                      <div className="justify-start text-neutral-400 text-sm font-normal leading-normal">
                        Available Now
                      </div>
                    </div>
                    {formData.noticePeriod === 0 && formData.noticePeriodType === "preset" && (
                      <div className="w-2 h-2 bg-white rounded-full outline-4 outline-offset-[-2px] outline-[#6945ED]" />
                    )}
                  </button>

                  {/* 15 Days */}
                  <button
                    onClick={() => handleNoticePeriodSelect(15)}
                    type="button"
                    disabled={formData?.currentWorkingStatus === "not-working"}
                    className={`max-sm:min-w-[150px] flex-1 h-11 px-4 py-2.5 bg-white rounded outline-1 ${
                      formData.noticePeriod === 15 && formData.noticePeriodType === "preset"
                        ? "outline-[#6945ED]"
                        : "outline-[#000]/30"
                    }  flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="self-stretch flex justify-center items-center gap-2.5">
                      <div className="justify-start text-neutral-400 text-sm font-normal leading-normal">
                        15 Days
                      </div>
                    </div>
                    {formData.noticePeriod === 15 && formData.noticePeriodType === "preset" && (
                      <div className="w-2 h-2 bg-white rounded-full outline-4 outline-offset-[-2px] outline-[#6945ED]" />
                    )}
                  </button>

                  {/* 30 Days */}
                  <button
                    onClick={() => handleNoticePeriodSelect(30)}
                    type="button"
                    disabled={formData?.currentWorkingStatus === "not-working"}
                    className={`max-sm:min-w-[150px] flex-1 h-11 px-4 py-2.5 bg-white rounded outline-1 ${
                      formData.noticePeriod === 30 && formData.noticePeriodType === "preset"
                        ? "outline-[#6945ED]"
                        : "outline-[#000]/30"
                    }  flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="self-stretch flex justify-center items-center gap-2.5">
                      <div className="justify-start text-neutral-400 text-sm font-normal leading-normal">
                        30 Days
                      </div>
                    </div>
                    {formData.noticePeriod === 30 && formData.noticePeriodType === "preset" && (
                      <div className="w-2 h-2 bg-white rounded-full outline-4 outline-offset-[-2px] outline-[#6945ED]" />
                    )}
                  </button>

                  {/* 45 Days */}
                  <button
                    onClick={() => handleNoticePeriodSelect(45)}
                    type="button"
                    disabled={formData?.currentWorkingStatus === "not-working"}
                    className={`max-sm:min-w-[150px] flex-1 h-11 px-4 py-2.5 bg-white rounded outline-1 ${
                      formData.noticePeriod === 45 && formData.noticePeriodType === "preset"
                        ? "outline-[#6945ED]"
                        : "outline-[#000]/30"
                    }  flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="self-stretch flex justify-center items-center gap-2.5">
                      <div className="justify-start text-neutral-400 text-sm font-normal leading-normal">
                        45 Days
                      </div>
                    </div>
                    {formData.noticePeriod === 45 && formData.noticePeriodType === "preset" && (
                      <div className="w-2 h-2 bg-white rounded-full outline-4 outline-offset-[-2px] outline-[#6945ED]" />
                    )}
                  </button>

                  {/* Custom Input */}
                  <div className="relative flex-1 h-11 bg-white rounded outline-1 outline-[#000]/30">
  <Input
    value={shouldShowCustomValue ? formData.noticePeriod || "" : ""}
    onChange={(e) => {
      let inputVal = e.target.value;
      if (inputVal === "") {
        handleCustomNoticePeriod(0);
        return;
      }
      if (!/^\d+$/.test(inputVal)) return;
      if (inputVal.length > 1 && inputVal.startsWith("0")) {
        inputVal = inputVal.replace(/^0+/, "");
      }
      const value = Math.min(Number(inputVal), 99);
      handleCustomNoticePeriod(value);
    }}
    onFocus={() => {
      if (formData.noticePeriodType !== "custom") {
        handleCustomNoticePeriod(formData.noticePeriod || "");
      }
    }}
    disabled={formData?.currentWorkingStatus === "not-working"}
    className="w-full h-full text-black text-base focus:outline-none focus-visible:ring-0 focus:border-0 rounded-[4px] py-[10px] px-[16px] placeholder:text-[#9B959F] disabled:opacity-50"
    placeholder="Custom days"
  />
  {/* JUST REMOVE THIS SPAN COMPLETELY */}
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
              
              {/* Tick if CTC has variable - Fixed Checkbox */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="variable-tick"
                  onCheckedChange={(checked) => {
                    setFormData((prev) => ({
                      ...prev,
                      variableTick: checked === true,
                      variableCTC: checked === true ? prev.variableCTC : 0,
                    }));
                  }}
                  checked={formData.variableTick}
                  className="h-5 w-5 rounded border-gray-300 data-[state=checked]:bg-[#6945ED] data-[state=checked]:border-[#6945ED]"
                />
                <label htmlFor="variable-tick" className="text-gray-900 text-sm font-medium cursor-pointer">
                  Tick if CTC has variable
                </label>
              </div>
              
              {/* Variable CTC Input */}
              <div className={`w-1/2 ${formData.variableTick ? "block" : "hidden"}`}>
                <Input
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || (/^\d{0,3}$/.test(value) && Number(value) <= 999)) {
                      setFormData((prev) => ({ ...prev, variableCTC: value }));
                    }
                  }}
                  value={formData.variableCTC}
                  type="number"
                  min="0"
                  max="999"
                  placeholder="Enter Variable CTC"
                  className="w-full text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-[#6945ED] rounded-[4px] border border-[#E2E2E2] py-[10px] px-[16px] placeholder:text-[#9B959F]"
                />
              </div>
              
              {/* I accept the Terms & Conditions - Fixed Checkbox */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="accept-terms"
                  onCheckedChange={(checked) => {
                    setFormData((prev) => ({
                      ...prev,
                      acceptTerms: checked === true,
                    }));
                  }}
                  checked={formData.acceptTerms}
                  className="h-5 w-5 rounded border-gray-300 data-[state=checked]:bg-[#6945ED] data-[state=checked]:border-[#6945ED]"
                />
                <label htmlFor="accept-terms" className="text-gray-900 text-sm font-medium cursor-pointer">
                  I accept the Terms & Conditions
                </label>
              </div>
            </div>
            <div className="self-stretch flex justify-end items-end gap-10">
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