import { useState } from "react";
import CommonForm from "../../components/common/form";
import { KycVerificationDetails } from "../../config";
import { useKycDetails } from "../../hooks/recruiter/useProfile";
import { z } from "zod";
import { validateFormData } from "../../utils/commonFunctions";
import ButtonComponent from "../../components/common/button";
import { useUpload } from "../../hooks/common/useUpload";
import Navbar from "../../components/recruiter-view/navbar";

const bankDetailsSchema = z
  .object({
    accountNumber: z.string(),
    accountHolderName: z.string(),
    bankName: z.string(),
    ifscCode: z.string(),
    accountType: z.enum(["saving", "current"]).optional(),
  })
  .partial() // keys optional
  .refine(
    (data) => {
      const anyFilled = Object.values(data).some(
        (val) => val && val.trim() !== ""
      );
      if (!anyFilled) return true; // skip validation if completely empty
      return Object.values(data).every((val) => val && val.trim() !== "");
    },
    {
      message: "If you fill any bank field, all bank details are required",
    }
  )
  .optional(); // whole bankDetails object optional

// Full form schema
export const formSchema = z.object({
  panDetails: z.object({
    number: z
      .string()
      .min(1, "PAN number is required")
      .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number format"),
    image: z.string().url("PAN image must be a valid URL").optional(),
  }),

  aadharDetails: z.object({
    number: z
      .string()
      .min(1, "Aadhar number is required")
      .regex(/^\d{12}$/, "Aadhar number must be 12 digits"),
    image: z
      .string()
      .url("PAN image must be a valid URL")
      .optional()
      .or(z.literal("")),
  }),

  bankDetails: bankDetailsSchema,

  cancelChequeOrPassbookImage: z
    .string()
    .optional()
    .refine((val) => !val || /^https?:\/\/\S+$/.test(val), {
      message: "Must be a valid URL",
    }),
});

const KycVerification = () => {
  const [errorMessage, setErrorMessage] = useState({});
  const [formData, setFormData] = useState({
    panDetails: {
      number: "",
    },
    aadharDetails: {
      number: "",
    },
    bankDetails: {
      accountNumber: "",
      accountHolderName: "",
      bankName: "",
      ifscCode: "",
      // accountType: "",
    },
    cancelChequeOrPassbookImage: "",
  });
  const { mutate, isPending } = useKycDetails();
  const { mutate: UploadImage } = useUpload();

  const onSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors } = validateFormData(formSchema, formData);
    if (!isValid) {
      setErrorMessage(errors);
      return;
    }

    setErrorMessage({});
    mutate(formData);
  };
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

  return (
    <div className="w-full self-stretch p-[20px] lg:px-36 lg:py-[0px] lg:pb-[32px] inline-flex flex-col justify-start items-start gap-[18px] lg:gap-7">
      <Navbar onlySupport={true} />
      <div className="w-full flex flex-col justify-start items-start gap-8">
        <div className="flex flex-col justify-start items-start gap-7">
          <div className="justify-start text-gray-900 text-md2 lg:text-3xl font-bold leading-loose">
            Recruiter Profile Setup
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-8">
        <div className="justify-start text-gray-900 text-base lg:text-xl font-bold leading-tight">
          Almost there – 25% completed!
        </div>
        <div className="self-stretch inline-flex justify-start items-start gap-2">
          <div className="flex-1 h-2 bg-lime-600 rounded-xl" />
          <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
          <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
          <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
        </div>
      </div>
      <div className="w-full self-stretch flex flex-col justify-start items-start gap-10">
        <form
          onSubmit={onSubmit}
          className="self-stretch inline-flex justify-start items-start gap-2.5"
        >
          <div className="w-full inline-flex flex-col justify-start items-start gap-4">
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
              <div className="self-stretch inline-flex justify-start items-start gap-60">
                <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
                  KYC Verification
                </div>
              </div>
              <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
              <div className="w-full">
                <CommonForm
                  formControls={KycVerificationDetails}
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
                type="submit"
                color={"#6945ED"}
                buttonText={"Continue"}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KycVerification;
