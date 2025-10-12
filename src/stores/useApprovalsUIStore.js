import { create } from "zustand";

// UI-only store for approvals context - no API integration
const useApprovalsUIStore = create((set) => ({
  // Active tab state
  activeTab: "companies",
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Companies tab UI state
  companies: {
    filters: {
      search: "",
      status: "pending",
      dateRange: { from: null, to: null },
      sortBy: "submittedAt",
      sortOrder: "desc",
    },
    currentPage: 1,
    itemsPerPage: 10,
    setFilters: (newFilters) =>
      set((state) => ({
        companies: {
          ...state.companies,
          filters:
            typeof newFilters === "function"
              ? newFilters(state.companies.filters)
              : { ...state.companies.filters, ...newFilters },
          currentPage: 1,
        },
      })),
    setCurrentPage: (page) =>
      set((state) => ({
        companies: { ...state.companies, currentPage: page },
      })),
    clearFilters: () =>
      set((state) => ({
        companies: {
          ...state.companies,
          filters: {
            search: "",
            status: "pending",
            dateRange: { from: null, to: null },
            sortBy: "submittedAt",
            sortOrder: "desc",
          },
          currentPage: 1,
        },
      })),
  },

  // Trainers tab UI state
  trainers: {
    filters: {
      search: "",
      status: "pending",
      dateRange: { from: null, to: null },
      sortBy: "submittedAt",
      sortOrder: "desc",
    },
    currentPage: 1,
    itemsPerPage: 10,
    setFilters: (newFilters) =>
      set((state) => ({
        trainers: {
          ...state.trainers,
          filters:
            typeof newFilters === "function"
              ? newFilters(state.trainers.filters)
              : { ...state.trainers.filters, ...newFilters },
          currentPage: 1,
        },
      })),
    setCurrentPage: (page) =>
      set((state) => ({
        trainers: { ...state.trainers, currentPage: page },
      })),
    clearFilters: () =>
      set((state) => ({
        trainers: {
          ...state.trainers,
          filters: {
            search: "",
            status: "pending",
            dateRange: { from: null, to: null },
            sortBy: "submittedAt",
            sortOrder: "desc",
          },
          currentPage: 1,
        },
      })),
  },

  // Recruiters tab UI state
  recruiters: {
    filters: {
      search: "",
      status: "pending",
      dateRange: { from: null, to: null },
      sortBy: "submittedAt",
      sortOrder: "desc",
    },
    currentPage: 1,
    itemsPerPage: 10,
    setFilters: (newFilters) =>
      set((state) => ({
        recruiters: {
          ...state.recruiters,
          filters:
            typeof newFilters === "function"
              ? newFilters(state.recruiters.filters)
              : { ...state.recruiters.filters, ...newFilters },
          currentPage: 1,
        },
      })),
    setCurrentPage: (page) =>
      set((state) => ({
        recruiters: { ...state.recruiters, currentPage: page },
      })),
    clearFilters: () =>
      set((state) => ({
        recruiters: {
          ...state.recruiters,
          filters: {
            search: "",
            status: "pending",
            dateRange: { from: null, to: null },
            sortBy: "submittedAt",
            sortOrder: "desc",
          },
          currentPage: 1,
        },
      })),
  },

  // Jobs and Trainings tab UI state
  jobsAndTrainings: {
    filters: {
      search: "",
      status: "pending",
      dateRange: { from: null, to: null },
      sortBy: "submittedAt",
      sortOrder: "desc",
    },
    currentPage: 1,
    itemsPerPage: 10,
    setFilters: (newFilters) =>
      set((state) => ({
        jobsAndTrainings: {
          ...state.jobsAndTrainings,
          filters:
            typeof newFilters === "function"
              ? newFilters(state.jobsAndTrainings.filters)
              : { ...state.jobsAndTrainings.filters, ...newFilters },
          currentPage: 1,
        },
      })),
    setCurrentPage: (page) =>
      set((state) => ({
        jobsAndTrainings: { ...state.jobsAndTrainings, currentPage: page },
      })),
    clearFilters: () =>
      set((state) => ({
        jobsAndTrainings: {
          ...state.jobsAndTrainings,
          filters: {
            search: "",
            status: "pending",
            dateRange: { from: null, to: null },
            sortBy: "submittedAt",
            sortOrder: "desc",
          },
          currentPage: 1,
        },
      })),
  },
}));

export default useApprovalsUIStore;
