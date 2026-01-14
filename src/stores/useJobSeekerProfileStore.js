import { create } from "zustand";

export const useJobSeekerProfileStore = create((set) => ({
  jobSeekerProfile: null,
  setJobSeekerProfile: (jobSeekerProfile) =>
    set((state) => {
      if (
        JSON.stringify(state.jobSeekerProfile) ===
        JSON.stringify(jobSeekerProfile)
      )
        return state;
      return { jobSeekerProfile };
    }),
}));

export default useJobSeekerProfileStore;
