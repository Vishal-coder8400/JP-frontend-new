import { create } from "zustand";
import { getApprovalsList } from "../../../../../api/super-admin/approvals";

const useTrainingsApprovalStore = create((set, get) => ({
  // Data state
  trainings: [],
  loading: false,
  error: null,
  totalCount: 0,

  // Filter state
  filters: {
    search: "",
    status: "pending",
    dateFrom: null,
    dateTo: null,
    sortBy: "submittedAt",
    sortOrder: "desc",
  },

  // Pagination state
  currentPage: 1,
  itemsPerPage: 10,

  // UI state
  showDeleteDialog: false,
  selectedTraining: null,

  // Actions
  setFilter: (filterName, value) => {
    set((state) => ({
      filters: { ...state.filters, [filterName]: value },
      currentPage: 1, // Reset to first page when filtering
    }));
    // Trigger API call after setting filter
    setTimeout(() => get().fetchTrainings(), 0);
  },

  updateFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      currentPage: 1, // Reset to first page when filtering
    }));
    // Trigger API call after updating filters
    setTimeout(() => get().fetchTrainings(), 0);
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
    setTimeout(() => get().fetchTrainings(), 0);
  },

  clearAllFilters: () => {
    set({
      filters: {
        search: "",
        status: "pending",
        dateFrom: null,
        dateTo: null,
        sortBy: "submittedAt",
        sortOrder: "desc",
      },
      currentPage: 1,
    });
    // Trigger API call after clearing filters
    setTimeout(() => get().fetchTrainings(), 0);
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
    // Trigger API call after changing page
    setTimeout(() => get().fetchTrainings(), 0);
  },

  // API calls
  fetchTrainings: async () => {
    const state = get();
    set({ loading: true, error: null });

    try {
      const params = {
        page: state.currentPage,
        limit: state.itemsPerPage,
        search: state.filters.search,
        status: state.filters.status,
        sortBy: state.filters.sortBy,
        sortOrder: state.filters.sortOrder,
        ...(state.filters.dateFrom && { dateFrom: state.filters.dateFrom }),
        ...(state.filters.dateTo && { dateTo: state.filters.dateTo }),
      };

      const response = await getApprovalsList("training", params);

      // Parse the API response structure
      const approvals = response.data?.data?.approvals || [];
      const pagination = response.data?.data?.pagination || {};

      // Map API data to component expected format
      const mappedTrainings = approvals.map((approval) => {
        const training = approval.data || {};
        return {
          id: approval._id,
          title: training.title || "N/A",
          trainer: training.trainer || "N/A",
          category: training.category || "N/A",
          duration: training.duration || "N/A",
          level: training.level || "N/A",
          postedDate: training.postedDate || approval.createdAt,
          approvalStatus: approval.status || "pending",
          // Additional API fields
          _id: approval._id,
          createdAt: approval.createdAt,
          updatedAt: approval.updatedAt,
          // Approval specific fields
          applicantId: approval.applicantId,
          applicantType: approval.applicantType,
          submittedAt: approval.submittedAt,
        };
      });

      set({
        trainings: mappedTrainings,
        totalCount: pagination.total || 0,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching trainings:", error);
      set({
        error: error.message || "Failed to fetch trainings",
        loading: false,
      });
    }
  },

  handleDeleteTraining: async (trainingId) => {
    // Implementation for deleting a training
    // Add actual delete logic here
  },

  // Computed getters
  getPaginatedTrainings: () => {
    const state = get();
    return state.trainings;
  },

  getTotalPages: () => {
    const state = get();
    return Math.ceil(state.totalCount / state.itemsPerPage);
  },

  getFilteredCount: () => {
    const state = get();
    return state.totalCount;
  },
}));

export default useTrainingsApprovalStore;
