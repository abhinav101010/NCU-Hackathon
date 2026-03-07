import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { calculateTimeLeft } from "../utils/common";

export default function Countdown() {
  const theme = useTheme();

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      const time = calculateTimeLeft();
      setTimeLeft(time);

      if (time.expired) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const units = ["days", "hours", "minutes", "seconds"];

  /* 🔴 SHOW THIS WHEN TIMER ENDS */
  if (timeLeft.expired) {
    return (
      <Box
        textAlign="center"
        mt={8}
        sx={{
          p: 4,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}22, ${theme.palette.secondary.main}22)`,
          border: `2px solid ${theme.palette.primary.main}`,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            letterSpacing: 2,
            color: theme.palette.primary.main,
          }}
        >
          🚀 REGISTRATION CLOSED
        </Typography>

        <Typography
          mt={2}
          sx={{
            fontSize: "1.4rem",
            fontWeight: 600,
            color: theme.palette.text.secondary,
          }}
        >
          See you at the Innovathon!
        </Typography>
      </Box>
    );
  }

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
