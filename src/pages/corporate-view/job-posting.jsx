import { useState } from "react";
import CommonForm from "../../components/common/form";
import {
  jobController1,
  jobController2,
  jobController3,
  regionalLanguage,
  walkinAdress,
} from "../../config";
import Navbar from "../../components/recruiter-view/navbar";
import { PostJobIcon } from "../../utils/icon";
import { useCorporateJobPost } from "../../hooks/corporate/useJob";
import { validateFormData } from "../../utils/commonFunctions";

import { z } from "zod";
import ButtonComponent from "../../components/common/button";
import { useDropDown } from "@/hooks/common/useDropDown";

const jobSchema = z
  .object({
    jobTitle: z
      .string({ required_error: "Job title is required" })
      .min(1, "Job title is required"),
    jobType: z
      .string({ required_error: "Job type is required" })
      .min(1, "Job type is required"),
    workingHours: z
      .string({ required_error: "Working hours are required" })
      .min(1, "Working hours are required"),
    workingDays: z
      .string({ required_error: "Working days are required" })
      .min(1, "Working days are required"),
    isSundayWorking: z
      .string({ required_error: "Please specify if Sunday is working" })
      .min(1, " Please specify if Sunday is working"),
    officeLocation: z
      .string({ required_error: "Office location is required" })
      .min(1, " Office location is required"),
    city: z
      .string({ required_error: "City is required" })
      .min(1, "City is required"),
    state: z
      .string({ required_error: "State is required" })
      .min(1, "State is required"),
    pincode: z
      .string({ required_error: "Pincode is required" })
      .min(1, "Pincode is required"),
    modeOfWork: z
      .string({ required_error: "Mode of work is required" })
      .min(1, "Mode of work is required"),
    experienceLevel: z
      .string({ required_error: "Experience level is required" })
      .min(1, " Experience level is required"),
    genderPreference: z
      .string({ required_error: "Gender preference is required" })
      .min(1, " Gender preference is required"),
    minimumEducation: z
      .string({ required_error: "Minimum education is required" })
      .min(1, " Minimum education is required"),
    englishLevel: z
      .string({ required_error: "English level is required" })
      .min(1, "English level is required"),
    regionalLanguageRequired: z
      .string({ required_error: "Specify if regional language is required" })
      .min(1, "Specify if regional language is required"),
    regionalLanguages: z.array(z.any()).optional(),
    preferredAgeRange: z.string().optional(),
    requiredSkills: z.array(z.any()).min(1, "At least one skill is required"),
    salaryRange: z.object({
      min: z
        .number({ required_error: "Minimum salary is required" })
        .min(1, "Minimum salary is required"),
      max: z
        .number({ required_error: "Maximum salary is required" })
        .min(1, "Maximum salary is required"),
    }),
    twoWheelerMandatory: z
      .string({ required_error: "Specify if two-wheeler is mandatory" })
      .min(1, " Specify if two-wheeler is mandatory"),
    jobDescription: z
      .string({ required_error: "Job description is required" })
      .min(1, "Job description is required"),
    isWalkInInterview: z
      .string({ required_error: "Specify if this is a walk-in interview" })
      .min(1),
    walkInDate: z.string().optional(),
    walkInTime: z.string().optional(),
    walkInAddress: z.string().optional(),
    spocName: z.string().optional(),
    spocNumber: z.string().optional(),
    noOfPositions: z
      .string({ required_error: "Number of positions is required" })
      .min(1, "Number of positions is required"),
  })
  // ✅ Conditional validation for regional language
  .refine(
    (data) => {
      if (data.regionalLanguageRequired.toLowerCase() === "yes") {
        return data.regionalLanguages && data.regionalLanguages.length > 0;
      }
      return true;
    },
    {
      message:
        "Regional languages are required when 'Regional Language Required' is Yes",
      path: ["regionalLanguages"],
    }
  )
  // ✅ Conditional validation for walk-in interview
  .superRefine((data, ctx) => {
    // ✅ regionalLanguages check
    if (data.regionalLanguageRequired.toLowerCase() === "yes") {
      if (!data.regionalLanguages || data.regionalLanguages.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Regional languages are required when 'Regional Language Required' is Yes",
          path: ["regionalLanguages"],
        });
      }
    }

    // ✅ isWalkInInterview check — add error for each missing field
    if (data.isWalkInInterview.toLowerCase() === "yes") {
      const missingFields = [];

      if (!data.walkInDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Walk-in date is required",
          path: ["walkInDate"],
        });
        missingFields.push("walkInDate");
      }
      if (!data.walkInTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Walk-in time is required",
          path: ["walkInTime"],
        });
        missingFields.push("walkInTime");
      }
      if (!data.walkInAddress) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Walk-in address is required",
          path: ["walkInAddress"],
        });
        missingFields.push("walkInAddress");
      }
      if (!data.spocName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "SPOC name is required",
          path: ["spocName"],
        });
        missingFields.push("spocName");
      }
      if (!data.spocNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "SPOC number is required",
          path: ["spocNumber"],
        });
        missingFields.push("spocNumber");
      }

      // If you want, you can log all missing fields together:
      if (missingFields.length > 0) {
        console.warn("Missing walk-in fields:", missingFields);
      }
    }
  });

