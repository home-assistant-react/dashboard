import { PromiseOrType } from "@home-assistant-react/types/src/common/callback-or-type";

export async function getPromiseOrTypeValue<TValue, TOptions>(
  value: PromiseOrType<TValue, TOptions>,
  options: TOptions,
): Promise<TValue> {
  if (typeof value === "function") {
    if (value instanceof Function && typeof value === "function") {
      const result = (value as (options: TOptions) => TValue)(options);
      if (result instanceof Promise) {
        return await result;
      } else {
        return result;
      }
    }
  }

  return value;
}
