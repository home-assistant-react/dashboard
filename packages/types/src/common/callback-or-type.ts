/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from "react";

export type CallbackOrType<TValue, TOptions = any> =
  | TValue
  | ((options: TOptions) => TValue);
export type PromiseOrType<TValue, TOptions = any> =
  | TValue
  | ((options: TOptions) => Promise<TValue>)
  | ((options: TOptions) => TValue);
export type CallbackOrNode = CallbackOrType<React.ReactNode>;
export type CallbackOrString = CallbackOrType<string>;
export type CallbackOrBoolean = CallbackOrType<boolean>;
export type CallbackOrNumber = CallbackOrType<number>;
