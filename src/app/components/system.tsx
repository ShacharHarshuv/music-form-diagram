import { System as SystemProps } from "@/app/music-diagram-ast/music-diagram-ast";
import Bar from "@/app/components/Bar";

export function System(props: SystemProps) {
  return (
    <div className="col-span-full grid grid-cols-subgrid">
      {props.bars.map((bars) => {
        return <Bar {...bars} />;
      })}
    </div>
  );
}
