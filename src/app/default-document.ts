import { MusicDiagramDocument } from "@/app/music-diagram-document/music-diagram-document";

export const defaultDocument: MusicDiagramDocument = {
  title: "Untitled",
  length: 32,
  sections: [
    {
      start: 0,
      end: 3,
      attributes: {
        name: "A",
        color: "red",
      },
    },
    {
      start: 0,
      end: 1,
      attributes: {
        name: "inner",
      },
    },
  ],
};
