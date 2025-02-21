import { createAction } from "@/app/actions/action";
import { undoStore } from "@/app/store/mutate-store";

export const undo = createAction({
  description: "Undo",
  hotkey: "ctrl+z",
  perform: undoStore,
});
