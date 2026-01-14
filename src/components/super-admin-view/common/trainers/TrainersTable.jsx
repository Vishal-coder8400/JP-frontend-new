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
      <div className="bg-white rounded-lg border overflow-x-auto">
        <div className="min-w-[1400px]">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px] font-semibold"></TableHead>
                <TableHead className="min-w-[160px] max-w-[160px] font-semibold">
                  ID
                </TableHead>
                <TableHead className="min-w-[280px] max-w-[280px] font-semibold">
                  Name
                </TableHead>
                <TableHead className="min-w-[200px] max-w-[200px] font-semibold">
                  Email
                </TableHead>
                <TableHead className="min-w-[180px] max-w-[180px] font-semibold">
                  Contact Number
                </TableHead>
                <TableHead className="min-w-[180px] max-w-[180px] font-semibold">
                  Sector
                </TableHead>
                <TableHead className="min-w-[120px] max-w-[120px] font-semibold">
                  Experience
                </TableHead>
                {context === "approvals" ? (
                  <TableHead className="min-w-[140px] max-w-[140px] font-semibold">
                    Posted Date
                  </TableHead>
                ) : (
                  <TableHead className="min-w-[140px] max-w-[140px] font-semibold">
                    Last updated
                  </TableHead>
                )}
                {showStatusColumn && (
                  <TableHead className="min-w-[120px] max-w-[120px] font-semibold">
                    Status
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTrainers && paginatedTrainers.length > 0 ? (
                paginatedTrainers.map((trainer) => (
                  <TableRow
                    key={trainer.id}
                    onClick={(e) => handleRowClick(trainer, e)}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="text-center w-[40px]">
                      <input
                        type="radio"
                        name="selectTrainer"
                        checked={selectedTrainerId === trainer.id}
                        onChange={() => handleSelectTrainer(trainer.id)}
                        aria-label={`Select trainer ${trainer.name}`}
                        className="w-4 h-4 text-primary-purple border-2 border-gray-300 focus:ring-2 focus:ring-primary-purple/50 focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:bg-primary-purple checked:border-primary-purple relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-white before:rounded-full before:opacity-0 checked:before:opacity-100"
                      />
                    </TableCell>
                    <TableCell className="max-w-[160px] truncate">
                      {trainer.id}
                    </TableCell>
                    <TableCell className="max-w-[280px]">
                      <div className="flex items-center gap-3 min-w-0">
                        {trainer.profileImage ? (
                          <img
                            src={trainer.profileImage}
                            alt={`${trainer.name} avatar`}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                        <div className="flex flex-col min-w-0">
                          <span className="font-medium text-gray-900 truncate">
                            {trainer.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700 max-w-[200px] truncate">
                      {trainer.email}
                    </TableCell>
                    <TableCell className="text-gray-700 max-w-[180px] truncate">
                      {trainer.contact}
                    </TableCell>
                    <TableCell className="text-gray-700 max-w-[180px] truncate">
                      {trainer.expertiseAreas}
                    </TableCell>
                    <TableCell className="text-gray-700 max-w-[120px] truncate">
                      {trainer.totalYearOfExperience}
                    </TableCell>
                    {context === "approvals" ? (
                      <TableCell className="text-gray-700 max-w-[140px] truncate">
                        {trainer.submittedAt
                          ? getRelativeTime(trainer.submittedAt)
                          : trainer.createdAt
                          ? getRelativeTime(trainer.createdAt)
                          : "-"}
                      </TableCell>
                    ) : (
                      <TableCell className="text-gray-700 max-w-[140px] truncate">
                        {trainer.updatedAt
                          ? getRelativeTime(trainer.updatedAt)
                          : "-"}
                      </TableCell>
                    )}
                    {showStatusColumn && (
                      <TableCell className="max-w-[120px]">
                        <AdminStatusBadge status={trainer.status} />
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={showStatusColumn ? 9 : 8}
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
              approvalId={
                context === "approvals"
                  ? selectedTrainer?.approvalId
                  : undefined
              }
              approvalStatus={
                context === "approvals" ? selectedTrainer?.status : undefined
              }
              trainerId={selectedTrainer?.id}
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
