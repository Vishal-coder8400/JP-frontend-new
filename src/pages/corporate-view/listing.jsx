import { useState } from "react";
import CorporateListing from "../../components/corporate-view/listing";
import { useFilteredJobs } from "../../hooks/corporate/useJob";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import JobDescription from "../../components/recruiter-view/job-openings/job-description";

const Listing = () => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    jobType: "",
    sortBy: "",
  });
  const { data: jobPosts, isLoading: isLoading2 } = useFilteredJobs(filters);

  return (
    <div className="lg:pt-[80px] w-full">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="
            w-full h-screen 
            lg:max-w-[999px] 
            md:max-w-full
            sm:max-w-full 
            overflow-y-auto"
        >
          <div className="w-full h-full">
            <JobDescription />
          </div>
        </SheetContent>
      </Sheet>
      <CorporateListing
        jobPosts={jobPosts}
        formData={filters}
        setFormData={setFilters}
        setOpen={setOpen}
      />
    </div>
  );
};

export default Listing;
