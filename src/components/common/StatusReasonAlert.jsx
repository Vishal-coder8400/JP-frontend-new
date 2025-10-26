const StatusReasonAlert = ({ statusReason, status, className = "" }) => {
  // Early return if no reason or status is not rejected/hold
  if (!statusReason || (status !== "rejected" && status !== "hold")) {
    return null;
  }

  const isRejected = status === "rejected";

  return (
    <div className={className}>
      <div
        className={`text-sm ${
          isRejected
            ? "bg-red-50 border-red-200"
            : "bg-orange-50 border-orange-200"
        } border rounded-lg p-2`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`font-semibold ${
              isRejected ? "text-red-600" : "text-orange-600"
            }`}
          >
            {isRejected ? "Rejection" : "Hold"} Reason:
          </div>
          <div
            className={`flex-1 ${
              isRejected ? "text-red-800" : "text-orange-800"
            }`}
          >
            {statusReason}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusReasonAlert;
