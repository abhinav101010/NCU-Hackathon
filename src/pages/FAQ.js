import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@emotion/react";

export default function FAQ() {
  const theme = useTheme();
  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 10 }}>
      {/* Page Title */}
      <Typography
        variant="h3"
        textAlign="center"
        sx={{
          mb: 6,
          fontWeight: "bold",
          color: theme.palette.primary.main,
        }}
      >
        Frequently Asked Questions
      </Typography>

      {/* FAQ 1 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Who can participate in the hackathon?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="gray">
            The hackathon is open to all university students who are passionate
            about technology, innovation, and problem solving.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 2 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>What is the team size?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="gray">
            Teams can have between 2 to 4 members. Solo participation is
            generally not allowed to encourage collaboration.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 3 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Is there any registration fee?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="gray">
            No, participation in the hackathon is completely free.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 4 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>What should participants bring?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="gray">
            Participants should bring their laptops, chargers, and any hardware
            required for their project.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 5 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Will mentors be available?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="gray">
            Yes, mentors from industry and academia will be available throughout
            the hackathon to guide teams.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 6 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>How will projects be judged?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="gray">
            Projects will be evaluated based on innovation, technical
            implementation, impact, and presentation.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
