import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  IconButton,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { motion } from "framer-motion";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import toast, { Toaster } from "react-hot-toast";
import { API } from "../utils/api";
// import tracks from "../server/data/tracks.json";
// import sponsors from "../server/data/sponsors.json";
// import events from "../server/data/events.json";
// import rules from "../server/data/rules.json";

// Custom neon theme
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00ffa3" },
    secondary: { main: "#ff0080" },
    background: { default: "#0a0a0a", paper: "rgba(255,255,255,0.05)" },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

const sponsors = [
  {
    name: "Google",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Microsoft",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    name: "Amazon",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Meta",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Meta_Platforms_Inc._logo.svg",
  },
  {
    name: "OpenAI",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
  },
  {
    name: "NVIDIA",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
  },
];

const tracks = [
  {
    title: "Education",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    desc: "Smart learning platforms and EdTech",
  },
  {
    title: "Artificial Intelligence",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    desc: "Machine learning and automation",
  },
  {
    title: "Healthcare",
    img: "https://images.unsplash.com/photo-1584982751601-97dcc096659c",
    desc: "Medical and health innovation",
  },
  {
    title: "Fintech",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3",
    desc: "Finance and blockchain",
  },
  {
    title: "Agriculture",
    img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854",
    desc: "Smart farming",
  },
  {
    title: "Open Innovation",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    desc: "Anything innovative",
  },
];

const events = [
  {
    title: "Opening Ceremony",
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865",
    desc: "Kickoff event with introduction, rules briefing, and team networking.",
    date: "Day 1 - 9:00 AM",
  },
  {
    title: "Mentorship Session",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    desc: "Experts help teams with technical guidance and project direction.",
    date: "Day 1 - 2:00 PM",
  },
  {
    title: "Workshop",
    img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
    desc: "Hands-on workshop on AI, Cloud, and modern technologies.",
    date: "Day 2 - 11:00 AM",
  },
  {
    title: "Final Presentation",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
    desc: "Teams present their projects to judges and audience.",
    date: "Day 3 - 1:00 PM",
  },
  {
    title: "Prize Distribution",
    img: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8",
    desc: "Winners announced and prizes awarded.",
    date: "Day 3 - 5:00 PM",
  },
];

const rules = [
  "1-4 members per team",
  "All code must be written during hackathon",
  "No plagiarism",
  "Submit before deadline",
  "Judges decision final",
  "Respect everyone",
];

const popupAnimation = {
  opacity: 0,
  transform: "scale(0.8) translateY(50px)",
  animation: "popup 0.6s ease forwards",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SectionHeading = ({ children }) => {
  return (
    <Box textAlign="center" mb={6}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(90deg,#00ffa3,#00c6ff,#ff0080)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            letterSpacing: 1,
          }}
        >
          {children}
        </Typography>

        {/* animated underline */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "120px" }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            height: "4px",
            margin: "10px auto 0",
            borderRadius: "10px",
            background: "linear-gradient(90deg,#ff0080,#00ffa3)",
          }}
        />
      </motion.div>
    </Box>
  );
};

