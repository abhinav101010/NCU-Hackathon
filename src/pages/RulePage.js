import React from "react";
import { Container, Box, CircularProgress } from "@mui/material";
import SectionHeading from "../components/SectionHeading";
// import rules from "../data/rules";
import { useState, useEffect } from "react";

export default function RulePage() {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/rules")
      .then((res) => res.json())
      .then((data) => {
        setRules(data);
        setLoading(false);
      });
  }, []);
  return (
    <Container sx={{ py: 12, position: "relative" }}>
      <SectionHeading>Rules</SectionHeading>
      {loading ? (
        <CircularProgress />
      ) : (
        rules.map((rule, i) => (
          <Box
            key={i}
            sx={{
              p: 3,
              my: 2,
              borderRadius: 2,
              background: "rgba(255,255,255,0.05)",
            }}
          >
            ⚡ {rule.text}
          </Box>
        ))
      )}
    </Container>
  );
}
