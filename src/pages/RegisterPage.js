import { Container } from "@mui/material";
import RegistrationForm from "../components/RegistrationForm";
import Navbar from '../components/Navbar';

export default function RegisterPage() {
  return (
    <Container sx={{ py: 12, position: "relative" }}>
      <RegistrationForm />
    </Container>
  );
}
