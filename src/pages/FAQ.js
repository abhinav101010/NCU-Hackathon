import {
  Container, Typography, Box, Chip, InputAdornment, TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    key: "general",
    label: "General",
    emoji: "📋",
    faqs: [
      {
        q: "Who can participate in the hackathon?",
        a: "Students from any college or university across India are eligible to participate.",
      },
      {
        q: "Do I need prior coding experience?",
        a: "No prior coding experience is mandatory. However, having coding knowledge can be beneficial while building and implementing your project.",
      },
      {
        q: "How many members are allowed in one team?",
        a: "Each team must consist of exactly 3 members. Teams with more or fewer members will not be allowed to participate.",
      },
      {
        q: "What if any teammate cancels at the last moment?",
        a: "If a teammate cancels, the team may bring an alternate member, but organisers must be informed in advance before the hackathon begins.",
      },
    ],
  },
  {
    key: "event",
    label: "Event",
    emoji: "🚀",
    faqs: [
      {
        q: "What is the duration of the hackathon?",
        a: "The hackathon runs for 56 hours, during which teams brainstorm, develop, and present their solutions.",
      },
      {
        q: "What should I bring to the hackathon?",
        a: "Bring a laptop, charger, signed consent form, any hardware components for your project, and a valid ID proof.",
      },
      {
        q: "Will mentors be available during the hackathon?",
        a: "Yes, mentors will be available throughout to guide participants and assist with ideas and technical challenges.",
      },
      {
        q: "Are we allowed to choose our own theme or problem statement?",
        a: "You can choose from the themes and problem statements provided, or work on your own idea under the Open Innovation category.",
      },
    ],
  },
  {
    key: "registration",
    label: "Registration",
    emoji: "📝",
    faqs: [
      {
        q: "How do I register for the hackathon?",
        a: "Register through the official hackathon website by completing the registration form and paying the required fee.",
      },
      {
        q: "Is there any registration fee?",
        a: "Yes, the registration fee is ₹300 per team for NCU students and ₹500 per team for students from other colleges.",
      },
    ],
  },
  {
    key: "prizes",
    label: "Prizes & Judging",
    emoji: "🏆",
    faqs: [
      {
        q: "Will there be prizes or certificates?",
        a: "Yes, all participants receive a certificate of participation, and winning teams are awarded cash prizes from a ₹50k+ prize pool.",
      },
      {
        q: "How will the projects be judged?",
        a: "Projects are evaluated on innovation, impact, implementation, feasibility, and SWOT analysis.",
      },
      {
        q: "What is the theme of the hackathon?",
        a: "Visit the official hackathon website to view all available themes and problem statements.",
      },
      {
        q: "Will participants get certificates?",
        a: "Yes, all participants receive a certificate of participation after successfully completing the hackathon.",
      },
    ],
  },
];

// flatten for search
const ALL_FAQS = CATEGORIES.flatMap((cat) =>
  cat.faqs.map((f) => ({ ...f, category: cat.label, emoji: cat.emoji }))
);

// ─── ACCORDION ITEM ───────────────────────────────────────────────────────────

