import { useState } from "react";
import CommonForm from "../../components/common/form";
import Navbar from "../../components/recruiter-view/navbar";
import { gigTrainingFormConfig } from "../../config";
import ButtonComponent from "../../components/common/button";

const AdditionalDetails = () => {
  const [formData, setFormData] = useState({
    maritalStatus: "",
  });
  return (
    <div className="w-full self-stretch px-[20px] py-[20px] lg:px-36 lg:py-[0px] lg:pb-[32px] inline-flex flex-col justify-start items-start gap-[18px] lg:gap-7">
      <Navbar onlySupport={true} />
      <div className="w-full flex flex-col justify-start items-start gap-8">
        <div className="flex flex-col justify-start items-start gap-7">
          <div className="justify-start text-gray-900 text-md2 lg:text-3xl font-bold leading-loose">
            Additional Information
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-8">
        <div className="justify-start text-gray-900 text-base lg:text-xl font-bold leading-tight">
          Boom! 100% complete – You're all set!
        </div>
        <div className="self-stretch inline-flex justify-start items-start gap-2">
          <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
          <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
          <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
          <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
          <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
        </div>
      </div>
      <div className="w-full flex flex-col p-6 rounded-lg border-[#DADADA] border-1 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] gap-[18px]">
        <CommonForm
          formControls={gigTrainingFormConfig}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
      <div className="self-stretch flex flex-col justify-end items-end gap-2.5">
        <ButtonComponent
          // isPending={isPending}
          color={"#6945ED"}
          buttonText={"Continue"}
        />
      </div>
    </div>
  );
};

export default AdditionalDetails;
