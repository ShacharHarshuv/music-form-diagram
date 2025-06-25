import { doc, getDoc, setDoc } from "firebase/firestore";
import { pick } from "lodash";
import { StoreValue } from "../store/store";
import { db } from "./db";

const collectionName = "diagrams";

export interface SharedDocument extends Pick<StoreValue, "document" | "title"> {
  createdAt: number;
}

export const saveDocumentToFirebase = async (
  data: Pick<StoreValue, "document" | "title">,
): Promise<string> => {
  const id = crypto.randomUUID();
  const sharedDocument: SharedDocument = {
    ...pick(data, ["document", "title"]),
    createdAt: Date.now(),
  };

  await setDoc(doc(db, collectionName, id), sharedDocument);
  return id;
};

export const loadDocumentFromFirebase = async (
  id: string,
): Promise<SharedDocument | null> => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as SharedDocument;
    }
    return null;
  } catch (error) {
    console.error("Error loading document from Firebase:", error);
    return null;
  }
};
