import type { Config } from "tailwindcss";

export const tailwindConfig: Omit<Config, "content"> = {
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        alt: {
          background: "hsl(var(--alt-background))",
          foreground: "hsl(var(--alt-foreground))",
        },
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          background: "hsl(var(--primary-background))",
          gradient: "var(--primary-gradient)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        semantic: {
          success: {
            DEFAULT: "hsl(var(--semantic-success))",
            foreground: "hsl(var(--semantic-success-foreground))",
          },
          warning: {
            DEFAULT: "hsl(var(--semantic-warning))",
            foreground: "hsl(var(--semantic-warning-foreground))",
          },
          error: {
            DEFAULT: "hsl(var(--semantic-error))",
            foreground: "hsl(var(--semantic-error-foreground))",
          },
          info: {
            DEFAULT: "hsl(var(--semantic-info))",
            foreground: "hsl(var(--semantic-info-foreground))",
          },
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "dropdown-down": {
          from: { opacity: "0", marginTop: "10px" },
          to: { opacity: "1", marginTop: "0" },
        },
        "dropdown-up": {
          from: { opacity: "1", marginTop: "0" },
          to: { opacity: "0", marginTop: "10px" },
        },
        "slide-left": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-right": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "slide-out-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        "fade-out": {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "dropdown-down": "dropdown-down 0.2s ease-out",
        "dropdown-up": "dropdown-up 0.2s ease-out",
        "slide-left": "slide-left 0.2s ease-out",
        "slide-out-left": "slide-out-left 0.2s ease-out",
        "slide-out-right": "slide-out-right 0.2s ease-out",
        "slide-right": "slide-right 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
      },
      zIndex: {
        hide: "-1",
        base: "0",
        docked: "10",
        sticky: "1100",
        banner: "1200",
        overlay: "1300",
        drawer: "1400",
        modal: "1500",
        dropdown: "1501",
        popover: "1600",
        toast: "1700",
        tooltip: "1800",
      },
    },
  },
};
