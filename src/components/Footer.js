import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: 10,
        py: 5,
        textAlign: "center",

        background: theme.palette.mode === "light"
          ? "linear-gradient(90deg,#ffffff,#f5f7fb,#ffffff)"
          : "linear-gradient(90deg,#0a0a0a,#111,#0a0a0a)",

        borderTop: `1px solid ${theme.palette.divider}`,

        boxShadow: `0 -5px 20px ${theme.palette.primary.main}20`,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          mb: 1,
          color: theme.palette.primary.main,
        }}
      >
        Hackathon 2026
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mb: 2,
          color: theme.palette.text.secondary,
        }}
      >
        Build. Innovate. Transform the Future.
      </Typography>

      <Typography
        variant="caption"
        sx={{
          mt: 3,
          display: "block",
          color: theme.palette.text.secondary,
        }}
      >
        © 2026 Hackathon. All rights reserved.
      </Typography>
    </Box>
  );
}