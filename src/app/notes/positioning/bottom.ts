import { useEffect, useState } from "react";

export function getBottom(ref: HTMLElement) {
  return ref.getBoundingClientRect().bottom + window.scrollY;
}

export function useBottom(ref: React.RefObject<HTMLElement | null>) {
  const [bottom, setBottom] = useState<number | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    setBottom(getBottom(ref.current));
  }, [ref]);

  return bottom;
}
