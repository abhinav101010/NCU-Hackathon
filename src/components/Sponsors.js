import { Container, Box, CircularProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();

  useEffect(() => {
    fetch("http://localhost:5000/api/sponsors")
      .then((res) => res.json())
      .then((data) => {
        setSponsors(data);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );

  const sponsorsLoop = [...sponsors, ...sponsors];

  return (
    <>
    {/* <Container sx={{ py: 12 }}> */}
      {/* Section Title */}
      {/* <Typography
        variant="h4"
        textAlign="center"
        sx={{
          mb: 6,
          fontWeight: "bold",
          color: theme.palette.primary.main,
        }}
      >
        Sponsors
      </Typography> */}

      {/* Glass Container */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          // borderRadius: 4,

          background: theme.palette.background.paper,

          border: `1px solid ${theme.palette.primary.main}40`,

          backdropFilter: "blur(12px)",

          p: 4,

          boxShadow: `0 0 30px ${theme.palette.primary.main}20`,
        }}
      >
        {/* Sliding Row */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 22,
          }}
          style={{
            display: "flex",
            gap: "45px",
            width: "max-content",
          }}
        >
          {sponsorsLoop.map((sponsor, i) => (
            <Box
              key={i}
              sx={{
                background:
                  theme.palette.mode === "light"
                    ? "#ffffff"
                    : "rgba(255,255,255,0.06)",

                border: `1px solid ${theme.palette.primary.main}35`,

                borderRadius: "14px",

                padding: "18px 32px",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                minWidth: "150px",

                transition: "0.35s",

                backdropFilter: "blur(6px)",

                boxShadow: `0 0 10px ${theme.palette.primary.main}20`,

                "&:hover": {
                  transform: "translateY(-6px) scale(1.05)",

                  boxShadow: `0 0 25px ${theme.palette.primary.main}60`,
                },
              }}
            >
              <Box
                component="img"
                src={sponsor.img}
                alt={sponsor.name}
                sx={{
                  height: 60,
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

        {/* Edge Fade Effect */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: 120,
            background:
              theme.palette.mode === "light"
                ? "linear-gradient(to right,#ffffff,transparent)"
                : "linear-gradient(to right,#0a0a0a,transparent)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            height: "100%",
            width: 120,
            background:
              theme.palette.mode === "light"
                ? "linear-gradient(to left,#ffffff,transparent)"
                : "linear-gradient(to left,#0a0a0a,transparent)",
          }}
        />
      </Box>
    {/* </Container> */}
    </>
  );
}