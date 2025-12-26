// AdminLogin.tsx
import { useState, useEffect } from "react";
import { Box, Button, Input, Alert, AlertIcon } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import api from "../../api";

// BEFORE JWT
// type LoginResponse = {
//   id: number;
//   email: string;
//   isAdmin: boolean;
// };

// AFTER JWT
type LoginResponse = {
  token: string;
  user: {
    id: number;
    email: string;
    isAdmin: boolean;
  };
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

    try {
    // use api (which has baseURL from REACT_APP_API_URL)
    const res = await api.post<LoginResponse>("/user/login", { // Backend validation - checking if user is admin
      email: email.trim().toLowerCase(), // Frontend sanity validation (data normalisering). Clearing user input (like whitespace, case-errors)
      password,
    });
      // BEFORE JWT
      ///if (res.data.isAdmin === true) {
      // AFTER JWT
      if (res.data.user.isAdmin === true) {
        // gem login i localstorage
        localStorage.setItem("token", res.data.token);
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
        // AFTER JWT - added
        localStorage.removeItem("token");
      }

      // Validation: error handling -> gives user feedback about backend
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
        value={email} // HTML input validation (input should be an email)
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Admin login"
        isRequired // HTML input validation (no empty field)
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
