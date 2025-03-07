import { MusicDiagramDocument } from "@/app/music-diagram-document/music-diagram-document";
import { v4 as uuidv4 } from "uuid";

export const defaultDocument: MusicDiagramDocument = {
  length: 32,
  sections: [
    {
      id: uuidv4(),
      start: 0,
      end: 3,
      attributes: {
        name: "A",
        color: "red",
      },
    },
    {
      id: uuidv4(),
      start: 0,
      end: 1,
      attributes: {
        name: "inner",
      },
    },
  ],
};
