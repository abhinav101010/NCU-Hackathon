import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { darkNeon, lightTheme, studentTheme } from "./theme";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sponsors from "./components/Sponsors";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import NetworkBackground from "./components/NetworkBackground";

import EventPage from "./pages/EventPage";
import RulePage from "./pages/RulePage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ThemePage from "./pages/ThemePage";
import LoginPage from "./pages/matrix/LoginPage";
import AdminPage from "./pages/matrix/AdminPage";
import Dashboard from "./pages/matrix/Dashboard";
import FAQ from "./pages/FAQ";
import AboutPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactUsPage";
import TeamLoginPage from "./pages/matrix/TeamLoginPage";
import ProtectedTeamRoute from "./components/ProtectedTeamRoute";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const [themeName, setThemeName] = useState(
    localStorage.getItem("theme") || "dark",
  );

  const themes = {
    dark: darkNeon,
    light: lightTheme,
    student: studentTheme,
  };

  const currentTheme = themes[themeName];

  useEffect(() => {
    localStorage.setItem("theme", themeName);
  }, [themeName]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />

      {/* Background */}
      <NetworkBackground />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Navbar themeName={themeName} setThemeName={setThemeName} />

        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<HomePage />} />
          <Route path="/themes" element={<ThemePage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/rules" element={<RulePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactUsPage />} />

          {/* ADMIN LOGIN */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* PROTECTED ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminPage />
              </ProtectedAdminRoute>
            }
          />

          {/* TEAM DASHBOARD (you can protect later) */}
          <Route path="/login" element={<TeamLoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedTeamRoute>
                <Dashboard />
              </ProtectedTeamRoute>
            }
          />
        </Routes>

        {/* Hide Sponsors + Footer for admin pages */}
        {!isAdminRoute && <Footer />}
      </Box>
    </ThemeProvider>
  );
}

export default App;
