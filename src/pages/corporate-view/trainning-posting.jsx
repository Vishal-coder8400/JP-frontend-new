import { useState } from "react";
import CommonForm from "../../components/common/form";
import {
  trainingAddress,
  trainingController1,
  trainingController2,
  trainingController3,
  trainingMode,
} from "../../config";
import Navbar from "../../components/recruiter-view/navbar";
import { PostTrainingIcon } from "../../utils/icon";

const TrainningPosting = () => {
  const [formData, setFormData] = useState({
    title: "Full Stack Web Development Bootcamp",
    description:
      "Comprehensive training program covering modern web development technologies including React, Node.js, and MongoDB",
    skills: ["6876a60170cc0ae27963d009"],
    trainingMode: "Virtual / Online",
    sessionFrequency: "daily",
    totalDurationDays: 90,
    hoursPerDay: 4,
    minimumExperience: "1y",
    subjectMatterExpertise: "high",
    qualificationsRequired:
      "Bachelor's degree in Computer Science or related field",
    sessionsExpected: 60,
    travelRequired: false,
    languagesFluent: ["English", "Hindi"],
    participantsPerBatch: 3,
    studyMaterialsProvided: true,
    demoSessionBeforeConfirming: true,
    recommendationsFromPastClients: true,
  });
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
      <div className="self-stretch inline-flex justify-start items-start gap-10">
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-10">
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
            <CommonForm
              formControls={trainingController1}
              formData={formData}
              setFormData={setFormData}
            />
            <CommonForm
              formControls={trainingMode}
              formData={formData}
              setFormData={setFormData}
            />
            {formData?.trainingMode === "In-person / On-site" ||
            formData.trainingMode === "Hybrid" ? (
              <CommonForm
                formControls={trainingAddress}
                formData={formData}
                setFormData={setFormData}
              />
            ) : null}
            <CommonForm
              formControls={trainingController2}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </div>
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-10">
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-start gap-4">
            <CommonForm
              formControls={trainingController3}
              formData={formData}
              setFormData={setFormData}
            />
          </div>

          <div className="self-stretch flex flex-col justify-start items-end gap-2.5">
            <div className="w-64 px-5 py-2.5 bg-violet-600 rounded-3xl inline-flex justify-center items-center gap-2.5">
              <div className="justify-start text-white text-sm font-medium capitalize">
                Save & Update Profile
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainningPosting;
