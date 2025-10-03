import { getJobseekersList } from "@/api/super-admin/user";
import { create } from "zustand";

const useCandidatesStore = create((set, get) => ({
  // Data state
  candidates: [],
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
    registrationDate: null,
  },

  // Pagination state
  currentPage: 1,
  itemsPerPage: 10,

  // UI state
  showDeleteDialog: false,
  selectedCandidate: null,

  // Actions
  setFilter: (filterName, value) => {
    set((state) => ({
      filters: { ...state.filters, [filterName]: value },
      currentPage: 1, // Reset to first page when filtering
    }));
    // Trigger API call after setting filter
    setTimeout(() => get().fetchCandidates(), 0);
  },

  updateFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      currentPage: 1, // Reset to first page when filtering
    }));
    // Trigger API call after updating filters
    setTimeout(() => get().fetchCandidates(), 0);
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
    setTimeout(() => get().fetchCandidates(), 0);
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
    setTimeout(() => get().fetchCandidates(), 0);
  },

  clearAllFilters: () => {
    set({
      filters: {
        search: "",
        status: [],
        location: [],
        experience: [],
        skills: [],
        registrationDate: null,
      },
      currentPage: 1,
    });
    // Trigger API call after clearing filters
    setTimeout(() => get().fetchCandidates(), 0);
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
    // Trigger API call after changing page
    setTimeout(() => get().fetchCandidates(), 0);
  },

  setShowDeleteDialog: (show) => set({ showDeleteDialog: show }),

  setSelectedCandidate: (candidate) => set({ selectedCandidate: candidate }),

  handleDeleteCandidate: (candidate) =>
    set({
      selectedCandidate: candidate,
      showDeleteDialog: true,
    }),

  // API actions
  fetchCandidates: async () => {
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
        ...(filters.experience.length > 0 && {
          experience: filters.experience,
        }),
        ...(filters.skills.length > 0 && { skills: filters.skills }),
        ...(filters.registrationDate && {
          registrationDate: filters.registrationDate,
        }),
      };

      const response = await getJobseekersList(params);

      // Parse the API response structure
      const jobSeekers = response.data?.data?.jobSeekers || [];
      const pagination = response.data?.data?.pagination || {};

      // Map API data to component expected format
      const candidatesData = jobSeekers.map((jobSeeker) => ({
        id: jobSeeker._id,
        name: jobSeeker.name || "N/A",
        email: jobSeeker.email || "N/A",
        contact: jobSeeker.phone
          ? `${jobSeeker.phone.countryCode} ${jobSeeker.phone.number}`
          : "N/A",
        experience:
          jobSeeker.experience?.length > 0
            ? `${jobSeeker.experience.length} experience entries`
            : "N/A",
        skills:
          jobSeeker.skills?.length > 0 ? jobSeeker.skills.join(", ") : "N/A",
        industry: "N/A", // Not available in API response
        occupation:
          jobSeeker.education?.length > 0
            ? jobSeeker.education[0].degree
            : "N/A",
        location: "N/A", // Not available in API response
        status: jobSeeker.status || "N/A",
        summary: `Profile completion: ${jobSeeker.signupProgress}%`,
        totalApplications: "N/A", // Not available in API response
        selectedApplications: "N/A", // Not available in API response
        rejectedApplications: "N/A", // Not available in API response
        pendingApplications: "N/A", // Not available in API response
        avatar: jobSeeker.profilePicture || "/google.png",
        registrationDate: jobSeeker.createdAt
          ? new Date(jobSeeker.createdAt).toISOString().split("T")[0]
          : "N/A",
        lastUpdated: jobSeeker.updatedAt
          ? new Date(jobSeeker.updatedAt).toISOString().split("T")[0]
          : "N/A",
        // Additional API fields
        _id: jobSeeker._id,
        profilePicture: jobSeeker.profilePicture,
        phone: jobSeeker.phone,
        education: jobSeeker.education,
        certifications: jobSeeker.certifications,
        signupProgress: jobSeeker.signupProgress,
        completedStages: jobSeeker.completedStages,
        currentStage: jobSeeker.currentStage,
        isVerified: jobSeeker.isVerified,
        createdAt: jobSeeker.createdAt,
        updatedAt: jobSeeker.updatedAt,
      }));

      const total = pagination.totalJobSeekers || candidatesData.length;

      set({
        candidates: candidatesData,
        totalCount: total,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching candidates:", error);
      set({
        error: error.response?.data?.message || "Failed to fetch candidates",
        loading: false,
      });
    }
  },

  refetchCandidates: () => {
    get().fetchCandidates();
  },

  confirmDelete: () => {
    // TODO: Implement actual delete logic here
    const selectedCandidate = get().selectedCandidate;

    set({
      showDeleteDialog: false,
      selectedCandidate: null,
    });
  },

  // Computed properties (getters)
  getFilteredCandidates: () => {
    const { candidates } = get();
    return candidates;
  },

  getPaginatedCandidates: () => {
    const { candidates } = get();
    return candidates;
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
      filters.registrationDate !== null
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
    if (filters.registrationDate !== null) count++;
    return count;
  },
}));

export default useCandidatesStore;