function FAQItem({ faq, index, isOpen, onToggle }) {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const isDark = theme.palette.mode === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      viewport={{ once: true }}
    >
      <Box
        sx={{
          mb: 1.5, borderRadius: "16px", overflow: "hidden",
          border: isOpen
            ? `1px solid ${primary}55`
            : `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"}`,
          background: isOpen
            ? isDark ? `${primary}08` : `${primary}05`
            : theme.palette.background.paper,
          boxShadow: isOpen ? `0 4px 24px ${primary}16` : "none",
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
          "&:hover": {
            border: `1px solid ${primary}33`,
            boxShadow: `0 4px 20px ${primary}10`,
          },
        }}
      >
        {/* HEADER */}
        <Box
          onClick={onToggle}
          sx={{
            display: "flex", alignItems: "center", gap: 2,
            px: 3, py: 2, cursor: "pointer", userSelect: "none",
          }}
        >
          <Typography sx={{
            flex: 1,
            fontFamily: "'Syne', sans-serif",
            fontWeight: 600, fontSize: "0.92rem",
            color: isOpen ? primary : theme.palette.text.primary,
            transition: "color 0.2s",
            lineHeight: 1.4,
          }}>
            {faq.q}
          </Typography>

          <Box sx={{
            width: 28, height: 28, flexShrink: 0,
            borderRadius: "8px",
            background: `${primary}12`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.3s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}>
            <ExpandMoreIcon sx={{ fontSize: "1rem", color: primary }} />
          </Box>
        </Box>

        {/* ANSWER */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.26, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <Box sx={{ px: 3, pb: 2.5 }}>
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
                  {faq.a}
                </Typography>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function FAQ() {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const isDark = theme.palette.mode === "dark";

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const toggle = (key) => setExpanded((prev) => (prev === key ? null : key));

  // search mode — flat list across all categories
  const isSearching = search.trim().length > 0;
  const searchResults = ALL_FAQS.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  const visibleCategories = activeCategory === "all"
    ? CATEGORIES
    : CATEGORIES.filter((c) => c.key === activeCategory);

  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 12 }}>

      {/* ── HEADER ── */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Chip
            label="Got questions? We have answers."
            sx={{
              mb: 3, px: 1,
              fontSize: "0.78rem", fontWeight: 600,
              background: `${primary}18`, color: primary,
              border: `1px solid ${primary}44`,
              borderRadius: "999px",
            }}
          />
          <Typography variant="h2" sx={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800, mb: 2,
            fontSize: { xs: "2.2rem", md: "3rem" },
            background: `linear-gradient(135deg, ${primary}, ${secondary})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Frequently Asked Questions
          </Typography>
          <Typography sx={{
            color: theme.palette.text.secondary,
            maxWidth: 480, mx: "auto",
            lineHeight: 1.8, fontSize: "1rem",
          }}>
            Everything you need to know about INNOVATHON 2026.
          </Typography>
        </Box>
      </motion.div>

      {/* ── SEARCH ── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
        <Box sx={{ mb: 4, maxWidth: 520, mx: "auto" }}>
          <TextField
            fullWidth
            placeholder="Search questions..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setExpanded(null); }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: primary, fontSize: "1.1rem" }} />
                </InputAdornment>
              ),
              endAdornment: search && (
                <InputAdornment position="end">
                  <Box
                    onClick={() => setSearch("")}
                    sx={{
                      cursor: "pointer", display: "flex",
                      color: theme.palette.text.disabled,
                      "&:hover": { color: primary },
                      transition: "color 0.2s",
                    }}
                  >
                    <CloseIcon sx={{ fontSize: "1rem" }} />
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                background: theme.palette.background.paper,
                fontSize: "0.92rem",
                transition: "all 0.25s",
                "& fieldset": { borderColor: `${primary}28` },
                "&:hover fieldset": { borderColor: `${primary}55` },
                "&.Mui-focused fieldset": {
                  borderColor: primary,
                  boxShadow: `0 0 0 3px ${primary}18`,
                },
              },
            }}
          />
        </Box>
      </motion.div>

      {/* ── CATEGORY CHIPS ── */}
      {!isSearching && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.2 }}>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap", mb: 5 }}>
            {[{ key: "all", label: "All", emoji: "✨" }, ...CATEGORIES].map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <Chip
                  key={cat.key}
                  label={`${cat.emoji} ${cat.label}`}
                  onClick={() => { setActiveCategory(cat.key); setExpanded(null); }}
                  sx={{
                    fontWeight: 600, fontSize: "0.8rem",
                    borderRadius: "10px",
                    cursor: "pointer",
                    border: isActive ? `1px solid ${primary}` : `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                    background: isActive ? `${primary}18` : "transparent",
                    color: isActive ? primary : theme.palette.text.secondary,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      background: `${primary}12`,
                      color: primary,
                      border: `1px solid ${primary}55`,
                    },
                  }}
                />
              );
            })}
          </Box>
        </motion.div>
      )}

      {/* ── SEARCH RESULTS ── */}
      {isSearching && (
        <Box sx={{ mb: 2 }}>
          <Typography sx={{
            fontSize: "0.8rem", color: theme.palette.text.secondary,
            mb: 3, textAlign: "center",
          }}>
            {searchResults.length === 0
              ? "No results found."
              : `${searchResults.length} result${searchResults.length !== 1 ? "s" : ""} for "${search}"`}
          </Typography>

          {searchResults.map((faq, i) => {
            const key = `search-${i}`;
            return (
              <Box key={key}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Typography sx={{ fontSize: "0.75rem" }}>{faq.emoji}</Typography>
                  <Typography sx={{
                    fontSize: "0.68rem", fontWeight: 700,
                    color: theme.palette.text.disabled,
                    letterSpacing: "0.08em",
                  }}>
                    {faq.category.toUpperCase()}
                  </Typography>
                </Box>
                <FAQItem
                  faq={faq}
                  index={i}
                  isOpen={expanded === key}
                  onToggle={() => toggle(key)}
                />
              </Box>
            );
          })}
        </Box>
      )}

      {/* ── CATEGORISED FAQs ── */}
      {!isSearching && visibleCategories.map((cat, ci) => (
        <motion.div
          key={cat.key}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: ci * 0.08 }}
          viewport={{ once: true }}
        >
          <Box sx={{ mb: 5 }}>
            {/* CATEGORY HEADER */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
              <Box sx={{
                width: 36, height: 36, borderRadius: "10px",
                background: `${primary}14`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.1rem",
              }}>
                {cat.emoji}
              </Box>
              <Typography sx={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700, fontSize: "0.95rem",
                color: primary, letterSpacing: "0.04em",
              }}>
                {cat.label}
              </Typography>
              <Box sx={{
                flex: 1, height: "1px",
                background: `linear-gradient(90deg, ${primary}33, transparent)`,
              }} />
              <Typography sx={{
                fontSize: "0.72rem", color: theme.palette.text.disabled,
                fontWeight: 600,
              }}>
                {cat.faqs.length} Q
              </Typography>
            </Box>

            {/* FAQs */}
            {cat.faqs.map((faq, fi) => {
              const key = `${cat.key}-${fi}`;
              return (
                <FAQItem
                  key={key}
                  faq={faq}
                  index={fi}
                  isOpen={expanded === key}
                  onToggle={() => toggle(key)}
                />
              );
            })}
          </Box>
        </motion.div>
      ))}

      {/* ── CONTACT SECTION ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Box sx={{
          mt: 6, p: 4, borderRadius: "20px", textAlign: "center",
          background: `linear-gradient(135deg, ${primary}0a, ${secondary}08)`,
          border: `1px solid ${primary}22`,
          position: "relative", overflow: "hidden",
        }}>
          {/* bg glow */}
          <Box sx={{
            position: "absolute", top: -40, left: "50%",
            transform: "translateX(-50%)",
            width: 300, height: 200, borderRadius: "50%",
            background: `radial-gradient(circle, ${primary}10 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />

          <Box sx={{
            width: 48, height: 48, borderRadius: "14px", mx: "auto", mb: 2,
            background: `linear-gradient(135deg, ${primary}28, ${secondary}20)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.4rem",
          }}>
            💬
          </Box>

          <Typography variant="h6" sx={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700, mb: 1,
          }}>
            Still have questions?
          </Typography>

          <Typography sx={{
            color: theme.palette.text.secondary,
            fontSize: "0.9rem", mb: 2.5, lineHeight: 1.7,
          }}>
            Can't find what you're looking for? Drop us an email and
            we'll get back to you as soon as possible.
          </Typography>

          <Box
            component="a"
            href="mailto:cloudiotclub@ncuindia.edu"
            sx={{
              display: "inline-flex", alignItems: "center", gap: 1,
              px: 3, py: 1.2,
              borderRadius: "12px",
              background: `linear-gradient(135deg, ${primary}, ${secondary})`,
              color: isDark ? "#000" : "#fff",
              fontWeight: 700, fontSize: "0.88rem",
              textDecoration: "none",
              boxShadow: `0 4px 20px ${primary}44`,
              transition: "all 0.25s ease",
              "&:hover": {
                boxShadow: `0 6px 28px ${primary}66`,
                transform: "translateY(-2px)",
              },
            }}
          >
            <EmailIcon sx={{ fontSize: "1rem" }} />
            cloudiotclub@ncuindia.edu
          </Box>
        </Box>
      </motion.div>

    </Container>
  );
}