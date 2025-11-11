// AdminPage.tsx
import { Button, Heading, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <Box p={6}>
      <Heading mb={4}>Admin</Heading>
      <Button onClick={handleLogout}>Log ud</Button>
    </Box>
  );
}
