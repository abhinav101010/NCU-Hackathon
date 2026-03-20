import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { API, hackathonDate } from "../../utils/common";
import { useTheme } from "@mui/material/styles";

const TSHIRT_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function Dashboard() {
  const theme = useTheme();
  const [team, setTeam] = useState(null);
  const [themes, setThemes] = useState([]);
  const [editing, setEditing] = useState(false);
  const [expanded, setExpanded] = useState("team");
  const navigate = useNavigate();
  const token = localStorage.getItem("teamToken");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const EDIT_LIMIT_DATE = new Date(hackathonDate);
  EDIT_LIMIT_DATE.setDate(EDIT_LIMIT_DATE.getDate() + 2);
  const canEdit = new Date() < EDIT_LIMIT_DATE;

  const primary = theme.palette.primary.main;

  useEffect(() => {
    loadTeam();
    loadThemes();
  }, []);

  const loadTeam = async () => {
    try {
      const res = await fetch(`${API}/api/registrations/me`, {
        headers: { Authorization: token },
      });
      if (!res.ok) {
        // Token invalid or expired — kick back to login
        localStorage.removeItem("teamToken");
        navigate("/login");
        return;
      }
      const data = await res.json();
      setTeam(data);
    } catch {
      localStorage.removeItem("teamToken");
      navigate("/login");
    }
  };

  const loadThemes = async () => {
    const res = await fetch(`${API}/api/themes`);
    const data = await res.json();
    setThemes(data);
  };

  const handleFieldChange = (field, value) =>
    setTeam((prev) => ({ ...prev, [field]: value }));

  const handleAccordion = (panel) => (_, isExpanded) =>
    setExpanded(isExpanded ? panel : false);

  const handleUpdate = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!team.member1Email || !team.member2Email) {
      alert("Member emails are required");
      return;
    }

    const payload = {
      teamName: team.teamName,
      teamLead: team.teamLead,
      phone: team.phone,
      university: team.university,
      yearCourse: team.yearCourse,
      member1: team.member1,
      member1Email: team.member1Email,
      member1Phone: team.member1Phone,
      member2: team.member2,
      member2Email: team.member2Email,
      member2Phone: team.member2Phone,
      teamLeadTshirt: team.teamLeadTshirt,
      member1Tshirt: team.member1Tshirt,
      member2Tshirt: team.member2Tshirt,
      selectedTheme: team.selectedTheme,
      ideaDescription: team.ideaDescription,
      email: team.email,
    };
    if (newPassword) payload.password = newPassword;

    const res = await fetch(`${API}/api/registrations/me`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setTeam(data);
    setEditing(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleLogout = () => {
    localStorage.removeItem("teamToken");
    navigate("/login");
  };

  const fieldProps = (disabled) => ({
    disabled,
    size: "small",
    sx: {
      "& .MuiOutlinedInput-root": {
        borderRadius: "10px",
        background: disabled ? "transparent" : `${primary}08`,
      },
    },
  });

  if (!team)
    return (
      <Box sx={{ mt: 20, textAlign: "center" }}>
        <CircularProgress sx={{ color: primary }} />
      </Box>
    );

  const initials = team.teamName?.slice(0, 2).toUpperCase() || "TM";

  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 10 }}>
      {/* ── HEADER ── */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          borderRadius: "20px",
          background: `linear-gradient(135deg, ${primary}12, ${theme.palette.secondary.main}08)`,
          border: `1px solid ${primary}22`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              width: 52,
              height: 52,
              background: `linear-gradient(135deg, ${primary}, ${theme.palette.secondary.main})`,
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "1.1rem",
              color: theme.palette.mode === "dark" ? "#000" : "#fff",
            }}
          >
            {initials}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
              {team.teamName}
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}
            >
              <Chip
                label={team.teamId}
                size="small"
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  background: `${primary}20`,
                  color: primary,
                  border: `1px solid ${primary}44`,
                  borderRadius: "6px",
                  height: 20,
                }}
              />
              <Typography variant="caption" color="text.secondary">
                Registered {new Date(team.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          size="small"
          sx={{ borderRadius: "10px" }}
        >
          Logout
        </Button>
      </Box>

      {/* ── ACCORDIONS ── */}
      {[
        {
          id: "login",
          label: "Login Credentials",
          content: (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Login Username"
                  value={team.email || ""}
                  {...fieldProps(!editing)}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                />
              </Grid>
              {editing && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="New Password"
                      type="password"
                      value={newPassword}
                      {...fieldProps(false)}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Confirm Password"
                      type="password"
                      value={confirmPassword}
                      {...fieldProps(false)}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          ),
        },
        {
          id: "team",
          label: "Team Info",
          content: (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Team Name"
                  value={team.teamName || ""}
                  {...fieldProps(!editing)}
                  onChange={(e) =>
                    handleFieldChange("teamName", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Team Lead"
                  value={team.teamLead || ""}
                  {...fieldProps(!editing)}
                  onChange={(e) =>
                    handleFieldChange("teamLead", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Team Lead Email"
                  value={team.teamLeadEmail || ""}
                  disabled
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={team.phone || ""}
                  {...fieldProps(!editing)}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small" disabled={!editing}>
                  <InputLabel>Team Lead T-Shirt</InputLabel>
                  <Select
                    value={team.teamLeadTshirt || ""}
                    label="Team Lead T-Shirt"
                    onChange={(e) =>
                      handleFieldChange("teamLeadTshirt", e.target.value)
                    }
                    sx={{ borderRadius: "10px" }}
                  >
                    {TSHIRT_SIZES.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          ),
        },
        {
          id: "university",
          label: "University Info",
          content: (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="University"
                  value={team.university || ""}
                  {...fieldProps(!editing)}
                  onChange={(e) =>
                    handleFieldChange("university", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Year & Course"
                  value={team.yearCourse || ""}
                  {...fieldProps(!editing)}
                  onChange={(e) =>
                    handleFieldChange("yearCourse", e.target.value)
                  }
                />
              </Grid>
            </Grid>
          ),
        },
        {
          id: "members",
          label: "Team Members & T-Shirt Sizes",
          content: (
            <Grid container spacing={2}>
              {[1, 2].map((m) => (
                <Grid item xs={12} key={m}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="primary"
                    sx={{ mb: 1.5 }}
                  >
                    Member {m}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={`Member ${m} Name`}
                        value={team[`member${m}`] || ""}
                        {...fieldProps(!editing)}
                        onChange={(e) =>
                          handleFieldChange(`member${m}`, e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={`Member ${m} Email`}
                        value={team[`member${m}Email`] || ""}
                        {...fieldProps(!editing)}
                        onChange={(e) =>
                          handleFieldChange(`member${m}Email`, e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={`Member ${m} Phone`}
                        value={team[`member${m}Phone`] || ""}
                        {...fieldProps(!editing)}
                        onChange={(e) =>
                          handleFieldChange(`member${m}Phone`, e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth size="small" disabled={!editing}>
                        <InputLabel>T-Shirt Size</InputLabel>
                        <Select
                          value={team[`member${m}Tshirt`] || ""}
                          label="T-Shirt Size"
                          onChange={(e) =>
                            handleFieldChange(
                              `member${m}Tshirt`,
                              e.target.value,
                            )
                          }
                          sx={{ borderRadius: "10px" }}
                        >
                          {TSHIRT_SIZES.map((s) => (
                            <MenuItem key={s} value={s}>
                              {s}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          ),
        },
        {
          id: "idea",
          label: "Hackathon Idea",
          content: (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth size="small" disabled>
                  <InputLabel>Selected Theme</InputLabel>
                  <Select
                    value={team.selectedTheme || ""}
                    label="Selected Theme"
                    sx={{ borderRadius: "10px" }}
                  >
                    {themes.map((t) => (
                      <MenuItem key={t._id} value={t.title}>
                        {t.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  minRows={8}
                  maxRows={20}
                  label="Project Idea Description"
                  value={team.ideaDescription || ""}
                  {...fieldProps(!editing)}
                  onChange={(e) =>
                    handleFieldChange("ideaDescription", e.target.value)
                  }
                />
              </Grid>
            </Grid>
          ),
        },
      ].map(({ id, label, content }) => (
        <Accordion
          key={id}
          expanded={expanded === id}
          onChange={handleAccordion(id)}
          sx={{ mb: 1.5 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: primary }} />}
          >
            <Typography
              fontWeight={700}
              sx={{ color: expanded === id ? primary : "inherit" }}
            >
              {label}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 2 }}>{content}</AccordionDetails>
        </Accordion>
      ))}

      {/* ── ACTION ── */}
      <Box sx={{ mt: 3, display: "flex", gap: 2, alignItems: "center" }}>
        {!editing ? (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setEditing(true)}
            disabled={!canEdit}
            sx={{ px: 3, borderRadius: "12px" }}
          >
            Edit Details
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleUpdate}
              sx={{ px: 3, borderRadius: "12px" }}
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setEditing(false);
                loadTeam();
              }}
              sx={{ borderRadius: "12px" }}
            >
              Cancel
            </Button>
          </>
        )}
      </Box>

      {!canEdit && (
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            color: theme.palette.error.main,
            background: `${theme.palette.error.main}12`,
            border: `1px solid ${theme.palette.error.main}33`,
            px: 2,
            py: 1,
            borderRadius: "10px",
            display: "inline-block",
          }}
        >
          Editing period has expired. You can only edit details within 2 days
          after registration closes.
        </Typography>
      )}
    </Container>
  );
}
