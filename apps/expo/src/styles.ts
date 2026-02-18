/**
 * Consolidated Styles for the Expo Native App
 * Billion Brand System — Authoritative · Classy · Sleek
 *
 * This is the SINGLE SOURCE OF TRUTH for all styling in the app.
 * Import everything you need from here: `import { ... } from "~/styles"`
 */

import { StyleSheet, useColorScheme } from "react-native";

import {
  colors,
  darkTheme,
  fontSize,
  fontWeight,
  lightTheme,
  radius,
  shadows,
  spacing,
} from "@acme/ui/theme-tokens";

// Re-export everything from theme-tokens so you only need to import from one place
export {
  colors,
  darkTheme,
  lightTheme,
  fontSize,
  fontWeight,
  spacing,
  radius,
  shadows,
} from "@acme/ui/theme-tokens";

// ============================================================================
// THEME HOOK - Use this to get the current theme based on color scheme
// ============================================================================

export type Theme = typeof darkTheme;

export function useTheme(): {
  theme: Theme;
  colorScheme: "light" | "dark";
  isDark: boolean;
} {
  const colorScheme = useColorScheme() ?? "dark";
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  return { theme, colorScheme, isDark: colorScheme === "dark" };
}

// ============================================================================
// SPACING HELPERS - Pre-computed pixel values for use in StyleSheet.create()
// ============================================================================

/** Pre-computed spacing values in pixels (spacing token * 16) */
export const sp = {
  0: 0,
  1: 4,   // 0.25 * 16
  2: 8,   // 0.5 * 16
  3: 12,  // 0.75 * 16
  4: 16,  // 1 * 16
  5: 20,  // 1.25 * 16
  6: 24,  // 1.5 * 16
  8: 32,  // 2 * 16
  10: 40, // 2.5 * 16
  12: 48, // 3 * 16
  16: 64, // 4 * 16
  20: 80, // 5 * 16
  24: 96, // 6 * 16
} as const;

/** Pre-computed radius values in pixels — from BRANDING.md §9 */
export const rd = {
  none: 0,
  sm: 6,    // Small elements, inline badges
  md: 8,    // Content type badges, tab pills
  lg: 14,   // Cards, containers, inputs
  xl: 20,   // Large modals, overlay screens
  "2xl": 24,
  full: 9999, // Buttons, navigation pills
} as const;

// ============================================================================
// COMMON LAYOUT STYLES
// ============================================================================

export const layout = StyleSheet.create({
  flex1: { flex: 1 },
  row: { flexDirection: "row" },
  column: { flexDirection: "column" },
  center: { alignItems: "center", justifyContent: "center" },
  centerX: { alignItems: "center" },
  centerY: { justifyContent: "center" },
  spaceBetween: { justifyContent: "space-between" },
  spaceAround: { justifyContent: "space-around" },
  flexEnd: { justifyContent: "flex-end" },
  alignEnd: { alignItems: "flex-end" },
  alignStart: { alignItems: "flex-start" },
  wrap: { flexWrap: "wrap" },

  container: { flex: 1 },
  scrollView: { flex: 1 },

  fullCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

// ============================================================================
// TYPOGRAPHY STYLES — BRANDING.md §4
// Albert Sans for UI; serifs handled per-component via fontFamily
// ============================================================================

export const typography = StyleSheet.create({
  // Headlines — 32px bold (IBM Plex Serif in practice; fallback to system serif)
  h1: {
    fontSize: fontSize["5xl"] * 0.667, // 32px
    fontWeight: fontWeight.bold,
    lineHeight: 32 * 1.2,
  },
  // Subheadings — 22–24px bold (Inria Serif in practice)
  h2: {
    fontSize: fontSize["2xl"],
    fontWeight: fontWeight.bold,
    lineHeight: fontSize["2xl"] * 1.3,
  },
  h3: {
    fontSize: 22,
    fontWeight: fontWeight.bold,
    lineHeight: 22 * 1.3,
  },
  h4: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    lineHeight: fontSize.lg * 1.3,
  },

  // Body — 18px regular (Albert Sans)
  body: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.normal,
    lineHeight: fontSize.lg * 1.5,
  },
  // Small/UI — 16px medium
  bodySmall: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
    lineHeight: fontSize.base * 1.4,
  },
  // Micro — 12–14px (timestamps, badges, fine print)
  caption: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.normal,
    lineHeight: fontSize.xs * 1.4,
  },

  bold: { fontWeight: fontWeight.bold },
  semibold: { fontWeight: fontWeight.semibold },
  medium: { fontWeight: fontWeight.medium },
  italic: { fontStyle: "italic" },
  // ALL CAPS sparingly — badges, short labels (4 words max)
  uppercase: { textTransform: "uppercase", letterSpacing: 0.5 },
  center: { textAlign: "center" },
});

