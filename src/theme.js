import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00ffa3" },
    secondary: { main: "#ff0080" },
    background: {
      default: "#0a0a0a",
      paper: "rgba(255,255,255,0.05)",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          borderRadius: "16px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedSecondary: {
          boxShadow: "0 0 20px #ff0080",
        },
        containedPrimary: {
          boxShadow: "0 0 20px #00ffa3",
        },
      },
    },
  },
});

export default theme;