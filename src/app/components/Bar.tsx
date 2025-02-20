import { Bar as BarProps } from "@/app/music-diagram-ast/music-diagram-ast";
import { useStore } from "@/app/store";
import { useMemo } from "react";
import clsx from "clsx";

export default function Bar(props: BarProps) {
  const isSelected = useStore(({ selectedBar }) => selectedBar === props.index);
  const setIsSelected = useSetIsSelection(props.index);

  return (
    <span
      className={clsx(
        "inline-block h-8 cursor-pointer border-r border-gray-300 bg-gray-50 px-2 hover:bg-gray-100",
        isSelected && "bg-gray-200",
      )}
      onClick={setIsSelected}
    >
      <span className="relative text-sm text-gray-300">{props.index}</span>
    </span>
  );
}

function useSetIsSelection(index: number) {
  const setSelectedBar = useStore(({ setSelectedBar }) => setSelectedBar);
  return useMemo(
    () => () => {
      setSelectedBar(index);
    },
    [setSelectedBar, index],
  );
}
