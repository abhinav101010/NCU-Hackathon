import { useEffect, useState } from "react";
import {
  Container, Typography, Box, Grid, Button, Paper, CircularProgress, Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { API } from "../utils/common.js";
import logo from "../utils/logo.png";

// ─── TIER META (ui only, not touched by table logic) ─────────────────────────
const TIER_META = {
  silver:   { emoji: "🥈", color: "#a8b2c1", glow: "#a8b2c180", gradient: "linear-gradient(135deg,#8d9db0,#c8d4e0)", rank: 1 },
  gold:     { emoji: "🥇", color: "#f5c842", glow: "#f5c84280", gradient: "linear-gradient(135deg,#d4a017,#f5c842)", rank: 2 },
  platinum: { emoji: "💎", color: "#a0d8ef", glow: "#a0d8ef80", gradient: "linear-gradient(135deg,#6bb8d4,#c8eaf8)", rank: 3 },
  "co-title": { emoji: "🏆", color: "#c084fc", glow: "#c084fc80", gradient: "linear-gradient(135deg,#9333ea,#c084fc)", rank: 4 },
  title:    { emoji: "👑", color: "#ff6b35", glow: "#ff6b3580", gradient: "linear-gradient(135deg,#e63900,#ff9a6c)", rank: 5, featured: true },
};

export default function SponsorsPage() {
  const theme = useTheme();
  const [selectedTier, setSelectedTier] = useState(null);
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  const primary = theme.palette.primary.main;
  const isDark = theme.palette.mode === "dark";

  // ── YOUR ORIGINAL DATA, UNTOUCHED ──────────────────────────────────────────
  const sponsorsTier = [
    { title: "Silver Sponsor",   tier: "silver"   },
    { title: "Gold Sponsor",     tier: "gold"     },
    { title: "Platinum Sponsor", tier: "platinum" },
    { title: "Co-Title Sponsor", tier: "co-title" },
    { title: "Title Sponsor",    tier: "title"    },
  ];

  const benefits = [
    {
      name: "Logo on Website & Social Media",
      tiers: { Silver: "yes", Gold: "yes", Platinum: "yes", "Co-Title": "yes", Title: "yes" },
    },
    {
      name: "Logo on Event Standees & Posters",
      tiers: { Gold: "yes", Platinum: "yes", "Co-Title": "yes", Title: "yes" },
    },
    {
      name: "Logo on Event Certificates",
      tiers: { Gold: "yes", Platinum: "yes", "Co-Title": "yes", Title: "yes" },
    },
    {
      name: "Branding During Event",
      tiers: { Silver: "yes", Gold: "yes", Platinum: "yes", "Co-Title": "yes", Title: "yes" },
    },
    {
      name: "Sponsor Stall Space",
      tiers: { Platinum: "Optional", "Co-Title": "5x10 ft", Title: "10x10 ft" },
    },
    {
      name: "Opportunity To Send Judges",
      tiers: { Platinum: "1-2", "Co-Title": "1-2", Title: "2" },
    },
    {
      name: "Mentor Panel Slot",
      tiers: { "Co-Title": "1", Title: "2" },
    },
    {
      name: "Promotion During Hackathon Sessions",
      tiers: { Platinum: "yes", "Co-Title": "yes", Title: "yes" },
    },
    {
      name: "Game / Activity Naming Rights",
      tiers: { "Co-Title": "yes", Title: "yes" },
    },
    {
      name: "Keynote Slot",
      tiers: { "Co-Title": "Optional", Title: "yes" },
    },
  ];

  const contacts = [
    { name: "Aayush Yadav", role: "Sponsorship", phone: "919306101432" },
  ];

  const message =
    "Hi, I'm interested in sponsoring the INNOVATHON. Could you please share more details?";

  // ── YOUR ORIGINAL FILTER LOGIC, UNTOUCHED ─────────────────────────────────
  const filteredSponsors = selectedTier
    ? sponsors.filter((s) => s?.tier?.toLowerCase() === selectedTier?.toLowerCase())
    : sponsors;

  useEffect(() => {
    fetch(`${API}/api/sponsors`)
      .then((res) => res.json())
      .then((data) => { setSponsors(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // YOUR ORIGINAL HELPER, UNTOUCHED
  const tierName = (title) => title.replace(" Sponsor", "");

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 12 }}>

      {/* ── PAGE TITLE ── */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Typography variant="h3" mt={15} sx={{
          textAlign: "center", fontWeight: 800, mb: 2,
          fontFamily: "'Syne', sans-serif",
          background: `linear-gradient(135deg, ${primary}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Sponsors & Partners
        </Typography>
        <Typography sx={{ textAlign: "center", color: theme.palette.text.secondary, mb: 10, fontSize: "1.05rem" }}>
          The organizations powering INNOVATHON 2026
        </Typography>
      </motion.div>

      {/* ── TIER CARDS ── */}
      <Box sx={{ mb: 10 }}>
        <Typography variant="overline" sx={{
          display: "block", textAlign: "center", mb: 5,
          letterSpacing: "0.2em", color: theme.palette.text.secondary, fontSize: "0.72rem",
        }}>
          Sponsorship Tiers · Click to filter
        </Typography>

        <Box sx={{
          display: "flex", justifyContent: "center",
          alignItems: "flex-end",
          gap: { xs: 1.5, md: 2 },
          flexWrap: "wrap",
        }}>
          {sponsorsTier.map((sponsor, i) => {
            const meta = TIER_META[sponsor.tier];
            const isSelected = selectedTier === sponsor.tier;
            const height = 130 + meta.rank * 20;

            return (
              <motion.div
                key={sponsor.tier}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Box
                  onClick={() => setSelectedTier(isSelected ? null : sponsor.tier)}
                  sx={{
                    width: { xs: 110, sm: 140, md: 158 },
                    height,
                    borderRadius: "20px",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    border: isSelected ? `2px solid ${meta.color}` : `1px solid ${meta.color}33`,
                    background: isDark
                      ? `linear-gradient(160deg, ${meta.color}16, ${meta.color}05)`
                      : `linear-gradient(160deg, ${meta.color}28, ${meta.color}08)`,
                    boxShadow: isSelected
                      ? `0 0 50px ${meta.glow}, 0 8px 30px ${meta.color}44`
                      : `0 4px 16px ${meta.color}18`,
                    transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "flex-end",
                    pb: 2.5, px: 1, userSelect: "none",
                  }}
                >
                  {/* top strip */}
                  <Box sx={{
                    position: "absolute", top: 0, left: 0, right: 0,
                    height: "3px", background: meta.gradient,
                  }} />

                  {/* glow blob for title tier */}
                  {meta.featured && (
                    <Box sx={{
                      position: "absolute", top: -20, left: "50%",
                      transform: "translateX(-50%)",
                      width: 120, height: 120, borderRadius: "50%",
                      background: `radial-gradient(circle, ${meta.color}2a 0%, transparent 70%)`,
                      pointerEvents: "none",
                    }} />
                  )}

                  <Typography sx={{ fontSize: meta.featured ? "2.4rem" : "1.8rem", lineHeight: 1, mb: 0.8 }}>
                    {meta.emoji}
                  </Typography>

                  <Typography sx={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 800,
                    fontSize: meta.featured ? "0.95rem" : "0.82rem",
                    color: meta.color, letterSpacing: "0.05em",
                    textAlign: "center", lineHeight: 1.2,
                  }}>
                    {tierName(sponsor.title)}
                  </Typography>

                  <Typography sx={{
                    fontSize: "0.6rem", color: theme.palette.text.secondary,
                    mt: 0.4, letterSpacing: "0.1em",
                  }}>
                    SPONSOR
                  </Typography>

                  {isSelected && (
                    <Chip label="✓" size="small" sx={{
                      mt: 1, height: 18, minWidth: 28,
                      fontSize: "0.65rem", fontWeight: 700,
                      background: `${meta.color}33`,
                      color: meta.color,
                      border: `1px solid ${meta.color}66`,
                      borderRadius: "6px",
                    }} />
                  )}
                </Box>
              </motion.div>
            );
          })}
        </Box>
      </Box>

      {/* ── SPONSORS LIST ── */}
      <Box sx={{ mb: 12 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mb: 5 }}>
          <Typography variant="h4" sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: primary }}>
            {(selectedTier ? tierName(sponsorsTier.find(s => s.tier === selectedTier)?.title || "") : "All").toUpperCase()} Sponsors
          </Typography>
          {/* {selectedTier && (
            <Button size="small" variant="outlined" onClick={() => setSelectedTier(null)}
              sx={{ borderRadius: "10px", fontSize: "0.75rem", py: 0.4 }}>
              Clear
            </Button>
          )} */}
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress sx={{ color: primary }} />
          </Box>
        ) : filteredSponsors.length === 0 ? (
          <Typography sx={{ textAlign: "center", color: theme.palette.text.secondary, py: 6 }}>
            No sponsors in this tier yet.
          </Typography>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {filteredSponsors.map((sponsor, i) => {
              const meta = TIER_META[sponsor.tier?.toLowerCase()] || TIER_META.silver;
              return (
                <Grid item key={sponsor._id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.88 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -6 }}
                  >
                    <Box sx={{ p: "1.5px", borderRadius: "18px", background: meta.gradient, boxShadow: `0 6px 28px ${meta.color}30` }}>
                      <Box sx={{
                        px: 4, py: 2.5, borderRadius: "16.5px",
                        background: theme.palette.background.paper,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        minWidth: 150, backdropFilter: "blur(10px)",
                      }}>
                        <Box component="img" src={`${API}${sponsor?.img}`} alt={sponsor?.name}
                          sx={{ height: 60, objectFit: "contain" }} />
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>

      {/* ── BENEFITS TABLE — data & logic unchanged ── */}
      <Box sx={{ mb: 14 }}>
        <Typography variant="h5" sx={{
          fontFamily: "'Syne', sans-serif", fontWeight: 700,
          textAlign: "center", mb: 6, color: primary,
        }}>
          What You Get
        </Typography>

        <Box sx={{
          borderRadius: "20px",
          border: `1px solid ${primary}25`,
          overflow: "hidden",
          backdropFilter: "blur(12px)",
        }}>
          {/* HEADER */}
          <Box sx={{
            display: "grid",
            gridTemplateColumns: `2fr repeat(${sponsorsTier.length}, 1fr)`,
            background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
            borderBottom: `1px solid ${primary}20`,
            px: 3, py: 2,
          }}>
            <Typography sx={{
              fontWeight: 700, fontSize: "0.75rem",
              color: theme.palette.text.secondary,
              letterSpacing: "0.1em", display: "flex", alignItems: "center",
            }}>
              BENEFITS
            </Typography>
            {sponsorsTier.map((tier) => {
              const meta = TIER_META[tier.tier];
              return (
                <Box key={tier.tier} sx={{ textAlign: "center" }}>
                  <Typography sx={{ fontSize: "1.1rem", lineHeight: 1 }}>{meta.emoji}</Typography>
                  <Typography sx={{
                    fontWeight: 700, fontSize: "0.62rem",
                    color: meta.color, letterSpacing: "0.05em", mt: 0.4,
                    display: { xs: "none", sm: "block" },
                  }}>
                    {tierName(tier.title).toUpperCase()}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* ROWS — exact same rendering logic you had */}
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              viewport={{ once: true }}
            >
              <Box sx={{
                display: "grid",
                gridTemplateColumns: `2fr repeat(${sponsorsTier.length}, 1fr)`,
                px: 3, py: 1.8,
                borderBottom: idx < benefits.length - 1
                  ? `1px solid ${isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"}`
                  : "none",
                background: idx % 2 !== 0
                  ? isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.012)"
                  : "transparent",
                transition: "background 0.2s",
                "&:hover": { background: `${primary}0a` },
              }}>
                <Typography sx={{
                  fontSize: "0.88rem", fontWeight: 500,
                  color: theme.palette.text.primary,
                  display: "flex", alignItems: "center",
                }}>
                  {benefit.name}
                </Typography>

                {sponsorsTier.map((tier) => {
                  const meta = TIER_META[tier.tier];
                  const value = benefit.tiers?.[tierName(tier.title)];
                  return (
                    <Box key={tier.tier} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      {value === "yes" && (
                        <CheckCircleIcon sx={{
                          fontSize: "1.15rem",
                          color: meta.color,
                          filter: `drop-shadow(0 0 4px ${meta.color}88)`,
                        }} />
                      )}
                      {value && value !== "yes" && (
                        <Typography sx={{
                          fontSize: "0.78rem", fontWeight: 700,
                          color: "#ffa726", textAlign: "center", lineHeight: 1.2,
                        }}>
                          {value}
                        </Typography>
                      )}
                      {!value && (
                        <Typography sx={{
                          fontSize: "1rem", color: theme.palette.text.disabled,
                          opacity: 0.35, lineHeight: 1,
                        }}>
                          —
                        </Typography>
                      )}
                    </Box>
                  );
                })}
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>

      {/* ── BECOME A SPONSOR ── */}
      <Box sx={{ mt: 14, textAlign: "center", mb: 6 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <Box sx={{
            display: "inline-block", px: 2.5, py: 0.7, borderRadius: "999px",
            background: `${primary}18`, border: `1px solid ${primary}33`, mb: 3,
          }}>
            <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: primary, letterSpacing: "0.14em" }}>
              PARTNERSHIP OPPORTUNITY
            </Typography>
          </Box>
          <Typography variant="h4" sx={{ mb: 2, color: primary, fontWeight: "bold" }}>
            Become a Sponsor
          </Typography>
          <Typography sx={{ color: theme.palette.text.secondary, mb: 6, lineHeight: 1.7, maxWidth: 720, mx: "auto" }}>
            Support the next generation of innovators by sponsoring the NCU Hackathon.
            Gain brand visibility, connect with talented developers, and showcase your
            technology to hundreds of participants.
          </Typography>
        </motion.div>
      </Box>

      {/* ── CONTACT CARDS ── */}
      <Grid container spacing={4} justifyContent="center">
        {contacts.map((person, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Paper elevation={0} sx={{
                p: 4, textAlign: "center", borderRadius: "20px",
                background: theme.palette.background.paper,
                border: `1px solid ${primary}22`,
                backdropFilter: "blur(12px)",
                boxShadow: `0 8px 32px ${primary}12`,
                transition: "all 0.3s ease",
                "&:hover": { transform: "translateY(-6px)", boxShadow: `0 16px 48px ${primary}28`, border: `1px solid ${primary}44` },
              }}>
                <Box sx={{
                  width: 52, height: 52, borderRadius: "14px", mx: "auto", mb: 2,
                  background: `linear-gradient(135deg, ${primary}33, ${theme.palette.secondary.main}33)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.4rem",
                }}>
                  🤝
                </Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>{person.name}</Typography>
                <Typography sx={{ color: primary, fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.1em", mb: 1.5 }}>
                  {person.role.toUpperCase()}
                </Typography>
                <Typography sx={{ color: theme.palette.text.secondary, mb: 3, fontSize: "0.9rem" }}>
                  +{person.phone}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<WhatsAppIcon />}
                  href={`https://wa.me/${person.phone}?text=${encodeURIComponent(message)}`}
                  target="_blank"
                  fullWidth
                  sx={{ borderRadius: "12px", py: 1.2 }}
                >
                  Message on WhatsApp
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

    </Container>
  );
}