// ============================================================================
// CARD STYLES — BRANDING.md §5
// ============================================================================

export const cards = StyleSheet.create({
  // Base card — Slate background, 14px radius
  base: {
    borderRadius: rd.lg,
    padding: sp[5],
  },

  // Content card (feed items) — Slate bg, subtle white border
  bordered: {
    borderRadius: rd.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: sp[5],
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.30,
    shadowRadius: 8,
    elevation: 4,
  },

  // Content card for article rendering
  content: {
    borderRadius: rd.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: sp[5],
  },

  // Elevated card (modals, overlays) — deeper shadow
  elevated: {
    borderRadius: rd.xl,
    padding: sp[6],
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.40,
    shadowRadius: 24,
    elevation: 8,
  },
});

// ============================================================================
// HEADER STYLES
// ============================================================================

export const headers = StyleSheet.create({
  container: {
    paddingHorizontal: sp[5],
    paddingBottom: sp[5],
  },
  title: {
    fontSize: 32,
    fontWeight: fontWeight.bold,
    lineHeight: 32 * 1.2,
    marginBottom: sp[4],
  },
  withBorder: {
    borderBottomWidth: 1,
  },
});

// ============================================================================
// INPUT STYLES — BRANDING.md §5 Inputs
// ============================================================================

export const inputs = StyleSheet.create({
  search: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: rd.lg,
    paddingHorizontal: sp[4],
    paddingVertical: sp[3],
    fontSize: fontSize.base,
    // Color applied dynamically via createSearchStyles()
  },
  text: {
    borderWidth: 1,
    borderRadius: rd.lg,
    paddingHorizontal: sp[4],
    paddingVertical: sp[3],
    fontSize: fontSize.base,
  },
});

// ============================================================================
// BUTTON STYLES — BRANDING.md §5 Buttons
// ============================================================================

export const buttons = StyleSheet.create({
  // Primary button — white pill (brand signature)
  primary: {
    backgroundColor: colors.white,
    paddingHorizontal: sp[6],
    paddingVertical: sp[3],
    borderRadius: rd.full,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },

  // Tab pill — active: white fill/black text; inactive: transparent/bordered
  tab: {
    paddingHorizontal: sp[4],
    paddingVertical: sp[2],
    borderRadius: rd.full,
  },
  tabText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
  },

  // Floating action button (44×44 minimum touch target)
  floating: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  floatingLarge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

// ============================================================================
// BADGE STYLES — BRANDING.md §5 Content Type Button
// ============================================================================

export const badges = StyleSheet.create({
  base: {
    alignSelf: "flex-start",
    paddingHorizontal: sp[3],
    paddingVertical: sp[1],
    borderRadius: rd.md,
  },
  text: {
    color: colors.white,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});

// ============================================================================
// SETTINGS SCREEN STYLES
// ============================================================================

export const settings = StyleSheet.create({
  section: {
    marginTop: sp[8],
  },
  sectionTitle: {
    marginHorizontal: sp[5],
    marginBottom: sp[3],
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionContent: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingHorizontal: sp[5],
    paddingVertical: sp[4],
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    marginBottom: sp[1],
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
  },
  itemSubtitle: {
    fontSize: fontSize.sm,
    lineHeight: sp[5],
  },
  chevron: {
    marginLeft: sp[3],
    fontSize: fontSize.xl,
  },
});

// ============================================================================
// ACTION BUTTON STYLES (like/comment/share)
// ============================================================================

export const actions = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    marginBottom: sp[4],
    alignItems: "center",
    backgroundColor: "transparent",
  },
  icon: {
    marginBottom: sp[1],
    fontSize: fontSize["2xl"],
  },
  text: {
    textAlign: "center",
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
});

