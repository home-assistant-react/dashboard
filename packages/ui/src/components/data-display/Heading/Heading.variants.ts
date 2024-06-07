import { cva } from "class-variance-authority";

export const headingVariants = cva("font-boild", {
  variants: {
    variant: {
      h1: "text-black dark:text-white text-6xl",
      h2: "text-black dark:text-white text-5xl",
      h3: "text-black dark:text-white text-4xl",
      h4: "text-black dark:text-white text-3xl",
      h5: "text-black dark:text-white text-2xl",
      h6: "text-black dark:text-white text-xl",
    },
  },
  defaultVariants: {
    variant: "h2",
  },
});
