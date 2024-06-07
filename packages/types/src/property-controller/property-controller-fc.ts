import React, { FC, PropsWithChildren, ReactNode } from "react";
import { Panel } from "../panels";

export interface PropertyControllerProps<TProperty> extends PropsWithChildren {
  property: TProperty;
  label?: ReactNode;
  style?: React.CSSProperties;
  className?: string;
  value?: unknown;
  onChange: (value: unknown) => void;
  panel?: Panel;
}

export type PropertyControllerFc<TProperty = any> = FC<
  PropertyControllerProps<TProperty>
>;
