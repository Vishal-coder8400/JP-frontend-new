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
import { useGetTrainingDetails } from "../../../../../hooks/superAdmin/useTraining";

const TrainingDetailsDrawer = ({ trainingId }) => {
  const {
    data: trainingData,
    isLoading,
    error,
  } = useGetTrainingDetails(trainingId);

  if (isLoading) {
    return (
      <div className="min-h-full flex flex-col bg-white p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">
            Loading training details...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full flex flex-col bg-white p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-500">
            Error loading training details: {error.message}
          </div>
        </div>
      </div>
    );
  }

  if (!trainingData?.data) {
    return (
      <div className="min-h-full flex flex-col bg-white p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">No training details found</div>
        </div>
      </div>
    );
  }

  const training = trainingData.data;

  return (
    <div className="min-h-full flex flex-col bg-white p-6">
      {/* Header */}
      <div className="flex justify-between gap-4 p-6 border-1 border-gray2 rounded-lg">
        {training.companyLogo && (
          <img
            src={training.companyLogo}
            alt={training.company}
            className="h-10 w-10 rounded-md"
          />
        )}
        <div className="flex-1">
          {training.company && <p>{training.company}</p>}
          <div className="flex items-center gap-4">
            {(training.title || training.name) && (
              <p className="text-xl font-medium">
                {training.title || training.name}
              </p>
            )}
            {(training.applicationsCount || training.candidates) && (
              <Badge className="text-primary-purple bg-light-purple text-xs">
                {training.applicationsCount || training.candidates} Applied
              </Badge>
            )}
          </div>
          <div className="text-gray1 flex items-center gap-6 mt-2">
            {training.location && (
              <div className="flex items-center gap-2">
                <LocationIcon className="h-4 w-4 text-gray1" />
                {training.location}
              </div>
            )}
            {(training.trainingType || training.type) && (
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-gray1" />
                {training.trainingType || training.type}
              </div>
            )}
            {(training.price || training.cost) && (
              <div className="flex items-center gap-2">
                <DollarSignIcon className="h-4 w-4 text-gray1" />
                {training.price || training.cost}
              </div>
            )}
          </div>

          {training.postedDate && (
            <div className="text-gray1 flex items-center gap-2 mt-2">
              <CalendarIcon className="h-4 w-4 text-gray1" />
              {new Date(training.postedDate).toLocaleDateString()}
            </div>
          )}
        </div>
        <Button variant="black">Apply Now</Button>
      </div>

      {/* Content */}
      <div className="p-6 border-1 border-gray2 rounded-lg mt-6">
        <div>
          <h3 className="text-lg font-semibold">About the training</h3>
          <div className="text-gray1 mt-4 space-y-2">
            {(training.description || training.trainingDescription) && (
              <>
                <h4 className="font-semibold">Training Description</h4>
                <p>{training.description || training.trainingDescription}</p>
              </>
            )}

            {training.objectives && (
              <>
                <h4 className="font-semibold">Learning Objectives</h4>
                <ul className="list-disc list-inside">
                  {Array.isArray(training.objectives) ? (
                    training.objectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))
                  ) : (
                    <li>{training.objectives}</li>
                  )}
                </ul>
              </>
            )}

            {training.prerequisites && (
              <>
                <h4 className="font-semibold">Prerequisites</h4>
                <ul className="list-disc list-inside">
                  {Array.isArray(training.prerequisites) ? (
                    training.prerequisites.map((prereq, index) => (
                      <li key={index}>{prereq}</li>
                    ))
                  ) : (
                    <li>{training.prerequisites}</li>
                  )}
                </ul>
              </>
            )}

            {training.duration && (
              <>
                <h4 className="font-semibold">Duration</h4>
                <p>{training.duration}</p>
              </>
            )}

            {(training.experience ||
              training.location ||
              training.price ||
              training.trainingType ||
              training.industry) && (
              <>
                <h4 className="font-semibold">Other Details</h4>
                <ul className="list-disc list-inside">
                  {training.experience && (
                    <li>Experience: {training.experience}</li>
                  )}
                  {training.location && <li>Location: {training.location}</li>}
                  {training.price && <li>Price: {training.price}</li>}
                  {(training.trainingType || training.type) && (
                    <li>
                      Training Type: {training.trainingType || training.type}
                    </li>
                  )}
                  {training.industry && <li>Industry: {training.industry}</li>}
                </ul>
              </>
            )}

            {training.contactEmail && (
              <p>
                For additional information, you can reach out to me at{" "}
                {training.contactEmail}
              </p>
            )}

            {training.skills && (
              <div className="flex items-center gap-2 mt-4">
                {Array.isArray(training.skills) ? (
                  training.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block px-2 py-1 text-xs font-medium border-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="inline-block px-2 py-1 text-xs font-medium border-1 rounded-full">
                    {training.skills}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Company */}
      {(training.companyDescription || training.company?.description) && (
        <div className="p-6 border-1 border-gray2 rounded-lg mt-6">
          <h4>About the Company</h4>
          <p className="text-gray1 mt-4">
            {training.companyDescription || training.company?.description}
          </p>

          {(training.company?.socialMedia || training.socialMedia) && (
            <div className="mt-4 pt-4 flex items-center gap-4 border-t-1 border-gray-2">
              {training.company?.socialMedia?.facebook && (
                <a
                  href={training.company.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon className="h-4 w-4 text-gray1 hover:text-blue-600" />
                </a>
              )}
              {training.company?.socialMedia?.linkedin && (
                <a
                  href={training.company.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinIcon className="h-4 w-4 text-gray1 hover:text-blue-600" />
                </a>
              )}
              {training.company?.socialMedia?.twitter && (
                <a
                  href={training.company.socialMedia.twitter}
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

export default TrainingDetailsDrawer;
