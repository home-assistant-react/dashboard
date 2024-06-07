import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex gap-1 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        gradient:
          "bg-primary-gradient text-primary-foreground shadow hover:saturate-150",
        white:
          "bg-primary-background text-primary shadow hover:bg-primary/90 hover:text-white",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        xs: "h-5 rounded-md px-2 text-xs",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-md px-8",
        icon: "h-9 w-9",
      },
      color: {
        primary: "bg-transparent text-primary border-primary",
        white: "text-white",
        destructive:
          "border-destructive text-destructive hover:text-destructive hover:bg-destructive/5",
        outline: "text-accent",
        secondary: "text-secondary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
