import { MultiSystemSection as MultiSystemSectionProps } from "@/app/music-diagram-ast/music-diagram-ast";
import SystemSegments from "@/app/components/system-segments";
import { colorMap } from "@/app/colors";
import clsx from "clsx";
import { mutateStore } from "@/app/store/mutate-store";
import { useStore } from "@/app/store/store";
import { ColorPicker } from "@/app/components/color-picker";
import { Section } from "@/app/music-diagram-document/music-diagram-document";

export default function MultiSystemSection(props: MultiSystemSectionProps) {
  const horizontalPaddingValue = `${props.paddingLevel * 8}px`;
  const colorName = props.attributes.color ?? "gray";
  const color = colorMap[colorName];
  const isSelected = useStore(({ selection }) => {
    return selection.section === props.attributes;
  });

  function mutateSection(callback: (section: Section) => void) {
    mutateStore(({ document }) => {
      const section = document.sections[props.index];
      if (!section) {
        throw new Error("Could not find edited section");
      }
      callback(section);
    });
  }

  function selectSection() {
    mutateStore(({ selection }) => {
      selection.section = props.attributes;
      selection.start = null;
      selection.end = null;
    });
  }

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
        <input
          type="text"
          className="focus:outline-none focus:ring-0"
          value={props.attributes.name ?? ""}
          onInput={(e) => {
            mutateSection(({ attributes }) => {
              attributes.name = e.currentTarget.value;
            });
          }}
        />
        <ColorPicker
          className="opacity-0 group-hover:opacity-100"
          value={colorName}
          onChange={(newColor) =>
            mutateSection(({ attributes }) => {
              attributes.color = newColor;
            })
          }
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
