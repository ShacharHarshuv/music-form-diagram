import { createAction } from "@/app/actions/action";
import { mutateStore } from "@/app/store/mutate-store";

function expandSelection(diff: number) {
  return () => {
    mutateStore(({ selection, document }) => {
      // If no selection exists, create one at the current position
      if (selection.start === null) {
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

        selection.start = currentSelection.start;
        selection.end = currentSelection.start + diff;
        selection.section = null;
        return;
      }

      // If selection exists, expand the end
      if (selection.end === null) {
        selection.end = selection.start + diff;
      } else {
        selection.end += diff;
      }
    });
  };
}

export const expandSelectionActions = [
  createAction({
    description: "Expand Selection Forward",
    hotkey: "shift+right",
    perform: expandSelection(+1),
  }),
  createAction({
    description: "Expand Selection Back",
    hotkey: "shift+left",
    perform: expandSelection(-1),
  }),
];
