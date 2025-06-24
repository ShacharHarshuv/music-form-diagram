import { createAction } from "@/app/actions/action";
import { defaultDocument } from "@/app/default-document";
import { mutateStore } from "@/app/store/mutate-store";
import { clearURL } from "./share";

export const newFile = createAction({
  description: "Create New Section",
  hotkey: "ctrl+alt+n", // TODO: consider if we can make ctrl+n work
  perform: () => {
    mutateStore((store) => {
      store.document = {
        ...defaultDocument,
      };
      store.selection = {
        end: null,
        section: null,
        start: null,
      };
      store.title = "";
    });
    clearURL();
  },
});
