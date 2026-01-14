import { useEffect, useState } from "react";
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
import { ResumeSlateIcon } from "../../../utils/icon";
import Address from "@/components/common/address";
import { useDropDown } from "@/hooks/common/useDropDown";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore";
import { toast } from "react-toastify";

// ======================================================================
// ✅ UPDATED ZOD VALIDATION WITH STRICT RULES
// ======================================================================
const candidateProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[A-Za-z ]+$/, "Name must contain only alphabets"),

  profilePicture: z.string().optional(),

  phone: z.object({
    number: z
      .string()
      .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"), // 🔥 FIXED

    countryCode: z.string().regex(/^\+?[0-9]+$/, "Invalid country code"),
  }),

  email: z.string().email("Invalid email format"),

  dob: z
    .string()
    .min(1, "Date of birth is required")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      const actualAge =
        monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
      return actualAge >= 18;
    }, "You must be at least 18 years old to register"),

  currentAddress: z.object({
    address: z.string().min(1, "Current address is required"),

    city: z.string().regex(/^[A-Za-z ]+$/, "City must contain only alphabets"), // ✔ FIXED

    pincode: z.string().regex(/^[0-9]{6}$/, "Pincode must be exactly 6 digits"), // 🔥 FIXED

    state: z
      .string()
      .regex(/^[A-Za-z ]+$/, "State must contain only alphabets"), // ✔ FIXED
  }),

  summary: z.string().min(1, "Summary is required"),

  permanentAddress: z.object({
    address: z.string().min(1, "Permanent address is required"),

    city: z.string().regex(/^[A-Za-z ]+$/, "City must contain only alphabets"), // ✔ FIXED

    state: z
      .string()
      .regex(/^[A-Za-z ]+$/, "State must contain only alphabets"),

    pincode: z.string().regex(/^[0-9]{6}$/, "Pincode must be exactly 6 digits"), // 🔥 FIXED
  }),

  gender: z.string().min(1, "Gender is required"),
  sameAs: z.boolean(),

  education: z.array(
    z
      .object({
        degree: z
          .string()
          .regex(/^[A-Za-z ]+$/, "Degree must contain only alphabets"), // 🔥 FIXED

        startDate: z.string().optional(),
        endDate: z.string().optional(),
      })
      .refine(
        (data) => {
          if (!data.startDate || !data.endDate) return true;

          const [sMonth, sYear] = data.startDate.split("/").map(Number);
          const [eMonth, eYear] = data.endDate.split("/").map(Number);

          return sYear < eYear || (sYear === eYear && sMonth <= eMonth);
        },
        { message: "Start date cannot be greater than end date" }
      )
  ),

  skills: z.array(z.any()).min(1, "At least one skill is required"),

  resume: z.string().min(1, "Resume is required"),
});

// ======================================================================

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [formErrors, setFormErrors] = useState({});

  // Check if recruiter is approved before allowing candidate creation
  useEffect(() => {
    if (user?.status !== "active") {
      toast.error(
        "Your account must be approved by admin before creating candidates."
      );
      navigate("/recruiter/dashboard");
    }
  }, [user, navigate]);
  const [formData, setFormData] = useState({
    name: "",
    profilePicture: "",
    phone: {
      number: "",
      countryCode: "",
    },
    email: "",
    dob: "",
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
        startDate: "",
        endDate: "",
      },
    ],
    skills: [],
    otherSkills: "",
    resume: "",
  });

  const [fileName, setFileName] = useState("");
  const { mutate, isPending } = useCreateApplicant();
  const { mutate: UploadImage } = useUpload();
  const { data: skillOptions } = useDropDown("skills");

  const updatedFields = candiadateCreationformControls.map((field) =>
    field.name === "skills"
      ? {
          ...field,
          options: skillOptions?.data?.values.map((skill) => ({
            id: skill._id,
            label: skill.label,
          })),
        }
      : field
  );

  const onSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem("seekerID");

    let payLoad = { ...formData };

    if (formData.sameAs) {
      payLoad = {
        ...formData,
        permanentAddress: {
          ...formData.currentAddress,
        },
      };
    }

    if (formData.skills.length > 0) {
      payLoad.skills = formData.skills.map((skill) => skill.id);
    }

    const { isValid, errors } = validateFormData(
      candidateProfileSchema,
      payLoad
    );

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    mutate(payLoad);
  };

  const handleUpload = (file, callback) => {
    UploadImage(file, {
      onSuccess: (data) => {
        const fileUrl = data?.data?.fileUrl;
        const fileName = data?.data?.fileName;
        if (callback) callback(fileUrl, fileName);
      },
    });
  };

  const handleUpload2 = (file, callback) => {
    UploadImage(file, {
      onSuccess: (data) => {
        const fileUrl = data?.data?.fileUrl;
        const fileName = data?.data?.fileName;
        if (callback) callback(fileUrl, fileName);
      },
    });
  };

  const handleRemoveFile = () => {
    setFormData((prev) => setNestedValue(prev, "resume", ""));
    setFileName("");
  };

  useEffect(() => {
    if (localStorage.getItem("seekerID")) {
      navigate(`/recruiter/candidates/relevent-details`);
    }
  }, [navigate]);

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
                formControls={updatedFields}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
                errors={formErrors}
                showSerialNumber={true}
              />
              {/* other Skills Input */}
            <div className="w-full flex flex-col gap-2 pt-2">
              <Label className="text-sm font-semibold text-gray-900">
                Other Skills (Optional)
              </Label>
              <Input
                type="text"
                placeholder="Enter skills separated by commas (e.g., React, Node.js, Python)"
                value={formData.otherSkills || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    otherSkills: e.target.value,
                  }))
                }
                className="flex placeholder:translate-y-[1px] items-center justify-center text-black text-base focus:outline-none focus-visible:ring-0 focus:border-1 focus:border-black rounded-[4px] border-s-1 border-[#E2E2E2] py-[10px] px-[16px] placeholder:text-[#9B959F]"
              />
              <p className="text-xs text-gray-500">
                Add skills that are not available in the dropdown above
              </p>
            </div>
            </div>

            <Address formData={formData} setFormData={setFormData} />

            

            <div className="w-full">
              {formData.education.map((item, index) => (
                <div key={index} className="mb-4">
                 
                  <CommonForm
                    formControls={highestQualification}
                    formData={formData}
                    setFormData={setFormData}
                    i={index}
                    disabled={false}
                    formType={"education"}
                    errors={formErrors}
                 
                  />
                </div>
              ))}
            </div>

            {/* =============================== 
                Resume Upload
            =============================== */}
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
                          e.stopPropagation();
                          if (fileName !== "") handleRemoveFile();
                        }}
                        className={`flex-1 px-4 py-2.5 ${
                          fileName ? "bg-[#e64d4d]" : "bg-[#6945ED1A]"
                        } rounded-[100px] shadow-[0px_1px_2px_0px_rgba(5,32,81,0.05)] outline-1 outline-offset-[-1px] outline-white flex justify-center items-center gap-2.5 cursor-pointer`}
                      >
                        <div
                          className={`justify-center ${
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
                            if (file.type !== "application/pdf") {
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
                      Format: pdf &amp; Max file size: 5 MB
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
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
