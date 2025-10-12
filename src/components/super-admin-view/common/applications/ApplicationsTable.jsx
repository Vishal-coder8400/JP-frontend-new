import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { User } from "lucide-react";
import CandidateDetailsDrawer from "../candidates/CandidateDetailsDrawer";
import TrainerDetailsDrawer from "../trainers/TrainerDetailsDrawer";

import { useState } from "react";

const ApplicationsTable = ({
  paginatedApplications,
  onRevalidate,
  currentType,
}) => {
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleSelectApplication = (applicationId) => {
    setSelectedApplicationId(applicationId);
  };

  const handleRowClick = (application, event) => {
    // Don't open drawer if radio button was clicked
    if (event.target.type === "radio") {
      return;
    }

    setSelectedApplication(application);
    setDrawerOpen(true);
  };

  console.log(paginatedApplications);

  return (
    <>
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            {" "}
            {/* Ensure minimum width for proper table display */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[40px] font-semibold"></TableHead>
                  <TableHead className="min-w-[80px] font-semibold">
                    ID
                  </TableHead>
                  <TableHead className="min-w-[250px] font-semibold">
                    Applicant
                  </TableHead>
                  <TableHead className="min-w-[120px] font-semibold">
                    Source
                  </TableHead>
                  <TableHead className="min-w-[150px] font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="min-w-[100px] font-semibold">
                    Experience
                  </TableHead>
                  <TableHead className="min-w-[120px] font-semibold">
                    Applied Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedApplications.length > 0 ? (
                  paginatedApplications.map((application) => (
                    <TableRow
                      key={application._id}
                      onClick={(e) => handleRowClick(application, e)}
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="text-center">
                        <input
                          type="radio"
                          name="selectApplication"
                          checked={selectedApplicationId === application._id}
                          onChange={() =>
                            handleSelectApplication(application._id)
                          }
                          aria-label={`Select application ${application._id}`}
                          className="w-4 h-4 text-primary-purple border-2 border-gray-300 focus:ring-2 focus:ring-primary-purple/50 focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:bg-primary-purple checked:border-primary-purple relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-white before:rounded-full before:opacity-0 checked:before:opacity-100"
                        />
                      </TableCell>
                      <TableCell>{application._id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            {application.applicantImage ? (
                              <img
                                src={application.applicantImage}
                                alt={application.applicantName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900">
                              {application.applicantName || "N/A"}
                            </span>
                            <span className="text-sm text-gray-500">
                              {application.applicantRole || "N/A"}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{application.source || "N/A"}</TableCell>
                      <TableCell>{application.status || "N/A"}</TableCell>
                      <TableCell>
                        {application.applicantType === "trainer"
                          ? application.teachingExperience ||
                            application.relevantExperience ||
                            "N/A"
                          : application.applicantExperience || "N/A"}
                      </TableCell>
                      <TableCell>
                        {application.applicationDate
                          ? new Date(
                              application.applicationDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <User className="h-8 w-8 text-gray-400" />
                        <span className="text-gray-500">
                          No applications found matching your criteria
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>{" "}
      {/* Application Details Drawer */}
      {drawerOpen && (
        <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
          <SheetContent
            side="right"
            className="
              w-full h-screen 
              lg:max-w-[750px] 
              md:max-w-full
              sm:max-w-full 
              overflow-y-auto border-transparent bg-white [&>button.absolute]:hidden"
          >
            <div className="w-full h-full">
              {currentType === "training" ? (
                <TrainerDetailsDrawer
                  trainerId={selectedApplication.applicantId}
                  approvalId={selectedApplication._id}
                  context="approvals"
                  approvalStatus={selectedApplication.status}
                  onRevalidate={onRevalidate}
                  onClose={() => setDrawerOpen(false)}
                  buttonsLayout="horizontal"
                />
              ) : (
                <CandidateDetailsDrawer
                  applicationId={selectedApplication._id}
                  candidateId={selectedApplication.applicantId}
                  applicationType={currentType}
                  onRevalidate={onRevalidate}
                  areApprovalBtnsVisible={true}
                />
              )}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default ApplicationsTable;
