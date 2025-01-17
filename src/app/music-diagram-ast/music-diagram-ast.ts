import {
  SectionAttributes,
  MusicDiagramDocument,
} from "@/app/music-diagram-document/music-diagram-document";

export interface Bar {
  type: "Bar";
  index: number;
  // consider adding chords and other info later
}

export interface InlineSection {
  attributes: SectionAttributes;
  start: number;
  end: number;
}

export interface InlineNote {
  align: "right" | "left";
  text: string;
  position: number;
}

export interface MultiSystemSection {
  attributes: SectionAttributes;
  systems: System[];
}

export interface System {
  bars: Bar[];
  sections: InlineSection[];
  inlineNotes: InlineNote;
}

export interface Diagram {
  systems: System[];
}

interface Section {
  type: "Section";
  elements: (Bar | Section)[];
}

function findElementFactory(
  isSectionTheOneWeAreLookingFor: (
    section: Section,
    barNumber: number,
  ) => boolean,
) {
  return function findElement(
    elements: (Bar | Section)[],
    barNumber: number,
  ): {
    container: (Bar | Section)[];
    index: number;
  } | null {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      if (
        (element.type === "Bar" && element.index === barNumber) ||
        (element.type === "Section" &&
          isSectionTheOneWeAreLookingFor(element, barNumber))
      ) {
        return {
          container: elements,
          index: i,
        };
      } else if (element.type === "Section") {
        const maybeElement = findElement(element.elements, barNumber);
        if (maybeElement) return maybeElement;
      }
    }
    return null;
  };
}

function isBarFirstInSection(section: Section, barNumber: number) {
  const firstElement = section.elements[0];
  if (firstElement.type === "Bar") return firstElement.index === barNumber;
  return isBarFirstInSection(firstElement, barNumber);
}

function isBarLastInSection(section: Section, barNumber: number) {
  const lastElement = section.elements[section.elements.length - 1];
  if (lastElement.type === "Bar") return lastElement.index === barNumber;
  return isBarLastInSection(lastElement, barNumber);
}

const findStartElement = findElementFactory(isBarFirstInSection);
const findEndElement = findElementFactory(isBarLastInSection);

export function createMusicDiagramAst(doc: MusicDiagramDocument) {
  let length = doc.length;
  doc.sections.forEach(({ end }) => {
    if (end > length) length = end;
  });

  const bars: Bar[] = Array.from({ length }, (_, i) => ({
    type: "Bar",
    index: i,
  }));

  const elements: (Bar | Section)[] = [...bars];

  for (const section of doc.sections) {
    const start = findStartElement(elements, section.start);
    const end = findEndElement(elements, section.end);

    if (!start) {
      throw new Error(`Invalid start bar number ${section.start}`);
    }
    if (!end) {
      throw new Error(`Invalid end bar number ${section.end}`);
    }

    if (!start || !end || start.container !== end.container) {
      console.log(section);
      console.log(start, end);
      throw new Error("Invalid section");
    }

    const { container } = start;

    const sectionElement: Section = {
      type: "Section",
      elements: container.slice(start.index, end.index + 1),
    };

    container.splice(start.index, end.index - start.index + 1, sectionElement);
  }

  return elements;
}
