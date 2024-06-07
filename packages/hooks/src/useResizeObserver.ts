import React from "react";

interface ContentRect {
  width: number;
  height: number;
}

export const useResizeObserver = (
  ref: HTMLElement | null,
  callback: (contentRect: ContentRect) => void,
): void => {
  React.useEffect(() => {
    const element = ref;

    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length === 0) return;
      const entry = entries[0];
      callback({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.unobserve(element);
    };
  }, [ref, callback]);
};
