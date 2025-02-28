export const colorMap = {
  red: "oklch(0.637 0.237 25.331)", // todo: use tailwind variables?
  orange: "oklch(0.705 0.213 47.604)",
  // amber: "oklch(0.769 0.188 70.08)",
  yellow: "oklch(0.795 0.184 86.047)",
  // lime: "oklch(0.768 0.233 130.85)",
  green: "oklch(0.723 0.219 149.579)",
  // emerald: "oklch(0.696 0.17 162.48)",
  // teal: "oklch(0.704 0.14 182.503)",
  // cyan: "oklch(0.715 0.143 215.221)",
  // sky: "oklch(0.685 0.169 237.323)",
  blue: "oklch(0.623 0.214 259.815)",
  // indigo: "oklch(0.585 0.233 277.117)",
  violet: "oklch(0.606 0.25 292.717)",
  // purple: "oklch(0.627 0.265 303.9)",
  fuchsia: "oklch(0.667 0.295 322.15)",
  // pink: "oklch(0.656 0.241 354.308)",
  // rose: "oklch(0.645 0.246 16.439)",
  // slate: "oklch(0.554 0.046 257.417)",
  gray: "oklch(0.551 0.027 264.364)",
  // zinc: "oklch(0.552 0.016 285.938)",
  // neutral: "oklch(0.556 0 0)",
  // stone: "oklch(0.553 0.013 58.071)",
} satisfies Record<string, string>;

export type Color = keyof typeof colorMap;
