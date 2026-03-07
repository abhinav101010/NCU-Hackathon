import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";
import SectionHeading from "../components/SectionHeading";
import Sponsors from "../components/Sponsors";
import { useLocation } from "react-router-dom";
import { API } from "../utils/common";

export default function RulePage() {
  const theme = useTheme();
  const location = useLocation();
  const isRules = location.pathname.startsWith("/rules");

  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  /* ---------------- LOAD RULES ---------------- */

  useEffect(() => {
    fetch(`${API}/api/rules`)
      .then((res) => res.json())
      .then((data) => {
        setRules(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load rules:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Container sx={{ py: 12, position: "relative" }}>
        <SectionHeading>Rules</SectionHeading>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          rules.map((rule, i) => {
            const [title, description] = rule.text.split(":");

            return (
              <Accordion
                key={rule._id || i}
                expanded={expanded === i}
                onChange={handleChange(i)}
                sx={{
                  my: 2,
                  borderRadius: 2,
                  background: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.primary.main}`,
                  boxShadow: `0 0 15px ${theme.palette.primary.main}33`,
                  transition: "0.3s",

                  "&:hover": {
                    boxShadow: `0 0 30px ${theme.palette.primary.main}66`,
                  },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.primary.main,
                    }}
                  >
                    {title}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Typography sx={{ color: theme.palette.text.primary }}>
                    {description}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })
        )}
      </Container>

      {isRules && <Sponsors />}
    </>
  );
}