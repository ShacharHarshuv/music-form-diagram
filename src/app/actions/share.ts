import { StoreValue, useStore } from "@/app/store/store";
import { pick } from "lodash";
import { createAction } from "./action";

const queryParamName = "diagram";

export const share = createAction({
  description: "Share",
  hotkey: "ctrl+alt+s",
  perform: async () => {
    const encodedDoc = encodeDocument(useStore.getState());

    const url = new URL(window.location.href);
    url.searchParams.set(queryParamName, encodedDoc);

    window.history.replaceState({}, "", url.toString());

    try {
      await navigator.clipboard.writeText(url.toString());
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url.toString();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  },
});

type StoreValueForSharing = Pick<StoreValue, "document" | "title">;

const encodeDocument = (storeValue: StoreValueForSharing) => {
  const jsonString = JSON.stringify(pick(storeValue, ["document", "title"]));
  return btoa(encodeURIComponent(jsonString));
};

const decodeDocument = (encoded: string) => {
  try {
    const jsonString = decodeURIComponent(atob(encoded));
    return JSON.parse(jsonString) as StoreValueForSharing;
  } catch {
    return null;
  }
};

export const loadDocumentFromURL = () => {
  if (typeof window === "undefined") return;

  const urlParams = new URLSearchParams(window.location.search);
  const encodedDoc = urlParams.get(queryParamName);

  if (encodedDoc) {
    const storeValue = decodeDocument(encodedDoc);
    if (storeValue) {
      useStore.setState(storeValue);
    }
  }
};

export const clearURL = () => {
  const url = new URL(window.location.href);
  url.searchParams.delete(queryParamName);
  window.history.replaceState({}, "", url.toString());
};
