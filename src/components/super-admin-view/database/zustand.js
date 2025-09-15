import { create } from "zustand";

const useDatabaseTabStore = create((set) => ({
  activeTab: "companies",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export default useDatabaseTabStore;
