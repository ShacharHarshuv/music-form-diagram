import { useStore } from "@/app/store/store";

export function current() {
  return useStore.getState();
}
