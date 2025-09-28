import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LocationIcon } from "@/utils/icon";
import { ClockIcon, DollarSignIcon, CalendarIcon } from "lucide-react";
import { useGetJobDetails } from "../../../../../hooks/super-admin/useJob";

const JobDetailsDrawer = ({ jobId }) => {
  const { data: jobData, isLoading, error } = useGetJobDetails(jobId);

  if (isLoading) {
    return (
      <div className="min-h-full flex flex-col bg-white p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">Loading job details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full flex flex-col bg-white p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-500">
            Error loading job details: {error.message}
          </div>
        </div>
      </div>
    );
  }

  if (!jobData?.data?.data?.job) {
    return (
      <div className="min-h-full flex flex-col bg-white p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">No job details found</div>
        </div>
      </div>
    );
  }

  const job = jobData.data.data.job;

  return (
    <div className="min-h-full flex flex-col bg-white p-6">
      {/* Header */}
      <div className="flex justify-between gap-4 p-6 border-1 border-gray2 rounded-lg">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <p className="text-xl font-medium">{job.jobTitle}</p>
            <Badge
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                job.status === "active"
                  ? "bg-success2 text-success1"
                  : "bg-danger2 text-danger1"
              }`}
            >
              {job.status?.charAt(0).toUpperCase() + job.status?.slice(1)}
            </Badge>
          </div>
          <div className="text-gray1 flex items-center gap-6 mt-2">
            {job.officeLocation && (
              <div className="flex items-center gap-2">
                <LocationIcon className="h-4 w-4 text-gray1" />
                {job.officeLocation}, {job.city}, {job.state}
              </div>
            )}
            {job.jobType && (
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-gray1" />
                {job.jobType}
              </div>
            )}
            {job.experienceLevel && (
              <div className="flex items-center gap-2">
                <DollarSignIcon className="h-4 w-4 text-gray1" />
                {job.experienceLevel}
              </div>
            )}
          </div>

          {job.createdAt && (
            <div className="text-gray1 flex items-center gap-2 mt-2">
              <CalendarIcon className="h-4 w-4 text-gray1" />
              Posted on {new Date(job.createdAt).toLocaleDateString()}
            </div>
          )}
        </div>
        <Button variant="black">Apply Now</Button>
      </div>

      {/* Content */}
      <div className="p-6 border-1 border-gray2 rounded-lg mt-6">
        <div>
          <h3 className="text-lg font-semibold">About the job</h3>
          <div className="text-gray1 mt-4 space-y-4">
            {job.jobDescription && (
              <>
                <h4 className="font-semibold">Job Description</h4>
                <p>{job.jobDescription}</p>
              </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Job Details</h4>
                <ul className="space-y-1 mt-2">
                  <li>
                    <strong>Job Type:</strong> {job.jobType}
                  </li>
                  <li>
                    <strong>Experience Level:</strong> {job.experienceLevel}
                  </li>
                  <li>
                    <strong>Mode of Work:</strong> {job.modeOfWork}
                  </li>
                  <li>
                    <strong>Working Hours:</strong> {job.workingHours}
                  </li>
                  <li>
                    <strong>Working Days:</strong> {job.workingDays}
                  </li>
                  {job.isSundayWorking && (
                    <li>
                      <strong>Sunday Working:</strong> Yes
                    </li>
                  )}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold">Requirements</h4>
                <ul className="space-y-1 mt-2">
                  <li>
                    <strong>Minimum Education:</strong> {job.minimumEducation}
                  </li>
                  <li>
                    <strong>English Level:</strong> {job.englishLevel}
                  </li>
                  <li>
                    <strong>Gender Preference:</strong> {job.genderPreference}
                  </li>
                  <li>
                    <strong>Age Range:</strong> {job.preferredAgeRange}
                  </li>
                  <li>
                    <strong>Regional Language:</strong>{" "}
                    {job.regionalLanguageRequired ? "Required" : "Not Required"}
                  </li>
                  <li>
                    <strong>Two Wheeler:</strong>{" "}
                    {job.twoWheelerMandatory ? "Mandatory" : "Not Mandatory"}
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-semibold">Location Details</h4>
              <ul className="space-y-1 mt-2">
                <li>
                  <strong>Office Location:</strong> {job.officeLocation}
                </li>
                <li>
                  <strong>City:</strong> {job.city}
                </li>
                <li>
                  <strong>State:</strong> {job.state}
                </li>
                <li>
                  <strong>Pincode:</strong> {job.pincode}
                </li>
              </ul>
            </div>

            {job.requiredSkills && job.requiredSkills.length > 0 && (
              <div>
                <h4 className="font-semibold">Required Skills</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.requiredSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 text-xs font-medium bg-light-purple text-primary-purple rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {job.isWalkInInterview && (
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
        </div>
      </div>
    </div>
  );
};

export default JobDetailsDrawer;
