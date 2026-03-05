import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { API } from "../utils/api";

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedThemeObj, setSelectedThemeObj] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    teamName: "",
    teamLead: "",
    teamLeadEmail: "",
    phone: "",
    university: "",
    yearCourse: "",
    member1: "",
    member2: "",
    email: "",
    password: "",
    selectedTheme: "",
    ideaDescription: "",
  });

  const containerWidth = step === 3 ? "md" : "sm";

  /* ---------------- LOAD THEMES ---------------- */

  useEffect(() => {
    fetch(`${API}/api/themes`)
      .then((res) => res.json())
      .then((data) => {
        setThemes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Theme fetch error:", err);
        setLoading(false);
      });
  }, []);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[6-9]\d{9}$/.test(phone);
  };

  const validateName = (name) => {
    return /^[a-zA-Z\s]{2,40}$/.test(name);
  };

  const validatePassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
  };

  /* ---------------- STEP 1 ---------------- */

  const handleNextStep1 = () => {
    const newErrors = {};

    if (!validateName(formData.teamName))
      newErrors.teamName = "Enter a valid team name";

    if (!validateName(formData.teamLead))
      newErrors.teamLead = "Enter a valid name";

    if (!validateEmail(formData.teamLeadEmail))
      newErrors.teamLeadEmail = "Invalid email";

    if (!validatePhone(formData.phone))
      newErrors.phone = "Enter valid 10 digit phone";

    if (!formData.university) newErrors.university = "University required";

    if (formData.university.length < 3) newErrors.university = "No Short Forms";

    if (!formData.yearCourse) newErrors.yearCourse = "Year/Course required";

    setErrors(newErrors);
    console.log(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setStep(2);
    } else {
      toast.error("Fix the errors before continuing");
    }
  };

  /* ---------------- STEP 2 ---------------- */

  const handleNextStep2 = () => {
    const newErrors = {};

    if (!validateName(formData.member1)) newErrors.member1 = "Enter valid name";

    if (!validateName(formData.member2)) newErrors.member2 = "Enter valid name";

    // if (!validateEmail(formData.email)) newErrors.email = "Invalid email";

    if (formData.member1 === formData.member2)
      newErrors.member2 = "Members must be different";

    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!validatePassword(formData.password))
      newErrors.password = "Password must contain letters and numbers";

    setErrors(newErrors);
    console.log(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setStep(3);
    } else {
      toast.error("Fix the errors before continuing");
    }
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async () => {
    if (!formData.selectedTheme) {
      toast.error("Please select a theme");
      return;
    }

    if (!formData.ideaDescription) {
      toast.error("Please describe your idea");
      return;
    }

    setSubmitting(true); // start loader

    try {
      const response = await fetch(`${API}/api/registrations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        console.error("Invalid JSON from server");
      }

      if (response.ok) {
        toast.success("Registration successful 🚀");

        alert(`Your Team ID is: ${data.teamId}`);

        setFormData({
          teamName: "",
          teamLead: "",
          teamLeadEmail: "",
          phone: "",
          university: "",
          yearCourse: "",
          member1: "",
          member2: "",
          email: "",
          password: "",
          selectedTheme: "",
          ideaDescription: "",
        });

        setStep(1);
      } else {
        toast.error(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Server error");
    }

    setSubmitting(false); // stop loader
  };

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });

    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <Container
      maxWidth={containerWidth}
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Toaster />

      {loading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            width: "100%",
            p: 4,
            borderRadius: 3,
            background: (theme) => theme.palette.background.paper,
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6" align="center" sx={{ mb: 3 }}>
            Hackathon Registration
          </Typography>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <TextField
                fullWidth
                label="Name of Team"
                required
                margin="normal"
                value={formData.teamName}
                error={!!errors.teamName}
                helperText={errors.teamName}
                onChange={(e) => {
                  setFormData({ ...formData, teamName: e.target.value });
                  updateField("teamName", e.target.value);
                }}
              />

              <TextField
                fullWidth
                label="Team Lead Name"
                required
                margin="normal"
                value={formData.teamLead}
                error={!!errors.teamLead}
                helperText={errors.teamLead}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    teamLead: e.target.value.replace(/[^a-zA-Z\s]/g, ""),
                  })
                }
              />

              <TextField
                fullWidth
                label="Team Lead Email"
                required
                margin="normal"
                value={formData.teamLeadEmail}
                error={!!errors.teamLeadEmail}
                helperText={errors.teamLeadEmail}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    teamLeadEmail: e.target.value,
                  })
                }
              />

              <TextField
                fullWidth
                label="Phone Number"
                margin="normal"
                required
                inputProps={{ inputMode: "numeric", maxLength: 10 }}
                value={formData.phone}
                error={!!errors.phone}
                helperText={errors.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value.replace(/\D/g, ""),
                  })
                }
              />

              <TextField
                fullWidth
                label="University (Full Form)"
                required
                margin="normal"
                value={formData.university}
                error={!!errors.university}
                helperText={errors.university}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    university: e.target.value,
                  })
                }
              />

              <TextField
                fullWidth
                label="Year & Course"
                required
                margin="normal"
                value={formData.yearCourse}
                error={!!errors.yearCourse}
                helperText={errors.yearCourse}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    yearCourse: e.target.value,
                  })
                }
              />

              <Button
                fullWidth
                sx={{ mt: 3 }}
                variant="contained"
                onClick={handleNextStep1}
              >
                Next
              </Button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <Typography sx={{ mb: 2 }}>
                Team Size: <strong>3 Members</strong>
              </Typography>

              <TextField
                fullWidth
                label="Team Mate 1 Name"
                required
                margin="normal"
                value={formData.member1}
                error={!!errors.member1}
                helperText={errors.member1}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    member1: e.target.value.replace(/[^a-zA-Z\s]/g, ""),
                  })
                }
              />

              <TextField
                fullWidth
                label="Team Mate 2 Name"
                required
                margin="normal"
                value={formData.member2}
                error={!!errors.member2}
                helperText={errors.member2}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    member2: e.target.value.replace(/[^a-zA-Z\s]/g, ""),
                  })
                }
              />

              <TextField
                fullWidth
                label="Team Login Username"
                margin="normal"
                required
                type="email"
                value={formData.email}
                error={!!errors.email}
                helperText={errors.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <TextField
                fullWidth
                label="Password"
                margin="normal"
                required
                type="password"
                value={formData.password}
                error={!!errors.password}
                helperText={errors.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                <Button fullWidth variant="outlined" onClick={() => setStep(1)}>
                  Back
                </Button>

                <Button fullWidth variant="contained" onClick={handleNextStep2}>
                  Next
                </Button>
              </Box>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <Typography sx={{ mb: 3 }}>Select a Theme</Typography>

              <Grid container spacing={3} justifyContent="center">
                {themes.map((theme) => {
                  const isSelected = formData.selectedTheme === theme.title;

                  return (
                    <Grid item xs={12} sm={6} md={4} key={theme._id}>
                      <Card
                        sx={{
                          cursor: "pointer",
                          border: (themeMui) =>
                            isSelected
                              ? `2px solid ${themeMui.palette.primary.main}`
                              : `1px solid ${themeMui.palette.divider}`,
                          ":hover": {
                            border: "2px solid #00ffa3",
                          },
                        }}
                        onClick={() => {
                          setSelectedThemeObj(theme);
                          setDialogOpen(true);
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={`${API}${theme.img}`}
                          sx={{ height: 160 }}
                        />
                        <CardContent>
                          <Typography>{theme.title}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Describe Your Project Idea"
                margin="normal"
                required
                inputProps={{ maxLength: 1000 }}
                value={formData.ideaDescription}
                helperText={`${formData.ideaDescription.length}/1000`}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ideaDescription: e.target.value,
                  })
                }
              />

              <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                <Button fullWidth variant="outlined" onClick={() => setStep(2)}>
                  Back
                </Button>

                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                </Button>
              </Box>
            </>
          )}
        </Box>
      )}

      {/* THEME DIALOG */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#0f0f0f",
            borderRadius: 3,
          },
        }}
      >
        {selectedThemeObj && (
          <>
            <DialogTitle>{selectedThemeObj.title}</DialogTitle>

            <DialogContent>
              <Box
                component="img"
                src={`${API}${selectedThemeObj.img}`}
                sx={{ width: "100%", mb: 2 }}
              />
              <Typography>{selectedThemeObj.desc}</Typography>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>

              <Button
                variant="contained"
                onClick={() => {
                  setFormData({
                    ...formData,
                    selectedTheme: selectedThemeObj.title,
                  });
                  setDialogOpen(false);
                }}
              >
                Select
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}
