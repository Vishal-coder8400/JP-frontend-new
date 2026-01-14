import { useState } from "react";
import {
  corporateFormControls,
  formControlsBankDetails,
  formControlsForIndividual,
} from "../../config";
import ButtonComponent from "../common/button";
import CommonForm from "../common/form";
import useAuthStore from "../../stores/useAuthStore";
import Navbar from "../recruiter-view/navbar";
import z from "zod";
import { validateFormData } from "../../utils/commonFunctions";
import { useCorporateSignupStage2 } from "../../hooks/corporate/useAuth";
import { useUpload } from "../../hooks/common/useUpload";

const optionalFileSchema = z
  .string()
  .optional()
  .refine((val) => !val || /^https?:\/\/\S+$/.test(val), {
    message: "Must be a valid URL",
  });

// Optional PAN details
const panDetailsSchema = z
  .object({
    panCardNumber: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine((val) => !val || /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val), {
        message: "Invalid PAN number format",
      }),
    panCardFile: optionalFileSchema,
  })
  .optional();

const bankDetailsSchema = z
  .object({
    bankName: z.string().optional(),
    bankAccountNumber: z.string().optional(),
    ifscCode: z.string().optional(),
    chequeOrStatementFile: optionalFileSchema,
  })
  .optional();

const gstDetailsSchema = z
  .object({
    gstinNumber: z
      .string()
      .optional()
      .or(z.literal(""))
      .transform((val) => val?.toUpperCase?.() || val)
      .refine(
        (val) =>
          !val ||
          /^(0[1-9]|1[0-9]|2[0-9]|3[0-7])[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(
            val
          ),
        { message: "Invalid GSTIN format" }
      ),
    gstinFile: optionalFileSchema,
  })
  .optional();

export const privateCompanySchema = z.object({
  currentAddress: z
    .string({ required_error: "Current address is required" }) // catches undefined
    .min(1, "Current address cannot be empty"), // catches empty string
  city: z
    .string({ required_error: "City is required" }) // triggers if undefined or missing
    .min(1, "City cannot be empty"), // triggers if ""
  state: z
    .string({ required_error: "State is required" })
    .min(1, "State cannot be empty"),
  pincode: z
    .string({ required_error: "Pincode is required" })
    .min(1, "Pincode cannot be empty"),
  industryType: z
    .string({ required_error: "Industry type is required" })
    .min(1, "Industry type cannot be empty"),
  gstin: z
  .string({ required_error: "GSTIN is required" })
  .min(15, "GSTIN must be exactly 15 characters")
  .max(15, "GSTIN must be exactly 15 characters")
  .regex(
    /^(0[1-9]|1[0-9]|2[0-9]|3[0-7])[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/,
    "Invalid GSTIN format"
  ),


  panDetails: panDetailsSchema,
  bankDetails: bankDetailsSchema,
});

export const individualFormSchema = z.object({
  currentAddress: z
    .string({ required_error: "Current address is required" }) // catches undefined
    .min(1, "Current address cannot be empty"),
  city: z
    .string({ required_error: "City is required" }) // triggers if undefined or missing
    .min(1, "City cannot be empty"), // triggers if ""
  state: z
    .string({ required_error: "State is required" })
    .min(1, "State cannot be empty"),
  pincode: z
    .string({ required_error: "Pincode is required" })
    .min(1, "Pincode cannot be empty"),
  gstin: z
  .string({ required_error: "GSTIN is required" })
  .min(15, "GSTIN must be exactly 15 characters")
  .max(15, "GSTIN must be exactly 15 characters")
  .regex(
    /^(0[1-9]|1[0-9]|2[0-9]|3[0-7])[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/,
    "Invalid GSTIN format"
  ),


  panDetails: panDetailsSchema,
  aadharCardNumber: z
    .string()
    .regex(/^\d{12}$/, "Aadhar card must be 12 digits")
    .optional()
    .or(z.literal("")),

  aadharCardFile: z
    .string({ required_error: "Aadhar card file is required" })
    .min(1, "Aadhar card file is required")
    .url("Aadhar card file must be a valid URL"),
  bankDetails: bankDetailsSchema,
});

const FinalSetup = () => {
  const { user } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState({});
  const [formData, setFormData] = useState({});
  const { mutate, isPending } = useCorporateSignupStage2();
  const onSubmit = (e) => {
    e.preventDefault();
    const schema =
      user?.basicInformation?.companyType === "privateCompany"
        ? privateCompanySchema
        : individualFormSchema;
    const { isValid, errors } = validateFormData(schema, formData);
    if (!isValid) {
      setErrorMessage(errors);
      return;
    }

    setErrorMessage({});
    mutate(formData);
  };
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

  return (
    <form
      onSubmit={onSubmit}
      className="w-full self-stretch px-36 py-0 pb-[32px] inline-flex flex-col justify-start items-start gap-12"
    >
      <Navbar onlySupport={false} />
      <div className="w-full flex flex-col justify-start items-start gap-8">
        <div className="self-stretch flex flex-col justify-start items-start gap-7">
          <div className="self-stretch justify-start text-gray-900 text-3xl font-bold leading-loose">
            Corporate Profile Setup
          </div>
        </div>
      </div>
      <div className="w-full inline-flex justify-start items-start gap-12">
        <div className="w-full flex-1 inline-flex flex-col justify-center items-start gap-11">
          <div className="w-full self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
            <div className="self-stretch inline-flex justify-start items-start gap-60">
              <div className="justify-start text-gray-900 text-lg font-semibold leading-tight">
                {user?.basicInformation?.companyType === "privateCompany"
                  ? "Private Limited Company"
                  : "Proprietorship / Individual Company"}
              </div>
            </div>
            <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
            <div className="w-full">
              <CommonForm
                formControls={
                  user?.basicInformation?.companyType === "privateCompany"
                    ? corporateFormControls
                    : formControlsForIndividual
                }
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
                Bank Details
              </div>
            </div>
            <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
            <div className="w-full">
              <CommonForm
                formControls={formControlsBankDetails}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
                errors={errorMessage}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col justify-end items-end gap-2.5">
        <ButtonComponent
          type="submit"
          color={"#6945ED"}
          isPending={isPending}
          buttonText={"Continue"}
        />
      </div>
    </form>
  );
};

export default FinalSetup;
