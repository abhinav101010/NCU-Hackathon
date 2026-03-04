import React, { useState, useEffect } from "react";
import { CircularProgress, Container, Box } from "@mui/material";
import SectionHeading from "../components/SectionHeading";
import Sponsors from "../components/Sponsors";
import { useLocation } from "react-router-dom";
import EventCard from "../components/EventCard";
import { API } from "../utils/api";

export default function EventPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const isEvents = location.pathname.startsWith("/events");

  useEffect(() => {
    fetch(`${API}/api/events`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Container sx={{ py: 12 }}>
        <SectionHeading>Events</SectionHeading>

        {loading ? (
          <CircularProgress />
        ) : (
          <Box mt={6}>
            {events.map((event, i) => (
              <EventCard key={event._id || i} event={event} index={i} />
            ))}
          </Box>
        )}
      </Container>

      {isEvents && <Sponsors />}
    </>
  );
}
