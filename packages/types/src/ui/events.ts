import React from "react";

export type MouseTouchEvent<T = Element, E = MouseEvent> =
  | MouseEvent
  | TouchEvent
  | React.MouseEvent<T, E>
  | React.TouchEvent<T>;
