import { createMusicDiagramAst } from "@/app/music-diagram-ast/music-diagram-ast";
import { MusicDiagramDocument } from "@/app/music-diagram-document/music-diagram-document";

function expectNotToThrow(
  name: string,
  input: Omit<MusicDiagramDocument, "title" | "sections"> &
    Partial<MusicDiagramDocument>,
) {
  test(name, () => {
    expect(() =>
      createMusicDiagramAst({
        title: "Untitled",
        sections: [],
        ...input,
      }),
    ).not.toThrow();
  });
}

describe(createMusicDiagramAst.name, () => {
  expectNotToThrow("basic", {
    length: 32,
  });

  expectNotToThrow("one section", {
    length: 32,
    sections: [
      {
        id: 0,
        start: 0,
        end: 4,
        attributes: {
          name: "A",
          color: "red",
        },
      },
    ],
  });

  expectNotToThrow("two sections", {
    length: 32,
    sections: [
      {
        id: 0,
        start: 0,
        end: 3,
        attributes: {
          name: "A",
          color: "red",
        },
      },
      {
        id: 1,
        start: 4,
        end: 7,
        attributes: {
          name: "B",
        },
      },
    ],
  });

  expectNotToThrow("nested sections", {
    length: 32,
    sections: [
      {
        id: 0,
        start: 0,
        end: 3,
        attributes: {
          name: "A",
          color: "red",
        },
      },
      {
        id: 1,
        start: 1,
        end: 2,
        attributes: {
          name: "inner",
        },
      },
    ],
  });

  expectNotToThrow("nested sections with common start bar", {
    length: 32,
    sections: [
      {
        id: 0,
        start: 0,
        end: 3,
        attributes: {
          name: "A",
          color: "red",
        },
      },
      {
        id: 1,
        start: 0,
        end: 1,
        attributes: {
          name: "inner",
        },
      },
    ],
  });
});
