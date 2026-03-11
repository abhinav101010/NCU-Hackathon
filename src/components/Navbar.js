import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import logo from "../utils/logo.png";
import { calculateTimeLeft } from "../utils/common";

export default function Navbar({ themeName, setThemeName }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Sponsors", path: "/sponsors" },
    { name: "FAQ", path: "/faq" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const drawer = (
    <Box
      sx={{
        width: 250,
        p: 2,
      }}
      role="presentation"
      onClick={toggleDrawer}
    >
      <List>
        {navLinks.map((item) => (
          <ListItem button component={Link} to={item.path} key={item.name}>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}

        <ListItem>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
          >
            Login
          </Button>
        </ListItem>

        <ListItem>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            fullWidth
            disabled={calculateTimeLeft().expired}
            sx={{ mt: 1 }}
          >
            Register
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: isLight
            ? "rgba(255,255,255,0.9)"
            : "rgba(0,0,0,0.6)",
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
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <img src={logo} alt="Innovathon Logo" style={{ height: 40 }} />
            INNOVATHON
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <Select
              size="small"
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              sx={{
                mr: 3,
                color: theme.palette.text.primary,
                border: `1px solid ${theme.palette.primary.main}40`,
                ".MuiOutlinedInput-notchedOutline": { border: "none" },
              }}
            >
              <MenuItem value="light">Light</MenuItem>
              <MenuItem value="dark">Dark Neon</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </Select>

            {navLinks.map((link) => (
              <Button
                key={link.name}
                component={Link}
                to={link.path}
                color="inherit"
              >
                {link.name}
              </Button>
            ))}

            <Button
              component={Link}
              to="/login"
              variant="outlined"
              color="secondary"
              sx={{ ml: 2, fontWeight: "bold" }}
            >
              Login
            </Button>

            <Button
              component={Link}
              to="/register"
              variant="contained"
              color="secondary"
              disabled={calculateTimeLeft().expired}
              sx={{ ml: 2, fontWeight: "bold" }}
            >
              Register
            </Button>
          </Box>

          {/* Mobile Hamburger */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            color="inherit"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        {drawer}
      </Drawer>
    </>
  );
}