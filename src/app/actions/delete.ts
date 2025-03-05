import { createAction } from "@/app/actions/action";
import { selectedRange } from "@/app/store/selected-range";
import { mutateStore } from "@/app/store/mutate-store";
import { current } from "@/app/store/current";

export const deleteSelected = createAction({
  hotkey: "delete",
  description: "Delete selected",
  perform: () => {
    const range = selectedRange();

    if (range) {
      const [start, end] = range;
      const rangeLength = end - start + 1;

      mutateStore(({ document, selection }) => {
        document.length -= rangeLength;

        document.sections.forEach((section) => {
          if (section.start > end) {
            section.start -= rangeLength;
          }

          if (section.end >= end) {
            section.end -= rangeLength;
          }
        });

        document.sections = document.sections.filter((section) => {
          return section.end >= section.start;
        });

        selection.start = null;
        selection.end = null;
      });
    }

    if (current().selection.section) {
      mutateStore(({ document, selection }) => {
        document.sections = current().document.sections.filter((section) => {
          return section.id !== current().selection.section;
        });

        selection.section = null;
      });
    }
  },
});
