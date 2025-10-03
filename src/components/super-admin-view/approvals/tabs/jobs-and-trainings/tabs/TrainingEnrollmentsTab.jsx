import { Users, User, Calendar, Mail, Phone, CheckCircle } from "lucide-react";

const TrainingEnrollmentsTab = ({ training }) => {
  // Mock data - replace with actual API call
  const enrollments = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      phone: "+1 (555) 111-2222",
      enrolledDate: "2024-01-10",
      status: "enrolled",
      progress: "25%",
    },
    {
      id: 2,
      name: "Bob Wilson",
      email: "bob.wilson@email.com",
      phone: "+1 (555) 333-4444",
      enrolledDate: "2024-01-12",
      status: "completed",
      progress: "100%",
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol.davis@email.com",
      phone: "+1 (555) 555-6666",
      enrolledDate: "2024-01-15",
      status: "enrolled",
      progress: "10%",
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
      enrolled: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      dropped: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusColors[status] || statusColors.enrolled
        }`}
      >
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  const getProgressColor = (progress) => {
    const percentage = parseInt(progress);
    if (percentage >= 100) return "bg-green-500";
    if (percentage >= 50) return "bg-blue-500";
    if (percentage >= 25) return "bg-yellow-500";
    return "bg-gray-300";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="h-6 w-6 text-primary-purple" />
          <h3 className="text-lg font-semibold text-gray-900">
            Training Enrollments
          </h3>
        </div>
        <span className="text-sm text-gray-500">
          {enrollments.length} enrollment{enrollments.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Enrollments List */}
      <div className="space-y-4">
        {enrollments.length > 0 ? (
          enrollments.map((enrollment) => (
            <div
              key={enrollment.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-purple/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary-purple" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {enrollment.name}
                    </h4>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{enrollment.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{enrollment.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Enrolled on {formatDate(enrollment.enrolledDate)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-500">Progress</span>
                        <span className="text-sm font-medium">
                          {enrollment.progress}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(
                            enrollment.progress
                          )}`}
                          style={{ width: enrollment.progress }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {getStatusBadge(enrollment.status)}
                  {enrollment.status === "completed" && (
                    <div className="flex items-center text-green-600 text-sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Completed
                    </div>
                  )}
                  <button className="text-primary-purple text-sm font-medium hover:underline">
                    View Progress
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">
              No enrollments yet
            </p>
            <p className="text-gray-400 text-sm">
              Enrollments will appear here once participants register for this
              training
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingEnrollmentsTab;
