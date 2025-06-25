import React from "react";

export function SectionName({
  inputRef,
  name,
  onRename,
}: {
  inputRef?: React.RefObject<HTMLInputElement | null>;
  name: string | undefined;
  onRename: (name: string) => void;
}) {
  return (
    <input
      ref={inputRef}
      type="text"
      className="field-sizing-content max-w-full min-w-4 focus:ring-0 focus:outline-hidden"
      value={name ?? ""}
      onInput={(e) => onRename(e.currentTarget.value)}
    />
  );
}
