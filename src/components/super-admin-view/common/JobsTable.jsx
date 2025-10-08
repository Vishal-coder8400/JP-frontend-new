import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Briefcase, MoveUpRightIcon, Eye } from "lucide-react";
import JobDetailsDrawer from "./jobs/JobDetailsDrawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminStatusBadge from "@/components/super-admin-view/shared/AdminStatusBadge";
import { useNavigate } from "react-router-dom";
import { getJobApplications } from "@/api/super-admin/jobsAndTrainings";

const JobsTable = ({
  paginatedJobs = [],
  context = "database",
  onRevalidate,
}) => {
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  const isApprovalContext = context === "approval";

  const handleSelectJob = (jobId) => {
    setSelectedJobId(jobId);
  };

  const handleRowClick = async (job, event) => {
    if (
      event.target.type === "radio" ||
      event.target.closest(".view-details-btn")
    ) {
      return;
    }

    if (isApprovalContext) {
      setSelectedJob(job);
      setSelectedJobId(job.jobId);
      setDrawerOpen(true);
    } else {
      try {
        await getJobApplications({ id: job._id });
        navigate(`/super-admin/jobs-and-trainings/job/${job._id}/candidates`);
      } catch (error) {
        console.error("Error fetching job applications:", error);
        navigate(`/super-admin/jobs-and-trainings/job/${job._id}/candidates`);
      }
    }
  };

  const handleViewDetails = (job, event) => {
    event.stopPropagation();
    if (isApprovalContext) {
      setSelectedJob(job);
      setSelectedJobId(job.jobId);
    } else {
      setSelectedJob(job._id);
    }
    setDrawerOpen(true);
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
    return isApprovalContext ? job.id : job._id.slice(-8);
  };

  const getJobTitle = (job) => {
    return isApprovalContext ? job.title : job.jobTitle;
  };

  const getCompany = (job) => {
    return isApprovalContext ? job.company : job.postedBy?.companyName || "";
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

  return (
    <>
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-center w-12">Select</TableHead>
                <TableHead>Job ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Posted Date</TableHead>
                <TableHead>Company</TableHead>
                {!isApprovalContext && <TableHead>Candidates</TableHead>}
                <TableHead>Location</TableHead>
                {isApprovalContext && <TableHead>Industry</TableHead>}
                <TableHead>Experience</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
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
                    <TableCell className="font-medium">
                      {getJobTitle(job)}
                    </TableCell>
                    <TableCell>{formatDate(getPostedDate(job))}</TableCell>
                    <TableCell>{getCompany(job)}</TableCell>
                    {!isApprovalContext && (
                      <TableCell>{/* Candidates field */}</TableCell>
                    )}
                    <TableCell>{getLocation(job)}</TableCell>
                    {isApprovalContext && <TableCell>{job.industry}</TableCell>}
                    <TableCell>{getExperience(job)}</TableCell>
                    <TableCell>
                      {isApprovalContext ? (
                        <AdminStatusBadge status={job.approvalStatus} />
                      ) : (
                        getStatusBadge(job.status)
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <button
                        onClick={(e) => handleViewDetails(job, e)}
                        className="view-details-btn inline-flex items-center px-3 py-1 text-sm cursor-pointer text-primary-purple hover:text-primary-purple-dark transition-colors"
                      >
                        {isApprovalContext ? (
                          <>
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </>
                        ) : (
                          <>
                            View Details
                            <MoveUpRightIcon className="w-3 h-3 ml-1" />
                          </>
                        )}
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={isApprovalContext ? 10 : 9}
                    className="text-center py-8"
                  >
                    <div className="flex flex-col items-center justify-center">
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
      </div>

      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent
          side="right"
          className="w-full h-screen 
            lg:max-w-[900px] 
            md:max-w-full
            sm:max-w-full 
            overflow-y-auto border-transparent [&>button.absolute]:hidden"
        >
          <JobDetailsDrawer
            jobId={isApprovalContext ? selectedJobId : selectedJob}
            context={isApprovalContext ? "approval" : "edit"}
            approvalId={isApprovalContext ? selectedJob?.id : undefined}
            onClose={() => setDrawerOpen(false)}
            onRevalidate={onRevalidate}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default JobsTable;
