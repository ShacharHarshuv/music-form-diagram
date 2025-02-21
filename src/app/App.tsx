"use client";

import { useMemo, useEffect } from "react";
import { createMusicDiagramAst } from "@/app/music-diagram-ast/music-diagram-ast";
import SystemSegments from "@/app/components/system-segments";
import { useStore } from "@/app/store";
import { createSection } from "@/app/actions/create-section";

export function App() {
  const diagramDocument = useStore((state) => state.document);

  const diagramAst = useMemo(() => {
    return createMusicDiagramAst(diagramDocument);
  }, [diagramDocument]);

  // todo: consider better ways of handling key commands and actions (possibly also separate actions from state)
  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.code === "KeyS") {
        createSection();
      }
    });
  }, []);

  return (
    <div className="mx-auto mt-5 max-w-screen-md p-4">
      <h1 className="mb-3 text-3xl font-bold">{diagramDocument.title}</h1>
      <div className="grid grid-cols-8 gap-y-3">
        <SystemSegments segments={diagramAst.segments} />
      </div>
    </div>
  );
}
