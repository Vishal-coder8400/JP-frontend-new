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
const stage2Schema = z.object({
  currentAddress: z.string().min(1, "Current address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be a 6-digit number"),
  industryType: z.string().optional(), // Only for private companies
  panCardNumber: z.string().min(1, "PAN card number is required"),
  panCardFile: z.string().min(1, "PAN card file is required"),
  gstin: z.string().min(1, "GSTIN is required"),
  bankName: z.string().min(1, "Bank name is required"),
  bankAccountNumber: z.string().min(1, "Bank account number is required"),
  ifscCode: z.string().min(1, "IFSC code is required"),
  chequeOrStatementFile: z
    .string()
    .min(1, "Cancel cheque or statement file is required"),
});

const FinalSetup = () => {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({});
  const { mutate, isPending } = useCorporateSignupStage2();
  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = validateFormData(stage2Schema, formData);
    if (!isValid) return;
    mutate(formData);
  };
  console.log(formData);
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
              />
            </div>
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

export default FinalSetup;
