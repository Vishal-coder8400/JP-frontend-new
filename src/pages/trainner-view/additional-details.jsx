import { useState } from "react";
import CommonForm from "../../components/common/form";
import Navbar from "../../components/recruiter-view/navbar";
import {
  additionalDetailsJobSeeker,
  additionalDetailsJobSeeker2,
  additionalDetailsJobSeeker3,
} from "../../config";
import { Input } from "../../components/ui/input";
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
          formControls={additionalDetailsJobSeeker}
          formData={formData}
          setFormData={setFormData}
        />
        {formData?.handleTeam === "yes" && (
          <div className="self-stretch">
            <Input
              className="flex placeholder:translate-y-[1px] items-center justify-center text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[10px] px-[16px] placeholder:text-[#9B959F]"
              type="text"
              placeholder="Team Handling Experience (in years)"
            />
          </div>
        )}
        <CommonForm
          formControls={additionalDetailsJobSeeker2}
          formData={formData}
          setFormData={setFormData}
        />
        {formData?.medicalProblem === "yes" && (
          <div className="self-stretch">
            <Input
              className="flex placeholder:translate-y-[1px] items-center justify-center text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[10px] px-[16px] placeholder:text-[#9B959F]"
              type="text"
              placeholder="Enter your Medical Details"
            />
          </div>
        )}
        <CommonForm
          formControls={additionalDetailsJobSeeker3}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
      <div className="self-stretch flex flex-col justify-end items-end gap-2.5">
        <ButtonComponent
          // isPending={isPending}
          buttonText={"Save & Update Profile"}
        />
      </div>
    </div>
  );
};

export default AdditionalDetails;
