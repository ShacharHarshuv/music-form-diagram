import { SystemSegment as SystemSegmentProps } from "@/app/music-diagram-ast/music-diagram-ast";
import { System } from "@/app/components/system";
import MultiSystemSection from "@/app/components/multi-system-section";

export default function SystemSegments({
  segments,
}: {
  segments: SystemSegmentProps[];
}) {
  return (
    <>
      {segments.map((segment) => {
        switch (segment.type) {
          case "System":
            return <System {...segment} />;
          case "MultiSystemSection":
            return <MultiSystemSection {...segment} />;
        }
      })}
    </>
  );
}
