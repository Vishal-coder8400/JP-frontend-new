import React, { useState } from "react";
import CommonForm from "../../components/common/form";
import { KycVerificationDetails, recruiterSignUp } from "../../config";
import { Button } from "../../components/ui/button";
import { Loader2 } from "lucide-react";
import { useKycDetails } from "../../hooks/useProfile";

const KycVerification = () => {
  const [formData, setFormData] = useState({
    panDetails: {
      number: "",
      image: "http://example.com/path/to/pan-image.jpg",
    },
    aadharDetails: {
      number: "",
      image: "http://example.com/path/to/aadhar-image.jpg",
    },
    bankDetails: {
      accountNumber: "",
      accountHolderName: "",
      bankName: "",
      ifscCode: "",
      accountType: "saving",
    },
    cancelChequeOrPassbookImage: "http://example.com/path/to/cheque-image.jpg",
  });
  const { mutate, isPending, isError, error } = useKycDetails();

  const onSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };
  return (
    <div className="w-full self-stretch p-[20px] lg:px-36 lg:py-20 inline-flex flex-col justify-start items-start gap-[18px] lg:gap-7">
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
                />
              </div>
            </div>

            <div className="self-stretch flex flex-col justify-end items-end gap-2.5">
              <Button className="cursor-pointer w-64 px-5 py-2.5 bg-[#6945ED] rounded-3xl inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-white text-sm font-medium capitalize">
                  {isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin h-2 w-2" /> Please wait
                    </span>
                  ) : (
                    "Save & Update Profile"
                  )}
                </div>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KycVerification;
