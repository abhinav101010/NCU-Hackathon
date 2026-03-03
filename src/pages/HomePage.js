import { Container, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Countdown from "../components/Countdown";

export default function HomePage() {
  const words = [
    "THE FUTURE",
    "INNOVATION",
    "AI SOLUTIONS",
    "NEXT BIG IDEA",
    "TECH FOR IMPACT",
    "THE IMPOSSIBLE",
  ];

  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let typingSpeed = isDeleting ? 50 : 90;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentWord.slice(0, displayedText.length + 1));

        if (displayedText === currentWord) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        setDisplayedText(currentWord.slice(0, displayedText.length - 1));

        if (displayedText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, wordIndex, words]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
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
            background:
              "linear-gradient(90deg,#00ffa3,#00c6ff,#ff0080)",
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

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h6"
          sx={{ color: "gray", maxWidth: 600, mb: 4 }}
        >
          Join visionary developers, designers, and innovators
          to create breakthrough solutions in just 48 hours.
          Code. Collaborate. Conquer.
        </Typography>
      </motion.div>

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
  );
}