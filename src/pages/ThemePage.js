import React, { useState, useEffect } from "react";
import {
  Container, Box, Typography, Chip,
  Dialog, DialogContent, DialogActions,
  Button, IconButton,
  Accordion, AccordionSummary, AccordionDetails,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SectionHeading from "../components/SectionHeading";
import ThemeCard from "../components/ThemeCard";
import Sponsors from "../components/Sponsors";
import { API } from "../utils/common";

export default function ThemePage() {
  const muiTheme = useTheme();
  const location = useLocation();

  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const isThemesPage = location.pathname.startsWith("/themes");
  const primary = muiTheme.palette.primary.main;
  const secondary = muiTheme.palette.secondary.main;
  const isDark = muiTheme.palette.mode === "dark";

  useEffect(() => {
    fetch(`${API}/api/themes`)
      .then((r) => r.json())
      .then(setThemes)
      .catch(console.error);
  }, []);

  const handleOpen = (themeItem) => {
    setSelectedTheme(themeItem);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    // delay clear so exit animation isn't jarring
    setTimeout(() => setSelectedTheme(null), 300);
  };

  // Safe parse
  const parseProblems = (raw) =>
    Array.isArray(raw)
      ? raw.filter(Boolean)
      : (raw || "").split("\n").map((p) => p.trim()).filter(Boolean);

  const problems = selectedTheme ? parseProblems(selectedTheme.problemStatements) : [];

  return (
    <>
      <Container sx={{ py: 12 }}>
        <SectionHeading>Themes</SectionHeading>

        {/* SUBTITLE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Typography sx={{
            textAlign: "center",
            color: muiTheme.palette.text.secondary,
            mb: 6, fontSize: "0.95rem", lineHeight: 1.7,
            maxWidth: 520, mx: "auto",
          }}>
            Choose a theme that excites you. Click any card to explore
            the full description and problem statements.
          </Typography>
        </motion.div>

        {/* GRID */}
        <Box sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2.5,
          justifyContent: "center",
        }}>
          {themes.map((themeItem, index) => (
            <Box
              key={themeItem._id || index}
              sx={{
                width: {
                  xs: "100%",
                  sm: "calc(50% - 10px)",
                  md: "calc(33.333% - 14px)",
                },
                minWidth: 0,
              }}
            >
              <ThemeCard
                theme={themeItem}
                onClick={handleOpen}
                index={index}
              />
            </Box>
          ))}
        </Box>
      </Container>

      {/* ── MODAL ── */}
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        TransitionComponent={motion.div}
        PaperProps={{
          sx: {
            borderRadius: "24px",
            background: muiTheme.palette.background.default,
            border: `1px solid ${primary}33`,
            boxShadow: `0 24px 80px ${primary}28`,
            overflow: "hidden",
          },
        }}
      >
        {selectedTheme && (
          <>
            {/* CLOSE BUTTON */}
            <IconButton
              onClick={handleClose}
              size="small"
              sx={{
                position: "absolute", top: 12, right: 12, zIndex: 10,
                width: 32, height: 32, borderRadius: "10px",
                background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                color: muiTheme.palette.text.secondary,
                "&:hover": { background: `${primary}20`, color: primary },
              }}
            >
              <CloseIcon sx={{ fontSize: "1rem" }} />
            </IconButton>

            {/* IMAGE HERO */}
            <Box sx={{ position: "relative", height: 220, overflow: "hidden", flexShrink: 0 }}>
              <Box
                component="img"
                src={`${API}${selectedTheme.img}`}
                alt={selectedTheme.title}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {/* gradient overlay */}
              <Box sx={{
                position: "absolute", inset: 0,
                background: `linear-gradient(180deg, transparent 30%, ${isDark ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.6)"} 100%)`,
              }} />
              {/* title over image */}
              <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, p: 3 }}>
                <Typography sx={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800, fontSize: "1.4rem",
                  color: "#fff",
                  lineHeight: 1.2,
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}>
                  {selectedTheme.title}
                </Typography>
              </Box>
            </Box>

            <DialogContent sx={{ p: 3 }}>
              {/* DESCRIPTION */}
              <Typography sx={{
                fontSize: "0.9rem",
                color: muiTheme.palette.text.secondary,
                lineHeight: 1.75, mb: 2,
              }}>
                {selectedTheme.desc}
              </Typography>

              {/* PROBLEM STATEMENTS ACCORDION */}
              {problems.length > 0 && (
                <Accordion
                  defaultExpanded
                  disableGutters
                  elevation={0}
                  sx={{
                    borderRadius: "14px !important",
                    border: `1px solid ${primary}22`,
                    background: `${primary}06`,
                    "&:before": { display: "none" },
                    "&.Mui-expanded": {
                      border: `1px solid ${primary}44`,
                      background: `${primary}08`,
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ fontSize: "1rem", color: primary }} />}
                    sx={{ px: 2.5, minHeight: "44px !important",
                      "& .MuiAccordionSummary-content": { my: "10px !important" } }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <FormatListBulletedIcon sx={{ fontSize: "0.9rem", color: primary }} />
                      <Typography sx={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700, fontSize: "0.85rem",
                        color: primary, letterSpacing: "0.04em",
                      }}>
                        Problem Statements
                      </Typography>
                      <Chip label={problems.length} size="small" sx={{
                        height: 18, fontSize: "0.62rem", fontWeight: 700,
                        background: `${primary}20`, color: primary,
                        border: `1px solid ${primary}44`, borderRadius: "6px",
                        "& .MuiChip-label": { px: "6px" },
                      }} />
                    </Box>
                  </AccordionSummary>

                  <AccordionDetails sx={{ px: 2.5, pt: 0, pb: 2.5 }}>
                    <Box sx={{
                      height: "1px", mb: 2,
                      background: `linear-gradient(90deg, ${primary}33, transparent)`,
                    }} />
                    <Box sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: 1.5,
                    }}>
                      {problems.map((p, i) => (
                        <Box key={i} sx={{
                          p: 2, borderRadius: "12px",
                          background: isDark ? `${primary}0c` : `${primary}07`,
                          border: `1px solid ${primary}1e`,
                          display: "flex", gap: 1.2, alignItems: "flex-start",
                          transition: "all 0.22s ease",
                          "&:hover": {
                            border: `1px solid ${primary}55`,
                            background: `${primary}12`,
                            transform: "translateY(-2px)",
                            boxShadow: `0 4px 14px ${primary}18`,
                          },
                        }}>
                          {/* number */}
                          <Box sx={{
                            width: 24, height: 24, borderRadius: "7px", flexShrink: 0,
                            background: `linear-gradient(135deg, ${primary}30, ${secondary}20)`,
                            border: `1px solid ${primary}33`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            mt: "1px",
                          }}>
                            <Typography sx={{
                              fontSize: "0.62rem", fontWeight: 800,
                              color: primary, lineHeight: 1,
                              fontFamily: "'Syne', sans-serif",
                            }}>
                              {String(i + 1).padStart(2, "0")}
                            </Typography>
                          </Box>
                          <Typography sx={{
                            fontSize: "0.83rem",
                            color: muiTheme.palette.text.secondary,
                            lineHeight: 1.6,
                          }}>
                            {p}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              )}
            </DialogContent>

            <DialogActions sx={{
              px: 3, pb: 3, pt: 0,
              borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
              mt: 1,
            }}>
              <Button
                onClick={handleClose}
                variant="outlined"
                color="primary"
                size="small"
                sx={{ borderRadius: "10px", px: 2.5 }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {isThemesPage && <Sponsors />}
    </>
  );
}