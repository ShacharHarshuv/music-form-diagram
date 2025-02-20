import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useStore = create(
  combine(
    {
      selectedBar: /*null*/ 1 as number | null,
    },
    (set) => ({
      setSelectedBar: (bar: number) => set({ selectedBar: bar }),
    }),
  ),
);
