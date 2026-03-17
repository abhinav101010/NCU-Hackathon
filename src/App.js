import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { darkNeon, lightTheme, oceanTheme, crimsonTheme, studentTheme } from "./theme";

import ScrollToTop from "./utils/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import ProtectedTeamRoute from "./components/ProtectedTeamRoute";
import NetworkBackground from "./components/NetworkBackground";

import EventPage from "./pages/EventPage";
import RulePage from "./pages/RulePage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ThemePage from "./pages/ThemePage";
import FAQ from "./pages/FAQ";
import AboutPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactUsPage";
import SponsorsPage from "./pages/SponsorsPage";

import LoginPage from "./pages/matrix/LoginPage";
import AdminPage from "./pages/matrix/AdminPage";
import Dashboard from "./pages/matrix/Dashboard";
import TeamLoginPage from "./pages/matrix/TeamLoginPage";

const THEMES = {
  dark: darkNeon,
  light: lightTheme,
  ocean: oceanTheme,
  crimson: crimsonTheme,
  student: studentTheme,
};

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const adminToken = localStorage.getItem("adminToken");
  const teamToken = localStorage.getItem("teamToken");

  const [themeName, setThemeName] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const currentTheme = THEMES[themeName] || THEMES.dark;

  useEffect(() => {
    localStorage.setItem("theme", themeName);
  }, [themeName]);

  useEffect(() => {
    if (teamToken && location.pathname === "/login") {
      window.location.href = "/dashboard";
    }
  }, [location.pathname]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <NetworkBackground />

      <Box sx={{ position: "relative", zIndex: 1, overflow: "hidden" }}>
        <Navbar themeName={themeName} setThemeName={setThemeName} />
        <ScrollToTop />

        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<HomePage />} />
          <Route path="/themes" element={<ThemePage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/rules" element={<RulePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/sponsors" element={<SponsorsPage />} />

          {/* ADMIN */}
          <Route
            path="/admin/login"
            element={adminToken ? <Navigate to="/admin" /> : <LoginPage />}
          />
          <Route
            path="/admin"
            element={
              adminToken ? (
                <ProtectedAdminRoute>
                  <AdminPage />
                </ProtectedAdminRoute>
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          />

          {/* TEAM */}
          <Route
            path="/login"
            element={teamToken ? <Navigate to="/dashboard" /> : <TeamLoginPage />}
          />
          <Route
            path="/dashboard"
            element={
              teamToken ? (
                <ProtectedTeamRoute>
                  <Dashboard />
                </ProtectedTeamRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>

        {!isAdminRoute && <Footer />}
      </Box>
    </ThemeProvider>
  );
}

export default App;