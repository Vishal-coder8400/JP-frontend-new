import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  refetchProfile: false,
  tokenInitialized: false,

  setToken: (token, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }
    set({ token, tokenInitialized: true }); // ✅ mark as initialized
  },

  setTokenInitialized: () => set({ tokenInitialized: true }),

  setUser: (user) =>
    set((state) => {
      if (JSON.stringify(state.user) === JSON.stringify(user)) return state;
      return { user };
    }),

  setIsAuthenticated: (isAuthenticated) =>
    set((state) => {
      if (state.isAuthenticated === isAuthenticated) return state;
      return { isAuthenticated };
    }),

  logout: () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      tokenInitialized: true, // ✅ make sure to reset this
    });
  },
}));

export default useAuthStore;
