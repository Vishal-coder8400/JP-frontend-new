import { create } from "zustand";
import { companies } from "./utils";

const useCompaniesStore = create((set, get) => ({
  // Filter state
  filters: {
    search: "",
    status: [],
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
  selectedCompany: null,

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
        status: [],
        location: [],
        company: [],
        industry: [],
        postedDate: null,
      },
      currentPage: 1,
    }),

  setCurrentPage: (page) => set({ currentPage: page }),

  setShowDeleteDialog: (show) => set({ showDeleteDialog: show }),

  setSelectedCompany: (company) => set({ selectedCompany: company }),

  handleDeleteCompany: (company) =>
    set({
      selectedCompany: company,
      showDeleteDialog: true,
    }),

  confirmDelete: () => {
    // TODO: Implement actual delete logic here
    const selectedCompany = get().selectedCompany;
    console.log("Deleting company:", selectedCompany);

    set({
      showDeleteDialog: false,
      selectedCompany: null,
    });
  },

  // Computed properties (getters)
  getFilteredCompanies: () => {
    const { filters } = get();

    return companies.filter((company) => {
      // Apply search filter
      const matchesSearch =
        filters.search === "" ||
        company.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        company.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        company.industry.toLowerCase().includes(filters.search.toLowerCase());

      // Apply status filter
      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(company.status);

      // Apply location filter
      const matchesLocation =
        filters.location.length === 0 ||
        filters.location.some((loc) =>
          company.location.toLowerCase().includes(loc.toLowerCase())
        );

      // Apply industry filter
      const matchesIndustry =
        filters.industry.length === 0 ||
        filters.industry.some((ind) =>
          company.industry.toLowerCase().includes(ind.toLowerCase())
        );

      // Apply company filter
      const matchesCompany =
        filters.company.length === 0 ||
        filters.company.some((comp) =>
          company.name.toLowerCase().includes(comp.toLowerCase())
        );

      // Apply date filter
      const matchesDate =
        !filters.postedDate ||
        new Date(company.joinedDate) >= new Date(filters.postedDate);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesLocation &&
        matchesIndustry &&
        matchesCompany &&
        matchesDate
      );
    });
  },

  getPaginatedCompanies: () => {
    const filteredCompanies = get().getFilteredCompanies();
    const { currentPage, itemsPerPage } = get();

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredCompanies.slice(startIndex, endIndex);
  },

  getTotalPages: () => {
    const filteredCompanies = get().getFilteredCompanies();
    const { itemsPerPage } = get();

    return Math.ceil(filteredCompanies.length / itemsPerPage);
  },

  getFilteredCount: () => {
    return get().getFilteredCompanies().length;
  },

  // Additional utility methods
  hasActiveFilters: () => {
    const { filters } = get();
    return (
      filters.search !== "" ||
      filters.status.length > 0 ||
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
    if (filters.status.length > 0) count++;
    if (filters.location.length > 0) count++;
    if (filters.company.length > 0) count++;
    if (filters.industry.length > 0) count++;
    if (filters.postedDate !== null) count++;
    return count;
  },
}));

export default useCompaniesStore;
