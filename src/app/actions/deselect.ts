import { createAction } from "@/app/actions/action";
import { mutateStore } from "@/app/store/mutate-store";

export const deselectEverything = createAction({
  description: "Deselect Everything",
  hotkey: "escape",
  perform: () => {
    mutateStore(({ selection }) => {
      selection.start = null;
      selection.end = null;
      selection.section = null;
    });
  },
});
