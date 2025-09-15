import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../ui/table";
import { Sheet, SheetContent } from "../../../../ui/sheet";
import { User } from "lucide-react";
import RecruiterDetails from "./RecruiterDetails";

import { useState } from "react";

const RecruitersTable = ({ paginatedRecruiters = [] }) => {
  const [selectedRecruiterId, setSelectedRecruiterId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);

  const handleSelectRecruiter = (recruiterId) => {
    setSelectedRecruiterId(recruiterId);
  };

  const handleRowClick = (recruiter, event) => {
    // Don't open drawer if radio button was clicked
    if (event.target.type === "radio") {
      return;
    }

    setSelectedRecruiter(recruiter);
    setDrawerOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[40px] font-semibold"></TableHead>
                <TableHead className="min-w-[80px] font-semibold">ID</TableHead>
                <TableHead className="min-w-[250px] font-semibold">
                  Name
                </TableHead>
                <TableHead className="min-w-[200px] font-semibold">
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRecruiters && paginatedRecruiters.length > 0 ? (
                paginatedRecruiters.map((recruiter) => (
                  <TableRow
                    key={recruiter.id}
                    onClick={(e) => handleRowClick(recruiter, e)}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="text-center">
                      <input
                        type="radio"
                        name="selectRecruiter"
                        checked={selectedRecruiterId === recruiter.id}
                        onChange={() => handleSelectRecruiter(recruiter.id)}
                        aria-label={`Select recruiter ${recruiter.name}`}
                        className="w-4 h-4 text-primary-purple border-2 border-gray-300 focus:ring-2 focus:ring-primary-purple/50 focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:bg-primary-purple checked:border-primary-purple relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-white before:rounded-full before:opacity-0 checked:before:opacity-100"
                      />
                    </TableCell>
                    <TableCell>{recruiter.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {recruiter.profileImage ? (
                          <img
                            src={recruiter.profileImage}
                            alt={`${recruiter.name} avatar`}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">
                            {recruiter.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {recruiter.designation || "Recruiter"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {recruiter.email}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {recruiter.phone?.countryCode && recruiter.phone?.number
                        ? `${recruiter.phone.countryCode} ${recruiter.phone.number}`
                        : recruiter.phone || "N/A"}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {recruiter.company ||
                        recruiter.lastOrganization?.name ||
                        "N/A"}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {recruiter.candidatesCount ||
                        recruiter.candidates?.length ||
                        0}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
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

      {/* Recruiter Details Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent
          side="right"
          className="
            w-full h-screen 
            lg:max-w-[900px] 
            md:max-w-full
            sm:max-w-full 
            overflow-y-auto border-transparent [&>button.absolute]:hidden"
        >
          <div className="w-full h-full">
            <RecruiterDetails recruiter={selectedRecruiter} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default RecruitersTable;
