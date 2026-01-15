import { api } from "@/lib/backendUrl";
import { create } from "zustand";

interface User {
  id: string;
  email: string;
  displayName: string;
  provider: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;

  getUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,

  getUser: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/api/user/me");
      set({ user: res.data.data, loading: false });
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error in get user store: ", error.message);
        set({ error: error.message, loading: false });
      }
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await api.post("/auth/logout");
      set({ user: null, loading: false });
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error in get user store: ", error.message);
        set({ error: error.message, loading: false });
      }
    }
  },
}));
