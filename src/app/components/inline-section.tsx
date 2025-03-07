import { InlineSection as InlineSectionProps } from "@/app/music-diagram-ast/music-diagram-ast";
import { useSection } from "@/app/components/use-section";
import clsx from "clsx";
import { SectionName } from "@/app/components/section-name";

export function InlineSection(props: InlineSectionProps) {
  const { isSelected, color, rename, selectSection } = useSection(props);

  return (
    <div
      className="w-full"
      style={{
        gridColumnStart: props.start + 1,
        gridColumnEnd: props.end + 1,
      }}
    >
      <div
        className={clsx("text-center", isSelected && "font-bold")}
        style={{
          color,
        }}
      >
        <SectionName name={props.attributes.name} onRename={rename} />
      </div>
      <div
        className={clsx(
          "-mb-3 h-4 cursor-pointer rounded-t border-b-0 border-gray-500",
          isSelected ? "border-4" : "border-2",
        )}
        style={{
          borderColor: color,
        }}
        onClick={selectSection}
      ></div>
    </div>
  );
}
