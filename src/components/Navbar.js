import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Select,
  MenuItem
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function Navbar({ themeName, setThemeName }) {
  const theme = useTheme();

  const isLight = theme.palette.mode === "light";

  return (
    <AppBar
      position="fixed"
      sx={{
        background: isLight
          ? "rgba(255,255,255,0.9)"
          : "rgba(0,0,0,0.6)",

        color: theme.palette.text.primary,

        backdropFilter: "blur(10px)",

        // borderBottom: `1px solid ${theme.palette.primary.main}40`,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            // color: theme.palette.primary.main,
          }}
        >
          HACKATHON
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* THEME SELECTOR */}
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
          <MenuItem value="dark">Dark Neon</MenuItem>
          <MenuItem value="light">Light</MenuItem>
          <MenuItem value="student">Student</MenuItem>
        </Select>

        <Button component={Link} to="/" color="inherit">
          Home
        </Button>

        <Button component={Link} to="/dashboard" color="inherit">
          Dashboard
        </Button>

        <Button component={Link} to="/faq" color="inherit">
          FAQ's
        </Button>

        <Button component={Link} to="/about" color="inherit">
          About Us
        </Button>

        <Button component={Link} to="/contact" color="inherit">
          Contact Us
        </Button>

        <Button
          component={Link}
          to="/register"
          variant="contained"
          color="secondary"
          sx={{ ml: 2 }}
        >
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
}