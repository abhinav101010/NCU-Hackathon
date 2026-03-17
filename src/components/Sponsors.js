import { Box, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { API } from "../utils/common";

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
  const isDark = theme.palette.mode === "dark";

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
        borderTop: `1px solid ${primary}18`,
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
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <motion.div
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          style={{ display: "flex", gap: 24, width: "max-content" }}
        >
          {loop.map((sponsor, idx) => (
            <Box
              key={`${sponsor._id}-${idx}`}
              sx={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 3,
                py: 2,
                minWidth: 140,
                height: 72,
                borderRadius: "14px",
                background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.85)",
                border: `1px solid ${primary}20`,
                backdropFilter: "blur(8px)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: isDark ? `${primary}12` : "#fff",
                  border: `1px solid ${primary}55`,
                  boxShadow: `0 4px 20px ${primary}25`,
                  transform: "translateY(-3px)",
                },
              }}
            >
              <Box
                component="img"
                src={`${API}${sponsor?.img}`}
                alt={sponsor?.name}
                sx={{
                  maxHeight: 40,
                  maxWidth: 110,
                  objectFit: "contain",
                  filter: isDark ? "brightness(1.1)" : "none",
                  opacity: 0.85,
                  transition: "opacity 0.2s",
                  "&:hover": { opacity: 1 },
                }}
              />
            </Box>
          ))}
        </motion.div>

        {/* LEFT FADE */}
        <Box
          sx={{
            position: "absolute", left: 0, top: 0, height: "100%", width: 80,
            pointerEvents: "none",
            background: isDark
              ? "linear-gradient(to right, #080810, transparent)"
              : "linear-gradient(to right, #f8faff, transparent)",
          }}
        />
        {/* RIGHT FADE */}
        <Box
          sx={{
            position: "absolute", right: 0, top: 0, height: "100%", width: 80,
            pointerEvents: "none",
            background: isDark
              ? "linear-gradient(to left, #080810, transparent)"
              : "linear-gradient(to left, #f8faff, transparent)",
          }}
        />
      </Box>
    </Box>
  );
}