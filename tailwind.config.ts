import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        surface: {
          DEFAULT: "var(--color-surface)",
          subtle: "var(--color-surface-subtle)",
          recessed: "var(--color-surface-recessed)",
          hover: "var(--color-surface-hover)",
        },
        border: {
          subtle: "var(--color-border-subtle)",
          DEFAULT: "var(--color-border-default)",
          strong: "var(--color-border-strong)",
        },
        ink: {
          primary: "var(--color-ink-primary)",
          secondary: "var(--color-ink-secondary)",
          tertiary: "var(--color-ink-tertiary)",
          faint: "var(--color-ink-faint)",
        },
        accent: {
          dark: "var(--color-accent-dark)",
          hover: "var(--color-accent-hover)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(24, 24, 27, 0.04)",
        card: "0 1px 2px 0 rgba(24, 24, 27, 0.03), 0 4px 12px -2px rgba(24, 24, 27, 0.025)",
        popover: "0 12px 32px -4px rgba(24, 24, 27, 0.08), 0 4px 8px -2px rgba(24, 24, 27, 0.04)",
        floating: "0 20px 48px -12px rgba(24, 24, 27, 0.12), 0 4px 12px -2px rgba(24, 24, 27, 0.05)",
      },
      borderRadius: {
        "2xl": "1rem",      // 16px - Outer shell of concentric cards
        "xl": "0.75rem",    // 12px - Inner surface of concentric cards & inputs
        "lg": "0.625rem",   // 10px - Buttons & segmented controls
      },
      transitionTimingFunction: {
        "out-strong": "cubic-bezier(0.23, 1, 0.32, 1)",
        "in-out-strong": "cubic-bezier(0.77, 0, 0.175, 1)",
        "drawer": "cubic-bezier(0.32, 0.72, 0, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

