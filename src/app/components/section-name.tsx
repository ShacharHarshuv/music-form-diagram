export function SectionName({
  name,
  onRename,
}: {
  name: string | undefined;
  onRename: (name: string) => void;
}) {
  return (
    <input
      type="text"
      className="mr-2 field-sizing-content focus:ring-0 focus:outline-hidden"
      value={name ?? ""}
      onInput={(e) => onRename(e.currentTarget.value)}
    />
  );
}
