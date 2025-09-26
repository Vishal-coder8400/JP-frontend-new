import { create } from "zustand";
import { getApprovalsList } from "../../../../../api/super-admin/approvals";

const useRecruitersStore = create((set, get) => ({
  // Data state
  recruiters: [],
  loading: false,
  error: null,
  totalCount: 0,

  // Filter state
  filters: {
    search: "",
    jobStatus: [],
    location: [],
    company: [],
    industry: [],
    postedDate: null,
  },

  // Pagination state
  currentPage: 1,
  itemsPerPage: 10,

  // UI state
  showDeleteDialog: false,
  selectedRecruiter: null,

  // Actions
  setFilter: (filterName, value) => {
    set((state) => ({
      filters: { ...state.filters, [filterName]: value },
      currentPage: 1, // Reset to first page when filtering
    }));
    // Trigger API call after setting filter
    setTimeout(() => get().fetchRecruiters(), 0);
  },

  updateFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      currentPage: 1, // Reset to first page when filtering
    }));
    // Trigger API call after updating filters
    setTimeout(() => get().fetchRecruiters(), 0);
  },

  // Method to handle FilterComponent updates
  setFormData: (newFormData) => {
    set((state) => {
      // Handle both function updates (from MultiSelectFilter) and object updates (from other components)
      const updatedFilters =
        typeof newFormData === "function"
          ? newFormData(state.filters)
          : { ...state.filters, ...newFormData };

      return {
        ...state,
        filters: updatedFilters,
        currentPage: 1,
      };
    });
    // Trigger API call after setting form data
    setTimeout(() => get().fetchRecruiters(), 0);
  },

  clearAllFilters: () => {
    set({
      filters: {
        search: "",
        jobStatus: [],
        location: [],
        company: [],
        industry: [],
        postedDate: null,
      },
      currentPage: 1,
    });
    // Trigger API call after clearing filters
    setTimeout(() => get().fetchRecruiters(), 0);
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
    // Trigger API call after changing page
    setTimeout(() => get().fetchRecruiters(), 0);
  },

  setShowDeleteDialog: (show) => set({ showDeleteDialog: show }),

  setSelectedRecruiter: (recruiter) => set({ selectedRecruiter: recruiter }),

  handleDeleteRecruiter: (recruiter) =>
    set({
      selectedRecruiter: recruiter,
      showDeleteDialog: true,
    }),

  confirmDelete: () => {
    // TODO: Implement actual delete logic here
    const selectedRecruiter = get().selectedRecruiter;

    set({
      showDeleteDialog: false,
      selectedRecruiter: null,
    });
  },

  // API actions
  fetchRecruiters: async () => {
    const { filters, currentPage, itemsPerPage } = get();

    set({ loading: true, error: null });

    try {
      // Build query parameters
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: filters.search,
        ...(filters.jobStatus.length > 0 && { jobStatus: filters.jobStatus }),
        ...(filters.location.length > 0 && { location: filters.location }),
        ...(filters.company.length > 0 && { company: filters.company }),
        ...(filters.industry.length > 0 && { industry: filters.industry }),
        ...(filters.postedDate && { postedDate: filters.postedDate }),
      };

      const response = await getApprovalsList("recruiter", params);

      // Parse the API response structure
      const recruiters = response.data?.data?.recruiters || [];
      const pagination = response.data?.data?.pagination || {};

      // Map API data to component expected format
      const recruitersData = recruiters.map((recruiter) => ({
        id: recruiter._id,
        name: recruiter.name || "N/A",
        email: recruiter.email || "N/A",
        contact: recruiter.phone
          ? `${recruiter.phone.countryCode} ${recruiter.phone.number}`
          : "N/A",
        company: recruiter.company || "N/A",
        designation: recruiter.designation || "N/A",
        industry: recruiter.industry || "N/A",
        location: recruiter.location || "N/A",
        jobStatus: recruiter.jobStatus || "pending",
        candidatesCount: recruiter.candidatesCount || 0,
        postedDate: recruiter.createdAt
          ? new Date(recruiter.createdAt).toISOString().split("T")[0]
          : "N/A",
        lastUpdated: recruiter.updatedAt
          ? new Date(recruiter.updatedAt).toISOString().split("T")[0]
          : "N/A",
        // Additional API fields
        _id: recruiter._id,
        phone: recruiter.phone,
        createdAt: recruiter.createdAt,
        updatedAt: recruiter.updatedAt,
      }));

      const total = pagination.totalRecruiters || recruitersData.length;

      set({
        recruiters: recruitersData,
        totalCount: total,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching recruiters:", error);
      set({
        error: error.response?.data?.message || "Failed to fetch recruiters",
        loading: false,
      });
    }
  },

  refetchRecruiters: () => {
    get().fetchRecruiters();
  },

  // Computed properties (getters)
  getFilteredRecruiters: () => {
    const { recruiters } = get();
    return recruiters;
  },

  getPaginatedRecruiters: () => {
    const { recruiters } = get();
    return recruiters;
  },

  getTotalPages: () => {
    const { totalCount, itemsPerPage } = get();
    return Math.ceil(totalCount / itemsPerPage);
  },

  getFilteredCount: () => {
    const { totalCount } = get();
    return totalCount;
  },

  // Additional utility methods
  hasActiveFilters: () => {
    const { filters } = get();
    return (
      filters.search !== "" ||
      filters.jobStatus.length > 0 ||
      filters.location.length > 0 ||
      filters.company.length > 0 ||
      filters.industry.length > 0 ||
      filters.postedDate !== null
    );
  },

  getActiveFiltersCount: () => {
    const { filters } = get();
    let count = 0;
    if (filters.search !== "") count++;
    if (filters.jobStatus.length > 0) count++;
    if (filters.location.length > 0) count++;
    if (filters.company.length > 0) count++;
    if (filters.industry.length > 0) count++;
    if (filters.postedDate !== null) count++;
    return count;
  },

  // Get statistics
  getRecruiterStats: () => {
    const allRecruiters = recruiters;
    const totalRecruiters = allRecruiters.length;
    const activeRecruiters = allRecruiters.filter(
      (r) => r.jobStatus === "active"
    ).length;
    const totalCandidates = allRecruiters.reduce(
      (sum, r) => sum + r.candidatesCount,
      0
    );
    const avgCandidatesPerRecruiter = Math.round(
      totalCandidates / totalRecruiters
    );

    return {
      totalRecruiters,
      activeRecruiters,
      totalCandidates,
      avgCandidatesPerRecruiter,
    };
  },
}));

export default useRecruitersStore;
