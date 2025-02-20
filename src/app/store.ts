import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";
import { defaultDocument } from "@/app/default-document";
import { produce } from "immer";

export const useStore = create(
  devtools(
    combine(
      {
        document: defaultDocument,
        // todo: nest these somehow?
        selectedBarsStart: null as number | null,
        selectedBarsEnd: null as number | null,
      },
      (set, get) => ({
        setSelectedBarsStart: (bar: number) => {
          set({ selectedBarsStart: bar, selectedBarsEnd: bar });
        },
        setSelectedBarsEnd: (bar: number) => {
          set({ selectedBarsEnd: bar });
          if (get().selectedBarsStart === null) {
            set({ selectedBarsStart: bar });
          }
        },
        createSection() {
          const { selectedBarsStart, selectedBarsEnd } = get();
          if (selectedBarsStart === null || selectedBarsEnd === null) {
            console.warn("Tried to create section with no selected bars");
            return;
          }

          const [start, end] =
            selectedBarsStart <= selectedBarsEnd
              ? [selectedBarsStart, selectedBarsEnd]
              : [selectedBarsEnd, selectedBarsStart];

          const isValid = get().document.sections.every((section) => {
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

          set(
            produce((state) => {
              state.document.sections.push({
                start,
                end,
                attributes: {},
              });
            }),
          );
        },
      }),
    ),
  ),
);
