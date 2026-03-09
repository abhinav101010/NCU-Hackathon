// import React, { useEffect, useState } from "react";
// import { Container, Box } from "@mui/material";
// import SectionHeading from "../components/SectionHeading";
// import Sponsors from "../components/Sponsors";
// import { useLocation } from "react-router-dom";
// import { API } from "../utils/common";
// import EventCard from "../components/EventCard";

// export default function EventPage() {
//   const location = useLocation();
//   const isEvents = location.pathname.startsWith("/events");

//   const [events, setEvents] = useState([]);

//   /* ---------------- LOAD EVENTS ---------------- */

//   useEffect(() => {
//     const loadEvents = async () => {
//       try {
//         const res = await fetch(`${API}/api/events`);
//         const data = await res.json();

//         setEvents(data);
//       } catch (err) {
//         console.error("Failed to load events", err);
//       }
//     };

//     loadEvents();
//   }, []);

//   return (
//     <>
//       <Container sx={{ py: 12 }}>
//         <SectionHeading>Events</SectionHeading>

//         <Box mt={6}>
//           {events.map((event, index) => (
//             <EventCard
//               key={`${event._id}-${index}`}
//               event={event}
//               index={index}
//             />
//           ))}
//         </Box>
//       </Container>

//       {isEvents && <Sponsors />}
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import Sponsors from "../components/Sponsors";
import { useLocation } from "react-router-dom";
import { API } from "../utils/common";
import EventCard from "../components/EventCard";

export default function EventPage() {
  const theme = useTheme();
  const location = useLocation();
  const isEvents = location.pathname.startsWith("/events");

  const [events, setEvents] = useState([]);
  const [tabs, setTabs] = useState({});

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

  const handleTabChange = (eventIndex, value) => {
    setTabs((prev) => ({
      ...prev,
      [eventIndex]: value,
    }));
  };

  return (
    <>
      <EventCard />
      <Container sx={{ py: 14, maxWidth: "900px !important" }}>
        {/* PAGE TITLE */}

        <Typography
          variant="h3"
          fontWeight={800}
          textAlign="center"
          sx={{
            mb: 10,
            color: theme.palette.primary.main,
          }}
        >
          Event Detials
        </Typography>

        <Box>
          {events.map((event, index) => {
            const days = event?.days || [];
            const activeTab = tabs[index] || 0;

            return (
              <motion.div
                key={event._id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <Grid container spacing={6} sx={{ mb: 12 }}>
                  {/* IMAGE (COMMENTED AS REQUESTED) */}

                  {/*
                  <Grid item xs={12} md={6} display="flex" justifyContent="center">
                    <Box
                      component="img"
                      src={`${API}${event?.img}`}
                      alt={event?.title}
                      sx={{
                        width: "100%",
                        maxWidth: 520,
                        borderRadius: 4,
                        boxShadow: theme.shadows[4],
                      }}
                    />
                  </Grid>
                  */}

                  {/* CONTENT */}

                  <Grid item xs={12}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 5,
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
                          mb: 4,
                          fontSize: "1rem",
                          color: theme.palette.text.secondary,
                        }}
                      >
                        {event?.date}
                      </Typography>

                      {/* SCHEDULE */}

                      {days.length > 0 && (
                        <>
                          {/* DAY TABS */}

                          <Tabs
                            value={activeTab}
                            onChange={(e, v) => handleTabChange(index, v)}
                            sx={{ mb: 4 }}
                          >
                            {days.map((d, i) => (
                              <Tab key={i} label={d.day} />
                            ))}
                          </Tabs>

                          {/* TIMELINE */}

                          <Box>
                            {days[activeTab]?.schedule?.map((item, i) => (
                              <Box
                                key={i}
                                sx={{
                                  display: "flex",
                                  gap: 4,
                                  mb: 3,
                                  borderLeft: `3px solid ${theme.palette.primary.main}`,
                                  pl: 3,
                                  position: "relative",
                                }}
                              >
                                <Typography
                                  fontWeight={700}
                                  sx={{
                                    minWidth: 110,
                                    color: theme.palette.primary.main,
                                  }}
                                >
                                  {item.time}
                                </Typography>

                                <Box>
                                  <Typography fontWeight={600}>
                                    {item.title}
                                  </Typography>

                                  {item.description && (
                                    <Typography color="text.secondary">
                                      {item.description}
                                    </Typography>
                                  )}
                                </Box>
                              </Box>
                            ))}
                          </Box>
                        </>
                      )}

                      {!days.length && (
                        <Typography color="text.secondary">
                          Schedule coming soon.
                        </Typography>
                      )}
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
