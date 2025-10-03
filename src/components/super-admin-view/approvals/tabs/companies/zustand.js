import { create } from "zustand";
import { getApprovalsList } from "../../../../../api/super-admin/approvals";

const useCompaniesStore = create((set, get) => ({
  // Data state
  companies: [],
  loading: false,
  error: null,
  totalCount: 0,
  companyOptions: [],

  // Filter state
  filters: {
    search: "",
    status: "pending",
    location: [],
    company: [],
    industry: [],
    dateFrom: null,
    dateTo: null,
  },

  // Pagination state
  currentPage: 1,
  itemsPerPage: 10,

  // UI state
  showDeleteDialog: false,
  selectedCompany: null,

  // Actions

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

  // Method to handle search updates (debounced)
  setSearchData: (newFormData) => {
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
    // Trigger API call after setting search data
    setTimeout(() => get().fetchCompanies(), 0);
  },

  clearAllFilters: () => {
    set({
      filters: {
        search: "",
        status: "pending",
        location: [],
        company: [],
        industry: [],
        dateFrom: null,
        dateTo: null,
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

  handleDeleteCompany: (company) =>
    set({
      selectedCompany: company,
      showDeleteDialog: true,
    }),

  // API actions
  fetchCompanies: async () => {
    const { filters, currentPage, itemsPerPage } = get();

    set({ loading: true, error: null });

    try {
      // Build query parameters
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        sortBy: "submittedAt",
        sortOrder: "desc",
        ...(filters.search &&
          filters.search.trim() && { search: filters.search.trim() }),
        ...(filters.status && { status: filters.status }),
        ...(filters.location.length > 0 && { location: filters.location }),
        ...(filters.industry.length > 0 && { industry: filters.industry }),
        ...(filters.company.length > 0 && { company: filters.company }),
        ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
        ...(filters.dateTo && { dateTo: filters.dateTo }),
      };

      const response = await getApprovalsList("corporate", params);

      // Parse the API response structure
      const approvals = response.data?.data?.approvals || [];
      const pagination = response.data?.data?.pagination || {};

      // Map API data to component expected format
      const companiesData = approvals.map((approval) => {
        const companyData = approval.data || {};
        const basicInfo = companyData.basicInformation || {};
        const spocInfo = companyData.spocInformation || {};

        return {
          id: approval._id,
          name: basicInfo.companyName || "N/A",
          email: basicInfo.companyEmail || "N/A",
          contact: basicInfo.companyContactNumber
            ? `${basicInfo.companyContactNumber.countryCode} ${basicInfo.companyContactNumber.number}`
            : "N/A",
          industry: basicInfo.companyType || "N/A",
          location: "", // Not available in API response
          status: approval.status || "pending",
          approvalStatus: approval.status || "pending",
          joinedDate: companyData.createdAt
            ? new Date(companyData.createdAt).toISOString().split("T")[0]
            : "N/A",
          lastUpdated: companyData.updatedAt
            ? new Date(companyData.updatedAt).toISOString().split("T")[0]
            : "N/A",
          // Additional API fields for drawer
          _id: approval._id,
          type: approval.type,
          applicantId: approval.applicantId,
          applicantType: approval.applicantType,
          submittedAt: approval.submittedAt,
          version: approval.version,
          isActive: approval.isActive,
          createdAt: approval.createdAt,
          updatedAt: approval.updatedAt,
          // Full company data for drawer
          fullCompanyData: companyData,
          // SPOC information
          spocName: spocInfo.fullName || "N/A",
          spocEmail: spocInfo.email || "N/A",
          spocContact: spocInfo.contactNumber
            ? `${spocInfo.contactNumber.countryCode} ${spocInfo.contactNumber.number}`
            : "N/A",
          // Company details
          companyLogo: basicInfo.companyLogo || "",
          websiteURL: basicInfo.websiteURL || "",
        };
      });

      const total = pagination.totalApprovals || companiesData.length;

      // Extract unique company names for filter options
      const uniqueCompanies = [
        ...new Set(companiesData.map((company) => company.name)),
      ]
        .filter((name) => name !== "N/A")
        .map((name, index) => ({
          id: name.toLowerCase().replace(/\s+/g, "-"),
          label: name,
        }));

      set({
        companies: companiesData,
        totalCount: total,
        companyOptions: uniqueCompanies,
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

  // Computed properties (getters)

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
}));

export default useCompaniesStore;
