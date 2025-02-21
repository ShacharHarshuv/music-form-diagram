import { createAction } from "@/app/actions/action";

export const createSection = createAction({
  description: "Create New Section",
  hotkey: "s",
  perform: (current, update) => {
    const { selectedBarsStart, selectedBarsEnd } = current;
    if (selectedBarsStart === null || selectedBarsEnd === null) {
      console.warn("Tried to create section with no selected bars");
      return;
    }

    const [start, end] =
      selectedBarsStart <= selectedBarsEnd
        ? [selectedBarsStart, selectedBarsEnd]
        : [selectedBarsEnd, selectedBarsStart];

    const isValid = current.document.sections.every((section) => {
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

    update(({ document }) => {
      document.sections.push({
        start,
        end,
        attributes: {},
      });
    });
  },
});
