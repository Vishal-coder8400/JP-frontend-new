import { create } from "zustand";

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

    set({
      showDeleteDialog: false,
      selectedRecruiter: null,
    });
  },

  // Computed properties (getters) - These will be replaced by API data
  getPaginatedRecruiters: () => {
    // This will be handled by the API hook
    return [];
  },

  getTotalPages: () => {
    // This will be handled by the API hook
    return 0;
  },

  getFilteredCount: () => {
    // This will be handled by the API hook
    return 0;
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
}));

export default useRecruitersStore;
