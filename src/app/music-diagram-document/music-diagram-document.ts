import { Color } from "@/app/colors";

export interface SectionAttributes {
  name?: string;
  color?: Color;
}

interface Section {
  id: number; // Can we do without these? They are not necessary to describe the document, and are only helpful for the UI
  start: number;
  end: number;
  attributes: SectionAttributes;
}

export interface MusicDiagramDocument {
  title: string;
  length: number; // in bars
  sections: Section[];
}
