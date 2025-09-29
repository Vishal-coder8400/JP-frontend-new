import { useState } from "react";
import ButtonComponent from "../../components/common/button";
import CommonForm from "../../components/common/form";
import {
  basicCorporateInformation,
  basicInformationControls,
  spocInformationControls,
} from "../../config";
import { z } from "zod";
import { validateFormData } from "../../utils/commonFunctions";
import { useCorporateRegister } from "../../hooks/corporate/useAuth";
import { useUpload } from "../../hooks/common/useUpload";
import Navbar from "../../components/recruiter-view/navbar";

// Define the schema for the phone number object (used in both companyContactNumber and contactNumber)
const phoneNumberSchema = z.object({
  number: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  countryCode: z
    .string()
    .min(1, "Country code is required")
    .regex(
      /^\+\d{1,3}$/,
      "Country code must start with '+' followed by 1-3 digits"
    ),
});

// Define the schema for basicInformation
const basicInformationSchema = z
  .object({
    companyName: z.string().min(1, "Company name is required"),
    companyLogo: z
      .string()
      .min(1, "Company logo URL is required")
      .url("Company logo must be a valid URL"),
    companyContactNumber: phoneNumberSchema,
    companyEmail: z
      .string()
      .min(1, "Company email is required")
      .email("Company email must be a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z.string().min(1, "confirm password field is required"),
    websiteURL: z
      .string()
      .min(1, "Website URL is required")
      .url("Website URL must be a valid URL"),
    companyType: z.string().min(1, "Company type is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Error will be attached to confirmPassword field
  });

// Define the schema for spocInformation
const spocInformationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  contactNumber: phoneNumberSchema,
  email: z
    .string()
    .min(1, "Email is required")
    .email("Email must be a valid email address"),
});

// Define the full formData schema
const formDataSchema = z.object({
  basicInformation: basicInformationSchema,
  spocInformation: spocInformationSchema,
});

const CorporateBasicDetails = () => {
  const [formData, setFormData] = useState({
    basicInformation: {
      companyName: "",
      companyLogo: "",
      companyContactNumber: {
        number: "",
        countryCode: "",
      },
      companyEmail: "",
      password: "",
      confirmPassword: "",
      websiteURL: "",
      companyType: "",
    },
    spocInformation: {
      fullName: "",
      contactNumber: {
        number: "",
        countryCode: "",
      },
      email: "",
    },
  });
  const { mutate, isPending, isError, error } = useCorporateRegister();
  const { mutate: UploadImage } = useUpload();
  const handleUpload = (file, callback) => {
    UploadImage(file, {
      onSuccess: (data) => {
        const fileUrl = data?.data?.fileUrl;
        const fileName = data?.data?.fileName;
        if (callback) {
          callback(fileUrl, fileName);
        }
      },
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = validateFormData(formDataSchema, formData);
    if (!isValid) return;
    mutate(formData);
  };
  return (
    <form
      onSubmit={onSubmit}
      className="w-full self-stretch px-[20px] py-[20px] lg:px-36 lg:pt-0 lg:pb-[32px] inline-flex flex-col justify-start items-start gap-[18px] lg:gap-7"
    >
      <Navbar onlySupport={true} />
      <div className="w-full flex flex-col justify-start items-start gap-8">
        <div className="self-stretch flex flex-col justify-start items-start gap-7">
          <div className="self-stretch justify-start text-gray-900 text-lg lg:text-3xl font-bold leading-loose">
            Corporate Profile Setup
          </div>
        </div>
      </div>
      <div className="w-full inline-flex lg:flex-row flex-col justify-start items-start gap-[40px] lg:gap-12">
        <div className="flex-1 lg:w-1/2 inline-flex flex-col justify-center items-start gap-11">
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
            <div className="self-stretch inline-flex justify-start items-start gap-60">
              <div className="justify-start text-gray-900 text-lg font-semibold leading-tight">
                Basic Information
              </div>
            </div>
            <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>{" "}
            <div className="w-full">
              <CommonForm
                formControls={basicCorporateInformation}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
            <div className="self-stretch inline-flex justify-start items-start gap-60">
              <div className="justify-start text-gray-900 text-lg font-semibold leading-tight">
                Basic Information
              </div>
            </div>
            <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
            <div className="w-full">
              <CommonForm
                formControls={basicInformationControls}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-4">
          <div className="self-stretch inline-flex justify-start items-start gap-60">
            <div className="justify-start text-gray-900 text-lg font-semibold leading-tight">
              SPOC Information
            </div>
          </div>
          <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
          <div className="w-full">
            <CommonForm
              formControls={spocInformationControls}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col justify-end items-end gap-2.5">
        <ButtonComponent
          color={"#6945ED"}
          isPending={isPending}
          buttonText={"Save & Update Profile"}
        />
      </div>
    </form>
  );
};

export default CorporateBasicDetails;
