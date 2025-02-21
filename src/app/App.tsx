"use client";

import { useMemo, useEffect } from "react";
import { createMusicDiagramAst } from "@/app/music-diagram-ast/music-diagram-ast";
import SystemSegments from "@/app/components/system-segments";
import { useStore } from "@/app/store/store";
import { actions } from "@/app/actions/actions";

export function App() {
  const diagramDocument = useStore((state) => state.document);

  const diagramAst = useMemo(() => {
    return createMusicDiagramAst(diagramDocument);
  }, [diagramDocument]);

  useEffect(() => {
    actions.forEach((action) => action.register());
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
