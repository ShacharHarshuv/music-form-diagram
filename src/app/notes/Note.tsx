import { useEffect, useMemo, useRef } from "react";
import { useStore } from "../store/store";
import { NotesAnchors } from "./notes-anchors";
import { mutateSection } from "../components/mutate-section";

const offset = 20;

export function Note({
  id,
  parentTop,
}: {
  id: string;
  parentTop: number | null;
}) {
  const content = useStore((state) => {
    const section = state.document.sections.find(
      (section) => section.id === id,
    );
    return section ? section.attributes.notes || "" : "";
  });

  const anchor = NotesAnchors.useAnchor(id);

  // todo: make the "layout engine" more sophisticated to handle overlapping notes & boundary change
  const verticalPosition = useMemo(() => {
    if (!anchor) return null;
    const rect = anchor.getBoundingClientRect();
    return rect.top - (parentTop ?? 0) - offset;
  }, [anchor, parentTop]);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (!verticalPosition) {
    return null;
  }

  /* TODO: use a smarter editor with markdown support */
  return (
    <textarea
      ref={inputRef}
      className="absolute w-full border p-2"
      style={{
        top: verticalPosition + "px",
      }}
      value={content}
      onChange={(e) => {
        mutateSection(id, (section) => {
          section.attributes.notes = e.currentTarget.value;
        });
      }}
      onBlur={() => {
        if (content.trim() === "") {
          mutateSection(id, (section) => {
            delete section.attributes.notes;
          });
        }
      }}
    />
  );
}
