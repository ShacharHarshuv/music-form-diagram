import { useStore } from "@/app/store/store";
import { createAction } from "./action";
import { saveFile } from "@/app/file-management/file-management";
import { mutateStore } from "@/app/store/mutate-store";

export const save = createAction({
  description: "Save",
  hotkey: "ctrl+s,ctrl+shift+s", // TODO: later we might want to distinguish between save and "save as"
  perform: async () => {
    const currentDocument = useStore.getState().document;
    const fileName = `${currentDocument.title}.musf`;
    const name = await saveFile(fileName, currentDocument);
    mutateStore(({ document }) => {
      document.title = name;
    });
  },
});
