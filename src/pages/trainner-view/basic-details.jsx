import { useState } from "react";
import ButtonComponent from "../../components/common/button";
import CommonForm from "../../components/common/form";
import Navbar from "../../components/recruiter-view/navbar";
import {
  jobSeekerBasicDetails,
  kycBankFormControls,
  trainerFormControls1,
} from "../../config";
import { useCorporateRegister } from "../../hooks/corporate/useAuth";
import { useUpload } from "../../hooks/common/useUpload";
import { Input } from "../../components/ui/input";
import { setNestedValue } from "../../utils/commonFunctions";
import { GoogleIcon, ResumeSlateIcon } from "../../utils/icon";

const BasicDetails = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    phone: {
      countryCode: "",
      number: "",
    },
    email: "",
    password: "",
    currentAddress: {
      city: "",
      pincode: "",
    },
    permanentAddress: "",
    gender: "",
    languages: [],
    bio: "",
    profilePicture: "",
    identityCard: "",
    nationality: "",
  });
  ("");
  const [fileName, setFileName] = useState("");
  const { mutate, isPending, isError, error } = useCorporateRegister();
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
  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = validateFormData(formDataSchema, formData);
    if (!isValid) return;
    mutate(formData);
  };
  const handleUpload2 = (file, callback) => {
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
  const handleRemoveFile = () => {
    setFormData(
      (prev) => setNestedValue(prev, "resume", "") // Clear uploaded file URL
    );
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    } // Clear file name
  };
  return (
    <div className="w-full self-stretch px-[20px] py-[20px] lg:px-36 lg:py-[0px] lg:pb-[32px] inline-flex flex-col justify-start items-start gap-[18px] lg:gap-7">
      <Navbar onlySupport={true} />
      <div className="w-full flex flex-col justify-start items-start gap-8">
        <div className="flex flex-col justify-start items-start gap-7">
          <div className="justify-start text-gray-900 text-md2 lg:text-3xl font-bold leading-loose">
            Tell us a bit about yourself
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-8">
        <div className="justify-start text-gray-900 text-base lg:text-xl font-bold leading-tight">
          Let's get started – You're 20% there!
        </div>
        <div className="self-stretch inline-flex justify-start items-start gap-2">
          <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
          <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
          <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
          <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
          <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
        </div>
      </div>
      <div className="w-full self-stretch flex flex-col justify-start items-start gap-10">
        <div className="self-stretch inline-flex justify-start items-start gap-2.5">
          <form
            // onSubmit={onSubmit}
            className="w-full inline-flex flex-col justify-start items-start gap-4"
          >
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
              <div className="self-stretch inline-flex justify-start items-start gap-60">
                <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
                  Basic Information
                </div>
              </div>
              <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
              <div className="w-full">
                <CommonForm
                  formControls={trainerFormControls1}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>

              <div className="self-stretch flex flex-col justify-start items-start gap-10">
                <div className="inline-flex justify-start items-start gap-2.5">
                  <div className="justify-start text-gray-900 text-base font-semibold leading-normal">
                    Upload Resume
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-center items-center gap-4">
                  <div className="self-stretch h-32 relative bg-white rounded-lg outline-[1.50px] outline-offset-[-1.50px] outline-gray-200 overflow-hidden">
                    <div className="lg:left-1/2 lg:top-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute inline-flex flex-col justify-start items-center gap-1">
                      <ResumeSlateIcon />
                      <div className="justify-start text-gray-900 lg:text-base text-sm font-medium leading-normal">
                        {fileName ? fileName : "No files Uploaded yet!"}
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col justify-start items-center gap-2">
                    <div className="relative w-60 inline-flex justify-start items-start">
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation(); // stops file dialog from opening
                          if (fileName !== "") handleRemoveFile();
                        }}
                        className={`flex-1 px-4 py-2.5 ${
                          fileName ? "bg-[#e64d4d]" : "bg-[#6945ED1A]"
                        } rounded-[100px] shadow-[0px_1px_2px_0px_rgba(5,32,81,0.05)] outline-1 outline-offset-[-1px] outline-white flex justify-center items-center gap-2.5 cursor-pointer`}
                      >
                        <div
                          className={`justify-center   ${
                            fileName ? "text-[#fff]" : "text-[#6945ED]"
                          } text-base font-semibold leading-normal`}
                        >
                          {fileName ? "Delete" : "Upload"}
                        </div>
                      </div>
                      {!fileName && (
                        <Input
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
                      )}
                    </div>
                    <div className="justify-start text-stone-500 text-sm font-normal leading-tight">
                      Format: pdf & Max file size: 5 MB
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
              <div className="self-stretch inline-flex justify-start items-start gap-60">
                <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
                  KYC Verification
                </div>
              </div>
              <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
              <div className="w-full">
                <CommonForm
                  formControls={kycBankFormControls}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-end items-end gap-2.5">
              <ButtonComponent
                isPending={isPending}
                buttonText={"Save & Update Profile"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
