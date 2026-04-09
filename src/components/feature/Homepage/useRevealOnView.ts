import { useEffect, useRef, useState } from "react";

export function useRevealOnView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node || isVisible) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isVisible, threshold]);

  return { ref, isVisible };
}
