import React from "react";
import { createAction } from "../actions/action";
import { mutateSection } from "../components/mutate-section";
import { NoteIcon } from "../icons/note-icon";
import { current } from "../store/current";
import { useStore } from "../store/store";

export const addNotes = createAction({
  description: "Add Note",
  hotkey: "n",
  icon: React.createElement(NoteIcon),
  useIsAvailable: () => {
    const selection = useStore(({ selection }) => selection);
    return !!selection.section;
  },
  perform: () => {
    const selectedSectionId = current().selection.section;
    if (!selectedSectionId) {
      alert("No section to add a note.");
      return;
    }

    mutateSection(selectedSectionId!, (section) => {
      if (section.attributes.notes) {
        // todo: figure outn how to focus on the notes editor
      } else {
        section.attributes.notes = "";
      }
    });
  },
});
