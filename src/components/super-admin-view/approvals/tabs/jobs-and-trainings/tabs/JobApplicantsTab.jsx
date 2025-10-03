import { Users, User, Calendar, Mail, Phone } from "lucide-react";

const JobApplicantsTab = ({ job }) => {
  // Mock data - replace with actual API call
  const applicants = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      appliedDate: "2024-01-15",
      status: "pending",
      experience: "3 years",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1 (555) 987-6543",
      appliedDate: "2024-01-14",
      status: "reviewed",
      experience: "5 years",
    },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      reviewed: "bg-blue-100 text-blue-800",
      shortlisted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusColors[status] || statusColors.pending
        }`}
      >
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="h-6 w-6 text-primary-purple" />
          <h3 className="text-lg font-semibold text-gray-900">
            Job Applicants
          </h3>
        </div>
        <span className="text-sm text-gray-500">
          {applicants.length} applicant{applicants.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Applicants List */}
      <div className="space-y-4">
        {applicants.length > 0 ? (
          applicants.map((applicant) => (
            <div
              key={applicant.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-purple/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary-purple" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {applicant.name}
                    </h4>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{applicant.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{applicant.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Applied on {formatDate(applicant.appliedDate)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="text-sm text-gray-500">
                        Experience:{" "}
                      </span>
                      <span className="text-sm font-medium">
                        {applicant.experience}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {getStatusBadge(applicant.status)}
                  <button className="text-primary-purple text-sm font-medium hover:underline">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">
              No applicants yet
            </p>
            <p className="text-gray-400 text-sm">
              Applicants will appear here once they apply for this job
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicantsTab;
