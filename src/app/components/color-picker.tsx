import { Color, colorMap } from "@/app/colors";
import clsx from "clsx";

const colors = Object.keys(colorMap) as Color[];

function ColorChoice(props: {
  color: Color;
  isSelected: boolean;
  onSelect?: () => void;
}) {
  return (
    <span
      className={clsx(
        "inline-block h-3 w-3 cursor-pointer rounded-full",
        props.isSelected && "ring-2 ring-black",
      )}
      onClick={props.onSelect}
      style={{
        backgroundColor: colorMap[props.color],
      }}
    ></span>
  );
}

export function ColorPicker(props: {
  className?: string;
  value: Color;
  onChange: (color: Color) => void;
}) {
  return (
    <span className={clsx("inline-flex gap-1", props.className)}>
      {colors.map((color) => (
        <ColorChoice
          isSelected={props.value === color}
          color={color}
          key={color}
          onSelect={() => props.onChange(color)}
        />
      ))}
    </span>
  );
}
