import React from "react";

export interface BooleanState {
  state: boolean;
  handleSetAsTrue: () => void;
  handleSetAsFalse: () => void;
  true: () => void;
  false: () => void;
  toggle: () => void;
}

export const useBooleanState: (initialState?: boolean) => BooleanState = (
  initialState = false,
) => {
  const [state, setState] = React.useState(initialState);

  const handleSetAsTrue = React.useCallback(() => {
    setState(true);
  }, []);

  const handleSetAsFalse = React.useCallback(() => {
    setState(false);
  }, []);

  const toggle = React.useCallback(() => {
    setState((value) => !value);
  }, []);

  return {
    state,
    handleSetAsTrue,
    handleSetAsFalse,
    true: handleSetAsTrue,
    false: handleSetAsFalse,
    toggle,
  };
};
