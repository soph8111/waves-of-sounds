import express from "express";
import "dotenv/config"; // Indlæser .env med det samme
import cors from "cors"; // Tillader frontend at snakke med backend
import init from "./startup/init";
import { setupSwagger } from "./swagger";

const app = express(); // express app

// Produktionsklar CORS - kun følgende må bruge min API. (prod og dev)
const allowedOrigins = [
  process.env.FRONTEND_URL, 
  "http://localhost:5173",
  "http://localhost:8081"
].filter(Boolean) as string[];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Express oversætter JSON til js-objekt
app.use(express.json());

setupSwagger(app);

init(app);

// test endpoint (vises i browseren)
app.get("/", (req, res) => {
  res.send("Root endpoint.");
});

// Brug .env ved produktion, og port 4001 ved dev
const PORT = process.env.PORT || 4001;
// Serveren starter. Express lytter og backend er klar
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});