import { MultiSystemSection as MultiSystemSectionProps } from "@/app/music-diagram-ast/music-diagram-ast";
import SystemSegments from "@/app/components/system-segments";

export default function MultiSystemSection(props: MultiSystemSectionProps) {
  return (
    <div className="mb-2 border-2 p-3">
      <h2 className="text-lg font-bold">Section {props.attributes.name}</h2>
      <SystemSegments segments={props.segments} />
    </div>
  );
}
