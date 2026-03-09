import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { darkNeon, lightTheme, studentTheme } from "./theme";

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

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const adminToken = localStorage.getItem("adminToken");
  const teamToken = localStorage.getItem("teamToken");

  const [themeName, setThemeName] = useState(
    localStorage.getItem("theme") || "light",
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

  useEffect(() => {
    // if (adminToken && location.pathname === "/admin/login") {
    //   window.location.href = "/admin";
    // }

    if (teamToken && location.pathname === "/login") {
      window.location.href = "/dashboard";
    }
  }, [location.pathname]);
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />

      {/* Background */}
      <NetworkBackground />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Navbar themeName={themeName} setThemeName={setThemeName} />
        <ScrollToTop />
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
          <Route path="/sponsors" element={<SponsorsPage />} />

          {/* ADMIN LOGIN */}
          <Route
            path="/admin/login"
            element={adminToken ? <Navigate to="/admin" /> : <LoginPage />}
          />

          {/* PROTECTED ADMIN */}
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

          {/* TEAM LOGIN */}
          <Route
            path="/login"
            element={
              teamToken ? <Navigate to="/dashboard" /> : <TeamLoginPage />
            }
          />

          {/* TEAM DASHBOARD */}
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

        {/* Hide Footer for admin pages */}
        {!isAdminRoute && <Footer />}
      </Box>
    </ThemeProvider>
  );
}

export default App;
