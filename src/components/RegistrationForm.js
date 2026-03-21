import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Chip,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { API, calculateTimeLeft } from "../utils/common";
import Countdown from "./Countdown";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import paymentQRNCU from "../utils/800.png";
import paymentQR from "../utils/950.png";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const STEPS = [
  { num: 1, label: "Team Info" },
  { num: 2, label: "Members" },
  { num: 3, label: "Theme" },
  { num: 4, label: "Payment" },
];

const SLIDE = {
  enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

const isNCU = (university) => {
  const u = university
    .trim()
    .toLowerCase()
    .replace(/[.\-_]/g, " ")
    .replace(/\s+/g, " ");
  return (
    u === "ncu" ||
    u === "the northcap university" ||
    u === "northcap university" ||
    u === "the north cap university" ||
    u === "north cap university" ||
    u === "the ncu" ||
    u === "ncu gurugram" ||
    u === "northcap university gurugram" ||
    u === "the northcap university gurugram"
  );
};

const GAP = 1.8; // uniform vertical gap between every field row

// ─── FIELD WRAPPER — consistent vertical spacing ──────────────────────────────
// function Row({ children, half, twoThird }) {
//   // half = two side-by-side at 50/50, twoThird = 66/33 split
//   if (half) {
//     return <Box sx={{ display: "flex", gap: 1.5 }}>{children}</Box>;
//   }
//   return <Box>{children}</Box>;
// }

// ─── STYLED TEXT FIELD ────────────────────────────────────────────────────────
function Field({ sx, ...props }) {
  const theme = useTheme();
  const p = theme.palette.primary.main;
  const isDark = theme.palette.mode === "dark";
  return (
    <TextField
      fullWidth
      size="small"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
          "& fieldset": {
            borderColor: props.error ? undefined : `${p}28`,
          },
          "&:hover fieldset": { borderColor: `${p}55` },
          "&.Mui-focused fieldset": {
            borderColor: p,
            boxShadow: `0 0 0 3px ${p}18`,
          },
        },
        "& .MuiInputLabel-root.Mui-focused": { color: p },
        ...sx,
      }}
      {...props}
    />
  );
}

// ─── SECTION DIVIDER LABEL ────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <Typography
      sx={{
        fontSize: "0.65rem",
        fontWeight: 700,
        letterSpacing: "0.16em",
        color: "primary.main",
        fontFamily: "'Syne', sans-serif",
        mt: 3,
        mb: 1.5,
        pb: 1,
        borderBottom: (t) => `1px solid ${t.palette.primary.main}18`,
      }}
    >
      {children}
    </Typography>
  );
}

