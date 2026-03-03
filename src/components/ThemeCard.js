import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function ThemeCard({ theme, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
    >
      <Card
        onClick={() => onClick && onClick(theme)}
        sx={{
          maxWidth: 320,
          cursor: "pointer",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          borderRadius: "16px",
          transition: "0.4s",
          transform: "rotate(-1deg)",
          "&:hover": {
            boxShadow: "0 0 30px rgba(0,255,163,0.6)",
            transform: "rotate(0deg)",
          },
        }}
      >
        <CardMedia
          component="img"
          image={theme.img}
          sx={{ height: 200 }}
        />

        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {theme.title}
          </Typography>

          <Typography variant="body2" color="gray">
            {theme.desc.substring(0, 60)}...
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}