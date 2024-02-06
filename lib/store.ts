import { create } from "zustand";

export const useMessageShowType = create((set) => ({
  val: "oneSide",
  setVal: (val: string) => {
    return set({ val });
  },
}));