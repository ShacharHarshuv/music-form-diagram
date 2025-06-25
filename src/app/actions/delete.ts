import { createAction } from "@/app/actions/action";
import { current } from "@/app/store/current";
import { mutateStore } from "@/app/store/mutate-store";
import { selectedRange } from "@/app/store/selected-range";

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

        // Update bars property
        if (document.bars) {
          const newBars: Record<number, string> = {};

          Object.entries(document.bars).forEach(([barIndexStr, content]) => {
            const barIndex = parseInt(barIndexStr);

            // Remove bars that fall within the deleted range
            if (barIndex < start || barIndex > end) {
              // Shift indices for bars after the deleted range
              const newIndex =
                barIndex > end ? barIndex - rangeLength : barIndex;
              newBars[newIndex] = content;
            }
          });

          document.bars = newBars;
        }

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
