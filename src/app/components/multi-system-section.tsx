import { MultiSystemSection as MultiSystemSectionProps } from "@/app/music-diagram-ast/music-diagram-ast";
import SystemSegments from "@/app/components/system-segments";
import clsx from "clsx";
import { ColorPicker } from "@/app/components/color-picker";
import { useSection } from "@/app/components/use-section";
import { SectionName } from "@/app/components/section-name";

export default function MultiSystemSection(props: MultiSystemSectionProps) {
  const horizontalPaddingValue = `${props.paddingLevel * 8}px`;

  const { isSelected, color, rename, colorName, changeColor, selectSection } =
    useSection(props);

  return (
    <div className="col-span-full grid grid-cols-subgrid">
      <h2
        className={clsx(
          "group col-span-full text-lg",
          isSelected ? "font-extrabold" : "font-bold",
        )}
        style={{
          color,
        }}
      >
        <SectionName name={props.attributes.name} onRename={rename} />
        <ColorPicker
          className="opacity-0 group-hover:opacity-100"
          value={colorName}
          onChange={changeColor}
        />
      </h2>
      <div
        className={clsx(
          "relative col-span-full grid grid-cols-subgrid gap-y-3 rounded-xl border-2 px-2 py-3",
          isSelected ? "border-4" : "border-2",
        )}
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
        ].map((positionClasses, index) => {
          return (
            <div
              key={index}
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
