import { useStore } from "../store/store";

export function useIsBarsSelected() {
  const selection = useStore(({ selection }) => selection);
  return !!selection.start;
}
