"use client";

import { addBars } from "@/app/actions/add-bars";
import { deleteSelected } from "@/app/actions/delete";
import { redo } from "@/app/actions/redo";
import { undo } from "@/app/actions/undo";
import { ToolButton } from "./tool-button";

export function Toolbar() {
  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto max-sm:px-6">
        <div className="flex items-center gap-1 py-1">
          <div className="flex items-center gap-1">
            <ToolButton action={undo} />
            <ToolButton action={redo} />
          </div>

          <div className="w-px h-6 bg-gray-300 mx-2" />

          <div className="flex items-center gap-1">
            <ToolButton action={addBars} />
            <ToolButton action={deleteSelected} />
          </div>
        </div>
      </div>
    </div>
  );
}
