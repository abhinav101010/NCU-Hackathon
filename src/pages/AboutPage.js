import { Container, Typography, Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function AboutPage() {
  const theme = useTheme();
  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 10 }}>
      {/* Page Title */}
      <Typography
        variant="h3"
        textAlign="center"
        sx={{
          mb: 6,
          fontWeight: "bold",
          color: theme.palette.primary.main,
        }}
      >
        About NCU Hackathon
      </Typography>

      {/* Introduction */}
      <Typography
        variant="body1"
        sx={{
          color: "gray",
          textAlign: "center",
          mb: 6,
          maxWidth: 700,
          mx: "auto",
        }}
      >
        NCU Hackathon is a 48-hour innovation challenge where developers,
        designers, and problem-solvers come together to build creative
        technology solutions. Participants collaborate, experiment, and
        transform ideas into impactful projects that solve real-world problems.
      </Typography>

      {/* Why Participate */}
      <Grid container spacing={4} justifyContent="center" textAlign="center">
        <Grid item xs={12} md={4} textAlign="center">
          <Box textAlign="center">
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              🚀 Build Projects
            </Typography>

            <Typography variant="body2" color="gray">
              Turn your ideas into working prototypes within 48 hours and
              showcase your creativity.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4} textAlign="center">
          <Box textAlign="center">
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              🤝 Collaborate
            </Typography>

            <Typography variant="body2" color="gray">
              Work with developers, designers, and innovators from different
              backgrounds.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4} textAlign="center">
          <Box textAlign="center">
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              🏆 Win Prizes
            </Typography>

            <Typography variant="body2" color="gray">
              Compete for exciting rewards, recognition, and opportunities to
              showcase your innovation.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Event Details */}
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Event Details
        </Typography>

        <Typography color="gray">📅 Duration: 48 Hours</Typography>

        <Typography color="gray">💰 Prize Pool: ₹1L+</Typography>

        <Typography color="gray">👨‍💻 Participants: 500+ Hackers</Typography>

        <Typography color="gray">
          📍 Location: The NorthCap University, Gurugram
        </Typography>
      </Box>
    </Container>
  );
}
