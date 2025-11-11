// AdminPage.tsx
import { Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import NewArtistForm from "./AdminNewArtistForm";

export default function AdminPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <div className='container' >
      <Heading mb={4}>Admin</Heading>
      <Button onClick={handleLogout}>Log ud</Button>

      <NewArtistForm></NewArtistForm>

      
    </div>
  );
}
