import { create } from "zustand";

// UI-only store for database context - no API integration
const useDatabaseUIStore = create((set) => ({
  // Companies tab UI state
  companies: {
    filters: {
      search: "",
      status: "active",
      verification: "verified",
      industry: [],
      companySize: [],
      location: [],
      sortBy: "createdAt",
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
            status: "active",
            verification: "verified",
            industry: [],
            companySize: [],
            location: [],
            sortBy: "createdAt",
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
      status: "active",
      industry: [],
      experience: [],
      location: [],
      skills: [],
      sortBy: "createdAt",
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
            status: "active",
            industry: [],
            experience: [],
            location: [],
            skills: [],
            sortBy: "createdAt",
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
      status: "active",
      industry: [],
      experience: [],
      location: [],
      sortBy: "createdAt",
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
            status: "active",
            industry: [],
            experience: [],
            location: [],
            sortBy: "createdAt",
            sortOrder: "desc",
          },
          currentPage: 1,
        },
      })),
  },

  // Candidates tab UI state
  candidates: {
    filters: {
      search: "",
      status: "active",
      industry: [],
      location: [],
      experience: [],
      education: [],
      skills: [],
      sortBy: "createdAt",
      sortOrder: "desc",
    },
    currentPage: 1,
    itemsPerPage: 10,
    setFilters: (newFilters) =>
      set((state) => ({
        candidates: {
          ...state.candidates,
          filters:
            typeof newFilters === "function"
              ? newFilters(state.candidates.filters)
              : { ...state.candidates.filters, ...newFilters },
          currentPage: 1,
        },
      })),
    setCurrentPage: (page) =>
      set((state) => ({
        candidates: { ...state.candidates, currentPage: page },
      })),
    clearFilters: () =>
      set((state) => ({
        candidates: {
          ...state.candidates,
          filters: {
            search: "",
            status: "active",
            industry: [],
            location: [],
            experience: [],
            education: [],
            skills: [],
            sortBy: "createdAt",
            sortOrder: "desc",
          },
          currentPage: 1,
        },
      })),
  },
}));

export default useDatabaseUIStore;
