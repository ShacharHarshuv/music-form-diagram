import { Bar as BarProps } from "@/app/music-diagram-ast/music-diagram-ast";
import { useStore } from "@/app/store";
import { useMemo } from "react";
import clsx from "clsx";

export default function Bar(props: BarProps) {
  const isSelected = useStore(({ selectedBarsStart, selectedBarsEnd }) => {
    if (selectedBarsStart === null || selectedBarsEnd === null) {
      return false;
    }
    const [min, max] = [selectedBarsStart, selectedBarsEnd].sort();
    return props.index >= min && props.index <= max;
  });
  const selectBarStart = useSelectBar(props.index, "setSelectedBarsStart");
  const selectBarEnd = useSelectBar(props.index, "setSelectedBarsEnd");

  return (
    <span
      className={clsx(
        "inline-block h-8 cursor-pointer select-none border-r border-gray-300 bg-gray-50 px-2 hover:bg-gray-100",
        isSelected && "bg-gray-200 hover:bg-gray-300",
      )}
      onMouseDown={(event) => {
        event.shiftKey ? selectBarEnd() : selectBarStart();
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

function useSelectBar(
  index: number,
  updateFnKey: "setSelectedBarsStart" | "setSelectedBarsEnd",
) {
  const setSelectedBar = useStore((state) => state[updateFnKey]);
  return useMemo(
    () => () => {
      setSelectedBar(index);
    },
    [setSelectedBar, index],
  );
}
