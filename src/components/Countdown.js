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

      if (time.expired) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const units = ["days", "hours", "minutes", "seconds"];

  /* REGISTRATION CLOSED UI */
  if (timeLeft.expired) {
    return (
      <Box
        textAlign="center"
        mt={4}
        sx={{
          p: { xs: 2.5, md: 3 },
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}22, ${theme.palette.secondary.main}22)`,
          border: `1px solid ${theme.palette.primary.main}`,
          maxWidth: 420,
          mx: "auto",
        }}
      >
        <Typography
          sx={{
            fontWeight: 900,
            letterSpacing: 1,
            color: theme.palette.primary.main,
            fontSize: { xs: "1.2rem", md: "1.6rem" },
          }}
        >
          🚀 REGISTRATION CLOSED
        </Typography>

        <Typography
          mt={1}
          sx={{
            fontSize: { xs: "0.9rem", md: "1rem" },
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
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: { xs: 0.5, sm: 1 },
        mt: 3,
        flexWrap: "wrap",
      }}
    >
      {units.map((unit, index) => (
        <Box key={unit} display="flex" alignItems="center">
          <Box
            sx={{
              minWidth: { xs: 55, sm: 65 },
              px: { xs: 1.5, sm: 2 },
              py: { xs: 1, sm: 1.3 },
              borderRadius: 2,
              textAlign: "center",
              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.primary.main}`,
              boxShadow: `0 0 8px ${theme.palette.primary.main}55`,
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
              }}
            >
              {timeLeft[unit]}
            </Typography>

            <Typography
              sx={{
                color: theme.palette.text.secondary,
                fontSize: { xs: "0.55rem", sm: "0.65rem" },
                letterSpacing: 0.5,
              }}
            >
              {unit.toUpperCase()}
            </Typography>
          </Box>

          {index !== units.length - 1 && (
            <Typography
              sx={{
                mx: { xs: 0.3, sm: 0.5 },
                fontWeight: "bold",
                color: theme.palette.secondary.main,
                fontSize: { xs: "1.1rem", sm: "1.3rem" },
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