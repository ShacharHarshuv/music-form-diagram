import { useEffect, useRef } from "react";
import { NotesAnchors } from "./notes-anchors";

export function useNoteAnchor<Element extends HTMLElement>(id: string) {
  const elementRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }
    NotesAnchors.register(id, elementRef.current);
    return () => {
      NotesAnchors.unregister(id);
    };
  }, [id]);

  return elementRef;
}