// ─── SIZE SELECTOR ────────────────────────────────────────────────────────────
function SizeSelector({ value, onChange, error, helperText, label }) {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const isDark = theme.palette.mode === "dark";
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "0.72rem",
          color: error ? "error.main" : "text.secondary",
          mb: 0.8,
        }}
      >
        {label}
      </Typography>
      <Box sx={{ display: "flex", gap: 0.8 }}>
        {SIZES.map((s) => {
          const sel = value === s;
          return (
            <Box
              key={s}
              onClick={() => onChange(s)}
              sx={{
                flex: 1,
                height: 38,
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "0.72rem",
                border: sel
                  ? `2px solid ${primary}`
                  : `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                background: sel
                  ? `${primary}18`
                  : isDark
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(0,0,0,0.02)",
                color: sel ? primary : theme.palette.text.secondary,
                boxShadow: sel ? `0 0 12px ${primary}44` : "none",
                transition: "all 0.18s ease",
                userSelect: "none",
                "&:hover": {
                  border: `1px solid ${primary}55`,
                  color: primary,
                  background: `${primary}0e`,
                },
              }}
            >
              {s}
            </Box>
          );
        })}
      </Box>
      {error && helperText && (
        <Typography sx={{ fontSize: "0.72rem", color: "error.main", mt: 0.5 }}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function RegistrationForm() {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const isDark = theme.palette.mode === "dark";

  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [errors, setErrors] = useState({});
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedThemeObj, setSelectedThemeObj] = useState(null);
  const [successDialog, setSuccessDialog] = useState(false);
  const [registeredTeamId, setRegisteredTeamId] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    teamName: "demo",
    teamLead: "demo",
    teamLeadEmail: "abhinav101010yadav@gmail.com",
    teamLeadTshirt: "M",
    phone: "9876543211",
    university: "demo ",
    yearCourse: "demo",
    member1: "demo",
    member1Email: "demo@gmail.com",
    member1Phone: "9876543211",
    member1Tshirt: "M",
    member2: "demoo",
    member2Email: "demoo@gmail.com",
    member2Phone: "9876543211",
    member2Tshirt: "M",
    email: "dmeoo@gmail.com",
    password: "abc123",
    selectedTheme: "",
    ideaDescription: "dd",
  });

  // const [formData, setFormData] = useState({
  //   teamName: "",
  //   teamLead: "",
  //   teamLeadEmail: "",
  //   teamLeadTshirt: "",
  //   phone: "",
  //   university: "",
  //   yearCourse: "",
  //   member1: "",
  //   member1Email: "",
  //   member1Phone: "",
  //   member1Tshirt: "",
  //   member2: "",
  //   member2Email: "",
  //   member2Phone: "",
  //   member2Tshirt: "",
  //   email: "",
  //   password: "",
  //   selectedTheme: "",
  //   ideaDescription: "",
  // });

  useEffect(() => {
    fetch(`${API}/api/themes`)
      .then((r) => r.json())
      .then((d) => {
        setThemes(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ── ALL ORIGINAL VALIDATIONS ───────────────────────────────────────────────
  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validatePhone = (v) => /^[6-9]\d{9}$/.test(v);
  const validateName = (v) => /^[a-zA-Z\s]{2,40}$/.test(v);
  const validatePassword = (v) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(v);

  const updateField = (field, value) => {
    setFormData((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const go = (next) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const handleNextStep1 = () => {
    const e = {};
    if (!validateName(formData.teamName))
      e.teamName = "Enter a valid team name";
    if (!validateName(formData.teamLead)) e.teamLead = "Enter a valid name";
    if (!validateEmail(formData.teamLeadEmail))
      e.teamLeadEmail = "Invalid email";
    if (!validatePhone(formData.phone)) e.phone = "Enter valid 10 digit phone";
    if (!formData.teamLeadTshirt) e.teamLeadTshirt = "Select a size";
    if (!formData.university) e.university = "University required";
    if (formData.university.length <= 3)
      e.university = "University full name required";
    if (!formData.yearCourse) e.yearCourse = "Year/Course required";
    setErrors(e);
    if (!Object.keys(e).length) go(2);
    else toast.error("Fix the errors before continuing");
  };

  const handleNextStep2 = () => {
    const e = {};
    if (!validateName(formData.member1)) e.member1 = "Enter valid name";
    if (!validateEmail(formData.member1Email))
      e.member1Email = "Enter valid email";
    if (!validatePhone(formData.member1Phone))
      e.member1Phone = "Enter valid 10 digit phone";
    if (!formData.member1Tshirt) e.member1Tshirt = "Select a size";
    if (!validateName(formData.member2)) e.member2 = "Enter valid name";
    if (!validateEmail(formData.member2Email))
      e.member2Email = "Enter valid email";
    if (!validatePhone(formData.member2Phone))
      e.member2Phone = "Enter valid 10 digit phone";
    if (!formData.member2Tshirt) e.member2Tshirt = "Select a size";
    if (formData.member1 === formData.member2)
      e.member2 = "Members must be different";
    if (formData.member1Email === formData.member2Email)
      e.member2Email = "Emails must be different";
    if (!validatePassword(formData.password))
      e.password = "Password must contain letters and numbers (min 6 chars)";
    setErrors(e);
    if (!Object.keys(e).length) go(3);
    else toast.error("Fix the errors before continuing");
  };

  const handleSubmit = async () => {
    if (!formData.selectedTheme) {
      toast.error("Please select a theme");
      return;
    }
    if (!formData.ideaDescription) {
      toast.error("Describe your idea");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/api/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      let data = {};
      try {
        data = await res.json();
      } catch {}
      if (res.ok) {
        toast.success("Registration successful 🚀");
        setRegisteredTeamId(data.teamId);
        setSuccessDialog(true); // show dialog, don't redirect yet
        setFormData({
          teamName: "",
          teamLead: "",
          teamLeadEmail: "",
          phone: "",
          university: "",
          yearCourse: "",
          member1: "",
          member2: "",
          member1Email: "",
          member1Phone: "",
          member1Tshirt: "",
          member2Email: "",
          member2Phone: "",
          member2Tshirt: "",
          teamLeadTshirt: "",
          email: "",
          password: "",
          selectedTheme: "",
          ideaDescription: "",
        });
        setStep(1);
        // navigate("/login");
      } else {
        toast.error(data.error || "Registration failed");
      }
    } catch {
      toast.error("Server error");
    }
    setSubmitting(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("9315431144@axl");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (calculateTimeLeft().expired) return <Countdown />;

  // shared button row styles
  const btnRow = { display: "flex", gap: 1.5, mt: 4 };
  const backBtn = {
    borderRadius: "12px",
    py: 1.4,
    flexShrink: 0,
    minWidth: 100,
  };
  const nextBtn = { borderRadius: "12px", py: 1.4, fontWeight: 700, flex: 1 };

  return (
    <Box sx={{ maxWidth: 560, mx: "auto", py: 6 }}>
      <Toaster />

      {/* ── TITLE ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Chip
            label="INNOVATHON 2026 · NCU Gurugram"
            sx={{
              mb: 2,
              px: 1.5,
              fontSize: "0.75rem",
              fontWeight: 600,
              background: `${primary}18`,
              color: primary,
              border: `1px solid ${primary}44`,
              borderRadius: "999px",
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: { xs: "1.8rem", sm: "2.4rem" },
              background: `linear-gradient(135deg, ${primary}, ${secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Register Your Team
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "0.88rem" }}>
            3 members · ₹800 total · Fill all 4 steps
          </Typography>
        </Box>
      </motion.div>

      {/* ── STEPPER ── */}
      <Box sx={{ display: "flex", alignItems: "flex-start", mb: 5 }}>
        {STEPS.map((s, i) => {
          const done = step > s.num;
          const active = step === s.num;
          return (
            <Box
              key={s.num}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flex: i < 3 ? 1 : "none",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0.6,
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "11px",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "0.82rem",
                    background: done
                      ? `linear-gradient(135deg, ${primary}, ${secondary})`
                      : active
                        ? `${primary}18`
                        : isDark
                          ? "rgba(255,255,255,0.04)"
                          : "rgba(0,0,0,0.04)",
                    border: active
                      ? `2px solid ${primary}`
                      : done
                        ? "none"
                        : `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                    color: done
                      ? isDark
                        ? "#000"
                        : "#fff"
                      : active
                        ? primary
                        : theme.palette.text.disabled,
                    boxShadow: active ? `0 0 16px ${primary}44` : "none",
                    transition: "all 0.35s ease",
                  }}
                >
                  {done ? <CheckCircleIcon sx={{ fontSize: "1rem" }} /> : s.num}
                </Box>
                <Typography
                  sx={{
                    fontSize: "0.6rem",
                    fontWeight: active || done ? 700 : 400,
                    color: active || done ? primary : "text.disabled",
                    letterSpacing: "0.05em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {s.label}
                </Typography>
              </Box>
              {i < 3 && (
                <Box
                  sx={{
                    flex: 1,
                    height: "2px",
                    mt: "17px",
                    mx: 0.8,
                    background: done
                      ? `linear-gradient(90deg, ${primary}, ${secondary})`
                      : isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(0,0,0,0.08)",
                    borderRadius: "2px",
                    transition: "background 0.4s ease",
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>

      {/* ── CARD ── */}
      <Box
        sx={{
          borderRadius: "22px",
          border: `1px solid ${primary}22`,
          background: isDark ? "rgba(255,255,255,0.03)" : "#fff",
          boxShadow: `0 8px 40px ${primary}0e`,
          backdropFilter: "blur(12px)",
          overflow: "hidden",
        }}
      >
        {/* card header */}
        <Box
          sx={{
            px: 3.5,
            py: 2,
            borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"}`,
            background: `linear-gradient(135deg, ${primary}08, ${secondary}05)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "0.92rem",
              color: primary,
            }}
          >
            {STEPS[step - 1].label}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.7rem",
              color: "text.disabled",
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
          >
            STEP {step} / 4
          </Typography>
        </Box>

        {/* animated content */}
        <Box sx={{ overflow: "hidden" }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={SLIDE}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            >
              <Box sx={{ px: 3.5, py: 3 }}>
                {/* ══════════════════ STEP 1 ══════════════════ */}
                {step === 1 && (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: GAP }}
                  >
                    <SectionLabel>Team Details</SectionLabel>

                    <Field
                      label="Team Name"
                      value={formData.teamName}
                      error={!!errors.teamName}
                      helperText={errors.teamName}
                      onChange={(e) => updateField("teamName", e.target.value)}
                    />

                    <Field
                      label="Team Lead Name"
                      value={formData.teamLead}
                      error={!!errors.teamLead}
                      helperText={errors.teamLead}
                      onChange={(e) =>
                        updateField(
                          "teamLead",
                          e.target.value.replace(/[^a-zA-Z\s]/g, ""),
                        )
                      }
                    />

                    <Field
                      label="Team Lead Email"
                      value={formData.teamLeadEmail}
                      error={!!errors.teamLeadEmail}
                      helperText={errors.teamLeadEmail}
                      onChange={(e) =>
                        updateField("teamLeadEmail", e.target.value)
                      }
                    />

                    <Field
                      label="Phone"
                      value={formData.phone}
                      error={!!errors.phone}
                      helperText={errors.phone}
                      onChange={(e) =>
                        updateField("phone", e.target.value.replace(/\D/g, ""))
                      }
                    />

                    <SizeSelector
                      label="Team Lead T-Shirt Size"
                      value={formData.teamLeadTshirt}
                      onChange={(s) => updateField("teamLeadTshirt", s)}
                      error={!!errors.teamLeadTshirt}
                      helperText={errors.teamLeadTshirt}
                    />

                    <SectionLabel>University</SectionLabel>

                    <Field
                      label="University (Full Name)"
                      value={formData.university}
                      error={!!errors.university}
                      helperText={errors.university}
                      onChange={(e) =>
                        updateField("university", e.target.value)
                      }
                    />

                    <Field
                      label="Year & Course"
                      value={formData.yearCourse}
                      error={!!errors.yearCourse}
                      helperText={errors.yearCourse}
                      onChange={(e) =>
                        updateField("yearCourse", e.target.value)
                      }
                    />

                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={handleNextStep1}
                      sx={{ ...nextBtn, mt: 1 }}
                    >
                      Continue →
                    </Button>
                  </Box>
                )}

                {/* ══════════════════ STEP 2 ══════════════════ */}
                {step === 2 && (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: GAP }}
                  >
                    {[1, 2].map((m) => (
                      <Box
                        key={m}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: GAP,
                        }}
                      >
                        <SectionLabel>Team Mate {m}</SectionLabel>

                        <Field
                          label={`Member ${m} Name`}
                          value={formData[`member${m}`]}
                          error={!!errors[`member${m}`]}
                          helperText={errors[`member${m}`]}
                          onChange={(e) =>
                            updateField(
                              `member${m}`,
                              e.target.value.replace(/[^a-zA-Z\s]/g, ""),
                            )
                          }
                        />

                        <Field
                          label={`Member ${m} Email`}
                          value={formData[`member${m}Email`]}
                          error={!!errors[`member${m}Email`]}
                          helperText={errors[`member${m}Email`]}
                          onChange={(e) =>
                            updateField(`member${m}Email`, e.target.value)
                          }
                        />

                        <Field
                          label={`Member ${m} Phone`}
                          value={formData[`member${m}Phone`]}
                          error={!!errors[`member${m}Phone`]}
                          helperText={errors[`member${m}Phone`]}
                          onChange={(e) =>
                            updateField(
                              `member${m}Phone`,
                              e.target.value.replace(/\D/g, ""),
                            )
                          }
                        />

                        <SizeSelector
                          label={`Member ${m} T-Shirt Size`}
                          value={formData[`member${m}Tshirt`]}
                          onChange={(s) => updateField(`member${m}Tshirt`, s)}
                          error={!!errors[`member${m}Tshirt`]}
                          helperText={errors[`member${m}Tshirt`]}
                        />
                      </Box>
                    ))}

                    <SectionLabel>Login Credentials</SectionLabel>

                    <Field
                      label="Login Username"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                    />

                    <Field
                      label="Password"
                      type="password"
                      value={formData.password}
                      error={!!errors.password}
                      helperText={errors.password}
                      onChange={(e) => updateField("password", e.target.value)}
                    />

                    <Box sx={btnRow}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => go(1)}
                        sx={backBtn}
                      >
                        ← Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNextStep2}
                        sx={nextBtn}
                      >
                        Continue →
                      </Button>
                    </Box>
                  </Box>
                )}

                {/* ══════════════════ STEP 3 ══════════════════ */}
                {step === 3 && (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: GAP }}
                  >
                    <SectionLabel>Pick a Theme</SectionLabel>

                    {loading ? (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          py: 4,
                        }}
                      >
                        <CircularProgress size={28} color="primary" />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(2, 1fr)",
                          gap: 1.5,
                        }}
                      >
                        {themes.map((t) => {
                          const selected = formData.selectedTheme === t.title;
                          return (
                            <Box
                              key={t._id}
                              onClick={() => {
                                setSelectedThemeObj(t);
                                setDialogOpen(true);
                              }}
                              sx={{
                                borderRadius: "14px",
                                overflow: "hidden",
                                cursor: "pointer",
                                position: "relative",
                                border: selected
                                  ? `2px solid ${primary}`
                                  : `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                                boxShadow: selected
                                  ? `0 0 20px ${primary}44`
                                  : "none",
                                transition: "all 0.22s ease",
                                "&:hover": {
                                  border: `1px solid ${primary}66`,
                                  transform: "translateY(-2px)",
                                  boxShadow: `0 6px 20px ${primary}22`,
                                },
                              }}
                            >
                              <Box
                                component="img"
                                src={`${API}${t.img}`}
                                alt={t.title}
                                sx={{
                                  width: "100%",
                                  height: 90,
                                  objectFit: "cover",
                                  display: "block",
                                }}
                              />
                              <Box
                                sx={{
                                  position: "absolute",
                                  inset: 0,
                                  background:
                                    "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.72) 100%)",
                                }}
                              />
                              <Box
                                sx={{ position: "absolute", bottom: 0, p: 1.2 }}
                              >
                                <Typography
                                  sx={{
                                    fontFamily: "'Syne', sans-serif",
                                    fontWeight: 700,
                                    fontSize: "0.76rem",
                                    color: "#fff",
                                    lineHeight: 1.3,
                                  }}
                                >
                                  {t.title}
                                </Typography>
                              </Box>
                              {selected && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: 7,
                                    right: 7,
                                    width: 20,
                                    height: 20,
                                    borderRadius: "50%",
                                    background: primary,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: `0 0 8px ${primary}`,
                                  }}
                                >
                                  <CheckCircleIcon
                                    sx={{
                                      fontSize: "0.8rem",
                                      color: isDark ? "#000" : "#fff",
                                    }}
                                  />
                                </Box>
                              )}
                            </Box>
                          );
                        })}
                      </Box>
                    )}

                    {formData.selectedTheme && (
                      <Chip
                        label={`✓  ${formData.selectedTheme}`}
                        size="small"
                        sx={{
                          alignSelf: "flex-start",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          background: `${primary}14`,
                          color: primary,
                          border: `1px solid ${primary}44`,
                          borderRadius: "8px",
                        }}
                      />
                    )}

                    <SectionLabel>Project Idea</SectionLabel>

                    <Field
                      label="Describe Your Project Idea"
                      multiline
                      rows={4}
                      value={formData.ideaDescription}
                      helperText={
                        errors.ideaDescription ||
                        `${formData.ideaDescription.length}/1000`
                      }
                      onChange={(e) =>
                        updateField("ideaDescription", e.target.value)
                      }
                    />

                    <Box sx={btnRow}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => go(2)}
                        sx={backBtn}
                      >
                        ← Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={nextBtn}
                        onClick={() => {
                          if (!formData.selectedTheme) {
                            toast.error("Please select a theme");
                            return;
                          }
                          if (!formData.ideaDescription) {
                            toast.error("Describe your idea");
                            return;
                          }
                          go(4);
                        }}
                      >
                        Continue →
                      </Button>
                    </Box>
                  </Box>
                )}

                {/* ══════════════════ STEP 4 ══════════════════ */}
                {step === 4 && (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: GAP }}
                  >
                    <SectionLabel>Payment Summary</SectionLabel>

                    {/* BREAKDOWN TABLE */}
                    <Box
                      sx={{
                        borderRadius: "14px",
                        border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
                        overflow: "hidden",
                      }}
                    >
                      {[
                        {
                          label: "Registration Fee",
                          sub: "Per team",
                          amount: isNCU(formData.university) ? "₹300" : "₹450",
                        },
                        {
                          label: "T-Shirts",
                          sub: "3 members × any size",
                          amount: "₹500",
                        },
                      ].map((row, i) => (
                        <Box
                          key={i}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            px: 2.5,
                            py: 1.6,
                            borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                            background:
                              i % 2 === 0
                                ? "transparent"
                                : isDark
                                  ? "rgba(255,255,255,0.02)"
                                  : "rgba(0,0,0,0.015)",
                          }}
                        >
                          <Box>
                            <Typography
                              sx={{ fontSize: "0.88rem", fontWeight: 500 }}
                            >
                              {row.label}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "0.7rem",
                                color: "text.disabled",
                              }}
                            >
                              {row.sub}
                            </Typography>
                          </Box>
                          <Typography
                            sx={{ fontWeight: 600, fontSize: "0.9rem" }}
                          >
                            {row.amount}
                          </Typography>
                        </Box>
                      ))}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          px: 2.5,
                          py: 2,
                          background: `linear-gradient(135deg, ${primary}0e, ${secondary}08)`,
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 800,
                            fontSize: "0.95rem",
                          }}
                        >
                          Total
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 800,
                            fontSize: "1.35rem",
                            color: primary,
                          }}
                        >
                          {isNCU(formData.university) ? "₹800" : "₹950"}
                        </Typography>
                      </Box>
                    </Box>

                    <SectionLabel>Scan & Pay</SectionLabel>

                    {/* QR + UPI */}
                    <Box
                      sx={{
                        borderRadius: "16px",
                        border: `1px solid ${primary}28`,
                        background: `linear-gradient(135deg, ${primary}08, ${secondary}05)`,
                        p: 2.5,
                        display: "flex",
                        gap: 2.5,
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 110,
                          height: 110,
                          flexShrink: 0,
                          // borderRadius: "14px",
                          overflow: "hidden",
                          border: `2px solid ${primary}44`,
                          background: "#fff",
                          boxShadow: `0 0 20px ${primary}2a`,
                        }}
                      >
                        <Box
                          component="img"
                          src={
                            isNCU(formData.university)
                              ? paymentQRNCU
                              : paymentQR
                          }
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.5,
                        }}
                      >
                        {/* fee note */}
                        <Box
                          sx={{
                            px: 1.5,
                            py: 0.8,
                            borderRadius: "10px",
                            background: isNCU(formData.university)
                              ? `${primary}14`
                              : `${secondary}14`,
                            border: `1px solid ${isNCU(formData.university) ? primary : secondary}33`,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              color: isNCU(formData.university)
                                ? primary
                                : secondary,
                            }}
                          >
                            {isNCU(formData.university)
                              ? "₹800 Total (₹300 Reg + ₹500 T-Shirts)"
                              : "₹950 Total (₹450 Reg + ₹500 T-Shirts)"}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography
                            sx={{
                              fontSize: "0.6rem",
                              fontWeight: 700,
                              color: "text.disabled",
                              letterSpacing: "0.12em",
                              mb: 0.4,
                            }}
                          >
                            UPI ID
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.8,
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: "'Syne', sans-serif",
                                fontWeight: 800,
                                fontSize: "0.95rem",
                                color: primary,
                              }}
                            >
                              9315431144@axl
                            </Typography>
                            <Box
                              onClick={handleCopy}
                              sx={{
                                cursor: "pointer",
                                display: "flex",
                                p: 0.5,
                                borderRadius: "6px",
                                color: copied
                                  ? "success.main"
                                  : "text.disabled",
                                background: copied
                                  ? "rgba(76,175,80,0.1)"
                                  : "transparent",
                                transition: "all 0.2s",
                                "&:hover": {
                                  color: primary,
                                  background: `${primary}18`,
                                },
                              }}
                            >
                              {copied ? (
                                <CheckCircleIcon sx={{ fontSize: "0.85rem" }} />
                              ) : (
                                <ContentCopyIcon sx={{ fontSize: "0.85rem" }} />
                              )}
                            </Box>
                          </Box>
                        </Box>

                        <Box>
                          <Typography
                            sx={{
                              fontSize: "0.6rem",
                              fontWeight: 700,
                              color: "text.disabled",
                              letterSpacing: "0.12em",
                              mb: 0.4,
                            }}
                          >
                            CONTACT FOR VERIFICATION
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: "'Syne', sans-serif",
                              fontWeight: 700,
                              fontSize: "0.88rem",
                              color: primary,
                            }}
                          >
                            +91 9870340530
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* WARNING */}
                    <Box
                      sx={{
                        px: 2,
                        py: 1.4,
                        borderRadius: "12px",
                        background: isDark
                          ? "rgba(255,80,80,0.07)"
                          : "rgba(255,80,80,0.06)",
                        border: "1px solid rgba(255,80,80,0.2)",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.79rem",
                          color: "error.main",
                          lineHeight: 1.65,
                        }}
                      >
                        ⚠️ Complete the payment first, then share your
                        screenshot with the contact above. Registration is
                        confirmed only after verification.
                      </Typography>
                    </Box>

                    <Box sx={btnRow}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => go(3)}
                        sx={backBtn}
                      >
                        ← Back
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        disabled={submitting || calculateTimeLeft().expired}
                        onClick={handleSubmit}
                        sx={nextBtn}
                      >
                        {calculateTimeLeft().expired ? (
                          "Registrations Closed"
                        ) : submitting ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          "Confirm & Submit 🚀"
                        )}
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>

      {/* ── SUCCESS DIALOG ── */}
      <Dialog
        open={successDialog}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "22px",
            border: `1px solid ${primary}33`,
            background: theme.palette.background.default,
            boxShadow: `0 24px 80px ${primary}28`,
            p: 1,
          },
        }}
      >
        <DialogContent>
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                mx: "auto",
                mb: 2,
                background: `linear-gradient(135deg, ${primary}28, ${primary}10)`,
                border: `2px solid ${primary}55`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.8rem",
              }}
            >
              🎉
            </Box>
            <Typography
              sx={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "1.3rem",
                mb: 0.5,
                color: primary,
              }}
            >
              Registration Successful!
            </Typography>
            <Typography
              sx={{ fontSize: "0.85rem", color: "text.secondary", mb: 3 }}
            >
              Save your Team ID — you'll need it to log in.
            </Typography>

            {/* Team ID box */}
            <Box
              sx={{
                px: 3,
                py: 2,
                borderRadius: "14px",
                background: `${primary}10`,
                border: `2px dashed ${primary}55`,
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: "text.disabled",
                  letterSpacing: "0.14em",
                  mb: 0.5,
                }}
              >
                YOUR TEAM ID
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 900,
                  fontSize: "1.5rem",
                  color: primary,
                  letterSpacing: "0.08em",
                }}
              >
                {registeredTeamId}
              </Typography>
            </Box>

            <Typography
              sx={{ fontSize: "0.78rem", color: "text.secondary", mb: 1 }}
            >
              📧 A confirmation email has been sent to your team lead's email.
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "error.main" }}>
              ⚠️ Screenshot this now before closing!
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ borderRadius: "12px", fontWeight: 700, py: 1.2 }}
            onClick={() => {
              setSuccessDialog(false);
              navigate("/login");
            }}
          >
            Go to Login →
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── THEME DIALOG ── */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "22px",
            overflow: "hidden",
            border: `1px solid ${primary}33`,
            background: theme.palette.background.default,
            boxShadow: `0 24px 80px ${primary}28`,
          },
        }}
      >
        {selectedThemeObj && (
          <>
            <Box sx={{ position: "relative", height: 190 }}>
              <Box
                component="img"
                src={`${API}${selectedThemeObj.img}`}
                alt={selectedThemeObj.title}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.78) 100%)",
                }}
              />
              <Box sx={{ position: "absolute", bottom: 0, p: 2.5 }}>
                <Typography
                  sx={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    color: "#fff",
                  }}
                >
                  {selectedThemeObj.title}
                </Typography>
              </Box>
            </Box>
            <DialogContent sx={{ pt: 2.5 }}>
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  color: "text.secondary",
                  lineHeight: 1.75,
                }}
              >
                {selectedThemeObj.desc}
              </Typography>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
              <Button
                onClick={() => setDialogOpen(false)}
                variant="outlined"
                sx={{ borderRadius: "11px" }}
              >
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: "11px" }}
                onClick={() => {
                  updateField("selectedTheme", selectedThemeObj.title);
                  setDialogOpen(false);
                }}
              >
                Select Theme
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
