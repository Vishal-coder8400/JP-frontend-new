import { create } from "zustand";

const useJobsAndTrainingsTabStore = create((set) => ({
  activeTab: "jobs",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export default useJobsAndTrainingsTabStore;
