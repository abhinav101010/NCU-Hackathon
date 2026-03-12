import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Divider
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function AboutPage() {
  const theme = useTheme();

  const highlights = [
    { title: "56 Hours", subtitle: "Non-stop Innovation" },
    { title: "500+", subtitle: "Participants" },
    { title: "₹50K+", subtitle: "Prize Pool" },
    { title: "20+", subtitle: "Mentors & Judges" },
  ];

  const features = [
    {
      title: "🚀 Build Projects",
      desc: "Turn your ideas into working prototypes within 56 hours and showcase your creativity.",
    },
    {
      title: "🤝 Collaborate",
      desc: "Work with developers, designers, and innovators from different backgrounds.",
    },
    {
      title: "🏆 Win Prizes",
      desc: "Compete for exciting rewards, recognition, and opportunities to showcase your innovation.",
    },
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: { xs: 10, md: 14 },
        mb: { xs: 10, md: 14 },
      }}
    >
      {/* Title */}

      <Typography
        variant="h3"
        textAlign="center"
        sx={{
          mb: 3,
          fontWeight: 800,
          color: theme.palette.primary.main,
          fontSize: { xs: "2.2rem", md: "3rem" },
          letterSpacing: 1,
        }}
      >
        About INNOVATHON
      </Typography>

      {/* Intro */}

      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          maxWidth: 750,
          mx: "auto",
          color: theme.palette.text.secondary,
          lineHeight: 1.8,
          mb: 7,
        }}
      >
        INNOVATHON is a 56-hour innovation challenge where developers,
        designers, and problem-solvers collaborate to create impactful
        technology solutions. Participants experiment, learn, and transform
        creative ideas into real-world prototypes while networking with
        industry mentors and innovators.
      </Typography>

      {/* Highlights */}

      <Grid container spacing={3} justifyContent="center" sx={{ mb: 10 }}>
        {highlights.map((item, i) => (
          <Grid item xs={6} md={3} key={i}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 4,
                border: `1px solid ${theme.palette.primary.main}30`,
                background: theme.palette.background.paper,
                transition: "0.3s",
                backdropFilter: "blur(10px)",

                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: `0 0 25px ${theme.palette.primary.main}30`,
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.main,
                  mb: 0.5,
                }}
              >
                {item.title}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {item.subtitle}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mb: 8 }} />

      {/* Why Participate */}

      <Typography
        variant="h4"
        textAlign="center"
        sx={{
          mb: 6,
          fontWeight: 700,
          color: theme.palette.primary.main,
        }}
      >
        Why Participate?
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 5,
                textAlign: "center",
                borderRadius: 4,
                border: `1px solid ${theme.palette.primary.main}30`,
                background: theme.palette.background.paper,
                transition: "0.35s",
                height: "100%",

                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: `0 0 25px ${theme.palette.primary.main}30`,
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  fontSize: "1.2rem",
                }}
              >
                {feature.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  lineHeight: 1.7,
                }}
              >
                {feature.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}