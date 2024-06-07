import React from "react";
import { renderTicks } from "./helpers";
import { Box } from "../../../primitives/common";
import { TickOptions } from "./Knob.types";

export const KnobTicks: React.FC<TickOptions & { currentDeg: number }> = (
  props,
) => {
  if (!props.numTicks) return null;

  return renderTicks(props).map((tick, i) => (
    <Box
      key={i}
      className={"absolute w-[3px]"}
      style={{
        ...tick.tickStyle,
        boxShadow:
          tick.deg <= props.currentDeg
            ? "inset 0 0 5px 2px #000000, 0 0 0 1px #000000"
            : undefined,
      }}
    />
  ));
};
