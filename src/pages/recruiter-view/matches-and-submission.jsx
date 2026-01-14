import React, { useEffect, useState } from "react";
import MatchesSubmissionComponent from "../../components/recruiter-view/matchesAndSubmission";
import Navbar from "../../components/recruiter-view/navbar";
import { useGetAllApplicant } from "../../hooks/recruiter/useApplicant";
import { useDebounce } from "../../hooks/common/useDebounce";
import { useSearchParams } from "react-router-dom";

const MatchesAndSubmission = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [candidateFilters, setCandidateFilters] = useState(() => {
    const params = Object.fromEntries([...searchParams]);
    return {
      page: params.page ? parseInt(params.page) : 1,
      limit: 10,
      search: params.search || "",
      showApplications: true,
    };
  });
  const [searchText, setSearchText] = useState("");
  const {
    data: applicants,
    isLoading,
    isError,
    error,
  } = useGetAllApplicant(candidateFilters);
  const debouncedSearch = useDebounce(searchText, 500);
  useEffect(() => {
    if (candidateFilters?.search && !searchText) {
      setSearchText(candidateFilters.search);
    }
  }, [candidateFilters.search]);
  useEffect(() => {
    setCandidateFilters((prev) => {
      if (prev.search === debouncedSearch) return prev;
      return { ...prev, search: debouncedSearch, page: 1 };
    });
  }, [debouncedSearch]);
  useEffect(() => {
    const updatedParams = {};

    for (const key in candidateFilters) {
      if (candidateFilters[key]) updatedParams[key] = candidateFilters[key];
    }
    setSearchParams(updatedParams);
  }, [candidateFilters]);
  const handleSearch = (e) => {
    setSearchText(e);
  };
  return (
    <div className="w-full">
      <Navbar onlySupport={false} />
      <MatchesSubmissionComponent
        applicants={applicants}
        candidateFilters={candidateFilters}
        setCandidateFilters={setCandidateFilters}
        handleSearch={handleSearch}
        searchText={searchText}
      />
    </div>
  );
};

export default MatchesAndSubmission;
