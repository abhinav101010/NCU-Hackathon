import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function EventCard({ event }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
    >
      <Card
        sx={{
          maxWidth: 320,
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          borderRadius: "16px",
          transition: "0.4s",
          transform: "rotate(1deg)",
          "&:hover": {
            boxShadow: "0 0 30px rgba(255,0,128,0.6)",
            transform: "rotate(0deg)",
          },
        }}
      >
        <CardMedia
          component="img"
          image={event.img}
          sx={{ height: 200 }}
        />

        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {event.title}
          </Typography>

          <Typography
            variant="body2"
            color="secondary"
            sx={{ mb: 1 }}
          >
            {event.date}
          </Typography>

          <Typography variant="body2" color="gray">
            {event.desc}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}