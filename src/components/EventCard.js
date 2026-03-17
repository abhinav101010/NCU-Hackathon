import { Box, Paper, Typography, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { API } from "../utils/common";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "swiper/css";
import "swiper/css/navigation";

export default function EventCard({ event }) {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 6 }}>

      {/* EVENT TITLE */}
      <Typography
        variant="h4" fontWeight={800} mb={1}
        sx={{
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {event.title}
      </Typography>

      <Typography color="text.secondary" mb={5}>
        {event.date}
      </Typography>

      {event.days?.map((day, i) => {
        const prevClass = `prev-${event._id}-${i}`;
        const nextClass = `next-${event._id}-${i}`;

        return (
          <Paper key={i} sx={{
            p: 4, mb: 5, borderRadius: 4,
            backdropFilter: "blur(12px)",
            background: theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.04)"
              : theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}>

            {/* DAY LABEL */}
            <Typography fontWeight={700} sx={{
              mb: 3, fontSize: "1.2rem",
              color: theme.palette.primary.main,
            }}>
              {day.day}
            </Typography>

            <Box sx={{
              position: "relative",
              "& .swiper": { overflow: "visible" },
              "& .swiper-wrapper": { overflow: "visible" },
            }}>

              {/* LEFT NAV */}
              <IconButton className={prevClass} sx={{
                position: "absolute", top: "40%", left: -20, zIndex: 5,
                background: theme.palette.action.hover,
                backdropFilter: "blur(10px)",
                "&:hover": {
                  background: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                },
              }}>
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>

              {/* RIGHT NAV */}
              <IconButton className={nextClass} sx={{
                position: "absolute", top: "40%", right: -20, zIndex: 5,
                background: theme.palette.action.hover,
                backdropFilter: "blur(10px)",
                "&:hover": {
                  background: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                },
              }}>
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>

              {/* SWIPER */}
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{ prevEl: `.${prevClass}`, nextEl: `.${nextClass}` }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                spaceBetween={24}
                slidesPerView={1.2}
                breakpoints={{
                  640:  { slidesPerView: 2 },
                  900:  { slidesPerView: 3 },
                  1200: { slidesPerView: 4 },
                }}
              >
                {day.schedule?.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <Paper sx={{
                      p: 3,
                      height: 200,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: 4,
                      transition: "all .3s ease",
                      border: `1px solid ${theme.palette.divider}`,
                      background: theme.palette.background.paper,
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: theme.shadows[6],
                        borderColor: theme.palette.primary.main,
                      },
                    }}>

                      {/* TIME BADGE */}
                      <Box sx={{
                        display: "inline-block",
                        px: 2, py: 0.5,
                        mb: 2,
                        fontSize: "0.8rem",
                        borderRadius: 20,
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        color: theme.palette.primary.contrastText,
                        fontWeight: 600,
                      }}>
                        {item.time}
                      </Box>

                      <Typography fontWeight={700} fontSize="0.95rem">
                        {item.title}
                      </Typography>

                      {item.description && (
                        <Typography color="text.secondary" fontSize="0.82rem" lineHeight={1.5}>
                          {item.description}
                        </Typography>
                      )}
                    </Paper>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
}