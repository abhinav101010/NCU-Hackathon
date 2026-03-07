import React from "react";
import { Container, Typography, Grid, Button, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const contacts = [
  {
    name: "Jatin Dalal",
    role: "Common Query",
    phone: "919315431144",
  },
  {
    name: "Khushi Kaptiyal",
    role: "Helpdesk & FAQ'S",
    phone: "918595594917",
  },
  {
    name: "Aayush Yadav",
    role: "Sponsorship",
    phone: "919306101432",
  },
  {
    name: "Ansh Gupta",
    role: "Social Media",
    phone: "917292072784",
  },
];

export default function ContactUsPage() {
  const theme = useTheme();

  const message = encodeURIComponent(
    "Hello! I would like to know more about the Hackathon.",
  );

  return (
    <Container sx={{ py: 12 }}>
      {/* Heading */}
      <Typography
        variant="h3"
        textAlign="center"
        sx={{
          mb: 6,
          fontWeight: "bold",
          color: theme.palette.primary.main,
        }}
      >
        Contact Us
      </Typography>

      {/* Contact Cards */}
      <Grid container spacing={4} justifyContent="center">
        {contacts.map((person, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 3,

                  background: theme.palette.background.paper,

                  border: `1px solid ${theme.palette.primary.main}40`,

                  backdropFilter: "blur(10px)",

                  transition: "0.3s",

                  boxShadow: `0 0 15px ${theme.palette.primary.main}20`,

                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: `0 0 30px ${theme.palette.primary.main}50`,
                  },
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {person.name}
                </Typography>

                <Typography
                  sx={{
                    color: theme.palette.secondary.main,
                    mb: 2,
                  }}
                >
                  {person.role}
                </Typography>

                <Typography sx={{ mb: 3 }}>+{person.phone}</Typography>

                <Button
                  variant="contained"
                  startIcon={<WhatsAppIcon />}
                  href={`https://wa.me/${person.phone}?text=${message}`}
                  target="_blank"
                  sx={{
                    borderRadius: "30px",
                    px: 3,
                    boxShadow: `0 0 15px ${theme.palette.primary.main}`,
                  }}
                >
                  Message on WhatsApp
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
