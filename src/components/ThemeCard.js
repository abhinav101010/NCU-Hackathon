import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { API } from "../utils/common";

export default function ThemeCard({ theme: themeItem }) {
  const theme = useTheme();
  const location = useLocation();
  const isThemesPage = location.pathname === "/themes";

  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = () => {
    if (!isThemesPage) {
      setOpenDialog(true);
    }
  };

  // convert text → array
  const problems =
    themeItem?.problemStatements?.split("\n").filter((p) => p.trim() !== "") ||
    [];

  return (
    <>
      <Box
        sx={{
          width: 320,
          height: !isThemesPage ? 330 : 420,
        }}
      >
        <Card
          onClick={handleClick}
          sx={{
            height: "100%",
            borderRadius: "16px",
            border: `1px solid ${theme.palette.primary.main}`,
            background: theme.palette.background.paper,
            boxShadow: `0 0 15px ${theme.palette.primary.main}33`,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            cursor: isThemesPage ? "default" : "pointer",
          }}
        >
          {/* IMAGE */}

          <CardMedia
            component="img"
            image={`${API}${themeItem?.img}`}
            alt={themeItem?.title}
            sx={{
              height: 180,
              objectFit: "cover",
              flexShrink: 0,
            }}
          />

          {/* CONTENT */}

          <CardContent
            sx={{
              flexGrow: 1,
              p: 0,
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              scrollbarWidth: "thin",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                color: theme.palette.primary.main,
                px: 2,
                pt: 2,
              }}
            >
              {themeItem?.title}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                px: 2,
                mt: 1,
                mb: 1,
              }}
            >
              {themeItem?.desc.substring(0, 100)}...
            </Typography>

            {/* SINGLE ACCORDION */}

            {isThemesPage && problems.length > 0 && (
              <Accordion
                sx={{
                  mt: "auto",
                  width: "100%",
                  boxShadow: "none",
                  borderTop: `1px solid ${theme.palette.divider}`,
                  borderRadius: 0,
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    Problem Statements
                  </Typography>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    maxHeight: 160,
                    overflowY: "auto",
                  }}
                >
                  <List dense>
                    {problems.map((p, i) => (
                      <ListItem key={i}>
                        <Typography variant="body2">
                          {i + 1}. {p}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* DIALOG */}

      {!isThemesPage && (
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{themeItem?.title}</DialogTitle>

          <DialogContent dividers>
            <Box
              component="img"
              src={`${API}${themeItem?.img}`}
              alt={themeItem?.title}
              sx={{
                width: "100%",
                borderRadius: 2,
                mb: 2,
              }}
            />

            <Typography sx={{ mb: 2 }}>{themeItem?.desc}</Typography>

            {problems.length > 0 && (
              <Accordion
                defaultExpanded
                sx={{
                  boxShadow: "none",
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: "8px",
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight="bold">Problem Statements</Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <List dense>
                    {problems.map((p, i) => (
                      <ListItem key={i}>
                        <Typography variant="body2">
                          {i + 1}. {p}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
