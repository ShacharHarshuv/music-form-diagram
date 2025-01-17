export interface SectionAttributes {
  name?: string;
  color?: string;
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
