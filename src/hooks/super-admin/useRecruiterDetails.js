import { useState, useEffect } from "react";
import { getRecruiterById } from "../../api/super-admin/database";

export const useRecruiterDetails = (recruiterId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!recruiterId) {
      setData(null);
      return;
    }

    const fetchRecruiterDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getRecruiterById({ id: recruiterId });

        if (response.data?.status) {
          setData(response.data.data?.recruiter);
        } else {
          setError("Failed to fetch recruiter details");
        }
      } catch (err) {
        setError(
          err.message || "An error occurred while fetching recruiter details"
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiterDetails();
  }, [recruiterId]);

  return {
    data,
    loading,
    error,
    refetch: () => {
      if (!recruiterId) return;

      setLoading(true);
      setError(null);
      getRecruiterById({ id: recruiterId })
        .then((response) => {
          if (response.data?.status) {
            setData(response.data.data?.recruiter);
          } else {
            setError("Failed to fetch recruiter details");
          }
        })
        .catch((err) => {
          setError(
            err.message || "An error occurred while fetching recruiter details"
          );
          setData(null);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  };
};
