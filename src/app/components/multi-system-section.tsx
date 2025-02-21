import { MultiSystemSection as MultiSystemSectionProps } from "@/app/music-diagram-ast/music-diagram-ast";
import SystemSegments from "@/app/components/system-segments";
import { colorMap } from "@/app/colors";
import clsx from "clsx";
export default function MultiSystemSection(props: MultiSystemSectionProps) {
  const horizontalPaddingValue = `${props.paddingLevel * 8}px`;
  const color = colorMap[props.attributes.color ?? "gray"];

  function selectSection() {
    console.log("select section" + props.attributes.name);
  }

  return (
    <div className="col-span-full grid grid-cols-subgrid">
      <h2
        className="col-span-full text-lg font-bold"
        style={{
          color,
        }}
      >
        <span className="cursor-pointer" onClick={selectSection}>
          {props.attributes.name}
        </span>
      </h2>
      <div
        className="relative col-span-full grid grid-cols-subgrid gap-y-3 rounded-xl border-2 px-2 py-3"
        style={{
          paddingLeft: horizontalPaddingValue,
          paddingRight: horizontalPaddingValue,
          marginRight: `-${horizontalPaddingValue}`,
          marginLeft: `-${horizontalPaddingValue}`,
          borderColor: color,
        }}
      >
        {[
          "inset-x-0 h-4 -top-2",
          "inset-x-0 h-4 -bottom-2",
          "inset-y-0 w-4 -left-2",
          "inset-y-0 w-4 -right-2",
        ].map((positionClasses) => {
          return (
            <div
              className={clsx("absolute cursor-pointer", positionClasses)}
              onClick={selectSection}
            />
          );
        })}
        <SystemSegments segments={props.segments} />
      </div>
    </div>
  );
}
