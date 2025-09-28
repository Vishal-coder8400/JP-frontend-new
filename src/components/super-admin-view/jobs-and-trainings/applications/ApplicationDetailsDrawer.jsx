import { User, Mail, Phone, Calendar, MapPin, Briefcase } from "lucide-react";

const ApplicationDetailsDrawer = ({ application }) => {
  if (!application) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">No application selected</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="h-8 w-8 text-gray-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {application.name}
          </h2>
          <p className="text-gray-600">{application.occupation}</p>
          <p className="text-sm text-gray-500">{application.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{application.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Contact</p>
              <p className="font-medium">{application.contact}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Applied Date</p>
              <p className="font-medium">{application.appliedDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{application.location}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Industry</p>
              <p className="font-medium">{application.industry}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Experience</p>
            <p className="font-medium">{application.experience}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Skills</p>
            <p className="font-medium">{application.skills}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Application Status</p>
            <span
              className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                application.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : application.status === "reviewed"
                  ? "bg-blue-100 text-blue-800"
                  : application.status === "shortlisted"
                  ? "bg-green-100 text-green-800"
                  : application.status === "rejected"
                  ? "bg-red-100 text-red-800"
                  : application.status === "hired"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {application.status.charAt(0).toUpperCase() +
                application.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {application.summary && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Summary</h3>
          <p className="text-gray-600">{application.summary}</p>
        </div>
      )}

      {application.resumeUrl && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Resume</h3>
          <a
            href={application.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            View Resume
          </a>
        </div>
      )}
    </div>
  );
};

export default ApplicationDetailsDrawer;
