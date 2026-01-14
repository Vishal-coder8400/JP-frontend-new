import { create } from "zustand";
const useJobPostStore = create((set) => ({
  jobPost: null,
  setJobPost: (jobPost) =>
    set((state) => {
      if (JSON.stringify(state.jobPost) === JSON.stringify(jobPost))
        return state;
      return { jobPost };
    }),
}));

export default useJobPostStore;
