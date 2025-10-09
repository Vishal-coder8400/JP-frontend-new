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
import { useGetCandidateDetails } from "@/hooks/super-admin/useApplicant";
import AdminStatusBadge from "../../../shared/AdminStatusBadge";

import { useState } from "react";

const CandidatesTable = ({
  paginatedCandidates,
  onRevalidate,
  showStatusColumn = false,
  context = "database",
}) => {
  const getRelativeTime = (date) => {
    if (!date) return "N/A";

    const now = new Date();
    const updatedDate = new Date(date);
    const diffInSeconds = Math.floor((now - updatedDate) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    }
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    }
    if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    }
    if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    }
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  };

  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [candidateIdForDetails, setCandidateIdForDetails] = useState(null);
  const [selectedCandidateForDrawer, setSelectedCandidateForDrawer] =
    useState(null);

  const { data: candidateDetails, isLoading: isLoadingCandidateDetails } =
    useGetCandidateDetails(candidateIdForDetails, {
      enabled: !!candidateIdForDetails,
    });

  const mergedCandidateData =
    context === "approvals" && candidateDetails && selectedCandidateForDrawer
      ? {
          ...candidateDetails,
          status: selectedCandidateForDrawer.approvalStatus,
          rejectionReason: selectedCandidateForDrawer.rejectionReason,
          holdReason: selectedCandidateForDrawer.holdReason,
        }
      : candidateDetails;

  const handleSelectCandidate = (candidateId) => {
    setSelectedCandidateId(candidateId);
  };

  const handleRowClick = (candidate, event) => {
    if (event.target.type === "radio") {
      return;
    }

    const candidateId =
      context === "approvals" ? candidate.candidateId : candidate._id;
    setCandidateIdForDetails(candidateId);
    setSelectedCandidateForDrawer(candidate);
    setDrawerOpen(true);
  };

  const getCandidateId = (candidate) => {
    return context === "approvals" ? candidate.id : candidate._id;
  };

  const getCandidateStatus = (candidate) => {
    return candidate.approvalStatus || candidate.jobStatus;
  };

  const colSpan = showStatusColumn ? 7 : 6;

  return (
    <>
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <div
            className={showStatusColumn ? "min-w-[1100px]" : "max-w-[900px]"}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[40px] font-semibold"></TableHead>
                  <TableHead className="min-w-[120px] font-semibold">
                    ID
                  </TableHead>
                  <TableHead className="min-w-[250px] font-semibold">
                    Candidate Name
                  </TableHead>
                  <TableHead className="min-w-[150px] font-semibold">
                    Skills
                  </TableHead>
                  <TableHead className="min-w-[150px] font-semibold">
                    Experience
                  </TableHead>
                  <TableHead className="min-w-[150px] font-semibold">
                    Last Updated
                  </TableHead>
                  {showStatusColumn && (
                    <TableHead className="min-w-[120px] font-semibold">
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
                      <TableCell className="text-center">
                        <input
                          type="radio"
                          name="selectCandidate"
                          checked={selectedCandidateId === candidate._id}
                          onChange={() => handleSelectCandidate(candidate._id)}
                          aria-label={`Select candidate ${candidate?.name}`}
                          className="w-4 h-4 text-primary-purple border-2 border-gray-300 focus:ring-2 focus:ring-primary-purple/50 focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:bg-primary-purple checked:border-primary-purple relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-white before:rounded-full before:opacity-0 checked:before:opacity-100"
                        />
                      </TableCell>
                      <TableCell title={candidate?._id}>
                        {candidate?._id ? candidate._id.slice(0, 4) : "N/A"}
                      </TableCell>
                      <TableCell>
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
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900">
                              {candidate?.name}
                            </span>
                            {candidate?.roleLookingFor && (
                              <span className="text-sm text-gray-500">
                                {candidate.roleLookingFor}
                              </span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {Array.isArray(candidate?.skills) &&
                        candidate.skills.length > 0
                          ? candidate.skills.join(", ")
                          : "N/A"}
                      </TableCell>
                      <TableCell>
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
                      <TableCell>
                        {getRelativeTime(candidate?.updatedAt)}
                      </TableCell>
                      {showStatusColumn && (
                        <TableCell>
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
        </div>
      </div>

      {/* Candidate Details Drawer */}
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
            <CandidateDetailsDrawer
              candidate={mergedCandidateData}
              isLoading={isLoadingCandidateDetails}
              context={context}
              onRevalidate={onRevalidate}
              areApprovalBtnsVisible={context === "approvals"}
              approvalId={
                context === "approvals"
                  ? selectedCandidateForDrawer?.id
                  : undefined
              }
              onClose={() => setDrawerOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CandidatesTable;
