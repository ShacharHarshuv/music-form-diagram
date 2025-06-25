import React from "react";
import { createAction } from "@/app/actions/action";
import { undoStore } from "@/app/store/mutate-store";
import { UndoIcon } from "../icons/undo-icon";

export const undo = createAction({
  description: "Undo",
  hotkey: "ctrl+z",
  perform: undoStore,
  icon: <UndoIcon />,
});
