import { cva } from "class-variance-authority";

export const disabledCssClasses =
  "disabled:cursor-not-allowed disabled:opacity-50";

export const disabledOutlineClasses =
  "focus-visible:outline-none focus:outline-none";

export const formControlWrapperVariants = cva(
  "relative flex flex-row items-center w-full",
  {
    variants: {
      variant: {
        default:
          "bg-primary-background dark:bg-transparent px-2 rounded-md border border-input shadow-sm transition-colors focus-visible:outline-amber-500",
        unstyled: "rounded-none border-none bg-transparent shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
