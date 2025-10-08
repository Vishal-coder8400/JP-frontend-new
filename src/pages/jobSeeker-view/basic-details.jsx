import { useState } from "react";
import ButtonComponent from "../../components/common/button";
import CommonForm from "../../components/common/form";
import Navbar from "../../components/recruiter-view/navbar";
import { jobSeekerBasicDetails } from "../../config";
import { useCorporateRegister } from "../../hooks/corporate/useAuth";
import { useUpload } from "../../hooks/common/useUpload";
import { Input } from "../../components/ui/input";
import { setNestedValue, validateFormData } from "../../utils/commonFunctions";
import { GoogleIcon, ResumeSlateIcon } from "../../utils/icon";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import { Textarea } from "../../components/ui/textarea";
import { useRegisterStage1 } from "../../hooks/job-seeker/useAuth";
import { z } from "zod";

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must not exceed 100 characters")
      .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),

    birthDate: z
      .string()
      .min(1, "Birth date is required")
      .refine((date) => {
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 16 && age <= 100;
      }, "Age must be between 16 and 100 years"),

    phone: z.object({
      countryCode: z
        .string()
        .min(1, "Country code is required")
        .regex(
          /^\+\d{1,4}$/,
          "Country code must start with + and contain 1-4 digits"
        ),

      number: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must not exceed 15 digits")
        .regex(/^\d+$/, "Phone number can only contain digits"),
    }),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address")
      .max(255, "Email must not exceed 255 characters"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must not exceed 128 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z.string().min(1, "confirm password field is required"),

    currentAddress: z.object({
      address: z
        .string()
        .min(5, "Address must be at least 5 characters")
        .max(200, "Address must not exceed 200 characters"),

      city: z
        .string()
        .min(2, "City must be at least 2 characters")
        .max(50, "City must not exceed 50 characters")
        .regex(/^[a-zA-Z\s]+$/, "City can only contain letters and spaces"),

      pincode: z
        .string()
        .min(4, "Pincode must be at least 4 characters")
        .max(10, "Pincode must not exceed 10 characters")
        .regex(/^\d+$/, "Pincode can only contain digits"),

      state: z
        .string()
        .min(2, "State must be at least 2 characters")
        .max(50, "State must not exceed 50 characters")
        .regex(/^[a-zA-Z\s]+$/, "State can only contain letters and spaces"),
    }),

    permanentAddress: z.object({
      address: z
        .string()
        .min(5, "Address must be at least 5 characters")
        .max(200, "Address must not exceed 200 characters"),

      city: z
        .string()
        .min(2, "City must be at least 2 characters")
        .max(50, "City must not exceed 50 characters")
        .regex(/^[a-zA-Z\s]+$/, "City can only contain letters and spaces"),

      pincode: z
        .string()
        .min(4, "Pincode must be at least 4 characters")
        .max(10, "Pincode must not exceed 10 characters")
        .regex(/^\d+$/, "Pincode can only contain digits"),

      state: z
        .string()
        .min(2, "State must be at least 2 characters")
        .max(50, "State must not exceed 50 characters")
        .regex(/^[a-zA-Z\s]+$/, "State can only contain letters and spaces"),
    }),

    gender: z.enum(["male", "female", "other"], {
      errorMap: () => ({ message: "Please select a valid gender" }),
    }),

    bio: z
      .string()
      .max(500, "Bio must not exceed 500 characters")
      .optional()
      .or(z.literal("")),

    profilePicture: z
      .string()
      .url("Please provide a valid URL for profile picture")
      .optional()
      .or(z.literal("")),

    resume: z
      .string()
      .url("Please provide a valid URL for resume")
      .optional()
      .or(z.literal("")),

    sameAs: z.boolean(),

    currentWorkingStatus: z.enum(
      ["serving-notice-period", "working", "not-working"],
      {
        errorMap: () => ({ message: "Please select a valid working status" }),
      }
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const BasicDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    phone: {
      countryCode: "",
      number: "",
    },
    email: "",
    password: "",
    currentAddress: {
      address: "",
      city: "",
      pincode: "",
      state: "",
    },
    permanentAddress: {
      address: "",
      city: "",
      pincode: "",
      state: "",
    },
    gender: "",
    bio: "",
    profilePicture: "",
    resume: "",
    sameAs: false,
    currentWorkingStatus: "",
  });
  const [fileName, setFileName] = useState("");
  const { mutate, isPending } = useRegisterStage1();
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
    const payload = { ...formData };
    if (formData.sameAs) {
      payload.permanentAddress = { ...formData.currentAddress };
    }
    const isValid = validateFormData(formSchema, payload);
    if (!isValid) return;
    mutate(payload);
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
    setFormData((prev) => setNestedValue(prev, "resume", ""));
    setFileName("");
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
            onSubmit={onSubmit}
            className="w-full inline-flex flex-col justify-start items-start gap-4"
          >
            <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
              <div className="self-stretch inline-flex justify-start items-start gap-60">
                <div className="justify-start text-gray-900 text-xl font-semibold leading-tight">
                  Basic Information
                </div>
              </div>
              <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
              <div className="w-full flex flex-col gap-[18px]">
                <div className="w-fit cursor-pointer flex items-center gap-[10px] rounded-[6.169px] shadow-[0px_0px_1.851px_0px_rgba(0,0,0,0.08),_0px_1.234px_1.851px_0px_rgba(0,0,0,0.17)] p-[9.253px]">
                  <div className="flex items-center justify-center">
                    <GoogleIcon />
                  </div>
                  <div className="text-sm text-[#0000008A] font-medium">
                    Continue with Google
                  </div>
                </div>
                <div className="flex w-full">
                  <div className="text-base w-[61px] text-center">or</div>
                  <div className="w-full flex justify-center items-center">
                    <div className="border-[#DFDFDF] border-t w-full"></div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <CommonForm
                  formControls={jobSeekerBasicDetails}
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
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch inline-flex justify-start items-center gap-3">
                  <div className="flex justify-start items-start gap-2.5">
                    <div className="justify-start text-gray-900 text-sm font-semibold leading-normal">
                      Current Working Status
                    </div>
                  </div>
                </div>
                <div className="self-stretch inline-flex justify-start items-start gap-2">
                  <div
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        currentWorkingStatus: "working",
                      }))
                    }
                    className={`min-w-[100px] flex-1 px-4 py-2.5 bg-white rounded outline-2 outline-offset-[-1px] ${
                      formData?.currentWorkingStatus === "working"
                        ? "outline-[#6945ED]"
                        : "outline-neutral-200"
                    } flex justify-between items-center gap-2 cursor-pointer min-h-[44px]`}
                  >
                    <span className="text-sm text-neutral-400 truncate whitespace-nowrap overflow-hidden max-w-[80%]">
                      Working
                    </span>

                    {formData?.currentWorkingStatus === "working" && (
                      <div className="w-2 h-2 bg-white rounded-full outline-4 outline-offset-[-2px] outline-[#6945ED]" />
                    )}
                  </div>

                  <div
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        currentWorkingStatus: "serving-notice-period",
                      }))
                    }
                    className={`min-w-[100px] flex-1 px-4 py-2.5 bg-white rounded outline-2 outline-offset-[-1px] ${
                      formData?.currentWorkingStatus === "serving-notice-period"
                        ? "outline-[#6945ED]"
                        : "outline-neutral-200"
                    } flex justify-between items-center gap-2 cursor-pointer min-h-[44px]`}
                  >
                    <span className="text-sm text-neutral-400 truncate whitespace-nowrap overflow-hidden max-w-[80%]">
                      Serving Notice Period
                    </span>

                    {formData?.currentWorkingStatus ===
                      "serving-notice-period" && (
                      <div className="w-2 h-2 bg-white rounded-full outline-4 outline-offset-[-2px] outline-[#6945ED]" />
                    )}
                  </div>

                  <div
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        currentWorkingStatus: "not-working",
                      }))
                    }
                    className={`min-w-[100px] flex-1 px-4 py-2.5 bg-white rounded outline-2 outline-offset-[-1px] ${
                      formData?.currentWorkingStatus === "not-working"
                        ? "outline-[#6945ED]"
                        : "outline-neutral-200"
                    } flex justify-between items-center gap-2 cursor-pointer min-h-[44px]`}
                  >
                    <span className="text-sm text-neutral-400 truncate whitespace-nowrap overflow-hidden max-w-[80%]">
                      Not working
                    </span>

                    {formData?.currentWorkingStatus === "not-working" && (
                      <div className="w-2 h-2 bg-white rounded-full outline-4 outline-offset-[-2px] outline-[#6945ED]" />
                    )}
                  </div>
                </div>
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
                              handleUpload2(
                                file,
                                (uploadedFileUrl, fileName) => {
                                  setFormData((prev) =>
                                    setNestedValue(
                                      prev,
                                      "resume",
                                      uploadedFileUrl
                                    )
                                  );
                                  setFileName(fileName);
                                }
                              );
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
            <div className="self-stretch flex flex-col justify-end items-end gap-2.5">
              <ButtonComponent
                color={"#6945ED"}
                type="submit"
                isPending={isPending}
                buttonText={"Continue"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
