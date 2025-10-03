import { Sheet, SheetContent } from "../../../../ui/sheet";
import { GraduationCap, Eye, MoveUpRightIcon } from "lucide-react";
import TrainingDetailsDrawer from "../../../common/trainings/TrainingDetailsDrawer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTrainingApplications } from "../../../../../api/super-admin/jobsAndTrainings";

const TrainingsTable = ({ paginatedTrainings, onRevalidate }) => {
  const [selectedTrainingId, setSelectedTrainingId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const navigate = useNavigate();

  const handleSelectTraining = (trainingId) => {
    setSelectedTrainingId(trainingId);
  };

  const handleRowClick = async (training, event) => {
    // Don't navigate if radio button or view details button was clicked
    if (
      event.target.type === "radio" ||
      event.target.closest(".view-details-btn")
    ) {
      return;
    }

    try {
      await getTrainingApplications({ id: training._id });
      navigate(
        `/super-admin/jobs-and-trainings/job/${training._id}/candidates?type=training`
      );
    } catch (error) {
      console.error("Error fetching training applications:", error);
      navigate(
        `/super-admin/jobs-and-trainings/job/${training._id}/candidates?type=training`
      );
    }
  };

  const handleViewDetails = (training, event) => {
    event.stopPropagation();
    setSelectedTraining(training._id);
    setDrawerOpen(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      active: "bg-success2 text-success1",
      closed: "bg-danger2 text-danger1",
      pending: "bg-warning2 text-warning1",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusColors[status] || statusColors.active
        }`}
      >
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  return (
    <>
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table
            className="w-full caption-bottom text-sm"
            style={{ minWidth: "1200px" }}
          >
            <thead className="[&_tr]:border-b">
              <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                <th
                  className="text-foreground h-10 px-2 text-left align-middle font-semibold whitespace-nowrap"
                  style={{ minWidth: "40px" }}
                ></th>
                <th
                  className="text-foreground h-10 px-2 text-left align-middle font-semibold whitespace-nowrap"
                  style={{ minWidth: "80px" }}
                >
                  ID
                </th>
                <th
                  className="text-foreground h-10 px-2 text-left align-middle font-semibold whitespace-nowrap"
                  style={{ minWidth: "200px" }}
                >
                  Name
                </th>
                <th
                  className="text-foreground h-10 px-2 text-left align-middle font-semibold whitespace-nowrap"
                  style={{ minWidth: "120px" }}
                >
                  Applied Time
                </th>
                <th
                  className="text-foreground h-10 px-2 text-left align-middle font-semibold whitespace-nowrap"
                  style={{ minWidth: "150px" }}
                >
                  Company
                </th>
                <th
                  className="text-foreground h-10 px-2 text-left align-middle font-semibold whitespace-nowrap"
                  style={{ minWidth: "100px" }}
                >
                  Candidates
                </th>
                <th
                  className="text-foreground h-10 px-2 text-left align-middle font-semibold whitespace-nowrap"
                  style={{ minWidth: "120px" }}
                >
                  Location
                </th>
                <th
                  className="text-foreground h-10 px-2 text-left align-middle font-semibold whitespace-nowrap"
                  style={{ minWidth: "120px" }}
                >
                  Experience
                </th>
                <th
                  className="text-foreground h-10 px-2 text-left align-middle font-semibold whitespace-nowrap"
                  style={{ minWidth: "100px" }}
                >
                  Status
                </th>
                <th
                  className="text-foreground h-10 px-2 text-left align-middle font-semibold whitespace-nowrap"
                  style={{ minWidth: "150px" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {paginatedTrainings.length > 0 ? (
                paginatedTrainings.map((training) => (
                  <tr
                    key={training._id}
                    onClick={(e) => handleRowClick(training, e)}
                    className="cursor-pointer hover:bg-gray-50 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted border-b"
                  >
                    <td className="p-2 align-middle whitespace-nowrap text-center">
                      <input
                        type="radio"
                        name="selectTraining"
                        checked={selectedTrainingId === training._id}
                        onChange={() => handleSelectTraining(training._id)}
                        aria-label={`Select training ${training.title}`}
                        className="w-4 h-4 text-primary-purple border-2 border-gray-300 focus:ring-2 focus:ring-primary-purple/50 focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:bg-primary-purple checked:border-primary-purple relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-white before:rounded-full before:opacity-0 checked:before:opacity-100"
                      />
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap">
                      {training._id}
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap font-medium">
                      {training.title}
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap">
                      {formatDate(training.createdAt)}
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap">
                      {/* Company field not available in API response */}
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap">
                      {/* Candidates field not available in API response */}
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap">
                      {training.trainingMode}
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap">
                      {training.minimumExperience}
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap">
                      {getStatusBadge(training.status)}
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap">
                      <button
                        className="view-details-btn inline-flex items-center px-3 py-1.5 text-sm font-medium text-primary-purple bg-light-purple rounded-md hover:bg-light-purple/80 cursor-pointer transition-colors gap-2"
                        onClick={(e) => handleViewDetails(training, e)}
                      >
                        View Details
                        <MoveUpRightIcon className="w-3 h-3 mr-1" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={10}
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
      </div>

      {/* Training Details Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent
          side="right"
          className="
            w-full h-screen 
            lg:max-w-[750px] 
            md:max-w-full
            sm:max-w-full 
            overflow-y-auto border-transparent [&>button.absolute]:hidden bg-white"
        >
          <TrainingDetailsDrawer
            trainingId={selectedTraining}
            context="jobs-and-trainings"
            onRevalidate={onRevalidate}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default TrainingsTable;
