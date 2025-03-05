import {
  SectionAttributes,
  Section,
} from "@/app/music-diagram-document/music-diagram-document";
import { colorMap, Color } from "@/app/colors";
import { useStore } from "@/app/store/store";
import { mutateStore } from "@/app/store/mutate-store";

export function useSection({
  id,
  attributes,
}: {
  id: string;
  attributes: SectionAttributes;
}) {
  const colorName = attributes.color ?? "gray";
  const color = colorMap[colorName];
  const isSelected = useStore(({ selection }) => {
    return selection.section === id;
  });

  function mutateSection(callback: (section: Section) => void) {
    mutateStore(({ document }) => {
      const section = document.sections.find((section) => section.id === id);
      if (!section) {
        throw new Error("Could not find edited section");
      }
      callback(section);
    });
  }

  function selectSection() {
    mutateStore(({ selection }) => {
      selection.section = id;
      selection.start = null;
      selection.end = null;
    });
  }

  function rename(newName: string) {
    mutateSection((section) => {
      section.attributes.name = newName;
    });
  }

  function changeColor(newColor: Color) {
    mutateSection(({ attributes }) => {
      attributes.color = newColor;
    });
  }

  return {
    isSelected,
    colorName,
    color,
    selectSection,
    rename,
    changeColor,
  };
}
