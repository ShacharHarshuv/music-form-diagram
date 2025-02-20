import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

export const useStore = create(
  devtools(
    combine(
      {
        selectedBar: null as number | null,
      },
      (set) => ({
        setSelectedBar: (bar: number) => set({ selectedBar: bar }),
      }),
    ),
  ),
);
