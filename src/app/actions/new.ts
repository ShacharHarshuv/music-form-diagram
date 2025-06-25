import { createAction } from "@/app/actions/action";
import { defaultDocument } from "@/app/default-document";
import { NewIcon } from "@/app/icons/new-icon";
import { mutateStore } from "@/app/store/mutate-store";
import React from "react";
import { clearURL } from "./share";

export const newFile = createAction({
  description: "New File",
  hotkey: "ctrl+alt+n", // TODO: consider if we can make ctrl+n work
  icon: React.createElement(NewIcon),
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
