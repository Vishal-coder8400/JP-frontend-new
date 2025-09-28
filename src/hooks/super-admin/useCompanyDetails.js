import { useState, useEffect } from "react";
import { getCompanyById } from "../../api/super-admin/database";

export const useCompanyDetails = (companyId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!companyId) {
      setData(null);
      return;
    }

    const fetchCompanyDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getCompanyById({ id: companyId });

        if (response.data?.status) {
          setData(response.data.data?.corporate);
        } else {
          setError("Failed to fetch company details");
        }
      } catch (err) {
        setError(
          err.message || "An error occurred while fetching company details"
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [companyId]);

  return {
    data,
    loading,
    error,
    refetch: () => {
      if (!companyId) return;

      setLoading(true);
      setError(null);
      getCompanyById({ id: companyId })
        .then((response) => {
          if (response.data?.status) {
            setData(response.data.data?.corporate);
          } else {
            setError("Failed to fetch company details");
          }
        })
        .catch((err) => {
          setError(
            err.message || "An error occurred while fetching company details"
          );
          setData(null);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  };
};
