import { create } from "zustand";
import { trainers } from "./utils";

const useTrainersStore = create((set, get) => ({
  // Filter state
  filters: {
    search: "",
    skills: [],
    industry: [],
    experience: [],
    location: [],
  },

  // Pagination state
  currentPage: 1,
  itemsPerPage: 10,

  // UI state
  showDeleteDialog: false,
  selectedTrainer: null,

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
        skills: [],
        industry: [],
        experience: [],
        location: [],
      },
      currentPage: 1,
    }),

  setCurrentPage: (page) => set({ currentPage: page }),

  setShowDeleteDialog: (show) => set({ showDeleteDialog: show }),

  setSelectedTrainer: (trainer) => set({ selectedTrainer: trainer }),

  handleDeleteTrainer: (trainer) =>
    set({
      selectedTrainer: trainer,
      showDeleteDialog: true,
    }),

  confirmDelete: () => {
    // TODO: Implement actual delete logic here
    const selectedTrainer = get().selectedTrainer;
    console.log("Deleting trainer:", selectedTrainer);

    set({
      showDeleteDialog: false,
      selectedTrainer: null,
    });
  },

  // Computed properties (getters)
  getFilteredTrainers: () => {
    const { filters } = get();

    return trainers.filter((trainer) => {
      // Apply search filter
      const matchesSearch =
        filters.search === "" ||
        trainer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        trainer.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        trainer.specialization
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      // Apply skills filter (map to trainer's specialization field)
      const matchesSkills =
        filters.skills.length === 0 ||
        filters.skills.some((skill) =>
          trainer.specialization.toLowerCase().includes(skill.toLowerCase())
        );

      // Apply industry filter (map to trainer's expertise field)
      const matchesIndustry =
        filters.industry.length === 0 ||
        filters.industry.some((industry) =>
          trainer.expertise.toLowerCase().includes(industry.toLowerCase())
        );

      // Apply experience filter
      const matchesExperience =
        filters.experience.length === 0 ||
        filters.experience.some((exp) =>
          trainer.experience.toLowerCase().includes(exp.toLowerCase())
        );

      // Apply location filter
      const matchesLocation =
        filters.location.length === 0 ||
        filters.location.some((loc) =>
          trainer.location.toLowerCase().includes(loc.toLowerCase())
        );

      return (
        matchesSearch &&
        matchesSkills &&
        matchesIndustry &&
        matchesExperience &&
        matchesLocation
      );
    });
  },

  getPaginatedTrainers: () => {
    const filteredTrainers = get().getFilteredTrainers();
    const { currentPage, itemsPerPage } = get();

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredTrainers.slice(startIndex, endIndex);
  },

  getTotalPages: () => {
    const filteredTrainers = get().getFilteredTrainers();
    const { itemsPerPage } = get();

    return Math.ceil(filteredTrainers.length / itemsPerPage);
  },

  getFilteredCount: () => {
    return get().getFilteredTrainers().length;
  },

  // Additional utility methods
  hasActiveFilters: () => {
    const { filters } = get();
    return (
      filters.search !== "" ||
      filters.skills.length > 0 ||
      filters.industry.length > 0 ||
      filters.experience.length > 0 ||
      filters.location.length > 0
    );
  },

  getActiveFiltersCount: () => {
    const { filters } = get();
    let count = 0;
    if (filters.search !== "") count++;
    if (filters.skills.length > 0) count++;
    if (filters.industry.length > 0) count++;
    if (filters.experience.length > 0) count++;
    if (filters.location.length > 0) count++;
    return count;
  },
}));

export default useTrainersStore;
