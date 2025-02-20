import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

export const useStore = create(
  devtools(
    combine(
      {
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
      }),
    ),
  ),
);
