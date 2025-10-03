import {
  MapPin,
  Building2,
  Clock,
  DollarSign,
  Users,
  Calendar,
} from "lucide-react";

const JobDetailsTab = ({ job }) => {
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
            <Building2 className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Company</p>
              <p className="font-medium">{job.company || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{job.location || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Experience Level</p>
              <p className="font-medium">{job.experience || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <DollarSign className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Salary Range</p>
              <p className="font-medium">{job.salaryRange || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Job Description
        </h3>
        <div className="prose max-w-none">
          <p className="text-gray-700 whitespace-pre-wrap">
            {job.description || "No description available"}
          </p>
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Requirements
        </h3>
        <div className="space-y-2">
          {job.requirements && job.requirements.length > 0 ? (
            job.requirements.map((requirement, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-purple rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">{requirement}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No requirements specified</p>
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
              <p className="text-sm text-gray-500">Posted Date</p>
              <p className="font-medium">{formatDate(job.postedDate)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Job Type</p>
              <p className="font-medium">{job.jobType || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsTab;
