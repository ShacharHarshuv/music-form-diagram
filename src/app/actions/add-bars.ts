import { createAction } from "@/app/actions/action";
import { mutateStore } from "@/app/store/mutate-store";

export const addBars = createAction({
  description: "Add Bars",
  hotkey: "b",
  perform: () => {
    const numberOfBars = Number(prompt("Number of bars:") ?? 0);
    if (isNaN(numberOfBars) || numberOfBars <= 0) {
      alert("Invalid number of bars");
      return;
    }
    mutateStore(({ document }) => {
      document.length += numberOfBars;
    });
  },
});
