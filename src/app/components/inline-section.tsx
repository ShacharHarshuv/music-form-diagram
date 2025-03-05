import { InlineSection as InlineSectionProps } from "@/app/music-diagram-ast/music-diagram-ast";

export function InlineSection(props: InlineSectionProps) {
  return (
    <div
      className="w-full"
      style={{
        gridColumnStart: props.start + 1,
        gridColumnEnd: props.end + 1,
      }}
    >
      <div className="text-center">{props.attributes.name ?? "untitled"}</div>
      <div className="-mb-3 h-4 rounded-t border-2 border-b-0 border-gray-500"></div>
    </div>
  );
}
