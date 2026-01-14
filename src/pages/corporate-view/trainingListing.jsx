import { useEffect, useState } from "react";
import CorporateListing from "../../components/corporate-view/listing";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import JobDescription from "../../components/recruiter-view/job-openings/job-description";
import Navbar from "../../components/recruiter-view/navbar";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks/common/useDebounce";
import {
  useGetTrainningById,
  useTraining,
} from "../../hooks/corporate/useTraining";

const TrainingListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [filters, setFilters] = useState(() => {
    // Restore from URL on first render
    const params = Object.fromEntries([...searchParams]);
    return {
      page: params.page ? parseInt(params.page) : 1,
      limit: 10,
      search: params.search || "",
      sortBy: params.sortBy || "",
      jobStatus: params.jobStatus || "",
      status: params.status || "",
    };
  });
  const { data: trainingPosts, isLoading: isLoading2 } = useTraining(filters);

  // 👇 Sync filters.search to searchText on mount
  useEffect(() => {
    if (filters?.search && !searchText) {
      setSearchText(filters.search);
    }
  }, [filters.search]);

  // Debounce searchText to avoid too many API calls
  const debouncedSearch = useDebounce(searchText, 500);

  // 👇 Sync debounced searchText → filters
  useEffect(() => {
    setFilters((prev) => {
      if (prev.search === debouncedSearch) return prev;
      return {
        ...prev,
        search: debouncedSearch,
        page: 1,
      };
    });
  }, [debouncedSearch]);
  // Update URL when filters change
  useEffect(() => {
    const updatedParams = {};
    for (const key in filters) {
      if (filters[key]) updatedParams[key] = filters[key];
    }
    setSearchParams(updatedParams);
  }, [filters]);
  // Handle search input
  const handleSearch = (e) => {
    setSearchText(e);
  };
  // Clear all filters
  const ClearAll = () => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      limit: 10,
      search: "",
      sortBy: "",
      jobStatus: "",
      status: "",
    }));
    setSearchText("");
  };

  return (
    <div className="w-full">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="
            w-full h-screen 
            lg:max-w-[999px] 
            md:max-w-full
            sm:max-w-full 
            overflow-y-auto border-transparent"
        >
          <div className="w-full h-full">
            <JobDescription hook={useGetTrainningById} />
          </div>
        </SheetContent>
      </Sheet>
      <Navbar onlySupport={false} />
      <CorporateListing
        jobPosts={trainingPosts}
        formData={filters}
        setFormData={setFilters}
        setOpen={setOpen}
        handleSearch={handleSearch}
        searchText={searchText}
        ClearAll={ClearAll}
        open1={open1}
        setOpen1={setOpen1}
      />
    </div>
  );
};

export default TrainingListing;
