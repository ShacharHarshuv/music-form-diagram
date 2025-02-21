import { createAction } from "@/app/actions/action";
import { selectedRange } from "@/app/store/selected-range";
import { mutateStore } from "@/app/store/mutate-store";

export const deleteSelected = createAction({
  hotkey: "delete",
  description: "Delete selected",
  perform: () => {
    const range = selectedRange();
    if (!range) {
      console.warn("No bars to delete");
      return;
    }

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
  },
});
