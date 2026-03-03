import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 10,
        py: 5,
        textAlign: "center",
        background: "linear-gradient(90deg,#0a0a0a,#111,#0a0a0a)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        Hackathon 2026
      </Typography>

      <Typography variant="body2" color="gray" sx={{ mb: 2 }}>
        Build. Innovate. Transform the Future.
      </Typography>

      <Typography
        variant="caption"
        color="gray"
        sx={{ mt: 3, display: "block" }}
      >
        © 2026 Hackathon. All rights reserved.
      </Typography>
    </Box>
  );
}