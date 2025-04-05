import { Section } from "../music-diagram-document/music-diagram-document";
import { mutateStore } from "../store/mutate-store";

export function mutateSection(
  id: string,
  callback: (section: Section) => void,
) {
  mutateStore(({ document }) => {
    const section = document.sections.find((section) => section.id === id);
    if (!section) {
      throw new Error("Could not find edited section");
    }
    callback(section);
  });
}
