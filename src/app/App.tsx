"use client";

import { useActions } from "@/app/actions/actions";
import { addBars } from "@/app/actions/add-bars";
import { ShareButton } from "@/app/components/share-button";
import SystemSegments from "@/app/components/system-segments";
import { Toolbar } from "@/app/components/toolbar";
import {
  createMusicDiagramAst,
  Diagram,
  SystemSegment,
} from "@/app/music-diagram-ast/music-diagram-ast";
import { mutateStore } from "@/app/store/mutate-store";
import { useStore } from "@/app/store/store";
import { max } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { initializeURLMonitoring, loadDocumentFromURL } from "./actions/share";
import { NotesSection } from "./notes/notes-section";

export function App() {
  const diagramDocument = useStore((state) => state.document);
  const displayPreferences = useStore((state) => state.displayPreferences);
  const title = useStore(({ title }) => title);
  const [isLoading, setIsLoading] = useState(true);

  const diagramAst = useMemo(() => {
    return createMusicDiagramAst(diagramDocument, displayPreferences);
  }, [diagramDocument, displayPreferences]);

  const nestingDepth = useMemo(() => {
    return systemSectionsNestingDepth(diagramAst.segments);
  }, [diagramAst.segments]);

  const actions = useActions();

  useEffect(() => {
    const unsubscribePromise = loadDocumentFromURL().then(() => {
      setIsLoading(false);
      return initializeURLMonitoring();
    });
    return () => {
      unsubscribePromise.then((unsubscribe) => unsubscribe());
    };
  }, []);

  useEffect(() => {
    actions.forEach((action) => action.register());

    return () => {
      actions.forEach((action) => action.unregister());
    };
  }, [actions]); // in practice actions never changes, but this is necessary for debugging

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).mutateStore = mutateStore;
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Top Bar */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto max-sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold min-w-0">
              <input
                className="focus:ring-0 focus:outline-hidden flex-shrink-0"
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
            <ShareButton />
          </div>
        </div>
        <Toolbar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading ...</p>
            </div>
          </div>
        ) : (
          <div
            className="mx-auto mt-5 max-w-7xl max-sm:pr-[var(--nesting-gap)] max-[1380px]:pl-[var(--nesting-gap)]"
            style={
              {
                "--nesting-gap": `${Math.max(16, 16 + nestingDepth * 7)}px`,
              } as React.CSSProperties
            }
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] md:grid-cols-[1fr_300px] sm:grid-cols-[1fr_150px] gap-6">
              <DiagramBody diagram={diagramAst} />
              <div className="max-sm:hidden">
                <NotesSection />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DiagramBody({ diagram }: { diagram: Diagram }) {
  if (!diagram.segments.length) {
    return (
      <div>
        <p>The diagram is empty! Click {addBars.icon} to add bars.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-8 gap-y-3">
      <SystemSegments segments={diagram.segments} />
    </div>
  );
}

function systemSectionsNestingDepth(segments: SystemSegment[]): number {
  console.log("calculating nesting depth", segments);

  const maxInnerDepth = max(
    segments.map((segment) =>
      segment.type === "MultiSystemSection"
        ? systemSectionsNestingDepth(segment.segments)
        : 0,
    ),
  );

  return maxInnerDepth ? maxInnerDepth + 1 : 1;
}
