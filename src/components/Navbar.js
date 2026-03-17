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
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import logo from "../utils/logo.png";
import { calculateTimeLeft } from "../utils/common";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Sponsors", to: "/sponsors" },
  { label: "FAQ", to: "/faq" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const THEME_OPTIONS = [
  { value: "dark", label: "🌑 Dark Neon" },
  { value: "light", label: "☀️ Light" },
  { value: "ocean", label: "🌊 Ocean" },
  { value: "crimson", label: "🔥 Crimson" },
  { value: "student", label: "🎓 Student" },
];

export default function Navbar({ themeName, setThemeName }) {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const navBg =
    theme.palette.mode === "light"
      ? scrolled
        ? "rgba(248,250,255,0.92)"
        : "rgba(248,250,255,0.7)"
      : scrolled
      ? `rgba(${theme.palette.background.default.replace("#", "").match(/.{2}/g).map(h => parseInt(h,16)).join(",")},0.95)`
      : "rgba(0,0,0,0.3)";

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: navBg,
          backdropFilter: "blur(16px)",
          borderBottom: scrolled
            ? `1px solid ${theme.palette.primary.main}22`
            : "1px solid transparent",
          transition: "all 0.3s ease",
          color: theme.palette.text.primary,
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 }, minHeight: "64px !important" }}>
          {/* LOGO */}
          <Typography
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mr: 4,
              flexShrink: 0,
            }}
          >
            <img src={logo} alt="Innovathon" style={{ height: 38 }} />
            <Box>
              <Typography
                sx={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  lineHeight: 1,
                  color: theme.palette.primary.main,
                  letterSpacing: "0.06em",
                }}
              >
                INNOVATHON
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.6rem",
                  color: theme.palette.text.secondary,
                  letterSpacing: "0.12em",
                  lineHeight: 1,
                  mt: 0.2,
                }}
              >
                2026
              </Typography>
            </Box>
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* DESKTOP NAV */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mr: 2 }}>
              {NAV_LINKS.map((link) => (
                <Button
                  key={link.to}
                  component={Link}
                  to={link.to}
                  size="small"
                  sx={{
                    color: isActive(link.to)
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                    fontWeight: isActive(link.to) ? 700 : 500,
                    fontSize: "0.82rem",
                    px: 1.2,
                    py: 0.6,
                    borderRadius: "8px",
                    position: "relative",
                    "&:hover": {
                      color: theme.palette.primary.main,
                      background: `${theme.palette.primary.main}12`,
                    },
                    ...(isActive(link.to) && {
                      background: `${theme.palette.primary.main}14`,
                    }),
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          {/* THEME SWITCHER */}
          <Select
            size="small"
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
            sx={{
              mr: 1.5,
              fontSize: "0.78rem",
              fontWeight: 600,
              color: theme.palette.text.primary,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: `${theme.palette.primary.main}33`,
                borderRadius: "10px",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: `${theme.palette.primary.main}88`,
              },
              "& .MuiSelect-icon": { color: theme.palette.primary.main },
              minWidth: 120,
            }}
          >
            {THEME_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: "0.82rem" }}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>

          {/* CTA BUTTONS */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="small"
                color="primary"
                sx={{ borderRadius: "10px", px: 2, fontSize: "0.8rem" }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="small"
                color="secondary"
                disabled={calculateTimeLeft().expired}
                sx={{ borderRadius: "10px", px: 2, fontSize: "0.8rem" }}
              >
                Register
              </Button>
            </Box>
          )}

          {/* MOBILE MENU */}
          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: theme.palette.primary.main }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            background: theme.palette.background.default,
            borderLeft: `1px solid ${theme.palette.primary.main}22`,
            pt: 1,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, pb: 1 }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: theme.palette.text.secondary }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {NAV_LINKS.map((link) => (
            <ListItem key={link.to} disablePadding>
              <ListItemButton
                component={Link}
                to={link.to}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  px: 3,
                  color: isActive(link.to) ? theme.palette.primary.main : theme.palette.text.primary,
                  fontWeight: isActive(link.to) ? 700 : 400,
                }}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem sx={{ px: 3, pt: 2, gap: 1 }}>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              fullWidth
              size="small"
              onClick={() => setDrawerOpen(false)}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              color="secondary"
              fullWidth
              size="small"
              disabled={calculateTimeLeft().expired}
              onClick={() => setDrawerOpen(false)}
            >
              Register
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}