import { createAction } from "@/app/actions/action";
import { mutateStore } from "@/app/store/mutate-store";
import { sortBy, first } from "lodash";
import { selectedRange } from "@/app/store/selected-range";

function moveBars(direction: -1 | 1) {
  return () => {
    const leavingSide = direction === -1 ? "start" : "end";
    const enteringSide = direction === -1 ? "end" : "start";
    console.log(
      "direction",
      direction,
      "leavingSide",
      leavingSide,
      "enteringSide",
      enteringSide,
    );

    mutateStore(({ selection, document }) => {
      const range = selectedRange(selection);

      if (!range) {
        return;
      }

      const currentSelection = {
        start: range[0],
        end: range[1],
      };

      const rangeLength = currentSelection.end - currentSelection.start + 1;

      const leavingSections = sortBy(
        document.sections.filter((section) => {
          return section[leavingSide] === currentSelection[leavingSide];
        }),
        (section) => section.end - section.start,
      );

      const firstLeavingSection = first(leavingSections);

      if (firstLeavingSection) {
        console.log("leaving section");
        if (
          firstLeavingSection[enteringSide] === currentSelection[enteringSide]
        ) {
          document.sections = document.sections.filter((section) => {
            return section.id !== firstLeavingSection.id;
          });
          return;
        }

        firstLeavingSection[leavingSide] += rangeLength * direction * -1;
        return;
      }

      const enteringSections = sortBy(
        document.sections.filter((section) => {
          return (
            section[enteringSide] === currentSelection[leavingSide] + direction
          );
        }),
        (section) => section.start - section.end,
      );

      const firstEnteringSection = first(enteringSections);
      if (firstEnteringSection) {
        firstEnteringSection[enteringSide] += rangeLength * direction * -1;
        return;
      }
    });
  };
}

export const moveBarsActions = [
  createAction({
    description: "Move Bars Back",
    hotkey: "alt+left",
    perform: moveBars(-1),
  }),
  createAction({
    description: "Move Bars Forward",
    hotkey: "alt+right",
    perform: moveBars(+1),
  }),
];
