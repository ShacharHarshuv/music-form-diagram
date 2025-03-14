import { createSection } from "@/app/actions/create-section";
import { deleteSelected } from "@/app/actions/delete";
import { addBars } from "@/app/actions/add-bars";
import { undo } from "@/app/actions/undo";
import { redo } from "@/app/actions/redo";
import { save } from "@/app/actions/save";
import { open } from "@/app/actions/open";
import { newFile } from "@/app/actions/new";
import { navigationActions } from "@/app/actions/navigations";
import { moveBarsActions } from "@/app/actions/move-bars";

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
];
