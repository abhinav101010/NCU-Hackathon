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
        spacing={8}
        alignItems="center"
        direction={isReverse ? "row-reverse" : "row"}
        sx={{ mb: 12 }}
      >
        {/* IMAGE */}
        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <Box
            component="img"
            src={`${API}${event?.img}`}
            alt={event?.title}
            sx={{
              width: "100%",
              maxWidth: 520,
              height: "auto",
              objectFit: "cover",
              borderRadius: 4,
              boxShadow: theme.shadows[4],
              transition: "0.4s",
              "&:hover": {
                transform: "scale(1.03)",
              },
            }}
          />
        </Grid>

        {/* CONTENT */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              width: "100%",
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
              background: theme.palette.background.paper,
              backdropFilter: "blur(8px)",
            }}
          >
            {/* TITLE */}
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                color: theme.palette.primary.main,
                mb: 1,
              }}
            >
              {event?.title}
            </Typography>

            {/* DATE */}
            <Typography
              sx={{
                mb: 3,
                mt: -1.5,
                fontSize: "0.95rem",
                color: theme.palette.text.secondary,
              }}
            >
              {event?.date}
            </Typography>

            {/* DESCRIPTION HTML */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                },
                gap: 3,

                "& p": {
                  m: 0,
                  mt: -2,
                  lineHeight: 1.6,
                },

                "& h4": {
                  mt: -2,
                  mb: 1,
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                },

                "& ul": {
                  pl: 3,
                  mb: 0,
                },

                "& li": {
                  mb: 0.6,
                },

                /* 2 column layout */
                "& .two-col": {
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, 1fr)",
                  },
                  gap: 3,
                },

                /* 3 column layout */
                "& .three-col": {
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(3, 1fr)",
                  },
                  gap: 3,
                },
              }}
              dangerouslySetInnerHTML={{
                __html: event?.desc || "<p>Details coming soon.</p>",
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </motion.div>
  );
}