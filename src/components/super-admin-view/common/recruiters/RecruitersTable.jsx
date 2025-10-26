import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import { Sheet, SheetContent } from "../../../ui/sheet";
import { User } from "lucide-react";
import { useState } from "react";
import AdminStatusBadge from "../../shared/AdminStatusBadge";
import RecruiterDetailsDrawer from "../../approvals/tabs/recruiters/RecruiterDetailsDrawer";

const RecruitersTable = ({
  paginatedRecruiters = [],
  onRevalidate,
  showStatusColumn = false,
  context = "database", // "database" or "approvals"
}) => {
  const [selectedRecruiterId, setSelectedRecruiterId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);

  const handleRowClick = (recruiter, event) => {
    if (event.target.type === "radio") {
      return;
    }
    setSelectedRecruiter(recruiter);
    setDrawerOpen(true);
  };

  const colSpan = showStatusColumn ? 8 : 7;

  return (
    <>
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <div
            className={showStatusColumn ? "min-w-[1200px]" : "min-w-[1000px]"}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[40px] font-semibold"></TableHead>
                  <TableHead className="min-w-[80px] font-semibold">
                    ID
                  </TableHead>
                  <TableHead className="min-w-[250px] font-semibold">
                    Name
                  </TableHead>
                  <TableHead className="min-w-[280px] font-semibold">
                    Email
                  </TableHead>
                  <TableHead className="min-w-[150px] font-semibold">
                    Phone
                  </TableHead>
                  <TableHead className="min-w-[150px] font-semibold">
                    Company
                  </TableHead>
                  <TableHead className="min-w-[120px] font-semibold">
                    Candidates
                  </TableHead>
                  {showStatusColumn && (
                    <TableHead className="min-w-[120px] font-semibold">
                      Status
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRecruiters && paginatedRecruiters.length > 0 ? (
                  paginatedRecruiters.map((recruiter) => {
                    const recruiterId =
                      context === "approvals" ? recruiter.id : recruiter._id;
                    const recruiterName = recruiter.name || "N/A";
                    const recruiterEmail = recruiter.email || "N/A";
                    const recruiterPhone =
                      recruiter.phone?.countryCode && recruiter.phone?.number
                        ? `${recruiter.phone.countryCode} ${recruiter.phone.number}`
                        : recruiter.contact || "N/A";
                    const recruiterProfileImage = recruiter.profileImage;

                    return (
                      <TableRow
                        key={recruiterId}
                        onClick={(e) => handleRowClick(recruiter, e)}
                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <TableCell className="text-center">
                          <input
                            type="radio"
                            name="selectRecruiter"
                            checked={selectedRecruiterId === recruiterId}
                            onChange={() => setSelectedRecruiterId(recruiterId)}
                            aria-label={`Select recruiter ${recruiterName}`}
                            className="w-4 h-4 text-primary-purple border-2 border-gray-300 focus:ring-2 focus:ring-primary-purple/50 focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:bg-primary-purple checked:border-primary-purple relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-white before:rounded-full before:opacity-0 checked:before:opacity-100"
                          />
                        </TableCell>
                        <TableCell>{recruiterId}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {recruiterProfileImage ? (
                              <img
                                src={recruiterProfileImage}
                                alt={`${recruiterName} avatar`}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <User className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-900">
                                {recruiterName}
                              </span>
                              <span className="text-sm text-gray-500">
                                {"Recruiter"}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-700">
                          {recruiterEmail}
                        </TableCell>
                        <TableCell className="text-gray-700">
                          {recruiterPhone}
                        </TableCell>
                        <TableCell className="text-gray-700">
                          {recruiter.company || "N/A"}
                        </TableCell>
                        <TableCell className="text-gray-700">
                          {recruiter.candidatesCount || 0}
                        </TableCell>
                        {showStatusColumn && (
                          <TableCell>
                            <AdminStatusBadge
                              status={
                                recruiter.approvalStatus || recruiter.jobStatus
                              }
                            />
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={colSpan} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <User className="h-8 w-8 text-gray-400" />
                        <span className="text-gray-500">
                          No recruiters found matching your criteria
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

      {/* Recruiter Details Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent
          side="right"
          className="
            w-full h-screen 
            lg:max-w-[750px] 
            md:max-w-full
            sm:max-w-full 
            overflow-y-auto border-transparent [&>button.absolute]:hidden"
        >
          <div className="w-full">
            <RecruiterDetailsDrawer
              recruiterId={
                context === "approvals"
                  ? selectedRecruiter?.recruiterId
                  : selectedRecruiter?._id
              }
              context={context}
              approvalId={
                context === "approvals" ? selectedRecruiter?.id : undefined
              }
              approvalStatus={
                context === "approvals"
                  ? selectedRecruiter?.approvalStatus ||
                    selectedRecruiter?.status
                  : undefined
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

export default RecruitersTable;
