import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { API } from "../utils/common";

export default function ThemeCard({ theme: themeItem, onClick }) {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.04 }}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Card
        onClick={() => onClick && onClick(themeItem)}
        sx={{
          width: 300,
          cursor: "pointer",

          background: theme.palette.background.paper,

          border: `1px solid ${theme.palette.primary.main}`,

          backdropFilter: "blur(20px)",

          borderRadius: "16px",

          transition: "0.35s",

          boxShadow: `0 0 15px ${theme.palette.primary.main}33`,

          "&:hover": {
            boxShadow: `0 0 35px ${theme.palette.primary.main}66`,
            transform: "translateY(-6px)",
          },
        }}
      >
        <CardMedia
          component="img"
          image={`${API}${themeItem?.img}`}
          alt={themeItem?.title}
          sx={{
            height: 200,
            objectFit: "cover",
          }}
        />

        <CardContent>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: theme.palette.primary.main }}
            gutterBottom
          >
            {themeItem?.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            {themeItem?.desc
              ? `${themeItem.desc.substring(0, 60)}...`
              : "No description available"}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}
