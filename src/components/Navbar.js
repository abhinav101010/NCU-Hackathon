import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import logo from "../utils/logo.svg"
import { calculateTimeLeft } from "../utils/common";

export default function Navbar({ themeName, setThemeName }) {
  const theme = useTheme();

  const isLight = theme.palette.mode === "light";

  return (
    <AppBar
      position="fixed"
      sx={{
        background: isLight ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.6)",

        color: theme.palette.text.primary,

        backdropFilter: "blur(10px)",

        borderBottom: `1px solid ${theme.palette.primary.main}30`,
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{
            fontWeight: "bold",
            textDecoration: "none",
            color: theme.palette.primary.main,
            letterSpacing: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <img src={logo} alt="Innovathon Logo" style={{ height: 32 }} />
          </Box>
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* Theme Selector */}
        <Select
          size="small"
          value={themeName}
          onChange={(e) => setThemeName(e.target.value)}
          sx={{
            mr: 3,
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.primary.main}40`,
            ".MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        >
          <MenuItem value="light">Light</MenuItem>
          <MenuItem value="dark">Dark Neon</MenuItem>
          <MenuItem value="student">Student</MenuItem>
        </Select>

        {/* Navigation Links */}
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>

        <Button component={Link} to="/sponsors" color="inherit">
          Sponsors
        </Button>

        <Button component={Link} to="/faq" color="inherit">
          FAQ
        </Button>

        <Button component={Link} to="/about" color="inherit">
          About
        </Button>

        <Button component={Link} to="/contact" color="inherit">
          Contact
        </Button>

        {/* Register Button */}
        <Button
          disabled={calculateTimeLeft().expired}
          component={Link}
          to="/register"
          variant="contained"
          color="secondary"
          sx={{ ml: 2, fontWeight: "bold" }}
        >
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
}
