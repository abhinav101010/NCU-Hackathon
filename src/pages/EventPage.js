import React from "react";
import { CircularProgress, Container, Grid } from "@mui/material";
import SectionHeading from "../components/SectionHeading";
// import events from "../data/events";
import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";

export default function EventPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
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
    <Container sx={{ py: 12 }}>
      <SectionHeading>Events</SectionHeading>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid
          container
          spacing={4}
          justifyContent="center" // 🔥 center entire row
          alignItems="stretch"
        >
          {events.map((event, i) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={i}
              sx={{
                display: "flex",
                justifyContent: "center", // 🔥 center card inside column
              }}
            >
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
