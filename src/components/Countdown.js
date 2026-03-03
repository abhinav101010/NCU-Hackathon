import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

export default function Countdown() {
  const hackathonDate = new Date("2026-03-26T11:59:59");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = hackathonDate - new Date();

      if (diff <= 0) return;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const units = ["days", "hours", "minutes", "seconds"];

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
      mt={4}
      flexWrap="wrap"
    >
      {units.map((unit, index) => (
        <Box key={unit} display="flex" alignItems="center">
          {/* Timer Box */}
          <Box
            sx={{
              minWidth: 90,
              px: 3,
              py: 2,
              borderRadius: 3,
              textAlign: "center",
              background: "#111", // solid dark background
              border: "1px solid rgba(0,255,163,0.4)",
              boxShadow: "0 0 20px rgba(0,255,163,0.5)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#00ffa3",
                textShadow: "0 0 10px #00ffa3",
              }}
            >
              {timeLeft[unit]}
            </Typography>

            <Typography
              variant="caption"
              sx={{ color: "gray", letterSpacing: 1 }}
            >
              {unit.toUpperCase()}
            </Typography>
          </Box>

          {/* Colon (except last item) */}
          {index !== units.length - 1 && (
            <Typography
              variant="h4"
              sx={{
                mx: 1,
                fontWeight: "bold",
                color: "#ff0080",
                textShadow: "0 0 10px #ff0080",
              }}
            >
              :
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}