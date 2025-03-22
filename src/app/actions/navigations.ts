import { createAction } from "@/app/actions/action";
import { mutateStore } from "@/app/store/mutate-store";

function navigate(diff: number, reference: "start" | "end") {
  return () => {
    mutateStore(({ selection, document }) => {
      if (selection[reference] !== null) {
        const newIndex = selection[reference] + diff;
        selection.start = newIndex;
        selection.end = newIndex;
        return;
      }

      const selectedSectionId = selection.section;

      if (!selectedSectionId) {
        return;
      }

      const currentSelection = document.sections.find((section) => {
        return section.id === selectedSectionId;
      });

      if (!currentSelection) {
        console.error("Could not find selected section");
        return;
      }

      const newIndex = currentSelection[reference] + diff;
      selection.start = newIndex;
      selection.end = newIndex;
      selection.section = null;
    });
  };
}

export const navigationActions = [
  createAction({
    description: "Move Selection Forward",
    hotkey: "right",
    perform: navigate(+1, "end"),
  }),
  createAction({
    description: "Move Selection Back",
    hotkey: "left",
    perform: navigate(-1, "start"),
  }),
];
