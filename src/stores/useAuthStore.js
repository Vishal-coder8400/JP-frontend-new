import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  refetchProfile: false,
  tokenInitialized: false,

  setToken: (token, rememberMe = false) => {
    console.log("Setting token:", token);
    localStorage.setItem("token", token);
    set({ token, tokenInitialized: true });
  },

  setTokenInitialized: () => {
    console.log("AuthStore - Setting tokenInitialized to true");
    set({ tokenInitialized: true });
  },

  setUser: (user) =>
    set((state) => {
      if (JSON.stringify(state.user) === JSON.stringify(user)) return state;
      return { user };
    }),

  setIsAuthenticated: (isAuthenticated) =>
    set((state) => {
      console.log("Setting isAuthenticated:", isAuthenticated);
      if (state.isAuthenticated === isAuthenticated) return state;
      return { isAuthenticated };
    }),

  setRefetchProfile: (value) => set({ refetchProfile: value }),

  logout: () => {
    localStorage.removeItem("token");
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      refetchProfile: false,
      tokenInitialized: true, // ✅ make sure to reset this
    });
  },
}));

export default useAuthStore;
