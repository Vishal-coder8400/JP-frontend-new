import { useRef, useState } from "react";
import CommonForm from "../../components/common/form";
import { basicInformation, recruiterSignUp } from "../../config";
import { Slate, Upload } from "../../utils/icon";
import { useRegister } from "../../hooks/recruiter/useAuth";
import { z } from "zod";
import { setNestedValue, validateFormData } from "../../utils/commonFunctions";
import ButtonComponent from "../../components/common/button";
import { useUpload } from "../../hooks/common/useUpload";
import { Input } from "../../components/ui/input";
import { X } from "lucide-react";
import Navbar from "../../components/recruiter-view/navbar";

export const formSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z.string().min(1, "Confirm password field is required"),

    // 🟢 Profile image is optional now
    profileImage: z
      .string()
      .optional()
      .refine((val) => !val || /^https?:\/\/\S+$/.test(val), {
        message: "Must be a valid URL",
      }),

    phone: z.object({
      number: z.union([
        z.string().regex(/^\d{10}$/, {
          message: "Phone number must be a 10-digit string",
        }),
        z.number().refine((val) => val.toString().length === 10, {
          message: "Phone number must be 10 digits",
        }),
      ]),
      countryCode: z
        .string({
          required_error: "Country code is required",
          invalid_type_error: "Country code must be a string",
        })
        .min(1, { message: "Country code cannot be empty" }),
    }),

    currentAddress: z.object({
      address: z.string().min(1, "Current address is required"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      pincode: z.string().min(1, "Pincode is required"),
    }),

    resume: z.string().min(1, "Resume is Required").url("Must be a valid URL"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
const BasicDetails = () => {
  const fileInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profileImage: "",
    phone: {
      number: 0,
      countryCode: "",
    },
    currentAddress: {
      address: "",
      city: "",
      pincode: "",
      state: "",
    },
    resume: "",
  });
  const [fileName, setFileName] = useState("");

  const { mutate, isPending } = useRegister();
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

  const onSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors } = validateFormData(formSchema, formData);
    if (!isValid) {
      setErrorMessage(errors);
      return;
    }

    setErrorMessage({});
    mutate(formData);
  };
  const handleRemoveFile = () => {
    setFormData(
      (prev) => setNestedValue(prev, "resume", "") // Clear uploaded file URL
    );
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <div className="w-full self-stretch px-[20px] py-[20px] lg:px-36 lg:py-[0px] lg:pb-[32px] inline-flex flex-col justify-start items-start gap-[18px] lg:gap-7">
      <Navbar onlySupport={true} />
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
                  errors={errorMessage}
                />
              </div>
            </div>
            <div
              className={`relative cursor-pointer p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] ${
                errorMessage["resume"] ? "outline-red-300" : "outline-zinc-300"
              } inline-flex flex-col justify-start items-start gap-4`}
            >
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
                    <>
                      <Upload className="h-full w-full" />
                      <span className="text-red-500 text-[14px]">*</span>
                    </>
                  )}
                </div>
                {!fileName && (
                  <div>
                    <Input
                      ref={fileInputRef}
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
                  handleUpload={handleUpload}
                  errors={errorMessage}
                />
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-end items-end gap-2.5">
              <ButtonComponent
                type="submit"
                isPending={isPending}
                color={"#6945ED"}
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
