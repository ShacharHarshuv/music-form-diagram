import { System as SystemProps } from "@/app/music-diagram-ast/music-diagram-ast";
import Bar from "@/app/components/Bar";
import { InlineSection } from "@/app/components/inline-section";

export function System(props: SystemProps) {
  return (
    <>
      <div className="col-span-full grid grid-cols-subgrid">
        <div className="col-span-full mb-4 grid grid-cols-subgrid">
          {props.sections.map((section) => (
            <InlineSection {...section} key={section.id} />
          ))}
        </div>
        <div className="col-span-full grid grid-cols-subgrid">
          {props.bars.map((bar, index) => {
            return <Bar {...bar} key={index} />;
          })}
        </div>
      </div>
    </>
  );
}
