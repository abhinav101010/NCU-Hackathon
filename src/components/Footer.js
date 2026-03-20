import { Box, Typography, Grid, Link, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../utils/logo.png";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";

const QUICK_LINKS = [
  { label: "Home",     to: "/"        },
  { label: "Themes",  to: "/themes"  },
  { label: "Events",  to: "/events"  },
  { label: "Rules",   to: "/rules"   },
  { label: "Sponsors",to: "/sponsors"},
];

const MORE_LINKS = [
  { label: "FAQ",     to: "/faq"     },
  { label: "About",   to: "/about"   },
  { label: "Contact", to: "/contact" },
  { label: "Register",to: "/register"},
  { label: "Login",   to: "/login"   },
];

const SOCIALS = [
  // { icon: <GitHubIcon fontSize="small" />,    href: "#", label: "GitHub"    },
  // { icon: <LinkedInIcon fontSize="small" />,  href: "#", label: "LinkedIn"  },
  { icon: <InstagramIcon fontSize="small" />, href: "#", label: "Instagram" },
  // { icon: <EmailIcon fontSize="small" />,     href: "mailto:cloudiotclub@ncuindia.edu", label: "Email" },
];

export default function Footer() {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        overflow: "hidden",
        mt: 10,
        borderTop: `1px solid ${primary}18`,
        background: isDark
          ? "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%)"
          : "linear-gradient(180deg, transparent 0%, rgba(240,245,255,0.9) 100%)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* GLOW BLOB */}
      <Box sx={{
        position: "absolute",
        width: 500, height: 300,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${primary}0e 0%, transparent 70%)`,
        top: 0, left: "50%",
        transform: "translateX(-50%)",
        pointerEvents: "none",
      }} />

      {/* TOP ACCENT LINE */}
      <Box sx={{
        height: "2px",
        background: `linear-gradient(90deg, transparent, ${primary}66, ${secondary}66, transparent)`,
      }} />

      <Box sx={{ px: { xs: 3, md: 8 }, pt: 7, pb: 4, position: "relative", zIndex: 1 }}>
        <Grid container spacing={5}>

          {/* ── BRAND ── */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                <img src={logo} alt="Innovathon" style={{ height: 48 }} />
                <Box>
                  <Typography sx={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    color: primary,
                    letterSpacing: "0.06em",
                    lineHeight: 1,
                  }}>
                    INNOVATHON
                  </Typography>
                  <Typography sx={{
                    fontSize: "0.62rem",
                    color: theme.palette.text.secondary,
                    letterSpacing: "0.14em",
                    lineHeight: 1,
                    mt: 0.3,
                  }}>
                    2026 · NCU GURUGRAM
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" sx={{
                color: theme.palette.text.secondary,
                maxWidth: 320, lineHeight: 1.8,
                fontSize: "0.88rem", mb: 3,
              }}>
                Build. Innovate. Transform. Join 500+ developers, designers,
                and problem-solvers for a 56-hour journey of creativity and technology.
              </Typography>

              {/* SOCIAL ICONS */}
              <Box sx={{ display: "flex", gap: 1 }}>
                {SOCIALS.map((s) => (
                  <IconButton
                    key={s.label}
                    component="a"
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    size="small"
                    sx={{
                      width: 34, height: 34,
                      border: `1px solid ${primary}28`,
                      borderRadius: "10px",
                      color: theme.palette.text.secondary,
                      background: `${primary}08`,
                      transition: "all 0.25s ease",
                      "&:hover": {
                        color: primary,
                        background: `${primary}18`,
                        border: `1px solid ${primary}55`,
                        transform: "translateY(-3px)",
                        boxShadow: `0 4px 16px ${primary}33`,
                      },
                    }}
                  >
                    {s.icon}
                  </IconButton>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* ── QUICK LINKS ── */}
          <Grid item xs={6} sm={4} md={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Typography sx={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700, fontSize: "0.72rem",
                letterSpacing: "0.14em",
                color: primary, mb: 2.5,
              }}>
                EXPLORE
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                {QUICK_LINKS.map((l) => (
                  <Link
                    key={l.to}
                    component={RouterLink}
                    to={l.to}
                    underline="none"
                    sx={{
                      fontSize: "0.88rem",
                      color: theme.palette.text.secondary,
                      transition: "all 0.2s ease",
                      display: "flex", alignItems: "center", gap: 0.8,
                      "&:hover": {
                        color: primary,
                        transform: "translateX(4px)",
                      },
                      "&:hover::before": {
                        opacity: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "inline-block",
                        width: 4, height: 4,
                        borderRadius: "50%",
                        background: primary,
                        opacity: 0,
                        transition: "opacity 0.2s",
                        flexShrink: 0,
                      },
                    }}
                  >
                    {l.label}
                  </Link>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* ── MORE LINKS ── */}
          <Grid item xs={6} sm={4} md={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <Typography sx={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700, fontSize: "0.72rem",
                letterSpacing: "0.14em",
                color: primary, mb: 2.5,
              }}>
                MORE
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                {MORE_LINKS.map((l) => (
                  <Link
                    key={l.to}
                    component={RouterLink}
                    to={l.to}
                    underline="none"
                    sx={{
                      fontSize: "0.88rem",
                      color: theme.palette.text.secondary,
                      transition: "all 0.2s ease",
                      display: "flex", alignItems: "center",
                      "&:hover": {
                        color: primary,
                        transform: "translateX(4px)",
                      },
                      "&::before": {
                        content: '""',
                        display: "inline-block",
                        width: 4, height: 4,
                        borderRadius: "50%",
                        background: primary,
                        opacity: 0,
                        transition: "opacity 0.2s",
                        flexShrink: 0,
                        mr: 0.8,
                      },
                      "&:hover::before": { opacity: 1 },
                    }}
                  >
                    {l.label}
                  </Link>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* ── CONTACT ── */}
          <Grid item xs={12} sm={4} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Typography sx={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700, fontSize: "0.72rem",
                letterSpacing: "0.14em",
                color: primary, mb: 2.5,
              }}>
                CONTACT
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                  <Box sx={{
                    width: 28, height: 28, borderRadius: "8px", flexShrink: 0,
                    background: `${primary}18`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <LocationOnIcon sx={{ fontSize: "0.9rem", color: primary }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, lineHeight: 1.2 }}>
                      The NorthCap University
                    </Typography>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                      Gurugram, Haryana
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                  <Box sx={{
                    width: 28, height: 28, borderRadius: "8px", flexShrink: 0,
                    background: `${primary}18`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <EmailIcon sx={{ fontSize: "0.9rem", color: primary }} />
                  </Box>
                  <Link
                    href="mailto:cloudiotclub@ncuindia.edu"
                    underline="hover"
                    sx={{ fontSize: "0.82rem", color: theme.palette.text.secondary, "&:hover": { color: primary } }}
                  >
                    cloudiotclub@ncuindia.edu
                  </Link>
                </Box>

                {/* EVENT INFO PILL */}
                <Box sx={{
                  mt: 1, px: 2, py: 1.2,
                  borderRadius: "12px",
                  background: `${primary}0e`,
                  border: `1px solid ${primary}22`,
                  display: "flex", flexDirection: "column", gap: 0.5,
                }}>
                  {[
                    ["📅", "March 26–28, 2026"],
                    ["⏱️", "56 Hour Hackathon"],
                    ["🏆", "₹50,000+ Prize Pool"],
                  ].map(([icon, text]) => (
                    <Box key={text} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography sx={{ fontSize: "0.8rem", lineHeight: 1 }}>{icon}</Typography>
                      <Typography sx={{ fontSize: "0.78rem", color: theme.palette.text.secondary }}>
                        {text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>

        </Grid>

        {/* ── DIVIDER ── */}
        <Box sx={{
          mt: 6, mb: 3,
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${primary}22, transparent)`,
        }} />

        {/* ── BOTTOM BAR ── */}
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
        }}>
          <Typography variant="caption" sx={{ color: theme.palette.text.disabled, fontSize: "0.75rem" }}>
            © 2026 INNOVATHON · The NorthCap University
          </Typography>
          <Typography variant="caption" sx={{ color: theme.palette.text.disabled, fontSize: "0.75rem" }}>
            Built with ❤️ by{" "}
            <Box component="span" sx={{ color: primary, fontWeight: 600 }}>CURE</Box>
          </Typography>
        </Box>

      </Box>
    </Box>
  );
}