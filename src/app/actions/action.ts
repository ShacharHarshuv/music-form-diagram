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
  const action = Object.assign(
    (event?: KeyboardEvent) => {
      if (event) {
        event.preventDefault();
      }
      perform();
    },
    {
      description,
      register: () => {
        if (hotkey) {
          hotkeys(hotkey, action);
        }
      },
    },
  );

  return action;
}
