import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { API } from "../../utils/common";

export default function LoginPage() {
  const theme = useTheme();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // ================= LOGIN HANDLER =================

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      localStorage.setItem("adminToken", data.token);

      window.location.href = "/admin";
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 5,
          width: { xs: "90%", sm: 380 },

          borderRadius: 4,

          background: theme.palette.background.paper,

          border: `1px solid ${theme.palette.primary.main}`,

          backdropFilter: "blur(8px)",

          transition: "0.3s ease",

          boxShadow: `0 0 25px ${theme.palette.primary.main}30`,

          "&:hover": {
            boxShadow: `0 0 40px ${theme.palette.primary.main}55`,
          },
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          mb={4}
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.main,
          }}
        >
          Admin Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={form.email}
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
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{
            mt: 3,
            py: 1.5,
            fontWeight: "bold",
            borderRadius: "30px",

            boxShadow: `0 0 20px ${theme.palette.primary.main}`,

            transition: "0.3s",

            "&:hover": {
              boxShadow: `0 0 35px ${theme.palette.primary.main}`,
              transform: "translateY(-2px)",
            },
          }}
        >
          LOGIN
        </Button>
      </Paper>
    </Box>
  );
}
