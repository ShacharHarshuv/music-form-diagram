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
      className="field-sizing-content max-w-full min-w-4 focus:ring-0 focus:outline-hidden"
      value={name ?? ""}
      onInput={(e) => onRename(e.currentTarget.value)}
    />
  );
}
