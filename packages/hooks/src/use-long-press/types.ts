export type ClickHandler = (event?: LongPressEvent) => void;
export type LongPressHandler = (event?: LongPressEvent) => void;

export interface LongPressEvent {
  type: "click" | "longPress";
  event: MouseEvent | TouchEvent;
}

export interface LongPressOptions {
  delay?: number;
  fireImmediately?: boolean;
}
