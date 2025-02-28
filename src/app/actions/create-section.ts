import { createAction } from "@/app/actions/action";
import { selectedRange } from "@/app/store/selected-range";
import { current } from "@/app/store/current";
import { mutateStore } from "@/app/store/mutate-store";
import { last } from "lodash";

export const createSection = createAction({
  description: "Create New Section",
  hotkey: "s",
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
      const lastId = last(document.sections)?.id ?? 0;

      document.sections.push({
        id: lastId,
        start,
        end,
        attributes: {},
      });
    });
  },
});
