import { Upload, X } from "lucide-react";
import ButtonComponent from "../../components/common/button";
import CommonForm from "../../components/common/form";
import {
  basicInformation,
  KycVerificationDetails,
  referenceFields,
  sectoralFieldsForm,
  sectoralFieldsForm2,
} from "../../config";
import { Input } from "../../components/ui/input";
import { setNestedValue } from "../../utils/commonFunctions";
import { Slate } from "../../utils/icon";
import { useSectorOptions } from "../../hooks/recruiter/useSectoralOption";
import { useState } from "react";
import useAuthStore from "../../stores/useAuthStore";

const EditProfile = ({
  handleRemoveFile,
  handleUpload,
  handleUpload2,
  fileName,
  setFileName,
}) => {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState(user);
  const { data: sectorOptions = [], isLoading, error } = useSectorOptions();
  const updatedFields = sectoralFieldsForm.map((field) =>
    field.name === "sectorSpecialization"
      ? { ...field, options: sectorOptions }
      : field
  );
  return (
    <div className="min-h-screen overflow-y-auto bg-white">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Edit Recruiter Profile
          </h2>
          <p className="text-gray-600 mt-1">Update Recruiter Information</p>
        </div>
        <div className="w-full self-stretch flex flex-col justify-start items-start gap-10">
          <div className="self-stretch inline-flex justify-start items-start gap-2.5">
            <form
              //   onSubmit={onSubmit}
              className="w-full inline-flex flex-col justify-start items-start gap-4"
            >
              <div className="relative cursor-pointer p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-4">
                <div className="self-stretch inline-flex justify-center items-center gap-5">
                  <div className="w-4 h-4 relative overflow-hidden flex justify-center items-center">
                    <Slate className="h-full w-full" />
                  </div>
                  <div className="justify-start text-gray-900 text-sm font-semibold leading-none">
                    {fileName ? fileName : "Upload Resume"}
                  </div>
                  <div className="w-4 h-4 relative overflow-hidden flex justify-center items-center">
                    {fileName ? (
                      <X
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation(); // stops file dialog from opening
                          if (fileName !== "") handleRemoveFile();
                        }}
                        className="h-[15px] w-[15px] text-red-500 cursor-pointer"
                      />
                    ) : (
                      <Upload className="h-full w-full" />
                    )}
                  </div>
                  {!fileName && (
                    <div>
                      <Input
                        // ref={fileInputRef}
                        type="file"
                        accept="application/pdf"
                        className="absolute inset-0 opacity-0 cursor-pointer z-0 h-full w-full"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const isValidSize = file.size <= 5 * 1024 * 1024;
                          if (!file.type === "application/pdf") {
                            alert("Only PDF files are allowed.");
                            return;
                          }

                          if (!isValidSize) {
                            alert("File must be smaller than 5MB.");
                            return;
                          }
                          handleUpload2(file, (uploadedFileUrl, fileName) => {
                            setFormData((prev) =>
                              setNestedValue(prev, "resume", uploadedFileUrl)
                            );
                            setFileName(fileName);
                          });
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
                <div className="w-full">
                  <CommonForm
                    formControls={basicInformation}
                    formData={formData}
                    setFormData={setFormData}
                    handleUpload={handleUpload}
                  />
                </div>
                <div className="w-full">
                  <CommonForm
                    formControls={KycVerificationDetails}
                    formData={formData}
                    setFormData={setFormData}
                    handleUpload={handleUpload}
                  />
                </div>
                <div className="w-full">
                  <CommonForm
                    formControls={updatedFields}
                    formData={formData}
                    setFormData={setFormData}
                    handleUpload={handleUpload}
                  />
                </div>
                <div className="w-full flex flex-col gap-[18px]">
                  <CommonForm
                    formControls={sectoralFieldsForm2}
                    formData={formData}
                    setFormData={setFormData}
                    handleUpload={handleUpload}
                  />
                  {formData?.references?.map((item, index) => (
                    <CommonForm
                      key={index}
                      i={index}
                      formControls={referenceFields}
                      formData={formData}
                      setFormData={setFormData}
                      formType={"references"}
                    />
                  ))}
                </div>
              </div>

              <div className="self-stretch flex flex-col justify-end items-end gap-2.5">
                <ButtonComponent
                  //   isPending={isPending}
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
