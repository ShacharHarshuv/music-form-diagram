import { useEffect, useState } from "react";

export function getBottom(ref: HTMLElement, container: HTMLElement) {
  return (
    ref.getBoundingClientRect().bottom - container.getBoundingClientRect().top
  );
}

export function useBottom(
  ref: React.RefObject<HTMLElement | null>,
  containerRef: React.RefObject<HTMLElement | null>,
) {
  const [bottom, setBottom] = useState<number | null>(null);

  // todo: consider using a ResizeObserver
  useEffect(() => {
    if (!ref.current || !containerRef.current) {
      return;
    }

    setBottom(getBottom(ref.current, containerRef.current));
  }, [ref, containerRef]);

  return bottom;
}
