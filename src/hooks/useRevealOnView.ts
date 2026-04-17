import { useEffect, useRef, useState } from "react";

function isElementVisible(node: HTMLElement, threshold: number) {
  const rect = node.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const visibleTop = Math.max(rect.top, 0);
  const visibleBottom = Math.min(rect.bottom, viewportHeight);
  const visibleHeight = Math.max(visibleBottom - visibleTop, 0);

  if (rect.height <= 0) {
    return rect.top < viewportHeight;
  }

  return visibleHeight / rect.height >= threshold;
}

export function useRevealOnView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node || isVisible) {
      return;
    }

    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined" ||
      isElementVisible(node, threshold)
    ) {
      setIsVisible(true);
      return;
    }

    try {
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
    } catch {
      setIsVisible(true);
      return;
    }
  }, [isVisible, threshold]);

  return { ref, isVisible };
}
