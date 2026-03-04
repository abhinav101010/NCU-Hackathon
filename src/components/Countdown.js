import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Countdown() {
  const theme = useTheme();

  const hackathonDate = new Date("2026-03-26T00:00:00");

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

              background: theme.palette.background.paper,

              border: `1px solid ${theme.palette.primary.main}`,

              boxShadow: `0 0 20px ${theme.palette.primary.main}55`,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
                textShadow: `0 0 10px ${theme.palette.primary.main}`,
              }}
            >
              {timeLeft[unit]}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.secondary,
                letterSpacing: 1,
              }}
            >
              {unit.toUpperCase()}
            </Typography>
          </Box>

          {/* Colon */}
          {index !== units.length - 1 && (
            <Typography
              variant="h4"
              sx={{
                mx: 1,
                fontWeight: "bold",
                color: theme.palette.secondary.main,
                textShadow: `0 0 8px ${theme.palette.secondary.main}`,
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