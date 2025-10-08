import { useState } from "react";
import CommonForm from "../../components/common/form";
import {
  trainingAddress,
  trainingController1,
  trainingController2,
  trainingController3,
  trainingController4,
  trainingMode,
} from "../../config";
import Navbar from "../../components/recruiter-view/navbar";
import { PostTrainingIcon } from "../../utils/icon";
import { useCorporateTrainingPost } from "../../hooks/corporate/useTraining";
import { validateFormData } from "../../utils/commonFunctions";
import ButtonComponent from "../../components/common/button";
import { z } from "zod";
import { useUpload } from "../../hooks/common/useUpload";

export const TrainingSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  skills: z.array(z.string()).default([]),

  // mode/frequency as free strings — change to z.enum([...]) if you have fixed options
  trainingMode: z.string().optional().nullable().default(""),
  sessionFrequency: z.string().optional().nullable().default(""),

  // numeric fields — ints where applicable, non-negative
  totalDurationDays: z.number().int().nonnegative().default(0),
  hoursPerDay: z.number().nonnegative().default(0),

  minimumExperience: z.string().optional().nullable().default(""),
  subjectMatterExpertise: z.string().optional().nullable().default(""),

  sessionsExpected: z.number().int().nonnegative().default(0),

  travelRequired: z.boolean().default(false),
  languagesFluent: z.array(z.string()).default([]),

  participantsPerBatch: z.number().int().nonnegative().default(0),

  studyMaterialsProvided: z.boolean().default(false),
  demoSessionBeforeConfirming: z.boolean().default(false),
});

const TrainningPosting = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: [],
    trainingMode: "",
    sessionFrequency: "",
    totalDurationDays: 0,
    hoursPerDay: 0,
    minimumExperience: "",
    subjectMatterExpertise: "",
    sessionsExpected: 0,
    certificationUploadRequired: "",
    travelRequired: false,
    languagesFluent: [],
    participantsPerBatch: 0,
    studyMaterialsProvided: false,
    demoSessionBeforeConfirming: false,
    budgetPerSession: "",
  });
  const { mutate, isPending, isError, error } = useCorporateTrainingPost();
  const { mutate: UploadImage } = useUpload();

  const onSubmit = (e) => {
    e.preventDefault();
    let payload = { ...formData };
    payload.hoursPerDay = formData.hoursPerDay
      ? parseInt(formData.hoursPerDay)
      : 0;
    payload.participantsPerBatch = formData.participantsPerBatch
      ? parseInt(formData.participantsPerBatch)
      : 0;
    payload.totalDurationDays = formData.totalDurationDays
      ? parseInt(formData.totalDurationDays)
      : 0;
    const booleanFields = [
      "travelRequired",
      "studyMaterialsProvided",
      "demoSessionBeforeConfirming",
      "recommendationsFromPastClients",
    ];
    booleanFields.forEach((field) => {
      payload[field] = formData[field] === "yes";
    });
    const isValid = validateFormData(TrainingSchema, payload);
    if (!isValid) return;
    mutate(payload);
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
  // console.log(formData);
  return (
    <div className="w-full self-stretch px-36 py-0 pb-[32px] inline-flex flex-col justify-start items-start gap-5">
      <Navbar onlySupport={false} />
      <div className="w-full flex flex-col justify-start items-start gap-8">
        <div className="self-stretch flex flex-col justify-start items-start gap-7">
          <div className="self-stretch justify-start text-gray-900 text-3xl font-bold leading-loose">
            Post Trainings
          </div>
        </div>
      </div>
      <div className="w-full inline-flex justify-start items-start gap-7">
        <div className="size- p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-4">
          <div className="self-stretch inline-flex justify-center items-center gap-5">
            <PostTrainingIcon />
            <div className="justify-start">
              <span class="text-gray-900 text-sm font-semibold leading-tight">
                Training Program <br />
              </span>
              <span class="text-gray-900 text-sm font-normal leading-tight">
                For internship, skill development, corporate training
              </span>
            </div>
          </div>
        </div>
      </div>
      <form
        onSubmit={onSubmit}
        className="self-stretch inline-flex justify-start items-start gap-10"
      >
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-10">
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
            <CommonForm
              formControls={trainingController1}
              formData={formData}
              setFormData={setFormData}
              handleUpload={handleUpload}
            />
            <CommonForm
              formControls={trainingMode}
              formData={formData}
              setFormData={setFormData}
              handleUpload={handleUpload}
            />
            {formData?.trainingMode === "In-person / On-site" ||
            formData.trainingMode === "Hybrid" ? (
              <CommonForm
                formControls={trainingAddress}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            ) : null}
            <CommonForm
              formControls={trainingController2}
              formData={formData}
              setFormData={setFormData}
              handleUpload={handleUpload}
            />
          </div>
        </div>
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-10">
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
            <CommonForm
              formControls={trainingController3}
              formData={formData}
              setFormData={setFormData}
              handleUpload={handleUpload}
            />
            <CommonForm
              formControls={trainingController4}
              formData={formData}
              setFormData={setFormData}
              handleUpload={handleUpload}
            />
          </div>

          <div className="self-stretch flex flex-col justify-start items-end gap-2.5">
            <ButtonComponent
              color={"#6945ED"}
              isPending={isPending}
              buttonText={"Continue"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default TrainningPosting;
