import { Container, Box, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import SectionHeading from "./SectionHeading";
// import sponsors from "../data/sponsors";

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/sponsors")
      .then((res) => res.json())
      .then((data) => {
        setSponsors(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Container sx={{ py: 12, background: "rgba(255,255,255,0.05)", borderRadius: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 6,
        }}
      >
        {sponsors.map((sponsor, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.15, y: -8 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Box
              component="img"
              src={sponsor.img}
              alt={sponsor.name}
              sx={{
                height: 50,
                objectFit: "contain",
                filter: "grayscale(100%) brightness(0.8)",
                transition: "0.4s",
                "&:hover": {
                  filter: "grayscale(0%) brightness(1)",
                },
              }}
            />
          </motion.div>
        ))}
      </Box>
    </Container>
  );
}