import hotkeys from "hotkeys-js";

export function createAction({
  description,
  hotkey,
  perform,
}: {
  description: string;
  hotkey?: string;
  perform: () => void;
}) {
  const callbacks: (() => void)[] = [];
  const action = Object.assign(
    (event?: KeyboardEvent) => {
      if (event) event.preventDefault();
      perform();
      callbacks.forEach((cb) => cb());
    },
    {
      description,
      hotkey,
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
