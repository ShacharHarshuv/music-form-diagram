"use client";

import { useMemo, useEffect, useRef, useState } from "react";
import {
  createMusicDiagramAst,
  Diagram,
} from "@/app/music-diagram-ast/music-diagram-ast";
import SystemSegments from "@/app/components/system-segments";
import { useStore } from "@/app/store/store";
import { useActions } from "@/app/actions/actions";
import { mutateStore } from "@/app/store/mutate-store";
import { addBars } from "@/app/actions/add-bars";
import { Note } from "./notes/Note";
import { isNil } from "lodash";

export function App() {
  const diagramDocument = useStore((state) => state.document);
  const displayPreferences = useStore((state) => state.displayPreferences);
  const title = useStore(({ title }) => title);

  const diagramAst = useMemo(() => {
    return createMusicDiagramAst(diagramDocument, displayPreferences);
  }, [diagramDocument, displayPreferences]);
  const actions = useActions();

  useEffect(() => {
    actions.forEach((action) => action.register());

    return () => {
      actions.forEach((action) => action.unregister());
    };
  }, [actions]); // in practice actions never changes, but this is necessary for debugging

  useEffect(() => {
    (window as any).mutateStore = mutateStore;
  }, []);

  return (
    <div className="mx-auto mt-5 max-w-6xl p-4">
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
      <div className="align flex gap-6">
        <DiagramBody diagram={diagramAst} />
        <NotesSection />
      </div>
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

function NotesSection() {
  const sections = useStore((state) => state.document.sections);

  const ids = useMemo(
    () => sections.filter((s) => !isNil(s.attributes.notes)).map((s) => s.id),
    [sections],
  );

  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState<number | null>(null);

  useEffect(() => {
    if (ref.current) {
      setTop(ref.current.getBoundingClientRect().top);
    }
  }, []);

  return (
    <div className="relative grow p-3" ref={ref}>
      {ids.map((id) => (
        <Note id={id} parentTop={top} key={id} />
      ))}
    </div>
  );
}
