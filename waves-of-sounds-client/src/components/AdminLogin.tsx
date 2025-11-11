// AdminLogin.tsx
import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Alert, AlertIcon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const validEmail = "admin@admin.dk";
    const validPassword = "admin123";
    await new Promise((r) => setTimeout(r, 100)); // lille delay (valgfrit)

    if (email.trim().toLowerCase() === validEmail && password === validPassword) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin"); // ← redirect
    } else {
      setError("Forkert email eller password.");
      localStorage.removeItem("isAdmin");
    }

    setLoading(false);
  };

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
