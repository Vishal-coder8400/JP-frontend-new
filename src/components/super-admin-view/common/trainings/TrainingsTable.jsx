import { Sheet, SheetContent } from "../../../ui/sheet";
import { GraduationCap, MoveUpRightIcon } from "lucide-react";
import TrainingDetailsDrawer from "./TrainingDetailsDrawer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const STATUS_COLORS = {
  active: "bg-success2 text-success1",
  closed: "bg-danger2 text-danger1",
  pending: "bg-warning2 text-warning1",
};

const RADIO_CLASS =
  "w-4 h-4 text-primary-purple border-2 border-gray-300 focus:ring-2 focus:ring-primary-purple/50 focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:bg-primary-purple checked:border-primary-purple relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-white before:rounded-full before:opacity-0 checked:before:opacity-100";

const TrainingsTable = ({
  paginatedTrainings,
  onRevalidate,
  context = "database",
}) => {
  const [selectedTrainingId, setSelectedTrainingId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [detailsTrainingId, setDetailsTrainingId] = useState(null);
  const [detailsApprovalId, setDetailsApprovalId] = useState(null);
  const [detailsApprovalStatus, setDetailsApprovalStatus] = useState(null);
  const navigate = useNavigate();

  const isApprovalContext = context === "approvals";

  const getTrainingId = (training) =>
    isApprovalContext ? training.id : training._id;

  const handleSelectTraining = (training) => {
    setSelectedTrainingId(getTrainingId(training));
  };

  const handleRowClick = (training, event) => {
    if (
      event.target.type === "radio" ||
      event.target.closest(".view-details-btn")
    ) {
      return;
    }

    if (isApprovalContext) {
      setDetailsTrainingId(training.trainingId);
      setDetailsApprovalId(training._id);
      setDetailsApprovalStatus(training.approvalStatus);
      setDrawerOpen(true);
    } else {
      navigate(
        `/super-admin/jobs-and-trainings/${training._id}/candidates?type=training`
      );
    }
  };

  const handleViewDetails = (training, event) => {
    event.stopPropagation();
    setDetailsTrainingId(training._id);
    setDetailsApprovalId(undefined);
    setDetailsApprovalStatus(undefined);
    setDrawerOpen(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        STATUS_COLORS[status] || STATUS_COLORS.active
      }`}
    >
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );

  const thClass =
    "text-foreground h-10 px-2 text-left align-middle font-semibold whitespace-nowrap";

  return (
    <>
      <div className="bg-white rounded-lg border overflow-x-auto">
        <table className="w-full caption-bottom text-sm min-w-[800px]">
          <thead className="[&_tr]:border-b">
            <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
              <th className={thClass}></th>
              <th className={thClass}>ID</th>
              <th className={thClass}>Name</th>
              {isApprovalContext && (
                <>
                  <th className={thClass}>Company</th>
                  <th className={thClass}>Location</th>
                  <th className={thClass}>Posted Date</th>
                  <th className={thClass}>Status</th>
                </>
              )}
              {!isApprovalContext && (
                <>
                  <th className={thClass}>Posted Date</th>
                  <th className={thClass}>Company</th>
                  <th className={thClass}>Candidates</th>
                  <th className={thClass}>Location</th>
                  <th className={thClass}>Experience</th>
                  <th className={thClass}>Status</th>
                  <th className={thClass}>Actions</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {paginatedTrainings.length > 0 ? (
              paginatedTrainings.map((training) => {
                const trainingId = getTrainingId(training);
                const displayId = isApprovalContext
                  ? training.trainingId
                  : training._id;
                const status = isApprovalContext
                  ? training.approvalStatus
                  : training.status;
                const createdAt = training.createdAt || training.postedDate;

                return (
                  <tr
                    key={trainingId}
                    onClick={(e) => handleRowClick(training, e)}
                    className="cursor-pointer hover:bg-muted/50 transition-colors data-[state=selected]:bg-muted border-b"
                  >
                    <td className="p-2 align-middle whitespace-nowrap text-center">
                      <input
                        type="radio"
                        name="selectTraining"
                        checked={selectedTrainingId === trainingId}
                        onChange={() => handleSelectTraining(training)}
                        aria-label={`Select training ${
                          training.title || "N/A"
                        }`}
                        className={RADIO_CLASS}
                      />
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap">
                      {displayId}
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap font-medium">
                      {training.title || "N/A"}
                    </td>
                    {isApprovalContext ? (
                      <>
                        <td className="p-2 align-middle whitespace-nowrap">
                          {training.postedBy?.companyName || "N/A"}
                        </td>
                        <td className="p-2 align-middle whitespace-nowrap">
                          {training.trainingMode || "N/A"}
                        </td>
                        <td className="p-2 align-middle whitespace-nowrap">
                          {formatDate(createdAt)}
                        </td>
                        <td className="p-2 align-middle whitespace-nowrap">
                          {getStatusBadge(status)}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-2 align-middle whitespace-nowrap">
                          {formatDate(createdAt)}
                        </td>
                        <td className="p-2 align-middle whitespace-nowrap">
                          {training.postedBy?.companyName || "N/A"}
                        </td>
                        <td className="p-2 align-middle whitespace-nowrap">
                          {training.applicationStats?.total || 0}
                        </td>
                        <td className="p-2 align-middle whitespace-nowrap">
                          {training.trainingMode || "N/A"}
                        </td>
                        <td className="p-2 align-middle whitespace-nowrap">
                          {training.minimumExperience || "N/A"}
                        </td>
                        <td className="p-2 align-middle whitespace-nowrap">
                          {getStatusBadge(status)}
                        </td>
                        <td className="p-2 align-middle whitespace-nowrap">
                          <button
                            className="view-details-btn inline-flex items-center px-3 py-1.5 text-sm font-medium text-primary-purple bg-light-purple rounded-md hover:bg-light-purple/80 transition-colors gap-2"
                            onClick={(e) => handleViewDetails(training, e)}
                          >
                            View Details
                            <MoveUpRightIcon className="w-3 h-3" />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={isApprovalContext ? 7 : 10}
                  className="p-2 align-middle whitespace-nowrap text-center py-8"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <GraduationCap className="h-8 w-8 text-gray-400" />
                    <span className="text-gray-500">
                      No trainings found matching your criteria
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent
          side="right"
          className="w-full h-screen lg:max-w-[750px] md:max-w-full sm:max-w-full overflow-y-auto border-transparent [&>button.absolute]:hidden bg-white"
        >
          {detailsTrainingId && (
            <TrainingDetailsDrawer
              trainingId={detailsTrainingId}
              context={context}
              areApprovalBtnsVisible={isApprovalContext}
              approvalId={detailsApprovalId}
              approvalStatus={detailsApprovalStatus}
              onClose={() => setDrawerOpen(false)}
              onRevalidate={onRevalidate}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default TrainingsTable;
