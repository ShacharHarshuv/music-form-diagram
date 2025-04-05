import { createAction } from "../actions/action";
import { current } from "../store/current";
import { mutateSection } from "../components/mutate-section";

export const addNotes = createAction({
  description: "Add Note",
  hotkey: "n",
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
