import { StoreValue, useStore } from "@/app/store";
import { produce } from "immer";

export function createAction(
  description: string,
  callback: (
    current: StoreValue,
    update: (updater: (current: StoreValue) => void) => void,
  ) => void,
) {
  return Object.assign(
    () => {
      const current = useStore.getState();
      callback(current, (updater) => {
        useStore.setState(produce(updater));
      });
    },
    { description },
  );
}
