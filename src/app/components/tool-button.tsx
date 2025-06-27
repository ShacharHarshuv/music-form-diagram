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
  return (
    <button
      className="p-2 rounded hover:bg-gray-200 transition-colors"
      ref={ref}
      onClick={() => action()}
      title={actionTitle(action)}
    >
      {action.icon}
    </button>
  );
}
