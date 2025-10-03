import {
  GraduationCap,
  Clock,
  Users,
  Calendar,
  DollarSign,
  MapPin,
} from "lucide-react";

const TrainingDetailsTab = ({ training }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Basic Information */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Trainer</p>
              <p className="font-medium">{training.trainer || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">{training.duration || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Level</p>
              <p className="font-medium">{training.level || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <DollarSign className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-medium">{training.price || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Training Description */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Training Description
        </h3>
        <div className="prose max-w-none">
          <p className="text-gray-700 whitespace-pre-wrap">
            {training.description || "No description available"}
          </p>
        </div>
      </div>

      {/* Learning Objectives */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Learning Objectives
        </h3>
        <div className="space-y-2">
          {training.objectives && training.objectives.length > 0 ? (
            training.objectives.map((objective, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-purple rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">{objective}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No objectives specified</p>
          )}
        </div>
      </div>

      {/* Prerequisites */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Prerequisites
        </h3>
        <div className="space-y-2">
          {training.prerequisites && training.prerequisites.length > 0 ? (
            training.prerequisites.map((prerequisite, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-purple rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">{prerequisite}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No prerequisites specified</p>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Additional Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-medium">{formatDate(training.startDate)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">End Date</p>
              <p className="font-medium">{formatDate(training.endDate)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{training.location || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Max Participants</p>
              <p className="font-medium">{training.maxParticipants || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingDetailsTab;
