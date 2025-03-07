import { MusicDiagramDocument } from "@/app/music-diagram-document/music-diagram-document";

let fileHandle: FileSystemFileHandle | null = null; // Global variable

const extension = ".musf";
const types: FilePickerAcceptType[] = [
  {
    description: "Music Form Files",
    accept: { "application/json": [extension] },
  },
];

export const openFile = async (): Promise<{
  document: MusicDiagramDocument;
  name: string;
}> => {
  const [handle] = await window.showOpenFilePicker({
    types,
  });

  fileHandle = handle; // Store the handle globally

  const file = await handle.getFile();
  const text = await file.text();
  return {
    document: JSON.parse(text) as MusicDiagramDocument,
    name: file.name.split(".").slice(0, -1).join("."),
  };
};

export const saveFile = async (
  content: MusicDiagramDocument,
  name?: string,
  promptForNewFile = true,
) => {
  let handle = fileHandle;

  if (!handle || promptForNewFile) {
    handle = await window.showSaveFilePicker({
      suggestedName: name,
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
