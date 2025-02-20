import { Bar as BarProps } from "@/app/music-diagram-ast/music-diagram-ast";

export default function Bar(props: BarProps) {
  return (
    <span className="inline-block h-8 border-r border-gray-300 bg-gray-50 px-2">
      <span className="relative text-sm text-gray-300">{props.index}</span>
    </span>
  );
}
