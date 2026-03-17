export const COLORS = {
  bg: "#080d14",           // Deep navy — darker than site's #0B1221 for immersive feel
  bgCard: "#0f1828",       // Dark navy card
  bgCardHover: "#152033",  // Card hover state
  accent: "#c8a97e",       // Warm gold accent
  accentDim: "#a08560",    // Muted gold
  accentGlow: "rgba(200,169,126,0.15)",
  text: "#e8e4de",         // Primary text (warm white)
  textMuted: "#8a8680",    // Secondary text
  textDim: "#5a5650",      // Tertiary text
  border: "#2a2a35",       // Borders and dividers
  success: "#4ade80",      // Positive indicators
  info: "#60a5fa",         // Informational
  warning: "#fbbf24",      // Caution/attention
  purple: "#a78bfa",       // Category accent
  rose: "#fb7185",         // Negative/competitor
} as const;

export const FONTS = {
  display: "'Instrument Serif', serif",
  body: "'DM Sans', sans-serif",
} as const;
