import { create } from "zustand";

const useApplicationsStore = create((set, get) => ({
  // Data state
  applications: [],
  loading: false,
  error: null,
  totalCount: 0,

  // Filter state
  filters: {
    search: "",
    status: [],
    location: [],
    experience: [],
    skills: [],
    industry: [],
    applicationDate: null,
  },

  // Pagination state
  currentPage: 1,
  itemsPerPage: 10,

  // UI state
  showDeleteDialog: false,
  selectedApplication: null,

  // Actions
  setFilter: (filterName, value) => {
    set((state) => ({
      filters: { ...state.filters, [filterName]: value },
      currentPage: 1, // Reset to first page when filtering
    }));
    // Trigger API call after setting filter
    setTimeout(() => get().fetchApplications(), 0);
  },

  updateFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      currentPage: 1, // Reset to first page when filtering
    }));
    // Trigger API call after updating filters
    setTimeout(() => get().fetchApplications(), 0);
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
    setTimeout(() => get().fetchApplications(), 0);
  },

  clearAllFilters: () => {
    set({
      filters: {
        search: "",
        status: [],
        location: [],
        experience: [],
        skills: [],
        industry: [],
        applicationDate: null,
      },
      currentPage: 1,
    });
    // Trigger API call after clearing filters
    setTimeout(() => get().fetchApplications(), 0);
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
    // Trigger API call after changing page
    setTimeout(() => get().fetchApplications(), 0);
  },

  setShowDeleteDialog: (show) => set({ showDeleteDialog: show }),

  setSelectedApplication: (application) =>
    set({ selectedApplication: application }),

  handleDeleteApplication: (application) =>
    set({
      selectedApplication: application,
      showDeleteDialog: true,
    }),

  // API actions - TODO: Implement actual API integration
  fetchApplications: async () => {
    const { filters, currentPage, itemsPerPage } = get();

    set({ loading: true, error: null });

    try {
      // TODO: Replace with actual API call
      // const response = await getApplicationsAPI({
      //   page: currentPage,
      //   limit: itemsPerPage,
      //   ...filters,
      // });

      // For now, set empty data
      set({
        applications: [],
        totalCount: 0,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching applications:", error);
      set({
        error: error.message || "Failed to fetch applications",
        loading: false,
      });
    }
  },

  refetchApplications: () => {
    get().fetchApplications();
  },

  confirmDelete: () => {
    // TODO: Implement actual delete logic here
    const selectedApplication = get().selectedApplication;

    set({
      showDeleteDialog: false,
      selectedApplication: null,
    });
  },

  // Computed properties (getters)
  getFilteredApplications: () => {
    const { applications } = get();
    return applications;
  },

  getPaginatedApplications: () => {
    const { applications } = get();
    return applications;
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
      filters.status.length > 0 ||
      filters.location.length > 0 ||
      filters.experience.length > 0 ||
      filters.skills.length > 0 ||
      filters.industry.length > 0 ||
      filters.applicationDate !== null
    );
  },

  getActiveFiltersCount: () => {
    const { filters } = get();
    let count = 0;
    if (filters.search !== "") count++;
    if (filters.status.length > 0) count++;
    if (filters.location.length > 0) count++;
    if (filters.experience.length > 0) count++;
    if (filters.skills.length > 0) count++;
    if (filters.industry.length > 0) count++;
    if (filters.applicationDate !== null) count++;
    return count;
  },
}));

export default useApplicationsStore;
