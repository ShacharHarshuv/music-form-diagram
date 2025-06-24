import { saveFile } from "@/app/file-management/file-management";
import { mutateStore } from "@/app/store/mutate-store";
import { useStore } from "@/app/store/store";
import { createAction } from "./action";

export const save = createAction({
  description: "Save",
  hotkey: "ctrl+s,ctrl+shift+s", // TODO: later we might want to distinguish between save and "save as"
  perform: async () => {
    const { document, title } = useStore.getState();
    const name = await saveFile(document, title);
    mutateStore((store) => {
      store.title = name;
    });
  },
});
