import React, { useEffect, useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import Sponsors from "../components/Sponsors";
import { useLocation } from "react-router-dom";
import { API } from "../utils/common";
import EventCard from "../components/EventCard";

export default function EventPage() {
  const theme = useTheme();
  const location = useLocation();
  const isEvents = location.pathname.startsWith("/events");

  const [events, setEvents] = useState([]);

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
      <Container sx={{ py: 14, maxWidth: "1100px !important" }}>
        
        {/* PAGE TITLE */}

        <Typography
          variant="h3"
          textAlign="center"
          fontWeight={800}
          sx={{
            mb: 10,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Event Details
        </Typography>

        {/* EVENTS */}

        <Box>
          {events.map((event, index) => (
            <motion.div
              key={`${event._id}-${index}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <EventCard event={event} index={index} />
            </motion.div>
          ))}
        </Box>

      </Container>

      {isEvents && <Sponsors />}
    </>
  );
}