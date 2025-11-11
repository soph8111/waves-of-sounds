// AdminLogin.tsx
import { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input, Alert, AlertIcon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

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

  // ✅ Hvis admin er logget ind, vis KUN log ud-knap
  if (isAdmin) {
    return (
      <Box maxW="sm" p={6} borderWidth="1px" borderRadius="lg">
        <Button colorScheme="red" w="full" onClick={handleLogout}>
            Log out 
        </Button>
      </Box>
    );
  }

  // ✅ Ellers: vis login-formular
  return (
    <Box as="form" onSubmit={handleSubmit} maxW="sm" p={6} borderWidth="1px" borderRadius="lg">
      <FormControl mb={4} isRequired>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@admin.dk" />
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
      </FormControl>

      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      <Button type="submit" colorScheme="blue" isLoading={loading} w="full">
        Log ind
      </Button>
    </Box>
  );
}
