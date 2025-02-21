import { Bar as BarProps } from "@/app/music-diagram-ast/music-diagram-ast";
import { useStore } from "@/app/store/store";
import clsx from "clsx";
import { selectedRange } from "@/app/store/selected-range";
import { mutateStore } from "@/app/store/mutate-store";

export default function Bar(props: BarProps) {
  const isSelected = useStore(() => {
    const range = selectedRange();
    if (!range) {
      return false;
    }
    const [min, max] = range;
    return props.index >= min && props.index <= max;
  });

  return (
    <span
      className={clsx(
        "inline-block h-8 cursor-pointer select-none border-r border-gray-300 px-2",
        isSelected
          ? "bg-gray-200 hover:bg-gray-300"
          : "bg-gray-50 hover:bg-gray-100",
      )}
      onMouseDown={(event) => {
        event.shiftKey ? setEnd(props.index) : setStart(props.index);
      }}
    >
      <span
        className={clsx(
          "relative text-sm text-gray-300",
          isSelected && "text-gray-400",
        )}
      >
        {props.index}
      </span>
    </span>
  );
}

function setStart(start: number) {
  mutateStore(({ selection }) => {
    selection.section = null;
    selection.start = start;
    selection.end = start;
  });
}

function setEnd(end: number) {
  mutateStore(({ selection }) => {
    selection.section = null;
    selection.end = end;

    if (selection.start === null) {
      selection.start = end;
    }
  });
}
