import { createTheme } from "@mui/material/styles";

const baseTypography = {
  fontFamily: "'Syne', 'Space Grotesk', sans-serif",
  h1: { fontWeight: 800, letterSpacing: "-0.03em" },
  h2: { fontWeight: 800, letterSpacing: "-0.02em" },
  h3: { fontWeight: 700, letterSpacing: "-0.01em" },
  h4: { fontWeight: 700 },
  h5: { fontWeight: 600 },
  h6: { fontWeight: 600 },
  button: { fontWeight: 700, letterSpacing: "0.05em" },
};

const makeComponents = (palette) => ({
  MuiCssBaseline: {
    styleOverrides: `
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
      * { box-sizing: border-box; }
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: ${palette.primary.main}66; border-radius: 99px; }
      ::selection { background: ${palette.primary.main}44; }
    `,
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backdropFilter: "blur(20px)",
        borderRadius: "20px",
        background: palette.background.paper,
        border: `1px solid ${palette.primary.main}22`,
        boxShadow: `0 4px 30px ${palette.primary.main}18`,
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        "&:hover": {
          boxShadow: `0 8px 50px ${palette.primary.main}44`,
          transform: "translateY(-6px)",
          border: `1px solid ${palette.primary.main}55`,
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: "12px",
        textTransform: "none",
        fontWeight: 700,
        letterSpacing: "0.04em",
        transition: "all 0.25s ease",
      },
      containedPrimary: {
        background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark || palette.primary.main}cc)`,
        boxShadow: `0 4px 20px ${palette.primary.main}55`,
        "&:hover": {
          boxShadow: `0 6px 30px ${palette.primary.main}88`,
          transform: "translateY(-2px)",
        },
      },
      containedSecondary: {
        background: `linear-gradient(135deg, ${palette.secondary.main}, ${palette.secondary.dark || palette.secondary.main}cc)`,
        boxShadow: `0 4px 20px ${palette.secondary.main}55`,
        "&:hover": {
          boxShadow: `0 6px 30px ${palette.secondary.main}88`,
          transform: "translateY(-2px)",
        },
      },
      outlined: {
        borderWidth: "1.5px",
        "&:hover": {
          borderWidth: "1.5px",
          transform: "translateY(-2px)",
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          transition: "all 0.2s ease",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: palette.primary.main,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: palette.primary.main,
            boxShadow: `0 0 0 3px ${palette.primary.main}22`,
          },
        },
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: {
        borderRadius: "16px !important",
        background: palette.background.paper,
        border: `1px solid ${palette.primary.main}22`,
        boxShadow: "none",
        "&:before": { display: "none" },
        "&.Mui-expanded": {
          border: `1px solid ${palette.primary.main}55`,
          boxShadow: `0 4px 20px ${palette.primary.main}22`,
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
        boxShadow: "none",
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        fontWeight: 600,
      },
    },
  },
});

// ─── DARK NEON ────────────────────────────────────────────────────────────────
export const darkNeon = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00ffa3", dark: "#00cc82", contrastText: "#000" },
    secondary: { main: "#ff0080", dark: "#cc0066", contrastText: "#fff" },
    background: {
      default: "#080810",
      paper: "rgba(255,255,255,0.04)",
    },
    text: {
      primary: "#f0f0f0",
      secondary: "#888",
    },
    divider: "rgba(255,255,255,0.08)",
  },
  typography: baseTypography,
  shape: { borderRadius: 12 },
  components: makeComponents({
    primary: { main: "#00ffa3", dark: "#00cc82", contrastText: "#000" },
    secondary: { main: "#ff0080", dark: "#cc0066" },
    background: { default: "#080810", paper: "rgba(255,255,255,0.04)" },
  }),
});

// ─── LIGHT ────────────────────────────────────────────────────────────────────
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#2563eb", dark: "#1d4ed8", contrastText: "#fff" },
    secondary: { main: "#7c3aed", dark: "#6d28d9", contrastText: "#fff" },
    background: {
      default: "#f8faff",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },
    divider: "rgba(0,0,0,0.08)",
  },
  typography: baseTypography,
  shape: { borderRadius: 12 },
  components: makeComponents({
    primary: { main: "#2563eb", dark: "#1d4ed8", contrastText: "#fff" },
    secondary: { main: "#7c3aed", dark: "#6d28d9" },
    background: { default: "#f8faff", paper: "#ffffff" },
  }),
});

// ─── OCEAN ────────────────────────────────────────────────────────────────────
export const oceanTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00d4ff", dark: "#00a8cc", contrastText: "#000" },
    secondary: { main: "#0066ff", dark: "#0052cc", contrastText: "#fff" },
    background: {
      default: "#020d1a",
      paper: "rgba(0,180,255,0.05)",
    },
    text: {
      primary: "#e0f7ff",
      secondary: "#7ab8cc",
    },
    divider: "rgba(0,212,255,0.1)",
  },
  typography: baseTypography,
  shape: { borderRadius: 12 },
  components: makeComponents({
    primary: { main: "#00d4ff", dark: "#00a8cc", contrastText: "#000" },
    secondary: { main: "#0066ff", dark: "#0052cc" },
    background: { default: "#020d1a", paper: "rgba(0,180,255,0.05)" },
  }),
});

// ─── CRIMSON ──────────────────────────────────────────────────────────────────
export const crimsonTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#ff3b5c", dark: "#cc2f4a", contrastText: "#fff" },
    secondary: { main: "#ff9500", dark: "#cc7700", contrastText: "#000" },
    background: {
      default: "#0d0408",
      paper: "rgba(255,59,92,0.05)",
    },
    text: {
      primary: "#fff0f2",
      secondary: "#cc8899",
    },
    divider: "rgba(255,59,92,0.12)",
  },
  typography: baseTypography,
  shape: { borderRadius: 12 },
  components: makeComponents({
    primary: { main: "#ff3b5c", dark: "#cc2f4a", contrastText: "#fff" },
    secondary: { main: "#ff9500", dark: "#cc7700" },
    background: { default: "#0d0408", paper: "rgba(255,59,92,0.05)" },
  }),
});

// ─── STUDENT (placeholder — same as dark for now) ─────────────────────────────
export const studentTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#7c4dff", dark: "#6200ea", contrastText: "#fff" },
    secondary: { main: "#ffea00", dark: "#c8b900", contrastText: "#000" },
    background: {
      default: "#0f0f1a",
      paper: "rgba(124,77,255,0.06)",
    },
    text: {
      primary: "#eeeeff",
      secondary: "#9988cc",
    },
    divider: "rgba(124,77,255,0.12)",
  },
  typography: baseTypography,
  shape: { borderRadius: 12 },
  components: makeComponents({
    primary: { main: "#7c4dff", dark: "#6200ea", contrastText: "#fff" },
    secondary: { main: "#ffea00", dark: "#c8b900" },
    background: { default: "#0f0f1a", paper: "rgba(124,77,255,0.06)" },
  }),
});

export const windTheme = createTheme({
  name: "wind",
  palette: {
    mode: "dark",
    primary:   { main: "#1c6bba", dark: "#1450a0", contrastText: "#fff" },
    secondary: { main: "#c8d6e8", dark: "#a0b4cc", contrastText: "#000" },
    background: {
      default: "#060911",
      paper:   "rgba(28,107,186,0.06)",
    },
    text: {
      primary:   "#e8edf5",
      secondary: "#7a95b8",
    },
    divider: "rgba(28,107,186,0.15)",
  },
  typography: baseTypography,      // reuse your existing baseTypography
  shape: { borderRadius: 12 },
  components: makeComponents({     // reuse your existing makeComponents
    primary:    { main: "#1c6bba", dark: "#1450a0", contrastText: "#fff" },
    secondary:  { main: "#c8d6e8", dark: "#a0b4cc" },
    background: { default: "#060911", paper: "rgba(28,107,186,0.06)" },
  }),
});

// ─── BLOODMOON THEME ─────────────────────────────────────────────────────────
// Add this export to your theme.js
// Primary #c0173a is what NetworkBackground.js detects for the Bloodmoon animation
 
export const bloodmoonTheme = createTheme({
  name: "bloodmoon",
  palette: {
    mode: "dark",
    primary:   { main: "#c0173a", dark: "#96102c", contrastText: "#fff" },
    secondary: { main: "#ff6b35", dark: "#cc5220", contrastText: "#fff" },
    background: {
      default: "#08010305",
      paper:   "rgba(192,23,58,0.06)",
    },
    text: {
      primary:   "#fff0f2",
      secondary: "#b06070",
    },
    divider: "rgba(192,23,58,0.15)",
  },
  typography: baseTypography,
  shape: { borderRadius: 12 },
  components: makeComponents({
    primary:    { main: "#c0173a", dark: "#96102c", contrastText: "#fff" },
    secondary:  { main: "#ff6b35", dark: "#cc5220" },
    background: { default: "#080103", paper: "rgba(192,23,58,0.06)" },
  }),
});