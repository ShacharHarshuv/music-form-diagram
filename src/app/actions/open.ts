import { createAction } from "@/app/actions/action";
import { openFile } from "@/app/file-management/file-management";
import { mutateStore } from "@/app/store/mutate-store";
import { useStore } from "@/app/store/store";

export const open = createAction({
  description: "Save",
  hotkey: "ctrl+o", // TODO: later we might want to distinguish between save and "save as"
  perform: async () => {
    const { document, name } = await openFile();
    mutateStore((store) => {
      store.document = document;
      store.title = name;
    });
  },
});
