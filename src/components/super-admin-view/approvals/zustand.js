import { create } from "zustand";

const useApprovalsTabStore = create((set) => ({
  activeTab: "companies",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export default useApprovalsTabStore;
