import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { defaultDocument } from "@/app/default-document";
import { MusicDiagramDocument } from "@/app/music-diagram-document/music-diagram-document";

export interface StoreValue {
  title: string;
  document: MusicDiagramDocument;
  selection: {
    start: number | null;
    end: number | null;
    section: string | null;
  };
}

const initialStoreValue: StoreValue = {
  title: "",
  document: defaultDocument,
  selection: {
    start: null,
    end: null,
    section: null,
  },
};

export const useStore = create<StoreValue>()(
  devtools(
    persist(() => initialStoreValue, {
      name: "music-diagram",
    }),
  ),
);
