import { useEffect, useRef } from "react";
import { mutateSection } from "../components/mutate-section";
import { useSection } from "../components/use-section";
import { Section } from "../music-diagram-document/music-diagram-document";
import { mutateStore } from "../store/mutate-store";

export interface NoteProps {
  id: string;
  section: Section;
  content: string;
  anchor: HTMLElement;
  top: number;
  bottom: number | null;
}

export function Note(props: NoteProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { color } = useSection(props.section);

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
        outlineColor: color,
      }}
      value={props.content}
      onFocus={() => {
        mutateStore(({ selection }) => {
          selection.section = props.id;
        });
      }}
      onBlur={() => {
        mutateStore(({ selection }) => {
          selection.section = null;
        });

        if (props.content.trim() === "") {
          mutateSection(props.id, (section) => {
            delete section.attributes.notes;
          });
        }
      }}
      onChange={(e) => {
        mutateSection(props.id, (section) => {
          section.attributes.notes = e.currentTarget.value;
        });
      }}
    />
  );
}
