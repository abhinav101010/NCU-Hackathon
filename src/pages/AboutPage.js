import { Container, Typography, Box, Grid, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function AboutPage() {
  const theme = useTheme();

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: { xs: 8, md: 10 },
        mb: { xs: 8, md: 10 },
      }}
    >
      {/* Page Title */}

      <Typography
        variant="h3"
        textAlign="center"
        mt={15}
        sx={{
          mb: 6,
          fontWeight: "bold",
          color: theme.palette.primary.main,
          fontSize: { xs: "2rem", md: "3rem" },
        }}
      >
        About INNOVATHON
      </Typography>

      {/* Introduction */}

      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.secondary,
          textAlign: "center",
          mb: 6,
          maxWidth: 700,
          mx: "auto",
          lineHeight: 1.7,
        }}
      >
        INNOVATHON is a 56-hour innovation challenge where developers,
        designers, and problem-solvers come together to build creative
        technology solutions. Participants collaborate, experiment, and
        transform ideas into impactful projects that solve real-world problems.
      </Typography>

      {/* Why Participate */}

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 3,
              border: `1px solid ${theme.palette.primary.main}30`,
              background: theme.palette.background.paper,
              transition: "0.3s",

              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: `0 0 20px ${theme.palette.primary.main}30`,
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              🚀 Build Projects
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Turn your ideas into working prototypes within 56 hours and
              showcase your creativity.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 3,
              border: `1px solid ${theme.palette.primary.main}30`,
              background: theme.palette.background.paper,
              transition: "0.3s",

              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: `0 0 20px ${theme.palette.primary.main}30`,
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              🤝 Collaborate
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Work with developers, designers, and innovators from different
              backgrounds.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 3,
              border: `1px solid ${theme.palette.primary.main}30`,
              background: theme.palette.background.paper,
              transition: "0.3s",

              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: `0 0 20px ${theme.palette.primary.main}30`,
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              🏆 Win Prizes
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Compete for exciting rewards, recognition, and opportunities to
              showcase your innovation.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Event Details */}

      <Box
        sx={{
          mt: 8,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: theme.palette.primary.main,
          }}
        >
          Event Details
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 1 }}>
          📅 Duration: 56 Hours
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 1 }}>
          💰 Prize Pool: ₹50k+
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 1 }}>
          👨‍💻 Participants: 500+
        </Typography>

        <Typography color="text.secondary">
          📍 Location: The NorthCap University, Gurugram
        </Typography>
      </Box>
    </Container>
  );
}