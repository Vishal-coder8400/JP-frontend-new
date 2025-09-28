import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LocationIcon } from "@/utils/icon";
import { ClockIcon, DollarSignIcon, CalendarIcon } from "lucide-react";
import { useGetTrainingDetails } from "../../../../../hooks/super-admin/useTraining";

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

  if (!trainingData?.data?.data?.training) {
    return (
      <div className="min-h-full flex flex-col bg-white p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">No training details found</div>
        </div>
      </div>
    );
  }

  const training = trainingData.data.data.training;

  return (
    <div className="min-h-full flex flex-col bg-white p-6">
      {/* Header */}
      <div className="flex justify-between gap-4 p-6 border-1 border-gray2 rounded-lg">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            {training.title && (
              <p className="text-xl font-medium">{training.title}</p>
            )}
            <Badge
              className={`text-xs ${
                training.status === "active"
                  ? "text-green-600 bg-green-100"
                  : training.status === "closed"
                  ? "text-red-600 bg-red-100"
                  : "text-gray-600 bg-gray-100"
              }`}
            >
              {training.status?.charAt(0).toUpperCase() +
                training.status?.slice(1)}
            </Badge>
          </div>
          <div className="text-gray1 flex items-center gap-6 mt-2">
            {training.trainingMode && (
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-gray1" />
                {training.trainingMode}
              </div>
            )}
            {training.subjectMatterExpertise && (
              <div className="flex items-center gap-2">
                <LocationIcon className="h-4 w-4 text-gray1" />
                {training.subjectMatterExpertise}
              </div>
            )}
            {training.participantsPerBatch && (
              <div className="flex items-center gap-2">
                <DollarSignIcon className="h-4 w-4 text-gray1" />
                {training.participantsPerBatch} participants per batch
              </div>
            )}
          </div>

          {training.createdAt && (
            <div className="text-gray1 flex items-center gap-2 mt-2">
              <CalendarIcon className="h-4 w-4 text-gray1" />
              Created: {new Date(training.createdAt).toLocaleDateString()}
            </div>
          )}
        </div>
        <Button variant="black">Apply Now</Button>
      </div>

      {/* Content */}
      <div className="p-6 border-1 border-gray2 rounded-lg mt-6">
        <div>
          <h3 className="text-lg font-semibold">About the training</h3>
          <div className="text-gray1 mt-4 space-y-4">
            {training.description && (
              <>
                <h4 className="font-semibold">Description</h4>
                <p>{training.description}</p>
              </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {training.trainingMode && (
                <div>
                  <h4 className="font-semibold">Training Mode</h4>
                  <p>{training.trainingMode}</p>
                </div>
              )}

              {training.sessionFrequency && (
                <div>
                  <h4 className="font-semibold">Session Frequency</h4>
                  <p>{training.sessionFrequency}</p>
                </div>
              )}

              {training.totalDurationDays && (
                <div>
                  <h4 className="font-semibold">Total Duration</h4>
                  <p>{training.totalDurationDays} days</p>
                </div>
              )}

              {training.hoursPerDay && (
                <div>
                  <h4 className="font-semibold">Hours Per Day</h4>
                  <p>{training.hoursPerDay} hours</p>
                </div>
              )}

              {training.sessionsExpected && (
                <div>
                  <h4 className="font-semibold">Expected Sessions</h4>
                  <p>{training.sessionsExpected} sessions</p>
                </div>
              )}

              {training.minimumExperience && (
                <div>
                  <h4 className="font-semibold">Minimum Experience</h4>
                  <p>{training.minimumExperience}</p>
                </div>
              )}

              {training.subjectMatterExpertise && (
                <div>
                  <h4 className="font-semibold">Subject Matter</h4>
                  <p>{training.subjectMatterExpertise}</p>
                </div>
              )}

              {training.participantsPerBatch && (
                <div>
                  <h4 className="font-semibold">Participants Per Batch</h4>
                  <p>{training.participantsPerBatch}</p>
                </div>
              )}
            </div>

            {training.qualificationsRequired && (
              <>
                <h4 className="font-semibold">Qualifications Required</h4>
                <p>{training.qualificationsRequired}</p>
              </>
            )}

            {training.languagesFluent &&
              training.languagesFluent.length > 0 && (
                <>
                  <h4 className="font-semibold">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {training.languagesFluent.map((language, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </>
              )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Study Materials Provided</h4>
                <p>{training.studyMaterialsProvided ? "Yes" : "No"}</p>
              </div>

              <div>
                <h4 className="font-semibold">Demo Session Available</h4>
                <p>{training.demoSessionBeforeConfirming ? "Yes" : "No"}</p>
              </div>

              <div>
                <h4 className="font-semibold">Travel Required</h4>
                <p>{training.travelRequired ? "Yes" : "No"}</p>
              </div>

              <div>
                <h4 className="font-semibold">Past Client Recommendations</h4>
                <p>{training.recommendationsFromPastClients ? "Yes" : "No"}</p>
              </div>
            </div>

            {training.skills && training.skills.length > 0 && (
              <>
                <h4 className="font-semibold">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {training.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingDetailsDrawer;
