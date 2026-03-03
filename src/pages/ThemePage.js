import React, { useState } from "react";
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
import SectionHeading from "../components/SectionHeading";
// import themes from "../data/themes";
import { useEffect } from "react";
import ThemeCard from "../components/ThemeCard";

export default function ThemePage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleOpen = (theme) => {
    setSelectedTheme(theme);
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
            {themes.map((theme, i) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {/* Animation preserved */}
                <ThemeCard theme={theme} onClick={handleOpen} />
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
            backgroundColor: "#0f0f0f",
            border: "1px solid rgba(0,255,163,0.4)",
            borderRadius: 3,
          },
        }}
      >
        {selectedTheme && (
          <>
            <DialogTitle
              sx={{
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                fontWeight: "bold",
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
              <Typography>{selectedTheme.desc}</Typography>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}
