import { addBars } from "@/app/actions/add-bars";
import { createSection } from "@/app/actions/create-section";
import { deleteSelected } from "@/app/actions/delete";
import { moveBarsActions } from "@/app/actions/move-bars";
import { navigationActions } from "@/app/actions/navigations";
import { newFile } from "@/app/actions/new";
import { open } from "@/app/actions/open";
import { redo } from "@/app/actions/redo";
import { save } from "@/app/actions/save";
import { undo } from "@/app/actions/undo";
import { addNotes } from "../notes/add-note";
import { share } from "./share";

export const useActions = () => [
  createSection,
  deleteSelected,
  addBars,
  undo,
  redo,
  save,
  open,
  newFile,
  ...navigationActions,
  ...moveBarsActions,
  addNotes,
  share,
];
