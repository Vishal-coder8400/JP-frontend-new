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
const companySchema = z
  .object({
    basicInformation: z.object({
      companyName: z.string().min(1, "Company name is required"),
      companyLogo: z
        .string()
        .optional()
        .refine((val) => !val || /^https?:\/\/\S+$/.test(val), {
          message: "Company logo must be a valid URL",
        }),
      companyContactNumber: z.object({
        number: z.string().min(1, "Contact number is required"),
        countryCode: z.string().min(1, "Country code is required"),
      }),
      companyEmail: z
        .string()
        .min(1, "Company email is required")
        .email("Company email must be a valid email"),
      password: z.string().min(1, "Password is required"),
      confirmPassword: z.string().min(1, "Confirm password is required"),
      websiteURL: z
        .string()
        .min(1, "Website URL is required")
        .url("Website must be a valid URL"),
      companyType: z.string().min(1, "Company type is required"),
      companyDescription: z.string().min(1, "Company description is required"),
    }),
    spocInformation: z.object({
      fullName: z.string().min(1, "Full name is required"),
      contactNumber: z.object({
        number: z.string().min(1, "Contact number is required"),
        countryCode: z.string().min(1, "Country code is required"),
      }),
      email: z
        .string()
        .min(1, "Email is required")
        .email("Email must be a valid email"),
    }),
  })
  .refine(
    (data) =>
      data.basicInformation.password === data.basicInformation.confirmPassword,
    {
      message: "Password and Confirm Password must match",
      path: ["basicInformation", "confirmPassword"], // attach error to confirmPassword
    }
  );

const CorporateBasicDetails = () => {
  const [errorMessage, setErrorMessage] = useState({});
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
      companyDescription: "",
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
  const { mutate, isPending } = useCorporateRegister();
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
    const { isValid, errors } = validateFormData(companySchema, formData);
    if (!isValid) {
      setErrorMessage(errors);
      return;
    }

    setErrorMessage({});
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
                errors={errorMessage}
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
                errors={errorMessage}
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
              errors={errorMessage}
            />
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col justify-end items-end gap-2.5">
        <ButtonComponent
          color={"#6945ED"}
          isPending={isPending}
          buttonText={"Continue"}
          type="submit"
        />
      </div>
    </form>
  );
};

export default CorporateBasicDetails;
