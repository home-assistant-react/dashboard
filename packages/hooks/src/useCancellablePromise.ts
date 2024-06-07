import React, { DependencyList } from "react";
export function useCancellablePromise<T>(
  promise: () => Promise<T>,
  deps?: DependencyList,
  defaultValue?: T,
) {
  const [state, setState] = React.useState({
    value: defaultValue,
    error: null,
    isLoading: true,
  });

  React.useEffect(() => {
    let isAlive = true;
    setState({ value: state.value, error: null, isLoading: true });
    promise()
      .then((value) =>
        isAlive ? setState({ value, error: null, isLoading: false }) : null,
      )
      .catch((error) =>
        isAlive
          ? setState({ value: defaultValue, error: error, isLoading: false })
          : null,
      );

    return () => {
      isAlive = false;
    };
  }, deps || []);

  return { ...state };
}
