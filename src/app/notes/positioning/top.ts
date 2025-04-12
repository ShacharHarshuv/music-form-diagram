import { useEffect, useState } from "react";

export function getTop(ref: HTMLElement) {
  return ref.getBoundingClientRect().top + window.scrollY;
}

export function useTop(ref: React.RefObject<HTMLElement | null>) {
  const [top, setTop] = useState<number | null>(null);

  // todo: consider using a ResizeObserver
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    setTop(getTop(ref.current));
  }, [ref]);

  return top;
}
