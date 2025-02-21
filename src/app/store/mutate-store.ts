import { StoreValue, useStore } from "@/app/store/store";
import { produce } from "immer";

export function mutateStore(updater: (current: StoreValue) => void) {
  useStore.setState(produce(updater));
}
