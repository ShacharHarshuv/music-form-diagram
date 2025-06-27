import { useEffect, useRef } from "react";
import { NotesAnchors } from "./notes-anchors";

export function useNoteAnchor<Element extends HTMLElement>(id: string) {
  console.log("useNoteAnchor", id);

  const elementRef = useRef<Element | null>(null);

  useEffect(() => {
    console.log("useNoteAnchor:useEffect", id, elementRef.current);
    if (!elementRef.current) {
      return;
    }
    NotesAnchors.register(id, elementRef.current);
    return () => {
      NotesAnchors.unregister(id);
    };
  }, [id, elementRef]);

  return elementRef;
}
