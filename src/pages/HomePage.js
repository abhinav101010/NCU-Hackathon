import { Container, Typography, Box, Button, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Countdown from "../components/Countdown";
import ThemePage from "./ThemePage";
import Sponsors from "../components/Sponsors";
import EventPage from "./EventPage";
import RulePage from "./RulePage";
import { useNavigate } from "react-router-dom";
import { calculateTimeLeft } from "../utils/common";

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
  const theme = useTheme();

  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting && displayedText.length < currentWord.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length + 1));
      }, 90);
    } else if (!isDeleting && displayedText.length === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1200);
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
          pt: { xs: 10, md: 14 },
          px: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {/* Title */}
        <Typography
          sx={{
            mb: 2,
            letterSpacing: { xs: 2, md: 4 },
            fontWeight: "bold",
            color: theme.palette.primary.main,
            fontSize: {
              xs: "1.2rem",
              sm: "1.5rem",
              md: "2rem",
            },
          }}
        >
          INNOVATHON 2026
        </Typography>

        {/* Main Heading */}
        <Typography
          sx={{
            fontWeight: "bold",
            mb: 2,
            lineHeight: 1.2,
            fontSize: {
              xs: "2rem",
              sm: "2.6rem",
              md: "3.5rem",
              lg: "4rem",
            },
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
          sx={{
            color: theme.palette.primary.main,
            mb: 2,
            fontWeight: "bold",
            fontSize: {
              xs: "0.8rem",
              sm: "0.9rem",
              md: "1rem",
            },
          }}
        >
          56 Hour Hackathon • ₹50k+ Prize Pool • 500+ Participants
        </Typography>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            sx={{
              color: theme.palette.text.main,
              maxWidth: 600,
              mb: 4,
              px: 2,
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
                md: "1.1rem",
              },
            }}
          >
            Join visionary developers, designers, and innovators to create
            breakthrough solutions in just 56 hours.<br/><b>CODE. COLLABORATE. CONQUER.</b>
          </Typography>
        </motion.div>

        {/* Buttons */}
        <Box
          sx={{
            mb: 5,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            disabled={calculateTimeLeft().expired}
            onClick={() => navigate("/register")}
            sx={{
              width: { xs: "100%", sm: "auto" },
              background: "#ff0080",
              fontWeight: "bold",
              px: { xs: 3, md: 4 },
              py: 1.2,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": {
                background: "#e00072",
              },
              "&:disabled": {
                background: "#999",
                color: "#fff",
              },
            }}
          >
            Register Now
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/themes")}
            sx={{
              width: { xs: "100%", sm: "auto" },
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              fontWeight: "bold",
              px: { xs: 3, md: 4 },
              py: 1.2,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": {
                borderColor: theme.palette.primary.dark,
                background: `${theme.palette.primary.main}10`,
              },
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
