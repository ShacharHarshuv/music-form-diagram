"use client";

import { Action } from "../actions/action";
import { actionTitle } from "../actions/action-title";

export function ToolButton({ action }: { action: Action }) {
  console.log("icon", action.description, action.icon);

  return (
    <button
      onClick={() => action()}
      className="p-2 rounded hover:bg-gray-200 transition-colors"
      title={actionTitle(action)}
    >
      {action.icon}
    </button>
  );
}
