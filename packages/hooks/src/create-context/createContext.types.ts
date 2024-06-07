import React from "react";

export interface CreateContextOptions<T> {
  strict?: boolean;
  hookName?: string;
  providerName?: string;
  errorMessage?: string;
  name?: string;
  defaultValue?: T;
}

export type CreateContextReturn<T> = [
  React.Provider<T>,
  () => T & { updateContext: (value: Partial<T>) => void },
  React.Context<T>,
];
