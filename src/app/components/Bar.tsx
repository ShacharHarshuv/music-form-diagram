import { Bar as BarProps } from "@/app/music-diagram-ast/music-diagram-ast";
import { mutateStore } from "@/app/store/mutate-store";
import { selectedRange } from "@/app/store/selected-range";
import { useStore } from "@/app/store/store";
import clsx from "clsx";
import { useState } from "react";

export default function Bar(props: BarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(props.content || "");

  const isSelected = useStore(() => {
    const range = selectedRange();
    if (!range) {
      return false;
    }
    const [min, max] = range;
    return props.index >= min && props.index <= max;
  });

  return (
    <span
      className={clsx(
        "inline-block h-8 cursor-pointer border-r border-gray-300 px-2 select-none relative",
        isSelected
          ? "bg-gray-200 hover:bg-gray-300"
          : "bg-gray-50 hover:bg-gray-100",
      )}
      onMouseDown={(event) => {
        if (event.shiftKey) {
          setEnd(props.index);
        } else {
          setStart(props.index);
        }
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
        setEditValue(props.content || "");
      }}
    >
      <span className="absolute top-0 left-0 w-0 h-0 text-[10px] text-gray-300 px-1">
        {props.index + 1}
      </span>
      {/* Dummy input to handle TAB navigation */}
      {!isEditing && (
        <input
          type="text"
          className="opacity-0 pointer-events-none absolute"
          onFocus={() => {
            setIsEditing(true);
          }}
        />
      )}
      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={() => {
            setIsEditing(false);
            if (editValue !== props.content) {
              mutateStore(({ document }) => {
                if (!document.bars) {
                  document.bars = {};
                }
                if (editValue.trim()) {
                  document.bars[props.index] = editValue.trim();
                } else {
                  delete document.bars[props.index];
                }
              });
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setIsEditing(false);
              if (editValue !== props.content) {
                mutateStore(({ document }) => {
                  if (!document.bars) {
                    document.bars = {};
                  }
                  if (editValue.trim()) {
                    document.bars[props.index] = editValue.trim();
                  } else {
                    delete document.bars[props.index];
                  }
                });
              }
            } else if (e.key === "Escape") {
              e.preventDefault();
              setEditValue(props.content || "");
              setIsEditing(false);
            }
          }}
          className="w-full h-full text-xs bg-white border border-blue-500 focus:outline-none font-serif"
          autoFocus
        />
      ) : (
        <span className="w-full h-full flex items-center justify-between text-xs text-gray-600 font-serif">
          {props.content &&
            props.content.split(" ").map((part, index) => (
              <span key={index} className="flex-1 text-left">
                {part}
              </span>
            ))}
        </span>
      )}
    </span>
  );
}

function setStart(start: number) {
  mutateStore(({ selection }) => {
    selection.section = null;
    selection.start = start;
    selection.end = start;
  });
}

function setEnd(end: number) {
  mutateStore(({ selection }) => {
    selection.section = null;
    selection.end = end;

    if (selection.start === null) {
      selection.start = end;
    }
  });
}
