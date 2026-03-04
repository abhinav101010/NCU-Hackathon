import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { API } from "../utils/api.js";

export default function ThemeCard({ theme: themeItem, onClick }) {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
    >
      <Card
        onClick={() => onClick && onClick(themeItem)}
        sx={{
          maxWidth: 320,
          cursor: "pointer",

          background: theme.palette.background.paper,

          border: `1px solid ${theme.palette.primary.main}`,

          backdropFilter: "blur(20px)",

          borderRadius: "16px",

          transition: "0.4s",

          transform: "rotate(-1deg)",

          boxShadow: `0 0 15px ${theme.palette.primary.main}33`,

          "&:hover": {
            boxShadow: `0 0 35px ${theme.palette.primary.main}66`,
            transform: "rotate(0deg) translateY(-4px)",
          },
        }}
      >
        <CardMedia
          component="img"
          image={`${API}${themeItem.img}`}
          sx={{
            height: 200,
            objectFit: "cover"
          }}
        />

        <CardContent>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: theme.palette.primary.main }}
          >
            {themeItem.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            {themeItem.desc.substring(0, 60)}...
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}