import { useState } from "react";
import CommonForm from "../../components/common/form";
import Navbar from "../../components/recruiter-view/navbar";
import { jobSeekerEducationFormControls } from "../../config";
import ButtonComponent from "../../components/common/button";
import { useJobseekerProfileProgress } from "../../hooks/job-seeker/useProfile";
import { z } from "zod";
import { useRegisterStage2 } from "../../hooks/job-seeker/useAuth";
import { validateFormData } from "../../utils/commonFunctions";
import { useUpload } from "../../hooks/common/useUpload";

export const formSchema = z.object({
  education: z
    .array(
      z.object({
        degree: z.string().min(1, "Degree is required"),
        institution: z.string().min(1, "Institution is required"),
        studyType: z.string().min(1, "Study type is required"),
        startDate: z
          .string()
          .refine(
            (val) => !isNaN(new Date(val).getTime()),
            "Start date must be a valid date"
          ),
        endDate: z
          .string()
          .refine(
            (val) => !isNaN(new Date(val).getTime()),
            "End date must be a valid date"
          ),
        document: z.string().optional(), // can be file path or base64
        fieldOfStudy: z.string().min(1, "Field of study is required"),
      })
    )
    .min(1, "At least one education entry is required"),
});

const EducationDetails = () => {
  const { data: profileProgress } = useJobseekerProfileProgress();
  const { mutate, isPending } = useRegisterStage2();
  const { mutate: UploadImage } = useUpload();
  const [formData, setFormData] = useState({
    education: [
      {
        degree: "",
        institution: "",
        studyType: "",
        startDate: "",
        endDate: "",
        document: "",
        fieldOfStudy: "",
      },
    ],
  });
  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = validateFormData(formSchema, formData);
    if (!isValid) return;
    mutate(formData);
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
    <div className="w-full self-stretch px-[20px] py-[20px] lg:px-36 lg:py-[0px] lg:pb-[32px] inline-flex flex-col justify-start items-start gap-[18px] lg:gap-7">
      <Navbar onlySupport={true} />
      <div className="w-full flex flex-col justify-start items-start gap-8">
        <div className="flex flex-col justify-start items-start gap-7">
          <div className="justify-start text-gray-900 text-md2 lg:text-3xl font-bold leading-loose">
            Tell us about your educational background
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-8">
        <div className="justify-start text-gray-900 text-base lg:text-xl font-bold leading-tight">
          Nice! You're {profileProgress?.data?.signupProgress}% done
        </div>
        <div className="self-stretch inline-flex justify-start items-start gap-2">
          {Array.from({
            length: profileProgress?.data?.totalStages,
          }).map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-2 ${
                profileProgress?.data?.completedStages.includes(index + 1)
                  ? "bg-lime-600"
                  : "bg-zinc-300"
              } rounded-xl`}
            />
          ))}
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
                  Education
                </div>
              </div>
              <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
              <div className="w-full">
                {formData?.education?.map((_, index) => (
                  <CommonForm
                    formControls={jobSeekerEducationFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    key={index}
                    i={index}
                    formType={"education"}
                    handleUpload={handleUpload}
                  />
                ))}
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-end items-end gap-2.5">
              <ButtonComponent
                isPending={isPending}
                color={"#6945ED"}
                buttonText={"Save & Update Profile"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EducationDetails;
