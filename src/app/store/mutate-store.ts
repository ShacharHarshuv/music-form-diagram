import { StoreValue, useStore } from "@/app/store/store";
import { produce } from "immer";
import { MusicDiagramDocument } from "@/app/music-diagram-document/music-diagram-document";

const history: MusicDiagramDocument[] = [];
const future: MusicDiagramDocument[] = [];

export function mutateStore(updater: (current: StoreValue) => void) {
  const currentDocument = useStore.getState().document;
  useStore.setState(produce(updater));
  const newDocument = useStore.getState().document;
  if (currentDocument !== newDocument) {
    history.push(currentDocument);
    future.length = 0;
  }

  if (history.length > 100) history.shift();
}

export function undoStore() {
  if (history.length === 0) return;

  const currentDocument = useStore.getState().document;

  useStore.setState(() => ({
    document: history.pop(),
  }));

  future.push(currentDocument);
}

export function redoStore() {
  if (future.length === 0) return;

  const currentDocument = useStore.getState().document;

  useStore.setState(() => ({
    document: future.pop(),
  }));

  history.push(currentDocument);
}
