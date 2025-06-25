"use client";

import { Action } from "../actions/action";
import { actionTitle } from "../actions/action-title";

export function ToolButton({ action }: { action: Action }) {
  const isAvailable = action.useIsAvailable ? action.useIsAvailable() : true;

  return (
    isAvailable && (
      <button
        onClick={() => action()}
        className="p-2 rounded hover:bg-gray-200 transition-colors"
        title={actionTitle(action)}
      >
        {action.icon}
      </button>
    )
  );
}
