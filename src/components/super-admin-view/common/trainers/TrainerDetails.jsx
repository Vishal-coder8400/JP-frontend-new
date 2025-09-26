import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { YourImageIcon, YourPdfIcon } from "@/utils/icon";
import {
  DownloadIcon,
  MailIcon,
  MapPin,
  PhoneCallIcon,
  SquarePenIcon,
  UserIcon,
} from "lucide-react";
import { useApprovals } from "@/hooks/superAdmin/useApprovals";

const TrainerDetails = ({
  trainer,
  areApprovalBtnsVisible = false,
  isLoading = false,
  error = null,
}) => {
  const {
    isLoading: isApprovalLoading,
    approveApplication,
    rejectApplication,
    holdApplication,
  } = useApprovals();

  const handleApprove = async () => {
    try {
      await approveApplication(trainer._id);
      // Optionally refresh the trainer data or close the drawer
    } catch (error) {
      console.error("Failed to approve trainer:", error);
    }
  };

  const handleReject = async () => {
    try {
      await rejectApplication(trainer._id);
      // Optionally refresh the trainer data or close the drawer
    } catch (error) {
      console.error("Failed to reject trainer:", error);
    }
  };

  const handleHold = async () => {
    try {
      await holdApplication(trainer._id);
      // Optionally refresh the trainer data or close the drawer
    } catch (error) {
      console.error("Failed to hold trainer:", error);
    }
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-purple mx-auto mb-4"></div>
          <p className="text-gray-600">Loading trainer details...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <p className="text-red-600 mb-2">Failed to load trainer details</p>
          <p className="text-gray-500 text-sm">
            {error.message || "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  // Handle no trainer data
  if (!trainer) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No trainer data available</p>
        </div>
      </div>
    );
  }

  const pdfObject = {
    Resume: trainer?.resume || "",
    "Relieving Letter": trainer?.relievingLetter || "",
    Certificates: trainer?.certificates || "",
  };

  const pdfFiles = Object.entries(pdfObject).reduce(
    (acc, [customKey, value]) => {
      if (value) {
        acc[customKey] = value;
      }
      return acc;
    },
    {}
  );

  return (
    <div className="h-full overflow-y-auto">
      <div className="h-[186px] w-full bg-[url('/Group_1000005865.jpg')] bg-cover bg-center rounded-tl-2xl" />
      <div className="w-4xl mx-auto flex items-center rounded-xl bg-white border border-gray2 p-4 -mt-8 shadow-lg relative">
        <img
          src={trainer?.profileImage || "/person.png"}
          alt={`${trainer?.firstName} ${trainer?.lastName}`}
          className="w-28 h-auto aspect-square object-cover rounded-full absolute -top-[30%] left-[3%]"
        />
        <SquarePenIcon
          className="absolute -bottom-[32%] left-[12%] text-primary-purple bg-white p-1.5 rounded cursor-pointer"
          onClick={() => {}}
        />
        <div className="ml-36 flex items-center justify-between w-full">
          <div>
            <h1 className="text-xl font-semibold">
              {trainer?.firstName} {trainer?.lastName}
            </h1>
            <p className="text-sm text-gray-600">{trainer?.email}</p>
          </div>
          {areApprovalBtnsVisible && (
            <div className="flex items-center gap-4">
              <Button
                variant={"purple"}
                onClick={handleApprove}
                disabled={isApprovalLoading}
              >
                {isApprovalLoading ? "Processing..." : "Approve Trainer"}
              </Button>
              <Button
                variant={"destructive"}
                onClick={handleReject}
                disabled={isApprovalLoading}
              >
                {isApprovalLoading ? "Processing..." : "Reject Trainer"}
              </Button>
              <Button
                variant={"black"}
                onClick={handleHold}
                disabled={isApprovalLoading}
              >
                {isApprovalLoading ? "Processing..." : "Hold Trainer"}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Personal Information */}
      <div className="p-6">
        <h2 className="text-lg font-semibold mt-4">Personal Information</h2>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="p-4 rounded-lg border border-gray2">
            <div className="flex items-center gap-2 mb-2">
              <UserIcon className="w-4" />
              Experience
            </div>
            <span className="text-gray1/50">
              {trainer?.experience || "Not specified"}
            </span>
          </div>

          <div className="p-4 rounded-lg border border-gray2">
            <div className="flex items-center gap-2 mb-2">
              <UserIcon className="w-4" />
              Expertise
            </div>
            <div className="text-gray1/50">
              {trainer?.expertise && trainer.expertise.length > 0
                ? trainer.expertise.map((skill, index) => (
                    <span key={index} className="inline-block">
                      {skill}
                      {index < trainer.expertise.length - 1 && <br />}
                    </span>
                  ))
                : "Not specified"}
            </div>
          </div>

          <div className="p-4 rounded-lg border border-gray2">
            <div className="flex items-center gap-2 mb-2">
              <PhoneCallIcon className="w-4" />
              Contact Information
            </div>
            <span className="text-gray1/50 inline-flex items-center gap-2">
              <PhoneCallIcon className="w-4" />
              {trainer?.phone || "Not provided"}
            </span>
            <span className="text-gray1/50 inline-flex items-center gap-2">
              <MailIcon className="w-4" />
              <span className="truncate w-40">
                {trainer?.email || "Not provided"}
              </span>
            </span>
          </div>

          <div className="p-4 rounded-lg border border-gray2">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4" />
              Address
            </div>
            <span className="text-gray1/50">
              {trainer?.address || trainer?.location || "Not specified"}
            </span>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="px-6 pb-6">
        {" "}
        {/* Documents */}
        <div className="px-6 pb-6">
          <h2 className="text-lg font-semibold">Documents</h2>
          <div className="flex flex-wrap gap-3 mt-2">
            {Object.entries(pdfFiles).map(([key, value]) => {
              const isPdf = key === "Resume" || key === "Relieving Letter";
              const fileName = value?.split("/").pop();
              const handleDownload = () => {
                if (!value) return;
                const link = document.createElement("a");
                link.href = value;
                link.target = "_blank";
                link.download = fileName || `${key}.pdf`; // default filename fallback
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              };
              return (
                <div
                  key={key}
                  className="relative overflow-hidden p-3 w-[180px] h-[100px] flex flex-col bg-stone-50 rounded-lg gap-2"
                >
                  <div className="flex justify-between items-center w-full mb-2">
                    <div className="flex items-center gap-1">
                      {isPdf ? <YourPdfIcon /> : <YourImageIcon />}
                      <div className="text-neutral-900 text-xs font-medium leading-none">
                        {key}
                      </div>
                    </div>
                    {value?.trim() && (
                      <div className="cursor-pointer" onClick={handleDownload}>
                        <DownloadIcon className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 w-full overflow-hidden rounded-sm mb-2">
                    {value?.trim() ? (
                      isPdf ? (
                        <iframe
                          src={`${value}#toolbar=0&navpanes=0&scrollbar=0`}
                          title={key}
                          className="w-full h-full border-none no-scrollbar"
                        />
                      ) : (
                        <img
                          src={value}
                          alt={key}
                          className="w-full h-full object-cover rounded-sm"
                        />
                      )
                    ) : (
                      <div className="text-center text-gray-400 text-xs h-full flex items-center justify-center">
                        No file found
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full px-3 py-1 bg-stone-50 text-zinc-600 text-xs truncate border-t border-stone-200">
                    {fileName}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="px-6 pb-6 grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold mt-4">Other Details</h2>
            <div className="space-y-2 mt-3">
              <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
                <span className="text-gray1/50 inline-block w-50 text-wrap">
                  Specialization
                </span>
                <span className="font-medium">
                  {trainer?.specialization || "Not specified"}
                </span>
              </div>
              <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
                <span className="text-gray1/50 inline-block w-50 text-wrap">
                  Industry
                </span>
                <span className="font-medium">
                  {trainer?.industry || "Not specified"}
                </span>
              </div>
              <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
                <span className="text-gray1/50 inline-block w-50 text-wrap">
                  Status
                </span>
                <span className="font-medium">
                  {trainer?.status || "Active"}
                </span>
              </div>
              <div className="flex gap-8 border-b border-gray2 py-2 text-sm">
                <span className="text-gray1/50 inline-block w-50 text-wrap">
                  Created
                </span>
                <span className="font-medium">
                  {trainer?.createdAt
                    ? new Date(trainer.createdAt).toLocaleDateString()
                    : "Not specified"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div>
              <h2 className="text-lg font-semibold mt-4">Certifications</h2>
              <div className="flex gap-3 items-center flex-wrap mt-3">
                {trainer?.certifications &&
                trainer.certifications.length > 0 ? (
                  trainer.certifications.map((cert, i) => (
                    <Badge
                      key={i}
                      className="flex justify-between border-b border-gray2 text-gray1 py-2 px-4 text-sm rounded-2xl"
                    >
                      {cert}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-500">
                    No certifications available
                  </span>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mt-4">Training Images</h2>
              <div className="flex flex-wrap gap-3 mt-2">
                {trainer?.trainingImages &&
                trainer.trainingImages.length > 0 ? (
                  trainer.trainingImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Training ${i + 1}`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  ))
                ) : (
                  <span className="text-gray-500">
                    No training images available
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
