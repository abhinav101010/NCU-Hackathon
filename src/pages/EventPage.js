import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box, Paper } from "@mui/material";
import SectionHeading from "../components/SectionHeading";
import Sponsors from "../components/Sponsors";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { API } from "../utils/api";

export default function EventPage() {
  const location = useLocation();
  const isEvents = location.pathname.startsWith("/events");

  const [events, setEvents] = useState([]);

  // LOAD EVENTS FROM API
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch(`${API}/api/events`);
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Failed to load events", err);
      }
    };

    loadEvents();
  }, []);

  return (
    <>
      <Container sx={{ py: 12 }}>
        <SectionHeading>Events</SectionHeading>

        <Box mt={6}>
          {events.map((event, i) => {
            const isReverse = i % 2 === 1;

            return (
              <motion.div
                key={event._id || i}
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
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(0,255,163,0.2)",
                        borderRadius: 3,
                        backdropFilter: "blur(8px)",
                        maxWidth: 380,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        component="img"
                        src={`${API}${event.img}`}
                        alt={event.title}
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
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(0,255,163,0.2)",
                        borderRadius: 3,
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <Typography
                        variant="h4"
                        fontWeight="bold"
                        gutterBottom
                        sx={{
                          background: "linear-gradient(90deg,#00ffa3,#00c6ff)",
                          WebkitBackgroundClip: "text",
                          color: "transparent",
                        }}
                      >
                        {event.title}
                      </Typography>

                      <Typography
                        sx={{
                          color: "gray",
                          mb: 2,
                          fontSize: "0.95rem",
                        }}
                      >
                        {event.date}
                      </Typography>

                      <Typography sx={{ lineHeight: 1.7 }}>
                        {event.desc}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </motion.div>
            );
          })}
        </Box>
      </Container>

      {isEvents && <Sponsors />}
    </>
  );
}