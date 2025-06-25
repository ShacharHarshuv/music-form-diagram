import { useStore } from "@/app/store/store";
import { pick } from "lodash";
import {
  loadDocumentFromFirebase,
  saveDocumentToFirebase,
} from "../firebase/sharing";
import { createAction } from "./action";

const queryParamName = "diagram";

export const share = createAction({
  description: "Share",
  hotkey: "ctrl+alt+s",
  perform: async () => {
    const currentStoreValue = useStore.getState();
    const url = new URL(window.location.href);
    const existingId = url.searchParams.get(queryParamName);

    let shareId: string;

    if (existingId) {
      shareId = existingId;
    } else {
      shareId = await saveDocumentToFirebase(currentStoreValue);
      url.searchParams.set(queryParamName, shareId);
      window.history.replaceState({}, "", url.toString());
    }

    const shareUrl = url.toString();

    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  },
});

export const loadDocumentFromURL = async () => {
  if (typeof window === "undefined") return;

  const urlParams = new URLSearchParams(window.location.search);
  const diagramId = urlParams.get(queryParamName);

  if (diagramId) {
    const sharedDocument = await loadDocumentFromFirebase(diagramId);
    if (sharedDocument) {
      useStore.setState(sharedDocument);
    }
  }
};

export const clearURL = () => {
  const url = new URL(window.location.href);
  url.searchParams.delete(queryParamName);
  window.history.replaceState({}, "", url.toString());
};

// Monitor store changes to clear URL when document is modified
let lastDocumentState: string | null = null;

export const initializeURLMonitoring = () => {
  if (typeof window === "undefined") return () => {};

  const existingId = new URL(window.location.href).searchParams.get(
    queryParamName,
  );

  if (existingId) {
    const currentState = useStore.getState();
    lastDocumentState = JSON.stringify(
      pick(currentState, ["document", "title"]),
    );
  }

  // Subscribe to store changes
  const unsubscribe = useStore.subscribe((state) => {
    const currentDocumentState = JSON.stringify(
      pick(state, ["document", "title"]),
    );

    if (lastDocumentState && currentDocumentState !== lastDocumentState) {
      // Document has changed, clear the URL
      clearURL();
      lastDocumentState = null;
    }
  });

  return unsubscribe;
};
