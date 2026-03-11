import { Container, Box, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { API } from "../utils/common";

export default function Sponsors() {
  const theme = useTheme();

  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  /* LOAD SPONSORS */

  useEffect(() => {
    fetch(`${API}/api/sponsors`)
      .then((res) => res.json())
      .then((data) => {
        setSponsors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Sponsors fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  const sponsorsLoop = [...sponsors, ...sponsors];

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 1, md: 2 } }}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          background: theme.palette.background.paper,
          backdropFilter: "blur(12px)",
          p: { xs: 2, sm: 3, md: 4 },
          boxShadow: `0 0 30px ${theme.palette.primary.main}20`,
          borderRadius: { xs: 2, md: 3 },
        }}
      >
        {/* Sliding Row */}

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
          style={{
            display: "flex",
            gap: "clamp(16px, 4vw, 45px)",
            width: "max-content",
            alignItems: "center",
          }}
        >
          {sponsorsLoop.map((sponsor, index) => (
            <Box
              key={sponsor._id || index}
              sx={{
                background:
                  theme.palette.mode === "light"
                    ? "#ffffff"
                    : "rgba(255,255,255,0.06)",

                border: `1px solid ${theme.palette.primary.main}35`,
                borderRadius: "12px",

                px: { xs: 2, sm: 3, md: 4 },
                py: { xs: 1.5, sm: 2 },

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                minWidth: { xs: 100, sm: 130, md: 150 },

                transition: "0.3s",
                backdropFilter: "blur(6px)",
                boxShadow: `0 0 10px ${theme.palette.primary.main}20`,

                "&:hover": {
                  transform: "translateY(-4px) scale(1.04)",
                  boxShadow: `0 0 25px ${theme.palette.primary.main}60`,
                },
              }}
            >
              <Box
                component="img"
                src={`${API}${sponsor?.img}`}
                alt={sponsor?.name}
                sx={{
                  height: { xs: 30, sm: 40, md: 55 },
                  maxWidth: { xs: 80, sm: 110, md: 130 },
                  objectFit: "contain",

                  filter:
                    theme.palette.mode === "light"
                      ? "none"
                      : "brightness(1.1)",
                }}
              />
            </Box>
          ))}
        </motion.div>

        {/* LEFT FADE */}

        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: { xs: 40, sm: 80, md: 120 },

            background:
              theme.palette.mode === "light"
                ? "linear-gradient(to right,#ffffff,transparent)"
                : "linear-gradient(to right,#0a0a0a,transparent)",
          }}
        />

        {/* RIGHT FADE */}

        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            height: "100%",
            width: { xs: 40, sm: 80, md: 120 },

            background:
              theme.palette.mode === "light"
                ? "linear-gradient(to left,#ffffff,transparent)"
                : "linear-gradient(to left,#0a0a0a,transparent)",
          }}
        />
      </Box>
    </Container>
  );
}