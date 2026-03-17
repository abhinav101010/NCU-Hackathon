import { Container, Typography, Box, Button, useTheme, Grid, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Countdown from "../components/Countdown";
import ThemePage from "./ThemePage";
import Sponsors from "../components/Sponsors";
import EventPage from "./EventPage";
import RulePage from "./RulePage";
import { useNavigate } from "react-router-dom";
import { calculateTimeLeft } from "../utils/common";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import TimerIcon from "@mui/icons-material/Timer";

const WORDS = ["THE FUTURE", "INNOVATION", "AI SOLUTIONS", "NEXT BIG IDEA", "TECH FOR IMPACT"];

const STATS = [
  { icon: <TimerIcon />, value: "56", label: "Hours" },
  { icon: <EmojiEventsIcon />, value: "₹50k+", label: "Prize Pool" },
  { icon: <GroupsIcon />, value: "500+", label: "Participants" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = WORDS[wordIndex];
    let timeout;
    if (!isDeleting && displayedText.length < currentWord.length) {
      timeout = setTimeout(() => setDisplayedText(currentWord.slice(0, displayedText.length + 1)), 85);
    } else if (!isDeleting && displayedText.length === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1400);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => setDisplayedText(currentWord.slice(0, displayedText.length - 1)), 45);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, wordIndex]);

  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  return (
    <>
      {/* ── HERO ── */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          pt: 10,
          pb: 6,
          px: 2,
          position: "relative",
        }}
      >
        {/* GLOW BLOB */}
        <Box
          sx={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${primary}18 0%, transparent 70%)`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1, maxWidth: 900, mx: "auto" }}>
          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Chip
              label="🚀 NorthCap University · March 26–28, 2026"
              sx={{
                mb: 3,
                px: 1,
                fontSize: "0.8rem",
                fontWeight: 600,
                background: `${primary}18`,
                color: primary,
                border: `1px solid ${primary}44`,
                borderRadius: "999px",
                letterSpacing: "0.03em",
              }}
            />
          </motion.div>

          {/* TITLE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: { xs: "2.6rem", sm: "3.8rem", md: "5rem" },
                lineHeight: 1.05,
                mb: 1,
                letterSpacing: "-0.03em",
              }}
            >
              BUILD{" "}
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "gradShift 4s linear infinite",
                }}
              >
                {displayedText || "\u00A0"}
              </Box>
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  width: "3px",
                  height: "0.85em",
                  background: primary,
                  ml: 0.5,
                  verticalAlign: "middle",
                  animation: "blink 1s step-end infinite",
                  borderRadius: "2px",
                }}
              />
            </Typography>
          </motion.div>

          {/* SUBTITLE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <Typography
              sx={{
                color: theme.palette.text.secondary,
                fontSize: { xs: "1rem", md: "1.15rem" },
                maxWidth: 580,
                mx: "auto",
                mb: 4,
                lineHeight: 1.7,
              }}
            >
              Join visionary developers, designers, and innovators to create
              breakthrough solutions. Code. Collaborate. Conquer.
            </Typography>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 6 }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                disabled={calculateTimeLeft().expired}
                onClick={() => navigate("/register")}
                sx={{ px: 4, py: 1.5, fontSize: "1rem", borderRadius: "14px" }}
              >
                Register Now →
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => navigate("/themes")}
                sx={{ px: 4, py: 1.5, fontSize: "1rem", borderRadius: "14px" }}
              >
                Explore Themes
              </Button>
            </Box>
          </motion.div>

          {/* STATS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: { xs: 2, md: 4 },
                flexWrap: "wrap",
                mb: 6,
              }}
            >
              {STATS.map((s, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.2,
                    px: 3,
                    py: 1.5,
                    borderRadius: "14px",
                    background: `${primary}0e`,
                    border: `1px solid ${primary}22`,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <Box sx={{ color: primary, display: "flex", fontSize: "1.2rem" }}>{s.icon}</Box>
                  <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", lineHeight: 1, color: primary }}>
                      {s.value}
                    </Typography>
                    <Typography sx={{ fontSize: "0.7rem", color: theme.palette.text.secondary, letterSpacing: "0.06em" }}>
                      {s.label.toUpperCase()}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </motion.div>

          {/* COUNTDOWN */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Countdown />
          </motion.div>
        </Box>
      </Box>

      {/* ── OTHER SECTIONS ── */}
      <Sponsors />
      <ThemePage />
      <EventPage />
      <RulePage />

      <style>{`
        @keyframes gradShift {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </>
  );
}