import React from "react";
import { UseBooleanReturn } from "../../../types/src";

export function useBooleanValue(defaultValue = false): UseBooleanReturn {
  const [value, setValue] = React.useState(defaultValue || false);

  return {
    value,
    setTrue: setValue.bind(null, true),
    setFalse: setValue.bind(null, false),
    toggle: () => setValue((v) => !v),
    setValue,
  };
}
