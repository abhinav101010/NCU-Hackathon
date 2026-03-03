import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CssBaseline,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00ffa3" },
    secondary: { main: "#ff0080" },
    background: {
      default: "#0a0a0a",
      paper: "rgba(255,255,255,0.05)",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

export default function LoginPage() {
  const canvasRef = useRef(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // ================= OPTIMIZED NETWORK BACKGROUND =================

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationId;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const PARTICLE_COUNT = 45;
    const MAX_DIST = 100;
    const MAX_DIST_SQ = MAX_DIST * MAX_DIST;

    const particles = Array.from({ length: PARTICLE_COUNT }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#00ffa3";
        ctx.fill();

        // Draw connections (optimized squared distance)
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < MAX_DIST_SQ) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "rgba(0,255,163,0.15)";
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ================= LOGIN HANDLER =================

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      window.location.href =
        data.role === "admin" ? "/admin" : "/dashboard";
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      {/* NETWORK CANVAS */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          zIndex: 0,
        }}
      />

      {/* LOGIN BOX */}
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
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(0,255,163,0.2)",
            backdropFilter: "blur(8px)",
            transition: "0.3s ease",
            "&:hover": {
              boxShadow: "0 0 40px rgba(0,255,163,0.3)",
            },
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            mb={4}
            sx={{
              fontWeight: 700,
              background:
                "linear-gradient(90deg,#00ffa3,#00c6ff,#ff0080)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Login
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
              boxShadow: "0 0 20px #00ffa3",
              transition: "0.3s",
              "&:hover": {
                boxShadow: "0 0 35px #00ffa3",
                transform: "translateY(-2px)",
              },
            }}
          >
            LOGIN
          </Button>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}