import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { defaultDocument } from "@/app/default-document";

export interface StoreValue {
  document: typeof defaultDocument;
  selection: {
    start: number | null;
    end: number | null;
  };
}

const initialStoreValue: StoreValue = {
  document: defaultDocument,
  selection: {
    start: null,
    end: null,
  },
};

export const useStore = create<StoreValue>()(devtools(() => initialStoreValue));
