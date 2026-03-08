import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API } from "../../utils/common";

export default function TeamLoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API}/api/registrations/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("teamToken", data.token);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ p: 5, width: 360 }}>
        <Typography variant="h5" mb={3}>
          Team Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={form.email}
          onKeyDown={handleKeyPress}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={form.password}
          onKeyDown={handleKeyPress}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Login"
          )}
        </Button>
      </Paper>
    </Box>
  );
}