import React from "react";

export const useEventListener = <T = EventListener>(
  eventName: string,
  handler: T,
) => {
  const handlerRef = React.useRef<T | null>(null);

  React.useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  React.useEffect(() => {
    const eventListener: EventListenerOrEventListenerObject = (event) =>
      typeof handlerRef.current === "function" && handlerRef.current?.(event);

    window.addEventListener(eventName, eventListener, { passive: false });
    return () => {
      window.removeEventListener(eventName, eventListener);
    };
  }, [eventName]);
};
