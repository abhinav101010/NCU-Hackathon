import {
  Card, CardMedia, CardContent, Typography, Box,
  Accordion, AccordionSummary, AccordionDetails, Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { API } from "../utils/common";

export default function ThemeCard({ theme: themeItem, onClick, index = 0 }) {
  const theme = useTheme();
  const location = useLocation();
  const isThemesPage = location.pathname === "/themes";

  const primary = theme.palette.primary.main;
  const isDark = theme.palette.mode === "dark";

  // Safe parse — works whether stored as newline string or array
  const problems = Array.isArray(themeItem?.problemStatements)
    ? themeItem.problemStatements.filter(Boolean)
    : (themeItem?.problemStatements || "")
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean);

  const handleClick = () => {
    if (onClick) onClick(themeItem);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      style={{ height: "100%" }}
    >
      <Card
        onClick={handleClick}
        sx={{
          width: "100%",
          borderRadius: "20px",
          border: `1px solid ${primary}22`,
          background: theme.palette.background.paper,
          boxShadow: `0 4px 20px ${primary}12`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          cursor: "pointer",
          transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
          "&:hover": {
            border: `1px solid ${primary}55`,
            boxShadow: `0 12px 40px ${primary}28`,
          },
        }}
      >
        {/* ── IMAGE ── */}
        <Box sx={{ position: "relative", overflow: "hidden", flexShrink: 0 }}>
          <CardMedia
            component="img"
            image={`${API}${themeItem?.img}`}
            alt={themeItem?.title}
            sx={{
              height: 180,
              objectFit: "cover",
              transition: "transform 0.5s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />
          {/* gradient overlay */}
          <Box sx={{
            position: "absolute", inset: 0,
            background: `linear-gradient(180deg, transparent 40%, ${isDark ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.45)"} 100%)`,
            pointerEvents: "none",
          }} />
        </Box>

        {/* ── CONTENT ── */}
        <CardContent
          sx={{
            flex: 1, p: 0,
            display: "flex", flexDirection: "column",
            "&:last-child": { pb: 0 },
          }}
          // stop accordion clicks from bubbling to card onClick
          onClick={(e) => isThemesPage && e.stopPropagation()}
        >
          <Box sx={{ px: 2.5, pt: 2, pb: isThemesPage ? 1 : 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: primary,
                mb: 0.8,
                lineHeight: 1.3,
              }}
            >
              {themeItem?.title}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "0.82rem",
                lineHeight: 1.6,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {themeItem?.desc}
            </Typography>
          </Box>

          {/* ── PROBLEM STATEMENTS ACCORDION (only on /themes) ── */}
          {isThemesPage && problems.length > 0 && (
            <Accordion
              disableGutters
              elevation={0}
              sx={{
                mt: "auto",
                background: "transparent",
                borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                "&:before": { display: "none" },
                "&.Mui-expanded": { background: `${primary}06` },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ fontSize: "1rem", color: primary }} />}
                sx={{ px: 2.5, py: 0, minHeight: "40px !important",
                  "& .MuiAccordionSummary-content": { my: "10px !important" } }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FormatListBulletedIcon sx={{ fontSize: "0.85rem", color: primary }} />
                  <Typography sx={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "0.75rem", fontWeight: 700,
                    color: primary, letterSpacing: "0.04em",
                  }}>
                    Problem Statements
                  </Typography>
                  <Chip label={problems.length} size="small" sx={{
                    height: 16, fontSize: "0.6rem", fontWeight: 700,
                    background: `${primary}20`, color: primary,
                    border: `1px solid ${primary}44`, borderRadius: "5px",
                    "& .MuiChip-label": { px: "5px" },
                  }} />
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
                <Box sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 0.8,
                }}>
                  {problems.map((p, i) => (
                    <Box key={i} sx={{
                      p: 1.2, borderRadius: "10px",
                      background: isDark ? `${primary}0c` : `${primary}07`,
                      border: `1px solid ${primary}1a`,
                      display: "flex", alignItems: "flex-start", gap: 0.8,
                      transition: "border 0.2s",
                      "&:hover": { border: `1px solid ${primary}44` },
                    }}>
                      <Typography sx={{
                        fontSize: "0.6rem", fontWeight: 800,
                        color: primary, lineHeight: 1,
                        mt: "2px", flexShrink: 0,
                        fontFamily: "'Syne', sans-serif",
                      }}>
                        {String(i + 1).padStart(2, "0")}
                      </Typography>
                      <Typography sx={{
                        fontSize: "0.72rem",
                        color: theme.palette.text.secondary,
                        lineHeight: 1.45,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}>
                        {p}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          )}

          {/* ── CLICK HINT (not on /themes since accordion is there) ── */}
          {!isThemesPage && (
            <Box sx={{
              px: 2.5, py: 1.5,
              borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <Typography sx={{
                fontSize: "0.72rem", color: theme.palette.text.disabled,
                letterSpacing: "0.04em",
              }}>
                Click to explore
              </Typography>
              <Box sx={{
                fontSize: "0.65rem", fontWeight: 700,
                color: primary, letterSpacing: "0.06em",
              }}>
                VIEW →
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}