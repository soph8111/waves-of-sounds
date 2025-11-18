// AdminLogin.tsx
import { useState, useEffect } from "react";
import { Box, Button, Input, Alert, AlertIcon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);    // ✅ ny
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Check om admin allerede er logget ind
  useEffect(() => {
    const loggedIn = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(loggedIn);
  }, []);

  // ✅ LOG OUT FUNKTION
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    setEmail("");
    setPassword("");
    navigate("/");
  };

  // ✅ LOG IN FUNKTION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const validEmail = "admin@admin.dk";
    const validPassword = "admin123";
    await new Promise((r) => setTimeout(r, 100));

    if (email.trim().toLowerCase() === validEmail && password === validPassword) {
      localStorage.setItem("isAdmin", "true");
      setIsAdmin(true);                    // ✅ opdater visning
      navigate("/admin");                  // redirect
    } else {
      setError("Forkert email eller password.");
      localStorage.removeItem("isAdmin");
    }

    setLoading(false);
  };

  // Hvis admin er logget ind, vis KUN log ud-knap
  if (isAdmin) {
    return (
      <>
        <Link className="link_adminpage" to="./admin">Admin page</Link>
        <Button className="button_to_adminpage" onClick={handleLogout}>
            Log out 
        </Button>
      </>
    );
  }

  // Ellers: vis login-formular
  return (
    <Box as="form" onSubmit={handleSubmit} maxW="sm" p={6} borderWidth="1px" borderRadius="lg">
      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" isRequired />
      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" isRequired />

      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      <Button type="submit" isLoading={loading} w="full" className="button_to_adminpage">
        Log ind
      </Button>
    </Box>
  );
}
