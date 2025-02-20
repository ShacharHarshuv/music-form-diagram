import { Bar as BarProps } from "@/app/music-diagram-ast/music-diagram-ast";
import { useStore } from "@/app/store";
import { useMemo } from "react";

export default function Bar(props: BarProps) {
  const isSelected = useStore(({ selectedBar }) => selectedBar === props.index);
  const setIsSelected = useSetIsSelection(props.index);

  return (
    <span
      className="inline-block h-8 border-r border-gray-300 bg-gray-50 px-2 hover:bg-gray-100"
      onClick={setIsSelected}
    >
      <span className="relative text-sm text-gray-300">{props.index}</span>
      {isSelected && "!"}
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
