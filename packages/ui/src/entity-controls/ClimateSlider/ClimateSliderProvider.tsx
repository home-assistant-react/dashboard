import React from "react";
import {
  ClimateProviderProps,
  ClimateSliderState,
} from "./ClimateSlider.types";

export const ClimateSliderContext = React.createContext<
  ClimateSliderState | undefined
>(undefined);

export const ClimateSliderProvider: React.FC<
  React.PropsWithChildren<{ value: ClimateProviderProps }>
> = ({ value, children }) => {
  const [localValue, setLocalValue] = React.useState(value.value);
  const [localHigh, setLocalHigh] = React.useState(value.high);
  const [localLow, setLocalLow] = React.useState(value.low);

  React.useEffect(() => {
    setLocalValue(value.value);
    setLocalHigh(value.high);
    setLocalLow(value.low);
  }, [value.value, value.high, value.low]);

  return (
    <ClimateSliderContext.Provider
      value={{
        ...value,
        localValue,
        localHigh,
        localLow,
        setLocalValue,
        setLocalHigh,
        setLocalLow,
      }}
    >
      {children}
    </ClimateSliderContext.Provider>
  );
};

export const useClimateSliderContext = () => {
  const context = React.useContext(ClimateSliderContext);
  if (!context) {
    throw new Error(
      "useClimateSliderContext must be used within a ClimateSliderProvider",
    );
  }
  return context;
};
