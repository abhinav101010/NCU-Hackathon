// import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: { main: "#00ffa3" },
//     secondary: { main: "#ff0080" },
//     background: {
//       default: "#0a0a0a",
//       paper: "rgba(255,255,255,0.05)",
//     },
//   },
//   typography: {
//     fontFamily: "Inter, sans-serif",
//   },
//   components: {
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           background: "rgba(255,255,255,0.05)",
//           backdropFilter: "blur(20px)",
//           borderRadius: "16px",
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         containedSecondary: {
//           boxShadow: "0 0 20px #ff0080",
//         },
//         containedPrimary: {
//           boxShadow: "0 0 20px #00ffa3",
//         },
//       },
//     },
//   },
// });

// export const darkNeon = createTheme({
//   palette: {
//     mode: "dark",
//     primary: { main: "#00ffa3" },
//     secondary: { main: "#ff0080" },
//     background: {
//       default: "#0a0a0a",
//       paper: "rgba(255,255,255,0.05)",
//     },
//   },
//   typography: {
//     fontFamily: "Inter, sans-serif",
//   },
// });

// export const lightTheme = createTheme({
//   palette: {
//     mode: "light",
//     primary: { main: "#0077ff" },
//     secondary: { main: "#ff6b00" },
//     background: {
//       default: "#f5f7fb",
//       paper: "#ffffff",
//     },
//   },
//   typography: {
//     fontFamily: "Inter, sans-serif",
//   },
// });

// export const studentTheme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: { main: "#7c4dff" },
//     secondary: { main: "#ffea00" },
//     background: {
//       default: "#0f0f1a",
//       paper: "rgba(124,77,255,0.08)",
//     },
//   },
//   typography: {
//     fontFamily: "Inter, sans-serif",
//   },
// });

// export default theme;


import { createTheme } from "@mui/material/styles";

const baseComponents = {
  MuiCard: {
    styleOverrides: {
      root: {
        backdropFilter: "blur(20px)",
        borderRadius: "16px",
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      containedSecondary: {
        boxShadow: "0 0 20px currentColor",
      },
      containedPrimary: {
        boxShadow: "0 0 20px currentColor",
      },
    },
  },
};

export const darkNeon = createTheme({
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
  components: baseComponents,
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0077ff" },
    secondary: { main: "#ff6b00" },
    background: {
      default: "#f5f7fb",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: baseComponents,
});

export const studentTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#7c4dff" },
    secondary: { main: "#ffea00" },
    background: {
      default: "#0f0f1a",
      paper: "rgba(124,77,255,0.08)",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: baseComponents,
});