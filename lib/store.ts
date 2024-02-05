import { create } from "zustand";
import { getCache, setCache } from "./cache";

export const useMessageShowType = create((set) => ({
  val: "oneSide",
  setVal: (val: string) => {
    setCache({ showType: "oneSide" });
    return set({ val });
  },
}));