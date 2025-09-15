import { create } from "zustand";
import { jobsData } from "../../utils";

const useJobsStore = create((set, get) => ({
  // Data
  jobs: jobsData,

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
  getFilteredJobs: () => {
    const { jobs, filters } = get();

    return jobs.filter((job) => {
      // Search filter
      if (
        filters.search &&
        !job.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !job.company.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(job.status)) {
        return false;
      }

      // Location filter
      if (
        filters.location.length > 0 &&
        !filters.location.some((loc) =>
          job.location.toLowerCase().includes(loc.toLowerCase())
        )
      ) {
        return false;
      }

      // Company filter
      if (
        filters.company.length > 0 &&
        !filters.company.some((comp) =>
          job.company.toLowerCase().includes(comp.toLowerCase())
        )
      ) {
        return false;
      }

      // Industry filter
      if (
        filters.industry.length > 0 &&
        !filters.industry.includes(job.industry)
      ) {
        return false;
      }

      // Posted date filter
      if (filters.postedDate) {
        const jobDate = new Date(job.postedDate);
        const filterDate = new Date(filters.postedDate);
        if (jobDate.toDateString() !== filterDate.toDateString()) {
          return false;
        }
      }

      return true;
    });
  },

  getPaginatedJobs: () => {
    const { currentPage, itemsPerPage } = get();
    const filteredJobs = get().getFilteredJobs();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredJobs.slice(startIndex, endIndex);
  },

  getTotalPages: () => {
    const { itemsPerPage } = get();
    const filteredJobs = get().getFilteredJobs();
    return Math.ceil(filteredJobs.length / itemsPerPage);
  },

  getFilteredCount: () => {
    return get().getFilteredJobs().length;
  },
}));

export default useJobsStore;
