import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { GraduationCap, Eye } from "lucide-react";
import TrainingDetailsDrawer from "../../../common/trainings/TrainingDetailsDrawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminStatusBadge from "@/components/super-admin-view/shared/AdminStatusBadge";

const TrainingsApprovalTable = ({
  paginatedTrainings,
  handleDeleteTraining,
  onRevalidate,
}) => {
  const [selectedTrainingId, setSelectedTrainingId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);

  const handleSelectTraining = (trainingId) => {
    setSelectedTrainingId(trainingId);
  };

  const handleRowClick = (training, event) => {
    // Don't navigate if radio button or view details button was clicked
    if (
      event.target.type === "radio" ||
      event.target.closest(".view-details-btn")
    ) {
      return;
    }

    setSelectedTraining(training);
    setDrawerOpen(true);
  };

  const handleViewDetails = (training, event) => {
    event.stopPropagation();
    setSelectedTraining(training);
    setDrawerOpen(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-center w-12">Select</TableHead>
              <TableHead>Training ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Trainer</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Posted Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTrainings.length > 0 ? (
              paginatedTrainings.map((training) => (
                <TableRow
                  key={training.id}
                  onClick={(e) => handleRowClick(training, e)}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="text-center">
                    <input
                      type="radio"
                      name="selectTraining"
                      checked={selectedTrainingId === training.id}
                      onChange={() => handleSelectTraining(training.id)}
                      aria-label={`Select training ${training.title}`}
                      className="w-4 h-4 text-primary-purple border-2 border-gray-300 focus:ring-2 focus:ring-primary-purple/50 focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:bg-primary-purple checked:border-primary-purple relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-white before:rounded-full before:opacity-0 checked:before:opacity-100"
                    />
                  </TableCell>
                  <TableCell>{training.id}</TableCell>
                  <TableCell className="font-medium">
                    {training.title}
                  </TableCell>
                  <TableCell>{training.trainer}</TableCell>
                  <TableCell>{training.category}</TableCell>
                  <TableCell>{training.duration}</TableCell>
                  <TableCell>{training.level}</TableCell>
                  <TableCell>{formatDate(training.postedDate)}</TableCell>
                  <TableCell>
                    <AdminStatusBadge status={training.approvalStatus} />
                  </TableCell>
                  <TableCell className="text-center">
                    <button
                      onClick={(e) => handleViewDetails(training, e)}
                      className="view-details-btn inline-flex items-center px-3 py-1 text-sm text-primary-purple hover:text-primary-purple-dark transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center">
                    <GraduationCap className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500 text-lg font-medium">
                      No trainings found
                    </p>
                    <p className="text-gray-400 text-sm">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Training Details Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent
          side="right"
          className="w-full h-screen 
            lg:max-w-[900px] 
            md:max-w-full
            sm:max-w-full 
            overflow-y-auto border-transparent [&>button.absolute]:hidden bg-white"
        >
          <TrainingDetailsDrawer
            training={selectedTraining}
            context="approvals"
            areApprovalBtnsVisible={true}
            onClose={() => setDrawerOpen(false)}
            onRevalidate={onRevalidate}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default TrainingsApprovalTable;
