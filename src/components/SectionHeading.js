import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function SectionHeading({ children }) {
  return (
    <Box textAlign="center" mb={6}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(90deg,#00ffa3,#00c6ff,#ff0080)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {children}
        </Typography>
      </motion.div>
    </Box>
  );
}