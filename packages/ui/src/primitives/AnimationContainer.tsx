import React, { PropsWithChildren } from "react";
import { Box } from "./common";

export interface AnimationContainerProps extends PropsWithChildren {
  exitDuration?: number;
}

export const AnimationContainer: React.FC<AnimationContainerProps> = ({
  children,
  exitDuration = 200,
}) => {
  const [renderedChildren, setRenderedChildren] =
    React.useState<React.ReactNode>(children);
  const childRefs = React.useRef<Map<string | null, HTMLElement>>(new Map());

  React.useEffect(() => {
    let hasRemovedChildren = false;

    childRefs.current.forEach((element, key) => {
      if (Array.isArray(children)) {
        for (const child of children) {
          if (React.isValidElement(child)) {
            if (
              child &&
              typeof child === "object" &&
              "key" in child &&
              child.key === key
            ) {
              return;
            }
          }
        }
      }

      if (element) {
        element.setAttribute("data-removed", "true");
      }

      hasRemovedChildren = true;
    });

    //TODO: Add [data-new-child] where the new child is added

    if (hasRemovedChildren) {
      const timer = setTimeout(() => {
        setRenderedChildren(children);
      }, exitDuration);

      return () => clearTimeout(timer);
    } else {
      setRenderedChildren(children);
    }

    return;
  }, [children]);

  return (
    <>
      {React.Children.map(renderedChildren, (child) =>
        React.isValidElement(child) ? (
          <Box
            key={child.key}
            ref={(el) => {
              if (!el) return;
              childRefs.current.set(child.key as never, el);
            }}
          >
            {child}
          </Box>
        ) : (
          child
        ),
      )}
    </>
  );
};

AnimationContainer.displayName = "AnimationContainer";
