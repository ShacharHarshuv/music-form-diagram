import { createAction } from "@/app/actions/action";
import { openFile } from "@/app/file-management/file-management";
import { OpenIcon } from "@/app/icons/open-icon";
import { mutateStore } from "@/app/store/mutate-store";
import React from "react";
import { clearURL } from "./share";

export const open = createAction({
  description: "Open",
  hotkey: "ctrl+o", // TODO: later we might want to distinguish between save and "save as"
  icon: React.createElement(OpenIcon),
  perform: async () => {
    const { document, name } = await openFile();
    mutateStore((store) => {
      store.document = document;
      store.title = name;
    });
    clearURL();
  },
});
