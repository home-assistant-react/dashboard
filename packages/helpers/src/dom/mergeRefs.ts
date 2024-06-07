/* eslint-disable  @typescript-eslint/no-explicit-any */

import React from "react";

/**
 * Creates a callback ref that can assign a React element or component instance to multiple refs.
 * This function is useful when you need to pass a ref to a component but also retain access within a parent component.
 * It supports both functional and object refs.
 *
 * @param refs - An array of refs to which the value should be assigned. These can be either callback refs or ref objects.
 * @returns A callback function that assigns the provided value to each ref in the array.
 *
 * @template T - The type of the instance or HTML element that the refs will point to.
 *
 * @example
 * // Example usage in a React component:
 * const Component = () => {
 *   const ref1 = useRef(null);
 *   const ref2 = useCallback(node => {
 *     // do something with the node
 *   }, []);
 *
 *   const mergedRef = mergeRefs([ref1, ref2]);
 *
 *   return <div ref={mergedRef}>Hello</div>;
 * };
 */
export function mergeRefs<T = any>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>,
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}
