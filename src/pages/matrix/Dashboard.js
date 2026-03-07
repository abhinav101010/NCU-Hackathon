import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Grid,
  Box,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { API } from "../../utils/common";

export default function Dashboard() {
  const [team, setTeam] = useState(null);
  const [themes, setThemes] = useState([]);
  const [editing, setEditing] = useState(false);

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

  const handleChange = (field, value) => {
    setTeam((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    const payload = {
      teamName: team.teamName,
      teamLead: team.teamLead,
      phone: team.phone,
      university: team.university,
      yearCourse: team.yearCourse,
      member1: team.member1,
      member2: team.member2,
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

  if (!team)
    return (
      <Box sx={{ mt: 20, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Container maxWidth="md" sx={{ mt: 12 }}>
      <Paper sx={{ p: 5 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {team.teamName} Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage your team details and project submission
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          {/* TEAM NAME */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Team Name"
              value={team.teamName || ""}
              disabled={!editing}
              onChange={(e) => handleChange("teamName", e.target.value)}
            />
          </Grid>

          {/* TEAM LEAD */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Team Lead"
              value={team.teamLead || ""}
              disabled={!editing}
              onChange={(e) => handleChange("teamLead", e.target.value)}
            />
          </Grid>

          {/* PHONE */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              value={team.phone || ""}
              disabled={!editing}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </Grid>

          {/* EMAIL */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              value={team.email || ""}
              disabled
            />
          </Grid>

          {/* UNIVERSITY */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="University"
              value={team.university || ""}
              disabled={!editing}
              onChange={(e) => handleChange("university", e.target.value)}
            />
          </Grid>

          {/* YEAR COURSE */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Year & Course"
              value={team.yearCourse || ""}
              disabled={!editing}
              onChange={(e) => handleChange("yearCourse", e.target.value)}
            />
          </Grid>

          {/* MEMBER 1 */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Team Member 1"
              value={team.member1 || ""}
              disabled={!editing}
              onChange={(e) => handleChange("member1", e.target.value)}
            />
          </Grid>

          {/* MEMBER 2 */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Team Member 2"
              value={team.member2 || ""}
              disabled={!editing}
              onChange={(e) => handleChange("member2", e.target.value)}
            />
          </Grid>

          {/* THEME */}
          <Grid item xs={12}>
            <FormControl fullWidth disabled={!editing}>
              <InputLabel>Select Theme</InputLabel>
              <Select
                value={team.selectedTheme || ""}
                label="Select Theme"
                onChange={(e) => handleChange("selectedTheme", e.target.value)}
              >
                {themes.map((theme) => (
                  <MenuItem key={theme._id} value={theme.title}>
                    {theme.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* IDEA DESCRIPTION */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={8}
              label="Project Idea Description"
              placeholder="Explain your project idea in detail. Include problem statement, solution, technologies, and impact."
              value={team.ideaDescription || ""}
              disabled={!editing}
              onChange={(e) => handleChange("ideaDescription", e.target.value)}
              helperText="Provide a detailed explanation of your project idea"
              sx={{
                "& textarea": {
                  fontSize: "15px",
                  lineHeight: 1.6,
                },
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          {!editing ? (
            <Button variant="contained" onClick={() => setEditing(true)}>
              Edit Details
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleUpdate}
            >
              Save Changes
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
