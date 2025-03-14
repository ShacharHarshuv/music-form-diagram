import { current } from "@/app/store/current";

export function selectedRange(selection = current().selection) {
  if (selection.start === null || selection.end === null) {
    return null;
  }
  const [start, end] =
    selection.start <= selection.end
      ? [selection.start, selection.end]
      : [selection.end, selection.start];

  return [start, end] as const;
}
