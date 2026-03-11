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
import { MenuItem } from "@mui/material";
import { API, calculateTimeLeft } from "../utils/common";
import Countdown from "./Countdown";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedThemeObj, setSelectedThemeObj] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const [formData, setFormData] = useState({
    teamName: "",
    teamLead: "",
    teamLeadEmail: "",
    teamLeadTshirt: "",
    phone: "",
    university: "",
    yearCourse: "",

    member1: "",
    member1Email: "",
    member1Phone: "",
    member1Tshirt: "",

    member2: "",
    member2Email: "",
    member2Phone: "",
    member2Tshirt: "",

    email: "",
    password: "",
    selectedTheme: "",
    ideaDescription: "",
  });

  const containerWidth = step === 3 ? "md" : "sm";

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
    },
  };

  /* LOAD THEMES */

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

  /* VALIDATIONS */

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);

  const validateName = (name) => /^[a-zA-Z\s]{2,40}$/.test(name);

  const validatePassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);

  /* STEP 1 */

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

    if (!formData.teamLeadTshirt) newErrors.teamLeadTshirt = "Select Size";

    if (!formData.university) newErrors.university = "University required";

    if (formData.university.length < 3)
      newErrors.university = "University full name required";

    if (!formData.yearCourse) newErrors.yearCourse = "Year/Course required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setStep(2);
    } else {
      toast.error("Fix the errors before continuing");
    }
  };

  /* STEP 2 */

  const handleNextStep2 = () => {
    const newErrors = {};

    /* MEMBER 1 VALIDATION */

    if (!validateName(formData.member1)) newErrors.member1 = "Enter valid name";

    if (!validateEmail(formData.member1Email))
      newErrors.member1Email = "Enter valid email";

    if (!validatePhone(formData.member1Phone))
      newErrors.member1Phone = "Enter valid 10 digit phone";

    if (!formData.member1Tshirt) newErrors.member1Tshirt = "Select Size";

    /* MEMBER 2 VALIDATION */

    if (!validateName(formData.member2)) newErrors.member2 = "Enter valid name";

    if (!validateEmail(formData.member2Email))
      newErrors.member2Email = "Enter valid email";

    if (!validatePhone(formData.member2Phone))
      newErrors.member2Phone = "Enter valid 10 digit phone";

    if (!formData.member2Tshirt) newErrors.member2Tshirt = "Select Size";

    /* CHECK DUPLICATE MEMBERS */

    if (formData.member1 === formData.member2)
      newErrors.member2 = "Members must be different";

    /* CHECK DUPLICATE EMAILS */

    if (formData.member1Email === formData.member2Email)
      newErrors.member2Email = "Emails must be different";

    /* PASSWORD VALIDATION */

    if (!validatePassword(formData.password))
      newErrors.password =
        "Password must contain letters and numbers (min 6 chars)";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setStep(3);
    } else {
      toast.error("Fix the errors before continuing");
    }
  };

  /* SUBMIT */

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
      } catch {}

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
        navigate("/login");
      } else {
        toast.error(data.error || "Registration failed");
      }
    } catch {
      toast.error("Server error");
    }

    setSubmitting(false);
  };

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });

    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <>
      {calculateTimeLeft().expired ? (
        <Countdown />
      ) : (
        <Container
          maxWidth={containerWidth}
          sx={{
            minHeight: "90vh",
            display: "flex",
            flexWrap: "wrap",
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
                p: { xs: 2, sm: 4 },
                borderRadius: 3,
                background: (theme) => theme.palette.background.paper,
                border: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="h6" align="center" sx={{ mb: 3 }}>
                Hackathon Registration
              </Typography>

              {/* STEP INDICATOR */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: { xs: 1, sm: 0 },
                  mb: 4,
                }}
              >
                {[1, 2, 3, 4].map((s, index) => (
                  <Box key={s} sx={{ display: "flex", alignItems: "center" }}>
                    {/* CIRCLE */}

                    <Box
                      sx={{
                        width: { xs: 28, sm: 34 },
                        height: { xs: 28, sm: 34 },
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 600,
                        fontSize: { xs: 13, sm: 14 },
                        border: (theme) =>
                          `2px solid ${theme.palette.primary.main}`,
                        background: (theme) =>
                          step >= s
                            ? theme.palette.primary.main
                            : "transparent",
                        color: (theme) =>
                          step >= s
                            ? theme.palette.primary.contrastText
                            : theme.palette.text.secondary,
                        transition: "0.3s",
                      }}
                    >
                      {s}
                    </Box>

                    {/* LINE */}

                    {index < 3 && (
                      <Box
                        sx={{
                          width: { xs: 30, sm: 60 },
                          height: 2,
                          mx: { xs: 0.5, sm: 1 },
                          background: (theme) =>
                            step > index + 1
                              ? theme.palette.primary.main
                              : theme.palette.divider,
                          transition: "0.3s",
                        }}
                      />
                    )}
                  </Box>
                ))}
              </Box>

              {/* STEP 1 */}

              {step === 1 && (
                <>
                  <TextField
                    fullWidth
                    label="Team Name"
                    margin="normal"
                    sx={inputStyle}
                    value={formData.teamName}
                    error={!!errors.teamName}
                    helperText={errors.teamName}
                    onChange={(e) => updateField("teamName", e.target.value)}
                  />

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Team Lead Name"
                        margin="normal"
                        sx={inputStyle}
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
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        select
                        fullWidth
                        required
                        label="T-Shirt Size"
                        margin="normal"
                        value={formData.teamLeadTshirt}
                        error={!!errors.teamLeadTshirt}
                        helperText={errors.teamLeadTshirt}
                        sx={{
                          minWidth: 150,
                        }}
                        onChange={(e) =>
                          updateField("teamLeadTshirt", e.target.value)
                        }
                      >
                        {sizes.map((size) => (
                          <MenuItem key={size} value={size}>
                            {size}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    label="Team Lead Email"
                    margin="normal"
                    sx={inputStyle}
                    value={formData.teamLeadEmail}
                    error={!!errors.teamLeadEmail}
                    helperText={errors.teamLeadEmail}
                    onChange={(e) =>
                      updateField("teamLeadEmail", e.target.value)
                    }
                  />

                  <TextField
                    fullWidth
                    label="Phone"
                    margin="normal"
                    sx={inputStyle}
                    value={formData.phone}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    onChange={(e) =>
                      updateField("phone", e.target.value.replace(/\D/g, ""))
                    }
                  />

                  <TextField
                    fullWidth
                    label="University (Full Forms)"
                    margin="normal"
                    sx={inputStyle}
                    value={formData.university}
                    error={!!errors.university}
                    helperText={errors.university}
                    onChange={(e) => updateField("university", e.target.value)}
                  />

                  <TextField
                    fullWidth
                    label="Year & Course"
                    margin="normal"
                    sx={inputStyle}
                    value={formData.yearCourse}
                    error={!!errors.yearCourse}
                    helperText={errors.yearCourse}
                    onChange={(e) => updateField("yearCourse", e.target.value)}
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

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Team Mate 1"
                        margin="normal"
                        sx={inputStyle}
                        value={formData.member1}
                        error={!!errors.member1}
                        helperText={errors.member1}
                        onChange={(e) =>
                          updateField(
                            "member1",
                            e.target.value.replace(/[^a-zA-Z\s]/g, ""),
                          )
                        }
                      />
                      <TextField
                        fullWidth
                        label="Member 1 Email"
                        margin="normal"
                        sx={inputStyle}
                        value={formData.member1Email}
                        error={!!errors.member1Email}
                        helperText={errors.member1Email}
                        onChange={(e) =>
                          updateField("member1Email", e.target.value)
                        }
                      />

                      <TextField
                        fullWidth
                        label="Member 1 Phone"
                        margin="normal"
                        sx={inputStyle}
                        value={formData.member1Phone}
                        error={!!errors.member1Phone}
                        helperText={errors.member1Phone}
                        onChange={(e) =>
                          updateField(
                            "member1Phone",
                            e.target.value.replace(/\D/g, ""),
                          )
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        select
                        required
                        label="Memeber 1 T-Shirt Size"
                        margin="normal"
                        sx={{ ...inputStyle, minWidth: 150 }}
                        value={formData.member1Tshirt}
                        error={!!errors.member1Tshirt}
                        helperText={errors.member1Tshirt}
                        onChange={(e) =>
                          updateField("member1Tshirt", e.target.value)
                        }
                      >
                        {sizes.map((size) => (
                          <MenuItem key={size} value={size}>
                            {size}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Team Mate 2"
                        margin="normal"
                        sx={inputStyle}
                        value={formData.member2}
                        error={!!errors.member2}
                        helperText={errors.member2}
                        onChange={(e) =>
                          updateField(
                            "member2",
                            e.target.value.replace(/[^a-zA-Z\s]/g, ""),
                          )
                        }
                      />
                      <TextField
                        fullWidth
                        label="Member 2 Email"
                        margin="normal"
                        sx={inputStyle}
                        value={formData.member2Email}
                        error={!!errors.member2Email}
                        helperText={errors.member2Email}
                        onChange={(e) =>
                          updateField("member2Email", e.target.value)
                        }
                      />

                      <TextField
                        fullWidth
                        label="Member 2 Phone"
                        margin="normal"
                        sx={inputStyle}
                        value={formData.member2Phone}
                        error={!!errors.member2Phone}
                        helperText={errors.member2Phone}
                        onChange={(e) =>
                          updateField(
                            "member2Phone",
                            e.target.value.replace(/\D/g, ""),
                          )
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        select
                        required
                        label="Memeber 2 T-Shirt Size"
                        margin="normal"
                        sx={{ ...inputStyle, minWidth: 150 }}
                        value={formData.member2Tshirt}
                        error={!!errors.member2Tshirt}
                        helperText={errors.member2Tshirt}
                        onChange={(e) =>
                          updateField("member2Tshirt", e.target.value)
                        }
                      >
                        {sizes.map((size) => (
                          <MenuItem key={size} value={size}>
                            {size}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    label="Login Username"
                    margin="normal"
                    sx={inputStyle}
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    sx={inputStyle}
                    value={formData.password}
                    error={!!errors.password}
                    helperText={errors.password}
                    onChange={(e) => updateField("password", e.target.value)}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 2,
                      mt: 3,
                    }}
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>

                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleNextStep2}
                    >
                      Next
                    </Button>
                  </Box>
                </>
              )}

              {/* STEP 3 */}

              {step === 3 && (
                <>
                  <Typography sx={{ mb: 3 }}>Select a Theme</Typography>

                  <Grid container spacing={3}>
                    {themes.map((theme) => {
                      const isSelected = formData.selectedTheme === theme.title;

                      return (
                        <Grid item xs={12} sm={6} md={4} key={theme._id}>
                          <Card
                            sx={{
                              cursor: "pointer",
                              borderRadius: 2,
                              border: (themeMui) =>
                                isSelected
                                  ? `2px solid ${themeMui.palette.primary.main}`
                                  : `1px solid ${themeMui.palette.divider}`,
                              ":hover": {
                                boxShadow: 4,
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
                              sx={{ height: 150 }}
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
                    sx={inputStyle}
                    value={formData.ideaDescription}
                    helperText={`${formData.ideaDescription.length}/1000`}
                    onChange={(e) =>
                      updateField("ideaDescription", e.target.value)
                    }
                  />

                  <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => setStep(2)}
                    >
                      Back
                    </Button>

                    {/* <Button
                      fullWidth
                      variant="contained"
                      disabled={submitting || calculateTimeLeft().expired}
                      onClick={handleSubmit}
                    >
                      {calculateTimeLeft().expired ? (
                        "Registrations Closed"
                      ) : submitting ? (
                        <CircularProgress size={22} />
                      ) : (
                        "Submit"
                      )}
                    </Button> */}

                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => setStep(4)}
                    >
                      Next
                    </Button>
                  </Box>
                </>
              )}

              {/* STEP 4 */}

              {step === 4 && (
                <Box
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    px: { xs: 1, sm: 4 },
                  }}
                >
                  <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
                    Registration Fee Payment
                  </Typography>

                  <Typography
                    sx={{
                      mb: 3,
                      color: "text.secondary",
                      maxWidth: 420,
                    }}
                  >
                    Scan the QR code below and complete the payment to confirm
                    your hackathon registration.
                  </Typography>

                  {/* QR CARD */}

                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background: (theme) => theme.palette.background.default,
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                      boxShadow: 3,
                      mb: 3,
                    }}
                  >
                    <Box
                      component="img"
                      src="/payment-qr.png"
                      sx={{
                        width: { xs: 180, sm: 220 },
                        maxWidth: "100%",
                        borderRadius: 2,
                      }}
                    />

                    <Typography
                      sx={{
                        mt: 2,
                        fontWeight: 600,
                      }}
                    >
                      UPI ID
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 18,
                        letterSpacing: 0.5,
                        color: "primary.main",
                        fontWeight: 600,
                      }}
                    >
                      9315431144@axl
                    </Typography>
                  </Box>

                  {/* PAYMENT BREAKDOWN */}

                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: 420,
                      borderRadius: 2,
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                      p: 2,
                      mb: 3,
                      background: (theme) => theme.palette.background.paper,
                    }}
                  >
                    <Typography fontWeight={600} sx={{ mb: 1 }}>
                      Payment Details{" "}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 0.5,
                      }}
                    >
                      {" "}
                      <Typography color="text.secondary">
                        Registration Fee
                      </Typography>{" "}
                      <Typography>₹300</Typography>{" "}
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 0.5,
                      }}
                    >
                      {" "}
                      <Typography color="text.secondary">
                        T-Shirts (3 Members)
                      </Typography>{" "}
                      <Typography>₹500</Typography>{" "}
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 1,
                        pt: 1,
                        borderTop: (theme) =>
                          `1px solid ${theme.palette.divider}`,
                        fontWeight: 600,
                        fontSize: 18,
                      }}
                    >
                      <Typography>Total</Typography>

                      <Typography color="primary.main">₹800</Typography>
                    </Box>
                  </Box>

                  {/* CONTACT */}

                  <Typography
                    sx={{
                      fontWeight: 500,
                      mb: 0.5,
                    }}
                  >
                    Payment Confirmation Contact
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: "primary.main",
                      mb: 2,
                    }}
                  >
                    +91 9870340530
                  </Typography>

                  <Typography
                    sx={{
                      mb: 1,
                      maxWidth: 420,
                      color: "text.secondary",
                    }}
                  >
                    After completing the payment, click submit to finalize your
                    registration.
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 13,
                      color: "red",
                      mb: 3,
                    }}
                  >
                    Note: Your registration will be approved after payment
                    verification.
                  </Typography>

                  {/* BUTTONS */}

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      width: "100%",
                      maxWidth: 420,
                    }}
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => setStep(3)}
                    >
                      Back
                    </Button>

                    <Button
                      fullWidth
                      variant="contained"
                      disabled={submitting || calculateTimeLeft().expired}
                      onClick={handleSubmit}
                    >
                      {calculateTimeLeft().expired ? (
                        "Registrations Closed"
                      ) : submitting ? (
                        <CircularProgress size={22} />
                      ) : (
                        "Confirm & Submit"
                      )}
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          )}

          {/* THEME DIALOG */}

          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            maxWidth="sm"
            fullWidth
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
      )}
    </>
  );
}
