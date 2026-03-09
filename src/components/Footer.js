import {
  Box,
  Typography,
  Grid,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import logo from "../utils/logo.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: 10,
        pt: 8,
        pb: 4,
        px: { xs: 3, md: 10 },
        background:
          theme.palette.mode === "light"
            ? "linear-gradient(120deg,#ffffff,#f5f7fb,#ffffff)"
            : "linear-gradient(120deg,#0a0a0a,#121212,#0a0a0a)",
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Grid container spacing={5}>
        {/* Brand */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <img src={logo} alt="Innovathon Logo" style={{ height: 65 }} />

            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
              }}
            >
              INNOVATHON 2026
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 350,
            }}
          >
            Build. Innovate. Transform the future. Join developers, designers,
            and innovators for a 56-hour journey of creativity and technology.
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Quick Links
          </Typography>

          <Box display="flex" flexDirection="column" gap={1}>
            <Link component={RouterLink} to="/" underline="hover">
              Home
            </Link>

            <Link component={RouterLink} to="/faq" underline="hover">
              FAQ
            </Link>

            <Link component={RouterLink} to="/about" underline="hover">
              About Us
            </Link>

            <Link component={RouterLink} to="/contact" underline="hover">
              Contact
            </Link>
          </Box>
        </Grid>

        {/* Contact */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Contact
          </Typography>

          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2">The NorthCap University</Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary, ml: 4 }}
          >
            Gurugram, Haryana
          </Typography>

          <Box display="flex" alignItems="center" gap={1} mt={1}>
            {/* <EmailIcon fontSize="small" />
            <Typography variant="body2">
              hackathon@ncu.edu
            </Typography> */}
          </Box>
        </Grid>

        {/* Social */}
        {/* <Grid item xs={12} md={2}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Follow Us
          </Typography>

          <Box>
            <IconButton
              
              sx={{
                mr: 1,
                transition: "0.3s",
                "&:hover": {
                  color: theme.palette.primary.main,
                  transform: "scale(1.2)",
                },
              }}
            >
              <GitHubIcon />
            </IconButton>

            <IconButton
              sx={{
                mr: 1,
                transition: "0.3s",
                "&:hover": {
                  color: theme.palette.primary.main,
                  transform: "scale(1.2)",
                },
              }}
            >
              <LinkedInIcon />
            </IconButton>

            <IconButton
              sx={{
                transition: "0.3s",
                "&:hover": {
                  color: theme.palette.primary.main,
                  transform: "scale(1.2)",
                },
              }}
            >
              <EmailIcon />
            </IconButton>
          </Box>
        </Grid> */}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Bottom */}
      <Box textAlign="center">
        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.secondary }}
        >
          © 2026 INNOVATHON • Built with ❤️ by NCU Developers
        </Typography>
      </Box>
    </Box>
  );
}
