import { Color } from "@/app/colors";

export interface SectionAttributes {
  name?: string;
  color?: Color;
}

interface Section {
  start: number;
  end: number;
  attributes: SectionAttributes;
}

export interface MusicDiagramDocument {
  title: string;
  length: number; // in bars
  sections: Section[];
}
