import React, { useEffect, useState } from "react";
import { Container, Box, Typography, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GavelIcon from "@mui/icons-material/Gavel";
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
  const [expanded, setExpanded] = useState(null);

  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    fetch(`${API}/api/rules`)
      .then((res) => res.json())
      .then((data) => { setRules(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Split on FIRST colon only — safe even if description contains colons
  const parseRule = (text = "") => {
    const idx = text.indexOf(":");
    if (idx === -1) return { title: text, description: "" };
    return {
      title: text.slice(0, idx).trim(),
      description: text.slice(idx + 1).trim(),
    };
  };

  const toggle = (i) => setExpanded((prev) => (prev === i ? null : i));

  return (
    <>
      <Container sx={{ py: 12, position: "relative" }}>
        <SectionHeading>Rules & Guidelines</SectionHeading>

        {/* INTRO PILL */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
          <Box sx={{
            display: "inline-flex", alignItems: "center", gap: 1,
            px: 2.5, py: 1,
            borderRadius: "999px",
            background: `${primary}12`,
            border: `1px solid ${primary}33`,
          }}>
            <GavelIcon sx={{ fontSize: "0.95rem", color: primary }} />
            <Typography sx={{ fontSize: "0.78rem", fontWeight: 600, color: primary, letterSpacing: "0.08em" }}>
              Read carefully before participating
            </Typography>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
            <CircularProgress sx={{ color: primary }} />
          </Box>
        ) : (
          <Box sx={{ maxWidth: 780, mx: "auto" }}>
            {rules.map((rule, i) => {
              const { title, description } = parseRule(rule.text);
              const isOpen = expanded === i;

              return (
                <motion.div
                  key={rule._id || i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  viewport={{ once: true }}
                >
                  <Box
                    sx={{
                      mb: 1.5,
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: isOpen
                        ? `1px solid ${primary}55`
                        : `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"}`,
                      background: isOpen
                        ? isDark ? `${primary}08` : `${primary}05`
                        : theme.palette.background.paper,
                      boxShadow: isOpen
                        ? `0 4px 24px ${primary}18`
                        : "none",
                      transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                      "&:hover": {
                        border: `1px solid ${primary}33`,
                        boxShadow: `0 4px 20px ${primary}12`,
                      },
                    }}
                  >
                    {/* HEADER ROW */}
                    <Box
                      onClick={() => toggle(i)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        px: 3, py: 2,
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                    >
                      {/* NUMBER BADGE */}
                      <Box sx={{
                        width: 32, height: 32, flexShrink: 0,
                        borderRadius: "10px",
                        background: isOpen
                          ? `linear-gradient(135deg, ${primary}, ${secondary})`
                          : `${primary}18`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.3s ease",
                      }}>
                        <Typography sx={{
                          fontSize: "0.72rem", fontWeight: 800,
                          color: isOpen
                            ? (isDark ? "#000" : "#fff")
                            : primary,
                          lineHeight: 1,
                          fontFamily: "'Syne', sans-serif",
                        }}>
                          {String(i + 1).padStart(2, "0")}
                        </Typography>
                      </Box>

                      {/* TITLE */}
                      <Typography sx={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: isOpen ? primary : theme.palette.text.primary,
                        flex: 1,
                        transition: "color 0.2s",
                      }}>
                        {title}
                      </Typography>

                      {/* EXPAND ICON */}
                      <Box sx={{
                        width: 28, height: 28, flexShrink: 0,
                        borderRadius: "8px",
                        background: `${primary}10`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.3s ease",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}>
                        <ExpandMoreIcon sx={{ fontSize: "1rem", color: primary }} />
                      </Box>
                    </Box>

                    {/* DESCRIPTION — animated */}
                    <AnimatePresence initial={false}>
                      {isOpen && description && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeInOut" }}
                          style={{ overflow: "hidden" }}
                        >
                          <Box sx={{
                            px: 3, pb: 2.5,
                            pl: "68px", // aligns under title text
                          }}>
                            <Box sx={{
                              height: "1px",
                              background: `linear-gradient(90deg, ${primary}33, transparent)`,
                              mb: 2,
                            }} />
                            <Typography sx={{
                              fontSize: "0.88rem",
                              color: theme.palette.text.secondary,
                              lineHeight: 1.75,
                            }}>
                              {description}
                            </Typography>
                          </Box>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Box>
                </motion.div>
              );
            })}

            {/* EMPTY STATE */}
            {!loading && rules.length === 0 && (
              <Typography sx={{ textAlign: "center", color: theme.palette.text.secondary, py: 8 }}>
                No rules found.
              </Typography>
            )}
          </Box>
        )}
      </Container>

      {isRules && <Sponsors />}
    </>
  );
}