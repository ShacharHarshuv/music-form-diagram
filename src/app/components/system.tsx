import { System as SystemProps } from "@/app/music-diagram-ast/music-diagram-ast";
import Bar from "@/app/components/Bar";

export function System(props: SystemProps) {
  return (
    <div className="mb-2 border border-gray-900">
      {props.bars.map((bars) => {
        return <Bar {...bars} />;
      })}
    </div>
  );
}
