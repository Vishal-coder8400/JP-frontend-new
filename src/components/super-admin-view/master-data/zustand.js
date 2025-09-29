import { create } from "zustand";

const useMasterDataTabStore = create((set) => ({
  activeTab: null,
  setActiveTab: (tab) => set({ activeTab: tab }),
  initializeFirstTab: (firstTabId) =>
    set((state) => ({
      activeTab: state.activeTab || firstTabId,
    })),
}));

export default useMasterDataTabStore;
