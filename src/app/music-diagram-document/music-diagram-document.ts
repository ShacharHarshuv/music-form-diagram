import { Color } from "@/app/colors";

export interface SectionAttributes {
  name?: string;
  color?: Color;
}

export interface Section {
  id: string; // a randomly generated id that is immutable after creation
  start: number;
  end: number;
  attributes: SectionAttributes;
}

export interface MusicDiagramDocument {
  length: number; // in bars
  sections: Section[];
}
