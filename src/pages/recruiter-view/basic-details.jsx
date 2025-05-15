import React, { useState } from "react";
import CommonForm from "../../components/common/form";
import { basicInformation, recruiterSignUp } from "../../config";
import { Button } from "../../components/ui/button";
import { Slate, Upload } from "../../utils/icon";
import { useRegister } from "../../hooks/useAuth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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
    formData.password === formData.confirmPassword
      ? mutate(formData)
      : toast.error("Password Mismatch!!");
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
