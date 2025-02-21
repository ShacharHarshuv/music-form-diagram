import { createAction } from "@/app/actions/action";
import { redoStore } from "@/app/store/mutate-store";

export const redo = createAction({
  description: "Redo",
  hotkey: "ctrl+y,ctrl+shift+z",
  perform: redoStore,
});
