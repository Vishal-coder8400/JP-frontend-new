import { useState } from "react";
import CommonForm from "../../components/common/form";
import { basicInformation, recruiterSignUp } from "../../config";
import { Slate, Upload } from "../../utils/icon";
import { useRegister } from "../../hooks/recruiter/useAuth";
import { z } from "zod";
import { validateFormData } from "../../utils/objectUtils";
import ButtonComponent from "../../components/common/button";

const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

const formSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        passwordRegex,
        "Password must include at least one special character"
      ),
    confirmPassword: z.string(),
    profileImage: z.string().url("Must be a valid URL").optional(),
    phone: z.object({
      number: z.union([z.number(), z.string()]), // Accept number or string
      countryCode: z.string(),
    }),
    currentAddress: z.object({
      address: z.string().min(1, "Current address is required"),
      city: z.string().min(1, "City is required"),
      pincode: z.string().min(1, "Pincode is required"),
    }),
    permanentAddress: z.object({
      address: z.string().min(1, "Permanent address is required"),
      city: z.string().min(1, "City is required"),
      pincode: z.string().min(1, "Pincode is required"),
    }),
    resume: z.string().url("Must be a valid URL").optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Error will be attached to confirmPassword field
  });

const BasicDetails = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profileImage: "https://example.com/resume.pdf",
    phone: {
      number: 0,
      countryCode: "",
    },
    currentAddress: {
      address: "",
      city: "",
      pincode: "",
    },
    permanentAddress: {
      address: "",
      city: "",
      pincode: "",
    },
    resume: "https://example.com/resume.pdf",
  });

  const { mutate, isPending, isError, error } = useRegister();

  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = validateFormData(formSchema, formData);
    if (!isValid) return;
    mutate(formData);
  };
  return (
    <div className="w-full self-stretch px-[20px] py-[20px] lg:px-36 lg:py-14 inline-flex flex-col justify-start items-start gap-[18px] lg:gap-7">
      <div className="w-full flex flex-col justify-start items-start gap-8">
        <div className="flex flex-col justify-start items-start gap-7">
          <div className="justify-start text-gray-900 text-md2 lg:text-3xl font-bold leading-loose">
            Recruiter Profile Setup
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-8">
        <div className="justify-start text-gray-900 text-base lg:text-xl font-bold leading-tight">
          Almost there – 0% completed!
        </div>
        <div className="self-stretch inline-flex justify-start items-start gap-2">
          <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
          <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
          <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
          <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
        </div>
      </div>
      <div className="w-full self-stretch flex flex-col justify-start items-start gap-10">
        <div className="self-stretch inline-flex justify-start items-start gap-2.5">
          <form
            onSubmit={onSubmit}
            className="w-full inline-flex flex-col justify-start items-start gap-4"
          >
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
              <div className="self-stretch inline-flex justify-start items-start gap-60">
                <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
                  Create Profile
                </div>
              </div>
              <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
              <div className="w-full">
                <CommonForm
                  formControls={recruiterSignUp}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-4">
              <div className="self-stretch inline-flex justify-center items-center gap-5">
                <div className="w-4 h-4 relative overflow-hidden flex justify-center items-center">
                  <Slate className="h-full w-full" />
                </div>
                <div className="justify-start text-gray-900 text-sm font-semibold leading-none">
                  Upload Resume
                </div>
                <div className="w-4 h-4 relative overflow-hidden flex justify-center items-center">
                  <Upload className="h-full w-full" />
                </div>
              </div>
            </div>
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
              <div className="self-stretch inline-flex justify-start items-start gap-60">
                <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
                  Basic Information
                </div>
              </div>
              <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
              <div className="w-full">
                <CommonForm
                  formControls={basicInformation}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-end items-end gap-2.5">
              <ButtonComponent
                isPending={isPending}
                buttonText={"Save & Update Profile"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
