import { Box } from "@mui/material";

export default function GlassBox({ children, sx = {}, ...props }) {
  return (
    <Box
      sx={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "16px",
        p: 3,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}