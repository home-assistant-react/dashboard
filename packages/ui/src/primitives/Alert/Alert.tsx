import { VariantProps } from "class-variance-authority";
import * as React from "react";
import "swiper/css";
import { cn } from "../../helpers";
import { alertVariants } from "./variants";

export const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";
