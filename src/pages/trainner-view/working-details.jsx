import { useState } from "react";
import Navbar from "../../components/recruiter-view/navbar";
import CommonForm from "../../components/common/form";
import ButtonComponent from "../../components/common/button";
import { experienceFormControls } from "../../config";
import { useGetTrainerProgress } from "../../hooks/trainer/useProfile";
import { useUpload } from "../../hooks/common/useUpload";
import { z } from "zod";
import { validateFormData } from "../../utils/commonFunctions";
import { useTrainerRegisterationStage3 } from "../../hooks/trainer/useAuth";
import useAuthStore from "../../stores/useAuthStore";

export const experienceSchema = z.object({
  expertiseLevel: z.string().min(1, "Expertise level is required"),

  totalYearsExperience: z
    .string()
    .regex(/^\d+$/, "Years must be a number")
    .optional(),

  totalMonthsExperience: z
    .string()
    .regex(/^\d+$/, "Months must be a number")
    .optional(),

  linkedin: z.string().url("Please enter a valid LinkedIn URL").optional(),

  WorkingDetails: z
    .object({
      companyName: z.string().min(1, "Company name is required"),
      designation: z.string().min(1, "Designation is required"),
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
    })
    .refine(
      (data) =>
        new Date(data.endDate).getTime() >= new Date(data.startDate).getTime(),
      {
        path: ["endDate"],
        message: "End date must be after start date",
      }
    ),

  relievingLetter: z.string().optional(), // can be file path or base64

  expertiseAreas: z
    .array(z.string().min(1))
    .min(1, "Select at least one area of expertise"),
});

const WorkingDetails = () => {
  const { mutate: UploadImage } = useUpload();
  const [formData, setFormData] = useState({
    expertiseLevel: "",
    totalYearsExperience: "",
    totalMonthsExperience: "",
    linkedin: "",
    WorkingDetails: {
      companyName: "",
      designation: "",
      startDate: "",
      endDate: "",
    },
    relievingLetter: "",
    expertiseAreas: [],
  });
  const { mutate, isPending } = useTrainerRegisterationStage3();
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
    const isValid = validateFormData(experienceSchema, formData);
    if (!isValid) return;
    mutate(formData);
  };
  const { data: profileProgress } = useGetTrainerProgress();
  const { user } = useAuthStore();
  console.log(user);
  return (
    <div className="w-full self-stretch px-[20px] py-[20px] lg:px-36 lg:py-[0px] lg:pb-[32px] inline-flex flex-col justify-start items-start gap-[18px] lg:gap-7">
      <Navbar onlySupport={true} />
      <div className="w-full flex flex-col justify-start items-start gap-8">
        <div className="flex flex-col justify-start items-start gap-7">
          <div className="justify-start text-gray-900 text-md2 lg:text-3xl font-bold leading-loose">
            Add your relevant work experience
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-8">
        <div className="justify-start text-gray-900 text-base lg:text-xl font-bold leading-tight">
          Halfway through! You're {profileProgress?.data?.signupProgress}% done
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
                  Professional Details
                </div>
              </div>
              <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
              <div className="w-full">
                <CommonForm
                  formControls={experienceFormControls}
                  formData={formData}
                  setFormData={setFormData}
                  handleUpload={handleUpload}
                />
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

export default WorkingDetails;
