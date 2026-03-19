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
  ListItemIcon,
  Chip,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import GavelIcon from "@mui/icons-material/Gavel";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../utils/logo.png";
import { calculateTimeLeft } from "../utils/common";

const NAV_LINKS = [
  { label: "Home",     to: "/",        icon: <HomeIcon fontSize="small" /> },
  { label: "Events",   to: "/events",  icon: <EmojiEventsOutlinedIcon fontSize="small" /> },
  { label: "Themes",   to: "/themes",  icon: <PaletteOutlinedIcon fontSize="small" /> },
  { label: "Rules",    to: "/rules",   icon: <GavelIcon fontSize="small" /> },
  { label: "Sponsors", to: "/sponsors",icon: <StarIcon fontSize="small" /> },
  { label: "FAQ",      to: "/faq",     icon: <HelpOutlineIcon fontSize="small" /> },
  { label: "About",    to: "/about",   icon: <InfoOutlinedIcon fontSize="small" /> },
  { label: "Contact",  to: "/contact", icon: <EmailOutlinedIcon fontSize="small" /> },
];

const THEME_OPTIONS = [
  { value: "dark",    label: "🌑 Dark Neon" },
  { value: "light",   label: "☀️ Light"     },
  { value: "ocean",   label: "🌊 Ocean"     },
  { value: "crimson", label: "🔥 Crimson"   },
  { value: "student", label: "🎓 Student"   },
  { value: "wind", label: "💨 Windy" },
];

