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
import CandidateDetailsDrawer from "./CandidateDetailsDrawer";
import AdminStatusBadge from "../../shared/AdminStatusBadge";
import { getRelativeTime } from "@/utils/relativeTime";
import { useState } from "react";

const CandidatesTable = ({
  paginatedCandidates,
  onRevalidate,
  showStatusColumn = false,
}) => {
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [candidateIdForDrawer, setCandidateIdForDrawer] = useState(null);

  const handleSelectCandidate = (candidateId) => {
    setSelectedCandidateId(candidateId);
  };

  const handleRowClick = (candidate, event) => {
    if (event.target.type === "radio") {
      return;
    }

    setCandidateIdForDrawer(candidate._id);
    setDrawerOpen(true);
  };

  const getCandidateStatus = (candidate) => {
    return candidate.jobStatus || candidate.status;
  };

  const colSpan = showStatusColumn ? 8 : 7;

  return (
    <>
      <div className="bg-white rounded-lg border overflow-x-auto">
        <Table className="table-fixed min-w-[1240px]">
          <TableHeader className="sticky top-0 bg-white z-10 border-b">
            <TableRow>
              <TableHead className="w-[40px] font-semibold"></TableHead>
              <TableHead className="w-[160px] font-semibold">Id</TableHead>
              <TableHead className="w-[250px] font-semibold">Name</TableHead>
              <TableHead className="w-[200px] font-semibold">Email</TableHead>
              <TableHead className="w-[180px] font-semibold">
                Contact Number
              </TableHead>
              <TableHead className="w-[140px] font-semibold">
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
            {paginatedCandidates.length > 0 ? (
              paginatedCandidates.map((candidate) => (
                <TableRow
                  key={candidate._id}
                  onClick={(e) => handleRowClick(candidate, e)}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="text-center w-[40px]">
                    <input
                      type="radio"
                      name="selectCandidate"
                      checked={selectedCandidateId === candidate._id}
                      onChange={() => handleSelectCandidate(candidate._id)}
                      aria-label={`Select candidate ${candidate?.name}`}
                      className="w-4 h-4 text-primary-purple border-2 border-gray-300 focus:ring-2 focus:ring-primary-purple/50 focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:bg-primary-purple checked:border-primary-purple relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-white before:rounded-full before:opacity-0 checked:before:opacity-100"
                    />
                  </TableCell>
                  <TableCell
                    className="w-[160px] max-w-[160px] truncate"
                    title={candidate?._id || "-"}
                  >
                    {candidate?._id || "-"}
                  </TableCell>
                  <TableCell className="w-[250px] max-w-[250px]">
                    <span
                      className="font-medium text-gray-900"
                      title={candidate?.name || "-"}
                    >
                      {candidate?.name || "-"}
                    </span>
                  </TableCell>
                  <TableCell
                    className="w-[200px] max-w-[200px] truncate"
                    title={candidate?.email || "-"}
                  >
                    {candidate?.email || "-"}
                  </TableCell>
                  <TableCell
                    className="w-[180px] max-w-[180px] truncate"
                    title={candidate?.contactNumber || "-"}
                  >
                    {candidate?.contactNumber || "-"}
                  </TableCell>
                  <TableCell className="w-[140px]">
                    {(candidate?.totalExperience !== undefined ||
                      candidate?.totalExperienceInMonth !== undefined) && (
                      <span>
                        {candidate?.totalExperience !== undefined &&
                          `${candidate.totalExperience} Years `}
                        {candidate?.totalExperienceInMonth !== undefined &&
                          `${candidate.totalExperienceInMonth} Months`}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="w-[120px]">
                    {getRelativeTime(candidate?.updatedAt)}
                  </TableCell>
                  {showStatusColumn && (
                    <TableCell className="w-[120px]">
                      <AdminStatusBadge
                        status={getCandidateStatus(candidate)}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={colSpan} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <User className="h-8 w-8 text-gray-400" />
                    <span className="text-gray-500">
                      No candidates found matching your criteria
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Candidate Details Drawer */}
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
          <div className="w-full h-full">
            <CandidateDetailsDrawer
              candidateId={candidateIdForDrawer}
              context="database"
              onRevalidate={onRevalidate}
              onClose={() => setDrawerOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CandidatesTable;
