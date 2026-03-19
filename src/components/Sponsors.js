import { Box, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { API } from "../utils/common";

// Same tier metadata as SponsorsPage.js
const TIER_META = {
  Silver:    { color: "#a8b2c1", gradient: "linear-gradient(135deg,#8d9db0,#c8d4e0)", glow: "#a8b2c130" },
  Gold:      { color: "#f5c842", gradient: "linear-gradient(135deg,#d4a017,#f5c842)", glow: "#f5c84230" },
  Platinum:  { color: "#a0d8ef", gradient: "linear-gradient(135deg,#6bb8d4,#c8eaf8)", glow: "#a0d8ef30" },
  "Co-Title":{ color: "#c084fc", gradient: "linear-gradient(135deg,#9333ea,#c084fc)", glow: "#c084fc30" },
  Title:     { color: "#ff6b35", gradient: "linear-gradient(135deg,#e63900,#ff9a6c)", glow: "#ff6b3530" },
};

const DEFAULT_META = {
  color: "#888",
  gradient: "linear-gradient(135deg,#555,#888)",
  glow: "#88888830",
};

export default function Sponsors() {
  const theme = useTheme();
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/sponsors`)
      .then((res) => res.json())
      .then((data) => { setSponsors(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const primary = theme.palette.primary.main;
  const isDark  = theme.palette.mode === "dark";

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress size={28} sx={{ color: primary }} />
      </Box>
    );
  }

  if (!sponsors.length) return null;

  // Triple so the infinite scroll never gaps
  const loop = [...sponsors, ...sponsors, ...sponsors];

  return (
    <Box
      sx={{
        position: "relative",
        py: 5,
        overflow: "hidden",
        background: isDark
          ? `linear-gradient(180deg, transparent, ${primary}08 40%, ${primary}08 60%, transparent)`
          : `linear-gradient(180deg, transparent, ${primary}06 40%, ${primary}06 60%, transparent)`,
        borderTop:    `1px solid ${primary}18`,
        borderBottom: `1px solid ${primary}18`,
      }}
    >
      {/* LABEL */}
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          color: theme.palette.text.secondary,
          mb: 3,
          textTransform: "uppercase",
          opacity: 0.6,
        }}
      >
        Powered by our sponsors
      </Typography>

      {/* MARQUEE TRACK */}
      <Box sx={{ position: "relative" }}>
        <motion.div
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
          style={{ display: "flex", gap: 20, width: "max-content", alignItems: "center" }}
        >
          {loop.map((sponsor, idx) => {
            const meta = TIER_META[sponsor.tier] ?? DEFAULT_META;
            return (
              <motion.div
                key={`${sponsor._id}-${idx}`}
                whileHover={{ y: -5, scale: 1.03 }}
                transition={{ duration: 0.22 }}
                style={{ flexShrink: 0 }}
              >
                {/* gradient border wrapper — exactly like SponsorsPage */}
                <Box
                  sx={{
                    p: "1.5px",
                    borderRadius: "18px",
                    background: meta.gradient,
                    boxShadow: `0 6px 28px ${meta.glow}`,
                    transition: "box-shadow 0.3s ease",
                    "&:hover": {
                      boxShadow: `0 8px 36px ${meta.color}55`,
                    },
                  }}
                >
                  {/* inner card — exactly like SponsorsPage */}
                  <Box
                    sx={{
                      px: 3.5,
                      py: 2,
                      borderRadius: "16.5px",
                      background: theme.palette.background.paper,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 130,
                      height: 72,
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                    }}
                  >
                    <Box
                      component="img"
                      src={`${API}${sponsor?.img}`}
                      alt={sponsor?.name}
                      sx={{
                        height: 44,
                        maxWidth: 110,
                        objectFit: "contain",
                        filter: isDark ? "brightness(1.1)" : "none",
                        opacity: 0.88,
                        transition: "opacity 0.2s",
                        "&:hover": { opacity: 1 },
                      }}
                    />
                  </Box>
                </Box>
              </motion.div>
            );
          })}
        </motion.div>

        {/* LEFT FADE */}
        <Box
          sx={{
            position: "absolute", left: 0, top: 0, height: "100%", width: 90,
            pointerEvents: "none",
            background: isDark
              ? `linear-gradient(to right, ${theme.palette.background.default}, transparent)`
              : `linear-gradient(to right, ${theme.palette.background.default}, transparent)`,
          }}
        />
        {/* RIGHT FADE */}
        <Box
          sx={{
            position: "absolute", right: 0, top: 0, height: "100%", width: 90,
            pointerEvents: "none",
            background: isDark
              ? `linear-gradient(to left, ${theme.palette.background.default}, transparent)`
              : `linear-gradient(to left, ${theme.palette.background.default}, transparent)`,
          }}
        />
      </Box>
    </Box>
  );
}