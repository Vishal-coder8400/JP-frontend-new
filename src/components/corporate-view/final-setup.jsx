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

const FinalSetup = () => {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({});
  return (
    <div className="w-full self-stretch px-36 py-0 pb-[32px] inline-flex flex-col justify-start items-start gap-12">
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
              />
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col justify-end items-end gap-2.5">
        <ButtonComponent
          color={"#6945ED"}
          buttonText={"Save & Update Profile"}
        />
      </div>
    </div>
  );
};

export default FinalSetup;
