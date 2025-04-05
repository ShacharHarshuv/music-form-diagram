import {
  SectionAttributes,
  Section,
} from "@/app/music-diagram-document/music-diagram-document";
import { colorMap, Color } from "@/app/colors";
import { useStore } from "@/app/store/store";
import { mutateStore } from "@/app/store/mutate-store";
import { mutateSection as _mutateSection } from "@/app/components/mutate-section";

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
    _mutateSection(id, (section) => {
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
