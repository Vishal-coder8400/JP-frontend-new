import { useRef, useState } from "react";
import CommonForm from "../../common/form";
import {
  candiadateCreationformControls,
  highestQualification,
} from "../../../config";
import { useCreateApplicant } from "../../../hooks/recruiter/useApplicant";
import { z } from "zod";
import {
  setNestedValue,
  validateFormData,
} from "../../../utils/commonFunctions";
import ButtonComponent from "../../common/button";
import { useUpload } from "../../../hooks/common/useUpload";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Checkbox } from "../../ui/checkbox";
import { ResumeSlateIcon } from "../../../utils/icon";

const educationSchema = z
  .object({
    degree: z.string().min(1, "Degree is required"),
    institution: z.string(),
    studyType: z.string(),
    startDate: z
      .string()
      .min(1, "Start date is required")
      .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Start date must be in MM/YY format"),
    endDate: z
      .string()
      .min(1, "End date is required")
      .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "End date must be in MM/YY format"),
  })
  .refine(
    (data) => {
      const parseDate = (str) => {
        const [month, year] = str.split("/").map(Number);
        const fullYear = year >= 50 ? 1900 + year : 2000 + year;
        return new Date(fullYear, month - 1);
      };

      try {
        const start = parseDate(data.startDate);
        const end = parseDate(data.endDate);
        return start <= end;
      } catch {
        return false;
      }
    },
    {
      message: "Start date must be before or equal to end date",
      path: ["startDate"],
    }
  );

