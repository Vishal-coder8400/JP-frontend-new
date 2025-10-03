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

import { useState } from "react";

const CandidatesTable = ({ paginatedCandidates }) => {
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [candidateIdForDetails, setCandidateIdForDetails] = useState(null);

  const { data: candidateDetails, isLoading: isLoadingCandidateDetails } =
    useGetCandidateDetails(candidateIdForDetails, {
      enabled: !!candidateIdForDetails,
    });

  const handleSelectCandidate = (candidateId) => {
    setSelectedCandidateId(candidateId);
  };

  const handleRowClick = (candidate, event) => {
    // Don't open drawer if radio button was clicked
    if (event.target.type === "radio") {
      return;
    }

    setCandidateIdForDetails(candidate.id);
    setDrawerOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto max-w-[900px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[40px] font-semibold"></TableHead>
                <TableHead className="min-w-[80px] font-semibold">ID</TableHead>
                <TableHead className="min-w-[250px] font-semibold">
                  Name
                </TableHead>
                <TableHead className="min-w-[120px] font-semibold">
                  Industry
                </TableHead>
                <TableHead className="min-w-[150px] font-semibold">
                  Skills
                </TableHead>
                <TableHead className="min-w-[100px] font-semibold">
                  Experience
                </TableHead>
                <TableHead className="min-w-[120px] font-semibold">
                  Last Updated
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCandidates.length > 0 ? (
                paginatedCandidates.map((candidate) => (
                  <TableRow
                    key={candidate.id}
                    onClick={(e) => handleRowClick(candidate, e)}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="text-center">
                      <input
                        type="radio"
                        name="selectCandidate"
                        checked={selectedCandidateId === candidate.id}
                        onChange={() => handleSelectCandidate(candidate.id)}
                        aria-label={`Select candidate ${candidate.name}`}
                        className="w-4 h-4 text-primary-purple border-2 border-gray-300 focus:ring-2 focus:ring-primary-purple/50 focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:bg-primary-purple checked:border-primary-purple relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-white before:rounded-full before:opacity-0 checked:before:opacity-100"
                      />
                    </TableCell>
                    <TableCell>{candidate.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {/* {candidate.avatar ? (
                          <img
                            src={candidate.avatar}
                            alt={`${candidate.name} avatar`}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : ( */}
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        {/* )} */}
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">
                            {candidate.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {candidate.occupation}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{candidate.industry}</TableCell>
                    <TableCell>{candidate.skills}</TableCell>
                    <TableCell>{candidate.experience}</TableCell>
                    <TableCell>{candidate.lastUpdated}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
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
              candidate={candidateDetails?.data}
              isLoading={isLoadingCandidateDetails}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CandidatesTable;
