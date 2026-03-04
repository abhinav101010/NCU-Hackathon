import { AppBar, Toolbar, Typography, Button, Box, Select, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar({ themeName, setThemeName }) {
  return (
    <AppBar position="fixed" sx={{ background: "rgba(0,0,0,0.6)" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          HACKATHON
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* THEME SELECTOR */}
        <Select
          size="small"
          value={themeName}
          onChange={(e) => setThemeName(e.target.value)}
          sx={{
            mr: 3,
            color: "white",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <MenuItem value="dark">Dark Neon</MenuItem>
          <MenuItem value="light">Light</MenuItem>
          <MenuItem value="student">Student</MenuItem>
        </Select>

        <Button component={Link} to="/">Home</Button>
        <Button component={Link} to="/faq">FAQ's</Button>
        <Button component={Link} to="/about">About US</Button>
        <Button component={Link} to="/contact">Contact US</Button>

        <Button
          component={Link}
          to="/register"
          variant="contained"
          color="secondary"
        >
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
}