import { MusicDiagramDocument } from "@/app/music-diagram-document/music-diagram-document";

let fileHandle: FileSystemFileHandle | null = null; // Global variable

const extension = ".musf";
const types: FilePickerAcceptType[] = [
  {
    description: "Music Form Files",
    accept: { "application/json": [extension] },
  },
];

export const openFile = async (): Promise<MusicDiagramDocument> => {
  const [handle] = await window.showOpenFilePicker({
    types,
  });

  fileHandle = handle; // Store the handle globally

  const file = await handle.getFile();
  const text = await file.text();
  return JSON.parse(text) as MusicDiagramDocument;
};

export const saveFile = async (
  name: string,
  content: MusicDiagramDocument,
  promptForNewFile = true,
) => {
  let handle = fileHandle;

  if (!handle || promptForNewFile) {
    const extension = name.split(".").pop();
    handle = await window.showSaveFilePicker({
      suggestedName: `${name}.${extension}`,
      types,
    });
    fileHandle = handle;
  }

  const writable = await handle.createWritable();
  await writable.write(JSON.stringify(content, null, 2));
  await writable.close();

  const fileName = handle.name.split(".").slice(0, -1).join(".");
  return fileName;
};