export default function HackathonUI() {
  // =========================
  // COUNTDOWN
  // =========================

  const hackathonDate = new Date("2026-03-26T11:59:59"); // change date

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const difference = hackathonDate - now;

      if (difference <= 0) return;

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),

        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),

        minutes: Math.floor((difference / (1000 * 60)) % 60),

        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // =========================
  // NETWORK BACKGROUND
  // =========================

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    const num = 80;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    for (let i = 0; i < num; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        const color = theme.palette.primary.main;
        ctx.fillStyle = color;
        ctx.fill();

        for (let j = i + 1; j < num; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = "rgba(0,255,163,0.2)";
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  // =========================
  // STATE
  // =========================

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDialogTrack, setSelectedDialogTrack] = useState("SelectOne");
  const [selectedTrack, setSelectedTrack] = useState("SelectOne");
  const [showTop, setShowTop] = useState(false);
  const [formData, setFormData] = useState({
    teamName: "",
    members: "",
    emails: "",
  });

  // =========================
  // SCROLL
  // =========================

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // =========================
  // DIALOG
  // =========================

  const handleOpen = (track) => {
    setSelectedDialogTrack(track);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async () => {
    // validation

    if (selectedTrack === "SelectOne") {
      toast.error("Please select track");

      return;
    }

    if (!formData.teamName || !formData.members || !formData.emails) {
      toast.error("Please fill all fields");

      return;
    }

    try {
      const response = await fetch(`${API}/api/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamName: formData.teamName,
          track: selectedTrack,
          members: formData.members,
          emails: formData.emails,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Registration successful 🚀");

        // clear form

        setFormData({
          teamName: "",

          members: "",

          emails: "",
        });

        setSelectedTrack("SelectOne");
      } else {
        toast.error("Failed to register");
      }
    } catch (error) {
      console.error(error);

      toast.error("Server error");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster />

      {/* GLOBAL NETWORK BACKGROUND */}

      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        {/* NAVBAR */}

        <AppBar
          position="fixed"
          sx={{ backdropFilter: "blur(10px)", background: "rgba(0,0,0,0.6)" }}
        >
          <Toolbar sx={{ flexWrap: "wrap", px: { xs: 1, sm: 2 } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
              onClick={scrollTop}
            >
              HACKATHON
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Button
              size="small"
              sx={{ ml: { xs: 1, sm: 2 }, mt: { xs: 0.5, sm: 0 } }}
              onClick={() => scrollToSection("tracks")}
            >
              Themes
            </Button>

            <Button
              size="small"
              sx={{ ml: { xs: 1, sm: 2 }, mt: { xs: 0.5, sm: 0 } }}
              onClick={() => scrollToSection("events")}
            >
              Events
            </Button>

            <Button
              size="small"
              sx={{ ml: { xs: 1, sm: 2 }, mt: { xs: 0.5, sm: 0 } }}
              onClick={() => scrollToSection("rules")}
            >
              Rules
            </Button>

            <Button
              variant="contained"
              size="small"
              color="secondary"
              sx={{ ml: { xs: 1, sm: 2 }, mt: { xs: 0.5, sm: 0 } }}
              onClick={() => scrollToSection("hero")}
            >
              Register
            </Button>
          </Toolbar>
        </AppBar>

        {/* HERO */}

        <Box
          id="hero"
          sx={{
            minHeight: "100vh",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 4,
          }}
        >
          {/* Canvas */}
          {/* <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        /> */}

          {/* FLEX CONTAINER */}
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" }, // 🔥 KEY LINE
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "1200px",
              gap: 6,
            }}
          >
            {/* LEFT SIDE */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  background: "linear-gradient(90deg,#00ffa3,#00c6ff,#ff0080)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                BUILD THE FUTURE
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  mt: 3,
                  flexWrap: "wrap",
                }}
              >
                {["days", "hours", "minutes", "seconds"].map((unit) => (
                  <Box
                    key={unit}
                    sx={{
                      textAlign: "center",
                      p: 2,
                      minWidth: 80,
                      borderRadius: 3,
                      background: "rgba(255,255,255,0.05)",
                      boxShadow: "0 0 20px rgba(0,255,163,0.3)",
                    }}
                  >
                    <Typography variant="h4" fontWeight="bold">
                      {timeLeft[unit]}
                    </Typography>

                    <Typography color="gray">{unit.toUpperCase()}</Typography>
                  </Box>
                ))}
              </Box>

              <Typography sx={{ mt: 2 }} color="gray">
                Join the most innovative hackathon and build amazing things.
              </Typography>
            </Box>

            {/* RIGHT SIDE FORM */}
            <Box
              sx={{
                flex: 1,
                p: 4,
                borderRadius: 4,
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 0 40px rgba(0,255,163,0.3)",
              }}
            >
              <Typography variant="h5" mb={2} fontWeight="bold">
                Team Registration
              </Typography>

              {/* Team Name + Track in same row */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Team Name"
                    value={formData.teamName}
                    onChange={(e) =>
                      setFormData({ ...formData, teamName: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="track-label">Track</InputLabel>

                    <Select
                      labelId="track-label"
                      label="Track"
                      required
                      value={selectedTrack}
                      onChange={(e) => setSelectedTrack(e.target.value)}
                    >
                      <MenuItem value="SelectOne" disabled>
                        Select Track
                      </MenuItem>
                      {tracks.map((track, index) => (
                        <MenuItem key={index} value={track.title}>
                          {track.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Members */}
              <TextField
                fullWidth
                required
                label="Members (Names separated by comma)"
                margin="normal"
                value={formData.members}
                onChange={(e) =>
                  setFormData({ ...formData, members: e.target.value })
                }
                multiline
                rows={2}
              />

              {/* Email IDs */}
              <TextField
                fullWidth
                required
                label="Email IDs (separated by comma)"
                margin="normal"
                value={formData.emails}
                onChange={(e) =>
                  setFormData({ ...formData, emails: e.target.value })
                }
                multiline
                rows={2}
              />

              {/* Submit */}
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: "30px",
                  boxShadow: "0 0 20px #ff0080",
                }}
              >
                Submit Registration
              </Button>
            </Box>
          </Box>
        </Box>

        {/* SPONSORS */}

        <Container maxWidth="lg" sx={{ py: 6, background: "rgba(255, 255, 255, 0.05)", borderRadius: 4 }}>
          <SectionHeading>Sponsors</SectionHeading>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 6,
              flexWrap: "wrap"
            }}
          >

            {sponsors.map((sponsor, i) => (

              <motion.img
                key={i}
                src={sponsor.img}
                alt={sponsor.name}
                whileHover={{
                  scale: 1.2,
                  y: -10,
                }}
                style={{
                  height: 40,
                  objectFit: "contain"
                }}
              />

            ))}

          </Box>

        </Container>

        {/* TRACKS */}

        <Container
          id="tracks"
          maxWidth="lg"
          sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, sm: 3 } }}
        >
          <motion.div
            whileHover={{
              scale: 1.07,
              rotate: 0,
            }}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionHeading>Tracks</SectionHeading>
            <Grid
              container
              spacing={6}
              sx={{ mt: 4 }}
              justifyContent="center"
              alignItems="stretch"
            >
              {tracks.map((track, i) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={i}
                  sx={{
                    ...popupAnimation,
                    animationDelay: `${i * 0.2}s`,
                    display: "flex",
                    justifyContent: "center",
                    transform: i % 2 === 0 ? "rotate(-1deg)" : "rotate(1deg)",
                  }}
                >
                  <Card
                    onClick={() => handleOpen(track)}
                    sx={{
                      width: "100%",
                      maxWidth: 320,
                      cursor: "pointer",
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "15px",
                      transition: "0.4s",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 0 25px rgba(0,255,163,0.6)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ height: { xs: 180, sm: 200 } }}
                      image={track.img}
                    />

                    <CardContent>
                      <Typography variant="h6">{track.title}</Typography>

                      <Typography variant="body2" color="gray">
                        {track.desc.substring(0, 40)}...
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>

        {/* EVENTS */}

        <Container
          id="events"
          maxWidth="lg"
          sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, sm: 3 } }}
        >
          <motion.div
            whileHover={{
              scale: 1.07,
              rotate: 0,
            }}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionHeading>Events</SectionHeading>
            <Grid
              container
              spacing={6}
              sx={{ mt: 4 }}
              justifyContent="center"
              alignItems="stretch"
            >
              {events.map((event, i) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={i}
                  sx={{
                    ...popupAnimation,
                    animationDelay: `${i * 0.2}s`,
                    display: "flex",
                    justifyContent: "center",
                    transform: i % 2 === 0 ? "rotate(-1deg)" : "rotate(1deg)",
                  }}
                >
                  <Card
                    sx={{
                      width: "100%",
                      maxWidth: 320,
                      margin: "0 auto",
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "15px",
                      transition: "0.4s",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 0 25px rgba(255,0,128,0.6)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ height: { xs: 180, sm: 200 } }}
                      image={event.img}
                    />

                    <CardContent>
                      <Typography variant="h6">{event.title}</Typography>

                      <Typography
                        variant="body2"
                        color="secondary"
                        sx={{ mb: 1 }}
                      >
                        {event.date}
                      </Typography>

                      <Typography variant="body2" color="gray">
                        {event.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>

        {/* RULES */}

        <Container
          id="rules"
          maxWidth="md"
          sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, sm: 3 } }}
        >
          <SectionHeading>Rules</SectionHeading>

          {rules.map((rule, i) => (
            <Box
              key={i}
              sx={{
                p: 3,
                my: 2,
                borderRadius: "15px",
                background: "rgba(255,255,255,0.05)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateX(10px)",
                  boxShadow: (theme) => `0 0 20px ${theme.palette.primary.main}`,
                },
              }}
            >
              ⚡ {rule}
            </Box>
          ))}
        </Container>

        {/* DIALOG */}

        <Dialog
          open={dialogOpen}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
          TransitionComponent={Transition}
        >
          {selectedDialogTrack && (
            <>
              <DialogTitle
                sx={{
                  background: "linear-gradient(90deg,#ff0080,#00ffa3)",
                  color: "text.primary",
                  fontWeight: "bold",
                }}
              >
                {selectedDialogTrack.title}
              </DialogTitle>

              <DialogContent sx={{ background: "#0a0a0a" }}>
                <Box
                  component="img"
                  src={selectedDialogTrack.img}
                  sx={{ width: "100%", borderRadius: 2, mb: 2 }}
                />

                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedDialogTrack.desc}
                </Typography>

                <Typography variant="body2" color="gray">
                  This track challenges you to create innovative solutions in
                  the {selectedDialogTrack.title} domain.
                </Typography>
              </DialogContent>

              <DialogActions sx={{ background: "#0a0a0a" }}>
                <Button onClick={handleClose} color="secondary">
                  Close
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    scrollToSection("hero");
                    setSelectedTrack(selectedDialogTrack.title);
                    handleClose();
                  }}
                >
                  Select Track
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* BACK TO TOP */}

        {showTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <IconButton
              size="small"
              onClick={scrollTop}
              sx={{
                position: "fixed",
                bottom: 20,
                right: 20,
                background: "linear-gradient(45deg,#ff0080,#00ffa3)",
                color: "text.primary",
                "&:hover": { transform: "scale(1.2)" },
              }}
            >
              <KeyboardArrowUpIcon />
            </IconButton>
          </motion.div>
        )}

        {/* FOOTER */}

        <Box
          sx={{
            mt: { xs: 6, md: 10 },
            py: 5,
            textAlign: "center",
            background: "linear-gradient(90deg,#0a0a0a,#111,#0a0a0a)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Hackathon 2026
          </Typography>

          <Typography variant="body2" color="gray" sx={{ mb: 2 }}>
            Build. Innovate. Transform the Future.
          </Typography>

          {/* <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button color="primary">About</Button>

          <Button color="primary">Contact</Button>

          <Button color="primary">Privacy</Button>
        </Box> */}

          <Typography
            variant="caption"
            color="gray"
            sx={{ mt: 3, display: "block" }}
          >
            © 2026 Hackathon. All rights reserved.
          </Typography>
        </Box>

        {/* Animations */}

        <style>
          {`
        @keyframes popup {
          to { opacity:1; transform:scale(1) translateY(0); }
        }
        `}
        </style>
      </Box>
    </ThemeProvider>
  );
}
