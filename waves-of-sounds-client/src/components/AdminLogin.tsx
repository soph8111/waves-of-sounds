// AdminLogin.tsx
import { useState, useEffect } from "react";
import { Box, Button, Input, Alert, AlertIcon } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import api from "../api";

type LoginResponse = {
  id: number;
  email: string;
  isAdmin: boolean;
};

export default function AdminLogin() {
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Check om admin allerede er logget ind
  useEffect(() => {
    const loggedIn = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(loggedIn);
  }, []);

  // LOG OUT FUNKTION
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    setEmail("");
    setPassword("");
    navigate("/");
  };

  // LOG IN FUNKTION (via backend)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // try {
    //   const res = await axios.post<LoginResponse>("/user/login", {
    //     email: email.trim().toLowerCase(),
    //     password: password,
    //   });
    
    
    try {
    // use api (which has baseURL from REACT_APP_API_URL)
    const res = await api.post<LoginResponse>("/user/login", {
      email: email.trim().toLowerCase(),
      password,
    });

      if (res.data.isAdmin === true) {
        // gem login
        localStorage.setItem("isAdmin", "true");

        // tøm felter
        setEmail("");
        setPassword("");

        // opdater state så form forsvinder
        setIsAdmin(true);

        navigate("/admin");
      } else {
        setError("Du har ikke admin-rettigheder.");
        localStorage.removeItem("isAdmin");
      }

    // } catch (err: unknown) {
    //   if (axios.isAxiosError(err)) {
    //     setError(err.response?.data?.error ?? "Fejl ved login.");
    //   } else if (err instanceof Error) {
    //     setError(err.message);
    //   } else {
    //     setError("Ukendt fejl ved login.");
    //   }
    //   localStorage.removeItem("isAdmin");
    // }

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.error ?? err.message;
        setError(typeof msg === "string" ? msg : JSON.stringify(msg));
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ukendt fejl ved login.");
      }
      localStorage.removeItem("isAdmin");
    }

    setLoading(false);
  };

  // Hvis admin er logget ind — vis som før (Link + Log ud-knap)
  if (isAdmin) {
    return (
      <>
        <Link className="link_adminpage" to="/admin">Admin page</Link>
        <Button className="button_to_adminpage" onClick={handleLogout} mt={3}>
          Log out
        </Button>
      </>
    );
  }

  // Ellers vis login-formular
  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      maxW="sm"
      p={6}
      borderWidth="1px"
      borderRadius="lg"
    >
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Admin login"
        isRequired
        mb={3}
      />

      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        isRequired
        mb={4}
      />

      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      <Button
        type="submit"
        isLoading={loading}
        w="full"
        className="button_to_adminpage"
      >
        Log ind
      </Button>
    </Box>
  );
}
