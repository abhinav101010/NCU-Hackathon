import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Paper,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { API } from "../utils/common.js";
import logo from "../utils/logo.png";

export default function SponsorsPage() {
  const theme = useTheme();
  const [selectedTier, setSelectedTier] = useState(null);
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  const sponsorsTier = [
    { title: "Silver Sponsor", tier: "silver" },
    { title: "Gold Sponsor", tier: "gold" },
    { title: "Platinum Sponsor", tier: "platinum" },
    { title: "Co-Title Sponsor", tier: "co-title" },
    { title: "Title Sponsor", tier: "title" },
  ];

  const benefits = [
    {
      name: "Logo on Website",
      tiers: ["Silver", "Gold", "Platinum", "Co-Title", "Title"],
    },
    {
      name: "Social Media Promotion",
      tiers: ["Silver", "Gold", "Platinum", "Co-Title", "Title"],
    },
    {
      name: "Logo on Social Media",
      tiers: ["Gold", "Platinum", "Co-Title", "Title"],
    },
    {
      name: "Logo on Certificates",
      tiers: ["Platinum", "Co-Title", "Title"],
    },
    {
      name: "Speaker Opportunity",
      tiers: ["Platinum", "Co-Title", "Title"],
    },
    {
      name: "Product Demo Booth",
      tiers: ["Co-Title", "Title"],
    },
    {
      name: "Branding During Hackathon",
      tiers: ["Platinum", "Co-Title", "Title"],
    },
    {
      name: "Judge Final Round",
      tiers: ["Co-Title", "Title"],
    },
    {
      name: "Keynote Address",
      tiers: ["Title"],
    },
    {
      name: "Exclusive Branding",
      tiers: ["Title"],
    },
  ];

  const contacts = [
    {
      name: "Aayush Yadav",
      role: "Sponsorship",
      phone: "919306101432",
    },
  ];

  const message =
    "Hi, I'm interested in sponsoring the INNOVATHON. Could you please share more details?";

  const filteredSponsors = selectedTier
    ? sponsors.filter(
        (sponsor) =>
          sponsor?.tier?.toLowerCase() === selectedTier?.toLowerCase(),
      )
    : sponsors;

  useEffect(() => {
    fetch(`${API}/api/sponsors`)
      .then((res) => res.json())
      .then((data) => {
        setSponsors(data);
        console.log(data);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Sponsors fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 12 }}>
      {/* Page Title */}

      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          mb: 8,
          color: theme.palette.primary.main,
        }}
      >
        Sponsors & Partners
      </Typography>

      {/* Sponsorship Tier Title */}

      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          mb: 8,
          color: theme.palette.text.primary,
        }}
      >
        Sponsorship Tiers
      </Typography>

      {/* Sponsor Network Row */}

      <Box sx={{ position: "relative", mt: 8 }}>
        {/* Network Line */}

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "3px",
            background:
              "linear-gradient(90deg, transparent, #00e5ff, #7c4dff, #00e5ff, transparent)",
            opacity: 0.6,
            zIndex: 0,
          }}
        />

        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{
            flexWrap: { xs: "nowrap", md: "nowrap" },
            overflowX: { xs: "auto", md: "visible" },
            position: "relative",
            zIndex: 2,
            pb: 2,
          }}
        >
          {sponsorsTier.map((sponsor, index) => {
            let scale = 1;
            let glow = `0 0 15px ${theme.palette.primary.main}40`;

            if (sponsor.tier === "gold") glow = "0 0 25px #ffd70080";
            if (sponsor.tier === "platinum") glow = "0 0 35px #e0e0ff";
            if (sponsor.tier === "co") glow = "0 0 45px #00e5ff";

            if (sponsor.tier === "title") {
              glow = "0 0 80px #00e5ff";
              scale = 1.35;
            }

            const isSelected = selectedTier === sponsor.tier;

            return (
              <Grid item key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  viewport={{ once: true }}
                >
                  <Box
                    onClick={() => setSelectedTier(sponsor.tier)}
                    sx={{
                      width: 230,
                      height: 180,
                      textAlign: "center",
                      p: 3,
                      borderRadius: 3,
                      cursor: "pointer",
                      background: theme.palette.background.paper,

                      border: isSelected
                        ? `2px solid ${theme.palette.primary.main}`
                        : `1px solid ${theme.palette.primary.main}40`,

                      boxShadow: isSelected
                        ? `0 0 80px ${theme.palette.primary.main}`
                        : glow,

                      transform: isSelected
                        ? `scale(${scale + 0.15})`
                        : `scale(${scale})`,

                      transition: "0.35s",
                      backdropFilter: "blur(10px)",

                      "&:hover": {
                        transform: `scale(${scale + 0.07})`,
                        boxShadow: glow.replace("0 0", "0 0 100px"),
                      },
                    }}
                  >
                    {/* Logo */}

                    <Box
                      sx={{
                        height: 85,
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 2,
                        background:
                          theme.palette.mode === "light"
                            ? "#f5f5f5"
                            : "rgba(255,255,255,0.05)",
                      }}
                    >
                      {/* <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      </Box> */}
                      <img
                        src={logo}
                        alt="Innovathon Logo"
                        style={{ height: 65 }}
                      />
                    </Box>

                    <Typography
                      fontWeight="bold"
                      variant={sponsor.tier === "title" ? "h5" : "h6"}
                    >
                      {sponsor.title}
                    </Typography>

                    {/* {isSelected && (
                      <Typography
                        sx={{
                          mt: 1,
                          fontSize: 12,
                          color: theme.palette.primary.main,
                          fontWeight: "bold",
                        }}
                      >
                        Selected
                      </Typography>
                    )} */}
                  </Box>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* List */}
      <Box sx={{ mt: 10 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 6,
            fontWeight: "bold",
            color: theme.palette.primary.main,
          }}
        >
          {(selectedTier ? selectedTier : "All").toUpperCase()} Sponsors
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {filteredSponsors.map((sponsor) => (
              <Grid item key={sponsor._id}>
                <motion.div whileHover={{ scale: 1.08 }}>
                  <Box
                    sx={{
                      background:
                        theme.palette.mode === "light"
                          ? "#ffffff"
                          : "rgba(255,255,255,0.06)",

                      border: `1px solid ${theme.palette.primary.main}35`,
                      borderRadius: "14px",
                      padding: "18px 32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: "150px",
                      backdropFilter: "blur(6px)",
                      boxShadow: `0 0 10px ${theme.palette.primary.main}20`,

                      "&:hover": {
                        transform: "translateY(-6px) scale(1.05)",
                        boxShadow: `0 0 25px ${theme.palette.primary.main}60`,
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={`${API}${sponsor?.img}`}
                      alt={sponsor?.name}
                      sx={{
                        height: 60,
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Sponsorship Benefits Table */}

      <TableContainer
        component={Paper}
        sx={{
          mt: 5,
          borderRadius: 3,
          border: `1px solid ${theme.palette.primary.main}40`,
          backdropFilter: "blur(10px)",
          background:
            theme.palette.mode === "light" ? "#fff" : "rgba(255,255,255,0.04)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Benefits</TableCell>

              {sponsorsTier.map((tier) => (
                <TableCell key={tier.tier} align="center">
                  {tier.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {benefits.map((benefit, index) => (
              <TableRow key={index}>
                <TableCell>{benefit.name}</TableCell>

                {sponsorsTier.map((tier) => {
                  const hasBenefit = benefit.tiers.includes(tier.title.replace(" Sponsor", ""))

                  return (
                    <TableCell key={tier} align="center">
                      {hasBenefit ? (
                        <Typography color="success.main" fontWeight="bold">
                          ✔
                        </Typography>
                      ) : (
                        <Typography color="text.disabled">—</Typography>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Become Sponsor Section */}

      <Box
        sx={{
          mt: 14,
          textAlign: "center",
          mb: 6,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            color: theme.palette.primary.main,
            fontWeight: "bold",
          }}
        >
          Become a Sponsor
        </Typography>

        <Typography
          sx={{
            color: theme.palette.text.secondary,
            mb: 6,
            lineHeight: 1.7,
            maxWidth: 720,
            mx: "auto",
          }}
        >
          Support the next generation of innovators by sponsoring the NCU
          Hackathon. Gain brand visibility, connect with talented developers,
          and showcase your technology to hundreds of participants.
        </Typography>
      </Box>

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
                  href={`https://wa.me/${person.phone}?text=${encodeURIComponent(
                    message,
                  )}`}
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
