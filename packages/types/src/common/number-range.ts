import { Enumerate } from "./enumerate";

export type NumberRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;
