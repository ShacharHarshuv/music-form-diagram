import { createSection } from "@/app/actions/create-section";
import { deleteSelected } from "@/app/actions/delete";
import { addBars } from "@/app/actions/add-bars";
import { undo } from "@/app/actions/undo";
import { redo } from "@/app/actions/redo";
import { save } from "@/app/actions/save";
import { open } from "@/app/actions/open";

export const actions = [
  createSection,
  deleteSelected,
  addBars,
  undo,
  redo,
  save,
  open,
];
