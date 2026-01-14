import { useState } from "react";
import ButtonComponent from "../../components/common/button";
import CommonForm from "../../components/common/form";
import Navbar from "../../components/recruiter-view/navbar";
import { kycBankFormControls, trainerFormControls1 } from "../../config";
import { useUpload } from "../../hooks/common/useUpload";
import { setNestedValue, validateFormData } from "../../utils/commonFunctions";
import Address from "../../components/common/address";
import UploadResume from "../../components/common/uploadResume";
import { z } from "zod";
import { useTrainerRegisterationStage1 } from "../../hooks/trainer/useAuth";

const candidateProfileSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    profilePicture: z.string().optional(),

    phone: z.object({
      countryCode: z.string().min(1, "Country code is required"),
      number: z
        .string()
        .min(1, "Phone number is required")
        .regex(/^\d{10}$/, "Phone number must be 10 digits"),
    }),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),

    currentAddress: z.object({
      address: z.string().min(1, "Current address is required"),
      city: z.string().min(1, "Current city is required"),
      pincode: z.string().min(1, "Current pincode is required"),
      state: z.string().min(1, "Current state is required"),
    }),

    permanentAddress: z.object({
      address: z.string().min(1, "Permanent address is required"),
      city: z.string().min(1, "Permanent city is required"),
      pincode: z.string().min(1, "Permanent pincode is required"),
      state: z.string().min(1, "Permanent state is required"),
    }),

    resume: z.string().min(1, "Resume is required"),

    panDetails: z.object({
      number: z.string().min(1, "PAN number is required"),
      image: z.string().optional(),
    }),

    aadharDetails: z.object({
      number: z.string().min(1, "Aadhar number is required"),
      image: z.string().optional(),
    }),

    bankDetails: z.object({
      accountNumber: z.string().min(1, "Account number is required"),
      accountHolderName: z.string().min(1, "Account holder name is required"),
      branchName: z.string().min(1, "Branch name is required"),
      ifscCode: z.string().min(1, "IFSC code is required"),
    }),

    cancelChequeOrPassbookImage: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const BasicDetails = () => {
  const [errorMessage, setErrorMessage] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    profilePicture: "",
    phone: {
      countryCode: "",
      number: "",
    },
    email: "",
    password: "",
    confirmPassword: "",
    currentAddress: {
      city: "",
      pincode: "",
      state: "",
      address: "",
    },
    permanentAddress: {
      city: "",
      pincode: "",
      state: "",
      address: "",
    },
    resume: "",
    panDetails: {
      number: "",
      image: "",
    },
    aadharDetails: {
      number: "",
      image: "",
    },
    bankDetails: {
      accountNumber: "",
      accountHolderName: "",
      branchName: "",
      ifscCode: "",
    },
    cancelChequeOrPassbookImage: "",
  });
  const [fileName, setFileName] = useState("");
  const { mutate, isPending } = useTrainerRegisterationStage1();
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
    const payload = { ...formData };
    if (formData.sameAs) {
      payload.permanentAddress = { ...formData.currentAddress };
    }
    const { isValid, errors } = validateFormData(
      candidateProfileSchema,
      payload
    );
    if (!isValid) {
      setErrorMessage(errors);
      return;
    }

    setErrorMessage({});
    mutate(payload);
  };
  const handleUpload2 = (file, callback) => {
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
  const handleRemoveFile = () => {
    setFormData(
      (prev) => setNestedValue(prev, "resume", "") // Clear uploaded file URL
    );
    setFileName("");
  };
  return (
    <div className="w-full self-stretch px-[20px] py-[20px] lg:px-36 lg:py-[0px] lg:pb-[32px] inline-flex flex-col justify-start items-start gap-[18px] lg:gap-7">
      <Navbar onlySupport={true} />
      <div className="w-full flex flex-col justify-start items-start gap-8">
        <div className="flex flex-col justify-start items-start gap-7">
          <div className="justify-start text-gray-900 text-md2 lg:text-3xl font-bold leading-loose">
            Tell us a bit about yourself
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-8">
        <div className="justify-start text-gray-900 text-base lg:text-xl font-bold leading-tight">
          Let's get started – You're 0% there!
        </div>
        <div className="self-stretch inline-flex justify-start items-start gap-2">
          <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
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
                  Basic Information
                </div>
              </div>
              <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
              <div className="w-full">
                <CommonForm
                  formControls={trainerFormControls1}
                  formData={formData}
                  setFormData={setFormData}
                  handleUpload={handleUpload}
                  errors={errorMessage}
                />
              </div>
              <Address
                setFormData={setFormData}
                formData={formData}
                errors={errorMessage}
              />
              <UploadResume
                setFormData={setFormData}
                fileName={fileName}
                setFileName={setFileName}
                handleRemoveFile={handleRemoveFile}
                handleUpload={handleUpload2}
                formData={formData}
                errors={errorMessage}
              />
            </div>
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
              <div className="self-stretch inline-flex justify-start items-start gap-60">
                <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
                  KYC Verification
                </div>
              </div>
              <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
              <div className="w-full">
                <CommonForm
                  formControls={kycBankFormControls}
                  formData={formData}
                  setFormData={setFormData}
                  handleUpload={handleUpload}
                  errors={errorMessage}
                />
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-end items-end gap-2.5">
              <ButtonComponent
                isPending={isPending}
                color={"#6945ED"}
                buttonText={"Continue"}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