const JobPosting = () => {
  const [errorMessage, setErrorMessage] = useState({});
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobType: "",
    workingHours: "",
    workingDays: "",
    isSundayWorking: "",
    officeLocation: "",
    city: "",
    state: "",
    pincode: "",
    modeOfWork: "",
    experienceLevel: "",
    genderPreference: "",
    minimumEducation: "",
    englishLevel: "",
    regionalLanguageRequired: "",
    regionalLanguages: [],
    preferredAgeRange: "",
    requiredSkills: [],
    salaryRange: {
      min: 0,
      max: 0,
    },
    twoWheelerMandatory: "",
    jobDescription: "",
    isWalkInInterview: "",
    walkInDate: "",
    walkInTime: "",
    walkInAddress: "",
    spocName: "",
    spocNumber: "",
    noOfPositions: "",
  });
  const { mutate, isPending } = useCorporateJobPost();
  const { data: skillOptions } = useDropDown("skills");
  const { data: skillOptions2 } = useDropDown("languages");
  const updatedFields = jobController3.map((field) =>
    field.name === "requiredSkills"
      ? {
          ...field,
          options: skillOptions?.data?.values.map((skill) => ({
            id: skill._id,
            label: skill.label,
          })),
        }
      : field
  );
  const updatedFields2 = regionalLanguage.map((field) =>
    field.name === "regionalLanguages"
      ? {
          ...field,
          options: skillOptions2?.data?.values.map((language) => ({
            id: language._id,
            label: language.label,
          })),
        }
      : field
  );
  const onSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors } = validateFormData(jobSchema, formData);
    if (!isValid) {
      setErrorMessage(errors);
      return;
    }
    setErrorMessage({});
    let payload = { ...formData };
    const booleanFields = [
      "isWalkInInterview",
      "twoWheelerMandatory",
      "regionalLanguageRequired",
      "isSundayWorking",
    ];
    booleanFields.forEach((field) => {
      payload[field] = formData[field] === "yes";
    });
    if (formData.requiredSkills.length > 0) {
      payload.requiredSkills = formData.requiredSkills.map((skill) => skill.id);
    }
    if (formData.regionalLanguages.length > 0) {
      payload.regionalLanguages = formData.regionalLanguages.map(
        (lang) => lang.id
      );
    }
    mutate(payload);
  };

  return (
    <div className="w-full self-stretch px-36 py-0 pb-[32px] inline-flex flex-col justify-start items-start gap-5">
      <Navbar onlySupport={false} />
      <div className="w-full flex flex-col justify-start items-start gap-8">
        <div className="self-stretch flex flex-col justify-start items-start gap-7">
          <div className="self-stretch justify-start text-gray-900 text-3xl font-bold leading-loose">
            Post Jobs
          </div>
        </div>
      </div>
      <div className="w-full inline-flex justify-start items-start gap-7">
        <div className="size- p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-4">
          <div className="self-stretch inline-flex justify-start items-center gap-5">
            <PostJobIcon />
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
      <form
        onSubmit={onSubmit}
        className="self-stretch inline-flex justify-start items-start gap-10"
      >
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-10">
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
            <CommonForm
              formControls={jobController1}
              formData={formData}
              setFormData={setFormData}
              errors={errorMessage}
            />
          </div>
        </div>
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-10">
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
            <CommonForm
              formControls={jobController2}
              formData={formData}
              setFormData={setFormData}
              errors={errorMessage}
            />
            {formData?.regionalLanguageRequired === "yes" && (
              <CommonForm
                formControls={updatedFields2}
                formData={formData}
                setFormData={setFormData}
                errors={errorMessage}
              />
            )}
            <CommonForm
              formControls={updatedFields}
              formData={formData}
              setFormData={setFormData}
              errors={errorMessage}
            />
            {formData?.isWalkInInterview === "yes" && (
              <CommonForm
                formData={formData}
                setFormData={setFormData}
                formControls={walkinAdress}
                errors={errorMessage}
              />
            )}
          </div>
          <div className="self-stretch flex flex-col justify-start items-end gap-10">
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
  );
};

export default JobPosting;
