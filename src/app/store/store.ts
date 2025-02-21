import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { defaultDocument } from "@/app/default-document";
import {
  MusicDiagramDocument,
  SectionAttributes,
} from "@/app/music-diagram-document/music-diagram-document";

export interface StoreValue {
  document: MusicDiagramDocument;
  selection: {
    start: number | null;
    end: number | null;
    section: SectionAttributes | null;
  };
}

const initialStoreValue: StoreValue = {
  document: defaultDocument,
  selection: {
    start: null,
    end: null,
    section: null,
  },
};

export const useStore = create<StoreValue>()(devtools(() => initialStoreValue));
