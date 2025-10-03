import { useState, useEffect } from "react";
import { getAllRecruiters } from "../../api/super-admin/database";

export const useRecruiters = (filters = {}, page = 1, limit = 10) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchRecruiters = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getAllRecruiters({
          page,
          limit,
          ...filters,
        });

        if (response.data?.status) {
          setData(response.data.data?.recruiters || []);
          setTotalCount(response.data.data?.pagination?.total || 0);
          setTotalPages(response.data.data?.pagination?.totalPages || 0);
        } else {
          setError("Failed to fetch recruiters");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching recruiters");
        setData([]);
        setTotalCount(0);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiters();
  }, [page, limit, JSON.stringify(filters)]);

  return {
    data,
    loading,
    error,
    totalCount,
    totalPages,
    refetch: () => {
      setLoading(true);
      setError(null);
      getAllRecruiters({ page, limit, ...filters })
        .then((response) => {
          if (response.data?.status) {
            setData(response.data.data?.recruiters || []);
            setTotalCount(response.data.data?.pagination?.total || 0);
            setTotalPages(response.data.data?.pagination?.totalPages || 0);
          } else {
            setError("Failed to fetch recruiters");
          }
        })
        .catch((err) => {
          setError(
            err.message || "An error occurred while fetching recruiters"
          );
          setData([]);
          setTotalCount(0);
          setTotalPages(0);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  };
};
