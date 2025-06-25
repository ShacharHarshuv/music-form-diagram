import { useEffect, useState } from "react";

const anchors: Record<string, HTMLElement | null> = {};
const subscribers = new Set<() => void>();

export const NotesAnchors = {
  register: (id: string, element: HTMLElement | null) => {
    anchors[id] = element;
    subscribers.forEach((callback) => callback());
  },
  unregister: (id: string) => {
    delete anchors[id];
    subscribers.forEach((callback) => callback());
  },
  useAnchors() {
    const [anchorState, setAnchorState] = useState(anchors);

    useEffect(() => {
      const subscription = () => {
        setAnchorState({ ...anchors });
      };
      subscribers.add(subscription);
      return () => {
        subscribers.delete(subscription);
      };
    }, []);

    return anchorState;
  },
  // todo: remove if not needed
  useAnchor(id: string): HTMLElement | null {
    const [anchor, setAnchor] = useState<HTMLElement | null>(
      anchors[id] || null,
    );

    useEffect(() => {
      const subscription = () => {
        setAnchor(anchors[id] || null);
      };
      subscribers.add(subscription);

      return () => {
        subscribers.delete(subscription);
      };
    }, [id]);

    return anchor;
  },
};
