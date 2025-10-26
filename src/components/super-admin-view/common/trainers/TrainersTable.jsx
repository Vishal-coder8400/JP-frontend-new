import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "lucide-react";
import AdminStatusBadge from "../../shared/AdminStatusBadge";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { useState } from "react";
import TrainerDetailsDrawer from "./TrainerDetailsDrawer";
import { getRelativeTime } from "../../../../utils/relativeTime";

const TrainersTable = ({
  paginatedTrainers,
  showStatusColumn = false,
  onRevalidate,
  context = "database", // "database" or "approvals"
}) => {
  const [selectedTrainerId, setSelectedTrainerId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const handleSelectTrainer = (trainerId) => {
    setSelectedTrainerId(trainerId);
  };

  const handleRowClick = (trainer, event) => {
    if (event.target.type === "radio") {
      return;
    }

    setSelectedTrainer(trainer);
    setDrawerOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[1100px]">
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px] font-semibold"></TableHead>
                  <TableHead className="w-[160px] font-semibold">ID</TableHead>
                  <TableHead className="w-[320px] font-semibold">
                    Name
                  </TableHead>
                  <TableHead className="w-[180px] font-semibold">
                    Industry
                  </TableHead>
                  <TableHead className="w-[180px] font-semibold">
                    Skills
                  </TableHead>
                  <TableHead className="w-[100px] font-semibold">
                    Experience
                  </TableHead>
                  <TableHead className="w-[120px] font-semibold">
                    Last Updated
                  </TableHead>
                  {showStatusColumn && (
                    <TableHead className="w-[120px] font-semibold">
                      Status
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTrainers.length > 0 ? (
                  paginatedTrainers.map((trainer) => (
                    <TableRow
                      key={trainer._id}
                      onClick={(e) => handleRowClick(trainer, e)}
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="text-center w-[40px]">
                        <input
                          type="radio"
                          name="selectTrainer"
                          checked={selectedTrainerId === trainer._id}
                          onChange={() => handleSelectTrainer(trainer._id)}
                          aria-label={`Select trainer ${trainer.name || "N/A"}`}
                          className="w-4 h-4 text-primary-purple border-2 border-gray-300 focus:ring-2 focus:ring-primary-purple/50 focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:bg-primary-purple checked:border-primary-purple relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-white before:rounded-full before:opacity-0 checked:before:opacity-100"
                        />
                      </TableCell>
                      <TableCell
                        className="w-[160px] max-w-[160px] truncate"
                        title={trainer._id}
                      >
                        {trainer._id}
                      </TableCell>
                      <TableCell className="w-[320px] max-w-[320px]">
                        <div className="flex items-center gap-3">
                          {trainer.profileImage ? (
                            <img
                              src={trainer.profileImage}
                              alt={`${trainer.name || "Trainer"} avatar`}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                          <div className="flex flex-col min-w-0">
                            <span
                              className="font-medium text-gray-900 truncate"
                              title={trainer.name || "N/A"}
                            >
                              {trainer.name || "N/A"}
                            </span>
                            <span
                              className="text-sm text-gray-500 truncate"
                              title={trainer.email || "N/A"}
                            >
                              {trainer.email || "N/A"}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell
                        className="w-[180px] max-w-[180px] truncate"
                        title={
                          Array.isArray(trainer.industryExperience)
                            ? trainer.industryExperience
                                .map(
                                  (industry) => industry.name || industry._id
                                )
                                .join(", ")
                            : trainer.industryExperience || "N/A"
                        }
                      >
                        {Array.isArray(trainer.industryExperience)
                          ? trainer.industryExperience
                              .map((industry) => industry.name || industry._id)
                              .join(", ")
                          : trainer.industryExperience || "N/A"}
                      </TableCell>
                      <TableCell
                        className="w-[180px] max-w-[180px] truncate"
                        title={
                          Array.isArray(trainer.expertiseAreas)
                            ? trainer.expertiseAreas
                                .map((area) => area.name || area._id)
                                .join(", ")
                            : trainer.expertiseAreas || "N/A"
                        }
                      >
                        {Array.isArray(trainer.expertiseAreas)
                          ? trainer.expertiseAreas
                              .map((area) => area.name || area._id)
                              .join(", ")
                          : trainer.expertiseAreas || "N/A"}
                      </TableCell>
                      <TableCell className="w-[100px]">
                        {trainer.totalYearOfExperience || ""}
                      </TableCell>
                      <TableCell className="w-[120px]">
                        {getRelativeTime(trainer.updatedAt)}
                      </TableCell>
                      {showStatusColumn && (
                        <TableCell className="w-[120px]">
                          <AdminStatusBadge
                            status={trainer.approvalStatus || trainer.status}
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={showStatusColumn ? 8 : 7}
                      className="text-center py-8"
                    >
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <User className="h-8 w-8 text-gray-400" />
                        <span className="text-gray-500">
                          No trainers found matching your criteria
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent
          side="right"
          className="
            w-full h-screen 
            lg:max-w-[750px] 
            md:max-w-full
            sm:max-w-full 
            border-transparent [&>button.absolute]:hidden"
        >
          <div
            className={`bg-white ${
              context === "approvals" ? "rounded-2xl" : "rounded-l-2xl"
            } w-full h-full`}
          >
            <TrainerDetailsDrawer
              context={context}
              approvalId={context === "approvals" ? selectedTrainer?.id : null}
              approvalStatus={
                context === "approvals"
                  ? selectedTrainer?.approvalStatus || selectedTrainer?.status
                  : undefined
              }
              trainerId={
                context === "approvals"
                  ? selectedTrainer?.trainerId
                  : selectedTrainer?._id
              }
              onClose={() => setDrawerOpen(false)}
              onRevalidate={onRevalidate}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default TrainersTable;
