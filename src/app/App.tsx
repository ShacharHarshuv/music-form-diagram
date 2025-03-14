"use client";

import { useMemo, useEffect } from "react";
import {
  createMusicDiagramAst,
  Diagram,
} from "@/app/music-diagram-ast/music-diagram-ast";
import SystemSegments from "@/app/components/system-segments";
import { useStore } from "@/app/store/store";
import { useActions } from "@/app/actions/actions";
import { mutateStore } from "@/app/store/mutate-store";
import { addBars } from "@/app/actions/add-bars";

export function App() {
  const diagramDocument = useStore((state) => state.document);
  const title = useStore(({ title }) => title);

  const diagramAst = useMemo(() => {
    return createMusicDiagramAst(diagramDocument);
  }, [diagramDocument]);
  const actions = useActions();

  useEffect(() => {
    actions.forEach((action) => action.register());

    return () => {
      actions.forEach((action) => action.unregister());
    };
  }, [actions]); // in practice actions never changes, but this is necessary for debugging

  return (
    <div className="mx-auto mt-5 max-w-(--breakpoint-md) p-4">
      <h1 className="mb-3 text-3xl font-bold">
        <input
          className="focus:ring-0 focus:outline-hidden"
          type="text"
          value={title}
          placeholder="Untitled"
          onInput={(e) => {
            mutateStore((store) => {
              store.title = e.currentTarget.value;
            });
          }}
        />
      </h1>
      <DiagramBody diagram={diagramAst} />
    </div>
  );
}

function DiagramBody({ diagram }: { diagram: Diagram }) {
  if (!diagram.segments.length) {
    return (
      <div>
        <p>
          The diagram is empty! Click the button below to{" "}
          <span
            className="cursor-pointer text-blue-500 hover:underline"
            onClick={() => addBars()}
          >
            adding bars
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-8 gap-y-3">
      <SystemSegments segments={diagram.segments} />
    </div>
  );
}
