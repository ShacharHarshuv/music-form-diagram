import { createAction } from "@/app/actions/action";
import { SectionIcon } from "@/app/icons/section-icon";
import { current } from "@/app/store/current";
import { mutateStore } from "@/app/store/mutate-store";
import { selectedRange } from "@/app/store/selected-range";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useIsBarsSelected } from "./_use-is-bars-selected";

export const createSection = createAction({
  description: "Create New Section",
  hotkey: "s",
  icon: React.createElement(SectionIcon),
  useIsAvailable: useIsBarsSelected,
  perform: () => {
    const range = selectedRange();
    if (!range) {
      console.warn("Tried to create section with no selected bars");
      return;
    }

    const [start, end] = range;

    const isValid = current().document.sections.every((section) => {
      const isOK =
        (section.start <= start && end <= section.end) ||
        (start <= section.start && section.end <= end) ||
        section.end < start ||
        end < section.start;

      if (!isOK) {
        console.warn(
          `Tried to create invalid section [${start}, ${end}] but it contradicts with [${section.start}, ${section.end}]`,
        );
      }
      return isOK;
    });

    if (!isValid) {
      console.warn("Tried to create invalid section");
      return;
    }

    mutateStore(({ document }) => {
      document.sections.push({
        id: uuidv4(),
        start,
        end,
        attributes: {},
      });
    });
  },
});
