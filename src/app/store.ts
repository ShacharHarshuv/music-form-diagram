import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { defaultDocument } from "@/app/default-document";

export interface StoreValue {
  document: typeof defaultDocument;
  // todo: nest these somehow? (under "selection state" or something like that)
  selectedBarsStart: number | null;
  selectedBarsEnd: number | null;
}

const initialStoreValue: StoreValue = {
  document: defaultDocument,
  selectedBarsStart: null,
  selectedBarsEnd: null,
};

export const useStore = create<StoreValue>()(
  devtools((set, get) => ({
    ...initialStoreValue,
    // todo: consider making all actions external
    setSelectedBarsStart: (bar: number) => {
      set({ selectedBarsStart: bar, selectedBarsEnd: bar });
    },
    setSelectedBarsEnd: (bar: number) => {
      set({ selectedBarsEnd: bar });
      if (get().selectedBarsStart === null) {
        set({ selectedBarsStart: bar });
      }
    },
  })),
);
