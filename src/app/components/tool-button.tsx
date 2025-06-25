"use client";

import { Action } from "../actions/action";
import { actionTitle } from "../actions/action-title";

export function ToolButton({
  action,
  ref,
}: {
  action: Action;
  ref?: React.RefObject<HTMLButtonElement | null>;
}) {
  const isAvailable = action.useIsAvailable ? action.useIsAvailable() : true;

  return (
    isAvailable && (
      <button
        ref={ref}
        onClick={() => action()}
        className="p-2 rounded hover:bg-gray-200 transition-colors"
        title={actionTitle(action)}
      >
        {action.icon}
      </button>
    )
  );
}
