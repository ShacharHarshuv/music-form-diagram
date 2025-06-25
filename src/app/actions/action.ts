import hotkeys from "hotkeys-js";
import { ReactNode } from "react";

export function createAction({
  hotkey,
  perform,
  ...rest
}: {
  description: string;
  hotkey?: string;
  perform: () => void;
  icon?: ReactNode;
  useIsAvailable?: () => boolean;
}) {
  const callbacks: (() => void)[] = [];
  const action = Object.assign(
    (event?: KeyboardEvent) => {
      if (event) event.preventDefault();
      perform();
      callbacks.forEach((cb) => cb());
    },
    {
      hotkey,
      ...rest,
      register: () => {
        if (hotkey) {
          hotkeys(hotkey, action);
        }
      },
      // in practice actions never changes, but this is necessary for debugging
      unregister: () => {
        if (hotkey) {
          hotkeys.unbind(hotkey, action);
        }
      },
      onCall: (callback: () => void) => {
        callbacks.push(callback);
        return () => {
          const idx = callbacks.indexOf(callback);
          if (idx !== -1) callbacks.splice(idx, 1);
        };
      },
    },
  );

  return action;
}

export type Action = ReturnType<typeof createAction>;
