import { useState, useEffect } from "react";
import { getAllRecruiters } from "../../api/super-admin/database";
import { getApprovalsList } from "../../api/super-admin/approvals";

export const useRecruiters = (
  filters = {},
  page = 1,
  limit = 10,
  context = "database"
) => {
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
        let response;

        if (context === "approvals") {
          const params = {
            page,
            limit,
            search: filters.search || "",
            status: filters.status || "pending",
            sortBy: filters.sortBy || "submittedAt",
            sortOrder: filters.sortOrder || "desc",
            ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
            ...(filters.dateTo && { dateTo: filters.dateTo }),
          };

          response = await getApprovalsList("recruiter", params);

          if (response.data?.status) {
            const approvals = response.data.data?.approvals || [];
            const pagination = response.data.data?.pagination || {};

            const recruitersData = approvals.map((approval) => {
              const recruiter = approval.data || {};
              return {
                id: approval._id,
                name: recruiter.name || "N/A",
                email: recruiter.email || "N/A",
                contact: recruiter.phone
                  ? `${recruiter.phone.countryCode} ${recruiter.phone.number}`
                  : "N/A",
                company: recruiter.company || "N/A",
                designation: recruiter.designation || "N/A",
                industry: recruiter.industry || "N/A",
                location: recruiter.currentAddress?.city || "N/A",
                jobStatus: approval.status || "pending",
                candidatesCount: recruiter.candidatesCount || 0,
                postedDate: approval.createdAt
                  ? new Date(approval.createdAt).toISOString().split("T")[0]
                  : "N/A",
                lastUpdated: approval.updatedAt
                  ? new Date(approval.updatedAt).toISOString().split("T")[0]
                  : "N/A",
                _id: approval._id,
                phone: recruiter.phone,
                createdAt: approval.createdAt,
                updatedAt: approval.updatedAt,
                approvalStatus: approval.status,
                applicantId: approval.applicantId,
                applicantType: approval.applicantType,
                submittedAt: approval.submittedAt,
                version: approval.version,
                isActive: approval.isActive,
                recruiterId: recruiter.recruiterId,
                currentAddress: recruiter.currentAddress,
                resume: recruiter.resume,
                sectorSpecialization: recruiter.sectorSpecialization,
                experienceLevel: recruiter.experienceLevel,
                isVerified: recruiter.isVerified,
                signupProgress: recruiter.signupProgress,
                completedStages: recruiter.completedStages,
                currentStage: recruiter.currentStage,
                status: recruiter.status,
                references: recruiter.references,
                kycDetails: recruiter.kycDetails,
                profileImage: recruiter.profileImage,
              };
            });

            setData(recruitersData);
            setTotalCount(pagination.totalApprovals || recruitersData.length);
            setTotalPages(
              pagination.totalPages ||
                Math.ceil(
                  (pagination.totalApprovals || recruitersData.length) / limit
                )
            );
          } else {
            setError("Failed to fetch recruiters");
          }
        } else {
          response = await getAllRecruiters({
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
  }, [page, limit, JSON.stringify(filters), context]);

  return {
    data,
    loading,
    error,
    totalCount,
    totalPages,
    refetch: () => {
      setLoading(true);
      setError(null);

      const fetchData = async () => {
        try {
          let response;

          if (context === "approvals") {
            const params = {
              page,
              limit,
              search: filters.search || "",
              status: filters.status || "pending",
              sortBy: filters.sortBy || "submittedAt",
              sortOrder: filters.sortOrder || "desc",
              ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
              ...(filters.dateTo && { dateTo: filters.dateTo }),
            };

            response = await getApprovalsList("recruiter", params);

            if (response.data?.status) {
              const approvals = response.data.data?.approvals || [];
              const pagination = response.data.data?.pagination || {};

              const recruitersData = approvals.map((approval) => {
                const recruiter = approval.data || {};
                return {
                  id: approval._id,
                  name: recruiter.name || "N/A",
                  email: recruiter.email || "N/A",
                  contact: recruiter.phone
                    ? `${recruiter.phone.countryCode} ${recruiter.phone.number}`
                    : "N/A",
                  company: recruiter.company || "N/A",
                  designation: recruiter.designation || "N/A",
                  industry: recruiter.industry || "N/A",
                  location: recruiter.currentAddress?.city || "N/A",
                  jobStatus: approval.status || "pending",
                  candidatesCount: recruiter.candidatesCount || 0,
                  postedDate: approval.createdAt
                    ? new Date(approval.createdAt).toISOString().split("T")[0]
                    : "N/A",
                  lastUpdated: approval.updatedAt
                    ? new Date(approval.updatedAt).toISOString().split("T")[0]
                    : "N/A",
                  _id: approval._id,
                  phone: recruiter.phone,
                  createdAt: approval.createdAt,
                  updatedAt: approval.updatedAt,
                  approvalStatus: approval.status,
                  applicantId: approval.applicantId,
                  applicantType: approval.applicantType,
                  submittedAt: approval.submittedAt,
                  version: approval.version,
                  isActive: approval.isActive,
                  recruiterId: recruiter.recruiterId,
                  currentAddress: recruiter.currentAddress,
                  resume: recruiter.resume,
                  sectorSpecialization: recruiter.sectorSpecialization,
                  experienceLevel: recruiter.experienceLevel,
                  isVerified: recruiter.isVerified,
                  signupProgress: recruiter.signupProgress,
                  completedStages: recruiter.completedStages,
                  currentStage: recruiter.currentStage,
                  status: recruiter.status,
                  references: recruiter.references,
                  kycDetails: recruiter.kycDetails,
                  profileImage: recruiter.profileImage,
                };
              });

              setData(recruitersData);
              setTotalCount(pagination.totalApprovals || recruitersData.length);
              setTotalPages(
                pagination.totalPages ||
                  Math.ceil(
                    (pagination.totalApprovals || recruitersData.length) / limit
                  )
              );
            } else {
              setError("Failed to fetch recruiters");
            }
          } else {
            response = await getAllRecruiters({ page, limit, ...filters });

            if (response.data?.status) {
              setData(response.data.data?.recruiters || []);
              setTotalCount(response.data.data?.pagination?.total || 0);
              setTotalPages(response.data.data?.pagination?.totalPages || 0);
            } else {
              setError("Failed to fetch recruiters");
            }
          }
        } catch (err) {
          setError(
            err.message || "An error occurred while fetching recruiters"
          );
          setData([]);
          setTotalCount(0);
          setTotalPages(0);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    },
  };
};
