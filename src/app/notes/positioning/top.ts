import { useEffect, useState } from "react";

export function getTop(ref: HTMLElement, container: HTMLElement) {
  return (
    ref.getBoundingClientRect().top - container.getBoundingClientRect().top
  );
}

export function useTop(
  ref: React.RefObject<HTMLElement | null>,
  containerRef: React.RefObject<HTMLElement | null>,
) {
  const [top, setTop] = useState<number | null>(null);

  // todo: consider using a ResizeObserver
  useEffect(() => {
    if (!ref.current || !containerRef.current) {
      return;
    }

    const top = getTop(ref.current, containerRef.current);

    setTop(top);
  }, [ref, containerRef]);

  return top;
}
