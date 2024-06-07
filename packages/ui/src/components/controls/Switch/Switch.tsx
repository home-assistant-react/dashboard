import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "../../../helpers";
import { SwitchProps } from "./Switch.types";

const classes = {
  Root:
    "inline-flex items-center h-[20px] w-[36px] shrink-0 cursor-pointer " +
    "transition-all shadow-sm border border-transparent rounded-full data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted",
  Thumb:
    "pointer-events-none transition-all h-4 w-4 rounded-full bg-primary-background shadow-lg " +
    "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
};

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(classes.Root, className)}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className={classes.Thumb} />
  </SwitchPrimitives.Root>
));

Switch.displayName = SwitchPrimitives.Root.displayName;
