import React from "react";
import { createAction } from "@/app/actions/action";
import { redoStore } from "@/app/store/mutate-store";
import { RedoIcon } from "../icons/redo-icon";

export const redo = createAction({
  description: "Redo",
  hotkey: "ctrl+y,ctrl+shift+z",
  perform: redoStore,
  icon: <RedoIcon />,
});
