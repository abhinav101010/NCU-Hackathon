import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SectionHeading from "../components/SectionHeading";
import ThemeCard from "../components/ThemeCard";
import Sponsors from "../components/Sponsors";
import { useLocation } from "react-router-dom";

export default function ThemePage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();

  const location = useLocation();
  const isThemes = location.pathname.startsWith("/themes");

  useEffect(() => {
    fetch("http://localhost:5000/api/themes")
      .then((res) => res.json())
      .then((data) => {
        setThemes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleOpen = (themeItem) => {
    setSelectedTheme(themeItem);
    setDialogOpen(true);
  };

  return (
    <>
      <Container sx={{ py: 12 }}>
        <SectionHeading>Themes</SectionHeading>

        {loading ? (
          <CircularProgress />
        ) : (
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="center"
          >
            {themes.map((themeItem) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={themeItem._id}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ThemeCard theme={themeItem} onClick={handleOpen} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* THEME DIALOG */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.paper,

            border: `1px solid ${theme.palette.primary.main}`,

            borderRadius: 3,

            boxShadow: `0 0 25px ${theme.palette.primary.main}40`,
          },
        }}
      >
        {selectedTheme && (
          <>
            <DialogTitle
              sx={{
                borderBottom: `1px solid ${theme.palette.divider}`,
                fontWeight: "bold",
                color: theme.palette.primary.main,
              }}
            >
              {selectedTheme.title}
            </DialogTitle>

            <DialogContent sx={{ mt: 2 }}>
              <Box
                component="img"
                src={selectedTheme.img}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  mb: 2,
                }}
              />

              <Typography
                sx={{
                  color: theme.palette.text.primary,
                  lineHeight: 1.7,
                }}
              >
                {selectedTheme.desc}
              </Typography>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
              <Button
                onClick={() => setDialogOpen(false)}
                variant="contained"
                color="primary"
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {isThemes && <Sponsors />}
    </>
  );
}
