import { useEffect, useRef } from "react";
import { mutateSection } from "../components/mutate-section";

export interface NoteProps {
  id: string;
  content: string;
  anchor: HTMLElement;
  top: number;
  bottom: number | null;
}

export function Note(props: NoteProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /* TODO: use a smarter editor with markdown support */
  return (
    <textarea
      ref={inputRef}
      className="absolute w-full border-b p-2 resize-none text-sm"
      style={{
        top: props.top + "px",
        height: props.bottom ? props.bottom - props.top + "px" : undefined,
      }}
      value={props.content}
      onChange={(e) => {
        mutateSection(props.id, (section) => {
          section.attributes.notes = e.currentTarget.value;
        });
      }}
      onBlur={() => {
        if (props.content.trim() === "") {
          mutateSection(props.id, (section) => {
            delete section.attributes.notes;
          });
        }
      }}
    />
  );
}
