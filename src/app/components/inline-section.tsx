import { SectionName } from "@/app/components/section-name";
import { useSection } from "@/app/components/use-section";
import { InlineSection as InlineSectionProps } from "@/app/music-diagram-ast/music-diagram-ast";
import clsx from "clsx";
import { motion } from "motion/react";
import { useRef } from "react";

export function InlineSection(props: InlineSectionProps) {
  const { isSelected, color, rename, selectSection } = useSection(props);
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        visualDuration: 0.1,
        bounce: 0.2,
      }}
      className="w-full"
      style={{
        gridColumnStart: props.start + 1,
        gridColumnEnd: props.end + 1,
      }}
    >
      <div
        className={clsx("text-center cursor-text", isSelected && "font-bold")}
        style={{
          color,
        }}
        onClick={() => inputRef.current?.focus()}
      >
        <SectionName
          inputRef={inputRef}
          name={props.attributes.name}
          onRename={rename}
        />
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
    </motion.div>
  );
}
