import { isNil } from "lodash";
import { Ref, useMemo, useRef } from "react";
import { useStore } from "../store/store";
import { Note, NoteProps } from "./Note";
import { NotesAnchors } from "./notes-anchors";
import { useBottom } from "./positioning/bottom";
import { getTop, useTop } from "./positioning/top";

export function NotesSection() {
  const sections = useStore((state) => state.document.sections);

  const ref = useRef<HTMLElement>(null);
  const top = useTop(ref);
  const bottom = useBottom(ref);
  const anchors = NotesAnchors.useAnchors();

  const notesPreprocess = useMemo(() => {
    if (!top) {
      return [];
    }

    return sections
      .map((s) => {
        if (isNil(s.attributes.notes)) {
          return null;
        }
        const anchor = anchors[s.id];
        if (!anchor) {
          return null;
        }
        return {
          id: s.id,
          content: s.attributes.notes,
          anchor,
          top: getTop(anchor) - top,
        };
      })
      .filter((n) => n !== null)
      .sort((a, b) => a.top - b.top);
  }, [sections, anchors, top]);

  const notes = useMemo(() => {
    return notesPreprocess.map((note, index): NoteProps => {
      const nextNote = notesPreprocess[index + 1];
      console.log(note.top, nextNote?.top);

      return {
        ...note,
        bottom: nextNote ? nextNote.top : bottom && top ? bottom - top : null,
      };
    });
  }, [notesPreprocess, bottom, top]);

  return (
    <div className="relative p-3" ref={ref as Ref<HTMLDivElement>}>
      {notes.map((note) => (
        <Note {...note} key={note.id} />
      ))}
    </div>
  );
}
