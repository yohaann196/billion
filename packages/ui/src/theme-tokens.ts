/**
 * Shared theme tokens for both web and React Native
 * Billion Brand System — Authoritative · Classy · Sleek
 */

export const colors = {
  // Primary Palette
  deepNavy: "#0E1530",
  slate: "#272D3C",
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",

  // Content Type Colors
  civicBlue: "#4A7CFF",   // Bills
  deepIndigo: "#6366F1",  // Executive Actions
  teal: "#0891B2",        // Court Cases
  muted: "#8A8FA0",       // General / News

  // Semantic Colors
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  textSecondary: "#8A8FA0",

  // Surface borders
  borderSubtle: "rgba(255, 255, 255, 0.06)",
  borderFocus: "rgba(255, 255, 255, 0.30)",
  borderLight: "rgba(255, 255, 255, 0.10)",

  // Legacy compatibility — mapped to brand equivalents
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#0E1530", // → Deep Navy
    950: "#0E1530",
  },
  navy: {
    700: "#272D3C", // → Slate
    800: "#1a2040",
    900: "#0E1530", // → Deep Navy
  },
  gray: {
    50: "#fafafb",
    100: "#f4f4f6",
    200: "#e4e4e7",
    300: "#d1d1d6",
    400: "#a1a1aa",
    500: "#8A8FA0",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
  },
  cyan: {
    400: "#22d3ee",
    600: "#0891B2", // → Teal (Court Cases)
    700: "#0891B2",
    800: "#0e7490",
  },
  purple: {
    600: "#6366F1", // → Deep Indigo (Executive Actions)
  },
  blue: {
    400: "#4A7CFF", // → Civic Blue (Bills)
    500: "#4A7CFF",
  },
  red: {
    300: "#fca5a5",
    400: "#f87171",
    500: "#EF4444",
    600: "#dc2626",
    700: "#b91c1c",
  },
  green: {
    500: "#10B981",
    600: "#16a34a",
  },
  orange: {
    500: "#F59E0B",
  },
  lavender: {
    500: "#8A8FA0",
    700: "#8A8FA0",
  },
};

/**
 * Dark theme — the primary and only theme for Billion.
 * "Dark is the brand, not a mode."
 */
export const darkTheme = {
  // Backgrounds — surface layering hierarchy
  background: colors.deepNavy,       // #0E1530 — Base canvas
  foreground: colors.white,
  card: colors.slate,                // #272D3C — Elevated cards
  cardForeground: colors.white,

  // Primary — White pill buttons on dark (brand signature)
  primary: colors.white,
  primaryForeground: colors.black,

  // Secondary surfaces
  secondary: colors.slate,
  secondaryForeground: colors.white,

  // Muted
  muted: "rgba(255, 255, 255, 0.06)",
  mutedForeground: colors.muted,     // #8A8FA0

  // Accent — Civic Blue (Bills) as interactive accent
  accent: colors.civicBlue,
  accentForeground: colors.white,

  // Destructive
  destructive: colors.error,
  destructiveForeground: colors.white,

  // Borders — subtle white strokes
  border: colors.borderSubtle,       // rgba(255,255,255,0.06)
  input: colors.slate,               // #272D3C
  ring: colors.borderFocus,          // rgba(255,255,255,0.30)

  // Text
  text: colors.white,
  textSecondary: colors.textSecondary, // #8A8FA0

  // Semantic
  success: colors.success,
  warning: colors.warning,
  danger: colors.error,
};

/**
 * Light theme — secondary accommodation.
 * Billion is dark-first; light mode mirrors structure with inverted surfaces.
 */
export const lightTheme = {
  background: "#F8F9FC",
  foreground: colors.deepNavy,
  card: colors.white,
  cardForeground: colors.deepNavy,

  primary: colors.deepNavy,
  primaryForeground: colors.white,

  secondary: "#E8ECF4",
  secondaryForeground: colors.deepNavy,

  muted: "#F0F2F8",
  mutedForeground: "#6B7280",

  accent: colors.civicBlue,
  accentForeground: colors.white,

  destructive: colors.error,
  destructiveForeground: colors.white,

  border: "rgba(14, 21, 48, 0.10)",
  input: colors.white,
  ring: colors.civicBlue,

  text: colors.deepNavy,
  textSecondary: "#6B7280",

  success: colors.success,
  warning: colors.warning,
  danger: colors.error,
};

/**
 * Spacing scale (in rem for web, multiply by 16 for RN pixels)
 */
export const spacing = {
  0: 0,
  1: 0.25,  // 4px
  2: 0.5,   // 8px
  3: 0.75,  // 12px
  4: 1,     // 16px
  5: 1.25,  // 20px
  6: 1.5,   // 24px
  8: 2,     // 32px
  10: 2.5,  // 40px
  12: 3,    // 48px
  16: 4,    // 64px
  20: 5,    // 80px
  24: 6,    // 96px
};

/**
 * Border radius values — from BRANDING.md §9
 */
export const radius = {
  none: 0,
  sm: 0.375,   // 6px — small elements, inline badges
  md: 0.5,     // 8px — content type badges, tab pills
  lg: 0.875,   // 14px — cards, containers, inputs
  xl: 1.25,    // 20px — large modals, overlay screens
  "2xl": 1.5,  // 24px
  full: 9999,  // pill buttons, navigation pills
};

/**
 * Typography scale — from BRANDING.md §4
 */
export const fontSize = {
  xs: 12,   // Timestamps, badges, fine print (micro)
  sm: 14,   // Small UI labels
  base: 16, // Small/UI: captions, button labels, metadata
  lg: 18,   // Body text
  xl: 20,
  "2xl": 24,  // Subheadings
  "3xl": 30,
  "4xl": 36,
  "5xl": 48,  // Headlines display
};

export const fontWeight = {
  normal: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
  extrabold: "800" as const,
};

/**
 * Shadow presets — deep and soft, reinforcing layered dark aesthetic
 */
export const shadows = {
  light: {
    sm: {
      shadowColor: "#0E1530",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 2,
    },
    md: {
      shadowColor: "#0E1530",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.20,
      shadowRadius: 24,
      elevation: 4,
    },
    lg: {
      shadowColor: "#0E1530",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.25,
      shadowRadius: 32,
      elevation: 6,
    },
  },
  dark: {
    sm: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.30,
      shadowRadius: 8,
      elevation: 2,
    },
    md: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.40,
      shadowRadius: 24,
      elevation: 4,
    },
    lg: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.50,
      shadowRadius: 32,
      elevation: 8,
    },
  },
};
