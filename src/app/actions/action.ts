import { StoreValue, useStore } from "@/app/store";
import { produce } from "immer";
import hotkeys from "hotkeys-js";

export function createAction({
  description,
  hotkey,
  perform,
}: {
  description: string;
  hotkey?: string;
  perform: (
    current: StoreValue,
    update: (updater: (current: StoreValue) => void) => void,
  ) => void;
}) {
  const action = Object.assign(
    () => {
      const current = useStore.getState();
      perform(current, (updater) => {
        useStore.setState(produce(updater));
      });
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
