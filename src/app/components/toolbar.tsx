"use client";

import { addBars } from "@/app/actions/add-bars";
import { createSection } from "@/app/actions/create-section";
import { deleteSelected } from "@/app/actions/delete";
import { moveBarsActions } from "@/app/actions/move-bars";
import { newFile } from "@/app/actions/new";
import { open } from "@/app/actions/open";
import { redo } from "@/app/actions/redo";
import { save } from "@/app/actions/save";
import { undo } from "@/app/actions/undo";
import { addNotes } from "@/app/notes/add-note";
import { useEffect, useRef } from "react";
import { current } from "../store/current";
import { ToolButton } from "./tool-button";

export function Toolbar() {
  const addButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!current().document.length) {
      addButton.current?.focus();
    }
  }, []);

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto max-sm:px-6">
        <div className="flex items-center gap-1 py-1">
          {/* File operations */}
          {/* TODO: update icon to be sheet with star */}
          <ToolButton action={newFile} />{" "}
          {/* TODO: update to be an open folder icon */}
          <ToolButton action={open} />{" "}
          {/* TODO: update save to be floppy disk */}
          <ToolButton action={save} />{" "}
          <div className="w-px h-6 bg-gray-300 mx-2" />
          {/* History */}
          <ToolButton action={undo} />
          <ToolButton action={redo} />
          <div className="w-px h-6 bg-gray-300 mx-2" />
          {/* Content operations */}
          <ToolButton action={addBars} ref={addButton} />
          <ToolButton action={deleteSelected} />
          {/* TODO: we can create a better icon probably */}
          <ToolButton action={createSection} />
          {moveBarsActions.map((action) => (
            <ToolButton key={action.description} action={action} />
          ))}
          <ToolButton action={addNotes} />
        </div>
      </div>
    </div>
  );
}