const formDataSchema = z.object({
  name: z.string().min(1, "Name is required"),

  profilePicture: z
    .string()
    .min(1, "Profile Image is Required")
    .url("Profile picture must be a valid URL"),

  phone: z.object({
    number: z
      .string()
      .min(10, "Phone number must be 10 digits")
      .max(10, "Phone number must be 10 digits")
      .regex(/^\d+$/, "Phone number must contain only digits"),
    countryCode: z.string().min(1, "Country code is required"),
  }),

  email: z.string().email("Email must be valid"),

  currentAddress: z.object({
    address: z.string().min(1, "Current address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z
      .string()
      .min(6, "Pincode must be 6 digits")
      .max(6, "Pincode must be 6 digits")
      .regex(/^\d+$/, "Pincode must contain only digits"),
  }),
  permanentAddress: z.object({
    address: z.string().min(1, "Permanent address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z
      .string()
      .min(6, "Pincode must be 6 digits")
      .max(6, "Pincode must be 6 digits")
      .regex(/^\d+$/, "Pincode must contain only digits"),
  }),

  gender: z.string().min(1, "Gender is required"),

  education: z
    .array(educationSchema)
    .min(1, "At least one education record is required"),

  // currentWorkingStatus: z.string().min(1, "Current working status is required"),
  summary: z.string().min(1, "Summary is Required"),

  resume: z
    .string()
    .min(1, "Resume is Required")
    .url("Resume must be a valid URL"),
});

const Index = () => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    profilePicture: "",
    phone: {
      number: "",
      countryCode: "",
    },
    email: "",
    currentAddress: {
      address: "",
      city: "",
      pincode: "",
      state: "",
    },
    summary: "",
    permanentAddress: {
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
    gender: "",
    sameAs: false,
    education: [
      {
        degree: "",
        institution: "",
        studyType: "",
        startDate: "",
        endDate: "",
      },
    ],
    // currentWorkingStatus: "",
    resume: "",
  });
  const [fileName, setFileName] = useState("");

  const { mutate, isPending } = useCreateApplicant();
  const { mutate: UploadImage } = useUpload();
  const onSubmit = (e) => {
    localStorage.removeItem("seekerID");
    e.preventDefault();
    let payLoad = { ...formData };
    if (formData.sameAs) {
      payLoad = {
        ...formData,
        permanentAddress: {
          ...formData.permanentAddress,
          address: formData.currentAddress.address,
          city: formData.currentAddress.city,
          state: formData.currentAddress.state,
          pincode: formData.currentAddress.pincode,
        },
      };
    }
    const isValid = validateFormData(formDataSchema, payLoad);
    if (!isValid) return;

    mutate(payLoad);
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
  };
  return (
    <div className="w-full self-stretch lg:px-36 lg:py-20 p-[20px] lg:pt-0 inline-flex flex-col justify-start items-end lg:gap-10 gap-[15px]">
      <div className="w-full inline-flex justify-start items-start gap-8">
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-7">
          <div className="self-stretch justify-start text-gray-900 lg:text-3xl text-lg font-bold leading-loose">
            Candidate Creation
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-10">
        <form
          onSubmit={onSubmit}
          className="self-stretch flex flex-col justify-start items-start gap-10"
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
                formControls={candiadateCreationformControls}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
            <div className="w-full flex flex-col gap-[18px]">
              <div className="flex flex-col gap-[8px] relative">
                <div className="absolute top-0 right-0 flex items-center gap-2">
                  <Checkbox
                    onCheckedChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        sameAs: !formData.sameAs,
                      }))
                    }
                    className="data-[state=checked]:text-white data-[state=checked]:bg-[#6945ED] h-[16px] w-[16px] rounded-[2px] flex items-center justify-center cursor-pointer"
                  />
                  <span className="text-xs font-medium">
                    Same as Current Address?
                  </span>
                </div>
                <Label className="text-base text-[#20102B] font-semibold">
                  Permanent Address
                </Label>
                <Textarea
                  disabled={formData?.sameAs}
                  value={
                    formData?.sameAs
                      ? formData?.currentAddress?.address
                      : formData?.permanentAddress?.address
                  }
                  row={4}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      permanentAddress: {
                        ...prev.permanentAddress,
                        address: e.target.value,
                      },
                    }))
                  }
                  placeholder="Enter Permanent address"
                  className="flex placeholder:translate-y-[1px] items-center justify-center text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[10px] px-[16px] placeholder:text-[#9B959F]"
                />
              </div>
              <div className="flex gap-[8px] flex-wrap justify-end items-end">
                <Input
                  value={
                    formData?.sameAs
                      ? formData?.currentAddress?.city
                      : formData?.permanentAddress?.city
                  }
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      permanentAddress: {
                        ...prev.permanentAddress,
                        city: e.target.value,
                      },
                    }))
                  }
                  disabled={formData?.sameAs}
                  placeholder="Enter City"
                  className=" flex-1 placeholder:translate-y-[1px] text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[10px] px-[16px] placeholder:text-[#9B959F]"
                />
                <Input
                  value={
                    formData?.sameAs
                      ? formData?.currentAddress?.state
                      : formData?.permanentAddress?.state
                  }
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      permanentAddress: {
                        ...prev.permanentAddress,
                        state: e.target.value,
                      },
                    }))
                  }
                  disabled={formData?.sameAs}
                  placeholder="Enter State"
                  className="flex-1 placeholder:translate-y-[1px] text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[10px] px-[16px] placeholder:text-[#9B959F]"
                />
                <Input
                  value={
                    formData?.sameAs
                      ? formData?.currentAddress?.pincode
                      : formData?.permanentAddress?.pincode
                  }
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      permanentAddress: {
                        ...prev.permanentAddress,
                        pincode: e.target.value,
                      },
                    }))
                  }
                  disabled={formData?.sameAs}
                  placeholder="Enter Pincode"
                  className="flex-1 placeholder:translate-y-[1px] text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[10px] px-[16px] placeholder:text-[#9B959F]"
                />
              </div>
            </div>
            <div className="w-full">
              {formData.education.map((item, index) => (
                <CommonForm
                  formControls={highestQualification}
                  formData={formData}
                  setFormData={setFormData}
                  key={index}
                  i={index}
                  disabled={false}
                  formType={"education"}
                />
              ))}
            </div>

            <div className="self-stretch flex flex-col justify-start items-start gap-10">
              <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
                <div className="inline-flex justify-start items-start gap-2.5">
                  <div className="justify-start text-gray-900 text-sm font-semibold leading-normal">
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
                          ref={fileInputRef}
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
          </div>
          <div className="self-stretch flex flex-col justify-start items-end gap-10">
            <ButtonComponent
              color={"#6945ED"}
              isPending={isPending}
              buttonText={"Continue"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
