import { useGetJobById } from "@/hooks/recruiter/useJob";
import Navbar from "../../components/recruiter-view/navbar";
import { useParams } from "react-router-dom";
import {
  useApplyForTraining,
  useGetTrainingById,
} from "@/hooks/trainer/useTrainings";
import { timeAgo } from "@/utils/commonFunctions";
import { CalenderIcon, ClockIcon, LocationIcon } from "@/utils/icon";
import { BookmarkIcon, IndianRupeeIcon } from "lucide-react";

const TrainerJobDescription = () => {
  const { id } = useParams();
  const { data: jobData } = useGetTrainingById(id);
  const { mutate: applyForTraining } = useApplyForTraining();

  const handleApply = (e, trainingId) => {
    e.preventDefault();
    e.stopPropagation();
    applyForTraining({
      trainingId: trainingId,
    });
  };

  return (
    <div className="w-full flex flex-col gap-[25px]">
      <Navbar onlySupport={false} />
      <div className="flex w-full items-start justify-between">
        <div className="flex flex-col gap-[31px]">
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
            <img
              className="size-16 relative rounded-sm object-cover"
              src={jobData?.data?.companyLogo}
              alt={jobData?.data?.companyName}
            />
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                <div className="self-stretch flex flex-col justify-start items-start gap-1">
                  <div className="self-stretch inline-flex justify-start items-center gap-3">
                    <div className="justify-start text-neutral-900 text-lg font-normal leading-relaxed">
                      {jobData?.data?.companyName}
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col justify-start items-start gap-3">
                    <div className="self-stretch justify-start text-neutral-900 text-2xl font-medium leading-9">
                      {jobData?.data?.title}
                    </div>
                    <div className="size- px-1.5 py-0.5 bg-violet-500/10 rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                      <div className="justify-start text-violet-500 text-xs font-medium leading-none">
                        2 applied
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch py-0.5 inline-flex justify-start items-start gap-6 flex-wrap content-start">
                  <div className="size- flex justify-start items-center gap-1.5">
                    <LocationIcon className="h-[16px] w-[16px]" />
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      Brussels
                    </div>
                  </div>
                  <div className="size-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="size- flex justify-start items-center gap-1.5">
                    <ClockIcon className="h-[16px] w-[16px]" />
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      Full time
                    </div>
                  </div>
                  <div className="size-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="size- flex justify-start items-center gap-1.5">
                    <IndianRupeeIcon className="h-[10px] w-[10px]" />
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      50-55k
                    </div>
                  </div>
                  <div className="size-0.5 bg-neutral-900/70 rounded-full" />
                  <div className="size- flex justify-start items-center gap-1.5">
                    <CalenderIcon className="h-[16px] w-[16px]" />
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      {timeAgo(jobData?.data?.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={(e) => handleApply(e, jobData?.data?._id)}
              className="cursor-pointer px-5 py-2.5 bg-gray-900 rounded-3xl flex justify-center items-center gap-2.5"
            >
              <div className="justify-start text-white text-sm font-medium capitalize">
                Apply Now
              </div>
            </div>
            <div className="size- pl-3.5 pr-5 py-2.5 rounded-3xl outline outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-center items-center gap-2.5">
              <BookmarkIcon className="h-4 w-4 text-neutral-400" />
              <div className="justify-start text-neutral-400 text-sm font-medium capitalize">
                Save
              </div>
            </div>
          </div>

          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-8">
              <div className="self-stretch justify-start text-neutral-900 text-lg font-semibold leading-tight">
                About the Training
              </div>
              <div className="text-gray1 mt-4 space-y-4">
                {jobData?.data?.description && (
                  <div>
                    <h4 className="font-semibold">Training Description</h4>
                    <p className="mt-2">{jobData?.data?.description}</p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold">Training Details</h4>
                    <ul className="space-y-1 mt-2">
                      {jobData?.data?.jobType && (
                        <li>
                          <strong>Job Type:</strong> {jobData?.data?.jobType}
                        </li>
                      )}
                      <li>
                        <strong>Experience Level:</strong>{" "}
                        {jobData?.data?.experienceLevel ||
                          jobData?.data?.minimumExperience}
                      </li>
                      <li>
                        <strong>Mode of Work:</strong>{" "}
                        {jobData?.data?.modeOfWork ||
                          jobData?.data?.trainingMode}
                      </li>
                      <li>
                        <strong>Working Hours:</strong>{" "}
                        {jobData?.data?.workingHours ||
                          `${jobData?.data?.hoursPerDay} Hours`}
                      </li>
                      {jobData?.data?.totalDurationDays && (
                        <li>
                          <strong>Duration:</strong>{" "}
                          {jobData?.data?.totalDurationDays} Months
                        </li>
                      )}
                      {jobData?.data?.workingDays && (
                        <li>
                          <strong>Working Days:</strong>{" "}
                          {jobData?.data?.workingDays}
                        </li>
                      )}
                      {jobData?.data?.isSundayWorking && (
                        <li>
                          <strong>Sunday Working:</strong> Yes
                        </li>
                      )}
                      {jobData?.data?.sessionFrequency && (
                        <li>
                          <strong>Session Frequency:</strong>{" "}
                          {jobData?.data?.sessionFrequency}
                        </li>
                      )}
                      {jobData?.data?.subjectMatterExpertise && (
                        <li>
                          <strong>Subject Matter Expertise:</strong>{" "}
                          {jobData?.data?.subjectMatterExpertise}
                        </li>
                      )}
                      {jobData?.data?.sessionsExpected && (
                        <li>
                          <strong>Sessions Expected:</strong>{" "}
                          {jobData?.data?.sessionsExpected}
                        </li>
                      )}
                      {jobData?.data?.participantsPerBatch && (
                        <li>
                          <strong>Participants per Batch:</strong>{" "}
                          {jobData?.data?.participantsPerBatch}
                        </li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold">Requirements</h4>
                    <ul className="space-y-1 mt-2">
                      <li>
                        <strong>Minimum Education:</strong>{" "}
                        {jobData?.data?.minimumEducation ||
                          jobData?.data?.qualificationsRequired}
                      </li>
                      {jobData?.data?.englishLevel && (
                        <li>
                          <strong>English Level:</strong>{" "}
                          {jobData?.data?.englishLevel}
                        </li>
                      )}
                      {jobData?.data?.genderPreference && (
                        <li>
                          <strong>Gender Preference:</strong>{" "}
                          {jobData?.data?.genderPreference}
                        </li>
                      )}
                      {jobData?.data?.preferredAgeRange && (
                        <li>
                          <strong>Age Range:</strong>{" "}
                          {jobData?.data?.preferredAgeRange}
                        </li>
                      )}
                      <li>
                        <strong>Regional Language:</strong>{" "}
                        {jobData?.data?.regionalLanguageRequired
                          ? "Required"
                          : "Not Required"}
                      </li>
                      <li>
                        <strong>Two Wheeler:</strong>{" "}
                        {jobData?.data?.twoWheelerMandatory
                          ? "Mandatory"
                          : "Not Mandatory"}
                      </li>
                      {jobData?.data?.studyMaterialsProvided && (
                        <li>
                          <strong>Study Materials Provided:</strong>{" "}
                          {"Will be Provided by Company"}
                        </li>
                      )}
                      {jobData?.data?.demoSessionBeforeConfirming && (
                        <li>
                          <strong>Demo Session Before Confirming:</strong>{" "}
                          {"Will be Provided by Company"}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {jobData?.data?.isWalkInInterview && (
                  <div>
                    <h4 className="font-semibold">Location Details</h4>
                    <ul className="space-y-1 mt-2">
                      <li>
                        <strong>Office Location:</strong>{" "}
                        {jobData?.data?.officeLocation}
                      </li>
                      <li>
                        <strong>City:</strong> {jobData?.data?.city}
                      </li>
                      <li>
                        <strong>State:</strong> {jobData?.data?.state}
                      </li>
                      <li>
                        <strong>Pincode:</strong> {jobData?.data?.pincode}
                      </li>
                    </ul>
                  </div>
                )}
                {jobData?.data?.isWalkInInterview && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800">
                      Walk-in Interview
                    </h4>
                    <p className="text-yellow-700 mt-1">
                      This job allows walk-in interviews.
                    </p>
                  </div>
                )}
              </div>
              <div className="w-full inline-flex justify-start items-start gap-3 flex-wrap content-start">
                {(
                  jobData?.data?.requiredSkills || jobData?.data?.skillDetails
                )?.map((item, i) => (
                  <div
                    key={i}
                    className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-neutral-500 flex justify-start items-start gap-2.5"
                  >
                    <div className="justify-start text-neutral-500 text-sm font-medium capitalize">
                      {item?.skillName}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerJobDescription;
