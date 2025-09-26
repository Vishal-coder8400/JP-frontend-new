import { create } from "zustand";
import { getApprovalsList } from "../../../../../api/super-admin/approvals";

const useCompaniesStore = create((set, get) => ({
  // Data state
  companies: [],
  loading: false,
  error: null,
  totalCount: 0,

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
  setFilter: (filterName, value) => {
    set((state) => ({
      filters: { ...state.filters, [filterName]: value },
      currentPage: 1, // Reset to first page when filtering
    }));
    // Trigger API call after setting filter
    setTimeout(() => get().fetchCompanies(), 0);
  },

  updateFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      currentPage: 1, // Reset to first page when filtering
    }));
    // Trigger API call after updating filters
    setTimeout(() => get().fetchCompanies(), 0);
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
    setTimeout(() => get().fetchCompanies(), 0);
  },

  clearAllFilters: () => {
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
    });
    // Trigger API call after clearing filters
    setTimeout(() => get().fetchCompanies(), 0);
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
    // Trigger API call after changing page
    setTimeout(() => get().fetchCompanies(), 0);
  },

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

    set({
      showDeleteDialog: false,
      selectedCompany: null,
    });
  },

  // API actions
  fetchCompanies: async () => {
    const { filters, currentPage, itemsPerPage } = get();

    set({ loading: true, error: null });

    try {
      // Build query parameters
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: filters.search,
        ...(filters.status.length > 0 && { status: filters.status }),
        ...(filters.location.length > 0 && { location: filters.location }),
        ...(filters.industry.length > 0 && { industry: filters.industry }),
        ...(filters.company.length > 0 && { company: filters.company }),
        ...(filters.postedDate && { postedDate: filters.postedDate }),
      };

      const response = await getApprovalsList("corporate", params);

      // Parse the API response structure
      const companies = response.data?.data?.companies || [];
      const pagination = response.data?.data?.pagination || {};

      // Map API data to component expected format
      const companiesData = companies.map((company) => ({
        id: company._id,
        name: company.name || "N/A",
        email: company.email || "N/A",
        contact: company.phone
          ? `${company.phone.countryCode} ${company.phone.number}`
          : "N/A",
        industry: company.industry || "N/A",
        location: company.location || "N/A",
        status: company.status || "pending",
        joinedDate: company.createdAt
          ? new Date(company.createdAt).toISOString().split("T")[0]
          : "N/A",
        lastUpdated: company.updatedAt
          ? new Date(company.updatedAt).toISOString().split("T")[0]
          : "N/A",
        // Additional API fields
        _id: company._id,
        phone: company.phone,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt,
      }));

      const total = pagination.totalCompanies || companiesData.length;

      set({
        companies: companiesData,
        totalCount: total,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching companies:", error);
      set({
        error: error.response?.data?.message || "Failed to fetch companies",
        loading: false,
      });
    }
  },

  refetchCompanies: () => {
    get().fetchCompanies();
  },

  // Computed properties (getters)
  getFilteredCompanies: () => {
    const { companies } = get();
    return companies;
  },

  getPaginatedCompanies: () => {
    const { companies } = get();
    return companies;
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
