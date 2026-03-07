import React, { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import SectionHeading from "../components/SectionHeading";
import Sponsors from "../components/Sponsors";
import { useLocation } from "react-router-dom";
import { API } from "../utils/common";
import EventCard from "../components/EventCard";

export default function EventPage() {

  const location = useLocation();
  const isEvents = location.pathname.startsWith("/events");

  const [events, setEvents] = useState([]);

  /* ---------------- LOAD EVENTS ---------------- */

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

          {events.map((event, index) => (

            <EventCard
              key={event._id || index}
              event={event}
              index={index}
            />

          ))}

        </Box>

      </Container>

      {isEvents && <Sponsors />}
    </>
  );
}