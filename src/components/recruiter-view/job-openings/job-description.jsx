import { Fragment } from "react";
import { Button } from "../../ui/button";
import useJobPostStore from "../../../stores/useJobPostStore";
import {
  CalenderIcon,
  ClockIcon,
  // CurrencyIcon,
  LocationIcon,
} from "../../../utils/icon";
import { formatSalaryRange, timeAgo } from "../../../utils/commonFunctions";
// import { useLocation } from "react-router-dom";
import { IndianRupee } from "lucide-react";

const JobDescription = ({ setOpen1, hook }) => {
  const { jobPost } = useJobPostStore();

  const { data } = hook(jobPost?._id);

  return (
    <Fragment>
      {/* desktop-view */}
      <div
        aria-labelledby="dialog-title"
        aria-describedby="dialog-desc"
        className="hidden p-6 w-full bg-white outline outline-offset-[-1px] outline-neutral-400 lg:inline-flex flex-col justify-start items-center overflow-hidden min-h-screen"
      >
        <div className="self-stretch flex-1 flex flex-col justify-start items-start gap-8">
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
            <img
              className="w-16 h-16 relative rounded object-cover overflow-hidden"
              src={
                data?.data?.company?.companyLogo ||
                data?.data?.postedBy?.basicInformation?.companyLogo ||
                data?.data?.postedByDetails?.[0]?.basicInformation?.companyLogo
              }
              alt={
                data?.data?.company?.companyName ||
                data?.data?.postedBy?.basicInformation?.companyName ||
                data?.data?.postedByDetails?.[0]?.basicInformation?.companyName
              }
            />
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                <div className="flex flex-col justify-start items-start gap-1">
                  <div className="inline-flex justify-start items-center gap-3">
                    <div className="justify-start text-neutral-900 text-md2 font-normal leading-relaxed">
                      {data?.data?.company?.companyName ||
                        data?.data?.postedBy?.basicInformation?.companyName ||
                        data?.data?.postedByDetails?.[0]?.basicInformation
                          ?.companyName}
                    </div>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-3">
                    <div className="justify-start text-neutral-900 text-xl font-medium leading-9">
                      {data?.data?.jobTitle || data?.data?.title}
                    </div>
                    {/* <div className="px-1.5 py-0.5 bg-[#7D5AE21A] rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                      <div className="justify-start text-[#7D5AE2] text-xs font-medium leading-none">
                        2 applied
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="self-stretch py-0.5 inline-flex justify-start items-center gap-5 flex-wrap content-center">
                  {((data?.data?.title &&
                    data?.data?.trainingMode !== "Virtual / Online") ||
                    data?.data?.jobTitle) && (
                    <>
                      <div className="flex justify-start items-center gap-1.5">
                        <div className="w-4 h-4 relative">
                          <LocationIcon className="h-full w-full" />
                        </div>
                        <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                          {data?.data?.city}, {data?.data?.state}
                        </div>
                      </div>
                      <div className="w-0.5 h-0.5 bg-neutral-900/70 rounded-full" />
                    </>
                  )}

                  <div className="flex justify-start items-center gap-1.5">
                    <div className="w-4 h-4 relative">
                      <ClockIcon className="h-full w-full" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      {data?.data?.jobType || data?.data?.trainingMode}
                    </div>
                  </div>
                  <div className="w-0.5 h-0.5 bg-neutral-900/70 rounded-full" />
                  {data?.data?.jobTitle && (
                    <>
                      <div className="flex justify-start items-center gap-1.5">
                        <div className="w-4 h-4 relative flex items-center justify-center">
                          <IndianRupee
                            width={12}
                            height={12}
                            color="#141414"
                            strokeWidth={1.5}
                          />
                        </div>
                        <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                          {`${
                            data?.data?.salary?.salaryRange?.min ||
                            data?.data?.salaryRange?.min
                          }-${
                            data?.data?.salary?.salaryRange?.max ||
                            data?.data?.salaryRange?.max
                          } LPA`}
                        </div>
                      </div>
                      <div className="w-0.5 h-0.5 bg-neutral-900/70 rounded-full" />
                    </>
                  )}

                  <div className="flex justify-start items-center gap-1.5">
                    <div className="w-4 h-4 relative">
                      <CalenderIcon className="h-full w-full" />
                    </div>
                    <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                      {timeAgo(data?.data?.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {!location.pathname.includes("corporate") && (
              <Button
                onClick={() => {
                  setOpen1(true);
                }}
                className="cursor-pointer px-5 py-2.5 bg-gray-900 rounded-3xl flex justify-center items-center gap-2.5"
              >
                <div className="justify-start text-white text-base font-medium capitalize">
                  Apply For Candidate
                </div>
              </Button>
            )}
          </div>
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-8">
              <div className="self-stretch justify-start text-neutral-900 text-lg font-semibold leading-tight">
                About the job
              </div>

              <div className="text-gray1 mt-4 space-y-4">
                {(data?.data?.jobDescription || data?.data?.description) && (
                  <>
                    <h4 className="font-semibold">Job Description</h4>
                    <p>
                      {data?.data?.jobDescription || data?.data?.description}
                    </p>
                  </>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold">Job Details</h4>
                    <ul className="space-y-1 mt-2">
                      {data?.data?.jobType && (
                        <li>
                          <strong>Job Type:</strong> {data?.data?.jobType}
                        </li>
                      )}
                      <li>
                        <strong>Experience Level:</strong>{" "}
                        {data?.data?.experienceLevel ||
                          data?.data?.minimumExperience}
                      </li>
                      <li>
                        <strong>Mode of Work:</strong>{" "}
                        {data?.data?.modeOfWork || data?.data?.trainingMode}
                      </li>
                      <li>
                        <strong>Working Hours:</strong>{" "}
                        {data?.data?.workingHours ||
                          `${data?.data?.hoursPerDay} Hours`}
                      </li>
                      {data?.data?.totalDurationDays && (
                        <li>
                          <strong>Duration:</strong>{" "}
                          {data?.data?.totalDurationDays} Months
                        </li>
                      )}
                      {data?.data?.workingDays && (
                        <li>
                          <strong>Working Days:</strong>{" "}
                          {data?.data?.workingDays}
                        </li>
                      )}
                      {data?.data?.isSundayWorking && (
                        <li>
                          <strong>Sunday Working:</strong> Yes
                        </li>
                      )}
                      {data?.data?.sessionFrequency && (
                        <li>
                          <strong>Session Frequency:</strong>{" "}
                          {data?.data?.sessionFrequency}
                        </li>
                      )}
                      {data?.data?.subjectMatterExpertise && (
                        <li>
                          <strong>Subject Matter Expertise:</strong>{" "}
                          {data?.data?.subjectMatterExpertise}
                        </li>
                      )}
                      {data?.data?.sessionsExpected && (
                        <li>
                          <strong>Sessions Expected:</strong>{" "}
                          {data?.data?.sessionsExpected}
                        </li>
                      )}
                      {data?.data?.participantsPerBatch && (
                        <li>
                          <strong>Participants per Batch:</strong>{" "}
                          {data?.data?.participantsPerBatch}
                        </li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold">Requirements</h4>
                    <ul className="space-y-1 mt-2">
                      <li>
                        <strong>Minimum Education:</strong>{" "}
                        {data?.data?.minimumEducation ||
                          data?.data?.qualificationsRequired}
                      </li>
                      {data?.data?.englishLevel && (
                        <li>
                          <strong>English Level:</strong>{" "}
                          {data?.data?.englishLevel}
                        </li>
                      )}
                      {data?.data?.genderPreference && (
                        <li>
                          <strong>Gender Preference:</strong>{" "}
                          {data?.data?.genderPreference}
                        </li>
                      )}
                      {data?.data?.preferredAgeRange && (
                        <li>
                          <strong>Age Range:</strong>{" "}
                          {data?.data?.preferredAgeRange} Yrs
                        </li>
                      )}
                      <li>
                        <strong>Regional Language:</strong>{" "}
                        {data?.data?.regionalLanguageRequired
                          ? "Required"
                          : "Not Required"}
                      </li>
                      <li>
                        <strong>Two Wheeler:</strong>{" "}
                        {data?.data?.twoWheelerMandatory
                          ? "Mandatory"
                          : "Not Mandatory"}
                      </li>
                      {data?.data?.studyMaterialsProvided && (
                        <li>
                          <strong>Study Materials Provided:</strong>{" "}
                          {"Will be Provided by Company"}
                        </li>
                      )}
                      {data?.data?.demoSessionBeforeConfirming && (
                        <li>
                          <strong>Demo Session Before Confirming:</strong>{" "}
                          {"Will be Provided by Company"}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {((data?.data?.title &&
                  data?.data?.trainingMode !== "Virtual / Online") ||
                  data?.data?.jobTitle) && (
                  <div>
                    <h4 className="font-semibold">Location Details</h4>
                    <ul className="space-y-1 mt-2">
                      <li>
                        <strong>Office Location:</strong>{" "}
                        {data?.data?.officeLocation}
                      </li>
                      <li>
                        <strong>City:</strong> {data?.data?.city}
                      </li>
                      <li>
                        <strong>State:</strong> {data?.data?.state}
                      </li>
                      <li>
                        <strong>Pincode:</strong> {data?.data?.pincode}
                      </li>
                    </ul>
                  </div>
                )}

                {data?.data?.requiredSkills &&
                  data?.data?.requiredSkills.length > 0 && (
                    <div>
                      <h4 className="font-semibold">Required Skills</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {data?.data?.requiredSkills.map((skill, index) => (
                          <span
                            key={skill._id}
                            className="inline-block px-3 py-1 text-xs font-medium bg-light-purple text-primary-purple rounded-full"
                          >
                            {skill?.skillName}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {data?.data?.isWalkInInterview && (
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
              {data?.data?.skills && (
                <div className="w-full inline-flex justify-start items-start gap-3 flex-wrap content-start">
                  {data?.data?.skills?.map((item, i) => (
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
              )}
            </div>
          </div>
          <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-8">
              <div className="self-stretch justify-start text-neutral-900 text-lg font-semibold leading-tight">
                About the Company
              </div>
              <div className="self-stretch justify-start">
                <span className="text-neutral-900/70 text-base font-normal leading-normal">
                  {data?.data?.postedBy?.basicInformation?.companyDescription ||
                    data?.data?.postedByDetails?.[0]?.basicInformation
                      ?.companyDescription}
                </span>

                <div className="text-neutral-900/70 text-base font-bold leading-normal">
                  <span className="text-neutral-900/70 text-base font-bold leading-normal">
                    Location:{" "}
                  </span>
                  <span className="text-neutral-900/70 text-base font-normal leading-normal">
                    {data?.data?.postedBy?.currentAddress ||
                      data?.data?.postedByDetails?.[0]?.currentAddress}
                    ,{" "}
                    {data?.data?.postedBy?.state ||
                      data?.data?.postedByDetails?.[0]?.state}{" "}
                    -{" "}
                    {data?.data?.postedBy?.pincode ||
                      data?.data?.postedByDetails?.[0]?.pincode}
                  </span>
                </div>
              </div>
              <div className="self-stretch h-0 outline outline-2 outline-offset-[-1px] outline-stone-300" />
            </div>
          </div>
        </div>
      </div>
      {/* mobile-view */}
      <div className="lg:hidden h-[100dvh] overflow-y-auto bg-white w-full p-6 inline-flex flex-col justify-start items-start gap-6">
        <div className="self-stretch p-6  rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
          <img
            className="w-12 h-12 relative rounded object-cover overflow-hidden"
            src={data?.data?.company?.companyLogo}
            alt={data?.data?.company?.companyName}
          />
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
            <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-neutral-900 text-[15px] font-normal">
                  {data?.data?.company?.companyName}
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-3">
                  <div className="self-stretch justify-start text-neutral-900 text-lg font-medium">
                    {data?.data?.jobTitle || data?.data?.title}
                  </div>
                  <div className="px-1.5 py-0.5 bg-[#7D5AE21A] rounded-[3px] inline-flex justify-start items-center gap-1 overflow-hidden">
                    <div className="justify-start text-[#7D5AE2] text-xs font-medium leading-none">
                      2 applied
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch py-0.5 inline-flex justify-start items-center gap-5 flex-wrap content-center">
                <div className="flex justify-start items-center gap-1.5">
                  <div className="w-4 h-4 relative">
                    <LocationIcon className="h-full w-full" />
                  </div>
                  <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                    {data?.data?.city}, {data?.data?.state}
                  </div>
                </div>
                <div className="w-0.5 h-0.5 bg-neutral-900/70 rounded-full" />
                <div className="flex justify-start items-center gap-1.5">
                  <div className="w-4 h-4 relative">
                    <ClockIcon className="h-full w-full" />
                  </div>
                  <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                    {data?.data?.jobType || data?.data?.trainingMode}
                  </div>
                </div>
                <div className="w-0.5 h-0.5 bg-neutral-900/70 rounded-full" />
                <div className="flex justify-start items-center gap-1.5">
                  <div className="w-4 h-4 relative">
                    <IndianRupee
                      width={12}
                      height={12}
                      color="#141414"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                    {formatSalaryRange(
                      data?.data?.salaryRange?.min,
                      data?.data?.salaryRange?.max
                    )}
                  </div>
                </div>
                <div className="w-0.5 h-0.5 bg-neutral-900/70 rounded-full" />
                <div className="flex justify-start items-center gap-1.5">
                  <div className="w-4 h-4 relative">
                    <CalenderIcon className="h-full w-full" />
                  </div>
                  <div className="justify-start text-neutral-900/70 text-base font-normal leading-normal">
                    {timeAgo(data?.data?.createdAt)}
                  </div>
                </div>
              </div>
            </div>
            {!location.pathname.includes("corporate") && (
              <Button
                onClick={() => setOpen1(true)}
                className="self-stretch px-5 py-2.5 bg-gray-900 rounded-3xl inline-flex justify-center items-center gap-2.5"
              >
                <div className="justify-start text-white text-sm font-medium capitalize">
                  Apply For Candidate
                </div>
              </Button>
            )}
          </div>
        </div>
        <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-6">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
            <div className="self-stretch justify-start text-neutral-900 text-lg font-semibold leading-tight">
              About the job
            </div>
            <div className="self-stretch justify-start">
              <span className="text-neutral-900/70 text-base font-bold leading-normal">
                Job description
                <br />
              </span>
              <span className="text-neutral-900/70 text-base font-normal leading-normal">
                <p>{data?.data?.jobDescription || data?.data?.description}</p>
              </span>
            </div>
            <div className="w-full self-stretch inline-flex justify-start items-start gap-3 flex-wrap content-start">
              {(data?.data?.requiredSkills || data?.data?.skillDetails)?.map(
                (item, i) => (
                  <div
                    key={i}
                    className="px-5 py-2.5 rounded-3xl outline outline-offset-[-1px] outline-neutral-500 flex justify-start items-start gap-2.5"
                  >
                    <div className="justify-start text-neutral-500 text-sm font-medium capitalize">
                      {item?.skillName}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className="self-stretch p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] outline outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-8">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
            <div className="self-stretch justify-start text-neutral-900 text-lg font-semibold leading-tight">
              About the Company
            </div>
            <div className="self-stretch justify-start">
              <span className="text-neutral-900/70 text-base font-normal leading-normal">
                Stimuler has helped over 3.5 Million people improve their
                conversational skills using its Audio AI technology. Our AI
                engines listen, provide detailed feedback on essential speech
                metrics, and offer guided practice for improvement. Awarded
                Google Play’s Best AI App and backed by some of the world’s best
                VC funds, our app has impacted users from over 200 countries
                till date.
                <br />
              </span>
              <span className="text-neutral-900/70 text-base font-bold leading-normal">
                {" "}
                Company Info:
                <br />
              </span>
              <span className="text-neutral-900/70 text-base font-bold leading-normal">
                Address:{" "}
              </span>
              <span className="text-neutral-900/70 text-base font-normal leading-normal">
                Jayanagar, Bangalore, Karnataka, India
              </span>
            </div>
            <div className="self-stretch h-0 outline outline-2 outline-offset-[-1px] outline-stone-300" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default JobDescription;
