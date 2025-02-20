import {
  SectionAttributes,
  MusicDiagramDocument,
} from "@/app/music-diagram-document/music-diagram-document";
import { sortBy, max } from "lodash";

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
  type: "MultiSystemSection";
  paddingLevel: number;
  attributes: SectionAttributes;
  segments: SystemSegment[];
}

export interface System {
  type: "System";
  bars: Bar[];
  // sections: InlineSection[];
  // inlineNotes: InlineNote[];
}

export type SystemSegment = System | MultiSystemSection;

export interface Diagram {
  type: "Diagram";
  segments: SystemSegment[];
}

// internal type as a step in calculating what should be a system section and what should be an inline section
interface Section {
  type: "Section";
  attributes: SectionAttributes;
  elements: (Bar | Section)[];
}

function getElementNameForDebugging(element: Section | Bar) {
  if (element.type === "Bar") {
    return `Bar[${element.index}]`;
  } else {
    return `Section[${element.attributes.name}]`;
  }
}

function findElementFactory(
  isSectionTheOneWeAreLookingFor: (
    section: Section,
    barNumber: number,
  ) => boolean,
) {
  return function findElement(
    section: Section,
    barNumber: number,
  ): {
    parent: Section;
    index: number;
  } | null {
    const { elements } = section;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      if (
        (element.type === "Bar" && element.index === barNumber) ||
        (element.type === "Section" &&
          isSectionTheOneWeAreLookingFor(element, barNumber))
      ) {
        return {
          parent: section,
          index: i,
        };
      } else if (element.type === "Section") {
        const maybeElement = findElement(element, barNumber);
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

function createBarsWithSections(doc: MusicDiagramDocument) {
  let length = doc.length;
  doc.sections.forEach(({ end }) => {
    if (end > length) length = end;
  });

  const bars: Bar[] = Array.from({ length }, (_, i) => ({
    type: "Bar",
    index: i,
  }));

  const rootSection: Section = {
    type: "Section",
    attributes: {
      name: "root", // for debugging only
    },
    elements: [...bars],
  };

  // building the sections from smallest to biggest avoids issues where it's hard to understand which is the common container of two bar indices
  for (const section of sortBy(doc.sections, ({ start, end }) => end - start)) {
    const start = findStartElement(rootSection, section.start);
    const end = findEndElement(rootSection, section.end);

    if (!start) {
      throw new Error(
        `Invalid start bar number ${section.start} for ${section.attributes.name}`,
      );
    }
    if (!end) {
      throw new Error(
        `Invalid end bar number ${section.end} for ${section.attributes.name}`,
      );
    }

    if (!start) {
      throw new Error(`Couldn't find start of ${section.attributes.name}`);
    }

    if (!end) {
      throw new Error(`Couldn't find end of ${section.attributes.name}`);
    }

    if (start.parent !== end.parent) {
      throw new Error(
        `Start and end parent of ${section.attributes.name} are different! start.parent=${getElementNameForDebugging(start.parent)}, end.parent=${getElementNameForDebugging(end.parent)}`,
      );
    }

    const { parent } = start;

    const sectionElement: Section = {
      type: "Section",
      attributes: section.attributes,
      elements: parent.elements.slice(start.index, end.index + 1),
    };

    parent.elements.splice(
      start.index,
      end.index - start.index + 1,
      sectionElement,
    );
  }

  return rootSection.elements;
}

const maxBarsInSystem = 8; // todo: we might want to make this customizable eventually

function createEmptySystem(): System {
  return {
    type: "System",
    bars: [],
  };
}

export function createMusicDiagramAst(doc: MusicDiagramDocument): Diagram {
  function createSegments(elements: (Section | Bar)[]) {
    let currentSystem = createEmptySystem();
    const segments: (MultiSystemSection | System)[] = [];

    function pushSystem() {
      segments.push(currentSystem);
      currentSystem = createEmptySystem();
    }

    for (const element of elements) {
      if (element.type === "Bar") {
        const bar = element;
        currentSystem.bars.push(bar);

        if (currentSystem.bars.length >= maxBarsInSystem) {
          pushSystem();
        }
      } else if (element.type === "Section") {
        const section = element;

        if (currentSystem.bars.length) {
          pushSystem();
        }

        segments.push({
          paddingLevel: 0,
          type: "MultiSystemSection",
          attributes: section.attributes,
          segments: createSegments(section.elements),
        });
      }
    }

    if (currentSystem.bars.length) {
      pushSystem();
    }

    return segments;
  }

  const segments = createSegments(createBarsWithSections(doc));

  // set MultiSystemSection paddingLevel
  function setPaddingLevels(segments: SystemSegment[]): number {
    return (
      max(
        segments.map((s) => {
          if (s.type === "System") {
            return 0;
          }

          const paddingLevel = setPaddingLevels(s.segments) + 1;

          s.paddingLevel = paddingLevel;

          return paddingLevel;
        }),
      ) ?? 0
    );
  }

  setPaddingLevels(segments);

  return {
    type: "Diagram",
    segments,
  };
}
