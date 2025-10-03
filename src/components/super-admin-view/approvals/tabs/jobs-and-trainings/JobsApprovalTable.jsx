import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Briefcase, Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import JobDetailsDrawer from "../../../common/jobs/JobDetailsDrawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from "@/components/common/StatusBadge";
import { Badge } from "@/components/ui/badge";
import AdminStatusBadge from "@/components/super-admin-view/shared/AdminStatusBadge";

const JobsApprovalTable = ({
  paginatedJobs,
  handleDeleteJob,
  onRevalidate,
}) => {
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleSelectJob = (jobId) => {
    setSelectedJobId(jobId);
  };

  const handleRowClick = (job, event) => {
    // Don't navigate if radio button or view details button was clicked
    if (
      event.target.type === "radio" ||
      event.target.closest(".view-details-btn")
    ) {
      return;
    }

    setSelectedJob(job);
    setSelectedJobId(job._id); // Set the approval ID, not the job ID
    setDrawerOpen(true);
  };

  const handleViewDetails = (job, event) => {
    event.stopPropagation();
    setSelectedJob(job);
    setSelectedJobId(job._id); // Set the approval ID, not the job ID
    setDrawerOpen(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-center w-12">Select</TableHead>
              <TableHead>Job ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Posted Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedJobs.length > 0 ? (
              paginatedJobs.map((job) => (
                <TableRow
                  key={job.id}
                  onClick={(e) => handleRowClick(job, e)}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="text-center">
                    <input
                      type="radio"
                      name="selectJob"
                      checked={selectedJobId === job.id}
                      onChange={() => handleSelectJob(job.id)}
                      aria-label={`Select job ${job.title}`}
                      className="w-4 h-4 text-primary-purple border-2 border-gray-300 focus:ring-2 focus:ring-primary-purple/50 focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:bg-primary-purple checked:border-primary-purple relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-white before:rounded-full before:opacity-0 checked:before:opacity-100"
                    />
                  </TableCell>
                  <TableCell>{job.id}</TableCell>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.industry}</TableCell>
                  <TableCell>{job.experience}</TableCell>
                  <TableCell>{formatDate(job.postedDate)}</TableCell>
                  <TableCell>
                    <AdminStatusBadge status={job.approvalStatus} />
                  </TableCell>
                  <TableCell className="text-center">
                    <button
                      onClick={(e) => handleViewDetails(job, e)}
                      className="view-details-btn inline-flex items-center px-3 py-1 text-sm cursor-pointer text-primary-purple hover:text-primary-purple-dark transition-colors"
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

      {/* Job Details Drawer */}
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
            jobId={selectedJobId}
            context="approval"
            onClose={() => setDrawerOpen(false)}
            onRevalidate={onRevalidate}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default JobsApprovalTable;
