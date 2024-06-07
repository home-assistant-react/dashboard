import {
  PropsWithChildren,
  HTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
  ElementType,
} from "react";
import { ClassValue } from "clsx";

export type UIBaseComponent<T, R> = ForwardRefExoticComponent<
  T & RefAttributes<R>
>;

export type UIBaseComponentProps<T> = PropsWithChildren<
  Omit<T, "className" | "children"> & {
    as?: ElementType;
    className?: ClassValue[] | ClassValue;
    srOnly?: boolean;
  }
>;

export type BaseProps = UIBaseComponentProps<HTMLAttributes<HTMLDivElement>>;
