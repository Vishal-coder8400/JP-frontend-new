import { useState } from "react";
import CommonForm from "../../components/common/form";
import { jobController1, jobController2, walkinAdress } from "../../config";
import Navbar from "../../components/recruiter-view/navbar";
import { PostJobIcon } from "../../utils/icon";
import { useCorporateJobPost } from "../../hooks/corporate/useJob";
import { validateFormData } from "../../utils/commonFunctions";

import { z } from "zod";
import ButtonComponent from "../../components/common/button";

const formSchema = z
  .object({
    jobTitle: z
      .string({ required_error: "Job title is required" })
      .min(1, "Job title cannot be empty"),

    jobType: z.enum(["Full-Time", "Part-Time", "Both", "Night-Time"], {
      errorMap: () => ({ message: "Select a valid job type" }),
    }),

    workingHours: z
      .string({ required_error: "Working hours are required" })
      .min(1, "Working hours cannot be empty"),

    workingDays: z
      .string({ required_error: "Working days are required" })
      .min(1, "Working days cannot be empty"),

    isSundayWorking: z.boolean({
      required_error: "Please specify if Sunday is working or not",
    }),

    officeLocation: z
      .string({ required_error: "Office location is required" })
      .min(1, "Office location cannot be empty"),

    city: z
      .string({ required_error: "City is required" })
      .min(1, "City cannot be empty"),

    state: z
      .string({ required_error: "State is required" })
      .min(1, "State cannot be empty"),

    pincode: z
      .string({ required_error: "Pincode is required" })
      .regex(/^\d{6}$/, "Pincode must be a 6-digit number"),

    modeOfWork: z.enum(["Work from Office", "Work from Home", "Hybrid"], {
      errorMap: () => ({ message: "Select a valid mode of work" }),
    }),

    experienceLevel: z
      .string({ required_error: "Experience level is required" })
      .min(1, "Experience level cannot be empty"),

    genderPreference: z.enum(["Male", "Female", "Any"], {
      errorMap: () => ({ message: "Select a valid gender preference" }),
    }),

    minimumEducation: z
      .string({ required_error: "Minimum education is required" })
      .min(1, "Minimum education cannot be empty"),

    englishLevel: z.enum(["basic", "moderate", "fluent"], {
      errorMap: () => ({ message: "Select a valid English level" }),
    }),

    regionalLanguageRequired: z.boolean({
      required_error: "Please specify if regional language is required",
    }),

    preferredAgeRange: z
      .string({ required_error: "Preferred age range is required" })
      .regex(
        /^\d{2}-\d{2}$/,
        "Age range must be in format 'xx-yy' (e.g., 22-35)"
      ),

    salaryRange: z
      .object({
        min: z.number().min(1, "Minimum salary is required"),
        max: z.number().min(1, "Maximum salary is required"),
      })
      .refine((data) => parseInt(data.min, 10) <= parseInt(data.max, 10), {
        message: "Minimum salary cannot be greater than maximum salary",
        path: ["min"],
      }),

    twoWheelerMandatory: z.boolean({
      required_error: "Please specify if two-wheeler is mandatory",
    }),

    jobDescription: z
      .string({ required_error: "Job description is required" })
      .min(50, "Job description must be at least 50 characters"),

    isWalkInInterview: z.boolean({
      required_error: "Please specify if it's a walk-in interview",
    }),

    // These fields are optional by default
    walkInDate: z.string().optional(),
    walkInTime: z.string().optional(),
    walkInAddress: z.string().optional(),
    spocName: z.string().optional(),
    spocNumber: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Only validate these if isWalkInInterview is true
    if (data.isWalkInInterview) {
      if (!data.walkInDate?.trim()) {
        ctx.addIssue({
          path: ["walkInDate"],
          message: "Date is required",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.walkInTime?.trim()) {
        ctx.addIssue({
          path: ["walkInTime"],
          message: "Time is required",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.walkInAddress?.trim()) {
        ctx.addIssue({
          path: ["walkInAddress"],
          message: "Address is required",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.spocName?.trim()) {
        ctx.addIssue({
          path: ["spocName"],
          message: "Name is required",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!/^\d{10}$/.test(data.spocNumber || "")) {
        ctx.addIssue({
          path: ["spocNumber"],
          message: "Phone number must be exactly 10 digits",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

const JobPosting = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
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
    preferredAgeRange: "",
    requiredSkills: [],
    salaryRange: {
      min: "",
      max: "",
    },
    twoWheelerMandatory: "",
    jobDescription: "",
    isWalkInInterview: "",
    walkInDate: "",
    walkInTime: "",
    walkInAddress: "",
    spocName: "",
    spocNumber: "",
  });
  const { mutate, isPending, isError, error } = useCorporateJobPost();
  const onSubmit = (e) => {
    e.preventDefault();
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
    const isValid = validateFormData(formSchema, payload);
    if (!isValid) return;
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
            {formData?.isWalkInInterview === "yes" && (
              <CommonForm
                formData={formData}
                setFormData={setFormData}
                formControls={walkinAdress}
              />
            )}
          </div>
          <div className="self-stretch flex flex-col justify-start items-end gap-10">
            <ButtonComponent
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
