"use client";

import { MusicDiagramDocument } from "@/app/music-diagram-document/music-diagram-document";
import { useState, useMemo } from "react";
import { createMusicDiagramAst } from "@/app/music-diagram-ast/music-diagram-ast";

export function App() {
  const [diagram, setDiagram] = useState<MusicDiagramDocument>({
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
  });

  const diagramAst = useMemo(() => {
    return createMusicDiagramAst(diagram);
  }, [diagram]);

  return (
    <div>
      <pre>{JSON.stringify(diagramAst, null, 2)}</pre>
    </div>
  );
}
