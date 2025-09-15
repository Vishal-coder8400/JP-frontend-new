import { create } from "zustand";
import { trainingsData } from "../../utils";

const useTrainingsStore = create((set, get) => ({
  // Data
  trainings: trainingsData,

  // Filters
  filters: {
    search: "",
    status: [],
    postedDate: null,
    location: [],
    company: [],
    industry: [],
  },

  // Pagination
  currentPage: 1,
  itemsPerPage: 10,

  // Actions
  setFormData: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      currentPage: 1, // Reset to first page when filters change
    })),

  clearAllFilters: () =>
    set({
      filters: {
        search: "",
        status: [],
        postedDate: null,
        location: [],
        company: [],
        industry: [],
      },
      currentPage: 1,
    }),

  setCurrentPage: (page) => set({ currentPage: page }),

  // Computed values
  getFilteredTrainings: () => {
    const { trainings, filters } = get();

    return trainings.filter((training) => {
      // Search filter
      if (
        filters.search &&
        !training.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !training.company.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Status filter
      if (
        filters.status.length > 0 &&
        !filters.status.includes(training.status)
      ) {
        return false;
      }

      // Location filter
      if (
        filters.location.length > 0 &&
        !filters.location.some((loc) =>
          training.location.toLowerCase().includes(loc.toLowerCase())
        )
      ) {
        return false;
      }

      // Company filter
      if (
        filters.company.length > 0 &&
        !filters.company.some((comp) =>
          training.company.toLowerCase().includes(comp.toLowerCase())
        )
      ) {
        return false;
      }

      // Industry filter
      if (
        filters.industry.length > 0 &&
        !filters.industry.includes(training.industry)
      ) {
        return false;
      }

      // Posted date filter
      if (filters.postedDate) {
        const trainingDate = new Date(training.postedDate);
        const filterDate = new Date(filters.postedDate);
        if (trainingDate.toDateString() !== filterDate.toDateString()) {
          return false;
        }
      }

      return true;
    });
  },

  getPaginatedTrainings: () => {
    const { currentPage, itemsPerPage } = get();
    const filteredTrainings = get().getFilteredTrainings();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTrainings.slice(startIndex, endIndex);
  },

  getTotalPages: () => {
    const { itemsPerPage } = get();
    const filteredTrainings = get().getFilteredTrainings();
    return Math.ceil(filteredTrainings.length / itemsPerPage);
  },

  getFilteredCount: () => {
    return get().getFilteredTrainings().length;
  },
}));

export default useTrainingsStore;