export default function Navbar({ themeName, setThemeName }) {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  // close drawer on route change
  useEffect(() => { setDrawerOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const primary    = theme.palette.primary.main;
  const secondary  = theme.palette.secondary.main;
  const isDark     = theme.palette.mode === "dark";

  const navBg = isDark
    ? scrolled ? "rgba(8,8,16,0.96)" : "rgba(8,8,16,0.45)"
    : scrolled ? "rgba(248,250,255,0.96)" : "rgba(248,250,255,0.75)";

  const expired = calculateTimeLeft().expired;

  /* ── SIDEBAR CONTENT ─────────────────────────────────────────────────────── */
  const SidebarContent = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: isDark
          ? `linear-gradient(160deg, ${theme.palette.background.default} 0%, rgba(8,8,24,1) 100%)`
          : `linear-gradient(160deg, #f8faff 0%, #eef2ff 100%)`,
        overflowY: "auto",
      }}
    >
      {/* ── HEADER ── */}
      <Box
        sx={{
          px: 2.5, pt: 2.5, pb: 2,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: `1px solid ${primary}18`,
        }}
      >
        <Box
          component={Link}
          to="/"
          sx={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 1.2 }}
        >
          <img src={logo} alt="Innovathon" style={{ height: 34 }} />
          <Box>
            <Typography
              sx={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800, fontSize: "1rem", lineHeight: 1,
                color: primary, letterSpacing: "0.06em",
              }}
            >
              INNOVATHON
            </Typography>
            <Typography sx={{ fontSize: "0.58rem", color: theme.palette.text.secondary, letterSpacing: "0.12em" }}>
              2026
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={() => setDrawerOpen(false)}
          size="small"
          sx={{
            color: theme.palette.text.secondary,
            border: `1px solid ${primary}22`,
            borderRadius: "10px",
            p: 0.6,
            "&:hover": { color: primary, borderColor: `${primary}55`, background: `${primary}10` },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* ── NAV LINKS ── */}
      <Box sx={{ px: 1.5, pt: 1.5, flexGrow: 1 }}>
        <Typography
          sx={{
            px: 1.5, pb: 1,
            fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em",
            color: theme.palette.text.secondary, textTransform: "uppercase",
          }}
        >
          Navigation
        </Typography>
        <List disablePadding sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
          {NAV_LINKS.map((link, i) => {
            const active = isActive(link.to);
            return (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.045, duration: 0.25 }}
              >
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to={link.to}
                    sx={{
                      borderRadius: "12px",
                      px: 1.8, py: 1.1,
                      background: active ? `${primary}16` : "transparent",
                      border: active ? `1px solid ${primary}30` : "1px solid transparent",
                      color: active ? primary : theme.palette.text.primary,
                      fontWeight: active ? 700 : 500,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        background: `${primary}10`,
                        color: primary,
                        border: `1px solid ${primary}22`,
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 34,
                        color: active ? primary : theme.palette.text.secondary,
                      }}
                    >
                      {link.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={link.label}
                      primaryTypographyProps={{
                        fontSize: "0.9rem",
                        fontWeight: active ? 700 : 500,
                        fontFamily: "Inter, sans-serif",
                      }}
                    />
                    {active && (
                      <Box
                        sx={{
                          width: 6, height: 6, borderRadius: "50%",
                          background: primary,
                          boxShadow: `0 0 8px ${primary}`,
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              </motion.div>
            );
          })}
        </List>

        {/* ── THEME SWITCHER ── */}
        <Box sx={{ mt: 2.5, mb: 1 }}>
          <Typography
            sx={{
              px: 1.5, pb: 1,
              fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em",
              color: theme.palette.text.secondary, textTransform: "uppercase",
            }}
          >
            Appearance
          </Typography>
          <Box sx={{ px: 1 }}>
            <Select
              size="small"
              fullWidth
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              sx={{
                fontSize: "0.82rem", fontWeight: 600,
                color: theme.palette.text.primary,
                borderRadius: "12px",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: `${primary}33`, borderRadius: "12px" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: `${primary}77` },
                "& .MuiSelect-icon": { color: primary },
                background: `${primary}08`,
              }}
            >
              {THEME_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: "0.82rem" }}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      </Box>

      {/* ── BOTTOM CTA ── */}
      <Box
        sx={{
          px: 2, pb: 3, pt: 2,
          borderTop: `1px solid ${primary}18`,
          display: "flex", flexDirection: "column", gap: 1.2,
        }}
      >
        {expired && (
          <Chip
            label="Registration Closed"
            size="small"
            sx={{
              fontSize: "0.7rem", fontWeight: 600,
              background: "rgba(255,59,92,0.12)", color: "#ff3b5c",
              border: "1px solid rgba(255,59,92,0.25)", borderRadius: "8px",
              alignSelf: "center",
            }}
          />
        )}
        <Button
          component={Link}
          to="/login"
          variant="outlined"
          fullWidth
          startIcon={<LoginIcon fontSize="small" />}
          sx={{
            borderRadius: "12px", fontSize: "0.84rem", fontWeight: 600,
            py: 1, borderColor: `${primary}55`,
            color: primary,
            "&:hover": { borderColor: primary, background: `${primary}10` },
          }}
        >
          Login
        </Button>
        <Button
          component={Link}
          to="/register"
          variant="contained"
          fullWidth
          disabled={expired}
          startIcon={<AppRegistrationIcon fontSize="small" />}
          sx={{
            borderRadius: "12px", fontSize: "0.84rem", fontWeight: 700,
            py: 1,
            background: `linear-gradient(135deg, ${secondary}, ${secondary}cc)`,
            boxShadow: `0 4px 18px ${secondary}44`,
            "&:hover": { boxShadow: `0 6px 24px ${secondary}66` },
          }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );

  /* ── RENDER ──────────────────────────────────────────────────────────────── */
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: navBg,
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: scrolled
            ? `1px solid ${primary}22`
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
              display: "flex", alignItems: "center", gap: 1.5,
              mr: 3, flexShrink: 0,
            }}
          >
            <img src={logo} alt="Innovathon" style={{ height: 38 }} />
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography
                sx={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800, fontSize: "1.1rem", lineHeight: 1,
                  color: primary, letterSpacing: "0.06em",
                }}
              >
                INNOVATHON
              </Typography>
              <Typography
                sx={{ fontSize: "0.6rem", color: theme.palette.text.secondary, letterSpacing: "0.12em" }}
              >
                2026
              </Typography>
            </Box>
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* DESKTOP NAV LINKS */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mr: 2 }}>
              {NAV_LINKS.map((link) => (
                <Button
                  key={link.to}
                  component={Link}
                  to={link.to}
                  size="small"
                  sx={{
                    color: isActive(link.to) ? primary : theme.palette.text.secondary,
                    fontWeight: isActive(link.to) ? 700 : 500,
                    fontSize: "0.82rem",
                    px: 1.2, py: 0.6,
                    borderRadius: "8px",
                    "&:hover": { color: primary, background: `${primary}12` },
                    ...(isActive(link.to) && { background: `${primary}14` }),
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          {/* THEME SWITCHER — desktop only */}
          {!isMobile && (
            <Select
              size="small"
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              sx={{
                mr: 1.5, fontSize: "0.78rem", fontWeight: 600,
                color: theme.palette.text.primary,
                "& .MuiOutlinedInput-notchedOutline": { borderColor: `${primary}33`, borderRadius: "10px" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: `${primary}88` },
                "& .MuiSelect-icon": { color: primary },
                minWidth: 124,
              }}
            >
              {THEME_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: "0.82rem" }}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          )}

          {/* DESKTOP CTA BUTTONS */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                component={Link} to="/login"
                variant="outlined" size="small" color="primary"
                sx={{ borderRadius: "10px", px: 2, fontSize: "0.8rem" }}
              >
                Login
              </Button>
              <Button
                component={Link} to="/register"
                variant="contained" size="small" color="secondary"
                disabled={expired}
                sx={{ borderRadius: "10px", px: 2, fontSize: "0.8rem" }}
              >
                Register
              </Button>
            </Box>
          )}

          {/* MOBILE: theme switcher (compact) + hamburger */}
          {isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Select
                size="small"
                value={themeName}
                onChange={(e) => setThemeName(e.target.value)}
                sx={{
                  fontSize: "0.72rem", fontWeight: 600,
                  color: theme.palette.text.primary,
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: `${primary}33`, borderRadius: "9px" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: `${primary}77` },
                  "& .MuiSelect-icon": { color: primary },
                  "& .MuiSelect-select": { py: "5px", px: "10px", pr: "28px !important" },
                  minWidth: 100,
                }}
                renderValue={(v) => THEME_OPTIONS.find(o => o.value === v)?.label.split(" ")[0] ?? v}
              >
                {THEME_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: "0.82rem" }}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>

              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{
                  color: primary,
                  border: `1px solid ${primary}33`,
                  borderRadius: "10px",
                  p: 0.8,
                  "&:hover": { background: `${primary}12`, borderColor: `${primary}66` },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* MOBILE SIDEBAR DRAWER */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            border: "none",
            boxShadow: isDark
              ? `-4px 0 40px rgba(0,0,0,0.6), -1px 0 0 ${primary}18`
              : `-4px 0 40px rgba(0,0,0,0.12), -1px 0 0 ${primary}18`,
          },
        }}
        SlideProps={{ timeout: 280 }}
      >
        {SidebarContent}
      </Drawer>
    </>
  );
}