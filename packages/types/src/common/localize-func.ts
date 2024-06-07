/* eslint-disable  @typescript-eslint/no-explicit-any */

export type LocalizeFunc<Keys extends string = string> = (
  key: Keys,
  ...args: any[]
) => string;
