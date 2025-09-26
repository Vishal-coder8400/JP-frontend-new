import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LocationIcon } from "@/utils/icon";
import {
  ClockIcon,
  DollarSignIcon,
  CalendarIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "lucide-react";
import { useGetJobDetails } from "../../../../../hooks/superAdmin/useJob";

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

  if (!jobData?.data) {
    return (
      <div className="min-h-full flex flex-col bg-white p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">No job details found</div>
        </div>
      </div>
    );
  }

  const job = jobData.data;

  return (
    <div className="min-h-full flex flex-col bg-white p-6">
      {/* Header */}
      <div className="flex justify-between gap-4 p-6 border-1 border-gray2 rounded-lg">
        {job.companyLogo && (
          <img
            src={job.companyLogo}
            alt={job.company}
            className="h-10 w-10 rounded-md"
          />
        )}
        <div className="flex-1">
          {job.company && <p>{job.company}</p>}
          <div className="flex items-center gap-4">
            {(job.title || job.name) && (
              <p className="text-xl font-medium">{job.title || job.name}</p>
            )}
            {(job.applicationsCount || job.candidates) && (
              <Badge className="text-primary-purple bg-light-purple text-xs">
                {job.applicationsCount || job.candidates} Applied
              </Badge>
            )}
          </div>
          <div className="text-gray1 flex items-center gap-6 mt-2">
            {job.location && (
              <div className="flex items-center gap-2">
                <LocationIcon className="h-4 w-4 text-gray1" />
                {job.location}
              </div>
            )}
            {(job.jobType || job.type) && (
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-gray1" />
                {job.jobType || job.type}
              </div>
            )}
            {(job.salary || job.salaryRange) && (
              <div className="flex items-center gap-2">
                <DollarSignIcon className="h-4 w-4 text-gray1" />
                {job.salary || job.salaryRange}
              </div>
            )}
          </div>

          {job.postedDate && (
            <div className="text-gray1 flex items-center gap-2 mt-2">
              <CalendarIcon className="h-4 w-4 text-gray1" />
              {new Date(job.postedDate).toLocaleDateString()}
            </div>
          )}
        </div>
        <Button variant="black">Apply Now</Button>
      </div>

      {/* Content */}
      <div className="p-6 border-1 border-gray2 rounded-lg mt-6">
        <div>
          <h3 className="text-lg font-semibold">About the job</h3>
          <div className="text-gray1 mt-4 space-y-2">
            {(job.description || job.jobDescription) && (
              <>
                <h4 className="font-semibold">Job Description</h4>
                <p>{job.description || job.jobDescription}</p>
              </>
            )}

            {job.responsibilities && (
              <>
                <h4 className="font-semibold">Key Responsibilities</h4>
                <ul className="list-disc list-inside">
                  {Array.isArray(job.responsibilities) ? (
                    job.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))
                  ) : (
                    <li>{job.responsibilities}</li>
                  )}
                </ul>
              </>
            )}

            {job.requirements && (
              <>
                <h4 className="font-semibold">Requirements</h4>
                <ul className="list-disc list-inside">
                  {Array.isArray(job.requirements) ? (
                    job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))
                  ) : (
                    <li>{job.requirements}</li>
                  )}
                </ul>
              </>
            )}

            {job.education && (
              <>
                <h4 className="font-semibold">Education</h4>
                <p>{job.education}</p>
              </>
            )}

            {(job.experience ||
              job.location ||
              job.salary ||
              job.jobType ||
              job.industry) && (
              <>
                <h4 className="font-semibold">Other Details</h4>
                <ul className="list-disc list-inside">
                  {job.experience && <li>Experience: {job.experience}</li>}
                  {job.location && <li>Location: {job.location}</li>}
                  {job.salary && <li>Salary: {job.salary}</li>}
                  {(job.jobType || job.type) && (
                    <li>Job Type: {job.jobType || job.type}</li>
                  )}
                  {job.industry && <li>Industry: {job.industry}</li>}
                </ul>
              </>
            )}

            {job.contactEmail && (
              <p>
                For additional information, you can reach out to me at{" "}
                {job.contactEmail}
              </p>
            )}

            {job.skills && (
              <div className="flex items-center gap-2 mt-4">
                {Array.isArray(job.skills) ? (
                  job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block px-2 py-1 text-xs font-medium border-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="inline-block px-2 py-1 text-xs font-medium border-1 rounded-full">
                    {job.skills}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Company */}
      {(job.companyDescription || job.company?.description) && (
        <div className="p-6 border-1 border-gray2 rounded-lg mt-6">
          <h4>About the Company</h4>
          <p className="text-gray1 mt-4">
            {job.companyDescription || job.company?.description}
          </p>

          {(job.company?.socialMedia || job.socialMedia) && (
            <div className="mt-4 pt-4 flex items-center gap-4 border-t-1 border-gray-2">
              {job.company?.socialMedia?.facebook && (
                <a
                  href={job.company.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon className="h-4 w-4 text-gray1 hover:text-blue-600" />
                </a>
              )}
              {job.company?.socialMedia?.linkedin && (
                <a
                  href={job.company.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinIcon className="h-4 w-4 text-gray1 hover:text-blue-600" />
                </a>
              )}
              {job.company?.socialMedia?.twitter && (
                <a
                  href={job.company.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterIcon className="h-4 w-4 text-gray1 hover:text-blue-600" />
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobDetailsDrawer;
