import { Container, Typography, Box, Button, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Countdown from "../components/Countdown";
import ThemePage from "./ThemePage";
import Sponsors from "../components/Sponsors";
import EventPage from "./EventPage";
import RulePage from "./RulePage";
import { useNavigate } from "react-router-dom";

const words = [
  "THE FUTURE",
  "INNOVATION",
  "AI SOLUTIONS",
  "NEXT BIG IDEA",
  "TECH FOR IMPACT",
  "THE IMPOSSIBLE",
];

export default function HomePage() {
  const navigate = useNavigate();

  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const currentWord = words[wordIndex];

    let timeout;

    if (!isDeleting && displayedText.length < currentWord.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length + 1));
      }, 90);
    } else if (!isDeleting && displayedText.length === currentWord.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1200);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length - 1));
      }, 50);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, wordIndex]);

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "100vh",
          pt: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {/* Hackathon Title */}
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            letterSpacing: 4,
            fontWeight: "bold",
            color: theme.palette.primary.main,
          }}
        >
          NCU HACKATHON 2026
        </Typography>

        {/* Main Heading */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            mb: 2,
          }}
        >
          BUILD{" "}
          <Box
            component="span"
            sx={{
              background: "linear-gradient(90deg,#00ffa3,#00c6ff,#ff0080)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              color: "transparent",
              animation: "gradientMove 4s linear infinite",
            }}
          >
            {displayedText}
          </Box>
          <Box
            component="span"
            sx={{
              borderRight: "3px solid #00ffa3",
              ml: 1,
              animation: "blink 1s infinite",
            }}
          />
        </Typography>

        {/* Hackathon Info */}
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.primary.main,
            mb: 2,
            fontWeight: "bold",
          }}
        >
          48 Hour Hackathon • ₹1L+ Prize Pool • 500+ Hackers
        </Typography>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h6" sx={{ color: "gray", maxWidth: 600, mb: 4 }}>
            Join visionary developers, designers, and innovators to create
            breakthrough solutions in just 48 hours. Code. Collaborate. Conquer.
          </Typography>
        </motion.div>

        {/* CTA Buttons */}
        <Box sx={{ mb: 5 }}>
          <Button
            variant="contained"
            onClick={() => navigate("/register")}
            sx={{
              mr: 2,
              background: "#ff0080",
              fontWeight: "bold",
              padding: "10px 28px",
            }}
          >
            Register Now
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/themes")}
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              fontWeight: "bold",
              padding: "10px 28px",
            }}
          >
            Explore Themes
          </Button>
        </Box>

        {/* Countdown */}
        <Countdown />

        {/* Animations */}
        <style>
          {`
          @keyframes gradientMove {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }

          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }
        `}
        </style>
      </Container>

      {/* Other Sections */}
      <Sponsors />
      <ThemePage />
      <EventPage />
      <RulePage />
    </>
  );
}
