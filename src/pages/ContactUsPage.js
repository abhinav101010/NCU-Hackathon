import React from "react";
import { Container, Typography, Box, Grid, Button, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const CONTACTS = [
  {
    name: "Jatin Dalal",
    role: "Common Query",
    phone: "919315431144",
    emoji: "💬",
    color: "#00d4ff",
  },
  {
    name: "Khushi Kaptiyal",
    role: "Helpdesk & FAQ",
    phone: "918595594917",
    emoji: "🛟",
    color: "#c084fc",
  },
  {
    name: "Aayush Yadav",
    role: "Sponsorship",
    phone: "919306101432",
    emoji: "🤝",
    color: "#f5c842",
  },
  {
    name: "Ansh Gupta",
    role: "Social Media",
    phone: "917292072784",
    emoji: "📣",
    color: "#ff6b35",
  },
];

const WHATSAPP_MSG = encodeURIComponent(
  "Hello! I would like to know more about the Hackathon."
);

export default function ContactUsPage() {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const isDark = theme.palette.mode === "dark";

  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 12 }}>

      {/* ── HEADER ── */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Chip
            label="We're here to help"
            sx={{
              mb: 3, px: 1,
              fontSize: "0.78rem", fontWeight: 600,
              background: `${primary}18`, color: primary,
              border: `1px solid ${primary}44`,
              borderRadius: "999px",
            }}
          />
          <Typography variant="h2" sx={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800, mb: 2,
            fontSize: { xs: "2.2rem", md: "3rem" },
            background: `linear-gradient(135deg, ${primary}, ${secondary})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Contact Us
          </Typography>
          <Typography sx={{
            color: theme.palette.text.secondary,
            maxWidth: 500, mx: "auto",
            lineHeight: 1.8, fontSize: "1rem",
          }}>
            Have a question? Reach out to the right person directly via WhatsApp.
            We typically respond within a few hours.
          </Typography>
        </Box>
      </motion.div>

      {/* ── CONTACT CARDS ── */}
      <Grid container spacing={3} sx={{ mb: 10 }}>
        {CONTACTS.map((person, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.09 }}
              viewport={{ once: true }}
            >
              <Box sx={{
                p: 3, borderRadius: "20px",
                background: theme.palette.background.paper,
                border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"}`,
                transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                "&:hover": {
                  border: `1px solid ${person.color}55`,
                  boxShadow: `0 8px 32px ${person.color}20`,
                  transform: "translateY(-5px)",
                },
              }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}>
                  {/* AVATAR */}
                  <Box sx={{
                    width: 52, height: 52, flexShrink: 0,
                    borderRadius: "16px",
                    background: `linear-gradient(135deg, ${person.color}28, ${person.color}10)`,
                    border: `1px solid ${person.color}33`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.5rem",
                  }}>
                    {person.emoji}
                  </Box>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700, fontSize: "1rem",
                      lineHeight: 1.2,
                    }}>
                      {person.name}
                    </Typography>
                    <Chip
                      label={person.role}
                      size="small"
                      sx={{
                        mt: 0.5, height: 20,
                        fontSize: "0.65rem", fontWeight: 700,
                        background: `${person.color}20`,
                        color: person.color,
                        border: `1px solid ${person.color}44`,
                        borderRadius: "6px",
                      }}
                    />
                  </Box>
                </Box>

                {/* PHONE */}
                <Typography sx={{
                  fontSize: "0.82rem",
                  color: theme.palette.text.secondary,
                  mb: 2.5, ml: 0.5,
                }}>
                  +{person.phone}
                </Typography>

                {/* WHATSAPP BUTTON */}
                <Button
                  variant="contained"
                  startIcon={<WhatsAppIcon />}
                  href={`https://wa.me/${person.phone}?text=${WHATSAPP_MSG}`}
                  target="_blank"
                  fullWidth
                  sx={{
                    borderRadius: "12px",
                    py: 1.1,
                    background: `linear-gradient(135deg, #25d366, #1ebe5d)`,
                    boxShadow: "0 4px 16px #25d36644",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    "&:hover": {
                      background: `linear-gradient(135deg, #1ebe5d, #17a550)`,
                      boxShadow: "0 6px 24px #25d36666",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Message on WhatsApp
                </Button>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* ── INFO STRIP ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Box sx={{
          p: 3.5, borderRadius: "20px",
          background: `linear-gradient(135deg, ${primary}0a, ${secondary}08)`,
          border: `1px solid ${primary}22`,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 3,
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
        }}>
          {[
            {
              icon: <LocationOnIcon sx={{ fontSize: "1.1rem", color: primary }} />,
              label: "LOCATION",
              value: "The NorthCap University, Gurugram",
            },
            {
              icon: <EmailIcon sx={{ fontSize: "1.1rem", color: primary }} />,
              label: "EMAIL",
              value: "cloudiotclub@ncuindia.edu",
              href: "mailto:cloudiotclub@ncuindia.edu",
            },
            {
              icon: <WhatsAppIcon sx={{ fontSize: "1.1rem", color: primary }} />,
              label: "RESPONSE TIME",
              value: "Within a few hours",
            },
          ].map((item, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box sx={{
                width: 36, height: 36, borderRadius: "10px",
                background: `${primary}14`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {item.icon}
              </Box>
              <Box>
                <Typography sx={{
                  fontSize: "0.62rem", fontWeight: 700,
                  color: theme.palette.text.disabled,
                  letterSpacing: "0.12em",
                }}>
                  {item.label}
                </Typography>
                {item.href ? (
                  <Typography
                    component="a"
                    href={item.href}
                    sx={{
                      fontSize: "0.82rem", fontWeight: 500,
                      color: primary, textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {item.value}
                  </Typography>
                ) : (
                  <Typography sx={{ fontSize: "0.82rem", fontWeight: 500 }}>
                    {item.value}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </motion.div>

    </Container>
  );
}