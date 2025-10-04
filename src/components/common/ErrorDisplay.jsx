import { formatApiError } from "../../utils/commonFunctions";

const ErrorDisplay = ({ error, title, className = "" }) => {
  if (!error) return null;

  const errorMessage = formatApiError(error);
  const displayTitle = title || "Error loading data";

  return (
    <div
      className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}
    >
      <div className="text-red-800 font-medium">{displayTitle}</div>
      <div className="text-red-600 text-sm mt-1">{errorMessage}</div>
    </div>
  );
};

export default ErrorDisplay;
