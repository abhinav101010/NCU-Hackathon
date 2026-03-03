import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="fixed" sx={{ background: "rgba(0,0,0,0.6)" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          HACKATHON
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Button component={Link} to="/">Home</Button>
        <Button component={Link} to="/themes">Themes</Button>
        <Button component={Link} to="/events">Events</Button>
        <Button component={Link} to="/rules">Rules</Button>
        <Button component={Link} to="/register" variant="contained" color="secondary">
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
}