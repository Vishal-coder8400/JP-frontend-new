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
import { useDropDown } from "@/hooks/common/useDropDown";

const trainingSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    skills: z.array(z.any()).min(1, "At least one skill is required"),
    trainingMode: z
      .string()
      .min(1, "Training mode is required")
      .refine(
        (val) =>
          ["Virtual / Online", "Hybrid", "In-person / On-site"].includes(val),
        "Invalid training mode"
      ),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    pincode: z.string().optional(),
    sessionFrequency: z.string().min(1, "Session frequency is required"),
    totalDurationDays: z
      .string({ invalid_type_error: "Total duration (days) is required" })
      .min(1, "Total duration (days) must be greater than 0"),
    hoursPerDay: z
      .string({ invalid_type_error: "Hours per day is required" })
      .min(1, "Hours per day must be greater than 0"),
    minimumExperience: z.string().min(1, "Minimum experience is required"),
    qualificationsRequired: z
      .string()
      .min(1, "Qualifications required field is mandatory"),
    subjectMatterExpertise: z
      .string()
      .min(1, "Subject matter expertise is required"),
    sessionsExpected: z
      .number({ invalid_type_error: "Sessions expected is required" })
      .min(1, "Sessions expected must be greater than 0"),
    travelRequired: z.string().min(1, "Travel required field is mandatory"),
    languagesFluent: z
      .array(z.any())
      .min(1, "At least one fluent language is required"),
    participantsPerBatch: z
      .string({ invalid_type_error: "Participants per batch is required" })
      .min(1, "Participants per batch must be greater than 0"),
    studyMaterialsProvided: z
      .string()
      .min(1, "Study materials provided field is mandatory"),
    demoSessionBeforeConfirming: z
      .string()
      .min(1, "Demo session before confirming field is mandatory"),
    budgetPerSession: z.string().min(1, "Budget per session is required"),
  })
  .refine(
    (data) => {
      if (
        data.trainingMode === "In-person / On-site" ||
        data.trainingMode === "Hybrid"
      ) {
        return (
          data.address &&
          data.city &&
          data.state &&
          data.pincode &&
          data.address.trim() !== "" &&
          data.city.trim() !== "" &&
          data.state.trim() !== "" &&
          data.pincode.trim() !== ""
        );
      }
      return true;
    },
    {
      message:
        "Address, City, State, and Pincode are required for On-site or Hybrid training modes",
      path: ["address"], // you can point to 'address' or leave blank for form-level error
    }
  );

const TrainningPosting = () => {
  const [errorMessage, setErrorMessage] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: [],
    trainingMode: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    sessionFrequency: "",
    totalDurationDays: 0,
    hoursPerDay: 0,
    minimumExperience: "",
    qualificationsRequired: "",
    subjectMatterExpertise: "",
    sessionsExpected: 0,
    travelRequired: "",
    languagesFluent: [],
    participantsPerBatch: 0,
    studyMaterialsProvided: "",
    demoSessionBeforeConfirming: "",
    budgetPerSession: "",
  });
  const { mutate, isPending, isError, error } = useCorporateTrainingPost();
  const { mutate: UploadImage } = useUpload();
  const { data: skillOptions } = useDropDown("skills");
  const { data: skillOptions2 } = useDropDown("languages");
  const updatedFields = trainingController1.map((field) =>
    field.name === "skills"
      ? {
          ...field,
          options: skillOptions?.data?.values?.map((skill) => ({
            id: skill._id,
            label: skill.label,
          })),
        }
      : field
  );
  const updatedFields2 = trainingController4.map((field) =>
    field.name === "languagesFluent"
      ? {
          ...field,
          options: skillOptions2?.data?.values?.map((language) => ({
            id: language._id,
            label: language.label,
          })),
        }
      : field
  );

  const onSubmit = (e) => {
    e.preventDefault();

    const { isValid, errors } = validateFormData(trainingSchema, formData);
    if (!isValid) {
      setErrorMessage(errors);
      return;
    }
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
    if (formData.skills.length > 0) {
      payload.skills = formData.skills.map((skill) => skill.id);
    }
    if (formData.languagesFluent.length > 0) {
      payload.languagesFluent = formData.languagesFluent.map(
        (language) => language.id
      );
    }
    setErrorMessage({});
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
              formControls={updatedFields}
              formData={formData}
              setFormData={setFormData}
              handleUpload={handleUpload}
              errors={errorMessage}
            />
            <CommonForm
              formControls={trainingMode}
              formData={formData}
              setFormData={setFormData}
              handleUpload={handleUpload}
              errors={errorMessage}
            />
            {formData?.trainingMode === "In-person / On-site" ||
            formData.trainingMode === "Hybrid" ? (
              <CommonForm
                formControls={trainingAddress}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
                errors={errorMessage}
              />
            ) : null}
            <CommonForm
              formControls={trainingController2}
              formData={formData}
              setFormData={setFormData}
              handleUpload={handleUpload}
              errors={errorMessage}
            />
          </div>
        </div>
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-10">
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
            <CommonForm
              formControls={trainingController3}
              formData={formData}
              setFormData={setFormData}
              handleUpload={handleUpload}
              errors={errorMessage}
            />
            <CommonForm
              formControls={updatedFields2}
              formData={formData}
              setFormData={setFormData}
              handleUpload={handleUpload}
              errors={errorMessage}
            />
          </div>

          <div className="self-stretch flex flex-col justify-start items-end gap-2.5">
            <ButtonComponent
              type="submit"
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
