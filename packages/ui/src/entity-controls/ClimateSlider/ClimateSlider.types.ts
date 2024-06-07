export type ActiveSlider = "low" | "high" | "value";

export type CircularSliderMode = "start" | "end" | "full";

export interface ClimateSliderOptions {
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isInactive?: boolean;
  label?: string;
  lowLabel?: string;
  highLabel?: string;
  value?: number;
  low?: number;
  high?: number;
  current?: number;
  step?: number;
  min?: number;
  max?: number;
  preventInteractionOnScroll?: boolean;
  isDual?: boolean;
  mode?: CircularSliderMode;
}

type RequiredStateOptions = "min" | "max" | "step";

export interface ClimateSliderInitialState
  extends Omit<ClimateSliderOptions, RequiredStateOptions>,
    Pick<Required<ClimateSliderOptions>, RequiredStateOptions> {}

export interface ClimateSliderState extends ClimateSliderInitialState {
  localValue?: number;
  localLow?: number;
  localHigh?: number;
  lastSlider?: ActiveSlider;
  setLocalValue: (value: number) => void;
  setLocalLow: (value: number) => void;
  setLocalHigh: (value: number) => void;
}

export interface ClimateSliderProps extends ClimateSliderOptions {}
export interface ClimateProviderProps extends ClimateSliderInitialState {}
