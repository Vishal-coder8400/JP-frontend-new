import { create } from "zustand";
import { candidates } from "./utils";

const useCandidatesStore = create((set, get) => ({
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
        experience: [],
        skills: [],
        registrationDate: null,
      },
      currentPage: 1,
    }),

  setCurrentPage: (page) => set({ currentPage: page }),

  setShowDeleteDialog: (show) => set({ showDeleteDialog: show }),

  setSelectedCandidate: (candidate) => set({ selectedCandidate: candidate }),

  handleDeleteCandidate: (candidate) =>
    set({
      selectedCandidate: candidate,
      showDeleteDialog: true,
    }),

  confirmDelete: () => {
    // TODO: Implement actual delete logic here
    const selectedCandidate = get().selectedCandidate;
    console.log("Deleting candidate:", selectedCandidate);

    set({
      showDeleteDialog: false,
      selectedCandidate: null,
    });
  },

  // Computed properties (getters)
  getFilteredCandidates: () => {
    const { filters } = get();

    return candidates.filter((candidate) => {
      // Apply search filter
      const matchesSearch =
        filters.search === "" ||
        candidate.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        candidate.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        candidate.skills.toLowerCase().includes(filters.search.toLowerCase());

      // Apply status filter
      const matchesStatus =
        filters.status.length === 0 ||
        filters.status.includes(candidate.status);

      // Apply location filter
      const matchesLocation =
        filters.location.length === 0 ||
        filters.location.some((loc) =>
          candidate.location.toLowerCase().includes(loc.toLowerCase())
        );

      // Apply experience filter
      const matchesExperience =
        filters.experience.length === 0 ||
        filters.experience.some((exp) =>
          candidate.experience.toLowerCase().includes(exp.toLowerCase())
        );

      // Apply skills filter
      const matchesSkills =
        filters.skills.length === 0 ||
        filters.skills.some((skill) =>
          candidate.skills.toLowerCase().includes(skill.toLowerCase())
        );

      // Apply date filter
      const matchesDate =
        !filters.registrationDate ||
        new Date(candidate.registrationDate) >=
          new Date(filters.registrationDate);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesLocation &&
        matchesExperience &&
        matchesSkills &&
        matchesDate
      );
    });
  },

  getPaginatedCandidates: () => {
    const filteredCandidates = get().getFilteredCandidates();
    const { currentPage, itemsPerPage } = get();

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredCandidates.slice(startIndex, endIndex);
  },

  getTotalPages: () => {
    const filteredCandidates = get().getFilteredCandidates();
    const { itemsPerPage } = get();

    return Math.ceil(filteredCandidates.length / itemsPerPage);
  },

  getFilteredCount: () => {
    return get().getFilteredCandidates().length;
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
