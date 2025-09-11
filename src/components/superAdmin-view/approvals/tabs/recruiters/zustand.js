import { create } from "zustand";
import { recruiters } from "./utils";

const useRecruitersStore = create((set, get) => ({
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
  setFilter: (filterName, value) =>
    set((state) => ({
      filters: { ...state.filters, [filterName]: value },
      currentPage: 1, // Reset to first page when filtering
    })),

  updateFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      currentPage: 1, // Reset to first page when filtering
    })),

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
  },

  clearAllFilters: () =>
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
    }),

  setCurrentPage: (page) => set({ currentPage: page }),

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
    console.log("Deleting recruiter:", selectedRecruiter);

    set({
      showDeleteDialog: false,
      selectedRecruiter: null,
    });
  },

  // Computed properties (getters)
  getFilteredRecruiters: () => {
    const { filters } = get();

    return recruiters.filter((recruiter) => {
      // Apply search filter
      const matchesSearch =
        filters.search === "" ||
        recruiter.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        recruiter.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        recruiter.company
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        recruiter.designation
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      // Apply job status filter
      const matchesJobStatus =
        filters.jobStatus.length === 0 ||
        filters.jobStatus.includes(recruiter.jobStatus);

      // Apply location filter
      const matchesLocation =
        filters.location.length === 0 ||
        filters.location.some((loc) =>
          recruiter.location.toLowerCase().includes(loc.toLowerCase())
        );

      // Apply company filter
      const matchesCompany =
        filters.company.length === 0 ||
        filters.company.some((comp) =>
          recruiter.company.toLowerCase().includes(comp.toLowerCase())
        );

      // Apply industry filter
      const matchesIndustry =
        filters.industry.length === 0 ||
        filters.industry.includes(recruiter.industry.toLowerCase());

      // Apply date filter
      const matchesDate =
        !filters.postedDate ||
        new Date(recruiter.postedDate) >= new Date(filters.postedDate);

      return (
        matchesSearch &&
        matchesJobStatus &&
        matchesLocation &&
        matchesCompany &&
        matchesIndustry &&
        matchesDate
      );
    });
  },

  getPaginatedRecruiters: () => {
    const filteredRecruiters = get().getFilteredRecruiters();
    const { currentPage, itemsPerPage } = get();

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredRecruiters.slice(startIndex, endIndex);
  },

  getTotalPages: () => {
    const filteredRecruiters = get().getFilteredRecruiters();
    const { itemsPerPage } = get();

    return Math.ceil(filteredRecruiters.length / itemsPerPage);
  },

  getFilteredCount: () => {
    return get().getFilteredRecruiters().length;
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
