import { useState, useEffect, useCallback } from "react";
import { getJobseekersList } from "../../api/super-admin/user";

const useJobseekers = () => {
  const [jobseekers, setJobseekers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchJobseekers = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await getJobseekersList(params);

      // Parse the API response structure
      if (response.data) {
        const jobSeekers = response.data.data?.jobSeekers || [];
        const pagination = response.data.data?.pagination || {};

        setJobseekers(jobSeekers);
        setTotalCount(pagination.totalJobSeekers || jobSeekers.length);
      }
    } catch (err) {
      console.error("Error fetching jobseekers:", err);
      setError(err.response?.data?.message || "Failed to fetch jobseekers");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load jobseekers on mount
  useEffect(() => {
    fetchJobseekers();
  }, [fetchJobseekers]);

  const refetch = useCallback(
    (params = {}) => {
      return fetchJobseekers(params);
    },
    [fetchJobseekers]
  );

  return {
    jobseekers,
    loading,
    error,
    totalCount,
    refetch,
    fetchJobseekers,
  };
};

export default useJobseekers;