// ============================================================================
// MARKDOWN STYLES GENERATOR
// ============================================================================

export function getMarkdownStyles(theme: Theme) {
  return {
    body: {
      fontSize: fontSize.lg, // 18px body
      lineHeight: fontSize.lg * 1.5,
      color: theme.foreground,
    },
    heading1: {
      fontSize: 32,
      fontWeight: fontWeight.bold,
      lineHeight: 32 * 1.2,
      marginBottom: sp[4],
      color: theme.foreground,
    },
    heading2: {
      fontSize: fontSize["2xl"],
      fontWeight: fontWeight.bold,
      lineHeight: fontSize["2xl"] * 1.3,
      marginBottom: sp[3],
      color: theme.foreground,
    },
    heading3: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.semibold,
      lineHeight: fontSize.lg * 1.3,
      marginBottom: sp[2],
      color: theme.foreground,
    },
    paragraph: {
      marginBottom: sp[4],
    },
    listItem: {
      marginBottom: sp[2],
    },
    strong: {
      fontWeight: fontWeight.bold,
    },
    em: {
      fontStyle: "italic" as const,
    },
    link: {
      color: colors.civicBlue,
      textDecorationLine: "underline" as const,
    },
    blockquote: {
      backgroundColor: theme.muted,
      borderLeftWidth: 4,
      borderLeftColor: colors.civicBlue,
      paddingLeft: sp[4],
      paddingVertical: sp[2],
      marginVertical: sp[3],
    },
    code_inline: {
      backgroundColor: theme.muted,
      color: theme.foreground,
      paddingHorizontal: sp[2],
      paddingVertical: sp[1],
      borderRadius: rd.sm,
      fontFamily: "monospace",
    },
    code_block: {
      backgroundColor: theme.muted,
      color: theme.foreground,
      padding: sp[4],
      borderRadius: rd.md,
      marginVertical: sp[3],
      fontFamily: "monospace",
    },
  };
}

// ============================================================================
// CONTENT TYPE BADGE COLORS — BRANDING.md §6
// ============================================================================

export const typeBadgeColors = {
  bill: colors.civicBlue,    // #4A7CFF
  order: colors.deepIndigo,  // #6366F1
  case: colors.teal,         // #0891B2
  general: colors.muted,     // #8A8FA0
  government_content: colors.deepIndigo, // #6366F1
  court_case: colors.teal,   // #0891B2
} as const;

export function getTypeBadgeColor(type: string, fallback?: string): string {
  return (
    typeBadgeColors[type as keyof typeof typeBadgeColors] ??
    fallback ??
    typeBadgeColors.general
  );
}

// ============================================================================
// COMBINED STYLES HELPERS - For building complete screen styles
// ============================================================================

/** Create themed header styles for a screen */
export function createHeaderStyles(theme: Theme, insetTop: number) {
  return {
    container: {
      backgroundColor: theme.background,
      paddingHorizontal: sp[5],
      paddingBottom: sp[5],
      paddingTop: insetTop + 20,
    },
    title: {
      fontSize: 32,
      fontWeight: fontWeight.bold as "700",
      lineHeight: 32 * 1.2,
      color: theme.foreground,
      marginBottom: sp[4],
    },
  };
}

/** Create themed styles for search input — BRANDING.md §5 Inputs */
export function createSearchStyles(theme: Theme) {
  return {
    backgroundColor: theme.input,  // Slate
    borderWidth: 1,
    borderColor: colors.borderLight, // rgba(255,255,255,0.10)
    borderRadius: rd.lg,             // 14px
    paddingHorizontal: sp[4],
    paddingVertical: sp[3],
    fontSize: fontSize.base,         // 16px
    color: theme.foreground,
  };
}

/** Create themed styles for tab container */
export function createTabContainerStyles(theme: Theme) {
  return {
    flexDirection: "row" as const,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    backgroundColor: theme.background,
    paddingHorizontal: sp[5],
    paddingVertical: sp[3],
    gap: sp[2],
  };
}

/** Get shadow styles based on theme */
export function getShadow(size: "sm" | "md" | "lg", isDark: boolean) {
  return isDark ? shadows.dark[size] : shadows.light[size];
}
