import ButtonComponent from "../../components/common/button";
import CommonForm from "../../components/common/form";
import {
  basicCorporateInformationUpdate,
  basicInformationControls,
  corporateFormControls,
  formControlsBankDetails,
  formControlsForIndividual,
  spocInformationControls,
} from "../../config";
import { useEffect, useState } from "react";
import useAuthStore from "../../stores/useAuthStore";
import { useUpdateCorporateProfile } from "../../hooks/corporate/useProfile";
import { useUpload } from "../../hooks/common/useUpload";
import { transformCompanyData } from "@/utils/commonFunctions";

const EditProfile = ({ setIsEditOpen }) => {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState(user);
  const { mutate: UploadImage } = useUpload();
  const { mutate: updateProfile, isPending } = useUpdateCorporateProfile();
  useEffect(() => {
    if (!user) return;
    const reshaped = transformCompanyData(user);
    setFormData(reshaped);
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditOpen(false);
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
    <div className="min-h-screen overflow-y-auto bg-white">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Edit Corporate Profile
          </h2>
          <p className="text-gray-600 mt-1">Update Corporate Information</p>
        </div>
        <div className="w-full self-stretch flex flex-col justify-start items-start gap-10">
          <div className="self-stretch inline-flex justify-start items-start gap-2.5">
            <form
              onSubmit={onSubmit}
              className="w-full inline-flex flex-col justify-start items-start gap-4"
            >
              <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
                <div className="w-full">
                  <CommonForm
                    formControls={basicCorporateInformationUpdate}
                    formData={formData}
                    setFormData={setFormData}
                    handleUpload={handleUpload}
                  />
                </div>
                <div className="w-full">
                  <CommonForm
                    formControls={basicInformationControls}
                    formData={formData}
                    setFormData={setFormData}
                    handleUpload={handleUpload}
                  />
                </div>
                <div className="w-full">
                  <CommonForm
                    formControls={spocInformationControls}
                    formData={formData}
                    setFormData={setFormData}
                    handleUpload={handleUpload}
                  />
                </div>
                <div className="w-full flex flex-col gap-[18px]">
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
                <div className="w-full">
                  <CommonForm
                    formControls={formControlsBankDetails}
                    formData={formData}
                    setFormData={setFormData}
                  />
                </div>
              </div>

              <div className="self-stretch flex flex-col justify-end items-end gap-2.5">
                <ButtonComponent
                  type="submit"
                  isPending={isPending}
                  color={"#6945ED"}
                  buttonText={"Save & Update Profile"}
                />
              </div>
            </form>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default EditProfile;
