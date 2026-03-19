import { Container, Typography, Box, Grid, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import TimerIcon from "@mui/icons-material/Timer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import CodeIcon from "@mui/icons-material/Code";
import HandshakeIcon from "@mui/icons-material/Handshake";

const STATS = [
  { icon: <TimerIcon />,       value: "56",    label: "Hours"        },
  { icon: <EmojiEventsIcon />, value: "₹50k+", label: "Prize Pool"   },
  { icon: <GroupsIcon />,      value: "500+",  label: "Participants" },
  { icon: <LocationOnIcon />,  value: "NCU",   label: "Gurugram"     },
];

const PILLARS = [
  {
    icon: <CodeIcon sx={{ fontSize: "1.6rem" }} />,
    title: "Build",
    desc: "Turn raw ideas into working prototypes within 56 hours. Ship fast, ship bold.",
  },
  {
    icon: <HandshakeIcon sx={{ fontSize: "1.6rem" }} />,
    title: "Collaborate",
    desc: "Work alongside developers, designers, and domain experts from across India.",
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: "1.6rem" }} />,
    title: "Conquer",
    desc: "Compete for ₹50k+ in prizes, recognition, and real-world opportunities.",
  },
  {
    icon: <LightbulbIcon sx={{ fontSize: "1.6rem" }} />,
    title: "Innovate",
    desc: "Tackle real-world problems with creative, technology-driven solutions.",
  },
];

export default function AboutPage() {
  const theme     = useTheme();
  const primary   = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const isDark    = theme.palette.mode === "dark";

  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 12 }}>

      {/* ── HERO ── */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Chip
            label="NorthCap University · March 2026"
            sx={{
              mb: 3, px: 1,
              fontSize: "0.78rem", fontWeight: 600,
              background: `${primary}18`, color: primary,
              border: `1px solid ${primary}44`, borderRadius: "999px",
            }}
          />
          <Typography variant="h2" sx={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800, mb: 2,
            fontSize: { xs: "2.2rem", md: "3rem" },
            background: `linear-gradient(135deg, ${primary}, ${secondary})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            About INNOVATHON
          </Typography>
          <Typography sx={{
            color: theme.palette.text.secondary,
            maxWidth: 600, mx: "auto", lineHeight: 1.8, fontSize: "1rem",
          }}>
            INNOVATHON is NCU's flagship 56-hour innovation challenge where
            developers, designers, and problem-solvers converge to build
            creative technology solutions that tackle real-world problems.
          </Typography>
        </Box>
      </motion.div>

      {/* ── STATS — centered ── */}
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ mb: 10 }}
      >
        {STATS.map((s, i) => (
          <Grid item xs={6} sm={3} key={s.label}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <Box sx={{
                p: 2.5, borderRadius: "16px", textAlign: "center",
                background: `${primary}0a`,
                border: `1px solid ${primary}22`,
                transition: "all 0.3s ease",
                "&:hover": {
                  background: `${primary}14`,
                  border: `1px solid ${primary}44`,
                  transform: "translateY(-4px)",
                  boxShadow: `0 8px 24px ${primary}18`,
                },
              }}>
                <Box sx={{ color: primary, mb: 1, display: "flex", justifyContent: "center" }}>
                  {s.icon}
                </Box>
                <Typography sx={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800, fontSize: "1.6rem",
                  color: primary, lineHeight: 1,
                }}>
                  {s.value}
                </Typography>
                <Typography sx={{
                  fontSize: "0.72rem", color: theme.palette.text.secondary,
                  letterSpacing: "0.08em", mt: 0.5, fontWeight: 600,
                }}>
                  {s.label.toUpperCase()}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* ── PILLARS ── */}
      <Box sx={{ mb: 6 }}>
        <Typography sx={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700, fontSize: "0.72rem",
          letterSpacing: "0.16em", color: primary,
          textAlign: "center", mb: 4,
        }}>
          WHAT WE STAND FOR
        </Typography>

        <Grid container spacing={2.5} justifyContent="center">
          {PILLARS.map((p, i) => (
            <Grid item xs={12} sm={6} key={p.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Box sx={{
                  p: 3, borderRadius: "18px", textAlign: "center",
                  background: theme.palette.background.paper,
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"}`,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 1.5,
                  transition: "all 0.3s ease",
                  height: "100%",
                  "&:hover": {
                    border: `1px solid ${primary}44`,
                    boxShadow: `0 8px 28px ${primary}14`,
                    transform: "translateY(-4px)",
                  },
                }}>
                  <Box sx={{
                    width: 52, height: 52, borderRadius: "16px",
                    background: `linear-gradient(135deg, ${primary}22, ${secondary}18)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: primary,
                  }}>
                    {p.icon}
                  </Box>
                  <Typography sx={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700, fontSize: "1rem",
                  }}>
                    {p.title}
                  </Typography>
                  <Typography sx={{
                    fontSize: "0.85rem", color: theme.palette.text.secondary,
                    lineHeight: 1.65, textAlign: "center",
                  }}>
                    {p.desc}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

    </Container>
  );
}