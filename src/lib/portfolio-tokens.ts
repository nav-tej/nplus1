export const COLORS = {
  bg: "#0E1823",           // bg-sunken (n+α brand)
  bgCard: "#1A2839",       // Dark navy card
  bgCardHover: "#22334A",  // Card hover state
  accent: "#EE8660",       // alpha-text
  accentDim: "#D85A30",    // alpha
  accentGlow: "rgba(216,90,48,0.15)",
  text: "#F3EFE8",         // Primary text (warm white)
  textMuted: "#A9B4C2",    // Secondary text
  textDim: "#8A97A8",      // Tertiary text
  border: "#2A3B52",       // Borders and dividers
  success: "#5FBF8F",      // Positive indicators
  info: "#7FA7CF",         // Informational
  warning: "#E8B64C",      // Caution/attention
  purple: "#A9B4C2",       // Category accent
  rose: "#EE8660",         // Negative/competitor
} as const;

export const FONTS = {
  display: "'Instrument Serif', serif",
  body: "'DM Sans', sans-serif",
} as const;
