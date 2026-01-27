import { create } from "zustand";

interface UIState {
  composeOpen: boolean;
  openCompose: () => void;
  closeCompose: () => void;
}

export const useUiStore = create<UIState>((set) => ({
  composeOpen: false,
  openCompose: () => set({ composeOpen: true }),
  closeCompose: () => set({ composeOpen: false }),
}));
