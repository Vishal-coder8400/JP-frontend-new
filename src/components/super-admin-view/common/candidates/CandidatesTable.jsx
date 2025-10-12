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
  context = "database",
}) => {
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [candidateIdForDrawer, setCandidateIdForDrawer] = useState(null);
  const [approvalIdForDrawer, setApprovalIdForDrawer] = useState(null);

  const handleSelectCandidate = (candidateId) => {
    setSelectedCandidateId(candidateId);
  };

  const handleRowClick = (candidate, event) => {
    if (event.target.type === "radio") {
      return;
    }

    const candidateId =
      context === "approvals" ? candidate.candidateId : candidate._id;
    const approvalId = context === "approvals" ? candidate.id : undefined;

    setCandidateIdForDrawer(candidateId);
    setApprovalIdForDrawer(approvalId);
    setDrawerOpen(true);
  };

  const getCandidateStatus = (candidate) => {
    return candidate.approvalStatus || candidate.jobStatus;
  };

  const colSpan = showStatusColumn ? 7 : 6;

  return (
    <>
      <div className="bg-white rounded-lg border overflow-hidden h-full">
        <Table className="table-fixed min-w-[1240px]">
          <TableHeader className="sticky top-0 bg-white z-10 border-b">
            <TableRow>
              <TableHead className="w-[40px] font-semibold"></TableHead>
              <TableHead className="w-[160px] font-semibold">ID</TableHead>
              <TableHead className="w-[300px] font-semibold">
                Candidate Name
              </TableHead>
              <TableHead className="w-[200px] font-semibold">Skills</TableHead>
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
                    title={candidate?._id || "N/A"}
                  >
                    {candidate?._id || "N/A"}
                  </TableCell>
                  <TableCell className="w-[300px] max-w-[300px]">
                    <div className="flex items-center gap-3">
                      {candidate?.profilePicture ? (
                        <img
                          src={candidate.profilePicture}
                          alt={`${candidate?.name} avatar`}
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
                          title={candidate?.name || "N/A"}
                        >
                          {candidate?.name || "N/A"}
                        </span>
                        {candidate?.roleLookingFor && (
                          <span
                            className="text-sm text-gray-500 truncate"
                            title={candidate.roleLookingFor}
                          >
                            {candidate.roleLookingFor}
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell
                    className="w-[200px] max-w-[200px] truncate"
                    title={
                      Array.isArray(candidate?.skills) &&
                      candidate.skills.length > 0
                        ? candidate.skills.join(", ")
                        : "N/A"
                    }
                  >
                    {Array.isArray(candidate?.skills) &&
                    candidate.skills.length > 0
                      ? candidate.skills.join(", ")
                      : "N/A"}
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
              approvalId={approvalIdForDrawer}
              context={context}
              onRevalidate={onRevalidate}
              areApprovalBtnsVisible={context === "approvals"}
              onClose={() => setDrawerOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CandidatesTable;
