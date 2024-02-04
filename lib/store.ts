import { create } from "zustand";

export const useMessageShowType = create((set) => ({
  showType: "oneSide",
  setShowType: (showType: string) => set({ showType }),
}));