import { create } from "zustand";
import { getAllCompanies } from "../../../../../api/super-admin/database";

const useCompaniesStore = create((set, get) => ({
  // Filter state
  filters: {
    search: "",
    status: [],
    verification: [],
    industry: [],
    companySize: [],
    location: [],
    sortBy: "createdAt",
    sortOrder: "desc",
  },

  // Pagination state
  currentPage: 1,
  itemsPerPage: 10,

  // API state
  companies: [],
  totalCount: 0,
  isLoading: false,
  error: null,

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
        verification: [],
        industry: [],
        companySize: [],
        location: [],
        sortBy: "createdAt",
        sortOrder: "desc",
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

  // API actions
  setCompanies: (companies) => set({ companies }),
  setTotalCount: (totalCount) => set({ totalCount }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  fetchCompanies: async () => {
    set({ isLoading: true, error: null });
    try {
      const { filters, currentPage, itemsPerPage } = get();
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: filters.search,
        status: filters.status.join(","),
        verification: filters.verification.join(","),
        industry: filters.industry.join(","),
        companySize: filters.companySize.join(","),
        location: filters.location.join(","),
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      };

      const response = await getAllCompanies({ params });
      const { data } = response.data;

      set({
        companies: data.corporates || data.companies || data.data || data,
        totalCount:
          data.pagination?.total ||
          data.totalCount ||
          data.total ||
          data.length ||
          0,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  confirmDelete: () => {
    // TODO: Implement actual delete logic here
    const selectedCompany = get().selectedCompany;

    set({
      showDeleteDialog: false,
      selectedCompany: null,
    });
  },

  // Computed properties (getters)
  getFilteredCompanies: () => {
    const { companies, filters } = get();

    return companies.filter((company) => {
      // Apply search filter
      const matchesSearch =
        filters.search === "" ||
        company.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
        company.email?.toLowerCase().includes(filters.search.toLowerCase()) ||
        company.industry
          ?.toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        company._id?.toLowerCase().includes(filters.search.toLowerCase());

      // Apply status filter
      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(company.status);

      // Apply verification filter
      const matchesVerification =
        filters.verification.length === 0 ||
        filters.verification.includes(company.verificationStatus);

      // Apply industry filter
      const matchesIndustry =
        filters.industry.length === 0 ||
        filters.industry.some((ind) =>
          company.industry?.toLowerCase().includes(ind.toLowerCase())
        );

      // Apply company size filter
      const matchesCompanySize =
        filters.companySize.length === 0 ||
        filters.companySize.some((size) =>
          company.companySize?.toLowerCase().includes(size.toLowerCase())
        );

      // Apply location filter
      const matchesLocation =
        filters.location.length === 0 ||
        filters.location.some((loc) =>
          company.location?.toLowerCase().includes(loc.toLowerCase())
        );

      return (
        matchesSearch &&
        matchesStatus &&
        matchesVerification &&
        matchesIndustry &&
        matchesCompanySize &&
        matchesLocation
      );
    });
  },

  getPaginatedCompanies: () => {
    const { companies } = get();
    return companies; // API already handles pagination
  },

  getTotalPages: () => {
    const { totalCount, itemsPerPage } = get();
    return Math.ceil(totalCount / itemsPerPage);
  },

  getFilteredCount: () => {
    return get().totalCount;
  },

  // Additional utility methods
  hasActiveFilters: () => {
    const { filters } = get();
    return (
      filters.search !== "" ||
      filters.status.length > 0 ||
      filters.verification.length > 0 ||
      filters.industry.length > 0 ||
      filters.companySize.length > 0 ||
      filters.location.length > 0 ||
      filters.sortBy !== "createdAt" ||
      filters.sortOrder !== "desc"
    );
  },

  getActiveFiltersCount: () => {
    const { filters } = get();
    let count = 0;
    if (filters.search !== "") count++;
    if (filters.status.length > 0) count++;
    if (filters.verification.length > 0) count++;
    if (filters.industry.length > 0) count++;
    if (filters.companySize.length > 0) count++;
    if (filters.location.length > 0) count++;
    if (filters.sortBy !== "createdAt") count++;
    if (filters.sortOrder !== "desc") count++;
    return count;
  },
}));

export default useCompaniesStore;
