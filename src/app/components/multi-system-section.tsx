import { MultiSystemSection as MultiSystemSectionProps } from "@/app/music-diagram-ast/music-diagram-ast";
import SystemSegments from "@/app/components/system-segments";
import { colorMap } from "@/app/colors";
export default function MultiSystemSection(props: MultiSystemSectionProps) {
  const horizontalPaddingValue = `${props.paddingLevel * 8}px`;
  const color = colorMap[props.attributes.color ?? "gray"];

  return (
    <div className="col-span-full grid grid-cols-subgrid">
      <h2
        className="col-span-full text-lg font-bold"
        style={{
          color,
        }}
      >
        {props.attributes.name}
      </h2>
      <div
        className="col-span-full grid grid-cols-subgrid gap-y-3 rounded-xl border-2 px-2 py-3"
        style={{
          paddingLeft: horizontalPaddingValue,
          paddingRight: horizontalPaddingValue,
          marginRight: `-${horizontalPaddingValue}`,
          marginLeft: `-${horizontalPaddingValue}`,
          borderColor: color,
        }}
      >
        <SystemSegments segments={props.segments} />
      </div>
    </div>
  );
}
