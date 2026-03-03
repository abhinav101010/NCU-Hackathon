import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import theme from "./theme";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NetworkBackground from "./components/NetworkBackground";
import EventPage from "./pages/EventPage";
import RulePage from "./pages/RulePage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ThemePage from "./pages/ThemePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import Dashboard from "./pages/Dashboard";
import Sponsors from "./components/Sponsors";
import FAQ from "./pages/FAQ";

function App() {
  console.log({
  Navbar,
  Footer,
  NetworkBackground,
  HomePage,
  ThemePage,
  EventPage,
  RulePage,
  RegisterPage,
  LoginPage,
  AdminPage,
  Dashboard,
});
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Background */}
      <NetworkBackground />

      {/* Foreground Content */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/themes" element={<ThemePage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/rules" element={<RulePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/faq" element={<FAQ />} />

          <Route path="/login/" element={<LoginPage />} />
          <Route path="/admin/" element={<AdminPage />} />
          <Route path="/dashboard/" element={<Dashboard />} />
        </Routes>
        <Sponsors />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;