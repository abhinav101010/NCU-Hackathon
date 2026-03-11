import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Box,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

const faqData = [
  {
    question: "Q1. Who can participate in the hackathon?",
    answer:
      "Students from any college or university across India are eligible to participate in the hackathon.",
  },
  {
    question: "Q2. Do I need prior coding experience to participate?",
    answer:
      "No, prior coding experience is not mandatory. However, coding knowledge can be beneficial while building your project.",
  },
  {
    question: "Q3. How many members are allowed in one team?",
    answer:
      "Each team must consist of exactly 3 members. Teams with more or fewer members will not be allowed.",
  },
  {
    question: "Q4. What should I bring to the hackathon?",
    answer:
      "Bring a laptop, charger, signed consent form, hardware components required for your project, and a valid ID proof.",
  },
  {
    question: "Q5. Will there be prizes or certificates?",
    answer:
      "Yes, all participants will receive certificates and winning teams will receive cash prizes.",
  },
  {
    question: "Q6. Is there any registration fee?",
    answer:
      "Yes, ₹300 per team for NCU students and ₹500 per team for students from other universities.",
  },
  {
    question: "Q7. How do I register?",
    answer:
      "Participants can register through the official hackathon website by completing the form and paying the fee.",
  },
  {
    question: "Q8. What is the theme of the hackathon?",
    answer:
      "Participants can check the official website to view the themes and problem statements.",
  },
  {
    question: "Q9. What is the duration of the hackathon?",
    answer: "The hackathon will run for 56 hours.",
  },
  {
    question: "Q10. Will mentors be available?",
    answer: "Yes, mentors will guide participants during the hackathon.",
  },
  {
    question: "Q11. How will projects be judged?",
    answer:
      "Projects will be judged based on innovation, impact, implementation, feasibility and SWOT analysis.",
  },
  {
    question: "Q12. What if a teammate cancels?",
    answer:
      "Teams may bring an alternate member but must inform organizers before the event.",
  },
  {
    question: "Q13. Will participants get certificates?",
    answer: "Yes, all participants will receive certificates.",
  },
  {
    question: "Q14. Can we choose our own problem statement?",
    answer:
      "Yes, teams may choose from provided themes or work under Open Innovation.",
  },
];

export default function FAQ() {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: { xs: 8, md: 10 },
        mb: { xs: 8, md: 10 },
      }}
    >
      {/* Title */}

      <Typography
        variant="h3"
        textAlign="center"
        mt={15}
        sx={{
          mb: 4,
          fontWeight: "bold",
          color: theme.palette.primary.main,
          fontSize: { xs: "2rem", md: "3rem" },
        }}
      >
        Frequently Asked Questions
      </Typography>

      {/* Search */}

      <Box sx={{ mb: 5, maxWidth: 450, mx: "auto" }}>
        <TextField
          fullWidth
          label="Search FAQ..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* FAQ List */}

      {filteredFaqs.length > 0 ? (
        filteredFaqs.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
            sx={{
              mb: 1.5,
              borderRadius: "10px !important",
              border: `1px solid ${theme.palette.primary.main}30`,
              backdropFilter: "blur(10px)",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={500}>{faq.question}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography color="text.secondary">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography textAlign="center" color="text.secondary">
          No matching FAQs found.
        </Typography>
      )}

      {/* Contact */}

      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="body1" color="text.secondary">
          Still have questions? Feel free to reach out to us at
        </Typography>

        <Link
          href="mailto:cloudiotclub@ncuindia.edu"
          underline="hover"
          sx={{
            display: "block",
            mt: 1,
            fontWeight: "bold",
            color: theme.palette.primary.main,
          }}
        >
          cloudiotclub@ncuindia.edu
        </Link>
      </Box>
    </Container>
  );
}
