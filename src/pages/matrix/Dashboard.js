import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Grid,
  Box,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { API } from "../../utils/common";

const tshirtSizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function Dashboard() {
  const [team, setTeam] = useState(null);
  const [themes, setThemes] = useState([]);
  const [editing, setEditing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("teamToken");

  useEffect(() => {
    loadTeam();
    loadThemes();
  }, []);

  const loadTeam = async () => {
    const res = await fetch(`${API}/api/registrations/me`, {
      headers: { Authorization: token },
    });
    const data = await res.json();
    setTeam(data);
  };

  const loadThemes = async () => {
    const res = await fetch(`${API}/api/themes`);
    const data = await res.json();
    setThemes(data);
  };

  const handleFieldChange = (field, value) => {
    setTeam((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAccordion = (panel) => (_, isExpanded) =>
    setExpanded(isExpanded ? panel : false);

  const handleUpdate = async () => {
    const payload = {
      teamName: team.teamName,
      teamLead: team.teamLead,
      phone: team.phone,
      university: team.university,
      yearCourse: team.yearCourse,
      member1: team.member1,
      member2: team.member2,
      teamLeadTshirt: team.teamLeadTshirt,
      member1Tshirt: team.member1Tshirt,
      member2Tshirt: team.member2Tshirt,
      selectedTheme: team.selectedTheme,
      ideaDescription: team.ideaDescription,
    };

    const res = await fetch(`${API}/api/registrations/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setTeam(data);
    setEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("teamToken");
    navigate("/login");
  };

  if (!team)
    return (
      <Box sx={{ mt: 20, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Container maxWidth="md" sx={{ mt: 12, mb: 8 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Team Dashboard
          </Typography>
          <Typography variant="h6">
            Logged in as <b>{team.teamName}</b>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your hackathon team details and project idea.
          </Typography>
        </Box>

        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* TEAM INFO */}
      <Accordion
        expanded={expanded === "team"}
        onChange={handleAccordion("team")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>Team Info</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Team Name"
                value={team.teamName || ""}
                disabled={!editing}
                onChange={(e) => handleFieldChange("teamName", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Team Lead"
                value={team.teamLead || ""}
                disabled={!editing}
                onChange={(e) => handleFieldChange("teamLead", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth disabled={!editing}>
                <InputLabel>Team Lead T-Shirt</InputLabel>
                <Select
                  value={team.teamLeadTshirt || ""}
                  label="Team Lead T-Shirt"
                  onChange={(e) =>
                    handleFieldChange("teamLeadTshirt", e.target.value)
                  }
                >
                  {tshirtSizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Team Lead Email"
                value={team.teamLeadEmail || ""}
                disabled
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                value={team.phone || ""}
                disabled={!editing}
                onChange={(e) => handleFieldChange("phone", e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Team ID: {team.teamId}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Registered on: {new Date(team.createdAt).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* UNIVERSITY */}
      <Accordion
        expanded={expanded === "university"}
        onChange={handleAccordion("university")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>University Info</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="University"
                value={team.university || ""}
                disabled={!editing}
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
                disabled={!editing}
                onChange={(e) =>
                  handleFieldChange("yearCourse", e.target.value)
                }
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* MEMBERS + TSHIRT */}
      <Accordion
        expanded={expanded === "members"}
        onChange={handleAccordion("members")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>Team Members & T-Shirt Sizes</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Member 1"
                value={team.member1 || ""}
                disabled={!editing}
                onChange={(e) => handleFieldChange("member1", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth disabled={!editing}>
                <InputLabel>Member 1 T-Shirt</InputLabel>
                <Select
                  value={team.member1Tshirt || ""}
                  label="Member 1 T-Shirt"
                  onChange={(e) =>
                    handleFieldChange("member1Tshirt", e.target.value)
                  }
                >
                  {tshirtSizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Member 2"
                value={team.member2 || ""}
                disabled={!editing}
                onChange={(e) => handleFieldChange("member2", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth disabled={!editing}>
                <InputLabel>Member 2 T-Shirt</InputLabel>
                <Select
                  value={team.member2Tshirt || ""}
                  label="Member 2 T-Shirt"
                  onChange={(e) =>
                    handleFieldChange("member2Tshirt", e.target.value)
                  }
                >
                  {tshirtSizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* IDEA */}
      <Accordion
        expanded={expanded === "idea"}
        onChange={handleAccordion("idea")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>Hackathon Idea</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth disabled={!editing}>
                <InputLabel>Select Theme</InputLabel>
                <Select
                  value={team.selectedTheme || ""}
                  label="Select Theme"
                  onChange={(e) =>
                    handleFieldChange("selectedTheme", e.target.value)
                  }
                >
                  {themes.map((theme) => (
                    <MenuItem key={theme._id} value={theme.title}>
                      {theme.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={10}
                maxRows={20}
                label="Project Idea Description"
                placeholder="Describe your hackathon idea, problem statement, solution, and how it works..."
                value={team.ideaDescription || ""}
                disabled={!editing}
                onChange={(e) =>
                  handleFieldChange("ideaDescription", e.target.value)
                }
                sx={{
                  "& textarea": {
                    resize: "both",
                    fontSize: "1rem",
                    lineHeight: 1.6,
                  },
                }}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* ACTION BUTTON */}
      <Box sx={{ mt: 4 }}>
        {!editing ? (
          <Button variant="contained" onClick={() => setEditing(true)}>
            Edit Details
          </Button>
        ) : (
          <Button variant="contained" color="secondary" onClick={handleUpdate}>
            Save Changes
          </Button>
        )}
      </Box>
    </Container>
  );
}
