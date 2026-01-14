import { useState } from "react";
import { Briefcase, MoveUpRightIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import AdminStatusBadge from "@/components/super-admin-view/shared/AdminStatusBadge";
import { useNavigate } from "react-router-dom";
import JobDetailsDrawer from "./JobDetailsDrawer";

const JobsTable = ({
  paginatedJobs = [],
  context = "database",
  onRevalidate,
}) => {
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [detailsJobId, setDetailsJobId] = useState(null);
  const [detailsApprovalId, setDetailsApprovalId] = useState(null);
  const [detailsApprovalStatus, setDetailsApprovalStatus] = useState(null);
  const navigate = useNavigate();

  const isApprovalContext = context === "approvals";

  const handleSelectJob = (jobId) => {
    setSelectedJobId(jobId);
  };

  const handleRowClick = (job, event) => {
    if (event.target.type === "radio") {
      return;
    }

    if (isApprovalContext) {
      setDetailsJobId(job.jobId);
      setDetailsApprovalId(job._id);
      setDetailsApprovalStatus(job.approvalStatus);
      setIsDrawerOpen(true);
    } else {
      navigate(
        `/super-admin/jobs-and-trainings/${job._id}/candidates?type=job`
      );
    }
  };

  const handleViewDetails = (job, event) => {
    event.stopPropagation();
    setDetailsJobId(job._id);
    setDetailsApprovalId(undefined);
    setDetailsApprovalStatus(undefined);
    setIsDrawerOpen(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      active: "bg-success2 text-success1",
      ended: "bg-danger2 text-danger1",
      pending: "bg-warning2 text-warning1",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusColors[status] || statusColors.active
        }`}
      >
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  const getJobId = (job) => {
    return isApprovalContext ? job.id : job._id;
  };

  const getJobTitle = (job) => {
    return isApprovalContext ? job.title : job.jobTitle;
  };

  const getCompany = (job) => {
    return isApprovalContext 
      ? job.company 
      : job.postedBy?.companyName || "N/A";
  };

  const getLocation = (job) => {
    return isApprovalContext ? job.location : `${job.city}, ${job.state}`;
  };

  const getExperience = (job) => {
    return isApprovalContext ? job.experience : job.experienceLevel;
  };

  const getPostedDate = (job) => {
    return isApprovalContext ? job.postedDate : job.createdAt;
  };

  const getNoOfPositions = (job) => {
    const positions = isApprovalContext
      ? job.noOfPositions
      : job.numberOfOpenings;
    return positions || positions === 0 ? positions : "-";
  };

  const getSector = (job) => {
    return isApprovalContext
      ? job.sector || "-"
      : job.postedBy?.industryType || job.industryType || "-";
  };

  return (
    <>
      <div className="bg-white rounded-lg border overflow-x-auto">
        <Table className="min-w-[1240px] w-full">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-center w-12">Select</TableHead>
              <TableHead>ID</TableHead>
              {isApprovalContext ? (
                <>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>No of positions</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Posted Date</TableHead>
                  <TableHead>Status</TableHead>
                </>
              ) : (
                <>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>No of positions</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead>Candidates</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Posted Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedJobs.length > 0 ? (
              paginatedJobs.map((job) => (
                <TableRow
                  key={job._id || job.id}
                  onClick={(e) => handleRowClick(job, e)}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="text-center">
                    <input
                      type="radio"
                      name="selectJob"
                      checked={selectedJobId === (job._id || job.id)}
                      onChange={() => handleSelectJob(job._id || job.id)}
                      aria-label={`Select job ${getJobTitle(job)}`}
                      className="w-4 h-4 text-primary-purple border-2 border-gray-300 focus:ring-2 focus:ring-primary-purple/50 focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:bg-primary-purple checked:border-primary-purple relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-white before:rounded-full before:opacity-0 checked:before:opacity-100"
                    />
                  </TableCell>
                  <TableCell>{getJobId(job)}</TableCell>
                  {isApprovalContext ? (
                    <>
                      <TableCell className="font-medium">
                        {getJobTitle(job)}
                      </TableCell>
                      <TableCell>{getCompany(job)}</TableCell>
                      <TableCell>{getNoOfPositions(job)}</TableCell>
                      <TableCell>{getLocation(job)}</TableCell>
                      <TableCell>{formatDate(getPostedDate(job))}</TableCell>
                      <TableCell>
                        <AdminStatusBadge status={job.approvalStatus} />
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="font-medium">
                        {getJobTitle(job)}
                      </TableCell>
                      <TableCell>{getCompany(job)}</TableCell>
                      <TableCell>{getNoOfPositions(job)}</TableCell>
                      <TableCell>{getSector(job)}</TableCell>
                      <TableCell>
                        {job.applicationStats?.total || job.totalApplicants || "0"}
                      </TableCell>
                      <TableCell>{getLocation(job)}</TableCell>
                      <TableCell>{getExperience(job)}</TableCell>
                      <TableCell>{formatDate(getPostedDate(job))}</TableCell>
                      <TableCell>{getStatusBadge(job.status)}</TableCell>
                      <TableCell className="text-center">
                        <button
                          onClick={(e) => handleViewDetails(job, e)}
                          className="view-details-btn inline-flex items-center px-3 py-1.5 text-sm font-medium text-primary-purple bg-light-purple rounded-md hover:bg-light-purple/80 transition-colors gap-2"
                        >
                          View Details
                          <MoveUpRightIcon className="w-3 h-3" />
                        </button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow className="h-full">
                <TableCell
                  colSpan={isApprovalContext ? 8 : 12}
                  className="h-full"
                >
                  <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
                    <Briefcase className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500 text-lg font-medium">
                      No jobs found
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

      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-4xl overflow-y-auto bg-white p-0 [&>button]:hidden"
        >
          {detailsJobId && (
            <JobDetailsDrawer
              jobId={detailsJobId}
              context={context}
              approvalId={detailsApprovalId}
              approvalStatus={detailsApprovalStatus}
              onRevalidate={onRevalidate}
              onClose={() => setIsDrawerOpen(false)}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default JobsTable;
