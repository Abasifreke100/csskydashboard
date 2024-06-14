import { useRef, RefObject } from "react";

export function useScrollIntoView(): [RefObject<HTMLDivElement>, () => void] {
  const ref = useRef<HTMLDivElement>(null);

  const scrollTo = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return [ref, scrollTo];
}
