import { useState } from "react";
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
// import themes from "../data/themes";
import { useEffect } from "react";

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedThemeObj, setSelectedThemeObj] = useState(null);
  const [formData, setFormData] = useState({
    teamName: "",
    teamLead: "",
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
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/themes")
      .then((res) => res.json())
      .then((data) => {
        setThemes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // STEP 1 VALIDATION
  const handleNextStep1 = () => {
    const { teamName, teamLead, phone, university, yearCourse } = formData;

    if (!teamName || !teamLead || !phone || !university || !yearCourse) {
      toast.error("Please fill all required fields");
      return;
    }

    setStep(2);
  };

  // STEP 2 VALIDATION
  const handleNextStep2 = () => {
    const { member1, member2, email, password } = formData;

    if (!member1 || !member2) {
      toast.error("Team size must be exactly 3 members");
      return;
    }

    if (!email || !password) {
      toast.error("Email and Password are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setStep(3);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful 🚀");

        alert(`Your Team ID is: ${data.teamId}`);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Server error");
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
          background: "#111",
          border: "1px solid rgba(255,255,255,0.1)",
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
              margin="normal"
              value={formData.teamName}
              onChange={(e) =>
                setFormData({ ...formData, teamName: e.target.value })
              }
            />

            <TextField
              fullWidth
              label="Team Lead Name"
              margin="normal"
              value={formData.teamLead}
              onChange={(e) =>
                setFormData({ ...formData, teamLead: e.target.value })
              }
            />

            <TextField
              fullWidth
              label="Phone Number"
              margin="normal"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 10,
              }}
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value.replace(/\D/g, ""),
                })
              }
            />

            <TextField
              fullWidth
              label="University"
              margin="normal"
              value={formData.university}
              onChange={(e) =>
                setFormData({ ...formData, university: e.target.value })
              }
            />

            <TextField
              fullWidth
              label="Year & Course"
              margin="normal"
              value={formData.yearCourse}
              onChange={(e) =>
                setFormData({ ...formData, yearCourse: e.target.value })
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
              margin="normal"
              value={formData.member1}
              onChange={(e) =>
                setFormData({ ...formData, member1: e.target.value })
              }
            />

            <TextField
              fullWidth
              label="Team Mate 2 Name"
              margin="normal"
              value={formData.member2}
              onChange={(e) =>
                setFormData({ ...formData, member2: e.target.value })
              }
            />

            <TextField
              fullWidth
              label="Team Login Email"
              margin="normal"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <TextField
              fullWidth
              label="Password"
              margin="normal"
              type="password"
              value={formData.password}
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
              {themes.map((theme, index) => {
                const isSelected = formData.selectedTheme === theme.title;

                return (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      sx={{
                        cursor: "pointer",
                        border: isSelected
                          ? "2px solid #00ffa3"
                          : "1px solid rgba(255,255,255,0.1)",
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
                        image={theme.img}
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
              value={formData.ideaDescription}
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
              >
                Submit
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
                src={selectedThemeObj.img}
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
