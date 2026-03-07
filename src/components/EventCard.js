import { Grid, Box, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { API } from "../utils/common";

export default function EventCard({ event, index }) {
  const theme = useTheme();

  const isReverse = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: isReverse ? 100 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <Grid
        container
        spacing={6}
        alignItems="center"
        direction={isReverse ? "row-reverse" : "row"}
        sx={{ mb: 10 }}
      >
        {/* IMAGE */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              p: 2,
              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 3,
              backdropFilter: "blur(8px)",

              boxShadow: theme.shadows[2],

              maxWidth: 380,
              width: "100%",
              display: "flex",
              justifyContent: "center",

              transition: "0.3s",

              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: theme.shadows[6],
              },
            }}
          >
            <Box
              component="img"
              src={`${API}${event?.img}`}
              alt={event?.title}
              sx={{
                width: "100%",
                height: 220,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          </Box>
        </Grid>

        {/* CONTENT */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 3,
              backdropFilter: "blur(8px)",

              boxShadow: theme.shadows[1],

              transition: "0.3s",

              "&:hover": {
                boxShadow: theme.shadows[4],
              },
            }}
          >
            <Typography
              variant="h4"
              fontWeight={700}
              gutterBottom
              sx={{ color: theme.palette.primary.main }}
            >
              {event?.title || "Untitled Event"}
            </Typography>

            <Typography
              sx={{
                color: theme.palette.text.secondary,
                mb: 2,
                fontSize: "0.95rem",
              }}
            >
              {event?.date || ""}
            </Typography>

            <Typography
              sx={{
                lineHeight: 1.7,
                color: theme.palette.text.primary,
              }}
            >
              {event?.desc || "Event details coming soon."}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </motion.div>
  );
}